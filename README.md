# Break Thirty — Astro

```sh
npm install
npm run dev      # http://localhost:4321  ·  /services  ·  /contact
npm run build    # outputs to ./dist
npm run preview
```

Needs Node 22.23.4 or newer.

## Pages

| URL         | Page file                   | Its own content         |
|-------------|-----------------------------|-------------------------|
| `/`         | `src/pages/index.astro`     | `src/data/home.js`      |
| `/services` | `src/pages/services.astro`  | `src/data/services.js`  |
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
    contact.js         ← contact page: hero, form labels, where the form sends + its messages
    partners.js        ← partner logos + office locations
  pages/               ← one file per page: section order + the page's script list
  layouts/BaseLayout.astro ← <head> and the script loader
  components/          ← one React component per section (layout only; content comes in as props)
    Header.jsx  PartnersStrip.jsx  Testimonials.jsx  Contact.jsx  Footer.jsx   (shared)
    Hero.jsx  Work.jsx  Services.jsx  WhyOneTeam.jsx  Vision.jsx  Network.jsx  (homepage)
    services/          ← ServicesHero.jsx  ServicesList.jsx  SayHello.jsx       (services page)
    contact/           ← ContactHero.jsx  ContactForm.jsx                       (contact page)
    ui/                ← Button, Icons, Rich (heading formatting), TargetLink, links helper
  styles/
    pages/home.css     ← the homepage's style list, in cascade order
    pages/services.css ← the services page's style list, in cascade order
    pages/contact.css  ← the contact page's style list, in cascade order
    *.css              ← one file per section (+ global, shared, theme, dark)
    services/*.css     ← the services page's own sections
    contact/*.css      ← the contact page's own sections
public/
  js/                  ← one script per section; each page lists the ones it runs (in order)
  assets/              ← fonts/, images/ (images/services/ for the services page), videos/
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

## The contact form

The form checks the name, email and phone, then opens the visitor's email app with the message
filled in, addressed to `company.email`. To send it from the site instead (Formspree, Netlify Forms,
your own API…), change the submit part of `public/js/contact-page.js`.

## Notes

- Components are React, rendered to plain HTML at build time (no React is shipped to the browser).
  All motion is done by the scripts in `public/js`.
- Styles are loaded through one ordered list per page (`src/styles/pages/`) on purpose: the
  cascade order matters, and per-component imports let the bundler reorder files between pages.
- CSS minification is off in `astro.config.mjs` on purpose: the minifier merges some duplicate
  rules and changes which one wins in the dark theme.
