// Prints /cv to public/himanshu-cv.pdf so the download always matches the page.
// Usage: start the dev server (npm run dev), then: npm run cv:pdf  [optional base URL]
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${base}/cv`, { waitUntil: "networkidle" });
await page.pdf({ path: "public/himanshu-cv.pdf", format: "A4", printBackground: false });
await browser.close();
console.log("wrote public/himanshu-cv.pdf");
