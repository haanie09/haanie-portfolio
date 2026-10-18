import { isHidden, site } from "@/content/site";
import { Exit, Out, Photo, Play, Slot } from "@/components/ui";
import NavBehavior from "@/components/NavBehavior";

/** Re-render daily so the road's "Today" stop keeps moving between deploys. */
export const revalidate = 86400;

const intro = site.links.intro;
const demo = site.links.demo;

/**
 * Section colors follow what each color means on a US highway sign:
 * green = where you're headed, yellow = warning, orange = work zone,
 * blue = services, brown = recreation, white = rules.
 */
type Tone = "guide" | "warn" | "work" | "service" | "rec" | "reg";

const sections: { href: string; label: string; tone: Tone }[] = [
  { href: "#safar", label: "Safar", tone: "guide" },
  { href: "#problems", label: "What broke", tone: "warn" },
  { href: "#next", label: "What’s next", tone: "work" },
  { href: "#beyond", label: "Beyond Safar", tone: "service" },
  { href: "#offhours", label: "Off the clock", tone: "rec" },
];

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Nav() {
  const links = sections.filter((s) => s.href !== "#offhours" || site.offHours.items.length > 0);
  const items = (
    <>
      {links.map((s) => (
        <a key={s.href} href={s.href}>
          <span className={`chip t-${s.tone}`} aria-hidden="true" />
          {s.label}
        </a>
      ))}
      {intro ? (
        <Out href={intro}>
          <Play /> Watch my intro
        </Out>
      ) : null}
      <a href="#contact">Contact</a>
    </>
  );
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__name">
          {site.name.first} {site.name.last}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {items}
        </nav>
        <details className="nav__menu">
          <summary aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </summary>
          <nav className="nav__sheet" aria-label="Sections">
            {items}
          </nav>
        </details>
      </div>
      <NavBehavior />
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="sign t-guide hero__sign">
          <p className="hero__meta">
            Senior at {site.school} in {site.place}. Class of {site.classOf}.
          </p>
          <h1 className="hero__name">
            {site.name.first}
            <br />
            {site.name.last}
          </h1>
          {/* Each destination is an exit: it jumps to that part of the page. */}
          <ul className="dest dest--exits">
            {site.roles.map((r) => (
              <li key={r.org}>
                <a href={r.href}>
                  <span className="dest__name">{r.org}</span>
                  <span className="dest__what">
                    {r.title}
                    {r.note ? `, ${r.note}` : ""}
                    <Exit />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          src={site.photos.portrait}
          alt={site.photos.portraitAlt}
          label="portrait of you"
          className="hero__photo"
          width={768}
          height={1024}
          sizes="(max-width: 760px) 100vw, (max-width: 1080px) 40vw, 400px"
          eager
        >
          {site.photos.portraitPlace ? <span className="sign t-rec place">{site.photos.portraitPlace}</span> : null}
        </Photo>
        <Slot w={site.oneLiner} className="hero__line" />
        {demo ? (
          <div className="hero__go">
            <Out href={demo} className="sign t-guide go">
              Try the Safar demo
            </Out>
            <p className="hero__go-note">{site.safar.demoNote}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Safar() {
  const v = site.safar;
  const s = site.stats;
  return (
    <section id="safar" className="section">
      <div className="wrap">
        <div className="safar__head">
          <div className="safar__id">
            <h2 className="sign t-guide plate plate--xl">Safar</h2>
            <p className="lede">{v.summary}</p>
          </div>
          <div className="sign t-guide miles">
            <p className="miles__title">{s.title}</p>
            <dl className="miles__list">
              {s.items.map((it) => (
                <div key={it.label} className="miles__row">
                  <dt>{it.label}</dt>
                  <dd data-count={it.n}>{it.n}</dd>
                </div>
              ))}
            </dl>
            <p className="miles__src">{s.source}</p>
          </div>
        </div>

        <Road />

        <div className="story">
          <h3 className="story__label">{v.originLabel}</h3>
          <Slot w={v.origin} className="story__text" />
        </div>

        <div className="showcase">
          <figure className="showcase__desk showcase__desk--safar">
            <Photo
              src={site.photos.safarDesktop}
              alt="Safar's owner dashboard in the live demo"
              label="Safar dashboard (demo data)"
              className="shot"
              width={2880}
              height={1800}
              sizes="(max-width: 760px) 190vw, 66vw"
            />
            <figcaption>
              {v.desktopNote}
              {demo ? (
                <>
                  {" "}
                  <Out href={demo}>{host(demo)}</Out>
                </>
              ) : null}
            </figcaption>
          </figure>
          <figure className="showcase__phone">
            <Photo
              src={site.photos.safarPhone}
              alt="Safar on a rep's phone, showing today's route"
              label="phone screenshot"
              className="phone"
              width={1170}
              height={1992}
              sizes="(max-width: 760px) 70vw, 25vw"
            />
            <figcaption>{v.phoneNote}</figcaption>
          </figure>
        </div>

        <div className="story">
          <h3 className="story__label">{v.roleLabel}</h3>
          <Slot w={v.role} className="story__text" />
        </div>
      </div>
    </section>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Past share of the road; the rest is the work zone ahead. */
const PAST = 64;

/** Safar's timeline as one road: past stops placed by real date, today, then the work zone ahead. */
function Road() {
  const r = site.safar.road;
  const day = (iso: string) => Date.parse(`${iso}T12:00:00Z`) / 86400000;
  const start = day(r.start);
  const now = Math.floor(Date.now() / 86400000);
  const at = (iso: string) => ((day(iso) - start) / (now - start)) * PAST;
  const nextStep = (100 - PAST) / r.next.length;
  const stops = [
    ...r.past.map((p) => {
      const [, m, d] = p.date.split("-").map(Number);
      return { x: at(p.date), m: MONTHS[m - 1], d: String(d), e: p.e, kind: "key" in p && p.key ? "key" : "past" };
    }),
    { x: PAST, m: "", d: "Today", e: r.today, kind: "now" },
    ...r.next.map((e, i) => ({ x: PAST + nextStep * (i + 0.85), m: "", d: "Next", e, kind: "next" })),
  ];
  // Cards alternate above and below the lane, so each one has until the next card on its side.
  const room = (i: number) => (stops[i + 2] ? stops[i + 2].x - stops[i].x : 100);
  const today = stops.findIndex((s) => s.kind === "now");
  return (
    <ol
      className="road"
      data-reveal
      aria-label="Safar timeline, from first commit to what is next"
      style={{ ["--past" as string]: `${PAST}%`, ["--today" as string]: `${((today + 0.5) / stops.length) * 100}%` }}
    >
      <li className="road__lane" aria-hidden="true" />
      {stops.map((s, i) => (
        <li
          key={`${s.d}-${s.e}`}
          className={`stop stop--${s.kind} ${i % 2 === 0 ? "stop--up" : "stop--down"}${s.x > 84 ? " stop--end" : ""}`}
          style={{ left: `${s.x}%`, ["--i" as string]: i, ["--room" as string]: room(i) }}
        >
          <span className="stop__card">
            <span className={`sign marker ${s.kind === "now" ? "t-warn" : s.kind === "next" ? "t-work" : "t-guide"}`}>
              {s.m ? <span className="marker__m">{s.m}</span> : null}
              <span className={s.m ? "marker__d" : "marker__word"}>{s.d}</span>
            </span>
            <span className="stop__e">{s.e}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Problems() {
  const p = site.problems;
  return (
    <section id="problems" className="section section--paper">
      <div className="wrap">
        <h2 className="sign t-warn plate">{p.kicker}</h2>
        <div className="incidents">
          {p.items.map((it) => (
            <article key={it.tag} className="incident">
              <h3 className="incident__title">{it.title}</h3>
              <div className="incident__body">
                <Slot w={it.story} />
                {"shot" in it && it.shot ? (
                  <figure className={`incident__shot incident__shot--${it.shot.kind}`}>
                    <Photo
                      src={it.shot.src}
                      alt={it.shot.alt}
                      label="screenshot"
                      className="crop"
                      width={it.shot.w}
                      height={it.shot.h}
                      sizes={it.shot.kind === "phone" ? "340px" : "(max-width: 1080px) 100vw, 50vw"}
                    />
                    <figcaption>{it.shot.caption}</figcaption>
                  </figure>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Killed() {
  const k = site.killed;
  return (
    <section id="deleted" className="section section--night">
      <div className="wrap">
        <h2 className="sign t-reg plate">{k.kicker}</h2>
        <div className="closed">
          <ul className="closed__list" data-reveal>
            {k.items.map((it) => (
              <li key={it.what} className="closed__item">
                <s className="closed__what">
                  {it.what}
                  <span className="closed__bar" aria-hidden="true">
                    <span>{it.what}</span>
                  </span>
                </s>
                {"meta" in it && it.meta ? <span className="closed__meta">{it.meta}</span> : null}
              </li>
            ))}
          </ul>
          <Slot w={k.lesson} dark className="closed__lesson" />
        </div>
      </div>
    </section>
  );
}

function Next() {
  const n = site.next;
  return (
    <section id="next" className="section">
      <div className="wrap">
        <h2 className="sign t-work plate">{n.kicker}</h2>
        <div className="next">
          <div className="next__main">
            <h3 className="next__title">{n.title}</h3>
            <p className="lede">{n.goal}</p>
            <p className="next__status">
              <span className="next__dot" aria-hidden="true" />
              {n.status}
            </p>
          </div>
          <div className="sign t-work works">
            <p className="works__title">{n.addsTitle}</p>
            <dl className="works__list">
              {n.adds.map((a) => (
                <div key={a.name} className="works__row">
                  <dt>{a.name}</dt>
                  <dd>{a.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Each organization's name and role, on its own blue service sign. */
function OrgSign({ name, role }: { name: string; role: string }) {
  return (
    <div className="sign t-service org__sign">
      <h3 className="org__name">{name}</h3>
      <p className="org__role">{role}</p>
    </div>
  );
}

function Beyond() {
  const b = site.beyond;
  return (
    <section id="beyond" className="section section--paper">
      <div className="wrap">
        <h2 className="sign t-service plate">{b.kicker}</h2>
        <article id="scc" className="org">
          <Photo
            src={site.photos.sccCamp}
            alt="With the Steel City Codes team at summer camp"
            label="teaching at SCC summer camp"
            className="org__photo org__photo--left"
            width={1600}
            height={900}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="org__body">
            <OrgSign name={b.scc.name} role={b.scc.roles} />
            <ul className="org__facts">
              {b.scc.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Slot w={b.scc.story} />
          </div>
        </article>
        {b.scc.shot ? (
          <div className="showcase org__showcase">
            <figure className="showcase__desk showcase__desk--scc">
              <Photo
                src={b.scc.shot.src}
                alt={b.scc.shot.alt}
                label="Steel City Codes dashboard"
                className="shot"
                width={b.scc.shot.w}
                height={b.scc.shot.h}
                sizes="(max-width: 760px) 170vw, 66vw"
              />
              <figcaption>{b.scc.shot.caption}</figcaption>
            </figure>
            {site.links.sccDemo ? (
              <div className="org__demo">
                <Out href={site.links.sccDemo} className="sign t-guide go">
                  Try the Steel City Codes demo
                </Out>
                <p className="org__demo-note">{b.scc.demoNote}</p>
              </div>
            ) : null}
          </div>
        ) : null}
        <article id="fbla" className="org org--flip">
          <Photo
            src={site.photos.fblaState}
            alt="On stage for Website Design at the 2025 FBLA State Leadership Conference"
            label="FBLA state awards"
            className="org__photo"
            width={1600}
            height={1042}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="org__body">
            <OrgSign name={b.fbla.name} role={b.fbla.roles} />
            <p className="words">{b.fbla.body}</p>
          </div>
        </article>
        <article id="deca" className="org org--tall">
          <Photo
            src={site.photos.decaState}
            alt="Holding the DECA Colorado State Career Development Conference award"
            label="DECA state award"
            className="org__photo"
            width={665}
            height={752}
            sizes="(max-width: 760px) 420px, 33vw"
          />
          <div className="org__body">
            <OrgSign name={b.deca.name} role={b.deca.roles} />
            <p className="words">{b.deca.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="section">
      <div className="wrap why">
        <h2 className="sign t-reg plate why__plate">{site.why.kicker}</h2>
        <Slot w={site.why.quote} big className="why__quote" />
        {site.why.photo ? (
          <figure className="why__photo">
            <Photo
              src={site.why.photo.src}
              alt={site.why.photo.alt}
              label="you and your dad"
              className="why__img"
              width={site.why.photo.w}
              height={site.why.photo.h}
              sizes="(max-width: 760px) 420px, 33vw"
            />
            <figcaption>{site.why.photo.caption}</figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

function OffHours() {
  const all = site.offHours.items;
  if (all.length === 0) return null;
  const pictured = all.filter((it) => it.photo);
  const listed = all.filter((it) => !it.photo);
  // Balanced rows of three or four: 6 photos -> 3 + 3, 7 -> 4 + 3, 8 -> 4 + 4.
  const rowCount = Math.ceil(pictured.length / 4);
  const rows: (typeof pictured)[] = [];
  for (let r = 0, i = 0; r < rowCount; r++) {
    const size = Math.floor(pictured.length / rowCount) + (r < pictured.length % rowCount ? 1 : 0);
    rows.push(pictured.slice(i, i + size));
    i += size;
  }
  return (
    <section id="offhours" className="section section--tight">
      <div className="wrap">
        <h2 className="sign t-rec plate">{site.offHours.kicker}</h2>
        <div className="off">
          <div className="dump">
            {rows.map((row, r) => (
              <div key={r} className="dump__row">
                {row.map((it) => (
                  // Each photo grows by its aspect ratio, so a row of mixed shapes shares one height.
                  <figure
                    key={it.caption}
                    className={`snap${pictured.length % 2 === 1 && it === pictured[pictured.length - 1] ? " snap--span" : ""}`}
                    style={{ flexGrow: it.w / it.h }}
                  >
                    <Photo
                      src={it.photo}
                      alt={it.caption}
                      label={it.caption.toLowerCase()}
                      className="snap__img"
                      width={it.w}
                      height={it.h}
                      sizes="(max-width: 760px) 50vw, 33vw"
                    >
                      {/* The alt already says it, so the sign is for sighted readers only. */}
                      <span className="sign t-rec place" aria-hidden="true">
                        {it.caption}
                      </span>
                    </Photo>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          {listed.length > 0 ? (
            <ul className="sign t-rec dest off__sign">
              {listed.map((it) => (
                <li key={it.caption}>
                  <span className="dest__name">{it.caption}</span>
                  {it.detail ? <span className="dest__what">{it.detail}</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const l = site.links;
  const rows: { label: string; href: string | null; note: string }[] = [
    { label: "One-minute intro", href: intro, note: "YouTube" },
    { label: "Safar demo", href: l.demo, note: l.demo ? host(l.demo) : "" },
    { label: "Steel City Codes demo", href: l.sccDemo, note: l.sccDemo ? host(l.sccDemo) : "" },
    { label: "GitHub", href: l.github, note: l.github ? host(l.github) : "" },
    { label: "Résumé", href: l.resume, note: "PDF" },
    { label: "LinkedIn", href: l.linkedin, note: l.linkedin ? host(l.linkedin) : "" },
    { label: "X", href: l.x, note: l.x ? host(l.x) : "" },
  ];
  return (
    <footer id="contact" className="contact">
      <div className="wrap">
        <div className="sign t-guide contact__sign">
          <h2 className="sr-only">Contact</h2>
          <a href={`mailto:${site.email}`} className="contact__email">
            {site.email}
          </a>
          <ul className="dest dest--links">
            {rows
              .filter((r) => r.href)
              .map((r) => (
                <li key={r.label}>
                  <Out href={r.href!}>
                    <span className="dest__name">{r.label}</span>
                    <span className="dest__what">{r.note}</span>
                  </Out>
                </li>
              ))}
          </ul>
        </div>
        <p className="contact__foot">
          {site.name.first} {site.name.last}, {site.place}
        </p>
      </div>
    </footer>
  );
}

function InProgress() {
  return (
    <main className="wip">
      <div className="sign t-guide wip__sign">
        <h1 className="wip__name">
          {site.name.first} {site.name.last}
        </h1>
        <p className="wip__text">This site is still in progress. Check back soon.</p>
      </div>
      <a className="wip__mail" href={`mailto:${site.email}`}>
        {site.email}
      </a>
    </main>
  );
}

export default function Home() {
  if (isHidden()) return <InProgress />;
  return (
    <>
      <a href="#safar" className="skip">
        Skip to Safar
      </a>
      <Nav />
      <main>
        <Hero />
        <Safar />
        <Problems />
        <Killed />
        <Next />
        <Beyond />
        <Why />
        <OffHours />
      </main>
      <Contact />
    </>
  );
}
