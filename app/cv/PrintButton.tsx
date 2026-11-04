"use client";

export default function PrintButton() {
  return <button onClick={() => window.print()}>Save as PDF</button>;
}
