import { Icon } from "../ui/Icons.jsx";

/**
 * Services page · 3. Say hello — the short line, the button, the hand and the big statement.
 * Content: `hello` in src/data/services.js · (no script of its own)
 * Styles: src/styles/services/say-hello.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function SayHello({ text, cta, hand, heading }) {
  return (
    <section className="svhello" id="hello" aria-labelledby="svhello-h">
      <div className="svhello__bg" aria-hidden="true"></div>
      <p className="svhello__p" data-reveal="" data-pair="">{text}</p>
      <a className="b30h__btn b30h__btn--solid" href={cta.href} data-btn="" data-reveal="" data-pair="" style={{ "--rd": "220ms" }} data-anim={cta.icon}>
        <i><Icon name={cta.icon} /></i>
        <span data-lbl="">{cta.label}</span>
      </a>
      <div className="svhello__hand"><img src={hand} alt="" width="1129" height="606" decoding="async" /></div>
      <h2 className="svhello__h" id="svhello-h" data-heading="" data-speed="1.04">{heading}</h2>
    </section>
  );
}
