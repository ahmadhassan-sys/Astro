/* =====================================================================
   CONTACT PAGE CONTENT — copy of this page's own sections. Shared sections
   (header, partners strip, closing line, footer) and the company details
   (email, phone, address) come from src/data/site.js.

   Headings: *word* → highlighted word.
   ===================================================================== */
import { company } from "./site.js";

/* ---------- Page <head> ---------- */
export const seo = {
  title: "Contact · Breakthirty",
  description: "Design, engineering, marketing and AI in one accountable team.",
  ogTitle: "Contact · Breakthirty",
  ogDescription: "Design, engineering, marketing and AI in one accountable team.",
  themeColor: "#ffffff",
};

/* ---------- 1. Hero ---------- */
export const hero = {
  ariaLabel: "Contact Breakthirty",
  title: ["Let’s talk.", "We’re always", "*around*."],   // one entry per line
  hint: { label: "Scroll to the form", href: "#form" },
  intro: "Tell us what you're building, or what's broken. The first chat is on us, and we'll be honest about whether we're the right fit.",
  globeLabel: "Official partners",   // the globe shows our offices (src/data/partners.js → locations)
};

/* ---------- 2. Form ---------- */
export const form = {
  heading: "Tell us about your project",
  note: "(Rough is fine too)",
  form: {
    contactLabel: "(Contact)",
    writeLabel: "(Write us)",
    fields: [
      { name: "name", label: "Full Name", type: "text", autocomplete: "name", required: true },
      { name: "email", label: "Work Email", type: "email", autocomplete: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", autocomplete: "tel", inputmode: "tel" },
      { name: "company", label: "Company Name", type: "text", autocomplete: "organization" },
    ],
    needsLabel: "What do you need?",
    needs: ["Design", "Marketing", "Engineering", "Automation & AI", "Others"],
    detailsLabel: "Project Details",
    sendLabel: "Send a message",
    legal: { before: "By sending, you agree to our ", link: "privacy policy", href: "#", after: ". We only use your details to reply." },
  },
};

/* ---------- Sending (used by public/js/contact-page.js) ----------
   The form opens the visitor's email app with the message filled in, addressed to `to`. */
export const sending = {
  to: company.email,
  subject: "New project",   // the email subject becomes "New project — <company or name>"
  messages: {
    noName: "Add your name so we know who to reply to.",
    badEmail: "That work email doesn’t look right.",
    badPhone: "That phone number looks too short.",
    sending: "Opening your email app. Hit send and we’ll reply within a day.",
    noDetails: "(No details yet — rough is fine.)",
  },
};
