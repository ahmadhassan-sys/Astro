import TargetLink from "../ui/TargetLink.jsx";

/**
 * Services page · 2. The four disciplines, each with its services in two columns,
 * and the holographic sphere that travels down the page.
 * Content: `disciplines` + `list` in src/data/services.js · Script: public/js/services-list.js
 * Styles: src/styles/services/list.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function ServicesList({ ariaLabel, cta, disciplines }) {
  let start = 0;   // every service has a page-wide number (data-i) that the script uses
  return (
    <section className="svx" id="services" aria-label={ariaLabel}>
      <div className="svx__orb" aria-hidden="true"><div className="svx__glow"></div><div className="svx__px"><canvas></canvas></div></div>
      {disciplines.map((d, n) => {
        const first = start;
        start += d.services.length;
        const half = Math.ceil(d.services.length / 2);   // left column first, then the right column
        const rows = Array.from({ length: half }, (_, k) => [k, half + k < d.services.length ? half + k : null]);
        const button = (o, side) => {
          const s = d.services[o];
          return (
            <button type="button" className={`svx__s ${side}`} data-i={first + o} style={{ "--o": o }} data-t={s.title} data-d={s.desc} aria-pressed="false">{s.title}</button>
          );
        };
        return (
          <article className="svx__p" id={d.id} data-c={d.color} style={{ "--c": d.color }} aria-labelledby={`svx-${d.id}-h`} key={d.id}>
            <header className="svx__hd">
              <div>
                <p className="svx__k" data-reveal="">{`(${String(n + 1).padStart(2, "0")})`}</p>
                <h2 className="svx__name" id={`svx-${d.id}-h`} data-heading="">{d.name}</h2>
              </div>
              <p className="svx__stmt" data-reveal="" data-pair="">{d.statement}</p>
            </header>
            <ul className="svx__list" aria-label={`${d.name} services`}>
              {rows.map(([l, r], k) => {
                const last = k === rows.length - 1;   // the last row has no rule under it
                return (
                  <li className={last ? "svx__row is-last" : "svx__row"} key={l}>
                    {button(l, "l")}
                    {r !== null ? button(r, "r") : null}
                    {last ? null : (
                      <>
                        <span className="svx__ln l" aria-hidden="true"></span><span className="svx__ln r" aria-hidden="true"></span>
                        <i className="svx__pp l" aria-hidden="true"></i><i className="svx__pp r" aria-hidden="true"></i>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="svx__ft">
              <TargetLink label={cta.label} href={cta.href} />
              <p className="svx__desc" aria-live="polite"></p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
