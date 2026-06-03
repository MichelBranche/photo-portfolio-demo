import { openProjectFromProjectsList } from "./project-reveal-transition.js";

function listTitleFromProject(project) {
  const raw = (project?.title || project?.id || "").trim();
  if (!raw) return "";
  return raw.replace(/_/g, " ").toLowerCase();
}

function previewUrlForProject(gallery, project) {
  if (!project || !gallery) return "";
  if (typeof gallery.resolveProjectRevealImage === "function") {
    const info = gallery.resolveProjectRevealImage(project.id);
    return info?.url || info?.fullImageUrl || "";
  }
  return "";
}

function setPreviewImage(previewImg, url, alt) {
  if (!previewImg) return;

  if (!url) {
    previewImg.removeAttribute("src");
    previewImg.classList.remove("is-visible");
    previewImg.alt = "";
    delete previewImg.dataset.currentSrc;
    return;
  }

  if (previewImg.dataset.currentSrc === url) {
    previewImg.alt = alt || "";
    previewImg.classList.add("is-visible");
    return;
  }

  previewImg.classList.remove("is-visible");
  previewImg.alt = alt || "";
  const reveal = () => {
    previewImg.classList.add("is-visible");
  };
  previewImg.onload = reveal;
  previewImg.src = url;
  previewImg.dataset.currentSrc = url;
  if (previewImg.complete) reveal();
}

function clearActiveItems(list) {
  list.querySelectorAll(".projects-index__btn.is-preview-active").forEach((btn) => {
    btn.classList.remove("is-preview-active");
  });
}

/**
 * Layout editoriale Progetti: indice a sinistra, anteprima a destra.
 */
export function buildProjectsPageIndex(gallery) {
  const list = document.getElementById("projectNav");
  const previewImg = document.getElementById("projectsPreviewImg");
  if (!list || !previewImg || !gallery?.useLocalPortfolio) return;

  list.innerHTML = "";
  list.className = "projects-index";

  const projects = window.__PORTFOLIO_PROJECTS__ || [];
  const order = window.__PORTFOLIO_PROJECT_ORDER__ || [];
  const byId = new Map();
  projects.forEach((p) => {
    if (p?.id != null) byId.set(String(p.id), p);
  });

  const ordered = [];
  const seen = new Set();
  for (const id of order) {
    const p = byId.get(String(id));
    if (!p || seen.has(String(id))) continue;
    seen.add(String(id));
    ordered.push(p);
  }
  for (const p of projects) {
    const id = String(p.id);
    if (!seen.has(id)) ordered.push(p);
  }

  const items = [];

  ordered.forEach((project) => {
    const pid = String(project.id);
    const li = document.createElement("li");
    li.className = "projects-index__item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "projects-index__btn";
    btn.textContent = listTitleFromProject(project);
    btn.dataset.projectId = pid;
    btn.dataset.previewUrl = previewUrlForProject(gallery, project);

    btn.addEventListener("mouseenter", () => activate(btn));
    btn.addEventListener("focus", () => activate(btn));
    btn.addEventListener("touchstart", () => activate(btn), { passive: true });
    btn.addEventListener("click", () => {
      const url = previewUrlForProject(gallery, project);
      void openProjectFromProjectsList(gallery, {
        projectId: pid,
        imageUrl: url,
        label: btn.textContent || listTitleFromProject(project),
      });
    });

    li.appendChild(btn);
    list.appendChild(li);
    items.push(btn);
  });

  function activate(btn) {
    if (!btn) return;
    clearActiveItems(list);
    btn.classList.add("is-preview-active");
    setPreviewImage(
      previewImg,
      btn.dataset.previewUrl || "",
      btn.textContent || ""
    );
  }

  if (items.length > 0) {
    activate(items[0]);
  } else {
    setPreviewImage(previewImg, "", "");
  }

  const homeBtn = document.getElementById("projectsPageHome");
  if (homeBtn && !homeBtn.dataset.bound) {
    homeBtn.dataset.bound = "1";
    homeBtn.addEventListener("click", () => {
      void gallery.closeAllSitePages().then(() => {
        gallery.setActiveProject(null);
      });
    });
  }

  const footAbout = document.querySelector(
    ".projects-page__foot-link[href='#about']"
  );
  const footContact = document.querySelector(
    ".projects-page__foot-link[href='#contatti']"
  );
  if (footAbout && !footAbout.dataset.bound) {
    footAbout.dataset.bound = "1";
    footAbout.addEventListener("click", (e) => {
      e.preventDefault();
      void gallery.openSitePage("about");
    });
  }
  if (footContact && !footContact.dataset.bound) {
    footContact.dataset.bound = "1";
    footContact.addEventListener("click", (e) => {
      e.preventDefault();
      void gallery.openSitePage("contatti");
    });
  }
}
