import Rich from "./ui/Rich.jsx";

/**
 * 4. Services — the hands and the cube; the four service faces are built by the script from `services.items`.
 * Content: `services` in src/data/home.js · Script: public/js/services.js
 * Styles: src/styles/services.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Services({ heading, label, lede, hands }) {
  return (
    <section className="b30s" id="services" aria-labelledby="b30s-title">
      <div className="b30s__head">
        <svg className="b30s__band" viewBox="0 0 1920 413" preserveAspectRatio="none" aria-hidden="true"></svg>
        <div className="b30s__headworld">
          <h2 className="b30s__title" id="b30s-title" data-heading="manual" data-speed="1.04"><Rich text={heading} /></h2>
          <div className="b30s__intro">
            <p className="b30s__label" data-reveal="" data-pair="" style={{ "--rd": "120ms" }}>{label}</p>
            <p className="b30s__lede" data-reveal="" data-pair="" data-speed="0.97" style={{ "--rd": "220ms" }}>{lede}</p>
          </div>
        </div>
      </div>

      <div className="b30s__track">
        <div className="b30s__stage">
          <div className="b30s__world">
            <div className="b30s__box" data-el="box">
              <div className="b30s__cam" data-el="cam"></div>
            </div>
            <div className="b30s__hand" data-el="robot" style={{ width: "990.5px", height: "450px" }}>
              <img className="b30s__handimg robot" alt="" src={hands.robot} draggable="false" />
            </div>
            <div className="b30s__hand" data-el="human" style={{ width: "1046.5px", height: "450px" }}>
              <img className="b30s__handimg human" alt="" src={hands.human} draggable="false" />
            </div>
            {/* pixels sit above the hands so the yellow one can rest on the hand */}
            <div className="b30s__abs b30s__deco" data-el="deco" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      <div className="b30s__tail"></div>

      <div className="b30s__mobile">
        <svg className="b30s__band" viewBox="0 0 1920 413" preserveAspectRatio="none" aria-hidden="true"></svg>
        <h2 className="b30s__title"><Rich text={heading} /></h2>
        <div className="b30s__intro">
          <p className="b30s__label">{label}</p>
          <p className="b30s__lede">{lede}</p>
        </div>
        <div className="m-scene" aria-hidden="true"></div>
        <div className="m-cards"></div>
      </div>
    </section>
  );
}
