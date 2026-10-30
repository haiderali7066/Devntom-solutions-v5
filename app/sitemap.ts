import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/posts";
import { VAT_COUNTRIES } from "./tools/vat-calculator/vat-countries";

const SITE = "https://www.devntomsolutions.com";
const UPDATED = "2026-10-30"; // update when page content changes meaningfully

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
  { path: "/tools", live: true, priority: 0.8, freq: "monthly" },

  // Services
  { path: "/services/website-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/custom-software-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/mobile-app-development", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/ai-automation", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/digital-marketing", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/ui-ux-design", live: true, priority: 0.9, freq: "monthly" },
  { path: "/services/seo-optimization", live: true, priority: 0.9, freq: "monthly" },

  // Tools
  { path: "/tools/redirect-map-generator", live: true, priority: 0.7, freq: "monthly" },
  { path: "/tools/vat-calculator", live: true, priority: 0.7, freq: "monthly" },
  { path: "/tools/website-cost-calculator", live: true, priority: 0.7, freq: "monthly" },
  { path: "/tools/zatca-qr-code-generator", live: true, priority: 0.7, freq: "monthly" },
  // Legal
  { path: "/privacy-policy", live: true, priority: 0.3, freq: "yearly" },
  { path: "/terms-and-conditions", live: true, priority: 0.3, freq: "yearly" },
  { path: "/cookie-policy", live: true, priority: 0.3, freq: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticPages = pages
    .filter((p) => p.live)
    .map((p) => ({
      url: p.path === "/" ? SITE : `${SITE}${p.path}`,
      lastModified: UPDATED,
      changeFrequency: p.freq,
      priority: p.priority,
    }));

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const vatCountryPages: MetadataRoute.Sitemap = VAT_COUNTRIES.map((country) => ({
    url: `${SITE}/tools/vat-calculator/${country.slug}`,
    lastModified: UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts, ...vatCountryPages];
}
