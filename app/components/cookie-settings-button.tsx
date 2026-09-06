"use client";

export default function CookieSettingsButton() {
  return <button className="cookie-settings-button" type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}>Endre samtykke</button>;
}
