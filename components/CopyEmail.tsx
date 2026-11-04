"use client";

import { useState } from "react";
import { site } from "@/lib/content";

// mailto: often opens a mail app nobody uses; copying the address always works.
export default function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button className={`copymail${copied ? " done" : ""} ${className ?? ""}`.trim()} onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
