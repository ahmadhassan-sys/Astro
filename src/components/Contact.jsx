
/**
 * 9. Contact — the big closing line before the footer. The script writes `contact.heading`
 * (one entry per line) into the panel and animates it.
 * Content: `contact` in src/data/site.js · Script: public/js/contact.js
 * Styles: src/styles/contact.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Contact({ heading, text }) {
  return (
    <section className="b30c" id="contact" aria-label={heading.join(" ")}>
      <div className="b30c__in">
        <p className="b30c__txt" data-heading="">{text}</p>
      </div>
      <i className="b30c__st o l" aria-hidden="true"></i><i className="b30c__st i l" aria-hidden="true"></i>
      <i className="b30c__st i r" aria-hidden="true"></i><i className="b30c__st o r" aria-hidden="true"></i>
    </section>
  );
}
