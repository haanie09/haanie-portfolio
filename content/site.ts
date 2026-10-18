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
 *  2. draft("…")                Wording Claude composed from your facts. The
 *                               Academy discourages AI-written text, so read
 *                               each one aloud, change anything you wouldn't
 *                               say, then delete draft().
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
  launched: true,

  name: { first: "Haanie", last: "Mohammed" },
  email: "me@haanie.com",
  /** The address the site actually serves from (haanie.com redirects here); used for search and share links. */
  url: "https://www.haanie.com",
  place: "Aurora, Colorado",
  school: "Grandview High School",
  classOf: "2027",

  links: {
    intro: null as string | null, // your one-minute YouTube intro, e.g. "https://youtube.com/watch?v=…"
    demo: "https://safar.haanie.com" as string | null, // live Safar demo with made-up data
    sccDemo: "https://scc.haanie.com" as string | null, // live Steel City Codes registration demo (fictional camp, resets nightly)
    github: "https://github.com/haanie09" as string | null, // Safar-Technologies org has no public repos yet
    linkedin: null as string | null,
    x: null as string | null,
    resume: "/resume.pdf" as string | null, // Oct 17 tech version (source/resume-tech.html), re-export and re-copy after edits
  },

  /** Photos: put files in /public/photos and set the path, e.g. "/photos/portrait.jpg". null = placeholder. */
  photos: {
    portrait: "/photos/fall-pumpkin.jpg" as string | null, // swap in the warehouse portrait from the shot list when you have one
    portraitPlace: null as string | null, // small brown sign on the photo, e.g. "Taj Mahal, Agra"; null hides it
    portraitAlt: "Haanie on a hay bale against a brick wall, holding a big pumpkin",
    safarDesktop: "/photos/safar-desktop.png" as string | null,
    safarPhone: "/photos/safar-phone.png" as string | null,
    sccCamp: "/photos/scc-camp.jpg" as string | null,
    fblaState: "/photos/fbla-state.jpg" as string | null, // State Leadership Conference 2025, Website Design on stage
    decaState: "/photos/deca-state.jpg" as string | null, // state conference award; the selfie is flipped so the plaque reads correctly
  },

  roles: [
    { org: "Safar", title: "Founder & developer", note: "", href: "#safar" },
    { org: "Steel City Codes", title: "Regional Director", note: "Denver", href: "#scc" },
    { org: "Grandview FBLA", title: "Data Officer", note: "", href: "#fbla" },
  ],

  // From your Common App activity ("Because I build for people I work beside").
  oneLiner: slot("Q23", "One line on who you are, the way you’d say it to a friend.", "I build software that gives people their time back."),

  stats: {
    title: "Safar so far",
    source: "Production database, Sept 22, 2026",
    items: [
      { n: "344", label: "invoices since launch" },
      { n: "283", label: "stores on my dad’s routes" },
      { n: "403", label: "store visits logged by reps" },
      { n: "3", label: "reps invoicing from the field" },
    ],
  },

  safar: {
    summary: draft("The software my family’s wholesale business runs on. Invoicing, inventory and delivery routes, in daily use since July 2026."),
    originLabel: "How it started",
    origin: slot(
      "Q1–Q3",
      "How it started: your dad’s warehouse, what they used before, the moment you saw the old way was broken.",
      // From your Common App personal statement, edited for the site (the dinner is saved for the video).
      "Every invoice my dad sent meant a second job: opening Excel afterward to subtract each item by hand. Last summer I started building him a system to do that work instead. The hard part was his data. Items had been entered twice under different names, and the counts no longer matched the shelves, so my family recounted the whole warehouse, aisle by aisle. The next morning, we punched in a local 7-Eleven’s order, and the inventory updated itself.",
    ),
    desktopNote: "The owner’s dashboard in the live demo, which runs on made-up data.",
    /** Under the hero's demo button, so nobody mistakes the demo for my dad's real books. */
    demoNote: draft("A live demo, running on made-up data."),
    /** Heading over the role slot; matches the Academy's "what you personally built". */
    roleLabel: "What I personally built",
    role: slot(
      "Q6–Q8",
      "What you personally did (product, design, database, code, support) and how you used AI, honestly.",
      draft("I planned Safar on a whiteboard and directed AI to write much of the code. My job was deciding what to build and testing it against my dad’s business until it held up. For weeks he entered every invoice three times, in QuickBooks, Excel and Safar, until Safar could do the work of all three."),
    ),
    phoneNote: "A rep’s day in Safar, running in the phone’s browser.",
    /** The road: stops are placed by real date (from FACT_SHEET.md and the repo). */
    road: {
      start: "2026-05-17",
      past: [
        { date: "2026-05-17", e: "First commit" },
        { date: "2026-06-26", e: "Security audit, 22 fixes" },
        { date: "2026-07-01", e: "Launch: first real invoice", key: true },
        { date: "2026-07-22", e: "Closed a cross-account security hole" },
        { date: "2026-08-14", e: "Deleted flavor tracking" },
        { date: "2026-10-04", e: "Started the native app" },
      ],
      today: "Still in daily use",
      /** The work zone ahead, in order. */
      next: [
        draft("Finish the iPhone app"),
        draft("App Store, then Google Play"),
        draft("Offer Safar to other distributors"),
      ],
    },
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
          draft("My dad asked for a map of his customers. What he needed was that map next to who owed him money, which Google Maps can’t show, so I built his routes around both. Collections used to cost him whole days every few months. Now reps pick up overdue balances on routes they already run, and he hasn’t made a collection run since August."),
        ),
        /** Screenshot from the live demo (made-up data), shown under the story. */
        shot: {
          src: "/photos/safar-collections.jpg",
          w: 750,
          h: 856,
          kind: "phone",
          alt: "Suggested stops on a rep’s route in Safar, most tagged Overdue balance and the rest by days since their last order",
          caption: "Suggested stops on a rep’s route, from the live demo.",
        },
      },
      {
        tag: "Beyond my dad",
        title: draft("Getting other distributors to switch."),
        story: slot(
          "Q10",
          "What other distributors told you, and what you’re building because of it.",
          draft("I called other distributors to see if Safar could work for them. One told me, “We’ve got it handled.” Most said the same thing at greater length: switching means uprooting the systems their business already runs on. So the next thing I’m building is the move itself. Safar now imports a distributor’s customers and products from a spreadsheet, and I’m designing a QuickBooks sync so they can keep their books where they are."),
        ),
      },
      {
        tag: "Security",
        title: draft("One account could read another’s invoices."),
        story: slot(
          "Q11",
          "How you discovered it and what went through your head.",
          draft("In July, an audit found a hole: one account could read another’s invoices. I closed it the same day. Safar holds every store my dad sells to, what they buy and what they owe, and reps sign in on public networks and phones I’ll never see. That’s why I audited before the first real invoice, fixed all 22 issues it found, and kept auditing after launch."),
        ),
        shot: {
          src: "/photos/safar-permissions.png",
          w: 1260,
          h: 624,
          kind: "panel",
          alt: "Safar’s invoice permissions for a rep: See everyone’s invoices is off, so they only see invoices they wrote; delete, record and void payments are marked DB-enforced",
          caption: "A rep’s invoice permissions, from the live demo.",
        },
      },
    ],
  },

  killed: {
    kicker: "Things I built, then deleted",
    items: [
      { what: "Product flavors & daily counts", meta: "lived 1 month" },
      { what: "Suggested reorder", meta: "lived 1 day" },
      { what: "“Optimize route”" },
    ],
    lesson: slot(
      "Q12 + Q15",
      "Why flavors came out a month later, and what deleting taught you about building for your dad’s team.",
      // From your Common App activity description, lightly edited.
      "I pushed to track product flavors so we could order smarter. Our reps showed me it would double the length of every stop, and lost time is lost money, so I cut it. Now I ask how a feature affects the person using it before I ask how it works.",
    ),
  },

  next: {
    kicker: "What I’m building next",
    title: "Safar for iPhone and Android",
    // Checked against the Safar repo: Capacitor shell (#516), SQLite outbox, camera/barcode, share sheet.
    goal: draft("Reps use Safar in their phone’s browser today. The native app ships with its screens built in, so it opens even where there’s no signal."),
    /** What the native app adds, each checked against the Safar repo (#516 and the outbox work). */
    addsTitle: "What the app adds",
    adds: [
      { name: "Opens with no signal", what: "Screens ship inside the app" },
      { name: "Keeps unsent work", what: "Queued on the phone until it syncs" },
      { name: "Scans barcodes", what: "With the phone’s camera" },
      { name: "Shares invoice PDFs", what: "From the phone’s share sheet" },
    ],
    status: "Running in the iPhone simulator. Android project generated.",
  },

  beyond: {
    kicker: "Beyond Safar",
    scc: {
      name: "Steel City Codes",
      roles: "Regional Director, Denver",
      facts: [
        draft("Our Denver region teaches 200+ students a year; 150+ come to the two-week summer camp."),
        draft("I wrote the intermediate Python and MicroPython (Raspberry Pi Pico) curriculum and teach it at camp."),
        // From your supplement essays, edited.
        "All six kids in one family have come through my microcontrollers class. One built a video game controller; another, a rubber band gun that fires when its ultrasonic sensor spots someone walking past.",
      ],
      story: slot(
        "SCC",
        "Volunteer to director: what you took on that nobody asked you to.",
        draft("Before every camp, our team spent weekends matching volunteers and students to classes by hand. Nobody asked for a registration system, so I built one. Volunteers pick their own classes, parents sign their kids up, and admins see the whole camp in one place. Denver pilots it in February, when registration opens. If it holds up, I’ll hand it to the national team so other regions can use it too."),
      ),
      demoNote: "Pick a seat with one click: camp admin, parent, volunteer or applicant. The camp is made up and resets every night.",
      shot: {
        src: "/photos/scc-admin.png",
        w: 2880,
        h: 1800,
        alt: "The Steel City Codes camp admin’s Today page: 57 seats left in 9 sections, a to-do list starting with a section that has no lead, and a seat map for both camp weeks",
        caption: "The camp admin’s dashboard, from the live demo.",
      },
    },
    fbla: {
      name: "FBLA",
      roles: "Data Officer, Grandview FBLA",
      body: draft("Two-time state champion, in Website Design (2025) and Website Coding & Development (2026). As Data Officer, I rebuilt the chapter’s registration app for 180+ members. Placement results now import automatically, so state qualifiers are set before anyone fills out a form."),
    },
    deca: {
      name: "DECA",
      roles: "2nd at state, Integrated Marketing Campaign–Product",
      body: draft("A campaign pitching Meta’s smart glasses to blind and low-vision users."),
    },
  },

  why: {
    kicker: "Why I build",
    quote: slot(
      "Q24 + Q25",
      "Why this matters to you, who it’s for, and what you want to build next. This is the impact section: set big, like a pull quote.",
      // From your Common App personal statement and supplement, edited.
      "A few weeks after my dad started using Safar, he told me, “Bohot time bachaa liya app ne mera”: you saved me a lot of time. To me, the best technology gives people back their time.",
    ),
    photo: { src: "/photos/with-dad.jpg", w: 1086, h: 1358, alt: "Haanie and his dad at a park at dusk", caption: "With my dad." },
  },

  offHours: {
    kicker: "Off the clock",
    /** Items with a photo fill the photo grid in balanced rows of three or four, each labeled with a small brown sign. The rest are listed on a brown recreation sign. */
    items: [
      { caption: "Taj Mahal, Agra", detail: "", photo: "/photos/traveling.jpg" as string | null, w: 768, h: 1024 },
      { caption: "Hiking with friends", detail: "", photo: "/photos/hiking-friends.jpg" as string | null, w: 1024, h: 768 },
      { caption: "Hiking", detail: "", photo: "/photos/hiking.jpg" as string | null, w: 768, h: 1024 },
      { caption: "Family trip", detail: "", photo: "/photos/family-trip.jpg" as string | null, w: 1200, h: 1600 },
      { caption: "Friends", detail: "", photo: "/photos/friends.jpg" as string | null, w: 1200, h: 900 },
      { caption: "Grandview student section", detail: "", photo: "/photos/student-section.jpg" as string | null, w: 1024, h: 578 },
      { caption: "Family", detail: "", photo: "/photos/family.jpg" as string | null, w: 1024, h: 768 },
      { caption: "Pickleball", detail: "", photo: null as string | null, w: 0, h: 0 },
      { caption: "Snowboarding", detail: "", photo: null as string | null, w: 0, h: 0 },
    ],
  },
};
