import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  use: { baseURL: "http://localhost:3100" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "iphone", use: { ...devices["iPhone 14"] } }, // WebKit: recruiters on iPhones
  ],
  webServer: { command: "npx next dev -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 120_000 },
});
