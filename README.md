# HIMANSHU, the cinema issue

A portfolio built as a vintage film magazine: a curtain that asks who's in the audience, a cover, a programme of reels, and the real work behind them (data infrastructure, an AI assistant for people's money, hackathon builds and open source). It was built by voice with Wispr Flow, as part of an application to the Wispr Flow India growth team.

Recruiters: start at **The Short Version** (the Recruiter seat lands there), or read the plain [CV page](app/cv/page.tsx) (`/cv`, also a one-page PDF).

## What's in it

| Section | What it shows |
|---|---|
| The Short Version | Role, stack, four highlights, contact, CV |
| Press quotes | Verbatim lines from llm4s maintainers' code reviews, linked to the PRs |
| The Origin | A dated film strip, Feb to Nov 2026, that scrolls sideways (pinned on desktop) |
| The Heist Plan | The trading agent that bought AAPL twice, with a step-by-step replay of the incident |
| Now Showing | Four stories as posters, plus an evidence locker of public repos and PRs |
| On Set: Growthvine | One person across app and web, the data stack, the portfolio story |
| Confessions of an honest agent | The retail AI assistant: guardrails, verification, 167 tests, and "Try the bug", a toy verify step |
| Box Office | Commits per system, from git history |
| Say it once | The growth pitch: a split-screen series, the funnel and its two metrics, a four-week shooting schedule |
| Behind the Scenes | The flat (tap the props) and DTU myths, fact-checked |
| Bloopers | Voice-typing slips, and how the issue was built by voice |
| The Critics' Corner | Essays and posts; one essay in full at `/writing/dangerous-failures` |

A **commentary track** (header toggle, on by default for the Recruiter seat, offered once to everyone else) adds one-line margin notes on what each section shows.

Other pages: `/cv` (and `/resume`), a one-page CV with a PDF download; `/writing/dangerous-failures`; a themed 404.

## Before you submit (needs Himanshu)

- [ ] **Record the videos.** Put files in `public/video/` and set their paths in the `videos` map in `lib/content.ts`; until then each slot shows a "Now filming" card.
- [x] **Host:** live on GitHub Pages at https://himanshu2394i.github.io/himanshu-portfolio/ (deploys on every push to `main`). The CV PDF has no site-dependent links, so it needs no regeneration.
- [ ] **Confirm the bloopers' source.** They are captioned as what voice typing heard before the words were in the dictionary. If they came from Wispr Flow, that caption is right; the episode-one script still labels its left screen "normal voice typing" as a pitch device.
- [ ] **Confirm the RAG engine date.** Its repo was created in Apr 2026, after the Feb 2026 llm4s PRs, but the story tells it first; that frame is undated until you confirm.
- [ ] **Essay and post links.** LinkedIn clippings link to your activity feed; give the exact post URLs if you want them linked one by one.
- [ ] **Optional:** product screenshots from Growthvine (only with permission, client data removed).

## Stack and decisions

- **Next.js 16 (App Router), React 19, TypeScript**, exported as **static files** (`output: "export"`). Any static host works.
- **Plain CSS** in `app/globals.css` with colour tokens on `:root`. Every section is a one-off spread, so utility classes would only add noise. Tailwind is wired in for small utilities.
- **Fonts** via `next/font` (Limelight, Bodoni Moda, Anton, Playfair Display, League Gothic, Special Elite, Permanent Marker).
- **Motion:** GSAP + ScrollTrigger and Lenis smooth scroll, **loaded after first paint** (dynamic import) so they never block the page. Everything animated has a reduced-motion fallback, and the intro is skipped entirely under reduced motion.
- **Content** lives in one typed file, `lib/content.ts`. Every claim traces back to code, docs or git history; nothing is invented.
- **Accessibility:** WCAG A/AA checked with axe on every test run (intro, page with and without commentary, CV).

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # Playwright: desktop + phone, functional + accessibility
npm run build        # static site in out/
```

## Change things

- **Words:** `lib/content.ts`.
- **Your recordings:** put the file in `public/video/` and set its path in the `videos` map in `lib/content.ts` (for example `making: "/video/making-of.mp4"`). Empty paths show a "Now filming" card instead of a player.
- **CV PDF:** after editing the CV, start the dev server and run `npm run cv:pdf` (pass the URL if it isn't `http://localhost:3000`). A test checks the PDF is still one page. Once the site has its real address, run the dev server with `NEXT_PUBLIC_SITE_URL` set before regenerating, so links inside the PDF point at the live site.
- **Share image:** `public/og.png` (1200x630), rendered from the cover.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the final address (no trailing slash) before `npm run build`. Share cards, `sitemap.xml` and `robots.txt` use it, and they fall back to localhost without it.

- **Vercel:** import the repo, add the env var, deploy. No other settings needed.
- **GitHub Pages:** ready to go. `.github/workflows/pages.yml` builds on every push to `main` with `NEXT_PUBLIC_BASE_PATH=/<repo>` and the matching site URL, then deploys. One-time setup: repo Settings > Pages > Source: GitHub Actions. Every raw file path goes through `lib/asset.ts`, so images, the CV PDF and videos work under the sub-folder (verified by building with the base path and walking the site from `/himanshu-portfolio/`).

Building on Windows: Next 16's static export leaves backslashes in the names of its prefetch files, so client-side navigation to `/cv` would 404 and fall back to a full page load. `npm run build` runs `scripts/fix-export-windows.mjs` afterwards to flatten them; on Linux (Vercel, GitHub Actions) it finds nothing to do.

## Tests

`tests/site.spec.ts` covers the curtain (seats, skip, repeat visits, deep links), the header and phone menu, the commentary track, posters and receipts, props, episodes, contact (copy email), the CV (content, one A4 page, PDF), share metadata, structured data, sitemap/robots, copy rules (no em-dashes, the name is just "Himanshu"), no sideways scroll, and axe accessibility checks.

`POLISH-LOG.md` records each improvement round: the problem, the change and the tests.
