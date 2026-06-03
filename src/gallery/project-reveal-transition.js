import { gsap } from "gsap";

const REVEAL_Z = 10050;
const EXPAND_DURATION = 0.62;
const EXPAND_HOLD = 0.14;
const MORPH_DURATION = 0.8;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function asPromise(tween) {
  if (!tween || typeof tween.then !== "function") return Promise.resolve();
  return tween;
}

function waitFrames(n = 2) {
  return new Promise((resolve) => {
    let left = n;
    const step = () => {
      left -= 1;
      if (left <= 0) resolve();
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function hold(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPreviewFrameRect() {
  const frame = document.querySelector(".projects-page__preview-frame");
  if (!frame) return null;
  const r = frame.getBoundingClientRect();
  if (r.width < 8 || r.height < 8) return null;
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
  };
}

/** Ingrandisce mantenendo le proporzioni del frame (niente schiacciamento). */
function expandedPreviewRect(rect, factor = 1.32) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let w = rect.width * factor;
  let h = rect.height * factor;
  const maxW = window.innerWidth * 0.9;
  const maxH = window.innerHeight * 0.84;
  const clamp = Math.min(1, maxW / w, maxH / h);
  w *= clamp;
  h *= clamp;
  return {
    top: cy - h / 2,
    left: cx - w / 2,
    width: w,
    height: h,
  };
}

function placeFlyer(flyer, rect) {
  gsap.set(flyer, {
    position: "fixed",
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    transformOrigin: "0 0",
    margin: 0,
  });
}

function rectFromElement(el) {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return null;
  return {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
  };
}

function revealTargetRect(target) {
  if (!target) return null;
  const img = target.img;
  const host = target.host;
  if (target.kind === "grid" && host) {
    const viewport = host.querySelector(".grid-item__viewport");
    return (
      rectFromElement(viewport) ||
      rectFromElement(img) ||
      rectFromElement(host)
    );
  }
  const card = host?.closest?.(".project-editorial__card");
  if (card) {
    return rectFromElement(img) || rectFromElement(card);
  }
  if (img) {
    return rectFromElement(img) || rectFromElement(host);
  }
  return rectFromElement(host);
}

/** Morph senza scaleX/scaleY diversi: il crop object-fit resta corretto (editoriale portrait). */
function morphFlyerLayout(flyer, fromRect, toRect, duration = MORPH_DURATION) {
  placeFlyer(flyer, fromRect);
  gsap.killTweensOf(flyer);
  return gsap.to(flyer, {
    top: toRect.top,
    left: toRect.left,
    width: toRect.width,
    height: toRect.height,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration,
    ease: "power2.inOut",
  });
}

function snapFlyerRect(flyer, rect) {
  gsap.killTweensOf(flyer);
  placeFlyer(flyer, rect);
}

/** Elemento DOM della prima foto (marcato in build con data-project-reveal-anchor). */
export function findProjectRevealTarget(gallery) {
  const anchor = document.querySelector("[data-project-reveal-anchor='1']");
  if (anchor) {
    const img =
      anchor.tagName === "IMG"
        ? anchor
        : anchor.querySelector(".grid-item__slide img, img");
    const host =
      img?.closest(
        ".grid-item, .project-editorial__card, .project-h-card, button, .project-concept__hero, .project-isola__hero, .project-parigi__hero, .project-taboo__hero, .project-moda__hero, .project-moda-jump__hero, .project-gallipoli__hero, .project-gallipoli-day__hero, .project-ernia__hero, .project-laurea__hero"
      ) || anchor;
    return { host, img: img || anchor, kind: "anchor" };
  }

  const container = gallery?.gridContainer;
  if (container) {
    const lead = container.querySelector(".grid-item--project-lead");
    const cell =
      lead || container.querySelector(".grid-item:not(.grid-item--project-blurb)");
    if (cell) {
      return {
        host: cell,
        img: cell.querySelector(".grid-item__slide img"),
        kind: "grid",
      };
    }
  }

  return null;
}

function suspendGridMotion(gallery) {
  gallery.gridItems?.forEach((item) => {
    if (typeof gallery.pauseGridItemDrift === "function") {
      gallery.pauseGridItemDrift(item);
    }
  });
}

function resumeGridMotion(gallery) {
  if (typeof gallery.startGridDriftForVisibleThumbnails === "function") {
    gallery.startGridDriftForVisibleThumbnails();
  }
}

function hideProjectLayerDuringMorph(gallery, targetHost) {
  suspendGridMotion(gallery);
  if (gallery.controlsContainer) {
    gsap.set(gallery.controlsContainer, { opacity: 0 });
    gallery.controlsContainer.classList.remove("visible");
  }
  gallery.gridItems?.forEach((item) => {
    if (item.element) gsap.set(item.element, { opacity: 0 });
  });
  if (targetHost) gsap.set(targetHost, { opacity: 0 });
}

async function preloadAndDecode(imgEl, url) {
  if (!imgEl) return;
  const next = url || imgEl.currentSrc || imgEl.src;
  if (!next) return;

  await new Promise((resolve) => {
    const probe = new Image();
    const done = () => resolve();
    probe.onload = done;
    probe.onerror = done;
    probe.src = next;
    if (probe.complete) done();
  });

  if (url && imgEl.src !== url) {
    imgEl.src = url;
  }

  if (typeof imgEl.decode === "function") {
    try {
      await imgEl.decode();
    } catch {
      /* ok */
    }
  }
}

async function settleReveal(gallery, target, flyer, backdrop) {
  const targetImg = target?.img;
  const targetHost = target?.host;

  if (targetImg) await preloadAndDecode(targetImg);
  await waitFrames(2);

  gsap.set(flyer, { display: "none" });
  document.body.classList.add("project-reveal-settled");

  if (gallery.viewport) {
    const showGrid =
      !gallery.isProjectConceptLayoutActive?.() &&
      !gallery.isProjectHorizontalMixedActive?.() &&
      !gallery.isProjectEditorialLayoutActive?.() &&
      !gallery.isProjectIsolaLayoutActive?.() &&
      !gallery.isProjectParigiLayoutActive?.() &&
      !gallery.isProjectTabooLayoutActive?.() &&
      !gallery.isProjectModaLayoutActive?.() &&
      !gallery.isProjectModaJumpLayoutActive?.() &&
      !gallery.isProjectGallipoliFestivalLayoutActive?.() &&
      !gallery.isProjectGallipoliDayLayoutActive?.() &&
      !gallery.isProjectErniaLiveLayoutActive?.() &&
      !gallery.isProjectLaureaAlbumLayoutActive?.();

    if (showGrid) {
      gsap.set(gallery.viewport, { visibility: "visible", opacity: 1 });
    }
  }

  if (targetHost) gsap.set(targetHost, { opacity: 1 });

  gsap.to(backdrop, { autoAlpha: 0, duration: 0.5, ease: "power2.out" });
}

function revealRestOfProject(gallery, target) {
  const targetEl = target?.host;
  const photoCells = [];
  const blurbCells = [];

  gallery.gridItems?.forEach((item) => {
    if (!item.element || item.element === targetEl) return;
    if (item.projectBlurb) blurbCells.push(item.element);
    else photoCells.push(item.element);
  });

  const tl = gsap.timeline({ delay: 0.08 });

  if (photoCells.length) {
    tl.fromTo(
      photoCells,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.52,
        stagger: 0.045,
        ease: "power3.out",
      },
      0.08
    );
  }

  if (blurbCells.length) {
    tl.fromTo(
      blurbCells,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.44,
        stagger: 0.06,
        ease: "power2.out",
      },
      0.18
    );
  }

  const viewExtras = document.querySelectorAll(
    [
      ".project-concept__grid > *",
      ".project-concept__copy > *",
      "#projectHorizontalTrack .project-h-card",
      "#projectEditorialLeft > *",
      "#projectEditorialRight > *",
      "#projectEditorialMobileGallery > *",
      "#projectEditorialFinale > *",
      "#projectIsolaView:not([hidden]) .project-isola__gallery > *",
      "#projectParigiView:not([hidden]) .project-parigi__gallery > *",
      "#projectTabooView:not([hidden]) .project-taboo__gallery > *",
      "#projectModaView:not([hidden]) .project-moda__gallery > *",
      "#projectModaJumpView:not([hidden]) .project-moda-jump__gallery > *",
      "#projectGallipoliView:not([hidden]) .project-gallipoli__gallery > *",
      "#projectGallipoliDayView:not([hidden]) .project-gallipoli-day__gallery > *",
      "#projectErniaView:not([hidden]) .project-ernia__gallery > *",
      "#projectLaureaView:not([hidden]) .project-laurea__gallery > *",
    ].join(", ")
  );

  if (viewExtras.length) {
    tl.fromTo(
      viewExtras,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.035,
        ease: "power3.out",
      },
      0.12
    );
  }

  if (gallery.controlsContainer) {
    tl.to(
      gallery.controlsContainer,
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => gallery.controlsContainer.classList.add("visible"),
      },
      0.16
    );
  }

  tl.to(".header", { opacity: 1, duration: 0.42, ease: "power2.out" }, 0.1);
  tl.add(() => resumeGridMotion(gallery), "+=0.04");

  return asPromise(tl);
}

