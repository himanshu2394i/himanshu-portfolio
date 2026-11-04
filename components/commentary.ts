import { useSyncExternalStore } from "react";

// The commentary track lives as a class on <html> (set before paint by the layout script),
// so server HTML, CSS and every toggle agree without prop drilling.
const EVT = "commentary-change";

export function setCommentary(on: boolean) {
  document.documentElement.classList.toggle("commentary", on);
  try { localStorage.setItem("commentary", on ? "1" : "0"); } catch {}
  window.dispatchEvent(new Event(EVT));
}

const subscribe = (cb: () => void) => { window.addEventListener(EVT, cb); return () => window.removeEventListener(EVT, cb); };
const get = () => document.documentElement.classList.contains("commentary");

export const useCommentary = () => useSyncExternalStore(subscribe, get, () => false);
