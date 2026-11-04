import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { statSync } from "node:fs";

const axe = (page: import("@playwright/test").Page) => new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

test.describe("intro", () => {
  test("the audience picker is there at once and sends the growth team to the growth page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Who's in the audience tonight?" })).toBeVisible({ timeout: 1500 });
    await page.getByRole("button", { name: "Growth team" }).click();
    await expect(page.locator("#intro")).toBeHidden({ timeout: 6000 });
    await expect(page.locator("#growth")).toBeInViewport();
  });

  test("the recruiter seat opens on the fact file", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Recruiter" }).click();
    await expect(page.locator("#short")).toBeInViewport({ timeout: 3000 });
  });

  test("the credits roll once, then stay readable, and can roll again", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip intro" }).click();
    const inner = page.locator(".roll .inner");
    expect(await inner.evaluate((e) => getComputedStyle(e).animationIterationCount)).toBe("1");
    await page.locator(".credits-roll").scrollIntoViewIfNeeded();
    await expect(page.locator(".roll")).toHaveClass(/done/, { timeout: 30000 });
    await expect(page.locator(".roll").getByText("The Honest Critics")).toBeVisible();
    await page.getByRole("button", { name: "Roll the credits again" }).click();
    await expect(page.locator(".roll")).not.toHaveClass(/done/);
  });

  test("the recruiter seat turns on the commentary track", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Recruiter" }).click();
    await expect(page.locator("#platform .comment")).toBeVisible({ timeout: 3000 });
  });

  test("picking a seat tears the ticket before the curtains open", async ({ page }) => {
    await page.goto("/");
    const seat = page.getByRole("button", { name: "Engineer" });
    await seat.click();
    await expect(seat).toHaveClass(/torn/);
    await expect(page.locator("#intro")).toHaveClass(/open/, { timeout: 2000 });
    await expect(page.locator("#feature")).toBeInViewport({ timeout: 4000 });
  });

  test("keyboard: Enter on a seat moves focus into that section; Escape skips", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow");
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Recruiter" })).toBeFocused();
    await page.keyboard.press("ArrowRight"); // harmless: seats are plain buttons
    await page.getByRole("button", { name: "Growth team" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#growth")).toBeFocused({ timeout: 3000 });
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto("/");
    await page.locator(".titlecard").click({ position: { x: 5, y: 5 } }); // clicking the curtain keeps focus inside it
    await page.keyboard.press("Escape");
    await expect(page.locator("#intro")).toBeHidden({ timeout: 3000 });
  });

  test("on short phone screens the curtain's title card fits between the valance and Skip intro", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.setViewportSize({ width: 390, height: 640 });
    await page.goto("/");
    const valance = (await page.locator(".valance").boundingBox())!;
    const presents = (await page.locator(".titlecard .presents").boundingBox())!;
    const lastSeat = (await page.getByRole("button", { name: "Just browsing" }).boundingBox())!;
    const skip = (await page.getByRole("button", { name: "Skip intro" }).boundingBox())!;
    expect(presents.y).toBeGreaterThan(valance.y + valance.height + 12); // clear of the bulbs
    expect(lastSeat.y + lastSeat.height).toBeLessThan(skip.y);
  });

  test("Skip intro removes the overlay", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip intro" }).click();
    await expect(page.locator("#intro")).toBeHidden({ timeout: 6000 });
  });

  test("a deep link skips the curtain and opens on that section", async ({ page }) => {
    await page.goto("/#growth");
    await expect(page.locator("#intro")).toBeHidden({ timeout: 1500 });
    await expect(page.locator("#growth")).toBeInViewport();
  });

  test("a repeat visit skips the intro", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skip intro" }).click();
    await expect(page.locator("#intro")).toBeHidden({ timeout: 6000 });
    await page.reload();
    await expect(page.locator("#intro")).toBeHidden({ timeout: 500 });
  });
});

