import Rich from "./ui/Rich.jsx";

/**
 * 3. Selected work — the case-study rows are built by the script from `work.items`.
 * Content: `work` in src/data/home.js · Script: public/js/work.js
 * Styles: src/styles/work.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Work({ intro, heading }) {
  return (
    <section className="work" id="work" aria-labelledby="workTitle">
      <div className="wrap">
        <header className="work-head grid3">
          <p data-reveal="" data-pair="" data-speed="0.97">{intro}</p>
          <h2 id="workTitle" data-heading="" data-speed="1.04"><Rich text={heading} /></h2>
        </header>

        <div className="work-body" id="workBody">
          <div id="rows"></div>
        </div>
      </div>
    </section>
  );
}
