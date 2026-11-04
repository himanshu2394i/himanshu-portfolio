import type { CSSProperties } from "react";
import Image from "next/image";
import {
  agent, bloopers, boxOffice, factFile, reviews, videos, cast, classifieds, coverLines, directorsNote, heist, origin, platform, programme, site, voice, writing,
} from "@/lib/content";
import Link from "next/link";
import { asset } from "@/lib/asset";
import Comment from "./Comment";
import CopyEmail from "./CopyEmail";
import RollAgain from "./RollAgain";
import VerifyToy from "./VerifyToy";
import HeistPlan from "./HeistPlan";

const len = (n: number) => ({ "--len": n }) as CSSProperties;
const Folio = ({ n, label }: { n: string; label: string }) => (
  <><span className="folio l">{n}</span><span className="folio r">{label}</span></>
);

// A real player once the recording exists (videos in content.ts); until then a clapperboard card.
export function VideoSlot({ label, src, scene }: { label: string; src?: string; scene: string }) {
  if (src) {
    return (
      <figure className="vslot">
        <video src={asset(src)} poster={asset("/media/still.webp")} playsInline controls preload="metadata" aria-label={label} />
        <figcaption><span>{label}</span><span>Spoken, not typed</span></figcaption>
      </figure>
    );
  }
  return (
    <figure className="vslot filming" aria-label={`${label}: recording in progress`}>
      <div className="clap" aria-hidden="true" />
      <div className="slate-body">
        <span className="nf">NOW FILMING</span>
        <b>{label}</b>
        <dl>
          <dt>Scene</dt><dd>{scene}</dd>
          <dt>Take</dt><dd>1</dd>
          <dt>Camera</dt><dd>A phone</dd>
        </dl>
      </div>
    </figure>
  );
}

// schema.org Person, so search engines connect the name to DTU, Growthvine and the profiles.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Engineer",
  worksFor: { "@type": "Organization", name: "Growthvine Capital" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Delhi Technological University" },
  knowsAbout: ["AI systems", "Data infrastructure", "Go", "Python", "AWS", "MCP", "Growth"],
  sameAs: [site.linkedin, site.github],
};

export function Cover() {
  return (
    <section className="page cover" id="top" aria-label="Cover">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <h1 className="mast">HIMANSHU</h1>
      <div className="strip"><span>ISSUE 01</span><span>THE CINEMA ISSUE</span><span>NOV 2026, ₹0</span></div>
      <div className="lines">
        <p className="role">{site.role}</p>
        {coverLines.map((c) => (
          <a key={c.href} className="cl" href={c.href}>
            <span className="kick">{c.kick}</span>
            <span className="big">{c.big[0]}<em>{c.big[1]}</em></span>
            <span className="small">{c.small}</span>
          </a>
        ))}
      </div>
      <Image className="photo" src={asset("/media/still.webp")} width={780} height={968} alt="Black and white portrait of Himanshu in glasses" priority />
      <div className="splat" aria-hidden="true"><span>FREE INSIDE<b>{bloopers.length}</b>bloopers, kept in</span></div>
      <div className="stamp">Spoken, not typed</div>
      <div className="barcode"><i />9 771234 567003</div>
    </section>
  );
}

export function FactFile() {
  return (
    <section className="page factfile" id="short" aria-label="The short version">
      <div className="ff-card">
        <div className="ff-head">
          <h2>The Short Version</h2>
          <span className="ff-stamp">FOR RECRUITERS</span>
        </div>
        <div className="ff-grid">
          <dl className="ff-facts">
            {factFile.facts.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <div className="ff-wins">
            <h3>Four things worth your time</h3>
            <ol>
              {factFile.wins.map((w) => (
                <li key={w.stat}><a href={w.href}><b>{w.stat}</b><span>{w.text}</span></a></li>
              ))}
            </ol>
            <p className="ff-also">{factFile.also}</p>
          </div>
        </div>
        <div className="ff-contact">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.linkedin}>LinkedIn</a>
          <a href={site.github}>GitHub</a>
          <Link href="/cv">CV</Link>
          <CopyEmail />
          <span>{site.email}</span>
        </div>
      </div>
      <Folio n="01" label="THE SHORT VERSION" />
    </section>
  );
}

