// All the words on the site live here, so stories can be edited without touching components.
// Facts come from content.md (read from the code and git history). Keep it that way: no invented numbers.

// Your recordings. Drop a file in public/video/ and put its path here ("/video/making-of.mp4");
// an empty string shows the "Now filming" card instead of a player.
export const videos: Record<string, string> = {
  making: "",
  words: "",
  again: "",
  typing: "",
  form: "",
  tone: "",
};

export const site = {
  // Set NEXT_PUBLIC_SITE_URL at deploy time (no trailing slash) so share cards, sitemap and robots use the real address.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  name: "Himanshu",
  title: "HIMANSHU, the cinema issue",
  description:
    "Himanshu builds things until they break, then figures out why. A film magazine about pipelines, agents and one very confident deploy script.",
  role: "AI & Automation Intern at Growthvine Capital. Maths and Computing at DTU. Builds AI systems that handle real people's money.",
  email: "himanshu1908999@gmail.com",
  linkedin: "https://www.linkedin.com/in/himanshu-mann-143834316/",
  github: "https://github.com/himanshu2394i",
};

// The commentary track: what each section shows about me, in one plain line. Off by default; the Recruiter seat turns it on.
export const commentary: Record<string, string> = {
  origin: "Learns in depth on his own: from dabbling to reading the docs, building a RAG engine and learning Scala to contribute.",
  feature: "Debugs across components: found a failure no unit test could see, because every piece passed its own unit test. Fixed it with a replay test.",
  wall: "Takes review well: two rejected pull requests, then a merged one. Everything in the locker below is public.",
  platform: "Owned a platform end to end for a real business: data, APIs, web, mobile and AWS, for about five months.",
  agent: "Careful with AI where money is involved: the code computes the numbers, the model only phrases them, and every figure is checked.",
  boxoffice: "Ships a lot, across a wide range: around 1,900 commits over 11 systems, from data pipelines to a mobile app.",
  growth: "Thinks like a growth engineer: a campaign built from his own use of the product, with what to measure.",
  flat: "Doesn't take himself too seriously. The work, yes. Himself, no.",
};

// Verbatim fragments from maintainers' GitHub reviews (checked with gh). Code formatting dropped, words untouched.
export const reviews = [
  { quote: "Great work addressing the feedback.", who: "rorygraves", role: "llm4s reviewer, approving", pr: 691 },
  { quote: "Clean Either-based flow with no throw, correct error mapping across all status codes.", who: "rorygraves", role: "llm4s reviewer", pr: 691 },
  { quote: "Correct fix for issue #427.", who: "rorygraves", role: "llm4s reviewer, approving", pr: 663 },
  { quote: "Poor execution.", who: "vim89", role: "llm4s reviewer, two PRs earlier", pr: 648 },
];

export const factFile = {
  facts: [
    ["Now", "AI & Automation Intern at Growthvine Capital, a SEBI-registered mutual fund advisory in Gurugram, since 20 May 2026. Its tech for 280+ clients."],
    ["Studying", "B.Tech, Mathematics and Computing, Delhi Technological University (DTU), 2024 to 2028."],
    ["Applying for", "Growth team internship, Wispr Flow India."],
    ["Works in", "Go, Python, FastAPI, React Native, Postgres, Redis, AWS (ECS, Lambda, SQS, EventBridge), Claude and MCP. Scala for open source."],
  ] as [string, string][],
  wins: [
    { stat: "5 min to 30 sec", text: "Fund analysis for advisors, after I built a data layer, a Go API and an MCP server so they could just ask Claude.", href: "#boxoffice" },
    { stat: "Statement to story", text: "An investor imports their MF Central statement once and gets a story about their own money, with a health score. Onboarding and activation in one path.", href: "#platform" },
    { stat: "167 tests", text: "A retail AI assistant that checks every number against real data before it answers. It is not allowed to guess.", href: "#agent" },
    { stat: "Say it once", text: "My pitch for growing Wispr Flow in India: a split-screen series, normal voice typing vs Flow, one everyday pain per episode.", href: "#growth" },
  ],
  also: "Merged open-source work in llm4s (after two rejections), hackathon builds, top 15,000 in The Big Code 2026 by Google, 230th in HackerRank Orchestrate's AI Agent track, and the \"Building in Production\" newsletter.",
};

