"use client";

import { useState } from "react";

// A toy version of the agent's verify step, not the production code. The one real figure is from the story.
const statement = [5583450];
const drafts = [
  "Your portfolio is worth ₹55,83,450.",
  "Your portfolio is worth eighteen lakh.",
  "Your portfolio is worth ₹58,00,000.",
];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function verify(draft: string, mode: "old" | "new"): { ok: boolean; text: string } {
  if (mode === "new" && /\b(thousand|lakhs?|crores?)\b/i.test(draft))
    return { ok: false, text: "Rejected. An amount is written in words, so it can't be checked. The model must use numerals." };
  const figures = (draft.match(/\d[\d,]*/g) ?? []).map((d) => Number(d.replace(/,/g, "")));
  const wrong = figures.find((f) => !statement.includes(f));
  if (wrong !== undefined) return { ok: false, text: `Rejected. ${inr(wrong)} isn't in the statement.` };
  if (figures.length === 0) return { ok: false, text: "Passed. It found no digits, so there was nothing to check, and the wrong figure goes out." };
  return { ok: true, text: mode === "new" ? "Verified. Every figure matches the statement." : "Passed. Every figure matches the statement." };
}

export default function VerifyToy() {
  const [draft, setDraft] = useState(1);
  const [mode, setMode] = useState<"old" | "new">("old");
  const r = verify(drafts[draft], mode);
  return (
    <div className="toy" id="verify-toy">
      <h3>Try the bug</h3>
      <p className="toy-note">A toy version of the verify step. The statement says the portfolio is worth {inr(statement[0])}.</p>
      <div className="toy-grid">
        <fieldset>
          <legend>The model&apos;s draft</legend>
          {drafts.map((d, i) => (
            <label key={d}><input type="radio" name="toy-draft" checked={draft === i} onChange={() => setDraft(i)} />{d}</label>
          ))}
        </fieldset>
        <fieldset>
          <legend>The check</legend>
          <label><input type="radio" name="toy-mode" checked={mode === "old"} onChange={() => setMode("old")} />Old check: reads digits only</label>
          <label><input type="radio" name="toy-mode" checked={mode === "new"} onChange={() => setMode("new")} />New check: numerals required</label>
        </fieldset>
      </div>
      <output aria-live="polite" className={r.ok ? "ok" : r.text.startsWith("Passed") ? "leak" : "no"}>{r.text}</output>
    </div>
  );
}
