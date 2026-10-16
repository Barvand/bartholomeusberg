import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import SiteFooter from "./components/site-footer";
import CookieConsent, { type ConsentChoice } from "./components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bartholomeusberg.com"),
  title: {
    default: "Nettsider, programvare og IT i Bergen | Bartholomeus Berg",
    template: "%s | Bartholomeus Berg",
  },
  description:
    "Nettsider, skreddersydd programvare og praktisk IT for små bedrifter i Bergen og Arna. Også PC-hjelp for privatpersoner.",
  keywords: [
    "nettside Arna",
    "nettside Bergen",
    "webutvikler Bergen",
    "PC-hjelp Arna",
    "PC-hjelp Bergen",
    "IT-hjelp Arna",
    "IT-hjelp Bergen",
    "Bedrifts-IT Bergen",
  ],
  authors: [{ name: "Bart van den Berg" }],
  openGraph: {
    url: "https://bartholomeusberg.com",
    title: "Nettsider, programvare og IT i Bergen | Bartholomeus Berg",
    description:
      "Nettsider, skreddersydd programvare og praktisk IT for små bedrifter i Bergen og Arna. Også PC-hjelp for privatpersoner.",
    type: "website",
    locale: "nb_NO",
    images: [
      {
        url: "/newhero.jpg",
        width: 2048,
        height: 1152,
        alt: "Bart van den Berg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nettsider, programvare og IT i Bergen | Bartholomeus Berg",
    images: ["/newhero.jpg"],
  },
  robots: { index: true, follow: true },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storedConsent = (await cookies()).get("bart_cookie_consent")?.value;
  const initialConsent: ConsentChoice | null =
    storedConsent === "accepted" || storedConsent === "rejected"
      ? storedConsent
      : null;

  return (
    <html lang="nb" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="google-consent-default" strategy="beforeInteractive">{`
          (function () {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
            window.gtag('consent', 'default', {
              analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied',
              ad_personalization: 'denied', functionality_storage: 'denied',
              personalization_storage: 'denied', security_storage: 'granted', wait_for_update: 500
            });
            window.__cookieConsentDefaultsSet = true;
          })();
        `}</Script>
        <a className="skip-link" href="#main-content">Hopp til hovedinnhold</a>
        <CookieConsent initialChoice={initialConsent} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