export type Profile = { letter: string; label: string; target: string; tone: "gold" | "red" | "cream" | "smoke"; commentary?: boolean };
export const profiles: Profile[] = [
  { letter: "R", label: "Recruiter", target: "#short", tone: "gold", commentary: true },
  { letter: "E", label: "Engineer", target: "#feature", tone: "red" },
  { letter: "G", label: "Growth team", target: "#growth", tone: "cream" },
  { letter: "B", label: "Just browsing", target: "", tone: "smoke" },
];

export const coverLines = [
  { kick: "WORLD EXCLUSIVE", big: ["The heist where every piece was ", "correct"], small: "How a trading agent bought AAPL twice", href: "#feature" },
  { kick: "ON SET", big: ["One person, ", "two doors"], small: "The platform behind a wealth firm, built in five months", href: "#platform" },
  { kick: "BOX OFFICE", big: ["5 minutes to ", "30 seconds"], small: "The sleeper hit advisors can't stop using", href: "#boxoffice" },
  { kick: "CONFESSIONS", big: ['"We\'re in ', 'therapy"'], small: "On a complicated relationship with AI", href: "#agent" },
];

export const programme = [
  { reel: 0, href: "#short", title: "The short version", text: "One page for recruiters: role, proof, stack, contact." },
  { reel: 1, href: "#origin", title: "The origin", text: "Five languages, finished none. Then AI engineering, a RAG engine and learning Scala to read someone else's code." },
  { reel: 2, href: "#feature", title: "The heist plan", text: "The trading agent where every part worked and the whole thing still broke." },
  { reel: 3, href: "#wall", title: "Now showing", text: "Four true stories as posters. Click one and it screens." },
  { reel: 4, href: "#platform", title: "On set: Growthvine", text: "Data, an API, MF Central, a story for every investor, and one login for app and web." },
  { reel: 5, href: "#agent", title: "The agent", text: "An AI assistant with real people's money in it, and the rules that keep it honest." },
  { reel: 6, href: "#boxoffice", title: "Box office", text: "What it changed, in numbers." },
  { reel: 7, href: "#growth", title: "The marketing department", text: "How I'd grow Wispr Flow in India: Say it once." },
  { reel: 8, href: "#flat", title: "Behind the scenes", text: "The flat where it was all shot, and DTU myths, fact-checked." },
  { reel: 9, href: "#bloopers", title: "Bloopers and the critics", text: "How this was built by voice, and what I write." },
];

export const directorsNote =
  "I build things until they break, then figure out why, then break them again somehow. Maths and Computing at DTU, engineer at Growthvine Capital, and now that guy with opinions about concurrency at 1 a.m.";

export const origin = [
  { year: "First year", title: "Five languages, finished none", text: "I joined DTU wanting to build things. Like most first-years I started a new language every few weeks and finished none of them. Curious, easily pulled sideways." },
  { year: "Then", title: "Found depth in AI engineering", text: "A senior showed me LLM systems and RAG. I made myself a roadmap and read documentation for fun: OpenAI, Anthropic, all of it." },
  { year: "First build", title: "A RAG engine", text: "Hybrid search, reranking, a fallback to a local model, memory and evals. Building a chatbot is easy. Making it as good as you want is the hard part, and for that you need evaluation." },
  { year: "Feb 2026", title: "Learned Scala to read code", text: "I wanted to contribute to llm4s, a Scala library for LLM systems. I learned Scala so I could read the codebase myself instead of asking an AI what every line does." },
  { year: "20 May 2026", title: "Real people's money", text: "I joined Growthvine Capital, a wealth firm in Gurugram. I'm still there. The scope kept growing from what tech could help with to what it could do." },
  { year: "Aug to Sep 2026", title: "Two hackathons", text: "An autonomous options trader for the lablab.ai and Alpaca hackathon, and a dailies assistant for film editors. Both public. Both broke in ways worth writing about." },
  { year: "Oct 2026", title: "An agent with guardrails", text: "A retail AI assistant for real investors at Growthvine: every number traced to real data before it answers, 167 tests that run offline." },
  { year: "Nov 2026", title: "This issue, by voice", text: "Built by talking to Wispr Flow instead of typing. You're reading it now." },
];

