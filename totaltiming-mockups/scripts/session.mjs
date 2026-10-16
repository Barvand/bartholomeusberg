import { chromium } from "playwright";
import { NOW } from "./fixtures.mjs";
import { installMockApi } from "./mock-api.mjs";

export const APP = process.env.TT_APP_URL ?? "http://localhost:5173";

const ALLOWED_HOSTS = new Set(["localhost:5173", "fonts.googleapis.com", "fonts.gstatic.com"]);

export async function launch() {
  return chromium.launch();
}

// A browser context that is signed in as one synthetic user, has a frozen
// clock, a fixed theme and Oslo locale, and can only reach the local client.
export async function openSession(browser, { userId, theme = "light", viewport, deviceScaleFactor = 2, isMobile = false }) {
  const context = await browser.newContext({
    viewport, deviceScaleFactor, isMobile, hasTouch: isMobile,
    locale: "nb-NO", timezoneId: "Europe/Oslo", colorScheme: theme,
    reducedMotion: "reduce",
  });
  const unmatched = [];
  const blocked = [];
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.port === "8800" || url.hostname === "api.totaltiming.app") return route.fallback();
    if (ALLOWED_HOSTS.has(url.host)) return route.fallback();
    blocked.push(url.href);
    return route.abort();
  });
  await context.addInitScript((t) => {
    localStorage.setItem("hasLoggedInBefore", "true");
    localStorage.setItem("theme", t);
  }, theme);

  const page = await context.newPage();
  await page.clock.setFixedTime(new Date(NOW));
  await installMockApi(page, { userId, unmatched });
  return { context, page, unmatched, blocked };
}

export async function settle(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}
