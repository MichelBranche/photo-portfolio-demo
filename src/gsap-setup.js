/**
 * Espone GSAP e i plugin come globali (window.gsap/CustomEase/Flip).
 * Il motore galleria (src/gallery/fashion-gallery.js) li usa come globali,
 * come faceva con i tag <script> CDN: cosi resta invariato.
 * Va importato PRIMA di caricare il motore.
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(CustomEase, Flip);

if (typeof window !== "undefined") {
  window.gsap = gsap;
  window.CustomEase = CustomEase;
  window.Flip = Flip;
}

export { gsap, CustomEase, Flip };
