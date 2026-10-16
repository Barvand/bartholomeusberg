// Captures authentic TotalTiming screens from the running client.
// Usage: start the client (`npx vite` in workforce-container/client), then
//        npm run capture
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launch, openSession, settle, APP } from "./session.mjs";

const out = fileURLToPath(new URL("../captures/", import.meta.url));
await mkdir(out, { recursive: true });

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };
const MOBILE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true };

const scrollTo = (selector) => async (page) => {
  await page.locator(selector).first().evaluate((el) => {
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 72);
  });
};
const heading = (text) => scrollTo(`h2:text-is("${text}")`);
// Client-side only: selects a recent-project chip. Nothing is submitted.
const pickRecent = async (page) => {
  await page.getByRole("button", { name: /^24017 - Fjordbakken boligfelt$/ }).first().click();
};
const both = (...steps) => async (page) => { for (const step of steps) await step(page); };

const shots = [
  { name: "desktop-employee-time", userId: 2, path: "/employee/dashboard", ...DESKTOP, prepare: pickRecent },
  { name: "desktop-admin-dashboard", userId: 1, path: "/admin/dashboard", ...DESKTOP },
  { name: "desktop-admin-shifts", userId: 1, path: "/admin/shifts", ...DESKTOP },
  { name: "desktop-admin-activity", userId: 1, path: "/admin/activity", ...DESKTOP },
  { name: "desktop-pm-approval", userId: 1, path: "/pm/dashboard", ...DESKTOP },
  { name: "desktop-employee-shifts", userId: 2, path: "/employee/shifts", ...DESKTOP },
  { name: "desktop-project", userId: 1, path: "/project/24017", ...DESKTOP },
  { name: "mobile-employee-time", userId: 2, path: "/employee/dashboard", ...MOBILE, prepare: both(pickRecent, heading("Registrer arbeidstid")) },
  { name: "mobile-employee-overview", userId: 2, path: "/employee/dashboard", ...MOBILE, prepare: heading("Timeoversikt") },
  { name: "mobile-employee-shifts", userId: 2, path: "/employee/shifts", ...MOBILE },
  { name: "mobile-pm-approval", userId: 1, path: "/pm/dashboard", ...MOBILE },
  { name: "mobile-admin-activity", userId: 1, path: "/admin/activity", ...MOBILE },
];

const only = process.argv.slice(2);
const browser = await launch();
let problems = 0;
for (const theme of ["light", "dark"]) {
  for (const shot of shots) {
    if (only.length && !only.some((o) => shot.name.includes(o))) continue;
    const { context, page, unmatched, blocked } = await openSession(browser, { ...shot, theme });
    await page.goto(APP + shot.path);
    await settle(page);
    if (shot.prepare) {
      await shot.prepare(page);
      await page.waitForTimeout(300);
    }
    const file = `${shot.name}-${theme}.png`;
    await page.screenshot({ path: out + file });
    const issues = [...unmatched.map((u) => `unmatched ${u}`), ...blocked.map((b) => `blocked ${b}`)];
    problems += issues.length;
    console.log(file, issues.join("; "));
    await context.close();
  }
}
await browser.close();
if (problems) process.exitCode = 1;