function createFlyer() {
  let root = document.getElementById("projectReveal");
  if (!root) {
    root = document.createElement("div");
    root.id = "projectReveal";
    root.className = "project-reveal";
    root.innerHTML = `
      <div class="project-reveal__backdrop" aria-hidden="true"></div>
      <div class="project-reveal__flyer" aria-hidden="true">
        <img class="project-reveal__img" alt="" decoding="sync" />
      </div>
    `;
    document.body.appendChild(root);
  }
  const img = root.querySelector(".project-reveal__img");
  if (img) img.decoding = "sync";
  return {
    root,
    backdrop: root.querySelector(".project-reveal__backdrop"),
    flyer: root.querySelector(".project-reveal__flyer"),
    img,
  };
}

function resolveRevealImageUrl(gallery, projectId, fallbackUrl) {
  if (typeof gallery.resolveProjectRevealImage === "function") {
    const info = gallery.resolveProjectRevealImage(projectId);
    if (info?.url) return info.url;
  }
  return fallbackUrl || "";
}

/**
 * Anteprima Progetti → prima foto della serie (stesso file/URL, morph senza flash).
 */
export async function openProjectFromProjectsList(gallery, options) {
  const { projectId, imageUrl } = options || {};
  if (!gallery || !projectId) return;

  if (gallery._projectRevealActive || gallery._sitePageTransitioning) return;
  if (gallery.zoomState?.isActive) return;

  const startRect = getPreviewFrameRect();
  const revealUrl = resolveRevealImageUrl(gallery, projectId, imageUrl);

  if (prefersReducedMotion() || !startRect) {
    await gallery.closeAllSitePages({
      skipHash: true,
      skipExitAnimation: true,
      skipViewportFadeIn: true,
    });
    gallery.setActiveProject(projectId);
    if (gallery.viewport) {
      gsap.set(gallery.viewport, { opacity: 1, visibility: "visible" });
    }
    return;
  }

  gallery._projectRevealActive = true;
  gallery._sitePageTransitioning = true;

  const progetti = document.getElementById("progetti");
  const { root, backdrop, flyer, img } = createFlyer();
  const expandRect = expandedPreviewRect(startRect);

  root.hidden = false;
  root.setAttribute("aria-hidden", "false");
  document.body.classList.add("project-reveal-active");
  document.body.classList.remove("project-reveal-settled");

  await preloadAndDecode(img, revealUrl);
  gsap.set(root, { zIndex: REVEAL_Z, autoAlpha: 1 });
  gsap.set(backdrop, { autoAlpha: 1 });
  gsap.set(flyer, { autoAlpha: 1, display: "block", overflow: "hidden" });
  placeFlyer(flyer, startRect);

  try {
    const expandTl = gsap.timeline();
    expandTl.add(morphFlyerLayout(flyer, startRect, expandRect, EXPAND_DURATION), 0);
    if (progetti) {
      expandTl.to(
        progetti,
        { autoAlpha: 0, duration: 0.38, ease: "power2.in" },
        0.06
      );
    }
    await asPromise(expandTl);
    snapFlyerRect(flyer, expandRect);
    await hold(EXPAND_HOLD * 1000);

    gallery._applySitePageDomClose("progetti");
    gallery._suppressGridEntrance = true;
    gallery.setActiveProject(projectId);

    await waitFrames(4);

    const target = findProjectRevealTarget(gallery);
    let endRect = revealTargetRect(target);

    if (target?.img) {
      const targetUrl =
        target.img.currentSrc || target.img.src || revealUrl;
      await preloadAndDecode(img, targetUrl);
    }

    if (!endRect) {
      gsap.set(flyer, { autoAlpha: 0, display: "none" });
      gsap.to(backdrop, { autoAlpha: 0, duration: 0.35 });
      document.body.classList.add("project-reveal-settled");
      await revealRestOfProject(gallery, null);
    } else {
      hideProjectLayerDuringMorph(gallery, target?.host);

      await waitFrames(1);
      endRect = revealTargetRect(target) || endRect;

      await asPromise(morphFlyerLayout(flyer, expandRect, endRect));
      const snap = revealTargetRect(target);
      if (snap) snapFlyerRect(flyer, snap);

      await settleReveal(gallery, target, flyer, backdrop);
      await revealRestOfProject(gallery, target);
    }

    if (
      window.history?.replaceState &&
      window.location.hash === "#progetti"
    ) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  } finally {
    gallery._suppressGridEntrance = false;
    gsap.set(flyer, {
      clearProps: "transform,top,left,width,height,display",
    });
    gsap.set(backdrop, { clearProps: "all" });
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove(
      "project-reveal-active",
      "project-reveal-settled"
    );
    gallery._projectRevealActive = false;
    gallery._sitePageTransitioning = false;
  }
}
