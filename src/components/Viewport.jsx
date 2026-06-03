const SITE_TITLE = "Rubina Stradella";
const SITE_TITLE_WORDS = ["Rubina", "Stradella"];

export default function Viewport() {
  return (
    <div className="viewport" id="viewport">
      <p
        className="viewport-site-title"
        id="viewportSiteTitle"
        aria-label={SITE_TITLE}
      >
        <span className="viewport-site-title__inner" aria-hidden="true">
          {SITE_TITLE_WORDS.map((word) => (
            <span key={word} className="viewport-site-title__word">
              {word.split("").map((ch, i) => (
                <span
                  key={`${word}-${i}`}
                  className="viewport-site-title__char"
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      </p>
      <div className="canvas-wrapper" id="canvasWrapper">
        <div className="canvas-scale-inner" id="canvasScaleInner">
          <div className="grid-container" id="gridContainer">
            {/* Le celle della griglia vengono generate dal motore (fashion-gallery.js) */}
          </div>
        </div>
      </div>
    </div>
  );
}
