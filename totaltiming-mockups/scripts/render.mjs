// Renders the HTML compositions to high-resolution PNGs in assets/.
// Usage: npm run render   (after npm run capture)
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const assets = join(root, "assets");
await mkdir(assets, { recursive: true });

const SCALE = 2;
const outputs = [
  { file: "totaltiming-laptop-admin-dashboard.png", page: "laptop.html?shot=admin-dashboard&theme=light", w: 1600, h: 1000, title: "Laptop: arbeidsoversikt (admin)" },
  { file: "totaltiming-laptop-employee-time.png", page: "laptop.html?shot=employee-time&theme=dark", w: 1600, h: 1000, title: "Laptop: timeregistrering (mørk)" },
  { file: "totaltiming-browser-admin-shifts.png", page: "browser.html?shot=admin-shifts&theme=light", w: 1600, h: 1100, title: "Nettleser: legg ut vakter" },
  { file: "totaltiming-browser-activity-dark.png", page: "browser.html?shot=admin-activity&theme=dark", w: 1600, h: 1100, title: "Nettleser: aktivitet (mørk)" },
  { file: "totaltiming-browser-project.png", page: "browser.html?shot=project&theme=light", w: 1600, h: 1100, title: "Nettleser: prosjektdetaljer" },
  { file: "totaltiming-theme-split-approval.png", page: "split.html?shot=pm-approval", w: 1600, h: 1100, title: "Lys og mørk: prosjektgodkjenning" },
  { file: "totaltiming-phones-light.png", page: "phones.html?theme=light", w: 1600, h: 1100, title: "Mobil: vakter, timer, godkjenning" },
  { file: "totaltiming-phones-dark.png", page: "phones.html?theme=dark&shots=employee-overview,employee-time,employee-shifts", w: 1600, h: 1100, title: "Mobil: oversikt, timer, vakter (mørk)" },
  { file: "totaltiming-layered.png", page: "layered.html", w: 1600, h: 1126, title: "Lagdelt komposisjon" },
  { file: "totaltiming-layered-transparent.png", page: "layered.html?bg=none", w: 1600, h: 1126, transparent: true, title: "Lagdelt, transparent (erstatning for showcase-totaltiming.svg)" },
  { file: "totaltiming-feature-banner.png", page: "feature.html", w: 1600, h: 900, title: "Prosjektbanner med tekst" },
];

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".json": "application/json" };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  if (path.startsWith("..")) return res.writeHead(403).end();
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const base = `http://127.0.0.1:${server.address().port}/compositions/`;

const browser = await chromium.launch();
for (const o of outputs) {
  const page = await browser.newPage({ viewport: { width: o.w, height: o.h }, deviceScaleFactor: SCALE });
  const failed = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  await page.goto(base + o.page);
  await page.waitForFunction(() => window.__layout === true);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode()));
  });
  await page.screenshot({ path: join(assets, o.file), omitBackground: !!o.transparent });
  console.log(`${o.file}  ${o.w * SCALE}x${o.h * SCALE}`, failed.length ? `FAILED ${failed.join(", ")}` : "");
  await page.close();
}
await browser.close();
server.close();

await writeFile(join(assets, "manifest.json"), JSON.stringify(outputs.map(({ file, title, w, h }) => ({ file, title, width: w * SCALE, height: h * SCALE })), null, 2));

// ── Review gallery (opens directly from disk) ─────────────────────────────
const { readdir } = await import("node:fs/promises");
const captures = (await readdir(join(root, "captures"))).filter((f) => f.endsWith(".png")).sort();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const card = (href, title, meta) => `<figure><a href="${href}" target="_blank" rel="noopener"><img src="${href}" alt="${esc(title)}" loading="lazy"></a>
  <figcaption><span>${esc(title)}</span><small>${esc(meta)}</small></figcaption></figure>`;
await writeFile(join(root, "gallery.html"), `<!doctype html>
<html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TotalTiming mockups</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@600&display=swap">
<style>
:root{--bg:#f4f8fa;--ink:#091d2b;--muted:#28647f;--line:#c9dde8;--card:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#091d2b;--ink:#f4f8fa;--muted:#9dbed1;--line:#173e55;--card:#102c3e}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "DM Sans",Arial,sans-serif}
main{max-width:1320px;margin:auto;padding:56px 16px 96px}
h1,h2{font-family:"Space Grotesk",Arial,sans-serif;letter-spacing:-.03em;margin:0}h1{font-size:44px}h2{font-size:24px;margin:64px 0 20px}
.lede{max-width:62ch;color:var(--muted);margin:12px 0 0}
.grid{display:grid;gap:24px;grid-template-columns:repeat(auto-fill,minmax(min(100%,400px),1fr))}
.grid.small{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))}
figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:8px;overflow:hidden}
figure img{display:block;width:100%;height:auto;background:repeating-conic-gradient(#0000 0 25%,#8881 0 50%) 0 0/20px 20px}
figcaption{display:flex;justify-content:space-between;gap:12px;padding:12px 14px;font-weight:500;border-top:1px solid var(--line)}
figcaption small{color:var(--muted);font-weight:400;white-space:nowrap}
a:focus-visible{outline:3px solid #3b7896;outline-offset:3px}
</style></head><body><main>
<h1>TotalTiming mockups</h1>
<p class="lede">Til godkjenning. Skjermbildene er tatt fra den ekte TotalTiming-klienten med syntetiske demodata. Ingen database eller backend ble brukt. Klikk et bilde for full oppløsning.</p>
<h2>Komposisjoner</h2>
<div class="grid">${outputs.map((o) => card(`assets/${o.file}`, o.title, `${o.w * SCALE}×${o.h * SCALE}`)).join("\n")}</div>
<h2>Råskjermbilder</h2>
<div class="grid small">${captures.map((f) => card(`captures/${f}`, f.replace(/\.png$/, ""), f.startsWith("mobile") ? "1170×2532" : "2880×1800")).join("\n")}</div>
</main></body></html>`);
console.log("gallery.html written");
