"use client";

import { useState, type KeyboardEvent } from "react";
import type React from "react";
import { growth, videos } from "@/lib/content";
import { VideoSlot } from "./Sections";
import Comment from "./Comment";

export default function Growth() {
  const [i, setI] = useState(0);
  const ep = growth.episodes[i];
  const n = growth.episodes.length;

  // Arrow keys move between episode tabs, as a tablist should.
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = (i + d + n) % n;
    setI(next);
    document.getElementById(`ep-${next}`)?.focus();
  };

  return (
    <section className="page growth" id="growth" aria-label="The marketing department">
      <Comment id="growth" />
      <span className="kick">THE MARKETING DEPARTMENT: HOW I&apos;D GROW WISPR FLOW IN INDIA</span>
      <h2>{growth.campaign}.</h2>
      <div className="lede">
        <p>{growth.insight}</p>
        <p>{growth.already} Instead: a short split-screen series. Normal voice typing on one side, Flow on the other, one everyday pain per episode.</p>
      </div>

      <div className="eps" role="tablist" aria-label="Episodes" onKeyDown={onKey}>
        {growth.episodes.map((e, k) => (
          <button key={e.key} id={`ep-${k}`} role="tab" aria-selected={k === i} aria-controls="ep-panel" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}>
            <b>EP {k + 1}</b> {e.title}
          </button>
        ))}
      </div>

      <div className="episode" id="ep-panel" role="tabpanel" aria-labelledby={`ep-${i}`}>
        {/* Keyed so each episode remounts and plays the CSS swap-in (none under reduced motion). */}
        <div key={ep.key} className="epswap">
          <div className="screens">
            <div className="screen normal"><div className="bar2"><span>NORMAL VOICE TYPING</span><span>HEARS YOU</span></div><p>{ep.normal}</p></div>
            <div className="screen flow"><div className="bar2"><span>FLOW</span><span>KNOWS YOU</span></div><p>{ep.flow}</p></div>
          </div>
          <div className="fix">{ep.fix}</div>
        </div>
        <VideoSlot label={`Episode ${i + 1}: ${ep.title}`} scene={ep.fix} src={videos[ep.key]} />
      </div>

      <div className="endline"><p>{growth.endLine}</p></div>

      <figure className="plan funnel reveal" id="funnel" tabIndex={0} aria-label="Diagram: the campaign funnel">
        <h4>The Funnel</h4>
        <p className="cap">Where each number sits. No targets here, only what gets measured.</p>
        <svg className="diagram wide" viewBox="0 0 760 250" role="img" aria-label="Funnel: Watch an episode, then Install Flow from that episode's tracked link, then add a first dictionary word or snippet in week one. Installs per episode measures the first step; the share of new users who add a word or snippet in week one measures the second.">
          <polygon className="box" points="20,20 250,38 250,172 20,190" />
          <text className="lbl" x="38" y="96">Watch an episode</text>
          <text className="sm" x="38" y="118">split screen, one everyday pain</text>
          <polygon className="box" points="262,40 492,56 492,154 262,170" />
          <text className="lbl" x="280" y="98">Install Flow</text>
          <text className="sm" x="280" y="120">from that episode&apos;s link</text>
          <polygon className="box" points="504,58 740,72 740,138 504,152" />
          <text className="lbl" x="520" y="98">Say it once</text>
          <text className="sm" x="520" y="120">first word or snippet</text>
          <path className="redline draw" style={{ "--len": 120 } as React.CSSProperties} d="M256 176 C 256 196, 250 204, 236 214" />
          <text className="redtxt pop" x="70" y="232">Installs per episode</text>
          <path className="redline draw" style={{ "--len": 120 } as React.CSSProperties} d="M622 156 C 622 186, 618 200, 606 212" />
          <text className="redtxt pop" x="420" y="232">a word or snippet in week one</text>
        </svg>
      </figure>

      <div className="schedule" id="schedule">
        <h3>The shooting schedule</h3>
        <ol>
          {growth.schedule.map((s) => (
            <li key={s.week}><span>{s.week}</span><b>{s.title}</b><p>{s.text}</p></li>
          ))}
        </ol>
      </div>

      <div className="three">
        {growth.why.map(([h, t]) => <div key={h}><h4>{h}</h4><p>{t}</p></div>)}
      </div>

      <div className="split">
        <div>
          <h3>Why me, why here</h3>
          <div className="letters">
            <div className="letter"><b>Why growth</b>{growth.whyGrowth}</div>
            <div className="letter"><b>Why Wispr Flow</b>{growth.whyFlow}</div>
          </div>
        </div>
        <div>
          <h3>Growth work I&apos;ve already shipped</h3>
          <dl className="built">{growth.built.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <p className="proof">{growth.proof} <a href="#bloopers">See the bloopers.</a></p>
        </div>
      </div>
      <span className="folio l">12</span><span className="folio r">MARKETING</span>
    </section>
  );
}
