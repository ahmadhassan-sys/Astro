/* =====================================================================
   Header logo — on hover the logo goes straight to 30 small black pixels,
   lifted from points along every letter, which float apart through the logo's
   space in 3D (depth, orbit, drift). On leave they glide back onto the letters
   and the vector logo resolves under them. No in-between state, no pause.
   ===================================================================== */
(() => {
  const logo = document.querySelector(".b30h__logo");
  const svg = logo && logo.querySelector("svg");
  if (!svg || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const N = 30;
  const cv = document.createElement("canvas");
  cv.className = "b30-logo-px"; cv.setAttribute("aria-hidden", "true");
  logo.appendChild(cv);
  const ctx = cv.getContext("2d");
  let logoImg = null, W = 0, H = 0, M = 0, dpr = 1, sz = 4, P = [], ready = false, open = false, raf = 0, last = 0, t = 0, m = 0;

  async function build() {
    W = logo.offsetWidth; H = logo.offsetHeight;
    if (!W || !H) return;
    sz = Math.max(3, H / 9);
    M = Math.round(sz * 3);
    dpr = Math.min(devicePixelRatio || 1, 2);
    Object.assign(cv.style, { left: -M + "px", top: -M + "px", width: W + 2 * M + "px", height: H + 2 * M + "px" });
    cv.width = Math.round((W + 2 * M) * dpr); cv.height = Math.round((H + 2 * M) * dpr);
    const clone = svg.cloneNode(true);
    clone.setAttribute("width", W); clone.setAttribute("height", H);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
    try { await img.decode(); } catch (_) { return; }
    logoImg = img;
    const off = document.createElement("canvas"); off.width = W; off.height = H;
    const o = off.getContext("2d"); o.drawImage(img, 0, 0, W, H);
    const d = o.getImageData(0, 0, W, H).data;
    const ink = (x, y) => x >= 0 && y >= 0 && x < W && y < H && d[((y | 0) * W + (x | 0)) * 4 + 3] > 160;
    // floating spots: a jittered 10 x 3 grid over the logo's space, so the pixels stay well apart
    const spots = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++)
      spots.push([((c + 0.5 + (Math.random() - 0.5) * 0.6) / 10) * (W + M) - M / 2, ((r + 0.5 + (Math.random() - 0.5) * 0.5) / 3) * (H + M) - M / 2]);
    spots.sort(() => Math.random() - 0.5);
    P = [];
    for (let i = 0; i < N; i++) {
      const x0 = ((i + 0.5) / N) * W;
      let hx = x0, hy = H / 2;
      for (let k = 0; k < 120; k++) {                    // a point on the ink, in this slice of the logo
        const x = x0 + (Math.random() - 0.5) * (W / N), y = Math.random() * H;
        if (ink(x, y)) { hx = x; hy = y; break; }
      }
      const [fx, fy] = spots.reduce((best, s) => (Math.hypot(s[0] - hx, s[1] - hy) < Math.hypot(best[0] - hx, best[1] - hy) ? s : best), spots[0]);
      spots.splice(spots.indexOf(spots.find((s) => s[0] === fx && s[1] === fy)), 1);   // nearest free spot: short, tidy paths
      P.push({ hx, hy, fx, fy, z: (Math.random() - 0.5) * 2, ph: Math.random() * Math.PI * 2, sp: 0.7 + Math.random() * 0.8, dl: Math.random() * 0.12 });
    }
    ready = true;
  }
  const out = (x) => 1 - Math.pow(1 - x, 3), io = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } };
  function step(now) {
    raf = 0;
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now; t += dt;
    m = Math.min(1, Math.max(0, m + (open ? dt / 0.6 : -dt / 0.75)));
    ctx.setTransform(dpr, 0, 0, dpr, M * dpr, M * dpr);
    ctx.clearRect(-M, -M, W + 2 * M, H + 2 * M);
    const cx = W / 2, cy = H / 2, F = W * 1.3, list = [];
    for (const p of P) {
      const l = Math.min(1, Math.max(0, (m - p.dl) / (1 - p.dl)));
      const e = open ? out(l) : io(l);
      // floating: an orbit in depth plus a lazy drift, fuller the further out it is
      const fx = p.fx + Math.sin(t * p.sp + p.ph) * sz * 1.6;
      const fy = p.fy + Math.cos(t * p.sp * 0.8 + p.ph) * sz * 1.1;
      const fz = (p.z + Math.sin(t * p.sp * 0.6 + p.ph) * 0.6) * sz * 9;
      const x = p.hx + (fx - p.hx) * e, y = p.hy + (fy - p.hy) * e, z = fz * e;
      const s = F / (F - z);
      list.push({ x: cx + (x - cx) * s, y: cy + (y - cy) * s, s, z });
    }
    // on the way back the letters grow out of the pixels: each returning pixel uncovers the logo around its
    // landing spot, starting while it is still travelling, so the word builds up as they come home
    let grown = 0;
    if (!open && logoImg) {
      const maxR = H * 0.72 + W / N;
      ctx.save(); ctx.beginPath();
      for (const p of P) {
        const l = Math.min(1, Math.max(0, (m - p.dl) / (1 - p.dl)));
        const g = Math.min(1, Math.max(0, (0.5 - l) / 0.5));               // grows over the last half of its way home
        const r = maxR * g * g * g;
        if (r > 0.3) { ctx.moveTo(p.hx + r, p.hy); ctx.arc(p.hx, p.hy, r, 0, Math.PI * 2); }
        grown += g;
      }
      grown /= P.length;
      ctx.clip(); ctx.globalAlpha = 0.35 + 0.65 * grown; ctx.drawImage(logoImg, 0, 0, W, H); ctx.globalAlpha = 1; ctx.restore();
    }
    list.sort((a, b) => a.z - b.z);
    ctx.fillStyle = window.B30T ? B30T.ink() : "#000";
    const vis = open ? Math.min(1, m * 14) : Math.min(1, m * 14) * (1 - grown * 0.85);   // pixels melt into the letters
    for (const q of list) {
      const w = sz * q.s;
      const x = Math.min(W + M - w / 2, Math.max(-M + w / 2, q.x)), y = Math.min(H + M - w / 2, Math.max(-M + w / 2, q.y));
      ctx.globalAlpha = vis * Math.max(0.45, Math.min(1, 0.75 + q.z / (sz * 30)));
      ctx.fillRect(x - w / 2, y - w / 2, w, w);
    }
    ctx.globalAlpha = 1;
    logo.style.setProperty("--lx", open ? (1 - Math.min(1, m * 14)).toFixed(3) : "0");   // the canvas draws the logo on the way back
    if (open || m > 0) raf = requestAnimationFrame(step);
    else { logo.classList.remove("is-px"); logo.style.removeProperty("--lx"); ctx.clearRect(-M, -M, W + 2 * M, H + 2 * M); }
  }
  logo.addEventListener("pointerenter", () => {
    if (reduced || !ready) return;
    open = true; logo.classList.add("is-px"); kick();
  });
  logo.addEventListener("pointerleave", () => { open = false; kick(); });
  const prep = () => { const f = () => { if (!ready) build(); }; window.requestIdleCallback ? requestIdleCallback(f, { timeout: 600 }) : setTimeout(f, 300); };
  addEventListener("resize", () => { if (!open && m === 0) { ready = false; prep(); } });
  addEventListener("load", prep); if (document.readyState === "complete") prep();
  logo.addEventListener("pointerover", () => { if (!ready) build(); }, { once: true });
})();

(() => {
  const st = document.querySelector('.b30h__stage'), nav = st && st.querySelector('.b30h__nav'); if (!nav) return;
  const pxs = [...st.querySelectorAll('.b30h__px')], lines = ['.b30h__vline--26', '.b30h__vline--34', '.b30h__vline--27'].map((q) => st.querySelector(q));
  const place = () => {
    const y = Math.round(nav.offsetTop + nav.offsetHeight - 0.5 - 2.5);
    pxs.forEach((p, k) => { const l = lines[k]; if (!l) return; p.style.left = Math.round(l.offsetLeft + l.offsetWidth / 2 - 2.5) + 'px'; p.style.top = y + 'px'; });
  };
  place(); addEventListener('resize', place); addEventListener('load', place);
})();