test.describe("the issue", () => {
  test.use({ reducedMotion: "reduce" }); // no intro, no smooth scroll

  test("reduced motion skips the intro", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#intro")).toBeHidden();
    await expect(page.locator(".cover .mast")).toBeVisible();
  });

  test("a poster screens its story and Lights up closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Rejected Twice/ }).click();
    const dialog = page.getByRole("dialog", { name: "Rejected Twice" });
    await expect(dialog).toContainText("llm4s");
    await dialog.getByRole("button", { name: "Lights up" }).click();
    await expect(dialog).toBeHidden();
  });

  test("screenings and the evidence locker link to the real repos and PRs", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Rejected Twice/ }).click();
    await expect(page.getByRole("dialog").getByRole("link", { name: /#691/ })).toHaveAttribute("href", "https://github.com/llm4s/llm4s/pull/691");
    await page.getByRole("button", { name: "Lights up" }).click();
    const locker = page.locator("#evidence");
    await expect(locker.getByRole("link", { name: /Alpaca/ })).toHaveAttribute("href", "https://github.com/himanshu2394i/Alpaca");
    await expect(locker.getByRole("link", { name: /Agent-Cinema/ })).toHaveAttribute("href", "https://github.com/himanshu2394i/Agent-Cinema");
  });

  test("the private Growthvine poster points to where the work is shown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Thirty Seconds/ }).click();
    await expect(page.getByRole("dialog").getByRole("link", { name: /On set/i })).toHaveAttribute("href", "#platform");
  });

  test("the toy verify step shows the words-not-digits bug and its fix", async ({ page }) => {
    await page.goto("/");
    const toy = page.locator("#verify-toy");
    await toy.getByRole("radio", { name: /eighteen lakh/ }).check();
    await toy.getByRole("radio", { name: /Old check/ }).check();
    await expect(toy.locator("output")).toContainText("Passed");
    await toy.getByRole("radio", { name: /New check/ }).check();
    await expect(toy.locator("output")).toContainText("Rejected");
    await toy.getByRole("radio", { name: /55,83,450/ }).check();
    await expect(toy.locator("output")).toContainText("Verified");
  });

  test("the heist diagram replays the incident step by step", async ({ page }) => {
    await page.goto("/");
    const plan = page.locator("#heist");
    const next = plan.getByRole("button", { name: "Next step" });
    for (let i = 0; i < 5; i++) await next.click();
    await expect(plan.locator('[data-step="broker"]')).toHaveClass(/lit/);
    await expect(plan.locator(".replay-cap")).toContainText("retry fills");
    await plan.getByRole("button", { name: "Back" }).click();
    await expect(plan.locator('[data-step="exec"]')).toHaveClass(/lit/);
  });

  test("the origin reel carries real dates through to today", async ({ page }) => {
    await page.goto("/");
    const frames = page.locator("#origin .frame");
    await expect(frames).toHaveCount(8);
    for (const d of ["Feb 2026", "20 May 2026", "Aug to Sep 2026", "Oct 2026", "Nov 2026"]) await expect(page.locator("#origin")).toContainText(d);
  });

  test("tapping a prop in the flat tells its story", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Fridge" }).click({ force: true });
    await expect(page.locator("#clip")).toContainText("PR #691");
  });

  test("the growth pitch has a schedule and the short version points to it", async ({ page }) => {
    await page.goto("/");
    const sched = page.locator("#schedule");
    await expect(sched.locator("li")).toHaveCount(4);
    await expect(sched).toContainText("Week 1");
    await expect(page.locator("#short").getByRole("link", { name: /Say it once/ })).toHaveAttribute("href", "#growth");
  });

  test("the growth pitch shows its funnel, with each agreed metric on its step and no invented numbers", async ({ page }) => {
    await page.goto("/");
    const f = page.locator("#funnel");
    await expect(f.getByRole("img")).toHaveAttribute("aria-label", /Watch an episode.*Install.*dictionary word or snippet/);
    await expect(f).toContainText("Installs per episode");
    await expect(f).toContainText("week one");
    expect(await f.innerText()).not.toMatch(/\d+\s?%/);
  });

  test("the growth pitch states its metrics once (on the funnel)", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#growth").getByRole("heading", { name: /How we.d know it worked/ })).toHaveCount(0);
    const text = await page.locator("#growth").innerText();
    expect(text.match(/Installs per episode/g)?.length).toBe(1); // the metric label; the schedule says it in lowercase as an action
  });

  test("growth episodes switch between normal voice typing and Flow", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /Wrong tone/ }).click();
    await expect(page.locator("#growth")).toContainText("I'll send it by 5 p.m.");
  });

  test("unrecorded video slots show a designed card, not a placeholder player", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("video")).toHaveCount(0);
    const cards = page.locator(".vslot.filming");
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText("NOW FILMING");
  });

  test("copy email puts the address on the clipboard and says so", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are chromium-only here");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    const btn = page.locator("#short .copymail");
    await expect(btn).toHaveText("Copy email");
    await btn.click();
    await expect(btn).toContainText("Copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("himanshu1908999@gmail.com");
  });

  test("the closing ticket offers CV and copy email; LinkedIn posts link out", async ({ page }) => {
    await page.goto("/");
    const t = page.locator(".ticket");
    await expect(t.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
    await expect(t.getByRole("button", { name: /Copy email/ })).toBeVisible();
    const posts = page.locator(".clipping a[href*='linkedin.com']");
    expect(await posts.count()).toBeGreaterThanOrEqual(4);
  });

  test("findable: one h1, Person structured data, sitemap and robots", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("HIMANSHU");
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
    expect(ld["@type"]).toBe("Person");
    expect(ld.sameAs).toContain("https://github.com/himanshu2394i");
    expect(JSON.stringify(ld)).toContain("Delhi Technological University");
    expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap");
  });

  test("wayfinding: skip link, honest reading times, no internal repo names", async ({ page, isMobile }) => {
    await page.goto("/");
    if (!isMobile) {
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: "Skip to the issue" });
      await expect(skip).toBeFocused();
      await expect(skip).toBeVisible();
    }
    await expect(page.locator(".programme")).toContainText("about 15 minutes");
    await expect(page.locator(".programme")).toContainText("under a minute");
    await expect(page.locator("#boxoffice")).not.toContainText("AGENNTT");
  });

  test("no verbatim voice notes are shown; bloopers are framed honestly", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#voicenotes")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("The Godfather");
    await expect(page.locator("#bloopers .sub")).not.toContainText("normal voice typing");
    await expect(page.locator("#bloopers .sub")).toContainText("dictionary");
  });

  test("every in-page link has a target", async ({ page }) => {
    await page.goto("/");
    const missing = await page.$$eval('a[href^="#"]', (as) =>
      as.map((a) => a.getAttribute("href")!).filter((h) => h.length > 1 && !document.querySelector(h)),
    );
    expect(missing).toEqual([]);
  });

  test("copy rules: no em-dashes, just Himanshu", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).not.toContain("—");
    expect(text).not.toContain("Himanshu Mann");
    expect(text).not.toContain("Who's watching");
    expect(text).not.toContain("Bangalore");
  });

  test("running header appears after the cover with contact and sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "phones use the Reels menu instead of the link row");
    await page.setViewportSize({ width: 1440, height: 900 }); // the link row shows from ~1320px up
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Sections" });
    await expect(nav).toBeHidden();
    await page.locator("#feature").scrollIntoViewIfNeeded();
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
    await nav.getByRole("link", { name: "Growth", exact: true }).click();
    await expect(page.locator("#growth")).toBeInViewport();
  });

  test("the fact file gives a recruiter the short version", async ({ page }) => {
    await page.goto("/");
    const f = page.locator("#short");
    await expect(f).toContainText("Growthvine Capital");
    await expect(f).toContainText("DTU");
    await expect(f.getByRole("link", { name: "Email" })).toHaveAttribute("href", /^mailto:/);
    await expect(f.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin\.com/);
  });

  test("press quotes are real reviews, linked to their pull requests", async ({ page }) => {
    await page.goto("/");
    const band = page.locator("#reviews");
    await expect(band).toContainText(/great work addressing the feedback/i);
    await expect(band.getByRole("link", { name: /PR #691/ }).first()).toHaveAttribute("href", "https://github.com/llm4s/llm4s/pull/691");
    await expect(band.getByRole("link", { name: /PR #663/ })).toHaveAttribute("href", "https://github.com/llm4s/llm4s/pull/663");
  });

  test("on phones the posters are a swipe row with a hint, not 2.5 screens of scrolling", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const row = page.locator(".posters");
    const vp = page.viewportSize()!;
    const box = (await row.boundingBox())!;
    expect(box.height).toBeLessThan(vp.height * 1.1);
    expect(await row.evaluate((e) => e.scrollWidth > e.clientWidth)).toBe(true);
    await expect(page.locator("#wall .swipehint")).toBeVisible();
    await expect(page.locator("#origin .swipehint")).toBeVisible();
  });

  test("on phones the programme is compact (the Reels menu has the details)", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const h = (await page.locator(".programme").boundingBox())!.height;
    expect(h).toBeLessThan(1300); // was 2,127 px before compacting
    await expect(page.locator(".programme").getByRole("link", { name: /Reel 7/ })).toBeVisible();
  });

  test("on phones diagrams stay readable (at least 80% scale) and scroll sideways", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const scales = await page.$$eval("svg.diagram, svg.room", (svgs) =>
      svgs.map((s) => ({ scale: s.getBoundingClientRect().width / (s as SVGSVGElement).viewBox.baseVal.width, scrolls: s.parentElement!.scrollWidth > s.parentElement!.clientWidth })));
    for (const d of scales) {
      expect(d.scale).toBeGreaterThanOrEqual(0.8);
      expect(d.scrolls).toBe(true);
    }
  });

  test("on phones the heist replay scrolls the lit box into view", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const plan = page.locator("#heist");
    for (let i = 0; i < 5; i++) await plan.getByRole("button", { name: "Next step" }).click();
    const lit = page.locator('#heist [data-step="broker"]');
    await expect(lit).toHaveClass(/lit/);
    await expect.poll(async () => {
      const f = (await plan.boundingBox())!, b = (await lit.boundingBox())!;
      return b.x >= f.x - 1 && b.x + b.width <= f.x + f.width + 1;
    }).toBe(true);
  });

  test("on phones the short version is one column, full width", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const facts = (await page.locator(".ff-facts").boundingBox())!;
    const wins = (await page.locator(".ff-wins").boundingBox())!;
    expect(wins.y).toBeGreaterThan(facts.y + facts.height - 1); // stacked, not side by side
    expect(facts.width).toBeGreaterThan(page.viewportSize()!.width * 0.8);
  });

  test("on phones the cover photo is in the first screen", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    const box = await page.locator(".cover .photo").boundingBox();
    expect(box!.y).toBeLessThan(200);
    const vp = page.viewportSize()!;
    expect(box!.height).toBeGreaterThan(vp.height * 0.6);
  });

  const allCoverHeadlinesShown = async (page: import("@playwright/test").Page) => {
      await page.goto("/");
      const cover = (await page.locator(".cover").boundingBox())!;
      const strip = (await page.locator(".cover .strip").boundingBox())!;
      const lines = page.locator(".cover .cl");
      await expect(lines).toHaveCount(4);
      for (let i = 0; i < 4; i++) {
        await expect(lines.nth(i)).toBeVisible();
        const b = (await lines.nth(i).boundingBox())!;
        expect(b.y).toBeGreaterThanOrEqual(strip.y + strip.height);
        expect(b.y + b.height).toBeLessThanOrEqual(cover.y + cover.height);
      }
  };

  // Browser zoom shrinks the viewport in CSS pixels: 1536x864 at 125/150/175/200%, a narrow side pane, a small phone.
  for (const [w, h] of [[1229, 691], [1024, 576], [878, 494], [768, 432], [700, 800], [1440, 900], [360, 640]]) {
    test(`at ${w}x${h} every cover headline is shown in full`, async ({ page, isMobile }) => {
      test.skip(isMobile, "viewport sizes set by hand");
      await page.setViewportSize({ width: w, height: h });
      await allCoverHeadlinesShown(page);
    });
  }

  test("on phones every cover headline is shown in full", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone devices");
    await allCoverHeadlinesShown(page);
  });

  test("the cover says what he does", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".cover")).toContainText("AI & Automation Intern at Growthvine Capital");
    // Site and CV must describe the role the same way.
    await expect(page.locator("#short")).toContainText("AI & Automation Intern at Growthvine Capital");
  });

  test("shares with a preview card and its own tab icon", async ({ page, request }) => {
    await page.goto("/");
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toMatch(/og\.png$/);
    expect((await request.get("/og.png")).ok()).toBeTruthy();
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const icon = await page.locator('link[rel="icon"]').first().getAttribute("href");
    expect(icon).toContain("icon");
  });

  test("box office shows real commit counts for every title", async ({ page }) => {
    await page.goto("/");
    const rows = page.locator("#boxoffice tbody tr");
    expect(await rows.count()).toBeGreaterThanOrEqual(10);
    await expect(page.locator("#boxoffice")).toContainText("253");
    await expect(page.locator("#boxoffice")).toContainText("commits");
  });

  test("commentary is off by default and the header toggles it", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#feature .comment")).toBeHidden();
    await page.locator("#feature").scrollIntoViewIfNeeded();
    const t = page.getByRole("button", { name: /Commentary/ });
    await expect(t).toHaveAttribute("aria-pressed", "false");
    await t.click();
    await expect(t).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#feature .comment")).toBeVisible();
    await expect(page.locator("#feature .comment")).toContainText("unit test");
  });

  test("on phones the Reels menu lists every section", async ({ page, isMobile }) => {
    test.skip(!isMobile, "phone layout only");
    await page.goto("/");
    await page.locator("#feature").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Reels" }).click();
    const sheet = page.getByRole("dialog", { name: "Reels" });
    await expect(sheet).toBeVisible();
    await sheet.getByRole("link", { name: /the agent/i }).click();
    await expect(sheet).toBeHidden();
    await expect(page.locator("#agent")).toBeInViewport();
  });

  test("a one-time callout explains the commentary track", async ({ page }) => {
    await page.goto("/#feature");
    const tip = page.getByRole("dialog", { name: "Commentary track" });
    await expect(tip).toBeVisible({ timeout: 3000 });
    await tip.getByRole("button", { name: "Turn it on" }).click();
    await expect(tip).toBeHidden();
    await expect(page.locator("#feature .comment")).toBeVisible();
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Commentary track" })).toBeHidden();
  });

  test("on laptops the two-doors diagram shares its row with the opening words", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop layout");
    await page.setViewportSize({ width: 1366, height: 800 });
    await page.goto("/");
    const fig = (await page.locator(".platform .doors").boundingBox())!;
    const lede = (await page.locator(".platform .opening .lede").boundingBox())!;
    expect(lede.x).toBeGreaterThan(fig.x + fig.width - 1);
    expect(Math.abs(lede.y - fig.y)).toBeLessThan(fig.height);
  });

  test("on desktop the making-of card is fully in view beside the bloopers", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop layout");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.querySelector(".bloopers .takes")!.scrollIntoView());
    const box = await page.locator(".bloopers .vslot").evaluate((e) => { const r = e.getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; });
    expect(box.top).toBeGreaterThanOrEqual(-1);
    expect(box.bottom).toBeLessThanOrEqual(901);
  });

  test("no sideways scroll", async ({ page }) => {
    await page.goto("/");
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over).toBeLessThanOrEqual(0);
  });
});

