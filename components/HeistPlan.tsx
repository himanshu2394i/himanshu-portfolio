"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const len = (n: number) => ({ "--len": n }) as CSSProperties;

// The incident, in order. Each step lights one box; the captions retell it.
const steps = [
  { id: "", cap: "Press Next to replay the incident, one component at a time." },
  { id: "screener", cap: "The screener flags AAPL again. A position is already open." },
  { id: "claude", cap: "Claude picks a contract. Nothing told it about the open position." },
  { id: "risk", cap: "The risk layer checks size, spread and delta. All OK. It never asks: already holding AAPL?" },
  { id: "exec", cap: "The first order doesn't fill, so execution retries at a slightly worse price, as designed." },
  { id: "broker", cap: "The retry fills at the broker. Real money, a second AAPL position." },
  { id: "db", cap: "The database refuses the row because it already exists. Also correct." },
  { id: "end", cap: "A real position with no stop loss and nothing watching it. Every box said OK. Fixed the same day, with a test that replays this exact sequence." },
];

export default function HeistPlan() {
  const [i, setI] = useState(0);
  const fig = useRef<HTMLElement>(null);

  // On phones the diagram scrolls sideways: keep the lit box in view as the story moves.
  useEffect(() => {
    const f = fig.current, box = f?.querySelector<SVGRectElement>("rect.lit");
    if (!f || !box || f.scrollWidth <= f.clientWidth) return;
    const fr = f.getBoundingClientRect(), br = box.getBoundingClientRect();
    f.scrollTo({ left: f.scrollLeft + br.left - fr.left - (fr.width - br.width) / 2, behavior: "smooth" });
  }, [i]);
  const lit = (id: string) => (steps[i].id === id ? "box lit" : "box");
  const at = steps[i].id;
  return (
    <figure ref={fig} className="plan reveal" id="heist" tabIndex={0} aria-label="Diagram: the heist plan">
      <h4>The Heist Plan</h4>
      <p className="cap">Exhibit A. Recovered from the hackathon repo.</p>
      <svg className={`diagram${at ? " replaying" : ""}${at === "end" ? " ended" : ""}`} viewBox="0 0 520 470" role="img" aria-label="Diagram: screener, Claude, risk layer, execution and broker in a chain. The retry fills a second order and the database refuses the row, leaving an unwatched position.">
        <rect data-step="screener" className={lit("screener")} x="20" y="20" width="200" height="54" /><text className="lbl" x="34" y="44">Screener</text><text className="sm" x="34" y="62">flags AAPL again</text>
        <rect data-step="claude" className={lit("claude")} x="20" y="120" width="200" height="54" /><text className="lbl" x="34" y="144">Claude</text><text className="sm" x="34" y="162">picks a contract</text>
        <rect data-step="risk" className={lit("risk")} x="20" y="220" width="200" height="54" /><text className="lbl" x="34" y="244">Risk layer</text><text className="sm" x="34" y="262">size, spread, delta: OK</text>
        <rect data-step="exec" className={lit("exec")} x="20" y="320" width="200" height="54" /><text className="lbl" x="34" y="344">Execution</text><text className="sm" x="34" y="362">no fill, so retry</text>
        <rect data-step="broker" className={lit("broker")} x="300" y="320" width="200" height="54" /><text className="lbl" x="314" y="344">Broker</text><text className="sm" x="314" y="362">retry fills. Real money</text>
        <rect data-step="db" className={lit("db")} x="300" y="120" width="200" height="54" /><text className="lbl" x="314" y="144">Database</text><text className="sm" x="314" y="162">row exists: refused</text>
        <path className="wire draw" style={len(300)} d="M120 74 V120 M120 174 V220 M120 274 V320 M220 347 H300 M400 320 V174" />
        <circle className="redline draw" style={len(420)} cx="120" cy="247" r="66" />
        <text className="redtxt pop" x="196" y="218">never asked: already holding AAPL?</text>
        <path className="redline draw" style={len(200)} d="M400 120 C 400 70, 470 60, 470 30" />
        <text className="redtxt pop" x="300" y="22">position nobody is watching</text>
        <text className="redtxt pop" x="232" y="420">every box says OK.</text>
      </svg>
      <div className="replay">
        <p className="replay-cap" aria-live="polite"><b>{i === 0 ? "Replay" : `Step ${i} of ${steps.length - 1}`}</b> {steps[i].cap}</p>
        <div className="replay-btns">
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>Back</button>
          {i < steps.length - 1
            ? <button onClick={() => setI(i + 1)}>Next step</button>
            : <button onClick={() => setI(0)}>Replay again</button>}
        </div>
      </div>
    </figure>
  );
}
