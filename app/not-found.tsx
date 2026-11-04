import Link from "next/link";

export const metadata = { title: "Reel not found | HIMANSHU, the cinema issue" };

// Wrong turns land here: same look as the issue, two ways back.
export default function NotFound() {
  return (
    <main className="lost">
      <div className="lost-card">
        <p className="lost-kick">INTERMISSION</p>
        <h1>Reel not found</h1>
        <p>This address isn&apos;t in tonight&apos;s programme. It may have been cut in the edit.</p>
        <div className="lost-links">
          <Link href="/">Back to the issue</Link>
          <Link href="/cv">CV</Link>
        </div>
      </div>
    </main>
  );
}
