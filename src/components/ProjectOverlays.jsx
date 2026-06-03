export default function ProjectOverlays() {
  return (
    <>
      <div className="split-screen-container" id="splitScreenContainer">
        <div className="split-left" id="splitLeft">
          <div className="zoom-target" id="zoomTarget"></div>
        </div>
        <div className="split-right" id="splitRight">
          {/* Contenuto pannello destro */}
        </div>
      </div>

      <div className="image-title-overlay" id="imageTitleOverlay">
        <div className="image-slide-number" id="imageSlideNumber">
          <span>01</span>
        </div>
        <div className="image-slide-title" id="imageSlideTitle">
          <h1>Fashion Portrait</h1>
        </div>
        <div
          className="image-slide-description-scroll"
          id="imageSlideDescriptionScroll"
          aria-label="Descrizione"
        >
          <div className="image-slide-description" id="imageSlideDescription">
            {/* Le righe vengono generate dinamicamente */}
          </div>
        </div>
      </div>
    </>
  );
}
