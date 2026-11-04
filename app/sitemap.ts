import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cv`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/writing/dangerous-failures`, changeFrequency: "yearly", priority: 0.6 },
  ];
}
