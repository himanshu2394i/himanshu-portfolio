"use client";

import { useEffect, useRef, useState } from "react";
import { profiles } from "@/lib/content";
import { jumpTo, smooth } from "./smooth";
import { setCommentary } from "./commentary";

// Closed curtains and a spotlit title card. Pick a seat and the curtains part on that section.
// Seen once, never again: the layout's inline script hides it on repeat visits before paint.
export default function Intro() {
  const [stage, setStage] = useState<"who" | "open" | "gone">("who");
  const [torn, setTorn] = useState(-1);
  const started = useRef(false);
  const first = useRef<HTMLButtonElement>(null);

  const unlock = () => {
    document.documentElement.removeAttribute("data-intro");
    smooth.lenis?.start();
  };

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen") || matchMedia("(prefers-reduced-motion: reduce)").matches) return unlock();
    first.current?.focus({ preventScroll: true });
  }, []);

  // A seat tears its ticket stub first (450 ms), then the curtains part. Skip intro opens at once.
  const go = (target: string, commentary = false, seat = -1) => {
    if (started.current) return;
    started.current = true;
    try { localStorage.setItem("seen-intro", "1"); } catch {}
    setTorn(seat);
    setTimeout(() => {
      unlock();
      if (commentary) setCommentary(true);
      jumpTo(target || "#top");
      setStage("open");
      setTimeout(() => setStage("gone"), 1900);
    }, seat >= 0 ? 450 : 0);
  };

  return (
    <div className={`intro${stage === "open" ? " open" : ""}${stage === "gone" ? " gone" : ""}`} id="intro" aria-label="Intro" tabIndex={-1} onKeyDown={(e) => e.key === "Escape" && go("")}>
      <div className="valance" aria-hidden="true" />
      <div className="curtain l" aria-hidden="true" /><div className="curtain r" aria-hidden="true" />
      <div className="titlecard">
        <p className="presents">HIMANSHU PRESENTS</p>
        <h2>Who&apos;s in the audience tonight?</h2>
        <div className="profiles">
          {profiles.map((p, i) => (
            <button key={p.label} ref={i === 0 ? first : undefined} className={`profile ${p.tone}${torn === i ? " torn" : ""}`} onClick={() => go(p.target, p.commentary, i)}>
              <span className="tile" aria-hidden="true">{p.letter}</span>{p.label}
            </button>
          ))}
        </div>
        <p className="hint">Pick a seat. The curtains open on the part made for you.</p>
      </div>
      <button className="skipintro" onClick={() => go("")}>Skip intro</button>
    </div>
  );
}
