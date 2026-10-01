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
    slug: "offline-outbox",
    tag: "Offline",
    title: draft("Offline invoices that never double-book"),
    problem: [
      draft("Reps write invoices and log visits in store back rooms and on rural roads with no signal. The first version of the sync layer kept its queue in memory: close the app and every unsent visit was gone."),
      draft("Invoices couldn't be written offline at all, because each one needed the server to hand out an invoice number and take the stock off the van."),
    ],
    fixes: [
      {
        head: draft("A queue that survives the app closing"),
        body: draft("Every write from the field is saved to the phone's own database (IndexedDB) first. It replays when signal returns: when the phone reconnects, when the app comes back to the foreground (iPhones often never report reconnecting), and at startup for anything left from a previous session."),
      },
      {
        head: draft("Replays that can't duplicate"),
        body: draft("Each queued write carries an id generated on the phone, and the database enforces that id as unique. If a request reached the server but the response was lost, retrying it returns the existing record instead of creating a second visit or crediting a payment twice."),
      },
      {
        head: draft("Conflicts pause, they never overwrite"),
        body: draft("If the server already has newer data, such as a newer visit for the same store, the queued write parks as a conflict and the rep chooses to keep theirs or discard it. Writes that involve money never offer discard."),
      },
      {
        head: draft("Real invoice numbers with no signal"),
        body: draft("While online, each phone reserves a block of about 50 invoice numbers. Offline, the rep hands the customer a real, final number, and the invoice later goes through the same database function the online path uses. Online and offline draw from one counter, so they can never collide."),
      },
      {
        head: draft("Double-taps"),
        body: draft("In July a rep tapped Save twice on a stock transfer and a 19-unit move was recorded as 38. The app now creates one id per intent and reuses it on every retry. The database claims that id before touching any stock, so the second tap does nothing. Invoice creation got the same fix."),
      },
    ],
    story: slot("Note · Offline", "When did no-signal first cause a real problem? What happened to a rep? How did you use AI on this, honestly?"),
  },
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
      draft("VectisOS keeps each business's data separate inside the database: every table checks that a row belongs to the signed-in user's organization. That layer was solid. The gap was in a handful of server routes that generate PDFs and send emails."),
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
