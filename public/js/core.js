/* Page content — written by the Astro components into <script id="b30-content"> (edit it in src/data/home.js). */
window.B30_CONTENT = (() => { try { return JSON.parse(document.getElementById("b30-content").textContent); } catch (e) { return {}; } })();

/* =====================================================================
   Breakthirty — page core: scale, smooth scroll, ASCII, headings, reveals
   ===================================================================== */
(() => {
  "use strict";
  const html = document.documentElement;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const B30 = (window.B30 = window.B30 || {});
  B30.reduced = REDUCED;

  /* 1u = 1 Figma px at 1920 */
  const setU = () => html.style.setProperty("--u", html.clientWidth / 1920 + "px");
  setU(); addEventListener("resize", setU);
  B30.u = () => html.clientWidth / 1920;

  /* ---------- one smooth scroll for the whole page (starts once the loader lets go) ---------- */
  function startLenis() {
    if (B30.lenis || REDUCED || !window.Lenis) return;
    const l = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.2 });
    B30.lenis = window.__b30lenis = l;
    const raf = (t) => { l.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  B30.scrollTo = (el, opts = {}) => {
    if (el == null) return;
    if (typeof el === "number") { if (B30.lenis) B30.lenis.scrollTo(el, { duration: 1.6, ...opts }); else scrollTo({ top: el, behavior: REDUCED ? "auto" : "smooth" }); return; }
    if (B30.lenis) B30.lenis.scrollTo(el, { duration: 1.6, ...opts });
    else el.scrollIntoView({ behavior: opts.immediate || REDUCED ? "auto" : "smooth" });
  };
  addEventListener("b30:released", startLenis, { once: true });
  document.addEventListener("DOMContentLoaded", () => setTimeout(() => {
    if (!html.classList.contains("b30l-on")) startLenis();
    if (location.hash.length > 1) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => B30.scrollTo(el, { immediate: true }), 60);
    }
  }, 0));
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = id.length > 1 && document.querySelector(id);
    if (el) { e.preventDefault(); B30.scrollTo(el); }
  });

  /* ---------- ASCII scramble (hover on buttons/links, one-shot reveal on small text) ---------- */
  const SET = "#%&$@*+=<>/\\|?!01ABCDEFGHJKLMNPRSTUVWXYZ";
  const rnd = () => SET[(Math.random() * SET.length) | 0];
  function scramble(el, { duration = 520, mode = "hover", stagger = 0.55 } = {}) {
    if (!el || el._scr) return;
    if (REDUCED) return;
    el._scr = true;
    const original = el.innerHTML;
    const chars = [];
    const wrap = document.createElement("span"); wrap.className = "sc-wrap";
    while (el.firstChild) wrap.appendChild(el.firstChild);
    el.appendChild(wrap);
    (function split(node) {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
            const w = document.createElement("span"); w.className = "sc-w";
            for (const c of tok) { const s = document.createElement("span"); s.className = "sc-c"; s.textContent = c; s._c = c; w.appendChild(s); chars.push(s); }
            frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== "SVG" && ch.tagName !== "svg") split(ch);
      });
    })(wrap);
    const er = el.getBoundingClientRect().width, kk = el.offsetWidth ? er / el.offsetWidth || 1 : 1;
    const widths = chars.map((s) => s.getBoundingClientRect().width / kk);   // fractional layout widths, corrected for scaled ancestors (hero stage)
    chars.forEach((s, i) => { s.style.width = widths[i] + "px"; });
    const n = chars.length, t0 = performance.now();
    const plan = chars.map((s, i) => {
      const base = (i / Math.max(1, n - 1)) * duration * stagger;
      return mode === "reveal"
        ? { on: base * 0.6, done: base + duration * (1 - stagger) * (0.55 + Math.random() * 0.45) }
        : { on: 0, done: base + duration * (1 - stagger) * (0.4 + Math.random() * 0.6) };
    });
    let lastSwap = 0;
    (function tick(now) {
      const t = now - t0, swap = now - lastSwap > 42;
      if (swap) lastSwap = now;
      let pending = 0;
      for (let i = 0; i < n; i++) {
        const s = chars[i], p = plan[i];
        if (t >= p.done) { if (s.className !== "sc-c") { s.className = "sc-c"; s.textContent = s._c; } continue; }
        pending++;
        if (t < p.on) { s.className = "sc-c h"; continue; }
        if (swap) { s.className = "sc-c x"; s.textContent = /\S/.test(s._c) ? rnd() : s._c; }
      }
      if (pending) requestAnimationFrame(tick);
      else { el.innerHTML = original; el._scr = false; }
    })(t0);
  }
  B30.scramble = scramble;

  /* scramble one text into another (hover wording swaps) */
  function scrambleTo(el, to, dur = 440) {
    cancelAnimationFrame(el._sw || 0);
    if (REDUCED) { el.textContent = to; return; }
    const from = el.textContent, n = Math.max(from.length, to.length), t0 = performance.now();
    const done = Array.from({ length: n }, (_, i) => (i / Math.max(1, n - 1)) * dur * 0.55 + Math.random() * dur * 0.45);
    let last = 0;
    const tick = (now) => {
      const t = now - t0;
      if (now - last < 40 && t < dur) { el._sw = requestAnimationFrame(tick); return; }
      last = now;
      let s = "";
      for (let i = 0; i < n; i++) {
        const target = to[i];
        if (t >= done[i]) { if (target !== undefined) s += target; continue; }
        const ch = target !== undefined ? target : from[i];
        s += ch === " " ? " " : rnd();
      }
      el.textContent = s;
      if (t < dur) el._sw = requestAnimationFrame(tick); else el.textContent = to;
    };
    el._sw = requestAnimationFrame(tick);
  }
  B30.scrambleTo = scrambleTo;
  const ALT = {
    "what we do": "Services", "work": "Good Stuff", "contact": "Let’s Talk", "say hello": "What’s Up",
    "get in touch": "Drop Us a Line", "view case study": "See What Happened", "about us": "That’s Us", "about": "That’s Us",
    "services": "Our Thing", "get started": "Let’s Go", "let’s discuss": "Drop Us a Line",
  };
  const LOCKS = [];
  /* nav: centre "Work" on the hero's centre line (Figma Vector 34, x 960); labels are centred in their reserved width,
     so the hover wording stays centred on the same line */
  function alignNav() {
    const ul = document.querySelector(".b30h__links"), stage = document.querySelector(".b30h__stage");
    if (!ul || !stage) return;
    const work = [...ul.querySelectorAll("a")].find((a) => /^work$/i.test((a.getAttribute("aria-label") || a.textContent).trim()));
    if (!work) return;
    ul.style.translate = "";
    const sr = stage.getBoundingClientRect(), wr = work.getBoundingClientRect(), k = sr.width / stage.offsetWidth || 1;
    const delta = (sr.left + sr.width / 2 - (wr.left + wr.width / 2)) / k;
    ul.style.translate = `${delta.toFixed(2)}px 0`;
  }
  B30.alignNav = alignNav;
  const relock = () => { LOCKS.forEach((f) => f()); alignNav(); };
  addEventListener("resize", relock);
  document.fonts && document.fonts.ready.then(relock);
  addEventListener("load", () => { relock(); setTimeout(relock, 400); setTimeout(alignNav, 1200); });
  function bindAlt(host, lbl) {
    const orig = lbl.textContent.trim(), alt = ALT[orig.toLowerCase()];
    if (!alt) return false;
    if (!host.getAttribute("aria-label")) host.setAttribute("aria-label", orig);
    lbl.setAttribute("aria-hidden", "true");
    const lock = () => {
      if (getComputedStyle(lbl).display === "inline") lbl.style.display = "inline-block";
      lbl.style.whiteSpace = "nowrap"; lbl.style.width = "";
      const cur = lbl.textContent;
      lbl.textContent = orig; const w1 = lbl.offsetWidth;
      lbl.textContent = alt; const w2 = lbl.offsetWidth;
      lbl.textContent = cur;
      if (w1 && w2) { lbl.style.width = Math.ceil(Math.max(w1, w2)) + 1 + "px"; lbl.style.textAlign = host.closest(".b30h__links") || host.matches("[data-btn]") ? "center" : "left"; }
    };
    lock(); LOCKS.push(lock);
    const on = () => scrambleTo(lbl, alt), off = () => scrambleTo(lbl, orig);
    host.addEventListener("pointerenter", on); host.addEventListener("focus", on);
    host.addEventListener("pointerleave", off); host.addEventListener("blur", off);
    return true;
  }

  /* buttons: the label box is the front of a cube; the second wording is the face underneath.
     On hover the cube rolls up and the second face comes to the front (3D, CSS only). */
  function bindCube(host, lbl) {
    const orig = lbl.textContent.trim(), alt = ALT[orig.toLowerCase()];
    if (!alt || lbl === host) return false;
    if (!host.getAttribute("aria-label")) host.setAttribute("aria-label", orig);
    const cube = document.createElement("b");
    cube.className = "b30-cube"; cube.setAttribute("aria-hidden", "true");
    lbl.parentNode.insertBefore(cube, lbl);
    const back = lbl.cloneNode(false);
    back.removeAttribute("data-lbl"); back.textContent = alt;
    lbl.classList.add("b30-cube__f"); back.classList.add("b30-cube__b");
    cube.appendChild(lbl); cube.appendChild(back);
    cube.parentNode.style.perspective = "700px";
    const lock = () => {
      lbl.style.width = back.style.width = "";
      const w = Math.ceil(Math.max(lbl.offsetWidth, back.offsetWidth)) + 1;
      lbl.style.width = back.style.width = w + "px";
      cube.style.setProperty("--d", (lbl.offsetHeight / 2).toFixed(2) + "px");
    };
    lock(); LOCKS.push(lock);
    return true;
  }

  /* buttons: icon motion is CSS ([data-anim]) */
  const bindHover = (root = document) => {
    root.querySelectorAll("[data-btn]:not([data-bound])").forEach((b) => {
      b.dataset.bound = "1";
      const lbl = b.querySelector("[data-lbl]") || b.querySelector(".lbl") || b;
      if (bindAlt(b, lbl)) return;
      b.addEventListener("pointerenter", () => scramble(lbl, { duration: 480 }));
      b.addEventListener("focus", () => scramble(lbl, { duration: 480 }));
    });
    root.querySelectorAll("[data-hscr]:not([data-bound])").forEach((a) => {
      a.dataset.bound = "1";
      if (bindAlt(a, a)) return;
      a.addEventListener("pointerenter", () => scramble(a, { duration: 420 }));
      a.addEventListener("focus", () => scramble(a, { duration: 420 }));
    });
  };
  B30.bindHover = bindHover;

  /* ---------- headings: one shared word-rise ---------- */
  function splitWords(el) {
    if (el._split) return; el._split = true;
    let i = 0;
    (function walk(node) {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(" ")); return; }
            const o = document.createElement("span"); o.className = "hw";
            const inner = document.createElement("span"); inner.className = "hw-i"; inner.style.setProperty("--i", i++); inner.textContent = tok;
            o.appendChild(inner); frag.appendChild(o);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== "BR") walk(ch);
      });
    })(el);
  }
  B30.splitWords = splitWords;

  /* a heading and the copy paired with it ([data-pair] in the same section) animate together */
  function setIn(el, on) {
    el.classList.toggle("is-in", on);
    if (el.matches("[data-heading]")) {
      const sec = el.closest("section");
      sec && sec.querySelectorAll("[data-pair]").forEach((p) => p.classList.toggle("is-in", on));
    }
  }
  B30.setIn = setIn;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const el = e.target;
    if (e.isIntersecting) setIn(el, true);
    else if (e.boundingClientRect.top > 0 && el.dataset.once === undefined) setIn(el, false);   // left below the fold: replay next time
  }), { threshold: 0.3, rootMargin: "0px 0px -6% 0px" });
  B30.observe = (el) => io.observe(el);

  function init() {
    document.querySelectorAll("[data-heading]").forEach((h) => {
      splitWords(h);
      if (h.dataset.heading !== "manual") io.observe(h);
    });
    document.querySelectorAll("[data-reveal]:not([data-pair])").forEach((el) => io.observe(el));
    bindHover();
    alignNav();
    document.fonts && document.fonts.load('48px "Departure Mono"');   // ready before the first hover, so the fit is measured right
    /* headings: hovering the heading decodes its one marked word (.b30-alt) into Departure Mono, and back */
    if (matchMedia("(hover: hover)").matches) {
      // On hover the marked word is swapped for a cheekier one, set in Departure Mono. The new word sits on
      // top of the old one (which keeps its space, invisibly), so nothing in the heading moves or wraps.
      const SWAP = { "sketch": "Spark", "work ®": "Proof ®", "work": "Proof", "solutions": "Answers", "four agencies": "Everyone",
        "people": "Friends", "well": "Nice", "always awake": "Online", "break": "Shake" };
      const on = (x) => {
        clearTimeout(x._swT);
        if (x._ov) { scrambleTo(x._ov, x._to, 300); return; }
        const orig = x.textContent.replace(/\s+/g, " ").trim();
        const to = SWAP[orig.toLowerCase()];
        if (!to) return;
        const fs = parseFloat(getComputedStyle(x).fontSize), w0 = x.offsetWidth;
        const ov = document.createElement("span");
        ov.className = "b30-alt__ov"; ov.setAttribute("aria-hidden", "true");
        x.appendChild(ov);
        ov.textContent = to;                                          // size the new word to the old word's space
        const wm = ov.offsetWidth || w0, room = w0 - 0.04 * fs;     // stays inside the old word: the spaces either side are kept
        let k = Math.min(1, room / wm), size = 1.04;
        if (k < 0.82) { size *= k / 0.82; k = 0.82; }                // very long swaps get a touch smaller, never squashed
        ov.style.fontSize = size.toFixed(4) + "em";
        ov.style.setProperty("--sx", k.toFixed(4));
        ov.textContent = orig;
        x._ov = ov; x._to = to; x._orig = orig;
        x.classList.add("is-swap");
        requestAnimationFrame(() => ov.classList.add("is-on"));
        scrambleTo(ov, to, 340);
      };
      const off = (x) => {
        if (!x._ov) return;
        scrambleTo(x._ov, x._orig, 260);
        clearTimeout(x._swT);
        x._swT = setTimeout(() => { x.classList.remove("is-swap"); x._ov && x._ov.remove(); x._ov = null; }, 280);
      };
      // Delegated, so it survives headings whose markup gets rebuilt (e.g. the footer's ASCII reveal).
      // The host is the whole heading, or, when the word carries [data-alt-host], just the word itself.
      const hostOf = (el) => {
        const h = el && el.closest ? el.closest("[data-alt-host], h1, h2, h3") : null;
        if (!h) return null;
        const words = h.matches(".b30-alt") ? [h] : [...h.querySelectorAll(".b30-alt:not([data-alt-host])")];
        return words.length ? { h, words } : null;
      };
      document.addEventListener("pointerover", (e) => {
        const H = hostOf(e.target);
        if (H && !H.h.contains(e.relatedTarget)) H.words.forEach(on);
      });
      document.addEventListener("pointerout", (e) => {
        const H = hostOf(e.target);
        if (H && !H.h.contains(e.relatedTarget)) H.words.forEach(off);
      });
    }
    if (REDUCED) document.querySelectorAll("[data-heading],[data-reveal]").forEach((el) => el.classList.add("is-in"));
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();

/* =====================================================================
   Speed parallax — elements travel at slightly different speeds.
   [data-speed]: 1 = normal, >1 faster, <1 slower (measured from the screen centre,
   so everything sits exactly where the design has it when it's centred).
   Uses the CSS `translate` property, so it never fights the reveal/heading transforms.
   ===================================================================== */
(() => {
  return;   // parallax switched off across the site (every element stays where the layout puts it)
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const small = matchMedia("(max-width: 899px)");
  const items = [...document.querySelectorAll("[data-speed]")].map((el) => ({ el, s: parseFloat(el.dataset.speed) || 1, off: 0 }));

  /* hero: copy lifts away faster than the scene, the glow sinks a touch slower */
  const hero = document.querySelector("[data-b30-hero]");
  const H = hero && {
    title: hero.querySelector(".b30h__title"), intro: hero.querySelector(".b30h__intro"),
    orbit: hero.querySelector(".b30h__orbit"), glow: hero.querySelector(".b30h__glow"),
  };
  const HERO = { title: -0.34, intro: -0.2, glow: 0.12 };   // the orbit stays put: its words must stay centred on the ring

  function frame() {
    requestAnimationFrame(frame);
    const vh = innerHeight, u = document.documentElement.clientWidth / 1920, lim = 170 * u;
    if (small.matches) {
      items.forEach((it) => { if (it.off) { it.off = 0; it.el.style.translate = ""; } });
      return;
    }
    if (hero && hero.__b30 && hero.__b30.layoutInfo) {
      const L = hero.__b30.layoutInfo;
      const y = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), L.pinStart + L.pinDist * 0.25);
      for (const k in HERO) if (H[k]) H[k].style.translate = y > 0.5 ? `0 ${(y * HERO[k]).toFixed(2)}px` : "";
    }
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      const k = it.el.offsetHeight ? r.height / it.el.offsetHeight : 1;          // inside scaled worlds (services)
      const c = r.top + r.height / 2 - it.off;
      if (c < -vh || c > vh * 2) continue;
      const off = Math.max(-lim, Math.min(lim, -(c - vh / 2) * (it.s - 1)));
      if (Math.abs(off - it.off) < 0.05) continue;
      it.off = off;
      it.el.style.translate = `0 ${(off / (k || 1)).toFixed(2)}px`;
    }
  }
  requestAnimationFrame(frame);
})();

