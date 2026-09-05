import type { Metadata } from "next";
import SiteFooter from "./components/site-footer";
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
