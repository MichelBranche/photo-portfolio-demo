import { useEffect, useRef } from "react";

// Carica i dati del portfolio (side-effect: popola window.__PORTFOLIO_*__)
// prima che il motore venga avviato nel boot effect.
import "./data/index.js";

import { loadPortfolioDriveManifest } from "./gallery/drive-manifest.js";
import {
  HOME_LOADING_MAX_MS,
  dismissHomeLoading,
  homeLoadingFlags,
  setHomeLoadingStartNow,
} from "./gallery/home-loading.js";

import LoadingOverlay from "./components/LoadingOverlay.jsx";
import Header from "./components/Header.jsx";
import Viewport from "./components/Viewport.jsx";
import About from "./components/About.jsx";
import ProjectsPage from "./components/ProjectsPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import ProjectOverlays from "./components/ProjectOverlays.jsx";
import ProjectViews from "./components/ProjectViews.jsx";
import CloseButton from "./components/CloseButton.jsx";
import Footer from "./components/Footer.jsx";
import Vignette from "./components/Vignette.jsx";

const BREAKPOINT_PX = 900;

export default function App() {
  // Evita doppio boot in StrictMode (doppio mount in dev).
  const bootedRef = useRef(false);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    // Stub layout (un tempo script-mobile.js / script-desktop.js).
    window.__PF_BREAKPOINT_PX__ = BREAKPOINT_PX;
    const syncMobileLayoutFlag = () => {
      window.__PF_IS_MOBILE_LAYOUT__ =
        typeof window.matchMedia === "function"
          ? window.matchMedia(`(max-width: ${BREAKPOINT_PX}px)`).matches
          : window.innerWidth <= BREAKPOINT_PX;
    };
    syncMobileLayoutFlag();
    const mobileMq =
      typeof window.matchMedia === "function"
        ? window.matchMedia(`(max-width: ${BREAKPOINT_PX}px)`)
        : null;
    const onMobileMqChange = () => syncMobileLayoutFlag();
    if (mobileMq) {
      if (typeof mobileMq.addEventListener === "function") {
        mobileMq.addEventListener("change", onMobileMqChange);
      } else if (typeof mobileMq.addListener === "function") {
        mobileMq.addListener(onMobileMqChange);
      }
    }

    let gallery;
    let destroySiteTitleAnim = () => {};
    let destroyHeaderNavAnim = () => {};

    function scheduleHomeLoadingMaxTimeout() {
      window.setTimeout(() => {
        const el = document.getElementById("homeLoadingOverlay");
        if (!el || homeLoadingFlags.dismissScheduled) return;
        homeLoadingFlags.dismissScheduled = true;
        dismissHomeLoading(
          () => {
            if (gallery && gallery.viewport) {
              window.gsap.set(gallery.viewport, { opacity: 1 });
            }
            try {
              if (
                gallery &&
                typeof gallery.applyGridVisibleAndStartDrift === "function"
              ) {
                gallery.applyGridVisibleAndStartDrift({ entranceControls: true });
              }
              if (gallery && typeof gallery.initDraggable === "function") {
                gallery.initDraggable();
              }
              if (gallery && typeof gallery.setupViewportObserver === "function") {
                gallery.setupViewportObserver();
              }
            } catch (e) {
              console.error(e);
            }
            window.gsap.to(".header", {
              duration: 0.6,
              opacity: 1,
              ease: "power2.out",
            });
            window.gsap.to(".footer", {
              duration: 0.6,
              opacity: 1,
              ease: "power2.out",
            });
          },
          { force: true }
        );
      }, HOME_LOADING_MAX_MS);
    }

    async function fashionGalleryBoot() {
      setHomeLoadingStartNow();
      scheduleHomeLoadingMaxTimeout();
      try {
        await loadPortfolioDriveManifest();
      } catch (err) {
        console.error(err);
      }
      try {
        const { FashionGallery } = await import("./gallery/fashion-gallery.js");
        const { initViewportSiteTitleAnimation } = await import(
          "./gallery/site-title-animation.js"
        );
        const { initHeaderNavAnimation } = await import(
          "./gallery/header-nav-animation.js"
        );
        gallery = new FashionGallery();
        gallery.init();
        destroySiteTitleAnim = initViewportSiteTitleAnimation();
        destroyHeaderNavAnim = initHeaderNavAnimation();
      } catch (err) {
        console.error(err);
        homeLoadingFlags.dismissScheduled = true;
        dismissHomeLoading(() => {
          if (gallery && gallery.viewport) {
            window.gsap.set(gallery.viewport, { opacity: 1 });
          }
        });
      }
    }

    fashionGalleryBoot();

    return () => {
      destroySiteTitleAnim();
      destroyHeaderNavAnim();
      if (mobileMq) {
        if (typeof mobileMq.removeEventListener === "function") {
          mobileMq.removeEventListener("change", onMobileMqChange);
        } else if (typeof mobileMq.removeListener === "function") {
          mobileMq.removeListener(onMobileMqChange);
        }
      }
    };
  }, []);

  return (
    <>
      <LoadingOverlay />
      <Header />
      <Viewport />
      <About />
      <ProjectsPage />
      <ContactPage />
      <ProjectOverlays />
      <ProjectViews />
      <CloseButton />
      <Footer />
      <Vignette />
    </>
  );
}