export const heist = {
  deck: "For a hackathon I built an autonomous options trader. Three days in, it bought AAPL twice and told nobody.",
  paras: [
    "Claude decides which trades to take. A separate deterministic risk layer decides whether it's allowed to. Once it's live, nobody touches it. I assumed the hard part would be the strategy. It wasn't.",
    "The screener flagged AAPL again while a position was already open. The first order didn't fill, so the retry went in at a slightly worse price, like it was built to. It filled. My database refused to record it, correctly, because the row already existed.",
    "A real position with no stop loss and nothing watching it. Every piece did its job. They were never asked what happens if they're called twice. Fixed the same day, with a test that replays the exact sequence.",
  ],
  pull: '"The gap was between two correct pieces."',
};

export type Receipt = { label: string; href: string };
export type Film = { key: string; title: string; badge: string; top: string; tag: string; credits: string; reel: string; body: string[]; style: "p1" | "p2" | "p3" | "p4"; receipts: Receipt[] };
export const films: Film[] = [
  { key: "double", style: "p1", title: "The Double", badge: "Hackathon", top: "One market. One retry.", tag: "It bought AAPL twice. Nobody noticed.", credits: "Starring Claude, a risk layer and one retry.",
    reel: "The lablab.ai and Alpaca trading agents hackathon.",
    receipts: [{ label: "The repo: Alpaca", href: "https://github.com/himanshu2394i/Alpaca" }],
    body: ["Claude picks the trade, a deterministic risk layer decides whether it's allowed.", "Before the AAPL double there was a websocket that stayed connected for nineteen hours and received nothing, because the library's data timeout was off by default. Then a reconnect loop that locked itself out by retrying every five seconds.", "Every one of these looked healthy from the outside. That's the pattern I keep meeting."] },
  { key: "rejected", style: "p2", title: "Rejected Twice", badge: "Open source", top: "A story of persistence", tag: '"Poor execution. Strictly request changes."', credits: "PR #573. PR #648. And then, #691.",
    reel: "llm4s, an open-source Scala library for LLM systems.",
    receipts: [{ label: "PR #573 (closed)", href: "https://github.com/llm4s/llm4s/pull/573" }, { label: "PR #648 (closed)", href: "https://github.com/llm4s/llm4s/pull/648" }, { label: "PR #691 (merged)", href: "https://github.com/llm4s/llm4s/pull/691" }],
    body: ["The first pull request bundled three unrelated changes, didn't compile, had no tests and leaked raw API responses into error messages.", "The second left merge-conflict markers in the code.", "The third shipped with eleven tests and errors returned as values: \"Ready to merge, great work addressing the feedback.\" My conflict fix almost deleted six features someone else had shipped. Reviews taught me what production code means."] },
  { key: "thirty", style: "p3", title: "Thirty Seconds", badge: "Growthvine", top: "Faster than ever", tag: "It used to take five minutes.", credits: "A data layer, a Go API and an MCP server.",
    reel: "Growthvine Capital, Gurugram.",
    receipts: [{ label: "On set: Growthvine (private code, shown here)", href: "#platform" }, { label: "Box office", href: "#boxoffice" }],
    body: ["Advisors researched funds in a dashboard with too much data to dig through.", "I put an MCP server on top of the Data API, with filters, so the AI asks for exactly what it needs.", "A fund analysis went from five or six minutes to thirty or forty seconds. Advisors now just ask Claude."] },
  { key: "success", style: "p4", title: "It Said Success", badge: "Agent-Cinema", top: "Based on true events", tag: "The deploy reported success. Twice. It shipped nothing.", credits: "Featuring PowerShell as the liar.",
    reel: "Agent-Cinema, a dailies assistant for film editors.",
    receipts: [{ label: "The repo: Agent-Cinema", href: "https://github.com/himanshu2394i/Agent-Cinema" }],
    body: ["The screenplay is the schema: each production gets its own vocabulary, and the same vocabulary controls what the logger writes and what the agent may search.", "One night I deployed twice and believed it both times. A dependency with no pinned version broke every build, and PowerShell doesn't stop when an external program fails, so the script reported success.", "Editors forgive an empty search. They do not forgive the wrong actor on a take."] },
];

