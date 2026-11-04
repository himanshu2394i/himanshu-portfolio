// Next 16 static export on Windows writes segment prefetch files with backslashes left in,
// so "__next.cv.__PAGE__.txt" lands as a folder "__next.cv/__PAGE__.txt" and the client's
// prefetch 404s. Linux builds (Vercel, GitHub Actions) are fine; this flattens Windows output.
// Runs automatically after `npm run build` and does nothing when there's nothing to fix.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const out = "out";
let moved = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(p, dir, name);
    else if (name !== "_next") walk(p);
  }
}

function flatten(nested, parent, prefix) {
  const files = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? files(join(d, n)) : [join(d, n)]));
  for (const f of files(nested)) {
    const flat = prefix + "." + relative(nested, f).split(/[\\/]/).join(".");
    renameSync(f, join(parent, flat));
    moved++;
  }
  rmSync(nested, { recursive: true });
}

walk(out);
if (moved) console.log(`fix-export-windows: flattened ${moved} prefetch file(s)`);
