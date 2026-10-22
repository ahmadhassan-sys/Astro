import { Wordmark, Icon } from "./ui/Icons.jsx";
import { hrefFor, isOtherPage } from "./ui/links.js";

/**
 * Site header — logo, links and the "Get in touch" button. Sits inside each page's hero.
 * Content: `nav` in src/data/site.js · Script: public/js/header.js
 * `page` is the current page key ("home", "services", "contact") so links can point to the right place.
 */
export default function Header({ homeLabel, links, cta, page }) {
  return (
    <header className="b30h__nav">
      <a className="b30h__logo" href="/" aria-label={homeLabel}>
        <Wordmark />
      </a>
      <ul className="b30h__links">
        {links.map((link) => {
          const href = hrefFor(link, page);
          const attrs = {};
          if (link.page === page) attrs["aria-current"] = "page";
          if (isOtherPage(href)) attrs["data-pt"] = "";   // page transition when leaving the page
          return (
            <li key={link.label}>
              <a href={href} data-hscr="" {...attrs}>{link.label}</a>
            </li>
          );
        })}
      </ul>
      <a className="b30h__btn b30h__btn--solid" href={hrefFor(cta, page)} data-btn="" data-anim={cta.icon} {...(isOtherPage(hrefFor(cta, page)) ? { "data-pt": "" } : {})}>
        <i><Icon name={cta.icon} /></i>
        <span data-lbl="">{cta.label}</span>
      </a>
    </header>
  );
}
