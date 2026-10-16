# TotalTiming marketing mockups

Reproducible portfolio mockups built from the **real** TotalTiming client UI.

- `scripts/fixtures.mjs`: synthetic demo data. Every person, project and number is invented.
- `scripts/mock-api.mjs`: Playwright intercepts the client's API calls and answers from the fixtures.
  Unmatched requests are aborted, and only localhost:5173 and Google Fonts are reachable, so no
  backend, database, Discord webhook or R2 storage is touched.
- `scripts/capture.mjs`: desktop (1440×900 @2x) and mobile (390×844 @3x) captures, light and dark,
  with the browser clock frozen at Thu 15 Oct 2026 14:20 Europe/Oslo.
- `compositions/`: HTML/CSS/SVG device frames in the portfolio's fjord palette, DM Sans and Space Grotesk.
- `scripts/render.mjs`: renders compositions to `assets/` at 2x and writes `gallery.html`.

## Rebuild

    cd ../../Desktop/WorkForce/workforce-container/client && npx vite    # in another terminal
    npm install && npx playwright install chromium
    npm run build            # capture + render
    npm run capture -- shifts   # recapture only shots whose name contains "shifts"
