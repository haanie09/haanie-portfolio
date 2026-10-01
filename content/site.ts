/**
 * ─────────────────────────────────────────────────────────────
 *  ALL THE WORDS ON THE SITE LIVE IN THIS FILE.
 * ─────────────────────────────────────────────────────────────
 *
 *  Three kinds of text:
 *
 *  1. slot("Q23", "prompt…")    Empty. Renders as a dashed box with the
 *                               prompt until you write it. To fill one:
 *                               slot("Q23", "prompt…", "Your actual words.")
 *
 *  2. draft("…")                Placeholder wording Claude wrote from your
 *                               facts so the layout looks real. The Academy
 *                               discourages AI-written text, so rewrite each
 *                               of these in your voice, then delete draft().
 *
 *  3. Plain strings             Facts: numbers, dates, PR numbers, titles.
 *
 *  Run `npm run check-copy` to list every slot and draft still left.
 *  Numbers are from FACT_SHEET.md (production database, Sept 22 2026).
 */

export type Words = { q: string; prompt: string; text: string | null };

/** An empty (or filled) space for your own writing. */
export const slot = (q: string, prompt: string, text: string | null = null): Words => ({ q, prompt, text });

/** True on the deployed site until `launched` is flipped. */
export const isHidden = () => !site.launched && process.env.NODE_ENV === "production";

/** Marks wording that still needs to be rewritten in your voice. */
export const draft = (s: string) => s;

