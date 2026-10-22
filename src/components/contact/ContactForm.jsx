import { Icon } from "../ui/Icons.jsx";

/**
 * Contact page · 2. The form — company details on the left (with the dithered hand), the form on the right.
 * Sending opens the visitor's email app with the message filled in (see public/js/contact-page.js).
 * Content: `form` in src/data/contact.js (+ `company` from src/data/site.js)
 * Styles: src/styles/contact/form.css
 */
export default function ContactForm({ heading, note, company, form }) {
  let delay = 120;   // the fields come in one after another
  return (
    <section className="ctf" id="form" aria-labelledby="ctf-title">
      <div className="ctf__head">
        <h2 className="ctf__h" id="ctf-title" data-heading="">{heading}</h2>
        <p className="ctf__note" data-reveal="">{note}</p>
      </div>
      <div className="ctf__row">
        <div className="ctf__l">
          <h3 className="ctf__k" data-heading="">{form.contactLabel}</h3>
          <ul className="ctf__info">
            <li data-reveal="" style={{ "--rd": "200ms" }}><a href={`mailto:${company.email}`} data-hscr="">{company.email}</a></li>
            <li data-reveal="" style={{ "--rd": "270ms" }}><a href={company.phoneHref} data-hscr="">{company.phone}</a></li>
            <li data-reveal="" style={{ "--rd": "340ms" }}><address>{company.address}</address></li>
          </ul>
          <div className="ctf__hand" aria-hidden="true"><div className="ctf__handm"><div className="ctf__handp"><div className="ctf__handf"><canvas width="457" height="207"></canvas></div></div></div></div>
        </div>
        <div className="ctf__r">
          <h3 className="ctf__k" data-heading="">{form.writeLabel}</h3>
          <form className="ctf__form" noValidate>
            {form.fields.map((f) => {
              const d = delay; delay += 70;
              return (
                <label className="ctf__f" data-reveal="" style={{ "--rd": `${d}ms` }} key={f.name}>
                  <span className="sr-only">{f.label}</span>
                  <input type={f.type} name={f.name} placeholder={f.label} autoComplete={f.autocomplete} {...(f.inputmode ? { inputMode: f.inputmode } : {})} {...(f.required ? { required: true } : {})} />
                  <i></i>
                </label>
              );
            })}
            <fieldset className="ctf__need">
              <legend data-reveal="">{form.needsLabel}</legend>
              <div className="ctf__chips">
                {form.needs.map((n, k) => (
                  <label className="ctf__chip" data-reveal="" style={{ "--k": k }} key={n}>
                    <input type="checkbox" name="need" value={n} /><span>{n}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="ctf__d" data-reveal="">
              <span className="ctf__dl">{form.detailsLabel}</span>
              <span className="ctf__ta"><textarea name="details" rows="6"></textarea></span>
            </label>
            <div className="ctf__foot" data-reveal="">
              <button type="submit" className="b30h__btn b30h__btn--solid ctf__send" data-btn="" data-anim="phone">
                <i><Icon name="phone" /></i>
                <span data-lbl="">{form.sendLabel}</span>
              </button>
              <p className="ctf__legal">{form.legal.before}<a href={form.legal.href}>{form.legal.link}</a>{form.legal.after}</p>
            </div>
            <p className="ctf__status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </section>
  );
}
