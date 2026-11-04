"use client";

import { useEffect } from "react";
import { smooth } from "./smooth";

// Page-wide motion: Lenis smooth scroll, reveal-on-view, and two GSAP moments
// (the origin film strip scrolls sideways, the feature headline lands word by word).
// Reduced motion gets none of it; the CSS already shows everything in its final state.
// GSAP and Lenis load after first paint (dynamic import), so they never block the page appearing.
export default function Effects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.3 },
    );
    document.querySelectorAll(".reveal, #chart, #myths, .roll").forEach((el) => io.observe(el));
    // The credits roll once, then settle into a still, readable list (WCAG 2.2.2: no endless motion).
    const roll = document.querySelector(".roll");
    const settle = () => roll?.classList.add("done");
    roll?.addEventListener("animationend", settle);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => { io.disconnect(); roll?.removeEventListener("animationend", settle); };

    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ autoRaf: false, anchors: true });
      smooth.lenis = lenis;
      if (document.documentElement.hasAttribute("data-intro")) lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        const strip = document.querySelector<HTMLElement>(".filmstrip");
        const track = document.querySelector<HTMLElement>(".frames");
        if (!strip || !track) return;
        strip.classList.add("pinned");
        const dist = () => track.scrollWidth - strip.clientWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: "#origin", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true },
        });
        return () => strip.classList.remove("pinned");
      });
      mm.add("all", () => {
        gsap.from(".feature .hed span", {
          y: 140, opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.12,
          scrollTrigger: { trigger: ".feature .hed", start: "top 80%" },
        });
      });

      // A deep link was scrolled to before the film-strip pin added its height; land on it again.
      if (location.hash.length > 1 && document.querySelector(location.hash)) {
        ScrollTrigger.refresh();
        lenis.scrollTo(location.hash, { immediate: true, force: true });
      }

      cleanup = () => {
        mm.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
        smooth.lenis = null;
      };
    })();

    return () => { cancelled = true; io.disconnect(); roll?.removeEventListener("animationend", settle); cleanup(); };
  }, []);
  return null;
}
