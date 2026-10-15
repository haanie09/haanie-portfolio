/**
 * Write-ups linked from the "Hard problems" cards. One page each at /notes/<slug>.
 * Facts come from the original (private) pull requests. Same rules as site.ts:
 * rewrite every draft() in your voice, and fill every slot().
 */
import { draft, slot, type Words } from "./site";

export type Note = {
  slug: string;
  tag: string;
  title: string;
  problem: string[];
  fixes: { head: string; body: string }[];
  story: Words;
};

export const notes: Note[] = [
  {
    slug: "one-transaction-invoices",
    tag: "Correctness",
    title: draft("Making money and stock add up"),
    problem: [
      draft("Reps said saving an invoice took 3 to 4 seconds. One invoice made 16 to 20 separate trips to the database: get a number, insert the invoice, insert each line, update saved prices, record the payment, then take stock off one line at a time. Bigger invoices were slower."),
      draft("Worse, it wasn't all-or-nothing. If anything failed halfway, stock was left partly deducted and the books no longer matched the shelves."),
    ],
    fixes: [
      {
        head: draft("One transaction per invoice"),
        body: draft("A single database function now does the whole save in one round trip. Either all of it happens or none of it does. It keeps every existing rule: overselling is reported, per-customer prices are remembered, cost is recorded for margin reports, and drafts hold no stock. I tested it inside rolled-back transactions against the live schema, then end to end in the browser."),
      },
      {
        head: draft("Invoice numbers stopped skipping"),
        body: draft("Production invoice numbers were going up by two. The invoice screen asked for the next number just to show it, and that request permanently used one up. Saving then used another. A new read-only lookup shows the next number without taking it. Checked on production: three lookups in a row returned the same number and left the counter untouched."),
      },
      {
        head: draft("Paid only comes from payments"),
        body: draft("An invoice used to have a Mark as paid button, so its status could disagree with the payments actually recorded. Now an invoice becomes paid only when recorded payments cover the total."),
      },
    ],
    story: slot("Note · Correctness", "The moment a number was wrong: how you found out, how it felt, what changed in how you build."),
  },
  {
    slug: "access-control-audit",
    tag: "Security",
    title: draft("Closing a cross-account data leak"),
    problem: [
      draft("Safar keeps each business's data separate inside the database: every table checks that a row belongs to the signed-in user's organization. That layer was solid. The gap was in a handful of server routes that generate PDFs and send emails."),
      draft("Those routes checked that the caller was signed in, but not that the invoice they asked for was theirs, and they read data with an admin key that skips the database's checks. Any signed-in user could change the id in a request and read another business's invoices, statements and stock transfers, or have them emailed to any address."),
    ],
    fixes: [
      {
        head: draft("Routes now query as the caller"),
        body: draft("The server routes now use the user's own login for every query, so they go through the same per-organization checks as the rest of the app. Five routes moved over. Asking for another business's record now returns not found."),
      },
      {
        head: draft("Money functions locked down"),
        body: draft("A security scan flagged nine database functions, including voiding a payment and applying store credit, as callable without logging in. All nine now require a session. Reading each one also turned up a missing check: voiding a payment worked on any organization's payment. It's now limited to the caller's own."),
      },
      {
        head: draft("A full audit before launch"),
        body: draft("Before the first real invoice, an audit found 22 issues across permissions, file storage, balances and inventory. Every critical and high finding was fixed and checked against the live database using sessions from different accounts."),
      },
    ],
    story: slot("Note · Security", "How you found it, what went through your head, and what you check for now."),
  },
];
