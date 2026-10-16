// Survey pass: full-page captures of every main route, for picking shots.
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launch, openSession, settle, APP } from "./session.mjs";

const out = new URL("../captures/explore/", import.meta.url);
await mkdir(out, { recursive: true });

const routes = [
  [1, "/admin/dashboard"], [1, "/admin/hours"], [1, "/admin/users"], [1, "/admin/activity"],
  [1, "/admin/shifts"], [1, "/pm/dashboard"], [1, "/project/24017"],
  [2, "/employee/dashboard"], [2, "/employee/shifts"], [2, "/employee/notes"], [2, "/employee/images"],
];

const browser = await launch();
for (const theme of ["light"]) {
  for (const [userId, path] of routes) {
    const { context, page, unmatched, blocked } = await openSession(browser, { userId, theme, viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(APP + path);
    await settle(page);
    const name = `${userId}${path.replaceAll("/", "_")}-${theme}.png`;
    await page.screenshot({ path: fileURLToPath(new URL(name, out)), fullPage: true });
    console.log(name, unmatched.length ? `UNMATCHED ${unmatched.join(", ")}` : "", blocked.length ? `BLOCKED ${blocked.join(", ")}` : "");
    await context.close();
  }
}
await browser.close();