/* =====================================================================
   Pixel kit
   1. Page transition — the homepage loader's wave: white cells close in over
      the page, the next page opens under them with the same dot wave.
   ===================================================================== */
(() => {
  const html = document.documentElement;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------- 1. transition: the loader's wave ----------------
     Leaving: a wave of white cells closes in from the top corners down to the bottom centre,
     small black dots streaming in with it. Arriving: the same wave opens out from the bottom
     centre to the top corners, each cell fading as it leaves a dot that streams away —
     the same reveal as the end of the homepage loader. */
  const W = { cover: 0.75, reveal: 1.15, band: 0.2, cell: 26, cellMobile: 18, streak: 3.2 };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const easeIOS = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
  const easeOutC = (t) => 1 - Math.pow(1 - t, 3);
  function layer() {
    const cv = document.createElement("canvas"); cv.className = "b30-ptx"; cv.setAttribute("aria-hidden", "true");
    const dpr = Math.min(2, devicePixelRatio || 1), vw = innerWidth, vh = innerHeight;
    cv.width = Math.ceil(vw * dpr); cv.height = Math.ceil(vh * dpr);
    html.appendChild(cv);
    const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const S = vw < 760 ? W.cellMobile : W.cell, cols = Math.ceil(vw / S), rows = Math.ceil(vh / S);
    const ox = (vw - cols * S) / 2, oy = (vh - rows * S) / 2, qx = vw / 2, qy = vh + S, far = Math.hypot(vw / 2, vh + S);
    const cells = [];
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = ox + (i + 0.5) * S, y = oy + (j + 0.5) * S;
      let dx = x - qx, dy = y - qy; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
      cells.push({ x, y, d: n / far + (Math.random() - 0.5) * 0.07, dx, dy, run: S * W.streak * (0.6 + Math.random() * 0.8) });
    }
    return { cv, g, cells, S, vw, vh };
  }
  // draw the white screen with the wave front at `front` (cells behind the front are gone)
  function draw(L, front) {
    const g = L.g, band = W.band;
    g.clearRect(0, 0, L.vw, L.vh);
    g.fillStyle = B30T.paper();
    for (const c of L.cells) {
      const k = (front - c.d) / band;
      if (k >= 1) continue;
      if (k <= 0) { g.globalAlpha = 1; g.fillRect(c.x - L.S / 2 - 0.5, c.y - L.S / 2 - 0.5, L.S + 1, L.S + 1); continue; }
      const f = smooth(k), h = (L.S / 2) * (1 - 0.3 * f) + 0.5;
      g.globalAlpha = 1 - f; g.fillRect(c.x - h, c.y - h, h * 2, h * 2);
    }
    g.fillStyle = B30T.ink();
    for (const c of L.cells) {
      const k = (front - c.d) / band;
      if (k <= 0 || k >= 1) continue;
      const e = easeOutC(k), sz = 2.4 * (1 - 0.5 * k) + 0.6;
      g.globalAlpha = Math.sin(Math.PI * k) * 0.9;
      g.fillRect(c.x + c.dx * c.run * e - sz / 2, c.y + c.dy * c.run * e - sz / 2, sz, sz);
    }
    g.globalAlpha = 1;
  }
  // open: front runs -band → end (white clears away); close: the same, backwards (white builds up)
  function play(L, secs, open, done) {
    const end = 1 + W.band + 0.05, t0 = performance.now();
    (function step(now) {
      const t = clamp((now - t0) / 1000 / secs), e = easeIOS(t);
      draw(L, open ? -W.band + (end + W.band) * e : end - (end + W.band) * e);
      if (t < 1) requestAnimationFrame(step); else done && done();
    })(t0);
  }
  function go(href) {
    try { sessionStorage.setItem("b30-pt", "__px"); } catch (_) {}
    window.B30 && B30.lenis && B30.lenis.stop();
    if (REDUCED) { location.href = href; return; }
    const L = layer(); L.cv.classList.add("is-blocking");
    play(L, W.cover, false, () => setTimeout(() => { location.href = href; }, 40));
  }
  function arrive() {
    const L = layer();
    draw(L, -W.band - 0.1);                           // starts fully white, like the page we left
    html.classList.remove("pt-px");
    const start = () => setTimeout(() => play(L, REDUCED ? 0.01 : W.reveal, true, () => L.cv.remove()), 120);
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start, { once: true }) : start();
  }
  addEventListener("pageshow", (e) => { if (e.persisted) { document.querySelectorAll(".b30-ptx").forEach((c) => c.remove()); html.classList.remove("pt-px"); } });

  window.B30PX = { go, arrive, config: W };
})();