test.describe("cv", () => {
  test("a plain, printable CV page with the facts", async ({ page }) => {
    await page.goto("/cv");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Himanshu");
    for (const t of ["AI & Automation Intern", "Growthvine Capital", "Mathematics & Computing", "280+ clients", "LLM4S", "Samanvay", "Support Triage Agent", "The Big Code 2026", "Building in Production"])
      await expect(page.locator("main")).toContainText(t);
    const cvText = await page.locator("body").innerText();
    expect(cvText).not.toContain("98173"); // phone stays off the public web
    expect(cvText).not.toMatch(/CGPA|Class XII|Class X /); // off-campus application: no grades
    await expect(page.getByRole("link", { name: "himanshu1908999@gmail.com" })).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text).not.toContain("—");
  });

  test("the CV prints on one A4 page", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "PDF printing is Chromium-only in Playwright");
    await page.goto("/cv");
    const pdf = (await page.pdf({ format: "A4" })).toString("latin1");
    expect(pdf.match(/\/Type\s*\/Page[^s]/g)?.length).toBe(1);
  });

  test("a real one-page PDF CV is one click away", async ({ page, request }) => {
    await page.goto("/cv");
    const dl = page.getByRole("link", { name: /Download PDF/ });
    await expect(dl).toHaveAttribute("href", "/himanshu-cv.pdf");
    const res = await request.get("/himanshu-cv.pdf");
    expect(res.headers()["content-type"]).toContain("pdf");
    const pdf = (await res.body()).toString("latin1");
    expect(pdf.match(/\/Type\s*\/Page[^s]/g)?.length).toBe(1);
  });

  test("/resume is the CV too", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Himanshu");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/cv$/);
  });

  test("a wrong address gets a themed page with a way back", async ({ page }) => {
    const res = await page.goto("/no-such-reel");
    expect(res!.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /Reel not found/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to the issue/i })).toHaveAttribute("href", "/");
    await expect(page.getByRole("link", { name: /^CV$/ })).toHaveAttribute("href", "/cv");
  });

  test("the CV PDF is not older than the CV page (rerun npm run cv:pdf)", async () => {
    const pdf = statSync("public/himanshu-cv.pdf").mtimeMs;
    for (const src of ["app/cv/page.tsx", "app/cv/cv.css"]) expect(pdf).toBeGreaterThan(statSync(src).mtimeMs - 1);
  });

  test("the fact file links to the CV", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#short").getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv");
  });
});

