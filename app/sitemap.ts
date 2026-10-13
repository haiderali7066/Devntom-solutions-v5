import type { MetadataRoute } from "next";

const SITE = "https://www.devntomsolutions.com";
const UPDATED = "2026-10-13"; // update when page content changes meaningfully

type Entry = { path: string; live: boolean; priority: number; freq: "daily" | "weekly" | "monthly" | "yearly" };

// Set `live: true` only once a page is deployed. Listing pages that return 404
// hurts SEO, so unbuilt pages stay out of the sitemap until you flip them on.
const pages: Entry[] = [
  // Core
  { path: "/", live: true, priority: 1.0, freq: "weekly" },
  { path: "/services", live: true, priority: 0.9, freq: "monthly" },
  { path: "/about", live: true, priority: 0.7, freq: "yearly" },
  { path: "/projects", live: true, priority: 0.8, freq: "weekly" },
  { path: "/industries", live: true, priority: 0.7, freq: "monthly" },
  { path: "/blog", live: true, priority: 0.8, freq: "weekly" },
  { path: "/contact", live: true, priority: 0.8, freq: "yearly" },

  // Services
  { path: "/services/website-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/custom-software-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/mobile-app-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/ai-automation", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/digital-marketing", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/ui-ux-design", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/seo-optimization", live: true, priority: 0.9, freq: "monthly" },



  // Legal
  { path: "/privacy-policy", live: true, priority: 0.3, freq: "yearly" },
  { path: "/terms-and-conditions", live: true, priority: 0.3, freq: "yearly" },
  { path: "/cookie-policy", live: true, priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages
    .filter((p) => p.live)
    .map((p) => ({
      url: p.path === "/" ? SITE : `${SITE}${p.path}`,
      lastModified: UPDATED,
      changeFrequency: p.freq,
      priority: p.priority,
    }));
}
