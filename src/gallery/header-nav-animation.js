import { gsap } from "gsap";

function motionParams() {
  const narrow =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 900px)").matches;
  return narrow
    ? { maxDist: 40, maxMove: 1.85, maxRot: 1.5 }
    : { maxDist: 48, maxMove: 2.25, maxRot: 1.75 };
}

/**
 * Link header: leggera reazione GSAP al passaggio del cursore (solo desktop, solo sul link hover).
 * @returns {() => void} cleanup
 */
export function initHeaderNavAnimation() {
  const header = document.querySelector(".header");
  if (!header) return () => {};

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const mm = gsap.matchMedia();

  mm.add("(hover: hover) and (pointer: fine)", () => {
    if (reduced) return;

    const linkCleanups = [];

    header.querySelectorAll(".header-nav-link, .header-about-link").forEach((link) => {
      const label = link.querySelector("[data-nav-animate]");
      if (!label) return;

      const charFx = [];
      label.querySelectorAll(".header-nav-link__char").forEach((el) => {
        charFx.push({
          el,
          qx: gsap.quickTo(el, "x", { duration: 0.32, ease: "power3.out" }),
          qy: gsap.quickTo(el, "y", { duration: 0.32, ease: "power3.out" }),
          qr: gsap.quickTo(el, "rotation", {
            duration: 0.38,
            ease: "power3.out",
          }),
        });
        gsap.set(el, { transformOrigin: "50% 90%", x: 0, y: 0, rotation: 0 });
      });

      if (!charFx.length) return;

      function resetLink() {
        charFx.forEach(({ qx, qy, qr }) => {
          qx(0);
          qy(0);
          qr(0);
        });
      }

      function onPointerMove(e) {
        const { maxDist, maxMove, maxRot } = motionParams();
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
            gsap.utils.clamp(
              -maxMove,
              maxMove,
              (dx / maxDist) * maxMove * force * 1.35
            )
          );
          qy(
            gsap.utils.clamp(
              -maxMove,
              maxMove,
              (dy / maxDist) * maxMove * force * 1.1
            )
          );
          qr(
            gsap.utils.clamp(
              -maxRot,
              maxRot,
              (dx / maxDist) * maxRot * force * 0.9
            )
          );
        }
      }

      link.addEventListener("mousemove", onPointerMove, { passive: true });
      link.addEventListener("mouseleave", resetLink, { passive: true });

      linkCleanups.push(() => {
        link.removeEventListener("mousemove", onPointerMove);
        link.removeEventListener("mouseleave", resetLink);
        gsap.killTweensOf(charFx.map((c) => c.el));
        resetLink();
      });
    });

    return () => {
      linkCleanups.forEach((fn) => fn());
    };
  });

  return () => {
    mm.revert();
  };
}
