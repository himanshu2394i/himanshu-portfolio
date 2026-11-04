"use client";

import { useEffect, useRef, useState } from "react";
import { programme, site } from "@/lib/content";
import { setCommentary, useCommentary } from "./commentary";
import Link from "next/link";

const links = [
  ["#short", "Short version"],
  ["#origin", "Origin"],
  ["#feature", "Feature"],
  ["#platform", "Growthvine"],
  ["#agent", "Agent"],
  ["#boxoffice", "Box office"],
  ["#growth", "Growth"],
  ["#flat", "Backstage"],
] as const;

// A magazine running header: hidden on the cover, then always there with the sections and a way to reach me.
export default function Nav() {
  const [show, setShow] = useState(false);
  const [cur, setCur] = useState("");
  const commentary = useCommentary();
  const [tip, setTip] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const closeSheet = () => sheet.current?.close();

  useEffect(() => {
    const cover = document.querySelector(".cover");
    // First time the header appears, explain the commentary track once (unless it's already on or was dismissed).
    const coverObs = new IntersectionObserver(([e]) => {
      setShow(!e.isIntersecting);
      let seen = true;
      try { seen = !!localStorage.getItem("commentary-tip"); } catch {}
      if (!e.isIntersecting && !seen && !document.documentElement.classList.contains("commentary")) setTip(true);
    }, { threshold: 0.05 });
    if (cover) coverObs.observe(cover);
    const secObs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(([h]) => { const el = document.querySelector(h); if (el) secObs.observe(el); });
    return () => { coverObs.disconnect(); secObs.disconnect(); };
  }, []);

  const dismissTip = (turnOn: boolean) => {
    if (turnOn) setCommentary(true);
    try { localStorage.setItem("commentary-tip", "1"); } catch {}
    setTip(false);
  };

  // The callout steps aside on its own after 15 s; nobody should have to close a popup.
  useEffect(() => {
    if (!tip) return;
    const t = setTimeout(() => dismissTip(false), 15000);
    return () => clearTimeout(t);
  }, [tip]);

  // On narrow screens the link row scrolls sideways: keep the current section in view.
  useEffect(() => {
    const a = document.querySelector<HTMLElement>(".rh-links a[aria-current]");
    const row = a?.parentElement;
    if (a && row) row.scrollTo({ left: a.offsetLeft - row.offsetLeft - row.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
  }, [cur]);

  return (
    <nav className={`runhead${show ? " on" : ""}`} aria-label="Sections" hidden={!show}>
      <a className="rh-name" href="#top">HIMANSHU</a>
      <div className="rh-links">
        {links.map(([h, l]) => <a key={h} href={h} aria-current={cur === h ? "true" : undefined}>{l}</a>)}
      </div>
      <button className="rh-comm" aria-pressed={commentary} onClick={() => setCommentary(!commentary)} title="Margin notes on what each section shows">
        <i aria-hidden="true" />Commentary
      </button>
      <button className="rh-reels" onClick={() => sheet.current?.showModal()}>Reels</button>
      <Link className="rh-cv" href="/cv">CV</Link>
      <a className="rh-cta" href={`mailto:${site.email}`}>Email me</a>
      {tip && !commentary && (
        <div className="commtip" role="dialog" aria-label="Commentary track">
          <p><b>Short on time?</b> Turn on the commentary: one red-pen line per section on what it shows.</p>
          <div>
            <button onClick={() => dismissTip(true)}>Turn it on</button>
            <button onClick={() => dismissTip(false)}>No thanks</button>
          </div>
        </div>
      )}
      <dialog ref={sheet} className="reelsheet" aria-label="Reels" onClick={(e) => e.target === sheet.current && closeSheet()}>
        <div className="rs-head"><b>Tonight&apos;s programme</b><button onClick={closeSheet} aria-label="Close">Close</button></div>
        <ol>
          {programme.map((r) => (
            <li key={r.href}><a href={r.href} onClick={closeSheet}><span>{r.reel ? `Reel ${r.reel}` : "Start"}</span>{r.title}</a></li>
          ))}
        </ol>
        <div className="rs-foot">
          <Link href="/cv" onClick={closeSheet}>CV</Link>
          <a href={`mailto:${site.email}`}>Email me</a>
        </div>
      </dialog>
    </nav>
  );
}