test.describe("accessibility (WCAG A/AA, axe)", () => {
  test("the intro has no violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Who's in the audience tonight?" })).toBeVisible();
    // Wait for the title card's fade-in, or axe measures half-transparent text.
    await page.waitForFunction(() => document.querySelector(".titlecard")!.getAnimations().every((a) => a.playState === "finished"));
    expect((await axe(page)).violations.map((v) => v.id)).toEqual([]);
  });

  test.describe("page", () => {
    test.use({ reducedMotion: "reduce" });
    for (const [name, path, comm] of [["magazine", "/", false], ["magazine with commentary", "/", true], ["cv", "/cv", false], ["404", "/no-such-reel", false]] as const) {
      test(`${name} has no violations`, async ({ page }) => {
        await page.goto(path);
        if (comm) { await page.evaluate(() => localStorage.setItem("commentary", "1")); await page.reload(); }
        expect((await axe(page)).violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
      });
    }
  });
});

test.describe("header at laptop widths", () => {
  test.use({ reducedMotion: "reduce" });
  for (const width of [1024, 1180, 1280, 1440, 1920]) {
    test(`never clips links at ${width}px`, async ({ page, isMobile }) => {
      test.skip(isMobile, "desktop widths");
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/#agent");
      await expect(page.getByRole("navigation", { name: "Sections" })).toBeVisible();
      const row = page.locator(".rh-links");
      if (await row.isVisible()) {
        const fits = await row.evaluate((e) => e.scrollWidth <= e.clientWidth);
        expect(fits).toBe(true);
      } else {
        await expect(page.getByRole("button", { name: "Reels" })).toBeVisible();
      }
    });
  }
});

