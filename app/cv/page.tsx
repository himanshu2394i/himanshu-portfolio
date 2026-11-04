import type { Metadata } from "next";
import { site } from "@/lib/content";
import PrintButton from "./PrintButton";
import "./cv.css";
import { asset } from "@/lib/asset";
import Link from "next/link";

const description = "One-page CV: AI & Automation Intern at Growthvine Capital, Mathematics & Computing at DTU.";
export const metadata: Metadata = {
  title: "Himanshu, CV",
  description,
  openGraph: { title: "Himanshu, CV", description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
};

// Himanshu's own CV (HIMANSHU_24MC078_MCE.pdf), as text so it can be forwarded, printed and parsed by
// applicant tracking systems. The phone number is left off on purpose: this page is public.
const growthvine = [
  <><b>Architected</b> Growthvine&apos;s <b>entire tech infrastructure and AI integration</b> for <b>280+ clients</b>, covering <b>~9,000 mutual funds</b> with NAV history since 2019.</>,
  <><b>Cut</b> advisors&apos; fund research and proposal drafting <b>from hours to minutes</b> with a <b>Go data API</b> (AWS ECS/ALB, RDS PostgreSQL, Redis) that serves <b>4 products</b> and an <b>MCP server</b> for Claude/ChatGPT. Lowered latency through Redis caching and query tuning.</>,
  <><b>Reduced</b> monthly portfolio-review work <b>from ~hours per client to minutes for all 280 clients</b> by automating reports (FastAPI, React, S3, ECS Fargate) with rupee-reconciled attribution and password-protected PDF emails.</>,
  <><b>Lowered</b> the ECS bill by <b>~30%</b> by re-architecting AWS into <b>event-driven distributed services</b> (scheduled Fargate batch jobs, S3 + CloudFront frontends, SQS-to-Lambda PDF workers).</>,
  <><b>Replaced</b> per-app logins with <b>one SSO</b> (login.growthvine.in, JWT/JWKS) for web and mobile, and merged separate frontends into <b>one client platform</b> (app.growthvine.in). Built the <b>OAuth2</b> service (RS256, introspection, rate limiting).</>,
  <><b>Moved</b> portfolio monitoring <b>from manual spot checks to continuous automated coverage of all 280+ clients</b> via a rules engine, fed by <b>4 daily fund-data pipelines</b> (AMFI/NSE/MINT ingest, calculation, ranking, benchmarks) provisioned with <b>Terraform</b>.</>,
  <><b>Condensed</b> financial planning <b>from multiple advisor meetings into one digital session</b> with risk profiling (AES-256 mfCentral consent, SHA-256 consent records). Authored the <b>SEBI CSCRF</b> security design.</>,
];

const projects = [
  {
    title: <><b>Samanvay: Government Interoperability Platform</b></>, stack: "Java 21, Spring Boot, Keycloak, PostgreSQL, React | SIH 2026",
    points: [
      <><b>Designed</b> a federated platform (SIH26129) for departments to share citizen data without centralising it, with the <b>system design</b> documented as per-module HLD and LLD. The platform holds only identity links, consent, workflow and audit records.</>,
      <><b>Implemented</b> a <b>9-module Spring Modulith</b> backend (Flyway, Flowable workflows, Resilience4j-guarded connectors), Keycloak auth (passkey/TOTP for staff, email code for citizens), an identity-match reviewer queue and a React staff console.</>,
    ],
  },
  {
    title: <><b>Autonomous Options Trading Agent</b></>, stack: "Python, Alpaca API, SQLite, Claude API, MCP, Linux/systemd",
    points: [<><b>Engineered</b> an LLM-driven options agent trading through the <b>Alpaca API</b> (live market data, limit orders, exits, daily broker reconciliation) behind <b>12 deterministic risk checks</b> it cannot override (position-sizing limits, restricted tool access), with <b>268 automated tests</b>; deployed via systemd.</>],
  },
  {
    title: <><b>Support Triage Agent</b></>, stack: "Python, FastAPI, FAISS, BM25",
    points: [<><b>Developed</b> a <b>7-stage</b> ticket-triage pipeline over <b>774 documents (3,800 chunks)</b>, fusing FAISS and BM25 retrieval via reciprocal rank fusion with cross-encoder reranking. A risk classifier escalates fraud, security and outage tickets, with model failover.</>],
  },
];

export default function CV() {
  return (
    <div className="cv">
      <div className="cv-bar">
        <Link href="/">Back to the magazine</Link>
        <span className="cv-actions">
          <a href={asset("/himanshu-cv.pdf")} download>Download PDF</a>
          <PrintButton />
        </span>
      </div>
      <main className="cv-page">
        <header>
          <h1>Himanshu</h1>
          <p className="cv-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin}>linkedin.com/in/himanshu-mann-143834316</a>
            <a href={site.github}>github.com/himanshu2394i</a>
          </p>
        </header>

        <section>
          <h2>Education</h2>
          <div className="cv-item">
            <div className="cv-row"><h3>Delhi Technological University (DTU), New Delhi</h3><span>2024 – 2028</span></div>
            <p>B.Tech, Mathematics &amp; Computing</p>
          </div>
        </section>

        <section>
          <h2>Experience</h2>
          <div className="cv-item">
            <div className="cv-row"><h3>Growthvine Capital, Gurgaon | AI &amp; Automation Intern</h3><span>May 2026 – Present</span></div>
            <p className="cv-sub">SEBI-registered mutual fund advisory (ARN-189602)</p>
            <ul>{growthvine.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
          <div className="cv-item">
            <div className="cv-row"><h3>LLM4S (open-source Scala/JVM LLM library) | Open Source Contributor</h3><span>2025 – Present</span></div>
            <ul>
              <li><b>Debugged</b> streaming resource leaks in GeminiClient/OpenRouterClient that risked connection exhaustion (<a href="https://github.com/llm4s/llm4s/pull/663"><b>PR #663</b></a>), and added a Stability AI text-to-image provider (<a href="https://github.com/llm4s/llm4s/pull/691"><b>PR #691</b></a>: HTTP client, validation, error mapping, <b>11 unit tests</b>) in object-oriented (OOP) Scala; both merged after code review.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((p) => (
            <div key={p.stack} className="cv-item">
              <div className="cv-row"><h3>{p.title}</h3><span>{p.stack}</span></div>
              <ul>{p.points.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Technical skills</h2>
          <p><b>Languages:</b> Go, Python, Java, Scala, C++, SQL, TypeScript</p>
          <p><b>CS Fundamentals:</b> Data Structures &amp; Algorithms, OOP, system design, debugging, performance/latency optimization</p>
          <p><b>Backend &amp; Data:</b> REST APIs, microservices, FastAPI, Spring Boot, OAuth2/JWT, RAG, MCP, PostgreSQL, Redis, data modeling</p>
          <p><b>Cloud &amp; DevOps:</b> AWS (EC2, ECS, Fargate, Lambda, SQS, RDS, ALB, S3, CloudFront), Terraform, Docker, Git, Linux</p>
        </section>

        <section>
          <h2>Achievements &amp; leadership</h2>
          <ul>
            <li>Cleared the Qualifying Round of <b>The Big Code 2026 by Google</b> (<b>top 15,000 nationally</b>); selected for <b>Smart India Hackathon 2025</b> at DTU (JalSetu, ML-based water-quality monitoring).</li>
            <li>Certificate of Excellence, <b>HackerRank Orchestrate</b> (May 2026): ranked <b>230th</b>, AI Agent track.</li>
            <li>Solved <b>100+ Data Structures &amp; Algorithms (DSA) problems</b> on LeetCode.</li>
            <li><b>Alpaca AI Trading Agents Hackathon</b> (lablab.ai), Aug – Sep 2026.</li>
            <li>Author, &ldquo;Building in Production&rdquo; LinkedIn newsletter on infrastructure and systems work; Co-Head, E-Cell DTU; Logistics Head, Rotaract Club DTU Regency (District 3011).</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