// Public work anyone can open. Growthvine's code is private, so it isn't listed.
export const evidence: { label: string; note: string; href: string }[] = [
  { label: "Alpaca", note: "Autonomous options trader. Claude decides, a risk layer vetoes.", href: "https://github.com/himanshu2394i/Alpaca" },
  { label: "Agent-Cinema", note: "Dailies triage: Gemini logs takes into ClickHouse, editors ask in plain English.", href: "https://github.com/himanshu2394i/Agent-Cinema" },
  { label: "llm4s PR #691", note: "Stability AI provider, merged on the third try.", href: "https://github.com/llm4s/llm4s/pull/691" },
  { label: "llm4s PR #663", note: "Fixed resource leaks in Gemini and OpenRouter streaming. Merged.", href: "https://github.com/llm4s/llm4s/pull/663" },
  { label: "Advanced RAG Engine", note: "Hybrid search, reranking, a local-model fallback and LLM-as-judge evals.", href: "https://github.com/himanshu2394i/Advanced-RAG-Engine-" },
  { label: "Kerno", note: "Incident diagnosis with eBPF across Linux, Kubernetes and VMs.", href: "https://github.com/himanshu2394i/kerno" },
];

export const platform = {
  intro: "Growthvine had a website. For everything it wanted to build on top, nothing existed. This is what got built, and how it fits together.",
  doors: ["Mobile app", "app.growthvine.in"],
  owners: [
    { name: "Risk profile", note: "a quiz, one at a time" },
    { name: "Financial plan", note: "goals, SIPs, a PDF" },
    { name: "MF Central CAS", note: "every fund house" },
    { name: "Investments", note: "made in the app" },
    { name: "Alerts", note: "nightly fund rules" },
    { name: "Reports", note: "monthly, for clients" },
  ],
  storyChapters: [
    "Where you stand",
    "How you got here",
    "Your habits",
    "How it's working",
    "Your set-up",
    "Your health score",
    "Your funds",
    "What's worth a look",
    "Where this goes",
  ],
  archetypes: ["The Steady Builder", "The Active Manager", "The Concentrated Believer", "The Collector", "The Lump-Sum Investor", "The Balanced Investor", "The Focused Holder"],
  storyRules: [
    "Numbers are computed in code: money-weighted returns on real cash flows, and what an index fund would have done with the same rupees.",
    "Claude rewrites the wording only. Every rewritten line must pass a check, or the plain version stays.",
    "It never tells anyone to buy or sell a named fund.",
    "Withdrawing consent deletes the imported data.",
  ],
  callsheet: [
    ["Data", "Free sources first, then a vendor and pipelines for the gaps. Files read by column name, never by position."],
    ["Layer", "An event-based data layer: each calculation reruns only when its inputs change, with an alert on every pipeline."],
    ["API", "One Data API in Go for every product: auth, rate limits, token exchange."],
    ["AI", "An MCP server on top, so advisors just ask Claude."],
    ["Infra", "AWS: one load balancer for every subdomain, ECS, Lambda, SQS queues, EventBridge schedules."],
    ["Login", "One login for app and web, so the same person sees the same data everywhere."],
  ] as [string, string][],
  mobile: "In the app I built the home hub, activity feed, MF Central import, portfolio checks, the planner, fund pages with Follow and alerts, share with my advisor, and privacy and consents.",
};

export const agent = {
  intro: "A chat assistant for people's own money. It knows their risk profile, their plan and their portfolio, and it is not allowed to guess.",
  turn: ["Guard", "Plan", "Context", "Tools", "Guard", "Save"],
  facts: [
    ["Two modes", "General for research and calculators. My portfolio unlocks only after a statement is imported."],
    ["Tools", "Finance calculators, 31 fund-data tools over MCP, the user's own plan and portfolio, read with their own sign-in."],
    ["Model gateway", "A chain of models with retries and fallbacks, rate and token limits."],
    ["Verify", "Every number in an answer is traced back to real data before it leaves."],
    ["Live judge", "A sample of real answers gets graded, so quality is measured, not assumed."],
    ["Tests", "167 tests that run with no network and no API key."],
  ] as [string, string][],
  lessons: [
    { q: "The model writes prose, never arithmetic that matters.", n: "Code computes every figure. The model only phrases it." },
    { q: "Absence is not an observation.", n: "A lapsed SIP once became \"you invest nothing.\" Unit tests were green through all of it." },
    { q: "A negative claim needs a request that could have returned the thing.", n: "I claimed a statement had no transactions. My test request had empty dates. With dates: 10,222 rows." },
  ],
  bug: { said: "eighteen lakh", real: "₹55,83,450", text: "My number check only read digits, so a figure written in words was invisible to it. Now the model must use numerals, and spelled-out amounts are rejected." },
};

