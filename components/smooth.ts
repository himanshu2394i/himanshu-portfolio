import type Lenis from "lenis";

// Shared handle so the intro can pause smooth scrolling and jump to a section.
export const smooth: { lenis: Lenis | null } = { lenis: null };

// Scroll to a section and move focus there too, so keyboard and screen-reader users land where they chose.
export function jumpTo(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (smooth.lenis) smooth.lenis.scrollTo(el, { immediate: true, force: true });
  else el.scrollIntoView({ behavior: "instant" });
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
