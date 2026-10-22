import { Fragment } from "react";
import { Icon } from "./ui/Icons.jsx";
import Header from "./Header.jsx";

/**
 * 1. Hero — header, headline, the monitor with the showreel and the orbiting words.
 * Content: `hero` in src/data/home.js (+ `nav` from src/data/site.js)
 * Scripts: public/js/hero.js, header.js, hero-light.js
 * Styles: src/styles/hero.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Hero({ ariaLabel, nav, title, intro, cta, orbitLabel, media }) {
  return (
    <section className="b30h" data-b30-hero="" aria-label={ariaLabel}>
      <div className="b30h__pin">
        <div className="b30h__stage">
          <span className="b30h__vline b30h__vline--34" aria-hidden="true"></span>
          <i className="b30h__px" style={{ "--x": "82" }} aria-hidden="true"></i>
          <i className="b30h__px" style={{ "--x": "960" }} aria-hidden="true"></i>
          <i className="b30h__px" style={{ "--x": "1838" }} aria-hidden="true"></i>
          <span className="b30h__vline b30h__vline--27" aria-hidden="true"></span>
          <img className="b30h__glow" src={media.glow} alt="" aria-hidden="true" decoding="async" />

          <Header {...nav} page="home" />

          <div className="b30h__copy">
            <h1 className="b30h__title">
              <span>{title.line1}</span> <span><span className="b30h__sk b30-alt">{title.highlight}</span>{title.line2}</span>
            </h1>
            <div className="b30h__intro">
              <p>
                {intro.map((line, i) => (
                  <Fragment key={i}>{i > 0 ? " " : null}<span>{line}</span></Fragment>
                ))}
              </p>
              <a className="b30h__btn b30h__btn--line" href={cta.href} data-btn="" data-anim={cta.icon}>
                <i><Icon name={cta.icon} /></i>
                <span data-lbl="">{cta.label}</span>
              </a>
            </div>
          </div>

          <div className="b30h__scene">
            <div className="b30h__rig">
              <svg className="b30h__ring" viewBox="0 0 1404 1404" aria-hidden="true">
                <defs>
                  <linearGradient id="b30h-ring-fade" x1="702" y1="0" x2="702" y2="360" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#000" />
                    <stop offset="1" stopColor="#000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#b30h-ring-fade)" strokeOpacity="0.15" strokeWidth="1">
                  <circle cx="702" cy="702" r="701.5" />
                  <circle cx="702" cy="702" r="577.5" />
                </g>
              </svg>
              <div className="b30h__orbit" role="img" aria-label={orbitLabel}>
                <svg className="b30h__words" viewBox="0 0 1404 1404" aria-hidden="true"><path id="b30h-orbit-path" fill="none" /><g></g></svg>
              </div>
              <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                <filter id="b30-fgnight" colorInterpolationFilters="sRGB">
                  <feComponentTransfer>
                    <feFuncR type="table" tableValues="0.02 0.4 0.54 0.58" />
                    <feFuncG type="table" tableValues="0.02 0.4 0.54 0.58" />
                    <feFuncB type="table" tableValues="0.03 0.42 0.57 0.62" />
                  </feComponentTransfer>
                </filter>
              </svg>
              <div className="b30h__fg">
                <img src={media.foreground} alt="" decoding="async" />
                <canvas aria-hidden="true"></canvas>
              </div>
              <div className="b30h__screen">
                <video muted autoPlay loop playsInline preload="auto" disablePictureInPicture poster={media.reelPoster}
                  data-asset="b30-reel" data-video={media.reelVideo} aria-label={media.reelLabel}></video>
              </div>
              <img className="b30h__bezel" src={media.bezel} alt="" decoding="async" />
            </div>
          </div>
          <video className="b30h__fgsrc" data-asset="b30-fg" data-video={media.foregroundVideo} muted playsInline preload="auto" aria-hidden="true"></video>

          <span className="b30h__vline b30h__vline--26" aria-hidden="true"></span>
        </div>
        {/* outside the stage, so the dim covers the whole screen even while the stage shrinks */}
        <div className="b30h__dim" aria-hidden="true"></div>
      </div>
    </section>
  );
}
