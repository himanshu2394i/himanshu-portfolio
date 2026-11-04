# Polish loop: recruiter's-eye improvements

One major change per round (50 rounds planned). Each round: find the biggest weakness a recruiter would hit, fix it, test, log it here.

## Starting backlog, and where each item landed
- [x] Faster intro for repeat visitors: round 2 (remembered), round 18 (deep links skip it)
- [x] Curtain redesign, less like a streaming service: rounds 2 and 22
- [x] A short version for recruiters: round 3
- [x] One-page CV and download: rounds 7, 19, 37
- [x] Stronger proof on Box Office: round 6 (commit counts)
- [x] Project links: round 4 (receipts, evidence locker)
- [x] Share previews: rounds 5 and 44
- [x] Phone cover: round 23
- [x] Accessibility: rounds 10, 21, 29, 34 (axe on every run)
- [x] Performance: rounds 11 and 41
- [x] Copy tightening: rounds 17, 43, 45
- [x] Contact repeated at the end: round 15 (ticket: copy email, CV)
- [ ] Open, needs Himanshu: see "Before you submit" in README.md

## Rounds

### Round 1: running header and cover role line
- Problem: past the cover there was no way to jump between sections or contact me until the very end, and the cover never said what I do.
- Change: a fixed magazine running header (name, section links with the current one highlighted, red "Email me") that slides in after the cover; a role line on the cover; scroll offset so headings are not hidden under the header.
- Tests: added "running header appears after the cover..." and "the cover says what he does". 22 passing.

### Round 2: the curtain, redesigned
- Problem: about 3.3 s of monogram before anything could be clicked, on every visit, and the monogram plus "Who's watching?" borrowed too closely from a streaming service.
- Change: closed velvet curtains and valance from the first frame, a spotlit title card ("Himanshu presents / Who's in the audience tonight?") with ticket-stub seats clickable at once; curtains part on the chosen section. Repeat visits skip the intro (localStorage + inline pre-paint script).
- Tests: picker visible within 1.5 s; repeat visit skips the intro. 24 passing.

### Round 3: the short version (fact file)
- Problem: the Recruiter seat landed mid-page on a table; nothing summarised role, proof, stack and contact in one place.
- Change: a "The Short Version / FOR RECRUITERS" fact file right after the cover: now, studying, applying for, stack; three proof cards linking to their sections; the extra work; Email/LinkedIn/GitHub. Recruiter seat and programme ("Start here") point to it; header gets a "Short version" link. Fixed the mobile header auto-scroll math.
- Tests: fact file content and contact links; Recruiter seat lands on it. 28 passing.

