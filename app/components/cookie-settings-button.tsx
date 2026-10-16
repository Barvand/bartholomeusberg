"use client";

export default function CookieSettingsButton() {
  return (
    <button
      id="cookie-settings-trigger"
      className="cookie-settings-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    >
      Endre samtykke
    </button>
  );
}
