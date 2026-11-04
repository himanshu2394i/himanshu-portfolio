// "The dangerous failures don't throw", by Himanshu. His text, set in type: headings, the pull line and the
// checklist are marked up; the only edits are two "word : word" spacing slips closed up.
export type Block = { t: "p" | "h" | "pull"; text: string } | { t: "list"; items: string[] };

export const essay = {
  slug: "dangerous-failures",
  title: "The dangerous failures don't throw. They report success and commit the wrong fact.",
  dek: "A deploy that shipped nothing, twice. A query that could never match. What a system should be allowed to claim without proving.",
  words: 1392,
  blocks: [
  {
    "t": "p",
    "text": "I deployed the same service twice in one night and believed it both times. Neither deploy shipped anything. The live image was a week old the entire session: every fix I had written and verified that night was sitting in source, passing its unit tests and never once reaching the running service."
  },
  {
    "t": "p",
    "text": "The cause was four layers deep and entirely boring. A dependency with no pinned version pulled a newer release. That release wanted a library version that conflicted with one the agent framework needs, so pip install failed. The Docker build step exited non-zero. And PowerShell does not treat a failed external program as a terminating error. $ErrorActionPreference does not catch it. So the deploy script carried on: it wired up environment variables, re-granted permissions, and pointed all of it at whatever image was already live. Then it reported success."
  },
  {
    "t": "p",
    "text": "Nothing was down. Nothing threw. The script committed a fact that was false: this version is deployed. It took a judge-facing demo to notice."
  },
  {
    "t": "p",
    "text": "Same project, one layer up, the same shape of bug. A model watches film dailies and logs every clip into ClickHouse: who is on camera, time of day, shot size, what happens. An agent queries those same rows for an editor. Ask it about a person who is not in the screenplay and the query failed eleven times out of twelve, not with an error, but with an empty result. The agent filtered on has(characters, 'Name'), and that array is only ever populated from the project's vocabulary, which comes from the screenplay. A name the vocabulary never wrote there can never match, by construction, no matter who is actually on camera. Valid query, valid index, zero rows, every health check green."
  },
  {
    "t": "p",
    "text": "Two different layers, two unrelated root causes, one signature: the system did exactly what it was told and recorded something untrue."
  },
  {
    "t": "h",
    "text": "Why this is last issue's bug"
  },
  {
    "t": "p",
    "text": "What connects these failures is not the mechanism. One was a deployment script swallowing a failed build. The other was a query whose vocabulary made the right answer impossible. Neither is a distributed-identity problem."
  },
  {
    "t": "p",
    "text": "The connection is what the system was allowed to claim without proving."
  },
  {
    "t": "p",
    "text": "The deployment pipeline was allowed to claim that a version was live without verifying the image that was actually running. The agent was allowed to claim it had answered a question without establishing that its vocabulary could represent the person being queried. In both cases, the system's output looked valid, but the condition that made it true had never been established."
  },
  {
    "t": "p",
    "text": "Identity merging is the same problem with a much higher cost of being wrong. Last time I wrote about two citizen records fused into one, and no deploy rolls that back. A system can successfully execute a merge while having no reliable basis for deciding that two records belong to the same person."
  },
  {
    "t": "p",
    "text": "These are different failures, and they need different technical fixes. But they expose the same design question: who owns the decision, and what must be true before the system is allowed to commit to it?"
  },
  {
    "t": "pull",
    "text": "Errors you can page on. Silent success you find out about from a user."
  },
  {
    "t": "p",
    "text": "Inside a company you are rarely merging citizens. You are merging decisions: who is this user, are they allowed in, what price applies, was this payout already sent. Copy that logic into four services and you do not get flexibility. You get four ways to be wrong, and whoever is on call cannot tell which copy fired."
  },
  {
    "t": "p",
    "text": "A shared capability is only worth the organizational pain when a wrong decision is irreversible, or expensive enough that you would treat it as irreversible. Everything else can stay duplicated until it hurts."
  },
  {
    "t": "h",
    "text": "When one place should own the decision"
  },
  {
    "t": "p",
    "text": "Centralize when the outcome commits something: money, legal state, an identity link, an audit record, or a label someone will trust weeks later. Centralize when two implementations of the same rule will drift apart, which they will, usually because of different deadlines rather than different intent. Centralize when you need one answer to \"what did we believe at time T?\""
  },
  {
    "t": "p",
    "text": "Hold off when stale reads are acceptable and labeled as such, when it is workflow glue that changes every quarter, or when there is no second consumer on the roadmap."
  },
  {
    "t": "p",
    "text": "The test is not DRY. It is this: if two teams disagree on the output, does someone get hurt before anyone notices?"
  },
  {
    "t": "h",
    "text": "Three layers"
  },
  {
    "t": "p",
    "text": "For capabilities where the answer commits something, put the gate in three places."
  },
  {
    "t": "p",
    "text": "The service layer refuses illegal transitions through a state machine, not a single threshold. The storage layer makes illegal states hard to represent through constraints and a single write path. And for the genuinely irreversible steps (merging identities, merging accounts, releasing payouts), there is an explicit gate: logged, scoped to a role, and deliberately not a generic admin flag sitting on whichever service happened to be convenient."
  },
  {
    "t": "p",
    "text": "Discovery can be automated. The irreversible step should not be reachable just because a downstream team added a shortcut."
  },
  {
    "t": "h",
    "text": "The dailies fix: one contract both sides read"
  },
  {
    "t": "p",
    "text": "Better prompts were not the fix. The fix was making both sides read the same contract."
  },
  {
    "t": "p",
    "text": "The screenplay produces a per-project vocabulary. That vocabulary is the closed set of allowed values when a clip is logged, and the only set the agent is permitted to filter on. A single table of field definitions generates three things that used to be written by hand: the response schema the model must fill in, the database table definition, and the agent's prompt. A test fails if the field names drift between the side that writes and the side that reads."
  },
  {
    "t": "p",
    "text": "Then the rule that matters most. When someone is on camera but not in the script, the logger must not invent a cast name to satisfy the schema. Enums are allowed to return \"unknown\", and the free-text action line still records what was actually seen."
  },
  {
    "t": "p",
    "text": "Editors forgive an empty search. They do not forgive the wrong actor on a take. That trust is gone even though the row itself is perfectly updatable."
  },
  {
    "t": "p",
    "text": "What finally localized the eleven-of-twelve failure was the agent's own evidence ledger: zero steps on every failing attempt. It had never called the deterministic tools at all. It went straight to hand-written SQL, where a buried paragraph of prose policy competes with the model's judgment on every call. You cannot debug a decision you did not record."
  },
  {
    "t": "h",
    "text": "What dependents need"
  },
  {
    "t": "p",
    "text": "Give callers a versioned contract. Additive fields are fine, but a change in what a field means needs a new version or a dated flag. Return reason codes rather than booleans, because \"denied\" tells on-call nothing and \"denied: entitlement expired 3d ago\" ends the investigation. And document the failure mode once, for everyone: does this refuse all requests when it cannot reach its data, or does it serve a degraded answer? One matrix, all callers, no per-team guessing."
  },
  {
    "t": "p",
    "text": "If your product services still embed the rule, you do not have a capability. You have an unpublished library."
  },
  {
    "t": "h",
    "text": "Adoption without the initiative speech"
  },
  {
    "t": "p",
    "text": "Delete the duplicate. Grep for the old rule and make CI fail if it comes back, because an alternate implementation left in the tree is an alternate implementation people will keep using. Use credentials rather than lectures: if only service X may write table Y, no other service gets access to Y. Name incidents by capability, so it is \"entitlement drift\" and not \"checkout bug.\" And find a second consumer before any roadmap theater. One team proves the contract works, two teams prove you did not quietly bake in one team's quirks."
  },
  {
    "t": "h",
    "text": "The checklist"
  },
  {
    "t": "p",
    "text": "This is the part worth keeping somewhere you can find it:"
  },
  {
    "t": "list",
    "items": [
      "In one sentence, what single decision does this own?",
      "Is a wrong answer irreversible? If not, stop centralizing.",
      "List every write path, then kill the extras.",
      "Set a contract version and a sunset rule for the old one.",
      "Does it fail closed or degrade? Who gets paged?",
      "Define a scope fence: what must never be added to this service."
    ]
  },
  {
    "t": "h",
    "text": "Close"
  },
  {
    "t": "p",
    "text": "Catalogs and gateways are the visible part of distributed systems. What survives production is the gate in front of an irreversible commit, and one place for that gate to live when everyone else would happily reimplement it."
  }
] as Block[],
};
