import TargetLink from "./ui/TargetLink.jsx";

/**
 * 8. Testimonials — the slider; each card is built by the script from `testimonials.items`.
 * Content: `testimonials` in src/data/site.js · Script: public/js/testimonials.js
 * Styles: src/styles/testimonials.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Testimonials({ heading, eyebrow, cta, verifiedBy, nextLabel, items }) {
  const count = `01/${String(items.length).padStart(2, "0")}`;
  return (
    <section className="ts" id="testimonials" aria-labelledby="ts-h" aria-roledescription="carousel">
      <div className="ts__top">
        <div className="ts__row1">
          <h2 className="ts__h" id="ts-h" data-heading="" data-speed="1.04">{heading}</h2>
          <p className="ts__eye" data-reveal="" data-pair="" data-speed="0.97">{`${eyebrow} `}<span className="ts__count sr" aria-live="polite">{count}</span></p>
        </div>
        <TargetLink label={cta.label} href={cta.href} />
      </div>
      {/* Each testimonial sits in its own dashed frame; Next / drag slides the row to the left. */}
      <div className="ts__sl" data-speed="0.985" role="group" aria-roledescription="carousel" aria-label={eyebrow}>
        <div className="ts__trk"></div>
        <template className="ts__vtpl">
          <div className="ts__ver">
            <img className="cl" src={verifiedBy.logo} alt={verifiedBy.name} width="212" height="60" />
            <span className="ok">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="7" fill="#1FAA59" />
                <path d="M4.8 8.2l2.1 2.1 4.3-4.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{verifiedBy.label}</span>
            </span>
          </div>
        </template>
      </div>
      <div className="ts__cur" aria-hidden="true"><b>{nextLabel}</b></div>
    </section>
  );
}
