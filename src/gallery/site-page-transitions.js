import { gsap } from "gsap";

const ENTER = { duration: 0.52, y: 22 };
const EXIT = { duration: 0.38, y: -16 };
const VIEWPORT_OUT = 0.34;
const VIEWPORT_IN = 0.46;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function asPromise(tween) {
  if (!tween || typeof tween.then !== "function") {
    return Promise.resolve();
  }
  return tween;
}

/** Pagina dedicata: entrata */
export function runSitePageEnter(el) {
  if (!el) return Promise.resolve();
  gsap.killTweensOf(el);
  if (prefersReducedMotion()) {
    gsap.set(el, { autoAlpha: 1, y: 0 });
    return Promise.resolve();
  }
  gsap.set(el, { autoAlpha: 0, y: ENTER.y });
  return asPromise(
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: ENTER.duration,
      ease: "power3.out",
      clearProps: "transform",
    })
  );
}

/** Pagina dedicata: uscita */
export function runSitePageExit(el) {
  if (!el) return Promise.resolve();
  gsap.killTweensOf(el);
  if (prefersReducedMotion()) {
    gsap.set(el, { autoAlpha: 0 });
    return Promise.resolve();
  }
  return asPromise(
    gsap.to(el, {
      autoAlpha: 0,
      y: EXIT.y,
      duration: EXIT.duration,
      ease: "power2.in",
    })
  );
}

/** Home → pagina: sfuma la griglia */
export function fadeViewportOut(viewport) {
  if (!viewport) return Promise.resolve();
  gsap.killTweensOf(viewport);
  if (prefersReducedMotion()) {
    gsap.set(viewport, { opacity: 0 });
    return Promise.resolve();
  }
  return asPromise(
    gsap.to(viewport, {
      opacity: 0,
      duration: VIEWPORT_OUT,
      ease: "power2.inOut",
    })
  );
}

/** Pagina → home: riporta la griglia */
export function fadeViewportIn(viewport) {
  if (!viewport) return Promise.resolve();
  gsap.killTweensOf(viewport);
  if (prefersReducedMotion()) {
    gsap.set(viewport, { opacity: 1 });
    return Promise.resolve();
  }
  gsap.set(viewport, { opacity: 0 });
  return asPromise(
    gsap.to(viewport, {
      opacity: 1,
      duration: VIEWPORT_IN,
      ease: "power2.out",
    })
  );
}
