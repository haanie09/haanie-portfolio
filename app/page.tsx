import { site } from "@/content/site";
import { Kicker, Photo, Play, Slot } from "@/components/ui";

const introHref = site.links.intro ?? "#contact";

function Nav() {
  const links = [
    ["#vectis", "VectisOS"],
    ["#problems", "Hard problems"],
    ["#next", "Next"],
    ["#beyond", "Beyond Vectis"],
    ["#offhours", "Off the clock"],
  ];
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__name disp">
          {site.name.first} {site.name.last}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="mono">
              {label}
            </a>
          ))}
          <a href={introHref} className="mono pill pill--ink" target={site.links.intro ? "_blank" : undefined} rel="noreferrer">
            <Play /> Watch my intro
          </a>
        </nav>
        <details className="nav__menu">
          <summary aria-label="Open menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </summary>
          <div className="nav__sheet">
            {links.map(([href, label]) => (
              <a key={href} href={href} className="mono">
                {label}
              </a>
            ))}
            <a href={introHref} className="mono pill pill--ink">
              <Play /> Watch my intro
            </a>
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
          <span className="mono muted">
            {site.place} · {site.school} · Class of {site.classOf}
          </span>
          <h1 className="hero__name disp">
            {site.name.first}
            <br />
            <em>{site.name.last}</em>
          </h1>
          <ol className="roles">
            {site.roles.map((r, i) => (
              <li key={r.org}>
                <span className="mono roles__n">0{i + 1}</span>
                <span>
                  {r.title}, <b>{r.org}</b>
                  {r.note ? ` · ${r.note}` : ""}
                </span>
              </li>
            ))}
          </ol>
          <Slot w={site.oneLiner} className="hero__oneliner" />
        </div>
        <div className="hero__art">
          <div className="hero__arch-back" aria-hidden="true" />
          <Photo src={site.photos.portrait} alt={`${site.name.first} ${site.name.last}`} label="portrait of you" className="hero__arch" />
          <div className="sticker">
            <span className="mono sticker__top">Live since</span>
            <span className="disp sticker__big">Jul 1</span>
            <span className="mono sticker__bottom">VectisOS · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const row = (
    <>
      {site.ticker.map((t) => (
        <span key={t} className="ticker__item">
          <span className="mono">{t}</span>
          <span className="mono ticker__star" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </>
  );
  return (
    <div className="ticker" role="region" aria-label="Right now">
      <span className="mono ticker__now">
        <span className="dot" /> Now
      </span>
      <div className="ticker__track">
        <div className="ticker__run">{row}</div>
        <div className="ticker__run" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats__head">
          <span className="mono">VectisOS, by the numbers</span>
          <span className="mono">{site.stats.asOf}</span>
        </div>
        <div className="stats__grid">
          {site.stats.items.map((s) => (
            <div key={s.label} className="stat">
              <span className={`disp stat__n ${s.italic ? "it" : ""}`}>{s.n}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vectis() {
  const v = site.vectis;
  return (
    <section id="vectis" className="section">
      <div className="wrap">
        <div className="split split--end">
          <div className="split__main stack">
            <Kicker>{v.kicker}</Kicker>
            <h2 className="h-mega disp">
              Vectis<em className="blue">OS</em>
            </h2>
            <p className="lede">{v.summary}</p>
          </div>
          <div className="split__side">
            <Slot w={v.origin} />
          </div>
        </div>

        <div className="showcase">
          <div className="browser">
            <div className="browser__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <Photo src={site.photos.vectisDesktop} alt="VectisOS dashboard with demo data" label="VectisOS dashboard (demo data)" className="browser__screen" />
          </div>
          <div className="showcase__side">
            <div className="phonecard">
              <Photo src={site.photos.vectisPhone} alt="VectisOS mobile app" label="phone" className="phonecard__phone" />
              <div className="stack-s">
                <span className="mono sun">Mobile PWA</span>
                <span>{v.phoneNote}</span>
              </div>
            </div>
            <div className="stack-s">
              <span className="mono muted">Stack</span>
              <ul className="chips">
                {v.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <Slot w={v.role} />
          </div>
        </div>

        <div className="log">
          <span className="mono muted">Build log</span>
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
  const numerals = ["i.", "ii.", "iii."];
  return (
    <section id="problems" className="section section--sand">
      <div className="wrap">
        <div className="head-row">
          <div className="stack">
            <Kicker>{p.kicker}</Kicker>
            <h2 className="h-big disp">
              Hard <em>problems</em>
            </h2>
          </div>
          <span className="pr head-row__note">{p.note}</span>
        </div>
        <div className="cards3">
          {p.items.map((it, i) => (
            <article key={it.tag} className={`card ${it.dark ? "card--ink" : ""}`}>
              <div className="card__top">
                <span className="disp numeral">{numerals[i]}</span>
                <span className="mono muted">{it.tag}</span>
              </div>
              <h3 className="h-card disp">{it.title}</h3>
              <ul className="facts">
                {it.facts.map(([f, pr]) => (
                  <li key={pr}>
                    {f} <span className="pr">{pr}</span>
                  </li>
                ))}
              </ul>
              <Slot w={it.story} dark={it.dark} className="push" />
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
          <Kicker tone="sun">{k.kicker}</Kicker>
          <ul className="graveyard">
            {k.items.map((it) => (
              <li key={it.what}>
                <span className="disp graveyard__what">
                  <s>{it.what}</s>
                  {it.replaced ? <em className="sun"> → {it.replaced}</em> : null}
                </span>
                <span className="mono graveyard__meta">{it.meta}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="split__side stack-l killed__side">
          <h2 className="h-quote disp">{k.heading}</h2>
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
            <Kicker>{n.kicker}</Kicker>
            <h2 className="h-big disp">
              VectisOS <em>Desktop</em>
            </h2>
            <p className="lede">{n.goal}</p>
          </div>
          <div className="split__side">
            <span className="status mono">
              <span className="dot dot--sun" /> {n.status}
            </span>
          </div>
        </div>
        <div className="next__grid">
          <div className="next__window" aria-hidden="true">
            <div className="next__bar">
              <span />
              <span />
              <span />
              <span className="mono">VectisOS</span>
            </div>
            <div className="next__body">
              <div className="next__side">
                {["Invoices", "Customers", "Routes", "Inventory", "Payments"].map((x, i) => (
                  <span key={x} className={`mono ${i === 0 ? "on" : ""}`}>
                    {x}
                  </span>
                ))}
              </div>
              <div className="next__main">
                <span className="disp next__speed">
                  <em>instant</em>
                </span>
                <span className="mono">saved on this device → synced</span>
              </div>
            </div>
          </div>
          <div className="stack-l">
            <div className="stack-s">
              <span className="mono muted">Where it feels slow today</span>
              <ol className="targets">
                {n.targets.map((t, i) => (
                  <li key={t}>
                    <span className="mono targets__n">0{i + 1}</span>
                    <span className="disp">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="stack-s">
              <span className="mono muted">The plan: local-first</span>
              <ul className="facts">
                {n.plan.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <Slot w={n.why} />
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
          <Kicker tone="sun">{b.kicker}</Kicker>
          <h2 className="h-big disp">
            Teaching, organizing, <em>competing</em>
          </h2>
        </div>
        <div className="beyond">
          <article className="card card--paper beyond__scc">
            <Photo src={site.photos.sccCamp} alt="Teaching at Steel City Codes summer camp" label="teaching at SCC summer camp" className="beyond__photo" />
            <div className="card__title-row">
              <h3 className="h-card-l disp">{b.scc.name}</h3>
              <span className="mono muted">{b.scc.tag}</span>
            </div>
            <span className="mono blue">{b.scc.roles}</span>
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
              <span className="mono muted">{b.fbla.tag}</span>
            </div>
            <span className="mono blue">{b.fbla.roles}</span>
            <p className="body">{b.fbla.body}</p>
            <Slot w={b.fbla.story} className="push" />
          </article>
          <article className="card card--accent">
            <div className="card__title-row">
              <h3 className="h-card disp">{b.deca.name}</h3>
              <span className="disp numeral numeral--ink">{b.deca.place}</span>
            </div>
            <span className="mono">{b.deca.roles}</span>
            <p className="body">{b.deca.body}</p>
            <Slot w={b.deca.story} className="push slot--on-accent" />
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
          <Kicker>{site.why.kicker}</Kicker>
          <svg className="why__mark" width="72" height="56" viewBox="0 0 72 56" aria-hidden="true">
            <path d="M0 56V32C0 14 10 3 28 0l3 7C19 11 14 18 14 28h14v28zm40 0V32C40 14 50 3 68 0l3 7C59 11 54 18 54 28h14v28z" fill="var(--accent)" />
          </svg>
        </div>
        <div className="stack">
          <Slot w={site.why.quote} big />
          <span className="mono muted">— {site.name.first}</span>
        </div>
      </div>
    </section>
  );
}

function OffHours() {
  const o = site.offHours;
  const [head, ...rest] = o.heading.split(",");
  const tail = rest.join(",");
  return (
    <section id="offhours" className="section section--tight">
      <div className="wrap">
        <div className="stack">
          <Kicker>{o.kicker}</Kicker>
          <h2 className="h-big disp">
            {head}
            {tail ? (
              <>
                ,<em>{tail}</em>
              </>
            ) : null}
          </h2>
        </div>
        <div className="polaroids">
          {o.items.map((it, i) => (
            <figure key={it.caption} className={`polaroid tone-${it.tone}`} style={{ ["--tilt" as string]: `${[-2, 1.5, -1, 2][i]}deg` }}>
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
        <Kicker tone="ink">08 — Get in touch</Kicker>
        <a href={`mailto:${site.email}`} className="contact__email disp">
          {site.email}
        </a>
        <div className="contact__links">
          <a href={introHref} className="mono pill pill--ink" target={l.intro ? "_blank" : undefined} rel="noreferrer">
            <Play /> One-minute intro
          </a>
          {others
            .filter(([, href]) => href)
            .map(([label, href]) => (
              <a key={label} href={href!} className="mono pill" target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
        </div>
        <div className="contact__foot">
          <span className="mono">Aurora, CO · 2026</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <a href="#vectis" className="skip mono">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <Vectis />
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