export const site = {
  /** false = the live site shows an "in progress" page. `npm run dev` always shows the full site. Flip to true to launch. */
  launched: false,

  name: { first: "Haanie", last: "Mohammed" },
  email: "me@haanie.com",
  place: "Aurora, Colorado",
  school: "Grandview High School",
  classOf: "2027",

  links: {
    intro: null as string | null, // your one-minute YouTube intro, e.g. "https://youtube.com/watch?v=…"
    github: "https://github.com/vectis-tech" as string | null,
    linkedin: null as string | null,
    x: null as string | null,
    resume: null as string | null, // drop a PDF in /public and put "/resume.pdf" here
  },

  /** Photos: put files in /public/photos and set the path, e.g. "/photos/portrait.jpg". null = placeholder. */
  photos: {
    portrait: null as string | null,
    vectisDesktop: null as string | null,
    vectisPhone: null as string | null,
    sccCamp: null as string | null,
  },

  roles: [
    { org: "Vectis Technologies", title: "Founder & developer", note: "built VectisOS" },
    { org: "Steel City Codes", title: "Regional Director", note: "Denver" },
    { org: "Grandview FBLA", title: "Data Officer", note: "" },
  ],

  oneLiner: slot("Q23", "One line on who you are, the way you'd say it to a friend."),

  ticker: [
    "VectisOS in daily use at Payless Wholesale",
    "119 invoices in the last 28 days",
    "3 reps invoicing from the field",
    "Works with no signal",
  ],

  stats: {
    asOf: "Production database · Sept 22, 2026",
    items: [
      { n: "344", label: "invoices created since go-live" },
      { n: "283", label: "active customers" },
      { n: "403", label: "store visits logged by reps" },
      { n: "442", label: "commits · 257 merged PRs", italic: true },
    ],
  },

  vectis: {
    kicker: "01 — The flagship",
    summary: draft("Invoicing, inventory, routes and field sales for a wholesale distributor. Solo build. In production every day."),
    origin: slot("Q1–Q3", "How it started: your dad's warehouse, what they used before, the moment you saw the old way was broken."),
    role: slot("Q6–Q8", "What you personally did (product, design, database, code, support) and how you used AI, honestly."),
    phoneNote: "18 of 59 pages built for reps on the road",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase · Postgres", "Row-level security", "IndexedDB", "Tailwind v4", "Google Maps", "Vitest · CI"],
    log: [
      { d: "May 17", e: "First commit" },
      { d: "Jun 16", e: "First deploy" },
      { d: "Jun 26", e: "Security audit, 22 fixes" },
      { d: "Jul 1", e: "Go-live. First real invoice", key: true },
      { d: "Jul 21", e: "Offline outbox ships" },
      { d: "Jul 24", e: "Invoices in one transaction" },
      { d: "Today", e: "Still in daily use", now: true },
    ],
  },

  problems: {
    kicker: "02 — What broke, and what I did",
    items: [
      {
        tag: "Offline",
        /** Slug of the write-up in content/notes.ts (page at /notes/<slug>). */
        writeup: "offline-outbox",
        title: draft("Reps lose signal. Invoices can't."),
        facts: [
          "Outbox in IndexedDB that survives app close and replays on reconnect",
          "Each phone reserves 50 invoice numbers while online",
          "A double-tap moved stock twice → idempotency keys",
        ],
        story: slot("Q9", "When did no-signal first bite? What happened to a rep?"),
      },
      {
        tag: "Correctness",
        /** Slug of the write-up in content/notes.ts (page at /notes/<slug>). */
        writeup: "one-transaction-invoices",
        title: draft("Money and stock have to add up."),
        facts: [
          "16–20 browser calls per invoice → one database transaction",
          "Showing the next invoice number burned two per invoice",
          "Only real payments can mark an invoice paid",
        ],
        story: slot("Q10", "The moment a number was wrong. How you found out, how it felt."),
      },
      {
        tag: "Security",
        /** Slug of the write-up in content/notes.ts (page at /notes/<slug>). */
        writeup: "access-control-audit",
        dark: true,
        title: draft("One account could read another's invoices."),
        facts: [
          "Found an IDOR in admin-key routes; callers now prove access",
          "Money functions were callable logged-out → revoked",
          "Pre-launch audit: 22 findings fixed",
        ],
        story: slot("Q11", "How you discovered it and what went through your head."),
      },
    ],
  },

  killed: {
    kicker: "03 — Things I built, then deleted",
    heading: draft("Knowing what to cut."),
    items: [
      { what: "Product flavors & daily counts", meta: "1 month" },
      { what: "Suggested reorder", meta: "1 day" },
      { what: "“Optimize route”" },
      { what: "Barcode scanner" },
      { what: "Par levels", replaced: "demand meter" },
    ],
    lesson: slot("Q12 + Q15", "Why flavors came out a month later, and what deleting taught you about building for your dad's team."),
  },

  next: {
    kicker: "04 — What I'm building next",
    title: "VectisOS Desktop",
    status: "Local-first · planning · fall 2026",
    goal: draft("Save to the device first, sync to the cloud after. Every click feels instant, in the office and on the road, with or without signal."),
    /** The approach: local-first. */
    plan: [
      draft("Invoices, payments and inventory save to a local database on the device first"),
      draft("Changes sync to Supabase in the background"),
      draft("Builds on the offline outbox reps already use on their phones"),
    ],
    /** Where the slowness shows up today (from you). */
    targets: ["Saving invoices & payments", "Page loads & switching screens", "The office computer", "Reps' phones in the field"],
    why: slot("Q25", "Why a desktop app, what 'slow' costs your dad's team day to day, and what fast would change."),
  },

  beyond: {
    kicker: "05 — Beyond Vectis",
    scc: {
      name: "Steel City Codes",
      tag: "Nonprofit",
      roles: "Regional Director, Denver · Web Developer, national",
      facts: [
        draft("Built a registration platform where volunteers pick their own classes, replacing hours of manual matching. Denver pilots it in February."),
        draft("Moved the national site off Squarespace to Cloudflare Pages; keep course and chapter info right across 12 regions."),
        draft("Wrote curriculum for intermediate Python and MicroPython on Raspberry Pi Pico; teach at the two-week summer camp."),
      ],
      story: slot("SCC", "Volunteer to director: what you took on that nobody asked you to."),
    },
    fbla: {
      name: "FBLA data system",
      tag: "React · Firebase",
      roles: "Data Officer, Grandview FBLA",
      body: draft("Inherited the chapter's system and rebuilt it. Placement data imports automatically, so who qualifies for state is settled before anyone fills out a form. Replaces Google Forms and spreadsheets."),
      story: slot("FBLA", "What was broken when you got it."),
    },
    deca: {
      name: "DECA",
      place: "2nd",
      roles: "State · Integrated Marketing Campaign–Product",
      body: draft("A campaign pitching Meta smart glasses to the blind and low-vision community. State qualifier every year competed."),
      story: slot("DECA", "Why that audience?"),
    },
  },

  why: {
    kicker: "06 — Why I build",
    quote: slot("Q24 + Q25", "Why this matters to you, who it's for, and what you want to build next. This is the impact section: set big, like a pull quote."),
  },

  offHours: {
    kicker: "07 — Off the clock",
    heading: draft("Colorado, mostly outside"),
    items: [
      { caption: "Snowboarding", photo: null as string | null, tone: "blue" },
      { caption: "Hiking", photo: null as string | null, tone: "ink" },
      { caption: "Pickleball, daily in season", photo: null as string | null, tone: "accent" },
      { caption: "Friends", photo: null as string | null, tone: "sun" },
    ],
  },
};
