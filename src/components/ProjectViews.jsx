export default function ProjectViews() {
  return (
    <>
      <section
        id="projectConceptView"
        className="project-concept"
        hidden
        aria-hidden="true"
      >
        <button
          type="button"
          className="project-concept__hero"
          id="projectConceptHeroBtn"
          aria-label="Apri immagine a schermo intero"
        >
          <img
            className="project-concept__hero-img"
            id="projectConceptHeroImg"
            alt=""
            width="1200"
            height="1600"
          />
          <div className="project-concept__hero-gradient" aria-hidden="true"></div>
          <div className="project-concept__hero-copy">
            <p className="project-concept__num" id="projectConceptNum"></p>
            <h2 className="project-concept__name" id="projectConceptName"></h2>
            <p className="project-concept__meta" id="projectConceptMeta"></p>
            <p
              className="project-concept__summary"
              id="projectConceptSummary"
              hidden
            ></p>
          </div>
        </button>
        <div className="project-concept__grid-wrap">
          <div className="project-concept__grid" id="projectConceptGrid"></div>
        </div>
      </section>

      <section
        id="projectHorizontalView"
        className="project-h"
        hidden
        aria-hidden="true"
      >
        <div className="project-h__shell">
          <div className="project-h__copy">
            <p
              className="project-h__eyebrow"
              id="projectHorizontalEyebrow"
              aria-hidden="true"
            >
              Serie
            </p>
            <p className="project-h__kicker" id="projectHorizontalKicker"></p>
            <h2 className="project-h__title" id="projectHorizontalTitle"></h2>
            <div
              className="project-h__article"
              id="projectHorizontalArticle"
            ></div>
          </div>
          <aside className="project-h__visual" aria-label="Galleria progetto">
            <div className="project-h__scroll" id="projectHorizontalScroll">
              <div className="project-h__track" id="projectHorizontalTrack"></div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="projectEditorialView"
        className="project-editorial"
        hidden
        aria-hidden="true"
      >
        <div className="project-editorial__scroll">
          <aside
            className="project-editorial__side project-editorial__side--left"
            id="projectEditorialLeft"
            aria-label="Galleria sinistra"
          ></aside>
          <div className="project-editorial__main">
            <p
              className="project-editorial__kicker"
              id="projectEditorialKicker"
            ></p>
            <h2
              className="project-editorial__title"
              id="projectEditorialTitle"
            ></h2>
            <div
              className="project-editorial__article"
              id="projectEditorialArticle"
            ></div>
          </div>
          <aside
            className="project-editorial__side project-editorial__side--right"
            id="projectEditorialRight"
            aria-label="Galleria destra"
          ></aside>
          <div
            className="project-editorial__mobile-gallery"
            id="projectEditorialMobileGallery"
            hidden
            aria-label="Galleria"
          ></div>
          <div
            className="project-editorial__finale"
            id="projectEditorialFinale"
            aria-label="Immagine finale della serie"
          ></div>
        </div>
      </section>

      <section
        id="projectIsolaView"
        className="project-isola"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-isola__hero">
          <div className="project-isola__hero-inner">
            <div className="project-isola__hero-text">
              <p className="project-isola__eyebrow" id="projectIsolaEyebrow"></p>
              <h2 className="project-isola__title" id="projectIsolaTitle"></h2>
              <p
                className="project-isola__subtitle"
                id="projectIsolaSubtitle"
                hidden
              ></p>
              <p
                className="project-isola__hero-lede"
                id="projectIsolaHeroIntro"
              ></p>
              <p
                className="project-isola__tagline"
                id="projectIsolaTagline"
                hidden
              ></p>
            </div>
            <div className="project-isola__hero-visual">
              <button
                type="button"
                className="project-isola__hero-figure"
                id="projectIsolaHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectIsolaHeroImg"
                  className="project-isola__hero-img"
                  alt=""
                  width="1200"
                  height="1200"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-isola__main">
          <section
            className="project-isola__editorial"
            id="projectIsolaEditorialWrap"
            aria-label="Testo del progetto"
          >
            <p
              className="project-isola__ed-kicker"
              id="projectIsolaEdKicker"
              hidden
            ></p>
            <div
              className="project-isola__editorial-inner"
              id="projectIsolaEditorial"
            ></div>
          </section>
          <figure
            className="project-isola__pull"
            id="projectIsolaPullWrap"
            hidden
          >
            <blockquote
              className="project-isola__pull-quote"
              id="projectIsolaPullQuote"
            ></blockquote>
          </figure>
          <div
            className="project-isola__gallery project-isola__gallery--mosaic"
            id="projectIsolaGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectParigiView"
        className="project-parigi"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-parigi__hero">
          <div className="project-parigi__hero-inner">
            <div className="project-parigi__hero-text">
              <p
                className="project-parigi__eyebrow"
                id="projectParigiEyebrow"
              ></p>
              <h2 className="project-parigi__title" id="projectParigiTitle"></h2>
            </div>
            <div className="project-parigi__hero-visual">
              <button
                type="button"
                className="project-parigi__hero-figure"
                id="projectParigiHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectParigiHeroImg"
                  className="project-parigi__hero-img"
                  alt=""
                  width="1200"
                  height="1500"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-parigi__main">
          <div
            className="project-parigi__interlude-wrap"
            id="projectParigiInterludeWrap"
            hidden
          >
            <p
              className="project-parigi__interlude"
              id="projectParigiInterlude"
            ></p>
          </div>
          <div
            className="project-parigi__gallery project-parigi__gallery--mosaic"
            id="projectParigiGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectTabooView"
        className="project-taboo"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-taboo__hero">
          <div className="project-taboo__hero-inner">
            <div className="project-taboo__hero-text">
              <p className="project-taboo__eyebrow" id="projectTabooEyebrow"></p>
              <h2 className="project-taboo__title" id="projectTabooTitle"></h2>
              <p
                className="project-taboo__hero-lede"
                id="projectTabooHeroIntro"
              ></p>
            </div>
            <div className="project-taboo__hero-visual">
              <button
                type="button"
                className="project-taboo__hero-figure"
                id="projectTabooHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectTabooHeroImg"
                  className="project-taboo__hero-img"
                  alt=""
                  width="1200"
                  height="900"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-taboo__main">
          <section
            className="project-taboo__editorial"
            id="projectTabooEditorialWrap"
            aria-label="Testo del progetto"
          >
            <div
              className="project-taboo__editorial-inner"
              id="projectTabooEditorial"
            ></div>
          </section>
          <figure
            className="project-taboo__pull"
            id="projectTabooPullWrap"
            hidden
          >
            <blockquote
              className="project-taboo__pull-quote"
              id="projectTabooPullQuote"
            ></blockquote>
          </figure>
          <div
            className="project-taboo__gallery project-taboo__gallery--mosaic"
            id="projectTabooGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectModaView"
        className="project-moda"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-moda__hero">
          <div className="project-moda__hero-inner">
            <div className="project-moda__hero-text">
              <p className="project-moda__eyebrow" id="projectModaEyebrow"></p>
              <h2 className="project-moda__title" id="projectModaTitle"></h2>
              <p
                className="project-moda__hero-lede"
                id="projectModaHeroIntro"
              ></p>
            </div>
            <div className="project-moda__hero-visual">
              <button
                type="button"
                className="project-moda__hero-figure"
                id="projectModaHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectModaHeroImg"
                  className="project-moda__hero-img"
                  alt=""
                  width="1200"
                  height="1600"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-moda__main">
          <section
            className="project-moda__editorial"
            id="projectModaEditorialWrap"
            aria-label="Testo del progetto"
          >
            <div
              className="project-moda__editorial-inner"
              id="projectModaEditorial"
            ></div>
          </section>
          <figure className="project-moda__pull" id="projectModaPullWrap" hidden>
            <blockquote
              className="project-moda__pull-quote"
              id="projectModaPullQuote"
            ></blockquote>
          </figure>
          <div
            className="project-moda__gallery project-moda__gallery--sequence"
            id="projectModaGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectModaJumpView"
        className="project-moda-jump"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-moda-jump__hero">
          <div className="project-moda-jump__hero-inner">
            <div className="project-moda-jump__hero-text">
              <p
                className="project-moda-jump__eyebrow"
                id="projectModaJumpEyebrow"
              ></p>
              <h2
                className="project-moda-jump__title"
                id="projectModaJumpTitle"
              ></h2>
            </div>
            <div className="project-moda-jump__hero-visual">
              <button
                type="button"
                className="project-moda-jump__hero-figure"
                id="projectModaJumpHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectModaJumpHeroImg"
                  className="project-moda-jump__hero-img"
                  alt=""
                  width="1200"
                  height="1500"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-moda-jump__main">
          <div
            className="project-moda-jump__interlude-wrap"
            id="projectModaJumpInterludeWrap"
            hidden
          >
            <p
              className="project-moda-jump__interlude"
              id="projectModaJumpInterlude"
            ></p>
          </div>
          <div
            className="project-moda-jump__gallery"
            id="projectModaJumpGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectGallipoliDayView"
        className="project-gallipoli-day"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-gallipoli-day__hero">
          <div className="project-gallipoli-day__hero-inner">
            <div className="project-gallipoli-day__hero-text">
              <p
                className="project-gallipoli-day__eyebrow"
                id="projectGallipoliDayEyebrow"
              ></p>
              <h2
                className="project-gallipoli-day__title"
                id="projectGallipoliDayTitle"
              ></h2>
              <p
                className="project-gallipoli-day__subtitle"
                id="projectGallipoliDaySubtitle"
              ></p>
              <p
                className="project-gallipoli-day__tagline"
                id="projectGallipoliDayTagline"
              ></p>
            </div>
            <div className="project-gallipoli-day__hero-visual">
              <button
                type="button"
                className="project-gallipoli-day__hero-figure"
                id="projectGallipoliDayHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectGallipoliDayHeroImg"
                  className="project-gallipoli-day__hero-img"
                  alt=""
                  width="1400"
                  height="900"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-gallipoli-day__main">
          <div
            className="project-gallipoli-day__interlude-wrap"
            id="projectGallipoliDayInterludeWrap"
            hidden
          >
            <p
              className="project-gallipoli-day__interlude"
              id="projectGallipoliDayInterlude"
            ></p>
          </div>
          <div
            className="project-gallipoli-day__gallery"
            id="projectGallipoliDayGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectGallipoliView"
        className="project-gallipoli"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-gallipoli__hero">
          <div className="project-gallipoli__hero-inner">
            <div className="project-gallipoli__hero-text">
              <p
                className="project-gallipoli__eyebrow"
                id="projectGallipoliEyebrow"
              ></p>
              <h2
                className="project-gallipoli__title"
                id="projectGallipoliTitle"
              ></h2>
              <p
                className="project-gallipoli__tagline"
                id="projectGallipoliTagline"
              ></p>
            </div>
            <div className="project-gallipoli__hero-visual">
              <button
                type="button"
                className="project-gallipoli__hero-figure"
                id="projectGallipoliHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectGallipoliHeroImg"
                  className="project-gallipoli__hero-img"
                  alt=""
                  width="1400"
                  height="900"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-gallipoli__main">
          <div
            className="project-gallipoli__interlude-wrap"
            id="projectGallipoliInterludeWrap"
            hidden
          >
            <p
              className="project-gallipoli__interlude"
              id="projectGallipoliInterlude"
            ></p>
          </div>
          <div
            className="project-gallipoli__gallery"
            id="projectGallipoliGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectErniaView"
        className="project-ernia"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-ernia__hero">
          <div className="project-ernia__hero-inner">
            <div className="project-ernia__hero-text">
              <p className="project-ernia__eyebrow" id="projectErniaEyebrow"></p>
              <h2 className="project-ernia__title" id="projectErniaTitle"></h2>
              <p
                className="project-ernia__tagline"
                id="projectErniaTagline"
              ></p>
            </div>
            <div className="project-ernia__hero-visual">
              <button
                type="button"
                className="project-ernia__hero-figure"
                id="projectErniaHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectErniaHeroImg"
                  className="project-ernia__hero-img"
                  alt=""
                  width="1400"
                  height="900"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div className="project-ernia__main">
          <div
            className="project-ernia__interlude-wrap"
            id="projectErniaInterludeWrap"
            hidden
          >
            <p
              className="project-ernia__interlude"
              id="projectErniaInterlude"
            ></p>
          </div>
          <div
            className="project-ernia__gallery"
            id="projectErniaGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>

      <section
        id="projectLaureaView"
        className="project-laurea"
        hidden
        aria-hidden="true"
        data-animate="1"
      >
        <header className="project-laurea__hero">
          <div className="project-laurea__hero-inner">
            <div className="project-laurea__hero-text">
              <p
                className="project-laurea__eyebrow"
                id="projectLaureaEyebrow"
              ></p>
              <h2 className="project-laurea__title" id="projectLaureaTitle"></h2>
              <p
                className="project-laurea__tagline"
                id="projectLaureaTagline"
              ></p>
            </div>
            <div className="project-laurea__hero-visual">
              <button
                type="button"
                className="project-laurea__hero-figure"
                id="projectLaureaHeroBtn"
                aria-label="Apri immagine a schermo intero"
              >
                <img
                  id="projectLaureaHeroImg"
                  className="project-laurea__hero-img"
                  alt=""
                  width="1200"
                  height="1500"
                  decoding="async"
                />
              </button>
            </div>
          </div>
        </header>
        <div
          className="project-laurea__prose-wrap"
          id="projectLaureaProseWrap"
          hidden
        >
          <div
            className="project-laurea__prose"
            id="projectLaureaProse"
            role="article"
            aria-label="Testo del progetto"
          ></div>
        </div>
        <div className="project-laurea__main">
          <div
            className="project-laurea__gallery"
            id="projectLaureaGallery"
            role="region"
            aria-label="Galleria fotografica"
          ></div>
        </div>
      </section>
    </>
  );
}
