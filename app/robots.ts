import type { MetadataRoute } from "next";

const SITE = "https://www.devntomsolutions.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
