import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://bartvandenberg.no", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://bartvandenberg.no/tjenester", lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...["nettsider", "pc-it", "bedrifts-it"].map((slug) => ({ url: `https://bartvandenberg.no/tjenester/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...["total-timing", "totalentreprenor-as"].map((slug) => ({ url: `https://bartvandenberg.no/prosjekter/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
