
/**
 * 6. Vision — "To take every idea from first sketch to full scale." on the opening panel.
 * Content: `vision` in src/data/home.js · Script: public/js/vision.js
 * Styles: src/styles/vision.css (loaded in order by the page's style list in src/styles/pages/)
 */
export default function Vision({ statement }) {
  return (
    <section className="vision" id="vision" aria-labelledby="vzTitle" data-vision="">
      <h2 className="vz-sr" id="vzTitle">{statement}</h2>
      {/* The panel opens from 1590 wide to full width as you scroll; the big type sits on dashed rules. */}
      <span className="vs-side l" aria-hidden="true"></span><span className="vs-side r" aria-hidden="true"></span>
      <div className="vs-panel" aria-hidden="true">
        <div className="vs-copy"><p className="vs-big">{statement}</p></div>
        <div className="vs-dev"><i className="vs-frame"></i><b className="vs-bl b1"></b><b className="vs-bl b2"></b><b className="vs-bl b3"></b><b className="vs-bl b4"></b></div>
      </div>
      <div className="vs-rules" aria-hidden="true"></div>
      <span className="vs-rule t" aria-hidden="true"></span><span className="vs-rule b" aria-hidden="true"></span>
      <span className="vs-vl l" aria-hidden="true"></span><span className="vs-vl r" aria-hidden="true"></span>
      <i className="vs-px l" aria-hidden="true"></i><i className="vs-px r" aria-hidden="true"></i>
      <i className="vs-px b l" aria-hidden="true"></i><i className="vs-px b r" aria-hidden="true"></i>
      <span className="pg-vx l" aria-hidden="true"></span><span className="pg-vx r" aria-hidden="true"></span>
    </section>
  );
}