export function PressQuotes() {
  return (
    <section className="press" id="reviews" aria-label="What the reviewers said">
      <ul>
        {reviews.map((r) => (
          <li key={r.quote} className={r.pr === 648 ? "pan" : undefined}>
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
            <a href={`https://github.com/llm4s/llm4s/pull/${r.pr}`} target="_blank" rel="noreferrer">
              {r.who}, {r.role}. PR #{r.pr}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Programme() {
  return (
    <section className="page programme" aria-label="Tonight's programme">
      <div className="left">
        <h2>Tonight&apos;s Programme</h2>
        <p className="sub">A Himanshu picture, in {programme.length - 1} reels. The whole issue takes about 15 minutes; the short version, under a minute.</p>
        <ol className="reels">
          {programme.map((r) => (
            <li key={r.reel}>
              <a className="rn" href={r.href}>{r.reel ? <>Reel <b>{r.reel}</b></> : <>Start <b>here</b></>}</a>
              <div><h3>{r.title}</h3><p>{r.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
      <div className="right">
        <Image src={asset("/media/halftone.webp")} width={780} height={968} alt="Halftone portrait of Himanshu" />
        <div className="note"><b>A word from the director</b>{directorsNote}</div>
      </div>
      <Folio n="02" label="PROGRAMME" />
    </section>
  );
}

export function Origin() {
  return (
    <section className="page origin" id="origin" aria-label="The origin">
      <Comment id="origin" />
      <div className="intro-text">
        <h2>The Origin</h2>
        <p className="sub">Reel 1. How a first-year who finished nothing ended up with real people&apos;s money in his code.</p>
      </div>
      <div className="filmstrip" tabIndex={0} role="region" aria-label="The origin, as a film strip">
        <ol className="frames">
          {origin.map((o, i) => (
            <li key={o.title} className="frame">
              <div className="yr"><span>{o.year}</span><span>{String(i + 1).padStart(2, "0")}A</span></div>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="swipehint" aria-hidden="true">Swipe sideways through the reel</p>
    </section>
  );
}

export function Feature() {
  return (
    <section className="page feature" id="feature" aria-label="Feature">
      <Comment id="feature" />
      <div className="hed" aria-hidden="true">
        <span className="w1">Every</span><span className="w2">piece was</span><span className="w3">correct.</span><span className="w4">It still broke.</span>
      </div>
      <h2 className="deck">{heist.deck}</h2>
      <div className="split">
        <div className="cols">
          <p>{heist.paras[0]}</p>
          <div className="pull">{heist.pull}</div>
          <p>{heist.paras[1]}</p>
          <p>{heist.paras[2]}</p>
        </div>
        <HeistPlan />
      </div>
      <Folio n="04" label="FEATURE" />
    </section>
  );
}

export function Platform() {
  const o = platform.owners;
  const cols = [22, 197, 372];
  return (
    <section className="page platform" id="platform" aria-label="On set: Growthvine">
      <Comment id="platform" />
      <div className="head">
        <h2>On Set: Growthvine</h2>
        <div className="meta">Location: Gurugram. Shoot began 20 May.<br />About fifteen repositories, five months.</div>
      </div>
      <div className="opening">
      <figure className="plan doors reveal" style={{ transform: "rotate(-.4deg)" }} tabIndex={0} aria-label="Diagram: one person, two doors">
        <h4>One Person, Two Doors</h4>
        <p className="cap">Whichever door you walk in, it&apos;s the same you.</p>
        <svg className="diagram" viewBox="0 0 560 390" role="img" aria-label="Diagram: the mobile app and app.growthvine.in share one login, which leads to one person: risk profile, financial plan, MF Central statement, investments, alerts and reports.">
          <rect className="box" x="20" y="20" width="240" height="56" /><text className="lbl" x="36" y="44">{platform.doors[0]}</text><text className="sm" x="36" y="62">new screens, same app</text>
          <rect className="box" x="300" y="20" width="240" height="56" /><text className="lbl" x="316" y="44">{platform.doors[1]}</text><text className="sm" x="316" y="62">built from scratch</text>
          <rect className="box" x="120" y="110" width="320" height="50" /><text className="lbl" x="136" y="132">One login</text><text className="sm" x="136" y="150">same person, same data, both doors</text>
          <rect className="wire" x="10" y="184" width="540" height="156" />
          <text className="sm" x="20" y="200">ONE PERSON</text>
          {o.map((x, i) => {
            const cx = cols[i % 3], cy = i < 3 ? 210 : 276;
            return (
              <g key={x.name}>
                <rect className="box" x={cx} y={cy} width="165" height="52" />
                <text className="lbl" x={cx + 12} y={cy + 22}>{x.name}</text>
                <text className="sm" x={cx + 12} y={cy + 40}>{x.note}</text>
              </g>
            );
          })}
          <path className="wire draw" style={len(200)} d="M140 76 V110 M420 76 V110 M280 160 V184" />
          <text className="redtxt pop" x="20" y="372">one system of record per product. the other door calls it.</text>
        </svg>
      </figure>
        <div className="opening-text">
          <p className="lede">{platform.intro}</p>
          <p className="rule"><b>The rule that held it together</b>One system of record per product. Whichever door a person walks in, the other door calls the same place, so the app and the web can never disagree about their money.</p>
        </div>
      </div>

      <div className="split">
        <figure className="plan reveal" style={{ transform: "rotate(-.6deg)" }} tabIndex={0} aria-label="Diagram: the set blueprint">
          <h4>Set Blueprint</h4>
          <p className="cap">Under both doors: the data, from the ground up.</p>
          <svg className="diagram" viewBox="0 0 560 520" role="img" aria-label="Diagram of the Growthvine data stack from free data sources at the bottom to products at the top, with notes on what broke.">
            <rect className="box" x="20" y="20" width="340" height="56" /><text className="lbl" x="36" y="44">Products</text><text className="sm" x="36" y="62">stories, plans, reports, alerts, agent</text>
            <rect className="box" x="20" y="104" width="340" height="56" /><text className="lbl" x="36" y="128">MCP server</text><text className="sm" x="36" y="146">the AI asks for exactly what it needs</text>
            <rect className="box" x="20" y="188" width="340" height="56" /><text className="lbl" x="36" y="212">Data API in Go</text><text className="sm" x="36" y="230">auth, rate limits, token exchange</text>
            <rect className="box" x="20" y="272" width="340" height="56" /><text className="lbl" x="36" y="296">Fund data layer</text><text className="sm" x="36" y="314">event-based, an alert on every pipeline</text>
            <rect className="box" x="20" y="356" width="340" height="56" /><text className="lbl" x="36" y="380">Pipelines</text><text className="sm" x="36" y="398">benchmarks, index funds, history</text>
            <rect className="box" x="20" y="440" width="160" height="56" /><text className="lbl" x="36" y="464">Free data</text><text className="sm" x="36" y="482">AMFI, NSE PDFs</text>
            <rect className="box" x="200" y="440" width="160" height="56" /><text className="lbl" x="216" y="464">Vendor</text><text className="sm" x="216" y="482">Investwell</text>
            <path className="wire draw" style={len(500)} d="M190 440 V412 M190 356 V328 M190 272 V244 M190 188 V160 M190 104 V76" />
            <path className="redline draw" style={len(80)} d="M360 468 C 368 468, 372 462, 378 456" />
            <text className="redtxt pop" x="380" y="456">columns changed,</text><text className="redtxt pop" x="380" y="476">nobody told us</text>
            <path className="redline draw" style={len(120)} d="M360 300 C 390 300, 400 290, 410 280" />
            <text className="redtxt pop" x="380" y="268">face-value change</text><text className="redtxt pop" x="380" y="288">looked like a crash</text>
            <path className="redline draw" style={len(120)} d="M360 132 C 390 132, 400 122, 410 112" />
            <text className="redtxt pop" x="380" y="104">5 min to 30 sec</text>
          </svg>
        </figure>
        <div className="callsheet reveal">
          <h3>Call sheet</h3>
          <dl>{platform.callsheet.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="scribble">It will break. Hear the alert before anyone else does.</div>
        </div>
      </div>

      <div className="story">
        <div>
          <h3 className="sect">Every investor gets a story</h3>
          <p className="lede">They import their statement from MF Central once. It becomes a story about their own money, in chapters, with a character they recognise.</p>
          <ol className="contact" aria-label="Chapters of the portfolio story">
            {platform.storyChapters.map((c, i) => (
              <li key={c} className={c === "Your health score" ? "hl" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {c}
                {c === "Your health score" && <small>five parts, sixteen checks, one score</small>}
              </li>
            ))}
          </ol>
        </div>
        <div className="cert reveal">
          <h4>Passed by the story board</h4>
          <p className="cap">The rules every story is certified against.</p>
          <ol>{platform.storyRules.map((r) => <li key={r}>{r}</li>)}</ol>
          <p className="cap">Starring, depending on how you actually invest:</p>
          <ul className="cast">{platform.archetypes.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      </div>
      <p className="app-note"><b>Also on set: the app.</b>{platform.mobile}</p>
      <Folio n="06" label="ON SET" />
    </section>
  );
}

export function Agent() {
  return (
    <section className="page agent" id="agent" aria-label="The agent">
      <Comment id="agent" />
      <h2><span>Confessions of</span>an honest agent</h2>
      <p className="deck">{agent.intro}</p>
      <ol className="turn" aria-label="What happens on every turn">
        {agent.turn.map((t, i) => <li key={i}><span>Step {i + 1}</span>{t}</li>)}
      </ol>
      <div className="split">
        <div>
          <h3>The rap sheet</h3>
          <dl className="rap">{agent.facts.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
        <div>
          <h3>What it taught me</h3>
          <div className="qa">
            {agent.lessons.map((l) => <div key={l.q}><div className="q">{l.q}</div><div className="a">{l.n}</div></div>)}
          </div>
        </div>
      </div>
      <div className="correction reveal">
        <h4>CORRECTION</h4>
        <p>An earlier agent wrote <s>{agent.bug.said}</s> about a real {agent.bug.real}. {agent.bug.text}</p>
      </div>
      <VerifyToy />
      <Folio n="08" label="CONFESSIONS" />
    </section>
  );
}

const maxGross = Math.max(...boxOffice.map((b) => b.commits));

export function BoxOffice() {
  return (
    <section className="page boxoffice" id="boxoffice" aria-label="Box office">
      <Comment id="boxoffice" />
      <h2>Box Office</h2>
      <p className="sub">Time for an advisor&apos;s fund analysis.</p>
      <div className="chart" id="chart">
        <div className="bar before"><span className="name">Before</span><div className="track"><div className="fill">5 to 6 minutes</div></div></div>
        <div className="bar after"><span className="name">After the MCP</span><div className="track"><div className="fill">30 to 40 sec</div></div></div>
      </div>
      <h3 className="bo-h">All-time grosses</h3>
      <p className="sub">Gross: commits I authored, from git history. About five months of work. &ldquo;~&rdquo; means rounded.</p>
      <table className="grosses">
        <thead><tr><th>#</th><th>Title</th><th className="hide">Studio</th><th>Gross</th><th className="hide">The verdict</th></tr></thead>
        <tbody>
          {boxOffice.map((b, i) => (
            <tr key={b.title}>
              <td className="pos">{i + 1}</td>
              <td className="title">{b.title}<small>{b.what}</small></td>
              <td className="hide">{b.studio}</td>
              <td className="gross">
                <span className="gbar" style={{ width: `${(b.commits / maxGross) * 100}%` }} />
                <span className="gnum">{b.approx ? "~" : ""}{b.commits} commits</span>
              </td>
              <td className="take hide">{b.verdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Folio n="10" label="BOX OFFICE" />
    </section>
  );
}

export function Intertitle({ text }: { text: string }) {
  return <section className="inter" aria-label="Intertitle"><div className="card"><p>{text}</p></div></section>;
}

export function Bloopers() {
  return (
    <section className="page bloopers" id="bloopers" aria-label="Bloopers">
      <h2>Bloopers</h2>
      <p className="sub">What I said, and what voice typing heard before those words were in my dictionary. Kept in the final cut.</p>
      <div className="split">
        <div>
          <ul className="takes">
            {bloopers.map(([meant, heard]) => <li key={meant}><span className="heard">{heard}</span><span className="meant">I said: {meant}</span></li>)}
          </ul>
          <blockquote>&ldquo;{voice.quote}&rdquo;</blockquote>
          <p className="how">{voice.how}</p>
        </div>
        <VideoSlot label="The making of: built by voice" scene="Every page of this site, dictated" src={videos.making} />
      </div>
      <Folio n="16" label="BLOOPERS" />
    </section>
  );
}

export function Critics() {
  return (
    <section className="page critics" id="writing" aria-label="Writing">
      <h2>The Critics&apos; Corner</h2>
      <div className="clippings">
        {writing.map((w) => (
          <article key={w.title} className={`clipping${w.lead ? " lead" : ""}`}>
            <div className="kind">{w.kind === "Essay" ? "ESSAY" : "ON LINKEDIN"}</div>
            <h3>{w.title}</h3>
            <p>{w.text}</p>
            {"href" in w && w.href && <Link className="readon" href={w.href}>Read the essay</Link>}
            {w.kind === "LinkedIn" && <a className="readon" href={`${site.linkedin}recent-activity/all/`} target="_blank" rel="noreferrer">Read on LinkedIn</a>}
          </article>
        ))}
      </div>
      <Folio n="17" label="THE CRITICS" />
    </section>
  );
}

export function Classifieds() {
  return (
    <section className="page classifieds" id="classifieds" aria-label="Classifieds">
      <h2>Classifieds</h2>
      <div className="ads">
        {classifieds.map((c) => <div key={c.h} className={`ad ${c.tone}`.trim()}><h4>{c.h}</h4>{c.t}</div>)}
        <div className="ad red"><h4>Reply to this ad</h4><a href={`mailto:${site.email}`}>{site.email}</a></div>
      </div>
      <Folio n="18" label="CLASSIFIEDS" />
    </section>
  );
}

export function Credits() {
  return (
    <section className="credits-roll" aria-label="Credits">
      <h2>The Cast</h2>
      <div className="roll"><div className="inner">
        {cast.map((g) => (
          <div key={g.head}>
            <div className="h">{g.head}</div>
            <dl>{g.rows.map(([a, b]) => <div key={a} style={{ display: "contents" }}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          </div>
        ))}
        <div className="h">No pipelines were harmed. Several were rebuilt.</div>
      </div></div>
      <RollAgain />
    </section>
  );
}

export function Ticket() {
  return (
    <>
      <section className="ticketbox" aria-label="Contact">
        <div className="ticket">
          <div className="main">
            <div className="admit">Admit One</div>
            <p>To a conversation about building things where a wrong answer is expensive.</p>
            <div className="links">
              <a href={`mailto:${site.email}`}>Email</a><CopyEmail /><Link href="/cv">CV</Link><a href={site.linkedin}>LinkedIn</a><a href={site.github}>GitHub</a>
            </div>
          </div>
          <div className="stub">Row H<b>01</b>Seat M</div>
        </div>
      </section>
      <footer>Spoken, not typed. Built by voice with Wispr Flow.</footer>
    </>
  );
}
