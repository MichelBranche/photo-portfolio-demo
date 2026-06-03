const NEAR_END_PX = 120;

function isHomeContext() {
  const body = document.body;
  if (
    body.classList.contains("about-open") ||
    body.classList.contains("progetti-open") ||
    body.classList.contains("contatti-open")
  ) {
    return false;
  }
  for (const cls of body.classList) {
    if (cls.startsWith("project-") && cls.endsWith("-active")) return false;
  }
  if (body.hasAttribute("data-active-project")) return false;
  return true;
}

function getScrollRoot() {
  const site = document.querySelector(".site-page:not([hidden])");
  if (site) return site;

  const projectView = document.querySelector(
    "[id^='project'][id$='View']:not([hidden])"
  );
  if (projectView) {
    return (
      projectView.querySelector(
        ".project-editorial__scroll, .project-horizontal__scroll, .project-h__scroll, [class*='__scroll']"
      ) || projectView
    );
  }

  if (document.body.classList.contains("mobile-project-feed")) {
    return document.querySelector(".canvas-wrapper") || null;
  }

  return null;
}

function isNearScrollEnd(el) {
  if (!el) return false;
  if (el.scrollHeight <= el.clientHeight + 8) return true;
  return el.scrollTop + el.clientHeight >= el.scrollHeight - NEAR_END_PX;
}

function isNearViewportFooter(clientY) {
  return clientY >= window.innerHeight * 0.82;
}

/**
 * Riga «Portfolio - Made By Michel Branche»: su home sempre con il footer;
 * altrove solo vicino al fondo pagina (scroll o fascia bassa schermo).
 */
export function initFooterCreditReveal() {
  const footer = document.querySelector(".footer.footer--lite");
  if (!footer) return () => {};

  let scrollRoot = null;
  let raf = 0;
  let pointerNearFooter = false;

  const update = () => {
    raf = 0;
    if (isHomeContext()) {
      footer.classList.remove("footer-credit--scroll-gated", "footer-credit--near");
      return;
    }
    footer.classList.add("footer-credit--scroll-gated");
    const near = scrollRoot
      ? isNearScrollEnd(scrollRoot)
      : pointerNearFooter;
    footer.classList.toggle("footer-credit--near", near);
  };

  const scheduleUpdate = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  const onScroll = () => scheduleUpdate();

  const onPointer = (e) => {
    pointerNearFooter = isNearViewportFooter(e.clientY);
    scheduleUpdate();
  };

  const bindScrollRoot = () => {
    if (scrollRoot) {
      scrollRoot.removeEventListener("scroll", onScroll);
    }
    scrollRoot = getScrollRoot();
    if (scrollRoot) {
      scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    }
    scheduleUpdate();
  };

  const observer = new MutationObserver(() => {
    bindScrollRoot();
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class", "data-active-project"],
  });

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("wheel", onPointer, { passive: true });
  bindScrollRoot();

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", scheduleUpdate);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("wheel", onPointer);
    if (scrollRoot) scrollRoot.removeEventListener("scroll", onScroll);
    if (raf) cancelAnimationFrame(raf);
    footer.classList.remove("footer-credit--scroll-gated", "footer-credit--near");
  };
}
