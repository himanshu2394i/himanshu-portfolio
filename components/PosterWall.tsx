"use client";

import { useRef, useState } from "react";
import { evidence, films, type Film } from "@/lib/content";
import Comment from "./Comment";

export default function PosterWall() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [film, setFilm] = useState<Film | null>(null);
  const open = (f: Film) => { setFilm(f); dlg.current?.showModal(); };
  const close = () => dlg.current?.close();

  return (
    <section className="page wall" id="wall" aria-label="Now showing">
      <Comment id="wall" />
      <h2>Now Showing</h2>
      <p className="sub">Four true stories. Pick a poster to see the screening.</p>
      <div className="posters">
        {films.map((f) => (
          <button key={f.key} className={`poster ${f.style}`} onClick={() => open(f)}>
            <span className="badge">{f.badge}</span>
            <span className="top">{f.top}</span>
            <span className="t">{f.title}</span>
            <span className="tl">{f.tag}</span>
            <span className="credits">{f.credits}</span>
          </button>
        ))}
      </div>
      <p className="swipehint" aria-hidden="true">Swipe sideways for all four</p>
      <div className="locker" id="evidence">
        <h3>The evidence locker</h3>
        <p>Public code you can open right now. Growthvine&apos;s work is private, so it lives in the stories above.</p>
        <ul>
          {evidence.map((e) => (
            <li key={e.href}><a href={e.href} target="_blank" rel="noreferrer"><b>{e.label}</b><span>{e.note}</span></a></li>
          ))}
        </ul>
      </div>
      <dialog ref={dlg} aria-labelledby="sT" onClick={(e) => e.target === dlg.current && close()}>
        <h3 id="sT">{film?.title}</h3>
        <div className="reel">{film?.reel}</div>
        <div>{film?.body.map((p) => <p key={p}>{p}</p>)}</div>
        {film && film.receipts.length > 0 && (
          <div className="receipts">
            <span>Receipts</span>
            {film.receipts.map((r) => r.href.startsWith("#")
              ? <a key={r.href} href={r.href} onClick={close}>{r.label}</a>
              : <a key={r.href} href={r.href} target="_blank" rel="noreferrer">{r.label}</a>)}
          </div>
        )}
        <button onClick={close}>Lights up</button>
      </dialog>
    </section>
  );
}