// Gross = commits I authored (from git history). approx where the count is rounded.
export const boxOffice: { title: string; what: string; studio: string; commits: number; approx?: boolean; verdict: string }[] = [
  { title: "The Backend", what: "App and platform APIs, reports, alerts, login", studio: "Growthvine", commits: 676, approx: true, verdict: "Two repos, still shipping" },
  { title: "The Data Layer", what: "Fund analytics, event-based reruns", studio: "Growthvine", commits: 253, verdict: "Still running" },
  { title: "Thirty Seconds", what: "Data API in Go, then the MCP server", studio: "Growthvine", commits: 191, verdict: "Advisors' favourite" },
  { title: "Monthly Reports", what: "Two-page client review, emailed", studio: "Growthvine", commits: 164, approx: true, verdict: "Every month, on time" },
  { title: "The Planner", what: "Goal-based SIP engine and plan PDF", studio: "Growthvine", commits: 157, verdict: "System of record" },
  { title: "The First Agent", what: "The client agent before the retail one, and its lessons", studio: "Growthvine", commits: 124, verdict: "Taught me everything" },
  { title: "The Platform", what: "app.growthvine.in, built from scratch", studio: "Growthvine", commits: 100, approx: true, verdict: "One login, two doors" },
  { title: "It Said Success", what: "Dailies assistant for film editors", studio: "Agent-Cinema hackathon", commits: 86, verdict: "Cult classic" },
  { title: "The Double", what: "Autonomous options trader", studio: "lablab.ai x Alpaca", commits: 82, verdict: "Fixed, same day" },
  { title: "The Portfolio Story", what: "MF Central statement to a story", studio: "Growthvine", commits: 52, verdict: "Every investor gets one" },
  { title: "The Retail Agent", what: "Guardrails, verify step, 167 tests", studio: "Growthvine", commits: 32, verdict: "Not allowed to guess" },
];

