import Link from "next/link";

/** 404, set as the road's own sign for it. */
export default function NotFound() {
  return (
    <main className="wip">
      <div className="sign t-stop wip__sign">
        <h1 className="wip__name">Wrong way</h1>
        <p className="wip__text">There&apos;s no page at this address.</p>
      </div>
      <Link className="sign t-guide go" href="/">
        Go to the home page
      </Link>
    </main>
  );
}
