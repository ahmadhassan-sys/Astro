/* =====================================================================
   OUR WORK PAGE CONTENT — copy, links and images of this page's own sections.
   Shared sections (header, partners strip, testimonials, closing line, footer)
   come from src/data/site.js.

   Headings: *word* → highlighted word.
   ===================================================================== */

/* ---------- Page <head> ---------- */
export const seo = {
  title: "Work · Breakthirty",
  description: "Design, engineering, marketing and AI in one accountable team.",
  ogTitle: "Breakthirty — One team, from Sketch to Scale.",
  ogDescription: "Design, engineering, marketing and AI in one accountable team.",
  themeColor: "#ffffff",
};

/* ---------- 1. Hero ---------- */
export const hero = {
  glow: "/assets/images/hero-glow.webp",
  intro: "Design, engineering, marketing and AI, from one team. Here's what that looks like once it's live.",
  rigLabel: "Case studies. Drag to spin, click a page to open it.",   // the spinning pages are made from `cases`
  title: ["Built.", "Shipped.", "Measured."],   // one entry per line
  scrollHint: "Scroll to the results",
};

/* ---------- 2. Filters (the tabs above the list) ----------
   key: used in each case study's `tags` · tab: the tab's name · tag: the small label on a card */
export const filters = {
  allLabel: "All Works",
  label: "Filter by service",
  items: [
    { key: "design", tab: "Design", tag: "Design" },
    { key: "engineering", tab: "Engineering", tag: "Engineering" },
    { key: "marketing", tab: "Marketing", tag: "Marketing" },
    { key: "ai", tab: "Automation & AI", tag: "AI" },
  ],
  views: { label: "Layout", grid: "Grid", index: "Index" },
};

/* ---------- 3. Case studies (grid, index list and the hero's spinning pages) ---------- */
export const cases = [
  {
    id: "construction-check",
    name: "Construction Check",
    href: "case-study.html",
    tags: ["design", "engineering", "ai"],   // filter keys from `filters` below
    summary: "Estimators rebuilt the same spreadsheet for every bid. We taught a system to read drawings, and kept numbers in their hands.",   // grid card
    short: "Estimators rebuilt the same spreadsheet for every bid.",   // index row
    images: ["/assets/images/work/construction-check-1.jpg", "/assets/images/work/construction-check-2.jpg", "/assets/images/work/construction-check-3.jpg", "/assets/images/work/construction-check-4.jpg", "/assets/images/work/construction-check-5.jpg"],   // first one is the cover
  },
  {
    id: "chartlamp",
    name: "Chartlamp",
    href: "case-study.html",
    tags: ["design", "engineering"],   // filter keys from `filters` below
    summary: "Clinics tracked patient charts across three tools that never agreed. We merged them into one calm workspace, designed and built together.",   // grid card
    short: "Clinics tracked patient charts across three disconnected tools.",   // index row
    images: ["/assets/images/work/chartlamp-1.jpg", "/assets/images/work/chartlamp-2.jpg", "/assets/images/work/chartlamp-3.jpg", "/assets/images/work/chartlamp-4.jpg", "/assets/images/work/chartlamp-5.jpg"],   // first one is the cover
  },
  {
    id: "kind-over-matter",
    name: "Kind Over Matter Creative",
    href: "case-study.html",
    tags: ["design", "engineering"],   // filter keys from `filters` below
    summary: "A studio with a loud voice had a quiet site. We rebuilt brand and store as one, launched in six weeks.",   // grid card
    short: "A loud studio had a very quiet site.",   // index row
    images: ["/assets/images/work/kind-over-matter-1.jpg", "/assets/images/work/kind-over-matter-2.jpg", "/assets/images/work/kind-over-matter-3.jpg", "/assets/images/work/kind-over-matter-4.jpg", "/assets/images/work/kind-over-matter-5.jpg"],   // first one is the cover
  },
  {
    id: "promscent",
    name: "Promscent",
    href: "case-study.html",
    tags: ["design", "marketing"],   // filter keys from `filters` below
    summary: "Great product, awkward category, ad accounts that kept getting flagged. We rebuilt the funnel and message so people could say yes.",   // grid card
    short: "Great product, awkward category, ads kept getting flagged.",   // index row
    images: ["/assets/images/work/promscent-1.jpg", "/assets/images/work/promscent-2.jpg", "/assets/images/work/promscent-3.jpg", "/assets/images/work/promscent-4.jpg", "/assets/images/work/promscent-5.jpg"],   // first one is the cover
  },
  {
    id: "ethical-narrative",
    name: "Ethical Narrative",
    href: "case-study.html",
    tags: ["design", "engineering"],   // filter keys from `filters` below
    summary: "A publisher's archive lived in folders only two people understood. We turned it into a searchable library their readers actually use daily.",   // grid card
    short: "A publisher's archive lived in folders nobody searched.",   // index row
    images: ["/assets/images/work/ethical-narrative-1.jpg", "/assets/images/work/ethical-narrative-2.jpg", "/assets/images/work/ethical-narrative-3.jpg", "/assets/images/work/ethical-narrative-4.jpg", "/assets/images/work/ethical-narrative-5.jpg"],   // first one is the cover
  },
  {
    id: "rivas-pro-details",
    name: "Rivas Pro Details",
    href: "case-study.html",
    tags: ["design"],   // filter keys from `filters` below
    summary: "A detailing crew booked jobs by text and memory. We designed a brand and booking flow as sharp as their work.",   // grid card
    short: "A detailing crew booked jobs by text alone.",   // index row
    images: ["/assets/images/work/rivas-pro-details-1.jpg", "/assets/images/work/rivas-pro-details-2.jpg", "/assets/images/work/rivas-pro-details-3.jpg", "/assets/images/work/rivas-pro-details-4.jpg", "/assets/images/work/rivas-pro-details-5.jpg"],   // first one is the cover
  },
];

/* ---------- 4. Featured project (above the list) ---------- */
export const featured = {
  kicker: "Featured project",
  title: "An AI assistant that turns site documents into cost estimates.",
  meta: "Design · Engineering · Automation & AI",
  name: "Construction check",
  text: "Estimators were rebuilding the same spreadsheet for every bid. We taught the system to read the drawings instead, and kept the estimator in control of every number.",
  year: "2025",
  href: "case-study.html",
  cta: "View case study",
  mediaLabel: "Construction Check case study",
  cover: "/assets/images/work/featured.jpg",
  moreFrom: "construction-check",   // the pictures shown on hover: this case study's images 2–5
};

/* ---------- 5. "Selected work" heading ---------- */
export const selected = {
  intro: "The ones we're allowed to talk about. Hover for a peek, click for the whole story.",
  heading: "Selected *Work* ®",
};

/* ---------- 6. One team (the hand) ---------- */
export const hello = {
  heading: "One team behind every project. Nothing gets lost between handoffs.",
  text: "Strategy, design, code and campaigns sit at one table. Different minds, shared goals, better work. No silos, just good stuff that works.",
  hand: "/assets/images/work/hello-hand.webp",
  cta: { label: "Say hello", href: "#contact", icon: "phone" },
};
