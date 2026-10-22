/* =====================================================================
   Official partners strip — continuous logo loop, pattern parallax on
   arrival (as the section slides over the hero), smooth blink on hover.
   ===================================================================== */
(() => {
  const sec = document.getElementById("partners");
  if (!sec) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const u = () => document.documentElement.clientWidth / 1920;

  /* ---------- marquee: never pauses, hover only lifts the logo ---------- */
  const track = sec.querySelector(".b30p__track");
  const set = track.innerHTML;
  track.innerHTML = set + set + set;
  [...track.children].forEach((li, i) => { if (i >= track.children.length / 3) li.setAttribute("aria-hidden", "true"); });
  let off = 0, setW = 1, lastT = performance.now(), mqOn = true;
  const measure = () => { setW = track.scrollWidth / 3 || 1; };
  measure(); addEventListener("resize", measure);
  document.fonts && document.fonts.ready.then(measure);
  new IntersectionObserver(([e]) => { mqOn = e.isIntersecting; }).observe(sec);

  /* ---------- pattern ---------- */
  const rows = [...sec.querySelectorAll(".b30p__row")];
  const fades = [...sec.querySelectorAll(".b30p__fade")];
  const main = document.getElementById("main");
  const px = sec.querySelector(".b30p__px");
  const squares = [...px.querySelectorAll("i")].map((el) => ({ el, b: el.firstElementChild, last: -1e9 }));

  function blink(sq, delay, strong) {
    const now = performance.now();
    if (now - sq.last < 900) return;
    sq.last = now + delay;
    sq.b.animate(
      strong
        ? [{ opacity: 1, transform: "scale(1)" }, { opacity: 0.06, transform: "scale(.72)", offset: 0.42 }, { opacity: 1, transform: "scale(1)" }]
        : [{ opacity: 1, transform: "scale(1)" }, { opacity: 0.38, transform: "scale(.88)", offset: 0.45 }, { opacity: 1, transform: "scale(1)" }],
      { duration: strong ? 780 : 680, delay, easing: "cubic-bezier(.45,0,.2,1)" }
    );
  }
  px.addEventListener("pointermove", (e) => {
    if (reduced) return;
    const k = u(), hit = Math.max(26, 56 * k), wave = 240 * k;
    let src = null, best = 1e9;
    for (const s of squares) {
      const r = s.el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      s._d = d;
      if (d < best) { best = d; src = s; }
    }
    if (!src || best > hit || performance.now() - src.last < 900) return;
    const sr = src.el.getBoundingClientRect();
    blink(src, 0, true);
    for (const s of squares) {
      if (s === src) continue;
      const r = s.el.getBoundingClientRect();
      const d = Math.hypot(r.left - sr.left, r.top - sr.top);
      if (d < wave) blink(s, 70 + d * 1.4, false);
    }
  }, { passive: true });

  /* ---------- loop ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  let qs = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    if (mqOn) {
      if (!reduced) off = (off + dt * 46 * Math.max(0.6, u())) % setW;
      track.style.transform = `translate3d(${-off.toFixed(2)}px,0,0)`;
      // arrival parallax: rows settle at different speeds as the section rises over the hero
      const vh = innerHeight;
      const sr = sec.getBoundingClientRect(), goal = reduced ? 1 : easeOut(Math.min(1, Math.max(0, (vh - sr.top) / (vh * 0.55))));   // rows settle as the strip rises into view   // no pinned hero here: rows settle at different speeds as you scroll
      qs += (goal - qs) * (1 - Math.exp(-dt * 7));
      const q = qs;
      const k = u();
      const mid = (sr.top + sr.height * .5 - vh * .5) / vh;               // −… above centre · 0 centred · + below
      rows.forEach((r, i) => { const par = reduced ? 0 : Math.max(-1, Math.min(1, mid)) * (6 + i * 5) * k;   // a very subtle parallax: farther rows drift a touch more
        r.style.transform = `translate3d(0,${((1 - q) * (22 + i * 20) * k + par).toFixed(2)}px,0)`; });
      // the steps draw in from full width to 1756 / 1592 as the strip comes up the screen
      const spT = reduced ? 1 : Math.min(1, Math.max(0, (vh - sr.top) / (vh * 0.6))), spG = spT * spT * (3 - 2 * spT);
      sec._sp = sec._sp === undefined ? spG : sec._sp + (spG - sec._sp) * (1 - Math.exp(-dt * 9));
      sec.style.setProperty("--sp", (Math.abs(spG - sec._sp) < 0.001 ? spG : sec._sp).toFixed(4));
      fades.forEach((f) => { f.style.transform = ''; f.style.opacity = ''; });   // logos stay crisp from the start
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* the pixel band under the partners strip: a slight ripple on hover — rings spread out from the cursor and nudge the
   pixels outward and back as they pass (a few px, fading with distance), on top of the existing soft blink */
(() => {
  const sec = document.querySelector('.b30p'), px = sec && sec.querySelector('.b30p__px'); if (!px) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
  const sq = [...px.querySelectorAll('i')];
  const rings = []; let raf = 0, lastSpawn = 0, lx = -1e4, ly = -1e4;
  const u = () => document.documentElement.clientWidth / 1920;
  function frame(now) {
    raf = 0;
    for (let i = rings.length - 1; i >= 0; i--) if (now - rings[i].t > 1400) rings.splice(i, 1);
    const k = u(), SPEED = 420 * k, W = 52 * k, AMP = 8 * Math.max(.6, k), REACH = 460 * k;
    for (const el of sq) {
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let dx = 0, dy = 0, sc = 0;
      for (const g of rings) {
        const age = (now - g.t) / 1000, rad = age * SPEED, ex = cx - g.x, ey = cy - g.y, d = Math.hypot(ex, ey) || 1;
        if (d > REACH) continue;
        const band = Math.exp(-Math.pow((d - rad) / W, 2)), life = Math.max(0, 1 - age / 1.4), fall = 1 - d / REACH;
        const a = band * life * fall * g.s;
        dx += ex / d * AMP * a; dy += ey / d * AMP * a; sc += a;
      }
      if (Math.abs(dx) + Math.abs(dy) > .05) { el.style.translate = `${dx.toFixed(2)}px ${dy.toFixed(2)}px`; el.style.scale = (1 + Math.min(.35, sc * .3)).toFixed(3); }
      else if (el.style.translate) { el.style.translate = ''; el.style.scale = ''; }
    }
    if (rings.length) raf = requestAnimationFrame(frame);
  }
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = px.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top - 20 || e.clientY > r.bottom + 20) return;
    const now = performance.now(), moved = Math.hypot(e.clientX - lx, e.clientY - ly);
    if (now - lastSpawn < 140 || moved < 14) return;                     // a new ring every so often as the cursor travels
    lastSpawn = now; lx = e.clientX; ly = e.clientY;
    rings.push({ x: e.clientX, y: e.clientY, t: now, s: Math.min(1, .45 + moved / 120) });
    if (rings.length > 6) rings.shift();
    if (!raf) raf = requestAnimationFrame(frame);
  }, { passive: true });
})();
