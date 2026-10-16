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
    demo: "https://safar.haanie.com" as string | null, // live Safar demo with made-up data
    github: "https://github.com/haanie09" as string | null, // Safar-Technologies org has no public repos yet
    linkedin: null as string | null,
    x: null as string | null,
    resume: null as string | null, // drop a PDF in /public and put "/resume.pdf" here
  },

  /** Photos: put files in /public/photos and set the path, e.g. "/photos/portrait.jpg". null = placeholder. */
  photos: {
    portrait: "/photos/portrait.jpg" as string | null,
    safarDesktop: "/photos/safar-desktop.png" as string | null,
    safarPhone: "/photos/safar-phone.png" as string | null,
    sccCamp: "/photos/scc-camp.jpg" as string | null,
  },

  roles: [
    { org: "Safar Technologies", title: "Founder & developer", note: "built Safar" },
    { org: "Steel City Codes", title: "Regional Director", note: "Denver" },
    { org: "Grandview FBLA", title: "Data Officer", note: "" },
  ],

  oneLiner: slot("Q23", "One line on who you are, the way you'd say it to a friend."),

  stats: {
    asOf: "Production database · Sept 22, 2026",
    items: [
      { n: "344", label: "invoices created since go-live" },
      { n: "283", label: "active customers" },
      { n: "403", label: "store visits logged by reps" },
      { n: "3", label: "reps invoicing from the field" },
    ],
  },

  safar: {
    kicker: "The flagship",
    summary: draft("Invoicing, inventory, routes and field sales for a wholesale distributor. Solo build. In production every day."),
    origin: slot("Q1–Q3", "How it started: your dad's warehouse, what they used before, the moment you saw the old way was broken."),
    role: slot("Q6–Q8", "What you personally did (product, design, database, code, support) and how you used AI, honestly."),
    phoneNote: "The app reps invoice from on the road",
    log: [
      { d: "May 17", e: "First commit" },
      { d: "Jun 26", e: "Security audit, 22 fixes" },
      { d: "Jul 1", e: "Go-live. First real invoice", key: true },
      { d: "Oct 4", e: "Native phone app built" },
      { d: "Today", e: "Still in daily use", now: true },
    ],
  },

  problems: {
    kicker: "What broke, and what I did",
    items: [
      {
        tag: "Collections",
        title: draft("Routes that know who owes money."),
        story: slot(
          "Q9",
          "Your dad asked for a map; what he needed was who owed him money. What changed once collections rode along on routes?",
          draft("My dad asked for a map of his customers. What he needed was that map next to who owed him money and how overdue they were, something Google Maps doesn't know, so I built his routes around it. Collections were the bigger cost. Every few months receivables backed up, and he lost whole days going to collect. Now he picks nearby collections and reps handle them on routes they're already running. He hasn't made a collection run since August, and that time goes to decisions that make him money."),
        ),
      },
      {
        tag: "Correctness",
        title: draft("Money and stock have to add up."),
        story: slot(
          "Q10",
          "The moment a number was wrong. How you found out, how it felt.",
          draft("My dad caught it first: his invoice numbers were going up by two. I traced it to the invoice screen. Just showing the next number used one up, and saving used another. We fixed it right away. The lesson: a mistake can hide anywhere, even in a number that only sits on the screen."),
        ),
      },
      {
        tag: "Security",
        dark: true,
        title: draft("One account could read another's invoices."),
        story: slot(
          "Q11",
          "How you discovered it and what went through your head.",
          draft("Safar holds every store my dad sells to, what they buy and what they owe. Leaked, that's his customers' data and his competitive information. Reps sometimes log in on public networks, new employees get accounts, and I can't see what's on anyone's phone. So before the first real invoice, I ran a full security audit and fixed all 22 issues it found. I kept auditing after launch. In July, one audit caught a hole where one account could read another's invoices, and I closed it."),
        ),
      },
    ],
  },

  killed: {
    kicker: "Things I built, then deleted",
    heading: draft("Knowing what to cut."),
    items: [
      { what: "Product flavors & daily counts", meta: "1 month" },
      { what: "Suggested reorder", meta: "1 day" },
      { what: "“Optimize route”" },
    ],
    lesson: slot("Q12 + Q15", "Why flavors came out a month later, and what deleting taught you about building for your dad's team."),
  },

  next: {
    kicker: "What I'm building next",
    title: "Safar for iPhone and Android",
    status: "Native app · in development · App Store next",
    goal: draft("Reps already run Safar in their phone's browser. The native app puts it on the home screen, keeps the offline queue in the phone's own storage, and is the version other distributors will download."),
    /** What's left (from you, Oct 15). */
    leftLabel: "What's left",
    left: [
      draft("Finish the iPhone screens and first-run setup"),
      draft("Publish on the App Store"),
      draft("Form the LLC, then offer Safar to other local distributors"),
    ],
  },

  beyond: {
    kicker: "Beyond Safar",
    scc: {
      name: "Steel City Codes",
      tag: "Nonprofit",
      roles: "Regional Director, Denver",
      facts: [
        draft("Built a registration platform where volunteers pick their own classes, replacing hours of manual matching. Denver pilots it in February."),
        draft("Wrote curriculum for intermediate Python and MicroPython on Raspberry Pi Pico; teach at the two-week summer camp."),
      ],
      story: slot("SCC", "Volunteer to director: what you took on that nobody asked you to."),
    },
    fbla: {
      name: "FBLA",
      tag: "Two-time state champion",
      roles: "Data Officer, Grandview FBLA",
      body: draft("State champion in Website Design (2025) and Website Coding & Development (2026). As Data Officer, I rebuilt the chapter's registration app for 180+ members; placement results import automatically, so who qualifies for state is settled before anyone fills out a form."),
    },
    deca: {
      name: "DECA",
      place: "2nd",
      roles: "State · Integrated Marketing Campaign–Product",
      body: draft("A campaign pitching Meta smart glasses to the blind and low-vision community. Two-time state qualifier."),
    },
  },

  why: {
    kicker: "Why I build",
    quote: slot("Q24 + Q25", "Why this matters to you, who it's for, and what you want to build next. This is the impact section: set big, like a pull quote."),
  },

  offHours: {
    kicker: "Off the clock",
    heading: draft("Colorado, mostly outside"),
    items: [
      { caption: "Traveling", photo: "/photos/traveling.jpg" as string | null, tone: "blue" },
      { caption: "Hiking", photo: null as string | null, tone: "ink" },
      { caption: "Pickleball, daily in season", photo: null as string | null, tone: "accent" },
      { caption: "Friends", photo: null as string | null, tone: "sun" },
    ],
  },
};
