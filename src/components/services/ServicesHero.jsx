import Header from "../Header.jsx";
import Rich from "../ui/Rich.jsx";

/**
 * Services page · 1. Hero — header, the two-line title, the picture frame, the discipline index and the intro.
 * Content: `hero` + `disciplines` in src/data/services.js (+ `nav` from src/data/site.js)
 * Scripts: public/js/services-hero.js (the picture), header.js, hero-light.js
 * Styles: src/styles/hero.css, src/styles/services/hero.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function ServicesHero({ nav, title, intro, glow, media, indexLabel, disciplines }) {
  return (
    <section className="b30h wk-hero" aria-labelledby="sv-title">
      <div className="b30h__pin">
        <div className="b30h__stage">
          <span className="b30h__vline b30h__vline--34" aria-hidden="true"></span>
          <i className="b30h__px" style={{ "--x": "82" }} aria-hidden="true"></i>
          <i className="b30h__px b30h__px--c" style={{ "--x": "960" }} aria-hidden="true"></i>
          <i className="b30h__px" style={{ "--x": "1838" }} aria-hidden="true"></i>
          <span className="b30h__vline b30h__vline--27" aria-hidden="true"></span>
          <img className="b30h__glow" src={glow} alt="" aria-hidden="true" decoding="async" />
          <div className="b30h__glowx" aria-hidden="true"></div>

          <Header {...nav} page="services" />

          <h1 className="svh__title" id="sv-title" data-heading="">
            <span><Rich text={title[0]} /></span> <span><Rich text={title[1]} /></span>
          </h1>
          <a className="svh__media" href={media.href} aria-label={media.label}><span className="wk-media__in"></span></a>
          <nav className="svh__idx" aria-label={indexLabel}>
            <ul>
              {disciplines.map((d) => (
                <li key={d.id}>
                  <a href={`#${d.id}`} style={{ "--c": d.color }}><i aria-hidden="true"></i><span>{d.name}</span></a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="svh__intro" data-reveal="" style={{ "--rd": "200ms" }}>{intro}</p>

          <span className="b30h__vline b30h__vline--26" aria-hidden="true"></span>
        </div>
        <div className="wk-hero__dim" aria-hidden="true"></div>
      </div>
    </section>
  );
}
