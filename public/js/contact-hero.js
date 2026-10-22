/* =====================================================================
   Contact page — the hero is shown once laid out, the middle line is measured to stop short of the globe,
   and the form's dashed frame draws in as it arrives.
   ===================================================================== */
(() => {
  "use strict";
  const html = document.documentElement;
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("b30h-pre")));
  const hero = document.querySelector(".cth"), mid = hero && hero.querySelector(".b30h__vline--34"), og = document.getElementById("hero-globe");
  /* the middle line runs from the header down and has faded out a clear gap above the globe's top edge */
  function fitMid() {
    if (!mid || !og) return;
    const W = og.clientWidth, H = og.clientHeight, u = W / 1920;
    if (W < 760) return;
    const gy = (H + 124 * u) / 2, R = Math.min(H * (300 / 1080), W * 0.22, 310);   // same geometry as the globe script
    const top = 124 * u, end = gy - R * 1.04 - 56 * u;                               // the dots' tilt never rises past ~1.04R
    mid.style.setProperty("--mid-h", Math.max(24, end - top).toFixed(1) + "px");
  }
  fitMid(); addEventListener("resize", fitMid); addEventListener("load", fitMid);
  /* the form: frame lines draw in, the horizontal rule sits under the head */
  const f = document.querySelector(".ctf");
  if (f) {
    const row = f.querySelector(".ctf__row");
    const place = () => f.style.setProperty("--ctf-row", Math.round(row.offsetTop) + "px");
    place(); addEventListener("resize", place); addEventListener("load", place);
    if (document.fonts) document.fonts.ready.then(place);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) f.classList.add("is-in");
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { f.classList.add("is-in"); io.disconnect(); } }), { threshold: 0.12 }).observe(f);
  }
})();
