/** Pagine full-screen navigabili via hash (sostituiscono i pannelli header). */
export const SITE_PAGES = {
  about: {
    hash: "#about",
    sectionId: "about",
    bodyClass: "about-open",
    navId: "aboutNavLink",
  },
  progetti: {
    hash: "#progetti",
    sectionId: "progetti",
    bodyClass: "progetti-open",
    navId: "projectsNavLink",
  },
  contatti: {
    hash: "#contatti",
    sectionId: "contatti",
    bodyClass: "contatti-open",
    navId: "contactNavLink",
  },
};

export function sitePageKeyFromHash(hash) {
  if (hash === SITE_PAGES.about.hash) return "about";
  if (hash === SITE_PAGES.progetti.hash) return "progetti";
  if (hash === SITE_PAGES.contatti.hash) return "contatti";
  return null;
}
