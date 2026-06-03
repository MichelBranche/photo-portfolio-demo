import { gsap } from "gsap";

/**
 * Link header (+ About me, Progetti, Contatti): reazione GSAP al passaggio del cursore.
 * @returns {() => void} cleanup
 */
export function initHeaderNavAnimation() {
  const header = document.querySelector(".header");
  if (!header) return () => {};

  const labels = header.querySelectorAll("[data-nav-animate]");
  if (!labels.length) return () => {};

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let maxDist = 72;
  let maxMove = 5;
  let maxRot = 4;

  const mm = gsap.matchMedia();
  mm.add("(max-width: 900px)", () => {
    maxDist = 56;
    maxMove = 3.5;
    maxRot = 3;
  });

  const charFx = [];
  labels.forEach((label) => {
    label.querySelectorAll(".header-nav-link__char").forEach((el) => {
      charFx.push({
        el,
        qx: gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" }),
        qy: gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" }),
        qr: gsap.quickTo(el, "rotation", { duration: 0.42, ease: "power3.out" }),
      });
      gsap.set(el, { transformOrigin: "50% 88%" });
    });
  });

  if (!charFx.length) return () => {};

  function resetAll() {
    charFx.forEach(({ qx, qy, qr }) => {
      qx(0);
      qy(0);
      qr(0);
    });
  }

  function onPointerMove(e) {
    if (reduced) return;
    const clientX = e.clientX ?? 0;
    const clientY = e.clientY ?? 0;

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
      qx(
        gsap.utils.clamp(-maxMove, maxMove, (dx / maxDist) * maxMove * force * 2.4)
      );
      qy(
        gsap.utils.clamp(-maxMove, maxMove, (dy / maxDist) * maxMove * force * 2)
      );
      qr(
        gsap.utils.clamp(-maxRot, maxRot, (dx / maxDist) * maxRot * force * 1.5)
      );
    }
  }

  header.addEventListener("mousemove", onPointerMove, { passive: true });
  header.addEventListener("mouseleave", resetAll, { passive: true });

  return () => {
    mm.revert();
    header.removeEventListener("mousemove", onPointerMove);
    header.removeEventListener("mouseleave", resetAll);
    gsap.killTweensOf(charFx.map((c) => c.el));
    resetAll();
  };
}
