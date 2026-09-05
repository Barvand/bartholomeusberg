import type { Metadata } from "next";
import SiteFooter from "./components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bartvandenberg.no"),
  title: {
    default: "BART VDB | IT, nettsider og teknisk hjelp i Bergen",
    template: "%s | BART VDB",
  },
  description:
    "Nettsider, PC-hjelp, IT-support og digitale løsninger for privatpersoner og små bedrifter i Bergen.",
  keywords: [
    "IT hjelp Bergen",
    "PC hjelp Bergen",
    "PC reparasjon Bergen",
    "nettside Bergen",
    "webutvikler Bergen",
    "IT support små bedrifter Bergen",
    "IT tjenester Bergen",
    "bedrifts IT Bergen",
  ],
  authors: [{ name: "Bart van den Berg" }],
  openGraph: {
    title: "BART VDB | IT, nettsider og teknisk hjelp i Bergen",
    description:
      "Nettsider, PC-hjelp, IT-support og digitale løsninger for små bedrifter og privatpersoner i Bergen.",
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
    title: "BART VDB | IT, nettsider og teknisk hjelp i Bergen",
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