export const growth = {
  insight: "Voice-to-text is everywhere now. Every AI app has a mic button. What makes Flow different is the context layer between your voice and the text: your dictionary, your snippets, your style. It's for the everyday stuff you're tired of doing again and again.",
  already: "Flow already launched in India with Hinglish and Android, put 100 branded autos on Bengaluru's roads, and released a brand film. So this isn't another awareness push.",
  campaign: "Say it once",
  endLine: "Normal voice typing hears you. Flow knows you.",
  episodes: [
    { key: "words", title: "Wrong words", normal: "I study at IITU and contribute to LLM Forest. It's a content slayer.", flow: "I study at DTU and contribute to llm4s. It's a context layer.", fix: "Dictionary: say it once, right forever." },
    { key: "again", title: "Again and again", normal: "my email is h i m a n s h u one nine zero eight nine nine nine at gmail dot com", flow: "my email is himanshu1908999@gmail.com", fix: "Snippets: say \"my email\" and it's there." },
    { key: "typing", title: "Typing it again", normal: "Hi, hope you're doing well. Following up on my last message about the… (typed for the 40th time)", flow: "Hi, hope you're doing well. Following up on my last message about the internship. Here's my portfolio.", fix: "Snippets for whole paragraphs." },
    { key: "form", title: "Wrong form", normal: "umm so basically like I wanted to say that uh the build is like done but uh", flow: "The build is done.", fix: "Clean-up: it writes what you meant." },
    { key: "tone", title: "Wrong tone", normal: "bro the report is late sorry will send by 5", flow: "Hi Priya, a quick heads-up: the report is running late. I'll send it by 5 p.m.", fix: "Styles: formal for one, casual for another." },
  ],
  why: [
    ["Relatable", "Everyone has rage-retyped a misheard word. People share what feels like their own life."],
    ["Teaches the product", "Each episode shows one feature, which answers \"why not use the free mic button?\""],
    ["Cheap and repeatable", "Phone screen recordings with real Indian names, colleges and Hinglish. Endless episodes."],
  ] as [string, string][],
  built: [
    ["Statement to story", "MF Central consent, then a statement, then a personal portfolio story with an archetype and a health score, which unlocks My portfolio in the app and the assistant. That is onboarding and activation."],
    ["One person, two doors", "One login across app and web, with what you see decided by who you are: retail investor or Growthvine client."],
    ["Honest unlocks", "The assistant never pushes people to an action they can't take yet. While the import wasn't live, it said so."],
    ["Reasons to come back", "Fund watch tells holders when a fund loses stars. Monthly reports arrive in the app."],
    ["This site", "The curtain asks who's in the audience and opens on a different section for each. One product, different journeys."],
  ] as [string, string][],
  whyGrowth: "At Growthvine the work that mattered most was never a model. It was the path a person walks: from a statement to a story to a reason to come back. That's growth work. I just did it as an engineer.",
  whyFlow: "I built this whole site by talking. Long, messy, full of context, and the answers got better because of it. A product that changed how I work is one I can sell honestly.",
  // The campaign, as a four-week shoot. Only the agreed metrics: installs per episode, week-one dictionary/snippet adoption.
  schedule: [
    { week: "Week 1", title: "Shoot the pilot", text: "Episode one from my own bloopers (DTU to IITU, llm4s to LLM Forest). One tracked install link per episode, so every number is attributable." },
    { week: "Week 2", title: "Cast the pains", text: "Record the other four on a phone with real Indian names, colleges and Hinglish: the Gmail spelled out again, the intro retyped again, the ramble, the wrong tone." },
    { week: "Week 3", title: "Release one a day", text: "Short split-screen cuts where people already watch: Reels, Shorts, LinkedIn. Read installs per episode every day." },
    { week: "Week 4", title: "Back the winner", text: "Rank episodes by the share of new users who add a dictionary word or snippet in week one. Make more of the winner, drop the rest." },
  ],
  proof: "Episode one is already real. These are my own bloopers from building this site by voice.",
};

export const bloopers = [
  ["DTU", "IITU"],
  ["llm4s", "LLM Forest"],
  ["CAS statement", "cash statement"],
  ["Claude session", "cloud session"],
  ["Samanvay", "Sonnet"],
  ["context layer", "content slayer"],
  ["tech stack", "text tag"],
  ["AMFI", "MF1"],
] as [string, string][];

// Verbatim excerpts of Himanshu's own dictated messages while building this site, and what each became.
export const voiceNotes = [
  { said: "Actually you should take inspiration from gangster movies, like the old ones, like The Godfather 1, The Godfather 2, and you remember.", became: "The cinema issue you're reading", href: "#top" },
  { said: "What do you think about if we add a kind of a college like feel to it, or you know, a bachelor's flat feel to it?", became: "Behind the scenes: the flat", href: "#flat" },
  { said: "we can show a person using voice-to-texting and getting wrong words into it and having to say out his Gmail and everything again and again.", became: "Say it once", href: "#growth" },
];

export const voice = {
  quote: "It makes me want to express myself more, have more opinions, and be more productive.",
  how: "Every page here was spoken, not typed. I talked through my story, my projects and every design change into Wispr Flow, straight into the AI I built it with. Long, messy, full of context, which is exactly what made the answers better.",
};

export const writing = [
  { kind: "Essay", title: "The dangerous failures don't throw. They report success and commit the wrong fact.", text: "A deploy that shipped nothing, twice. A query that could never match. What a system should be allowed to claim without proving.", lead: true, href: "/writing/dangerous-failures" },
  { kind: "Essay", title: "Every agent stack is rediscovering an enterprise integration problem", text: "Your context layer is an interoperability layer. What building for government departments taught me about agents, and why 97% sure is not sure enough." },
  { kind: "LinkedIn", title: "Every piece was correct. The gap was between them.", text: "The trading agent that bought AAPL twice." },
  { kind: "LinkedIn", title: "Agents aren't microservices with LLMs as workers", text: "Retries and rollbacks when the same input can give a different outcome." },
  { kind: "LinkedIn", title: "I optimized the wrong thing", text: "Weeks on OCR for an invoice system, when the real problem was workflow." },
  { kind: "LinkedIn", title: "AI in the pitch deck, and at 1 a.m.", text: "Not magic. Just solid engineering with a language model on top." },
];

