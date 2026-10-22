import Rich from "./ui/Rich.jsx";
import Button from "./ui/Button.jsx";

/**
 * 5. Why one team — the short statement after the services.
 * Content: `whyOneTeam` in src/data/home.js · (no script of its own)
 * Styles: src/styles/why-one-team.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function WhyOneTeam({ ariaLabel, text, cta, heading }) {
  return (
    <section className="b30sb" aria-label={ariaLabel}>
      <div className="b30sb__l" data-speed="0.97">
        <p data-reveal="" data-pair="">{text}</p>
        <Button label={cta.label} href={cta.href} icon={cta.icon} extra={{ "data-reveal": "", "data-pair": "", style: { "--rd": "260ms" } }} />
      </div>
      <h2 className="b30sb__h" data-heading="" data-speed="1.04"><Rich text={heading} /></h2>
    </section>
  );
}