test.describe("writing", () => {
  test.use({ reducedMotion: "reduce" }); // start past the curtain
  test("the essay and CV preview as themselves when shared", async ({ page }) => {
    await page.goto("/writing/dangerous-failures");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /dangerous failures/);
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
    expect(ld["@type"]).toBe("Article");
    expect(ld.author.name).toBe("Himanshu");
    await page.goto("/cv");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Himanshu, CV");
  });

  test("the lead essay is readable in full on the site", async ({ page }) => {
    await page.goto("/");
    await page.locator(".clipping.lead").getByRole("link", { name: /Read the essay/ }).click();
    await expect(page).toHaveURL(/\/writing\/dangerous-failures/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The dangerous failures don't throw");
    await expect(page.locator("article")).toContainText("Editors forgive an empty search.");
    await expect(page.locator("article .checklist li")).toHaveCount(6);
    const text = await page.locator("body").innerText();
    expect(text).not.toContain("—");
    expect(text).not.toContain("�");
    expect(text).not.toMatch(/\w : /);
    expect((await axe(page)).violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("copy rules on every page", () => {
  test.use({ reducedMotion: "reduce" });
  for (const path of ["/", "/cv", "/resume", "/writing/dangerous-failures", "/no-such-reel"]) {
    test(`${path}: no em-dashes, just Himanshu, no stale names`, async ({ page }) => {
      await page.goto(path);
      const text = await page.locator("body").innerText();
      expect(text).not.toContain("—");
      expect(text).not.toContain("Himanshu Mann");
      expect(text).not.toContain("Who's watching");
      expect(text).not.toContain("AGENNTT");
      expect(text).not.toContain("�");
    });
  }
});