/* =====================================================================
   Page transition — a Midnight panel slides up over the page while the page
   drifts up and dims; the next page opens under the panel, which carries on
   upward and off as the new page settles into place.
   ===================================================================== */
(() => {
  const KEY = "b30-pt";
  const html = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "cubic-bezier(.76,0,.24,1)", DUR = reduced ? 1 : 900;
  const panel = document.createElement("div");
  panel.className = "b30-pt"; panel.setAttribute("aria-hidden", "true");
  panel.innerHTML = '<span class="b30-pt__lbl"></span>';
  const dim = document.createElement("div"); dim.className = "b30-pt-dim"; dim.setAttribute("aria-hidden", "true");
  html.appendChild(dim); html.appendChild(panel);
  const lbl = panel.firstChild;
  const decode = (t) => { lbl.textContent = t; window.B30 && B30.scramble ? B30.scramble(lbl, { mode: "reveal", duration: 520, stagger: 0.6 }) : 0; };
  const anims = [];
  const run = (el, kf, opts = {}) => { const a = el.animate(kf, { duration: DUR, easing: EASE, fill: "forwards", ...opts }); anims.push(a); return a; };

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-pt]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    e.preventDefault();
    const row = a.closest(".work .row");
    if (row && !reduced && expandCase(row, a)) return;
    if (window.B30PX) { B30PX.go(a.href); return; }   // pixel transition in Flash yellow
    const label = a.dataset.ptLabel || "Breakthirty";
    try { sessionStorage.setItem(KEY, label); } catch (_) {}
    window.B30 && B30.lenis && B30.lenis.stop();
    lbl.textContent = "";
    run(dim, [{ opacity: 0 }, { opacity: 1 }]);
    run(document.body, [{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,-12vh,0)" }]);
    const p = run(panel, [{ transform: "translate3d(0,100%,0)" }, { transform: "translate3d(0,0,0)" }]);
    setTimeout(() => decode(label), DUR * 0.45);
    p.finished.then(() => setTimeout(() => { location.href = a.href; }, 120));
  });

  /* case studies: the image grows to fill the screen out of its bottom corner (bottom-right when the
     image sits on the right, bottom-left when it sits on the left) while the row's text slips away */
  function expandCase(row, a) {
    const slot = row.querySelector(".slot"), im = slot && slot.querySelector("img");
    if (!im || !im.naturalWidth) return false;
    const r = slot.getBoundingClientRect(), W = innerWidth, H = innerHeight;
    const right = r.left + r.width / 2 > W / 2;
    window.B30 && B30.lenis && B30.lenis.stop();
    // A fixed layer over the page (nothing in the page moves): the image is laid out at its final,
    // full-screen size and starts scaled + clipped so it looks exactly like it does in its slot.
    const ov = document.createElement("div");
    ov.className = "b30-cx"; ov.setAttribute("aria-hidden", "true");
    const pic = document.createElement("img");
    pic.src = im.currentSrc || im.src; pic.alt = "";
    ov.appendChild(pic); html.appendChild(ov);
    slot.style.visibility = "hidden";                              // the moving copy is the only one on screen
    const nw = im.naturalWidth, nh = im.naturalHeight;
    const sF = Math.max(W / nw, H / nh), sI = Math.max(r.width / nw, r.height / nh);
    const k = sI / sF, dx = r.left + r.width / 2 - W / 2, dy = r.top + r.height / 2 - H / 2;
    const ins = (t, rr, b, l) => `inset(${t}px ${rr}px ${b}px ${l}px)`;
    const i0 = [r.top, W - r.right, H - r.bottom, r.left];
    // first it glides, at its own size, to the centre of the screen; then it scales up to fill it
    const cT = (H - r.height) / 2, cL = (W - r.width) / 2;
    const iC = [cT, cL, cT, cL];
    const D = 1300, o1 = 0.42;
    ov.animate([
      { clipPath: ins(...i0), easing: "cubic-bezier(.65,0,.35,1)" },
      { clipPath: ins(...iC), offset: o1, easing: "cubic-bezier(.7,0,.2,1)" },
      { clipPath: ins(0, 0, 0, 0) },
    ], { duration: D, fill: "forwards" });
    const last = pic.animate([
      { transform: `translate(${dx}px,${dy}px) scale(${k})`, easing: "cubic-bezier(.65,0,.35,1)" },
      { transform: `translate(0px,0px) scale(${k})`, offset: o1, easing: "cubic-bezier(.7,0,.2,1)" },
      { transform: "translate(0,0) scale(1)" },
    ], { duration: D, fill: "forwards" });
    // the row's words simply fade where they are
    row.querySelectorAll(".kicker, .desc, h3, .cta, .mhead, .year, .num").forEach((el) =>
      el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: "ease-out", fill: "forwards" }));
    try { sessionStorage.setItem(KEY, "__img"); } catch (_) {}
    last.finished.then(() => setTimeout(() => { location.href = a.href; }, 80));
    return true;
  }

  /* arriving: the page starts under the panel (html.pt-hold), then the panel lifts away */
  let label = null;
  try { label = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (_) {}
  if ((label && label !== "__img") || html.classList.contains("pt-px")) {
    window.B30PX && B30PX.arrive();
  } else if (label === "__img" || html.classList.contains("pt-img")) {
    // arriving from an expanded case-study image: a soft white lift instead of the panel
    requestAnimationFrame(() => { html.classList.add("pt-img-out"); setTimeout(() => html.classList.remove("pt-img", "pt-img-out"), 750); });
  } else if (label || html.classList.contains("pt-hold")) {
    panel.style.transform = "translate3d(0,0,0)";
    lbl.textContent = label || "";
    html.classList.remove("pt-hold");
    setTimeout(() => {
      run(lbl, [{ opacity: 1 }, { opacity: 0 }], { duration: DUR * 0.4, easing: "ease-out" });
      run(panel, [{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,-100%,0)" }]);
      const b = document.body.animate([{ transform: "translate3d(0,14vh,0)" }, { transform: "translate3d(0,0,0)" }], { duration: DUR * 1.1, easing: "cubic-bezier(.22,1,.36,1)" });
      b.finished.then(() => { panel.style.transform = ""; anims.forEach((x) => x.cancel()); anims.length = 0; });
    }, 180);
  }
  addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    anims.forEach((x) => x.cancel()); anims.length = 0;
    panel.style.transform = ""; html.classList.remove("pt-hold", "pt-img", "pt-img-out");
    document.querySelectorAll(".b30-cx").forEach((n) => n.remove());
    document.querySelectorAll(".work .slot").forEach((s) => (s.style.visibility = ""));
    window.B30 && B30.lenis && B30.lenis.start();
  });
})();

