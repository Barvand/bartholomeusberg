// Builders for device frames around the captured screenshots.
const CAP = "../captures/";

const PATHS = {
  "employee-time": "employee/dashboard",
  "employee-overview": "employee/dashboard",
  "employee-shifts": "employee/shifts",
  "admin-dashboard": "admin/dashboard",
  "admin-shifts": "admin/shifts",
  "admin-activity": "admin/activity",
  "pm-approval": "pm/dashboard",
  "project": "project/24017",
};

const lock = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>';
const signal = '<svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
const wifi = '<svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.4A10.6 10.6 0 0 0 8 .3 10.6 10.6 0 0 0 .5 3.3l1.3 1.4A8.7 8.7 0 0 1 8 2.2Zm0 3.7c1.4 0 2.7.5 3.6 1.4L13 5.9A7.2 7.2 0 0 0 8 4a7.2 7.2 0 0 0-5 1.9l1.4 1.4c.9-.9 2.2-1.4 3.6-1.4Zm0 3.6c-.6 0-1.1.2-1.5.6L8 11.7l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z"/></svg>';
const battery = '<svg viewBox="0 0 27 12" fill="none"><rect x=".5" y=".5" width="23" height="11" rx="3" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor"/><path d="M25 4v4c.8-.3 1.5-1 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity=".45"/></svg>';

export const src = (form, shot, theme) => `${CAP}${form}-${shot}-${theme}.png`;

export function laptop({ shot, theme = "light", w }) {
  return `<div class="laptop" style="--w:${w}px">
    <div class="lid"><div class="screen"><img src="${src("desktop", shot, theme)}" alt=""></div></div>
    <div class="deck"></div></div>`;
}

export function browser({ shot, theme = "light", w, chrome = theme }) {
  return `<div class="browser ${chrome}" style="--w:${w}px">
    <div class="bar"><div class="dots"><i></i><i></i><i></i></div>
      <div class="url">${lock}<span>totaltiming.app/${PATHS[shot]}</span></div></div>
    <div class="screen"><img src="${src("desktop", shot, theme)}" alt=""></div></div>`;
}

export function phone({ shot, theme = "light", w }) {
  return `<div class="phone ${theme}" style="--w:${w}px">
    <div class="screen">
      <div class="island"></div>
      <div class="status"><span>14:20</span><span class="icons">${signal}${wifi}${battery}</span></div>
      <img src="${src("mobile", shot, theme)}" alt="">
      <div class="home"></div>
    </div></div>`;
}

// Fjord contour lines: stacked, slowly drifting curves, drawn deterministically.
export function contours({ width, height, color, count = 18, opacity = 1, seed = 1 }) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const paths = [];
  for (let i = 0; i < count; i++) {
    const baseY = (height / (count - 1)) * i;
    const amp = 18 + rand() * 46;
    const freq = 1.1 + rand() * 1.4;
    const phase = rand() * Math.PI * 2;
    const pts = [];
    for (let x = -20; x <= width + 20; x += 24) {
      const t = x / width;
      const y = baseY + Math.sin(t * Math.PI * freq + phase) * amp + Math.sin(t * Math.PI * 5.3 + phase * 2) * amp * 0.18;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    paths.push(`<polyline points="${pts.join(" ")}" />`);
  }
  return `<svg class="contours" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
    <g fill="none" stroke="${color}" stroke-width="1.25" opacity="${opacity}">${paths.join("")}</g></svg>`;
}

export const params = new URLSearchParams(location.search);