### Round 4: receipts (proof links)
- Problem: every story made claims (PRs merged, hackathon builds) with nothing to click; a technical reviewer could not verify anything.
- Change: verified URLs via gh (llm4s #573/#648 closed, #691/#663 merged, all authored by himanshu2394i; public repos Alpaca, Agent-Cinema, Advanced-RAG-Engine-, kerno). Each screening dialog has a Receipts row; a new "Evidence locker" under the poster wall lists six public links. Growthvine code stays unlisted (private). Scroll offset now applies to every anchor target.
- Tests: dialog links to PR #691; locker links to Alpaca and Agent-Cinema. 30 passing.

### Round 5: link preview and tab icon
- Problem: shared links (LinkedIn, Slack, email) had no preview image; the tab showed the default Next.js favicon.
- Change: public/og.png (1200x630, rendered from the live cover), Open Graph + Twitter large-card metadata with metadataBase from NEXT_PUBLIC_SITE_URL (set it at deploy), and an "H" ticket app/icon.svg; removed the scaffold favicon.ico.
- Tests: og:image and twitter:card present, og.png served, icon link present. 32 passing.

### Round 6: box office grosses (real numbers)
- Problem: the box office table only had playful verdicts; nothing showed scale.
- Change: "All-time grosses" table, 11 titles with commits authored (from content.md git counts; ~ where rounded), one-line "what it is", studio, inline bars (top three in red), verdicts kept as flavour. Before/after MCP chart stays on top.
- Tests: at least 10 rows, real counts present. 34 passing.

### Round 7: a plain, printable CV page
- Problem: no CV anywhere; recruiters forward CVs and paste them into tracking systems, which cannot read a magazine.
- Change: /cv, a text-first one-page CV built only from content.md facts (role listed honestly as an internship), print stylesheet for A4, "Save as PDF" button, links from the header (CV) and the fact file. Internal links use next/link.
- Tests: CV content, no em-dashes, prints on exactly one A4 page, fact file links to it. 40 passing.

### Round 8: the commentary track
- Problem: dense creative spreads; a skimming recruiter had to infer what each section proves.
- Change: a DVD-style commentary track. Header toggle (red light when on, remembered in localStorage, applied before paint) shows red-pen margin notes stating in one plain line what each section shows (origin, feature, wall, platform, agent, box office, growth, flat). The Recruiter seat turns it on. Shared state via useSyncExternalStore on an html class.
- Tests: off by default, header toggles it with aria-pressed, Recruiter seat turns it on. 44 passing.
- Backlog: mobile header is crowded (one link visible).

### Round 9: Reels sheet on phones
- Problem: on phones the header link row showed about one section at a time.
- Change: below 820px the link row is replaced by a gold "Reels" button opening a native <dialog> side sheet: the whole programme (Start + reels 1 to 9), CV and Email me; closes on pick, Escape or backdrop.
- Tests: phone-only Reels test (opens, navigates to the agent, closes); desktop-only link-row test. 44 passing, 2 skipped by design.

### Round 10: accessibility audit (axe, WCAG A/AA)
- Problem: 66 contrast failures (red #C42A1F just under 4.5:1 on cream/paper; gold on the growth red at 4.34), an underline-less inline link, and a film strip not reachable by keyboard.
- Change: tokens fixed at the source (--red #B32519, --blood #701818, new --red-lit #E5544A for red text on black), underlined inline link, focusable labelled film strip. Added @axe-core/playwright (dev only).
- Tests: axe on the intro, the magazine (commentary off and on) and the CV, desktop and phone. 52 passing.

### Round 11: load speed
- Problem: 762 KB of JavaScript (raw) on first load; GSAP, Lenis and Motion were all in the initial bundle though they only animate below the fold or after a click.
- Change: GSAP + ScrollTrigger + Lenis now load via dynamic import after hydration; Motion removed entirely (the episode swap is a keyed CSS keyframe, off under reduced motion); uninstalled motion. Initial JS 226 KB gz -> 190 KB gz; total JS 762 KB -> 631 KB raw. Production-build LCP about 0.64 s locally (photo), FCP the same.
- Tests: full suite (functional, axe) still green.

### Round 12: press quotes (real code reviews)
- Problem: every line on the site was self-description; no third-party voice.
- Change: a gold press-quote band right after the fact file with verbatim fragments from llm4s maintainers' GitHub reviews (fetched with gh): "Great work addressing the feedback." and "Clean Either-based flow..." (rorygraves, #691), "Correct fix for issue #427." (#663), and the early "Poor execution." (vim89, #648) struck through and marked fixed. Each links to its PR; no stars, no invented praise.
- Tests: quotes present and linked to #691/#663. Made the intro axe test wait for the title-card fade (it was measuring half-transparent text). 54 passing.

### Round 13: the growth pitch, made actionable
- Problem: the fact file never mentioned the campaign (the reason for applying), and the growth page stopped at the idea, with no execution plan.
- Change: fact file gets a 4th card "Say it once" -> #growth; growth page gets "The shooting schedule", four weeks (pilot from my bloopers with tracked links, cast the other pains, release one a day, back the winner by week-one dictionary/snippet adoption). Built only on the agreed campaign and metrics.
- Tests: schedule has 4 weeks; short version links to #growth. 56 passing.

### Round 14: "Now filming" cards instead of placeholder players
- Problem: three video players all looped the same zoom on my photo with "Recording coming": read as unfinished.
- Change: VideoSlot renders a real <video> only when a recording path is set in content.ts (videos map); otherwise a clapperboard "Now filming" card with the scene and take. Deleted the unused placeholder mp4.
- Tests: no <video> elements until recordings exist; two filming cards. 58 passing.

### Round 15: contact friction
- Problem: mailto links open mail apps recruiters do not use; the closing ticket had no CV; LinkedIn posts in the critics corner led nowhere.
- Change: CopyEmail button (clipboard, "Copied" in green for 2 s, falls back to mailto) in the fact file and on the ticket; CV on the ticket; "Read on LinkedIn" on LinkedIn clippings (to the activity feed).
- Tests: clipboard holds the address and the button says Copied; ticket has CV and copy; at least four LinkedIn links. 62 passing.

### Round 16: findable
- Problem: no h1 on the page (masthead was a div), no structured data, no sitemap/robots: weak for anyone searching "Himanshu DTU Growthvine".
- Change: masthead is the single h1; schema.org Person JSON-LD (Growthvine Capital, DTU, LinkedIn, GitHub); app/sitemap.ts and app/robots.ts (force-static for export). site.url now reads NEXT_PUBLIC_SITE_URL in one place. AT DEPLOY: set NEXT_PUBLIC_SITE_URL, or these files say localhost.
- Tests: one h1, Person JSON-LD with sameAs and DTU, sitemap and robots served. 64 passing.

### Round 17: copy edit, end to end
- Problem (found by reading all visible text): stale "Who's watching?" reference after the curtain redesign; unconfirmed "Bangalore" in the classifieds; the site said "Engineer" while the CV said internship (a recruiter comparing them would notice); screen readers heard "EP 1Wrong words" and "Starthere"; a comma splice.
- Change: cover role line and fact file now say "Engineer (internship) at Growthvine Capital", matching the CV; classified says "Based in Delhi, will travel"; stale reference rewritten; spacing fixed; og.png re-rendered from the new cover.
- Tests: role consistency on cover and fact file; copy guard now also bans "Who's watching" and "Bangalore". 64 passing.

### Round 18: deep links
- Problem: a forwarded link like /#growth still showed the curtain, and picking a seat sent people elsewhere.
- Change: the pre-paint script treats any #section link as seen (curtain never draws); after GSAP pins the film strip (adding height above later sections), Effects refreshes ScrollTrigger and re-lands on the hash.
- Tests: /#growth hides the intro within 1.5 s and shows #growth. 66 passing.

### Round 19: a real PDF CV
- Problem: /cv needed Print then Save as PDF; recruiters attach files to tracking systems.
- Change: scripts/cv-pdf.mjs (npm run cv:pdf) prints /cv to public/himanshu-cv.pdf so the file always matches the page; "Download PDF" on the CV bar. Added npm test script.
- Tests: link present; file served as PDF; exactly one page. 68 passing.

### Round 20: README and repo hygiene
- Problem: the repo (which technical reviewers will open) had the create-next-app boilerplate README and sample SVGs; Playwright output folders were not ignored.
- Change: README explains what the site is, a section map, stack and the reasons behind it, how to run/test/build, where to change words, videos, the CV PDF and the share image, and how to deploy (NEXT_PUBLIC_SITE_URL; basePath note for GitHub Pages). Removed unused public/*.svg; .gitignore covers test-results and playwright-report.
- Tests: unchanged (no runtime change).

### Round 21: wayfinding
- Problem: keyboard users had to tab through every header link to reach content; nothing said how long the issue takes vs the short version; the box office showed an internal repo name (AGENNTT).
- Change: "Skip to the issue" link (first tab stop, visible on focus, above the curtain); programme states measured reading times (3,448 words: about 15 minutes; short version 195 words: under a minute); AGENNTT renamed "The First Agent". main has id="issue".
- Tests: Tab focuses the skip link (desktop); reading times shown; no AGENNTT. 70 passing.

### Round 22: the curtain, round two
- Problem: picking a seat just faded; the first impression could carry more theatre.
- Change: the chosen ticket tears (its stub rips and falls, 450 ms) before the curtains part; a row of marquee bulbs chases along the valance. Skip intro still opens at once; reduced motion never shows the intro.
- Tests: the picked seat gets .torn, the intro opens, the Engineer seat lands on #feature. 72 passing.

### Round 23: the phone cover
- Problem: on phones the photo sat below the fold; recruiters opening from LinkedIn mobile saw text first, no face.
- Change: below 820px the cover is a real magazine cover: photo full-bleed behind the masthead, dark gradient at the bottom, role line plus one headline over it (sub-lines and starburst dropped on phones; fixed a stretched .lines box by resetting top).
- Tests: phone-only check that the photo starts in the first 200 px and fills 60%+ of the screen. 73 passing (+2 skipped by design).

### Round 24: credits roll once; private poster gets receipts
- Problem: the cast list looped forever (24 s), unreadable at your own pace and failing WCAG 2.2.2 (no stop for auto-moving content, which axe cannot detect). The Growthvine poster was the only one with no receipts.
- Change: credits play once when in view (same observer as the diagrams), then settle into a static list on animationend; "Roll the credits again" button. Thirty Seconds now links to On set and Box office; internal receipt links close the dialog and stay in the tab (external ones still open new tabs).
- Tests: iteration count 1, settles to done, replay works; Growthvine receipts link to #platform. 78 passing.

### Round 25: wrong turns
- Problem: /resume (the commonest guess) and any broken link hit the bare default Next.js 404.
- Change: themed not-found ("Intermission / Reel not found") with Back to the issue and CV; /resume renders the CV with a canonical link to /cv. Static build emits the themed 404.html.
- Tests: /resume shows the CV with canonical /cv; unknown path returns 404 with both ways back; axe now also checks the 404 page. 83 passing.

### Round 26: header at laptop widths
- Problem: between about 1024 and 1279 px (most laptops) the header link row was clipped mid-word ("BA", "ION"); it only fitted from ~1280 px, exactly.
- Change: the link row shows only from 1321 px up; narrower screens get the Reels menu (already used on phones), with Commentary, CV and Email me kept in the bar.
- Tests: header never clips at 1024/1180/1280/1440/1920 (row fits, or Reels shown); the link-row test pinned to 1440 px. 88 passing.

### Round 27: phone scroll length (posters as a swipe row)
- Problem: on phones the four posters stacked to 2.5 screens (2,082 px); the origin film strip scrolled sideways with no hint.
- Change: below 600 px the posters are a scroll-snap swipe row (each ~72vw, the next one peeking in) with a "Swipe sideways for all four" hint; the origin strip gets its own hint. Phone page height 32,544 -> 30,991 px.
- Tests: phone-only: poster row shorter than one screen, horizontally scrollable, both hints visible. 89 passing.

### Round 28: compact programme on phones
- Problem: on phones the programme (a table of contents the Reels menu already duplicates) ran 2,127 px with every description and a 480 px image.
- Change: below 600 px reels show number + title only (descriptions hidden), tighter rows, image block 340 px. Programme 2,127 -> 1,115 px; phone page 30,991 -> 29,979 px.
- Tests: phone-only: programme under 1.6 screens, reel links still visible. 90 passing.

### Round 29: readable diagrams on phones
- Problem: on a 390 px phone the SVG diagrams shrank to 0.36-0.60 scale: labels 6.7-8.9 px, the flat 4.3-5.4 px. Unreadable.
- Change: below 600 px diagrams keep at least ~0.9 scale (min-width 520 px; the flat 740 px) inside frames that swipe sideways, with a red "Swipe to read the whole diagram" note. axe caught that scrollable frames must be keyboard-reachable, so the three diagram figures are focusable and labelled, with a focus ring.
- Tests: phone-only: every diagram at >= 0.8 scale and scrollable; axe clean. 91 passing.

### Round 30: discovering the commentary track; CV styles split out
- Problem: only the Recruiter seat turned the commentary on; anyone skipping the intro or arriving by deep link saw an unexplained toggle (a bare dot on phones).
- Change: a one-time callout under the toggle when the header first appears ("Short on time? Turn on the commentary..." with Turn it on / No thanks), remembered once dismissed, never shown if the commentary is already on. CV styles moved from globals.css to app/cv/cv.css; PDF regenerated.
- Tests: callout appears, turns the track on, does not return after reload; new guard fails if the CV PDF is older than app/cv/page.tsx or cv.css; poster test names its dialog. 95 passing.

### Round 31: try the bug (toy verify step)
- Problem: the agent section's best engineering story (a digits-only check that let "eighteen lakh" through for a real ₹55,83,450) was only described.
- Change: "Try the bug": pick a draft (correct figure, the figure in words, a wrong figure) and a check (old: digits only; new: numerals required); an output box says Passed (amber, the leak), Rejected or Verified. Native radios + aria-live output; labelled as a toy, with only the real figure from the story. The commentary callout now dismisses itself after 15 s.
- Tests: old check passes the words draft, new check rejects it, correct figure verifies. 97 passing.

### Round 32: replay the heist
- Problem: the signature engineering diagram was static; readers had to reconstruct the order of events themselves.
- Change: HeistPlan client component (same drawing) with a step-through replay: Back / Next step / Replay again, one box lit in gold per step, red annotations dimmed until the last step, and an aria-live caption per step (7 steps, ending on the same-day replay-test fix).
- Tests: five Next presses light the broker with the "retry fills" caption; Back returns to execution. 99 passing.

### Round 33: a clean console (and a Windows export bug)
- Problem: walking the production build (intro, Recruiter seat, scroll to the end, a screening, CV, a 404) logged a 404 for /cv/__next.cv.__PAGE__.txt: Next 16 static export on Windows leaves backslashes in prefetch file names (export/index.js joins a Windows-separated segment path after replacing only "/"), so the file lands in a nested folder and client navigation to /cv silently falls back to a full load.
- Change: scripts/fix-export-windows.mjs runs as postbuild and flattens those files (no-op on Linux builds such as Vercel); README documents it. Dev and production walks are now clean apart from the deliberate /nope 404 and a harmless CSS-preload notice for the CV stylesheet.
- Tests: suite unchanged and green; production walk verified by script.

### Round 34: keyboard and screen-reader flow through the curtain
- Problem: after picking a seat by keyboard, focus stayed on a ticket that vanished and fell to the top of the document; screen readers were not told where they landed; Escape did nothing on the overlay.
- Change: jumpTo() now also moves focus to the chosen section (tabindex -1, no outline); Skip intro focuses the cover. Escape on the curtain acts as Skip intro; the curtain is focusable so clicking its background keeps Escape working.
- Tests: Enter on Growth team focuses #growth; after a background click, Escape hides the intro. 100 passing.

### Round 35: real dates on the origin reel
- Problem: frames were labelled "First year", "Then", "Open source", "20 May": no sense of pace.
- Change: verified dates via gh (llm4s PRs Feb 2026; Growthvine 20 May 2026) and three new frames for what followed: Aug to Sep 2026 two hackathons (repos created 26 Aug), Oct 2026 the retail agent, Nov 2026 this site by voice. 8 frames.
- Open question for Himanshu: the RAG engine repo was created 22 Apr 2026, after the Feb llm4s PRs, but the story tells the RAG engine first. The RAG frame is left undated and in its original place until confirmed.
- Tests: 8 frames with the five dates. 102 passing.

### Round 36: the lead essay, readable in full
- Problem: the critics corner teased two essays with nowhere to read them; writing is direct evidence of communication for a growth role.
- Change: /writing/dangerous-failures publishes "The dangerous failures don't throw..." from Himanshu's own pasted text (1,392 words, scanned first: no secrets, client data or em-dashes), set as a magazine feature: headings, the "Errors you can page on" pull line, the checklist as a checklist, 6 min read, ways back to the issue and the CV. Only edits: two "word : word" spacing slips. The lead clipping links to it; added to the sitemap. The Samanvay essay stays a teaser (he asked to keep Samanvay light).
- Tests: link from the clipping, title, body text, 6 checklist items, no em-dash or broken characters, axe clean. 104 passing.

### Round 37: the CV, tailored to the growth role
- Problem: the CV read as a pure engineering CV for a growth-team application; the essay was not on it.
- Change: a "Growth" section (the activation path from statement to story to unlocks; re-engagement via fund watch and in-app reports; one login with role-based views), the pitch in the summary line, a "Writing" entry linking the essay (absolute URL: regenerate the PDF with NEXT_PUBLIC_SITE_URL set once live). To stay on one page: AWS folded into the backend bullet, project copy tightened (no facts dropped), print heading margins trimmed. PDF regenerated.
- Tests: Growth heading, "activation", essay link; still exactly one A4 page (the guard caught two overflows on the way). 106 passing.

### Round 38: host-ready either way (Vercel or GitHub Pages)
- Problem: on GitHub Pages the site lives under /<repo>/ and every raw path (/media/still.webp, /og.png, /himanshu-cv.pdf, videos) would 404: broken images for the first recruiter who opens it.
- Change: NEXT_PUBLIC_BASE_PATH drives next.config basePath and a tiny lib/asset.ts helper for raw paths (cover and programme images, video src/poster, the PDF link). og:image stays a plain path because metadataBase already carries the base path (caught a doubled /repo/repo/ while verifying). Added .github/workflows/pages.yml (build with env, .nojekyll, deploy-pages); README updated.
- Verified: built with /himanshu-portfolio, served from that sub-folder, walked intro to CV to 404: no missing files; og/twitter images and sitemap URLs correct; default build unchanged. 106 passing.

### Round 39: walking the recruiter path; the two-doors spread
- Problem: walking the Recruiter path at 1366 px (seat, commentary, every major spread) showed the two-doors diagram filling only the left half of the Growthvine opening, leaving a large empty area that read as unfinished.
- Change: the opening is a two-column grid: diagram left, and on the right the section's opening words set larger plus "The rule that held it together" (one system of record per product, so app and web never disagree). Stacks (words first) below 1100 px.
- Tests: at 1366 px the opening words sit to the right of the diagram, in the same row. 107 passing.

### Round 40: phone polish for the new interactives
- Problem: on phones the heist diagram swipes sideways, so when the replay reached Broker or Database the lit box was off-screen; the episode "phone screens" were 230 px tall for two lines of text.
- Change: the replay scrolls the diagram frame to centre the lit box on each step (only when the frame actually overflows); episode screens drop the fixed height on phones.
- Tests: phone-only: after five steps the lit broker box sits inside the visible frame. 108 passing.

### Round 41: speed re-check on a slow phone
- Problem: re-measured after 30 rounds of features. Initial JS barely grew (190 -> 194 KB gz), but on slow 4G with a 4x slower CPU: FCP 3.2 s, LCP 4.4-4.7 s (the curtain headline). Two causes: all 11 font files preloaded at high priority competing with the CSS; the title card faded in from opacity 0, which the browser does not count as painted until frames run, and frames were busy with hydration.
- Change: only the curtain's fonts (Limelight, League Gothic, Playfair) preload; Bodoni, Anton, Special Elite and Permanent Marker load just after first paint (swap). The title card slides in without fading.
- Result (same harsh local setup, uncompressed server): FCP ~3.2 -> ~2.7 s, LCP ~4.7 -> ~4.0 s. Real hosts compress, so expect better. 108 passing.

### Round 42: the campaign as a funnel
- Problem: the two agreed metrics were a plain list; a growth reader could not see which step of the journey each one measures.
- Change: "The Funnel" diagram in the growth section (same paper/ink/red-pen language): Watch an episode -> Install Flow (from that episode's tracked link) -> Say it once (first dictionary word or snippet), with "Installs per episode" and "a word or snippet in week one" placed on their steps. No targets or percentages. Swipe frame on phones at a 680 px minimum width; focusable and labelled.
- Tests: funnel stages in the accessible label, both metrics present, no percentages anywhere in it. 110 passing.

### Round 43: one statement of the metrics
- Problem: after the funnel, the growth pitch listed its two metrics twice (funnel + "How we'd know it worked").
- Change: removed the list and its unused content field and CSS; the funnel carries the metrics; the schedule still says what to do with them. The right-hand columns now open with "Why me, why here".
- Tests: the old heading is gone and the metric label appears once. 112 passing.

### Round 44: every page previews as itself
- Problem: shared links to the essay or the CV previewed with the magazine's generic title and description; the essay had no article markup.
- Change: the essay page has its own Open Graph (type article, its title and dek, author) and Twitter card, plus schema.org Article JSON-LD (author Himanshu with LinkedIn/GitHub). /cv and /resume preview as "Himanshu, CV". Share image repeated per page (page metadata replaces the layout's openGraph). PDF regenerated.
- Tests: essay og:type article and title, Article JSON-LD author; CV og:title. 114 passing.

### Round 45: the voice notes that built this issue; honest blooper framing
- Problem: "built by voice" was only claimed; and the bloopers were captioned "what normal voice typing heard", although they came from this session's dictation (done with Wispr Flow): a claim the Wispr Flow team could see through.
- Change: "Dailies: the voice notes that built this issue": three verbatim excerpts of Himanshu's own dictated messages (the Godfather brief, the bachelor-flat idea, the growth idea), each linked to the section it became. Bloopers now read "what voice typing heard before those words were in my dictionary", which is also the campaign's point (say it once, right forever).
- For Himanshu to confirm: which tool produced each blooper; the episode-one script still labels its left screen "normal voice typing" as a pitch device.
- Tests: three notes linking to #top, #flat, #growth; the caption no longer says "normal voice typing" and mentions the dictionary. 116 passing.

### Round 46: the bloopers spread holds together
- Problem: after the voice notes, the left column of the bloopers spread ran far longer than the right (just the making-of card), leaving a large empty area on desktop.
- Change: the making-of card is sticky beside the column (top 76 px, under the header). The section uses overflow: clip instead of hidden, because hidden makes a scroll container and silently stops sticky.
- Tests: desktop: while reading the notes, the card is on screen. 117 passing.

### Round 47: code health
- Checked: no CSS class without a component using it (strict className scan plus spot checks of replaced features: monogram, metrics list, tile colours all gone); no unused content exports; npm audit: 0 vulnerabilities in production dependencies (16 moderate in dev-only tooling, which never ships).
- Change: stylesheet section comments renamed from "Round N: ..." (process history) to the feature they style, capitalised consistently.
- Tests: 117 passing.

### Round 48: README and handover
- Problem: the README predated the essay, replay, toy, funnel, voice notes and callout; the open questions for Himanshu were scattered across this log.
- Change: README section map updated, other pages listed, and a "Before you submit" checklist (videos, host + NEXT_PUBLIC_SITE_URL + PDF regen, blooper source, RAG engine date, post links, optional product screenshots). This log's starting backlog now shows where each item landed.
- Tests: unchanged (docs only).

### Round 49: Safari (WebKit) and short phone screens
- Problem: every test ran in Chromium only; many recruiters read on iPhones (WebKit), and the site uses :has(), overflow: clip, dvh/svh and <dialog>.
- Change: installed Playwright WebKit and added an "iphone" (iPhone 14) project to the suite. All functional and axe tests pass in WebKit. It exposed a real layout bug on short screens (iPhone 14 viewport 664 px): the curtain's title card was taller than the screen, crushing "HIMANSHU PRESENTS" under the bulbs and the hint into Skip intro. Fixed with a compact title card under 760 px tall (smaller heading and tickets, hint hidden). Two test assumptions corrected (PDF printing is Chromium-only; the compact programme now has an absolute bound).
- Tests: new short-screen intro check. Full suite across desktop Chrome, Android and iPhone Safari.

### Round 50: site-wide guarantees and final production check
- Problem: the copy rules (no em-dashes, just "Himanshu", no stale names or broken characters) were only enforced on the home page, though the site now has /cv, /resume, the essay and the 404.
- Change: a copy-rules test for every page, run in all three browsers.
- Final check: typecheck and lint clean; production build of 8 static routes (3.3 MB); production walk (intro, Recruiter seat, full scroll, a screening, CV, 404) logs nothing but the deliberate 404; the CV PDF is current and one page.
- Tests: 189 passing across desktop Chrome, Android Chrome and iPhone Safari (27 skipped by design: phone-only, desktop-only or Chromium-only checks).

## Where it ended
50 rounds, each a tested change. Open items that need Himanshu are listed under "Before you submit" in README.md.

### Follow-up: The Short Version, no longer a slide
- Problem (Himanshu): the fact file still looked like a PPT slide: a bordered card with an offset gold shadow floating on a dark band, with boxed highlight cards inside.
- Change: a full-bleed paper page in the magazine's own language: double rule on top, big Bodoni headline, a column rule between the facts and a numbered, ruled list (no boxes, no shadows), double rule above contact, page folio. One column on phones (fixed an override where the new desktop grid beat the phone rule).
- Tests: phone check that facts and highlights stack at full width. 191 passing.

### Follow-up: Himanshu's own CV
- Source: HIMANSHU_24MC078_MCE.pdf (his CV).
- Change: /cv (and /resume) now carry his CV word for word as text: education with CGPA 7.83 and school results, "AI & Automation Intern" at Growthvine (280+ clients, ~9,000 funds, ~30% lower ECS bill, SSO/OAuth2, Terraform pipelines, SEBI CSCRF), LLM4S, Samanvay, the options agent (12 risk checks, 268 tests), Support Triage Agent, skills, achievements (Big Code 2026 top 15,000, HackerRank Orchestrate 230th, 100+ DSA, newsletter, E-Cell, Rotaract). Phone number deliberately left off the public page and PDF. Print uses a compact sans like the original so it stays one A4 page; PDF regenerated. Site aligned: cover and fact file say "AI & Automation Intern", the fact file adds CGPA, the 280+ clients and the achievements.
- Tests: CV test rewritten to his content and checks the phone number is absent; site/CV title consistency; one A4 page. 188 passing.

### Follow-up: no grades (off-campus application)
- Change: removed CGPA and the Class XII/X results from /cv, the PDF and the fact file; education now reads "DTU, B.Tech, Mathematics & Computing, 2024 to 2028". PDF regenerated.
- Tests: the CV test fails if CGPA or school results reappear. Related tests passing.
