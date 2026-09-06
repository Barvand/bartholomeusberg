"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "bart_cookie_consent";
const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
export type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __cookieConsentDefaultsSet?: boolean;
  }
}

function sendConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
  window.gtag("consent", "update", {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: choice === "accepted" ? "granted" : "denied",
    ad_user_data: choice === "accepted" ? "granted" : "denied",
    ad_personalization: choice === "accepted" ? "granted" : "denied",
    functionality_storage: choice === "accepted" ? "granted" : "denied",
    personalization_storage: choice === "accepted" ? "granted" : "denied",
  });
}

function loadGoogleTag() {
  if (!GOOGLE_TAG_ID || document.querySelector(`script[data-google-tag="${GOOGLE_TAG_ID}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  script.dataset.googleTag = GOOGLE_TAG_ID;
  script.onload = () => {
    window.gtag?.("js", new Date());
    window.gtag?.("config", GOOGLE_TAG_ID);
  };
  document.head.appendChild(script);
}

function removeGoogleCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gcl")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`;
    }
  });
}

export default function CookieConsent({ initialChoice }: { initialChoice: ConsentChoice | null }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(initialChoice);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
    // Fallback if the beforeInteractive bootstrap was unavailable.
    if (!window.__cookieConsentDefaultsSet) {
      window.gtag("consent", "default", {
        analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied",
        ad_personalization: "denied", functionality_storage: "denied",
        personalization_storage: "denied", security_storage: "granted", wait_for_update: 500,
      });
    }

    const stored = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1];
    const savedChoice = stored === "accepted" || stored === "rejected" ? stored : null;
    setChoice(savedChoice);
    if (savedChoice) {
      sendConsent(savedChoice);
      if (savedChoice === "accepted") loadGoogleTag();
    }

    const openSettings = () => {
      setChoice(null);
    };
    window.addEventListener("open-cookie-settings", openSettings);
    return () => window.removeEventListener("open-cookie-settings", openSettings);
  }, []);

  function choose(nextChoice: ConsentChoice) {
    document.cookie = `${CONSENT_COOKIE}=${nextChoice}; Max-Age=31536000; Path=/; SameSite=Lax`;
    sendConsent(nextChoice);
    if (nextChoice === "accepted") loadGoogleTag(); else removeGoogleCookies();
    setChoice(nextChoice);
  }

  if (choice) return null;
  return (
    <aside className="cookie-banner" aria-labelledby="cookie-title" role="dialog" aria-modal="true">
      <div className="cookie-banner__content">
        <div>
          <p className="cookie-banner__eyebrow">Personvern</p>
          <h2 id="cookie-title">Vi bruker informasjonskapsler</h2>
          <p>Vi bruker nødvendige informasjonskapsler for at nettstedet skal fungere. Med ditt samtykke bruker vi også informasjonskapsler fra Google til analyse og måling av annonsering.</p>
          <a href="/personvern#informasjonskapsler">Les om informasjonskapsler</a>
        </div>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__button cookie-banner__button--secondary" type="button" onClick={() => choose("rejected")}>Avslå</button>
          <button className="cookie-banner__button" type="button" onClick={() => choose("accepted")}>Godta</button>
        </div>
      </div>
    </aside>
  );
}
