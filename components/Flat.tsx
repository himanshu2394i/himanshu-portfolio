"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { myths, props } from "@/lib/content";
import Comment from "./Comment";

// Attendance is redacted on purpose: the bar renders as a blacked-out (creamed-out) block.
const withRedaction = (t: string): ReactNode => {
  const [a, b] = t.split("[REDACTED]");
  return b === undefined ? t : <>{a}<span className="redact">REDACTED</span>{b}</>;
};

export default function Flat() {
  const [on, setOn] = useState<string | null>(null);
  const idx = props.findIndex((p) => p.key === on);
  const cur = idx >= 0 ? props[idx] : null;

  const obj = (key: string, label: string, children: ReactNode) => {
    const show = () => setOn(key);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } };
    return (
      <g className={`obj${on === key ? " on" : ""}`} tabIndex={0} role="button" aria-label={label} onClick={show} onKeyDown={onKey}>
        {children}
      </g>
    );
  };

  return (
    <section className="page flat" id="flat" aria-label="Behind the scenes">
      <Comment id="flat" />
      <div className="head">
        <h2>Behind the Scenes: the Flat</h2>
        <div className="meta">Shot on location: a bachelor flat, Delhi.<br />Continuity notes by the director.</div>
      </div>
      <div className="stage">
        <figure className="board" style={{ margin: 0 }}>
          <div className="cap"><span>STORYBOARD 7A. INT. FLAT. 3:04 A.M.</span><span>Tap the props</span></div>
          <svg className="room" viewBox="0 0 900 540" role="group" aria-label="Storyboard sketch of a bachelor flat with clickable props">
            <path className="ink" d="M20 420 H880 M20 20 V420 M880 20 V420" />
            <path className="ink" d="M40 430 L860 430" opacity=".4" />
            <rect className="fill" x="70" y="50" width="200" height="150" /><rect className="dark" x="80" y="60" width="180" height="130" />
            <path className="ink" d="M170 50 V200 M70 125 H270" style={{ stroke: "#EADFC6" }} />
            <circle className="glow" cx="225" cy="90" r="16" />
            <text className="txt" x="80" y="222">still dark. still deploying.</text>
            <path className="ink" d="M300 330 H640 M320 330 V420 M620 330 V420" />
            <path className="ink" d="M650 300 V420 M650 360 H720 V420 M720 360 V300" />
            {obj("calendar", "Calendar", <>
              <rect className="hit" x="540" y="40" width="150" height="150" />
              <rect className="fill" x="555" y="55" width="120" height="120" /><rect className="dark" x="555" y="55" width="120" height="22" />
              <text className="txt" x="572" y="71" style={{ fill: "#EADFC6" }}>MONDAY</text>
              <path className="ink" d="M565 95 H665 M565 115 H665 M565 135 H665 M565 155 H665" />
              <circle className="ink" cx="585" cy="105" r="11" style={{ stroke: "var(--red)" }} /><circle className="ink" cx="585" cy="145" r="11" style={{ stroke: "var(--red)" }} />
              <circle className="ring" cx="615" cy="115" r="78" />
            </>)}
            {obj("laptop", "Laptop", <>
              <rect className="hit" x="380" y="220" width="190" height="115" />
              <rect className="dark" x="395" y="232" width="160" height="96" rx="4" />
              <rect x="403" y="240" width="144" height="80" style={{ fill: "#3B3530" }} />
              <path className="ink" d="M410 250 H540 M410 262 H520 M410 274 H535 M410 286 H500 M410 298 H530" style={{ stroke: "var(--gold)", strokeWidth: 2 }} />
              <path className="ink" d="M380 330 H570" />
              <text className="hand" x="404" y="215">40 tabs</text>
              <circle className="ring" cx="475" cy="282" r="72" />
            </>)}
            {obj("chai", "Chai glass", <>
              <rect className="hit" x="575" y="270" width="50" height="62" />
              <path className="fill" d="M585 290 L590 328 H612 L617 290 Z" /><path className="ink" d="M588 300 H614" style={{ stroke: "#9C6B2E" }} />
              <path className="ink" d="M594 282 q4 -8 0 -14 M606 282 q4 -8 0 -14" opacity=".7" />
              <circle className="ring" cx="601" cy="306" r="34" />
            </>)}
            {obj("maggi", "Maggi pot", <>
              <rect className="hit" x="745" y="230" width="125" height="190" />
              <rect className="fill" x="760" y="330" width="100" height="90" />
              <path className="ink" d="M770 330 V310 H850 V330" />
              <path className="fill" d="M775 290 H845 V312 H775 Z" /><path className="ink" d="M765 296 H775 M845 296 H858" />
              <path className="ink" d="M790 286 q-6 -14 4 -24 q8 -10 0 -22 M812 286 q-6 -14 4 -24 q8 -10 0 -22 M832 286 q-6 -14 4 -24" style={{ stroke: "var(--smoke)" }} />
              <text className="hand" x="762" y="232">3 a.m. menu</text>
              <circle className="ring" cx="810" cy="320" r="70" />
            </>)}
            {obj("fridge", "Fridge", <>
              <rect className="hit" x="40" y="250" width="130" height="170" />
              <rect className="fill" x="55" y="255" width="100" height="165" rx="6" /><path className="ink" d="M55 315 H155 M140 270 V300 M140 330 V360" />
              <rect x="72" y="272" width="44" height="34" style={{ fill: "var(--gold)" }} transform="rotate(-6 94 289)" />
              <text className="txt" x="76" y="294" transform="rotate(-6 94 289)" style={{ fontSize: 10 }}>#691 ✓</text>
              <circle className="ring" cx="105" cy="338" r="76" />
            </>)}
            {obj("attendance", "Attendance sheet", <>
              <rect className="hit" x="300" y="60" width="140" height="130" />
              <rect className="fill" x="315" y="70" width="110" height="110" transform="rotate(3 370 125)" />
              <circle className="dark" cx="370" cy="76" r="4" />
              <text className="txt" x="328" y="100" transform="rotate(3 370 125)">ATTENDANCE</text>
              <rect className="dark" x="333" y="118" width="74" height="18" transform="rotate(3 370 125)" />
              <text className="hand" x="326" y="162" transform="rotate(3 370 125)">classified</text>
              <circle className="ring" cx="370" cy="125" r="66" />
            </>)}
            {obj("phone", "Phone playing a lecture", <>
              <rect className="hit" x="170" y="440" width="170" height="90" />
              <path className="ink" d="M150 470 H360 V510 H150 Z" style={{ stroke: "var(--smoke)" }} />
              <rect className="dark" x="215" y="452" width="80" height="44" rx="6" />
              <path d="M248 464 L248 484 L265 474 Z" style={{ fill: "var(--gold)" }} />
              <text className="hand" x="300" y="470">3.4×</text>
              <circle className="ring" cx="255" cy="474" r="54" />
            </>)}
            <text className="txt" x="380" y="470">floor: also a cupboard.</text>
          </svg>
        </figure>
        <aside className="clip" id="clip" aria-live="polite">
          <div className="slate"><span>SCENE 7A{cur ? `, PROP ${idx + 1}` : ""}</span><span>TAKE 1</span></div>
          <h3>{cur ? cur.title : "Tap a prop"}</h3>
          <p>{cur ? withRedaction(cur.text) : "Every object in this flat has a story. Most of them happened at 3 a.m."}</p>
        </aside>
      </div>

      <div className="myths" id="myths">
        <h3>DTU myths, fact-checked</h3>
        <div className="mythgrid">
          {myths.map((m) => (
            <div key={m.title} className="myth"><b>{m.title}</b>{m.text}<span className={`stamp-true${m.stamp === "LEGEND" ? " legend" : ""}`}>{m.stamp}</span></div>
          ))}
        </div>
        <p className="disclaimer">Fact-checked by the director. Attendance figures withheld on legal advice.</p>
      </div>
      <span className="folio l">14</span><span className="folio r">BEHIND THE SCENES</span>
    </section>
  );
}
