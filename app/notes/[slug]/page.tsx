import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/content/notes";
import { isHidden, site } from "@/content/site";
import { Kicker, Slot } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return { title: note ? `${note.title} · ${site.name.first} ${site.name.last}` : undefined };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note || isHidden()) notFound();
  const i = notes.indexOf(note);
  const next = notes[(i + 1) % notes.length];

  return (
    <main className="note">
      <div className="note__wrap stack-l">
        <Link href="/#problems" className="mono muted">
          ← {site.name.first} {site.name.last}
        </Link>
        <div className="stack">
          <Kicker>Safar · {note.tag}</Kicker>
          <h1 className="disp note__title">{note.title}</h1>
        </div>

        <section className="stack">
          <h2 className="mono muted">What was broken</h2>
          {note.problem.map((p) => (
            <p key={p} className="words">
              {p}
            </p>
          ))}
        </section>

        <section className="stack-l">
          <h2 className="mono muted">What I did</h2>
          {note.fixes.map((f) => (
            <div key={f.head} className="stack-s">
              <h3 className="disp note__head">{f.head}</h3>
              <p className="words">{f.body}</p>
            </div>
          ))}
        </section>

        <Slot w={note.story} />

        <p className="words muted">
          Safar is a private codebase. I&apos;m glad to walk through this code on a call:{" "}
          <a className="note__link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>

        <Link href={`/notes/${next.slug}`} className="note__next">
          <span className="mono muted">Next</span>
          <span className="disp note__head">{next.title}</span>
        </Link>
      </div>
    </main>
  );
}
