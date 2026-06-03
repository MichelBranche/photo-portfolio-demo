function Cube() {
  return (
    <div className="home-loading__cube">
      <div className="home-loading__left"></div>
      <div className="home-loading__center"></div>
      <div className="home-loading__right"></div>
      <div className="home-loading__bottom"></div>
    </div>
  );
}

export default function LoadingOverlay() {
  return (
    <div
      id="homeLoadingOverlay"
      className="home-loading"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Caricamento portfolio"
      aria-busy="true"
    >
      <div className="home-loading__vignette" aria-hidden="true"></div>
      <div className="home-loading__chrome-top" aria-hidden="true"></div>
      <div className="home-loading__inner">
        <h1 className="home-loading__title">Rubina Stradella</h1>
        <div className="home-loading__wrap">
          <div className="home-loading__pos">
            <Cube />
            <Cube />
            <Cube />
            <Cube />
            <Cube />
            <Cube />
            <Cube />
            <Cube />
          </div>
        </div>
      </div>
      <div className="home-loading__chrome-bottom">
        <p className="home-loading__meta">
          Portfolio - Made By{" "}
          <a
            className="footer__credit-link"
            href="https://portfolio-three-ruby-wf4uz6dmu1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michel Branche
          </a>
        </p>
      </div>
    </div>
  );
}
