import { Fragment } from "react";
import Button from "./ui/Button.jsx";
import { hrefFor } from "./ui/links.js";

/**
 * 10. Footer — the pixel wordmark, the closing line, link columns and the legal bar.
 * Content: `footer` in src/data/site.js · Script: public/js/footer.js
 * `page` is the current page key, so the links point to the right place.
 * Styles: src/styles/footer.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Footer({ wordmark, heading, columns, cta, copyright, legal, page }) {
  return (
    <footer className="b30f" id="footer" aria-labelledby="bt-footer-title">
      <div className="b30f__in">
        <div className="b30f__dim" aria-hidden="true"></div>
        <div className="b30f__top"></div>
        <i className="b30f__ln h" aria-hidden="true"></i><i className="b30f__ln v l" aria-hidden="true"></i>
        <i className="b30f__ln v r" aria-hidden="true"></i><i className="b30f__ln sq l" aria-hidden="true"></i>
        <i className="b30f__ln sq r" aria-hidden="true"></i>
        <div className="b30f__cap" aria-hidden="true"></div>
        <div className="bt-footer">
          <canvas className="bt-canvas" aria-hidden="true"></canvas>
          <h2 id="bt-footer-title" className="sr-only">{wordmark}</h2>
          <div className="bt-fallback" aria-hidden="true"></div>
        </div>
        <div className="b30f__c">
          <h2 className="b30f__h" data-fascii="">
            {heading.before}<span className="b30-alt" data-alt-host="">{heading.highlight}</span>{heading.after}<span className="b30f__h2">{heading.second}</span>
          </h2>
          {columns.map((col) => {
            const Tag = col.nav ? "nav" : "div";
            const pos = { left: `calc(${col.x}*var(--u))`, top: `calc(${col.y}*var(--u))` };
            return (
              <Tag className="b30f__col" style={pos} key={col.title} {...(col.nav ? { "aria-label": col.title } : {})}>
                <div className="b30f__t" data-fascii="">{col.title}</div>
                {col.links
                  ? col.links.map((link) => (
                      <a key={link.label} href={hrefFor(link, page)} data-hscr="" data-fascii="" {...(link.external ? { target: "_blank", rel: "noopener" } : {})}>{link.label}</a>
                    ))
                  : <address data-fascii="">{col.address}</address>}
              </Tag>
            );
          })}
          <Button label={cta.label} href={cta.href} icon={cta.icon} className="b30f__cta" />
          <div className="b30f__bar">
            <span data-fascii="">© <span data-year="">{copyright.year}</span>{copyright.text}</span>
            <span className="b30f__legal">
              {legal.map((link, i) => (
                <Fragment key={link.label}>{i > 0 ? <i></i> : null}<a href={link.href} data-hscr="" data-fascii="">{link.label}</a></Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
