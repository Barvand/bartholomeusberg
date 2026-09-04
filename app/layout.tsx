import type { Metadata } from "next";
import "../../portfolio-nextjs/app/global.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://bartvandenberg.no"),
  title: {
    default: "Bart van den Berg | Web Developer",
    template: "%s | Bart van den Berg",
  },
  description:
    "Bart van den Berg builds fast, scalable websites and full-stack applications for growing companies.",
  keywords: [
    "web developer",
    "Next.js developer",
    "Bergen",
    "Norway",
    "SEO",
    "full-stack developer",
  ],
  authors: [{ name: "Bart van den Berg" }],
  openGraph: {
    title: "Bart van den Berg | Web Developer",
    description:
      "Fast, scalable websites and applications built to help companies grow.",
    type: "website",
    locale: "en_NO",
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
    title: "Bart van den Berg | Web Developer",
    images: ["/newhero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