export type Prop = { key: string; title: string; text: string };
export const props: Prop[] = [
  { key: "laptop", title: "The laptop", text: "Forty tabs, forty git worktrees, one AI agent in each. Somewhere in there is the deploy script that reported success twice and shipped nothing." },
  { key: "maggi", title: "The Maggi", text: "The 3 a.m. menu. Cooked while a websocket stayed connected for nineteen hours and received nothing. Both took two minutes, allegedly." },
  { key: "chai", title: "The chai", text: "Fuel for opinions about concurrency at 1 a.m. Usually in Go. Always too hot, always forgotten, always cold by the time the build passes." },
  { key: "attendance", title: "The attendance sheet", text: "Attendance: [REDACTED]. Withheld on legal advice. Present for every deploy, though." },
  { key: "phone", title: "The phone", text: "Tomorrow's viva, today, at 3.4× on YouTube Premium. At that speed the professor sounds like a podcast in fast-forward, and it still goes in." },
  { key: "fridge", title: "The fridge", text: "Contents: water bottles, one lemon, ketchup sachets, and a sticky note that says PR #691 merged. Third try. It stays up there." },
  { key: "calendar", title: "The calendar", text: "Every Monday circled. \"From Monday\" is a lifestyle. Hackathon deadlines are the only dates that actually get met." },
];

export const myths = [
  { title: "The 3 a.m. Maggi", text: "There is a Maggi stall near the main gate that stays open till 3 a.m. It has seen more of my debugging than any IDE.", stamp: "TRUE" },
  { title: "Bawana Road", text: "Not a location, a commute-based personality. You leave home a fresher and arrive a final-year.", stamp: "TRUE" },
  { title: '"Basically CS"', text: "Maths and Computing students say \"we're basically CS\" at least twice a day. I'm saying it right now.", stamp: "TRUE" },
  { title: "The night before", text: "The night before the exam is the semester. Lectures at 3.4× on YouTube Premium. Still understood.", stamp: "TRUE" },
  { title: "Engifest", text: "Running since 1974, and the one week the campus population exceeds the attendance register.", stamp: "TRUE" },
  { title: "The lake", text: "164 acres, and there is apparently a lake. Like a full-attendance final-year, many have heard of it.", stamp: "LEGEND" },
];

export const classifieds = [
  { tone: "red big", h: "Wanted: a growth team", t: "Engineer who builds the experiments, not just waits for the spec. Talks to AI agents all day. Based in Delhi, will travel. Box 01." },
  { tone: "", h: "For sale", t: "One deploy script. Reports success every time. Ships nothing. Free to a good home." },
  { tone: "gold", h: "Lost", t: "19 hours of market data. Websocket looked connected the whole time. Reward offered." },
  { tone: "", h: "Found", t: "The real problem with an invoice system. It was never the OCR. It was workflow and audit trails." },
  { tone: "inv", h: "Personal", t: "Me: builds things until they break. You: AI systems. I respect you. You humble me. We're in therapy." },
  { tone: "", h: "Notice", t: "Half of it worked the first time. I will not be taking questions on the other half." },
];

export const cast: { head: string; rows: [string, string][] }[] = [
  { head: "Starring", rows: [["Himanshu", "Himself"], ["Claude", "The Decision Layer"], ["A risk layer", "The One Who Checked Everything Else"], ["PowerShell", "The Liar"], ["A websocket", "Connected, For Nineteen Hours"]] },
  { head: "Supporting cast", rows: [["Go", "The 1 a.m. Concurrency Opinion"], ["Scala", "Learned Just To Read The Code"], ["The llm4s maintainers", "The Honest Critics"], ["Wispr Flow", "The Voice Behind Every Line"]] },
  { head: "Filmed on location", rows: [["Delhi Technological University", "Maths & Computing"], ["Growthvine Capital", "Gurugram, since 20 May"], ["A bachelor flat", "Delhi, mostly at 3 a.m."]] },
];
