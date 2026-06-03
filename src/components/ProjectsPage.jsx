export default function ProjectsPage() {
  return (
    <section
      id="progetti"
      className="site-page projects-page projects-page--editorial"
      hidden
      aria-hidden="true"
    >
      <div className="projects-page__shell">
        <header className="projects-page__masthead">
          <h1 className="projects-page__heading">Progetti</h1>
          <div className="projects-page__rule" aria-hidden="true" />
        </header>

        <div className="projects-page__stage">
          <nav
            className="projects-page__list-col"
            aria-label="Elenco serie fotografiche"
          >
            <ul id="projectNav" className="projects-index" />
          </nav>

          <figure className="projects-page__preview-col">
            <div className="projects-page__preview-frame">
              <img
                id="projectsPreviewImg"
                className="projects-page__preview-img"
                alt=""
                decoding="async"
              />
            </div>
          </figure>
        </div>

        <footer className="projects-page__foot">
          <button
            type="button"
            className="projects-page__foot-link"
            id="projectsPageHome"
          >
            [...]
          </button>
          <a className="projects-page__foot-link" href="#about">
            about
          </a>
          <a className="projects-page__foot-link" href="#contatti">
            email
          </a>
        </footer>
      </div>
    </section>
  );
}
