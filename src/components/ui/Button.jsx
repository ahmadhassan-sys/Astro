import { Icon } from "./Icons.jsx";

/**
 * The site's pill button: a square pixel icon + a label.
 * `extra` passes any additional attributes (data-reveal, style, …).
 */
export default function Button({ label, href, icon = "target24", className = "", extra = {} }) {
  return (
    <a className={`b30btn b30btn--solid${className ? ` ${className}` : ""}`} href={href} data-btn="" data-anim={icon === "phone" ? "phone" : "target"} {...extra}>
      <span className="b30btn__ic"><Icon name={icon} /></span>
      <span className="b30btn__lbl" data-lbl="">{label}</span>
    </a>
  );
}
