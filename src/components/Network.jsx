
/**
 * 7. Our network — partner logo grid that turns into a globe of our offices.
 * The visible block (heading, switch, logo grid, globe) is built by the script from:
 *   `network.copy` in src/data/home.js and partners / locations in src/data/partners.js
 * Script: public/js/network.js
 *
 * The markup below is an older version of this section. It is hidden by the CSS, but the
 * scripts still hook into its elements (canvas, switch, globe), so keep it in place.
 * Styles: src/styles/network.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Network() {
  return (
    <section className="pg" id="partners-network" data-mode="partner" aria-labelledby="pg-h">
      <div className="pg__head">
        <p className="pg__eye" data-reveal="" data-pair="" data-speed="0.97"><span className="sw on" data-for="partner">Official Partners</span><span className="sw" data-for="global">Globally Connected</span></p>
        <div className="pg__row">
          <h2 className="pg__h" id="pg-h" aria-live="polite" data-speed="1.04"><span className="sw on" data-for="partner">A strong network makes good work better.</span><span className="sw" data-for="global">Wherever you are, we’re already awake.</span></h2>
          <div className="pg__tabs" role="group" aria-label="Show">
            <button className="pg__tab" type="button" data-to="partner" aria-pressed="true" title="Official partners"><canvas data-ico="partner" aria-hidden="true"></canvas><span className="sr">Official partners</span></button>
            <button className="pg__tab" type="button" data-to="global" aria-pressed="false" title="Globally connected"><canvas data-ico="global" aria-hidden="true"></canvas><span className="sr">Globally connected</span></button>
          </div>
        </div>
      </div>
      <div className="pg__stage" data-speed="0.98">
        <div className="pg__grid"></div>
        <div className="pg__globe">
    <section className="og" id="one-globe" data-mode="partner" aria-labelledby="og-title">
      <h2 className="og__title" id="og-title" aria-live="polite" data-heading="" data-speed="1.06"><span className="h on" data-for="partner">A strong network makes good work better.</span><span className="h" data-for="global">Wherever you are, we’re already awake.</span></h2>
      <p className="og__body" data-speed="1.06"><span className="b" data-for="partner">We team up with platforms that share our love for building better digital experiences. Together, we turn good ideas into work that works.</span><span className="b" data-for="global">Our people work across time zones, so your project keeps moving while you sleep. Somewhere, someone on the team is already on it.</span></p>
      <div className="og__seg" role="group" aria-label="Perspective"><span className="og__knob" aria-hidden="true"></span><button type="button" data-to="partner" title="Official partners" aria-pressed="true"><canvas className="og__ico" data-ico="partner" aria-hidden="true"></canvas>Official partners</button><button type="button" data-to="global" title="Globally connected" aria-pressed="false"><canvas className="og__ico" data-ico="global" aria-hidden="true"></canvas>Globally connected</button></div>
      <canvas className="og__canvas" aria-hidden="true"></canvas>
      <div className="locs"></div>

      <ul className="partner-links" aria-label="Official partners" style={{margin: "0", padding: "0", listStyle: "none"}}></ul>

      <div className="og__switch" role="radiogroup" aria-label="Perspective">
        <button className="tab" role="radio" aria-checked="true" data-mode="partner">Official Partners</button>
        <button className="chip" type="button" data-target="partner" tabIndex="-1" aria-hidden="true">Click</button>
        <span className="sep" aria-hidden="true">/</span>
        <button className="tab" role="radio" aria-checked="false" data-mode="global" tabIndex="-1">Globally Connected</button>
        <button className="chip" type="button" data-target="global" tabIndex="-1" aria-hidden="true">Click</button>
      </div>
    </section>
        </div>
      </div>
    </section>
  );
}
