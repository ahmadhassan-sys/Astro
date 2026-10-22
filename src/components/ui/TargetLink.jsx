/**
 * The small outlined "target" link (round icon + label), e.g. "Get in touch" under the testimonials
 * heading and under each discipline on the services page.
 */
export default function TargetLink({ label, href }) {
  return (
    <a className="ts__btn" href={href} aria-label={label}>
      <span className="ic" aria-hidden="true">
        <svg viewBox="0 0 22 22" fill="none" stroke="#000" strokeWidth="1.3">
          <circle cx="11" cy="11" r="9.5" /><circle cx="11" cy="11" r="6.5" /><circle cx="11" cy="11" r="3.5" />
          <circle cx="11" cy="11" r=".9" fill="#000" stroke="none" />
        </svg>
      </span>
      <span className="lb"><span className="lbt">{label}</span></span>
    </a>
  );
}
