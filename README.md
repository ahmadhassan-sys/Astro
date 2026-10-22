# Break Thirty — Astro

```sh
npm install
npm run dev      # http://localhost:4321  ·  /services  ·  /work  ·  /contact
npm run build    # outputs to ./dist
npm run preview
```

Needs Node 22.23.4 or newer.

## Pages

| URL         | Page file                   | Its own content         |
|-------------|-----------------------------|-------------------------|
| `/`         | `src/pages/index.astro`     | `src/data/home.js`      |
| `/services` | `src/pages/services.astro`  | `src/data/services.js`  |
| `/work`     | `src/pages/work.astro`      | `src/data/work.js`      |
| `/contact`  | `src/pages/contact.astro`   | `src/data/contact.js`   |

Sections used on every page (header, partners strip, testimonials, closing line, footer) and the
company details (email, phone, address) come from **`src/data/site.js`** — edit them once, every page updates.

## Where things live

```
src/
  data/
    site.js            ← shared: header links, partners strip, testimonials, closing line, footer
    home.js            ← homepage sections
    services.js        ← services page sections (disciplines + their services, hero, say hello)
    services-icons.js  ← the icon of each service (keyed by the service title)
    work.js            ← Our Work page: hero, filters, featured project, case studies, one-team section
    contact.js         ← contact page: hero, form labels, where the form sends + its messages
    partners.js        ← partner logos + office locations
  pages/               ← one file per page: section order + the page's script list
  layouts/BaseLayout.astro ← <head> and the script loader
  components/          ← one Astro component per section (layout only; content comes in as props)
    Header  PartnersStrip  Testimonials  Contact  Footer                 (shared)
    Hero  Work  Services  WhyOneTeam  Vision  Network                     (homepage)
    services/          ← ServicesHero  ServicesList  SayHello          (services page)
    work/              ← WorkHero  WorkList  WorkHello                 (Our Work page)
    contact/           ← ContactHero  ContactForm                      (contact page)
    ui/                ← Button, Icon, Wordmark, ArrowIcon, Rich (heading formatting), TargetLink, links helper
  styles/
    pages/home.css     ← the homepage's style list, in cascade order
    pages/services.css ← the services page's style list, in cascade order
    pages/work.css     ← the Our Work page's style list, in cascade order
    pages/contact.css  ← the contact page's style list, in cascade order
    *.css              ← one file per section (+ global, shared, theme, dark)
    services/*.css     ← the services page's own sections
    work-page/*.css    ← the Our Work page's own sections
    contact/*.css      ← the contact page's own sections
public/
  js/                  ← one script per section; each page lists the ones it runs (in order)
  assets/              ← fonts/, images/ (services/, work/ for those pages), videos/
```

## Editing content

- Text, links, images: the files in `src/data/`.
- In headings, `*word*` makes the highlighted word and `\n` is a line break.
- Links can point somewhere else on a given page with `on`, e.g.
  `{ href: "/services#design", on: { home: "#services" } }` → `#services` on the homepage.
- Lists that the scripts build (case studies, services cards, testimonials, partner grid, the
  services page's icons and hero pictures, the closing words) also come from `src/data/`; each page
  passes them to its scripts through a JSON block, so you never edit the JS for content.

## Adding a page

1. Create `src/pages/your-page.astro` (copy `services.astro` as a starting point).
2. Reuse the shared components and add the page's own in `src/components/your-page/`.
3. Add `src/styles/pages/your-page.css` listing its style files in order.
4. List the page's scripts (from `public/js`) in the page file.

## Case studies (Our Work page)

Add or edit a case study in `cases` in `src/data/work.js`: name, link, `tags` (the filter keys),
the two descriptions and its pictures (the first one is the cover). The filter counts, the grid,
the index list and the spinning pages in the hero all update from that one list.

## The contact form

The form checks the name, email and phone, then opens the visitor's email app with the message
filled in, addressed to `company.email`. To send it from the site instead (Formspree, Netlify Forms,
your own API…), change the submit part of `public/js/contact-page.js`.

## Notes

- Every component is a plain `.astro` component: the pages are static HTML with no framework and
  no islands (Astro's dev toolbar will say "No islands detected" — that's expected). All motion is
  done by the scripts in `public/js`.
- Styles are loaded through one ordered list per page (`src/styles/pages/`) on purpose: the
  cascade order matters, and per-component imports let the bundler reorder files between pages.
- Speed: everything is served from the site itself (fonts in `public/assets/fonts`, Lenis in
  `public/js/vendor`). Images below the first screen use `loading="lazy"`. Phones get the smaller
  showreel (`hero-reel-small.mp4`). The hero foreground video has a keyframe every 3 frames so
  scroll-scrubbing stays smooth; if you replace it, encode it the same way:
  `ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 21 -g 3 -bf 0 -pix_fmt yuv420p -an -movflags +faststart hero-foreground.mp4`
- Judge speed with `npm run build && npm run preview`, not `npm run dev` (dev mode serves every file
  separately and unoptimised).
- CSS minification is off in `astro.config.mjs` on purpose: the minifier merges some duplicate
  rules and changes which one wins in the dark theme.
