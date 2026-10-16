import { isHidden, site } from "@/content/site";
import { Photo, Play, Slot } from "@/components/ui";

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
  { href: "#next", label: "What's next", tone: "work" },
  { href: "#beyond", label: "Beyond Safar", tone: "service" },
  { href: "#offhours", label: "Off the clock", tone: "rec" },
];

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Nav() {
  const links = sections.filter((s) => s.href !== "#offhours" || site.offHours.items.some((it) => it.photo));
  const items = (
    <>
      {links.map((s) => (
        <a key={s.href} href={s.href}>
          <span className={`chip t-${s.tone}`} aria-hidden="true" />
          {s.label}
        </a>
      ))}
      {intro ? (
        <a href={intro} target="_blank" rel="noreferrer">
          <Play /> Watch my intro
        </a>
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
          <summary aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </summary>
          <nav className="nav__sheet" aria-label="Sections">
            {items}
          </nav>
        </details>
      </div>
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
          <ul className="dest">
            {site.roles.map((r) => (
              <li key={r.org}>
                <span className="dest__name">{r.org}</span>
                <span className="dest__what">
                  {r.title}
                  {r.note ? `, ${r.note}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          src={site.photos.portrait}
          alt={`${site.name.first} ${site.name.last}`}
          label="portrait of you"
          className="hero__photo"
          width={820}
          height={1027}
          eager
        />
        <div className="hero__foot">
          <Slot w={site.oneLiner} className="hero__line" />
          {demo ? (
            <a href={demo} className="sign t-guide go" target="_blank" rel="noreferrer">
              Try the live demo
            </a>
          ) : null}
        </div>
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
        <div className="safar__top">
          <h2 className="sign t-guide plate plate--xl">Safar</h2>
          <p className="lede safar__summary">{v.summary}</p>
        </div>

        <div className="safar__proof">
          <div className="sign t-guide miles">
            <p className="miles__title">{s.title}</p>
            <dl className="miles__list">
              {s.items.map((it) => (
                <div key={it.label} className="miles__row">
                  <dt>{it.label}</dt>
                  <dd>{it.n}</dd>
                </div>
              ))}
            </dl>
            <p className="miles__src">{s.source}</p>
          </div>
          <Slot w={v.origin} className="safar__origin" />
        </div>

        <div className="showcase">
          <figure className="showcase__desk">
            <Photo
              src={site.photos.safarDesktop}
              alt="Safar's owner dashboard in the live demo"
              label="Safar dashboard (demo data)"
              className="shot"
              width={2880}
              height={1800}
            />
            <figcaption>
              From the live demo, which runs on made-up data.
              {demo ? (
                <>
                  {" "}
                  <a href={demo} target="_blank" rel="noreferrer">
                    {host(demo)}
                  </a>
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
            />
            <figcaption>{v.phoneNote}</figcaption>
          </figure>
        </div>

        <div className="built">
          <h3 className="built__label">{v.roleLabel}</h3>
          <Slot w={v.role} className="built__text" />
        </div>

        <ol className="route" aria-label="Safar timeline">
          {v.log.map((l) => {
            const md = l.d.match(/^([A-Za-z]{3}) (\d{1,2})$/);
            return (
              <li key={l.d} className={`route__stop${"key" in l && l.key ? " is-key" : ""}${"now" in l && l.now ? " is-now" : ""}`}>
                <span className="sign t-guide marker">
                  {md ? (
                    <>
                      <span className="marker__m">{md[1]}</span>
                      <span className="marker__d">{md[2]}</span>
                    </>
                  ) : (
                    <span className="marker__word">{l.d}</span>
                  )}
                </span>
                <span className="route__event">{l.e}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
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
                    <Photo src={it.shot.src} alt={it.shot.alt} label="screenshot" className="crop" width={it.shot.w} height={it.shot.h} />
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
    <section className="section section--night">
      <div className="wrap">
        <h2 className="sign t-reg plate">{k.kicker}</h2>
        <div className="closed">
          <ul className="closed__list">
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
          </div>
          <div className="next__left">
            <h4 className="next__label">{n.leftLabel}</h4>
            <ol className="steps">
              {n.left.map((x, i) => (
                <li key={x}>
                  <span className="steps__n" aria-hidden="true">
                    <span>{i + 1}</span>
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Beyond() {
  const b = site.beyond;
  return (
    <section id="beyond" className="section section--paper">
      <div className="wrap">
        <h2 className="sign t-service plate">{b.kicker}</h2>
        <article className="org">
          <Photo
            src={site.photos.sccCamp}
            alt="With the Steel City Codes team at summer camp"
            label="teaching at SCC summer camp"
            className="org__photo org__photo--left"
            width={1600}
            height={900}
          />
          <div className="org__body">
            <h3 className="org__name">{b.scc.name}</h3>
            <p className="org__role">{b.scc.roles}</p>
            <ul className="org__facts">
              {b.scc.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Slot w={b.scc.story} />
          </div>
        </article>
        <article className="org org--flip">
          <Photo
            src={site.photos.fblaState}
            alt="On stage for Website Design at the 2025 FBLA State Leadership Conference"
            label="FBLA state awards"
            className="org__photo"
            width={1600}
            height={1042}
          />
          <div className="org__body">
            <h3 className="org__name">{b.fbla.name}</h3>
            <p className="org__role">{b.fbla.roles}</p>
            <p className="words">{b.fbla.body}</p>
          </div>
        </article>
        <article className="org org--text">
          <div className="org__body">
            <h3 className="org__name">{b.deca.name}</h3>
            <p className="org__role">{b.deca.roles}</p>
            <p className="words">{b.deca.body}</p>
          </div>
          <p className="sign t-service placard" aria-hidden="true">
            {b.deca.place}
          </p>
        </article>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section">
      <div className="wrap why">
        <h2 className="sign t-reg plate why__plate">{site.why.kicker}</h2>
        <Slot w={site.why.quote} big className="why__quote" />
      </div>
    </section>
  );
}

function OffHours() {
  const items = site.offHours.items.filter((it) => it.photo);
  if (items.length === 0) return null;
  return (
    <section id="offhours" className="section section--tight">
      <div className="wrap">
        <h2 className="sign t-rec plate">{site.offHours.kicker}</h2>
        <div className="snaps">
          {items.map((it) => (
            <figure key={it.caption} className="snap">
              <Photo src={it.photo} alt={it.caption} label={it.caption.toLowerCase()} className="snap__img" width={768} height={1024} />
              <figcaption>{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const l = site.links;
  const rows: { label: string; href: string | null; note: string; download?: boolean }[] = [
    { label: "One-minute intro", href: intro, note: "YouTube" },
    { label: "Live demo", href: l.demo, note: l.demo ? host(l.demo) : "" },
    { label: "GitHub", href: l.github, note: l.github ? host(l.github) : "" },
    { label: "Résumé", href: l.resume, note: "PDF" },
    { label: "LinkedIn", href: l.linkedin, note: l.linkedin ? host(l.linkedin) : "" },
    { label: "X", href: l.x, note: l.x ? host(l.x) : "" },
  ];
  return (
    <footer id="contact" className="contact">
      <div className="wrap">
        <div className="sign t-guide contact__sign">
          <a href={`mailto:${site.email}`} className="contact__email">
            {site.email}
          </a>
          <ul className="dest dest--links">
            {rows
              .filter((r) => r.href)
              .map((r) => (
                <li key={r.label}>
                  <a href={r.href!} target="_blank" rel="noreferrer">
                    <span className="dest__name">{r.label}</span>
                    <span className="dest__what">{r.note}</span>
                  </a>
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
