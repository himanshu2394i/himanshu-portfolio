import type { Metadata } from "next";
import Link from "next/link";
import { essay } from "@/lib/essays/dangerous-failures";
import { site } from "@/lib/content";
import "./essay.css";

// Page metadata replaces the layout's openGraph wholesale, so the share image is repeated here.
const card = { url: "/og.png", width: 1200, height: 630, alt: "HIMANSHU, the cinema issue: a magazine cover" };
export const metadata: Metadata = {
  title: `${essay.title} | Himanshu`,
  description: essay.dek,
  openGraph: { type: "article", title: essay.title, description: essay.dek, authors: ["Himanshu"], images: [card] },
  twitter: { card: "summary_large_image", title: essay.title, description: essay.dek, images: [card.url] },
};

const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: essay.title,
  description: essay.dek,
  wordCount: essay.words,
  author: { "@type": "Person", name: site.name, url: site.url, sameAs: [site.linkedin, site.github] },
};

export default function Essay() {
  const minutes = Math.round(essay.words / 230);
  return (
    <div className="essay-page">
      <div className="essay-bar">
        <Link href="/#writing">Back to the issue</Link>
        <span>{minutes} min read</span>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <article className="essay">
        <p className="essay-kick">ESSAY. BY HIMANSHU</p>
        <h1>{essay.title}</h1>
        <p className="essay-dek">{essay.dek}</p>
        {essay.blocks.map((b, i) =>
          b.t === "h" ? <h2 key={i}>{b.text}</h2>
          : b.t === "pull" ? <blockquote key={i}>{b.text}</blockquote>
          : b.t === "list" ? <ul key={i} className="checklist">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
          : <p key={i}>{b.text}</p>,
        )}
        <footer className="essay-end">
          <Link href="/#writing">Back to the issue</Link>
          <Link href="/cv">CV</Link>
        </footer>
      </article>
    </div>
  );
}
