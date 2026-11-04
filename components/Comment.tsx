import { commentary } from "@/lib/content";

// A red-pen margin note; hidden unless the commentary track is on (html.commentary).
export default function Comment({ id }: { id: string }) {
  return (
    <aside className="comment" aria-label="Commentary">
      <b>COMMENTARY</b>
      {commentary[id]}
    </aside>
  );
}
