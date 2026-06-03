import { gsap } from "gsap";

const TITLE_WORDS = ["Rubina", "Stradella"];

/**
 * Titolo centrale home: ingresso a lettere + reazione al cursore sul viewport.
 * @returns {() => void} cleanup
 */
export function initViewportSiteTitleAnimation() {
  const root = document.getElementById("viewportSiteTitle");
  const viewport = document.getElementById("viewport");
  if (!root || !viewport) return () => {};

  let inner = root.querySelector(".viewport-site-title__inner");
  if (!inner) {
    inner = document.createElement("span");
    inner.className = "viewport-site-title__inner";
    inner.setAttribute("aria-hidden", "true");
    TITLE_WORDS.forEach((word) => {
      const wordEl = document.createElement("span");
      wordEl.className = "viewport-site-title__word";
      word.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.className = "viewport-site-title__char";
        span.textContent = ch;
        wordEl.appendChild(span);
      });
      inner.appendChild(wordEl);
    });
    root.textContent = "";
    root.appendChild(inner);
  }

  const chars = inner.querySelectorAll(".viewport-site-title__char");
  if (!chars.length) return () => {};

  gsap.set(chars, { transformOrigin: "50% 88%" });

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let maxDist = 240;
  let maxMove = 16;
  let maxRot = 10;
  let tiltY = 6;

  const mm = gsap.matchMedia();
  mm.add("(max-width: 900px)", () => {
    maxDist = 170;
    maxMove = 10;
    maxRot = 6;
    tiltY = 4;
  });

  const charFx = Array.from(chars).map((el) => ({
    el,
    qx: gsap.quickTo(el, "x", { duration: 0.42, ease: "power3.out" }),
    qy: gsap.quickTo(el, "y", { duration: 0.42, ease: "power3.out" }),
    qr: gsap.quickTo(el, "rotation", { duration: 0.5, ease: "power3.out" }),
  }));

  const qInnerY = gsap.quickTo(inner, "rotationY", {
    duration: 0.55,
    ease: "power3.out",
  });
  const qInnerX = gsap.quickTo(inner, "rotationX", {
    duration: 0.55,
    ease: "power3.out",
  });

  function titleVisible() {
    if (document.body.getAttribute("data-active-project") != null) return false;
    if (document.body.classList.contains("zoom-mode")) return false;
    const st = getComputedStyle(root);
    return st.visibility !== "hidden" && parseFloat(st.opacity) > 0.05;
  }

  function resetAll() {
    charFx.forEach(({ qx, qy, qr }) => {
      qx(0);
      qy(0);
      qr(0);
    });
    qInnerY(0);
    qInnerX(0);
  }

  function playEntrance() {
    if (reduced || !titleVisible()) return;
    gsap.fromTo(
      chars,
      {
        y: 32,
        opacity: 0,
        rotationX: -55,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.05,
        stagger: { each: 0.038, from: "center" },
        ease: "power3.out",
        clearProps: "rotationX",
      }
    );
  }

  function onPointerMove(e) {
    if (!titleVisible() || reduced) return;

    const clientX = e.clientX ?? 0;
    const clientY = e.clientY ?? 0;
    const box = root.getBoundingClientRect();
    const cx = box.left + box.width * 0.5;
    const cy = box.top + box.height * 0.5;

    const nx = (clientX - cx) / Math.max(window.innerWidth * 0.42, 1);
    const ny = (clientY - cy) / Math.max(window.innerHeight * 0.38, 1);
    qInnerY(gsap.utils.clamp(-tiltY, tiltY, nx * tiltY));
    qInnerX(gsap.utils.clamp(-tiltY * 0.45, tiltY * 0.45, -ny * tiltY * 0.45));

    for (let i = 0; i < charFx.length; i++) {
      const { el, qx, qy, qr } = charFx[i];
      const r = el.getBoundingClientRect();
      const lx = r.left + r.width * 0.5;
      const ly = r.top + r.height * 0.5;
      const dist = Math.hypot(clientX - lx, clientY - ly);

      if (dist > maxDist) {
        qx(0);
        qy(0);
        qr(0);
        continue;
      }

      const t = 1 - dist / maxDist;
      const force = t * t;
      const dx = clientX - lx;
      const dy = clientY - ly;
      qx(gsap.utils.clamp(-maxMove, maxMove, (dx / maxDist) * maxMove * force * 2.2));
      qy(gsap.utils.clamp(-maxMove, maxMove, (dy / maxDist) * maxMove * force * 1.85));
      qr(gsap.utils.clamp(-maxRot, maxRot, (dx / maxDist) * maxRot * force * 1.4));
    }
  }

  const onPointerLeave = () => resetAll();

  viewport.addEventListener("mousemove", onPointerMove, { passive: true });
  viewport.addEventListener("mouseleave", onPointerLeave);
  viewport.addEventListener("touchmove", onPointerMove, { passive: true });
  viewport.addEventListener("touchend", onPointerLeave, { passive: true });

  const obs = new MutationObserver(() => {
    if (!titleVisible()) resetAll();
  });
  obs.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-active-project", "class"],
  });

  if (reduced) {
    gsap.set(chars, { opacity: 1, clearProps: "transform" });
  } else {
    gsap.set(chars, { opacity: 0 });
    window.setTimeout(playEntrance, 480);
  }

  return () => {
    mm.revert();
    viewport.removeEventListener("mousemove", onPointerMove);
    viewport.removeEventListener("mouseleave", onPointerLeave);
    viewport.removeEventListener("touchmove", onPointerMove);
    viewport.removeEventListener("touchend", onPointerLeave);
    obs.disconnect();
    gsap.killTweensOf(chars);
    gsap.killTweensOf(inner);
    resetAll();
  };
}
