import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bartholomeusberg.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://bartholomeusberg.com/tjenester",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...["nettsider", "pc-it", "bedrifts-it"].map((slug) => ({
      url: `https://bartholomeusberg.com/tjenester/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["total-timing", "totalentreprenor-as", "holidaze"].map((slug) => ({
      url: `https://bartholomeusberg.com/prosjekter/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: "https://bartholomeusberg.com/personvern",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