/* =====================================================================
   A light "VR" depth on the page: each section sits flat while it's in the middle of the screen; as it leaves at
   the top it leans back into the screen, and the next one comes up from the bottom leaning in the other way, as if
   the page ran round the inside of a very wide cylinder. Small angles, no opacity tricks on text, off on touch and
   for reduced motion.
   ===================================================================== */
(() => {
  return;   // tilt off: sections stay flat, so the dashed rules and corner pixels stay true and the fixed dark sky lines up
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(min-width: 900px)").matches) return;
  const VR = { tilt: 5.5, depth: 0, dead: 0.12, persp: 1600 }, LEAVE = { from: 0.72, shrink: 0 };   // no shrinking: sections keep their size (no shrink on the way out, no push-back on the way in)   // degrees at the screen edge, px back, the flat zone round the centre
  const tc = document.querySelector(".ts__cur"); if (tc) document.body.appendChild(tc);   // fixed cursors must not sit inside a transformed section
  const secs = [...document.querySelectorAll(".work, .b30sb, .vision, .ts, .pg")];   // (the contact section stays: its floor runs into the footer)   // (Our vision stays flat: its hover reads the pointer in screen space)   // (Selected work covers the hero, so it stays flat)
  let raf = 0;
  const run = () => {
    raf = 0; const vh = innerHeight;
    for (const s of secs) {
      const r = s.getBoundingClientRect();
      if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) { if (s._vr) { s.style.transform = ""; s._vr = 0; } continue; }
      // where the section is: the part of it nearest the centre decides, so tall sections stay flat while they fill the screen
      const c = r.top > vh / 2 ? (r.top - vh / 2) / vh : r.bottom < vh / 2 ? (r.bottom - vh / 2) / vh : 0;
      const m = Math.sign(c) * Math.max(0, Math.abs(c) - VR.dead) / (0.5 - VR.dead), e = Math.max(-1, Math.min(1, m));
      const k = Math.max(0, e * Math.abs(e) * 0.5 + e * 0.5);   // soft in — only for the one coming up from below
      // the one going up: it gets a touch smaller, but only once you're ~72% of the way through it
      const pr = -r.top / Math.max(1, r.height), lv = Math.max(0, Math.min(1, (pr - LEAVE.from) / (1 - LEAVE.from))), lvE = lv * lv * (3 - 2 * lv);
      if (LEAVE.shrink && lvE > 0.002) { s.style.transformOrigin = "50% 100%"; s.style.transform = `scale(${(1 - lvE * LEAVE.shrink).toFixed(4)})`; s._vr = 1; continue; }
      if (Math.abs(k) < 0.002) { if (s._vr) { s.style.transform = ""; s._vr = 0; } continue; }
      s.style.transformOrigin = k > 0 ? "50% 0%" : "50% 100%";
      s.style.transform = `perspective(${VR.persp}px) translateZ(${(-Math.abs(k) * VR.depth).toFixed(1)}px) rotateX(${(k * VR.tilt).toFixed(3)}deg)`;
      s._vr = 1;
    }
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(run); }, { passive: true });
  addEventListener("resize", run); run();
})();
