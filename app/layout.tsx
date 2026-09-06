import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import SiteFooter from "./components/site-footer";
import CookieConsent, { type ConsentChoice } from "./components/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bartvandenberg.no"),
  title: {
    default: "Bartholomeus Berg | Nettsider og IT-hjelp i Arna og Bergen",
    template: "%s | Bartholomeus Berg",
  },
  description:
    "Nettsider, PC-hjelp og praktisk IT-hjelp for privatpersoner og små bedrifter i Arna og Bergen.",
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
    title: "Bartholomeus Berg | Nettsider og IT-hjelp i Arna og Bergen",
    description:
      "Nettsider, PC-hjelp og praktisk IT-hjelp for privatpersoner og små bedrifter i Arna og Bergen.",
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
    title: "Bartholomeus Berg | Nettsider og IT-hjelp i Arna og Bergen",
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
        {children}
        <SiteFooter />
        <CookieConsent initialChoice={initialConsent} />
      </body>
    </html>
  );
}
