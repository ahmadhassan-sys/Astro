/* =====================================================================
   HOMEPAGE CONTENT — the copy, links and images of the homepage's own sections.
   Sections shared with other pages (header links, partners strip, testimonials,
   closing line, footer) are in src/data/site.js.

   Edit text here; the components in src/components only handle layout.
   Small formatting rules used in headings:
     *word*   → highlighted word (the alternate style, e.g. "Sketch")
     \n       → line break
   Partner logos and office locations live in src/data/partners.js.
   ===================================================================== */

/* ---------- Page <head> ---------- */
export const seo = {
  title: "Breakthirty — One team, from Sketch to Scale.",
  description: "Design, engineering, marketing and AI in one accountable team.",
  ogTitle: "Breakthirty — One team, from Sketch to Scale.",
  ogDescription: "Design, engineering, marketing and AI in one accountable team.",
  themeColor: "#ffffff",
};

/* ---------- 1. Hero ---------- */
export const hero = {
  ariaLabel: "Breakthirty — One team, from Sketch to Scale",
  // Two lines: line1 / then the highlighted word + the rest of line 2
  title: { line1: "One team, from", highlight: "Sketch", line2: " to Scale." },
  intro: [
    "Design, engineering, marketing and AI in one accountable team.",
    "No handoff, no gaps between the people who plan it and the people who ship it.",
  ],
  cta: { label: "Say hello", href: "#contact", icon: "target" },
  // Words that travel round the ring above the monitor
  orbitWords: ["Design", "Engineering", "Marketing", "Automation & AI"],
  orbitLabel: "Design, Engineering, Marketing, Automation & AI",
  media: {
    glow: "/assets/images/hero-glow.webp",
    foreground: "/assets/images/hero-foreground.webp",
    foregroundVideo: "/assets/videos/hero-foreground.mp4",
    bezel: "/assets/images/hero-monitor-bezel.webp",
    reelVideo: "/assets/videos/hero-reel.mp4",
    reelPoster: "/assets/images/hero-reel-poster.webp",
    reelLabel: "Breakthirty showreel",
  },
};

/* ---------- 2. Selected work ---------- */
export const work = {
  intro: "The ones we're allowed to talk about. Hover for a peek, click for the whole story.",
  heading: "Selected *Work* ®",
  ctaLabel: "View case study",
  // focus = crop focal point [x, y] from 0 to 1
  items: [
    {
      kicker: "Design & Engineering",
      year: "2024",
      title: "Onboarding rebuilt into a single honest flow.",
      body: "Sign-up was split across four screens and three teams, and people dropped off at every handoff. We rebuilt it as one flow, designed and shipped by the same people.",
      href: "case-study.html",
      img: "/assets/images/work-onboarding.jpg",
      alt: "A pink cloud glowing over a teal-to-orange sky",
      focus: [0.5, 0.5],
    },
    {
      kicker: "Ecommerce, Shopify Plus & CRO",
      year: "2024",
      title: "A store that stopped losing people at checkout.",
      body: "Shoppers filled their carts, then disappeared at shipping and payment. We moved the store to Shopify Plus, cut checkout down to what mattered and tested every change against real orders.",
      href: "case-study.html",
      img: "/assets/images/work-checkout.jpg",
      alt: "A translucent glowing flower on a dark background",
      focus: [0.5, 0.5],
    },
    {
      kicker: "AI & Automation",
      year: "2024",
      title: "An internal agent that clears the queue.",
      body: "Tickets piled up overnight and the same questions came back every morning. We built an agent that sorts, answers and routes them, with a person signing off on anything that matters.",
      href: "case-study.html",
      img: "/assets/images/work-agent.jpg",
      alt: "Iridescent liquid chrome waves",
      focus: [0.5, 0.5],
    },
    {
      kicker: "Marketing & Growth",
      year: "2024",
      title: "Brand & Product launched in one pass.",
      body: "A new brand, a new product and a launch date that wasn't moving. Identity, site, campaign and content came from one team, so every piece told the same story on day one.",
      href: "case-study.html",
      img: "/assets/images/work-launch.jpg",
      alt: "Classical columns among marigolds and clouds",
      focus: [0.5, 0.5],
    },
  ],
};

/* ---------- 3. Services ---------- */
export const services = {
  heading: "*Solutions* we\nprovide",
  label: "Services",
  lede: "Most projects need two or three of these. Handy that we all sit together. Pick one to see what's inside.",
  hands: { robot: "/assets/images/services-hand-robot.webp", human: "/assets/images/services-hand-human.webp" },
  items: [
    {
      num: "01",
      name: "Design",
      desc: "Brands and products that look good and make sense. Ideally at the same time.",
      items: ["Brand identity", "Product & UX", "Web design", "Design system", "Motion"],
    },
    {
      num: "02",
      name: "Engineering",
      desc: "Websites, stores and platforms that stay up when it matters. Like launch day.",
      items: ["Webflow builds", "Shopify & Plus", "Web apps", "Integrations", "Performance"],
    },
    {
      num: "03",
      name: "Marketing",
      desc: "Getting the right people to show up. Measured in pipeline, not in likes.",
      items: ["SEO & All", "Paid media", "Content", "Email & CRM", "Analytics"],
    },
    {
      num: "04",
      name: "Automation & AI",
      desc: "Agents and workflows that take the boring bits off your plate. Your team will notice.",
      items: ["AI agents", "Workflow automation", "Internal tools", "LLM integrations", "Data"],
    },
  ],
};

/* ---------- 4. Why one team ---------- */
export const whyOneTeam = {
  ariaLabel: "Why one team",
  text: "One team, already synced, already shipped things like this. Pick your mix above and we'll take it from there.",
  cta: { label: "Get in touch", href: "#contact", icon: "target24" },
  heading: "Stop briefing\n*four agencies* to get\none idea out the door.",
};

/* ---------- 5. Vision ---------- */
export const vision = {
  statement: "To take every idea from first sketch to full scale.",
  // the rock under the tablet: the pixel version shows by default, the photo shows under the cursor
  rock: { pixel: "/assets/images/vision-rock-pixel.webp", original: "/assets/images/vision-rock.webp" },
};

/* ---------- 6. Our network (partners + global offices) ---------- */
export const network = {
  copy: {
    eyebrow: "Our network",
    heading: ["Trusted partners.", "Worldwide connections.", "One team."],   // one entry per line
    body: "From the platforms we partner with to the places we work, we bring the right connections together to keep your business moving.",
    tabs: { partner: "Partners", global: "Global" },
    listLabel: "Official partners",
  },
};
