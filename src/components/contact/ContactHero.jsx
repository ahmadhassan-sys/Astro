import { Fragment } from "react";
import Header from "../Header.jsx";
import Rich from "../ui/Rich.jsx";

/**
 * Contact page · 1. Hero — header, the office globe, the title, the "scroll to the form" hint and the intro.
 * Content: `hero` in src/data/contact.js (+ `nav` from src/data/site.js, offices from src/data/partners.js)
 * Scripts: public/js/contact-globe.js, contact-page.js, contact-hero.js, header.js
 * Styles: src/styles/contact/hero.css, src/styles/contact/globe.css
 */
export default function ContactHero({ nav, ariaLabel, title, hint, intro, globeLabel }) {
  return (
    <section className="b30h cth" aria-label={ariaLabel}>
      <div className="b30h__pin">
        <div className="b30h__stage cth__stage">
          <span className="b30h__vline b30h__vline--34" aria-hidden="true"></span>
          <i className="b30h__px" style={{ "--x": "82" }} aria-hidden="true"></i>
          <i className="b30h__px" style={{ "--x": "960" }} aria-hidden="true"></i>
          <i className="b30h__px" style={{ "--x": "1838" }} aria-hidden="true"></i>
          <span className="b30h__vline b30h__vline--27" aria-hidden="true"></span>
          <canvas className="cth__glow" width="384" height="208" aria-hidden="true"></canvas>

          <Header {...nav} page="contact" />

          <div className="og og--hero" id="hero-globe" data-mode="partner">
            <canvas className="og__canvas" aria-hidden="true"></canvas>
            <div className="locs"></div>
            <ul className="partner-links" aria-label={globeLabel} style={{ margin: "0", padding: "0", listStyle: "none" }}></ul>
          </div>

          <h1 className="cth__title" data-heading="">
            {title.map((line, i) => (
              <Fragment key={i}>{i > 0 ? " " : null}<span><Rich text={line} /></span></Fragment>
            ))}
          </h1>
          <a className="cth__hint" href={hint.href}>{hint.label}</a>
          <p className="cth__intro">{intro}</p>

          <span className="b30h__vline b30h__vline--26" aria-hidden="true"></span>
        </div>
        <div className="cth__dim" aria-hidden="true"></div>
      </div>
    </section>
  );
}
