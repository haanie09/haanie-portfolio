import { isHidden, site } from "@/content/site";
import { Photo, Play, Slot } from "@/components/ui";

const intro = site.links.intro;

function Nav() {
  const links = [
    ["#safar", "Safar"],
    ["#problems", "What broke"],
    ["#next", "What's next"],
    ["#beyond", "Beyond Safar"],
    ["#offhours", "Off the clock"],
  ].filter(([href]) => href !== "#offhours" || site.offHours.items.some((it) => it.photo));
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__name disp">
          {site.name.first} {site.name.last}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          {intro ? (
            <a href={intro} className="pill pill--ink" target="_blank" rel="noreferrer">
              <Play /> Watch my intro
            </a>
          ) : null}
        </nav>
        <details className="nav__menu">
          <summary aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </summary>
          <div className="nav__sheet">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            {intro ? (
              <a href={intro} className="pill pill--ink" target="_blank" rel="noreferrer">
                <Play /> Watch my intro
              </a>
            ) : null}
          </div>
        </details>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="hero__meta">
            Senior at {site.school} in {site.place}. Class of {site.classOf}.
          </p>
          <h1 className="hero__name disp">
            {site.name.first}
            <br />
            {site.name.last}
          </h1>
          <ol className="roles">
            {site.roles.map((r) => (
              <li key={r.org}>
                <span>
                  {r.title}, <b>{r.org}</b>
                  {r.note ? `, ${r.note}` : ""}
                </span>
              </li>
            ))}
          </ol>
          <Slot w={site.oneLiner} className="hero__oneliner" />
        </div>
        <div className="hero__art">
          <div className="hero__arch-back" aria-hidden="true" />
          <Photo src={site.photos.portrait} alt={`${site.name.first} ${site.name.last}`} label="portrait of you" className="hero__arch" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats__head">
          <span>{site.stats.asOf}</span>
        </div>
        <div className="stats__grid">
          {site.stats.items.map((s) => (
            <div key={s.label} className="stat">
              <span className={`disp stat__n ${"italic" in s && s.italic ? "it" : ""}`}>{s.n}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Safar() {
  const v = site.safar;
  return (
    <section id="safar" className="section">
      <div className="wrap">
        <div className="split split--end">
          <div className="split__main stack">
            <h2 className="h-mega disp blue">Safar</h2>
            <p className="lede">{v.summary}</p>
            {site.links.demo ? (
              <a href={site.links.demo} className="mono pill pill--ink demo-cta" target="_blank" rel="noreferrer">
                <span className="dot" /> Try the live demo
              </a>
            ) : null}
          </div>
          <div className="split__side">
            <Slot w={v.origin} />
          </div>
        </div>

        <div className="showcase">
          <div className="browser">
            <div className="browser__dots">
              <span />
              <span />
              <span />
              {site.links.demo ? (
                <a href={site.links.demo} className="browser__url" target="_blank" rel="noreferrer">
                  {site.links.demo.replace("https://", "")}
                </a>
              ) : null}
            </div>
            <Photo src={site.photos.safarDesktop} alt="Safar dashboard with demo data" label="Safar dashboard (demo data)" className="browser__screen" />
          </div>
          <div className="showcase__side">
            <div className="phonecard">
              <Photo src={site.photos.safarPhone} alt="Safar mobile app" label="phone" className="phonecard__phone" />
              <div className="stack-s">
                <span>{v.phoneNote}</span>
              </div>
            </div>
            <Slot w={v.role} />
          </div>
        </div>

        <div className="log">
          <ol className="log__row">
            {v.log.map((l) => (
              <li key={l.d} className={`log__item ${l.key ? "is-key" : ""} ${l.now ? "is-now" : ""}`}>
                <span className="log__dot" aria-hidden="true" />
                <span className="mono log__date">{l.d}</span>
                <span className="log__event">{l.e}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const p = site.problems;
  return (
    <section id="problems" className="section section--sand">
      <div className="wrap">
        <div className="head-row">
          <div className="stack">
            <h2 className="h-big disp">{p.kicker}</h2>
          </div>
        </div>
        <div className="cards3">
          {p.items.map((it) => (
            <article key={it.tag} className={`card ${it.dark ? "card--ink" : ""}`}>
              <h3 className="h-card disp">{it.title}</h3>
              <Slot w={it.story} dark={it.dark} />
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
    <section className="section section--ink">
      <div className="wrap split">
        <div className="split__main stack-l">
          <h2 className="h-big disp">{k.kicker}</h2>
          <ul className="graveyard">
            {k.items.map((it) => (
              <li key={it.what}>
                <span className="disp graveyard__what">
                  <s>{it.what}</s>
                  {"replaced" in it && it.replaced ? <em className="sun"> → {String(it.replaced)}</em> : null}
                </span>
                {it.meta ? <span className="mono graveyard__meta">{it.meta}</span> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="split__side stack-l killed__side">
          <Slot w={k.lesson} dark />
        </div>
      </div>
    </section>
  );
}

function Next() {
  const n = site.next;
  return (
    <section id="next" className="section section--next">
      <div className="wrap">
        <div className="split split--end">
          <div className="split__main stack">
            <h2 className="h-big disp">
              {n.title}
            </h2>
            <p className="lede">{n.goal}</p>
          </div>
          <div className="split__side stack">
            <div className="stack-s">
              <h3 className="h-card disp">{n.leftLabel}</h3>
              <ul className="facts">
                {n.left.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Beyond() {
  const b = site.beyond;
  return (
    <section id="beyond" className="section section--blue">
      <div className="wrap">
        <div className="stack">
          <h2 className="h-big disp">{b.kicker}</h2>
        </div>
        <div className="beyond">
          <article className="card card--paper beyond__scc">
            <Photo src={site.photos.sccCamp} alt="Teaching at Steel City Codes summer camp" label="teaching at SCC summer camp" className="beyond__photo" />
            <div className="card__title-row">
              <h3 className="h-card-l disp">{b.scc.name}</h3>
            </div>
            <p className="role-line">{b.scc.roles}</p>
            <ul className="facts facts--l">
              {b.scc.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Slot w={b.scc.story} className="push" />
          </article>
          <article className="card card--paper">
            <div className="card__title-row">
              <h3 className="h-card disp">{b.fbla.name}</h3>
            </div>
            <p className="role-line">{b.fbla.roles}</p>
            <p className="body">{b.fbla.body}</p>
          </article>
          <article className="card card--accent">
            <div className="card__title-row">
              <h3 className="h-card disp">{b.deca.name}</h3>
            </div>
            <p className="role-line">{b.deca.roles}</p>
            <p className="body">{b.deca.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section">
      <div className="wrap why">
        <div className="stack">
          <h2 className="h-card disp">{site.why.kicker}</h2>
        </div>
        <div className="stack">
          <Slot w={site.why.quote} big />
        </div>
      </div>
    </section>
  );
}

function OffHours() {
  const o = site.offHours;
  const items = o.items.filter((it) => it.photo);
  if (items.length === 0) return null;
  return (
    <section id="offhours" className="section section--tight">
      <div className="wrap">
        <div className="stack">
          <h2 className="h-big disp">{o.kicker}</h2>
        </div>
        <div className="polaroids">
          {items.map((it) => (
            <figure key={it.caption} className={`polaroid tone-${it.tone}`}>
              <Photo src={it.photo} alt={it.caption} label={it.caption.toLowerCase()} className="polaroid__img" />
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
  const others: [string, string | null][] = [
    ["GitHub", l.github],
    ["LinkedIn", l.linkedin],
    ["X", l.x],
    ["Résumé", l.resume],
  ];
  return (
    <footer id="contact" className="contact">
      <div className="wrap stack-l">
        <a href={`mailto:${site.email}`} className="contact__email disp">
          {site.email}
        </a>
        <div className="contact__links">
          {intro ? (
            <a href={intro} className="pill pill--ink" target="_blank" rel="noreferrer">
              <Play /> One-minute intro
            </a>
          ) : null}
          {others
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <a key={label} href={href!} className="pill" target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}

function InProgress() {
  return (
    <main className="wip">
      <div className="wip__sky" aria-hidden="true" />
      <h1 className="disp wip__name">
        {site.name.first} <em>{site.name.last}</em>
      </h1>
      <p className="lede">This site is still in progress. Check back soon.</p>
      <a className="pill" href={`mailto:${site.email}`}>
        {site.email}
      </a>
    </main>
  );
}

export default function Home() {
  if (isHidden()) return <InProgress />;
  return (
    <>
      <a href="#safar" className="skip mono">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Stats />
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
