import type { Metadata } from "next";
import SeoOptimizationClient from "./SeoOptimizationClient";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/seo-optimization";
const URL = `${SITE}${PATH}`;

// The layout adds " | Devntom Solutions" through its title template.
export const metadata: Metadata = {
  title: "SEO Services: Technical, On-Page and Local SEO",
  description:
    "Devntom Solutions delivers technical, on-page and local SEO that lifts your rankings and brings in qualified customers. Free SEO audit. Offices in Lahore, Riyadh and London.",
  keywords: [
    "SEO services", "SEO company", "technical SEO", "on-page SEO", "local SEO",
    "SEO agency Pakistan", "SEO agency Saudi Arabia", "SEO agency London",
    "SEO audit", "search engine optimization",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: URL,
    title: "SEO Optimization | Devntom Solutions",
    description: "Technical, on-page and local SEO that moves your website up the results.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SEO optimization by Devntom Solutions" }], // TODO: add a page-specific image
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Optimization | Devntom Solutions",
    description: "Technical, on-page and local SEO that moves your website up the results.",
    images: ["/og.png"],
  },
};

// Structured data for this service. FAQ markup lives in the client component.
const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "SEO Optimization",
      serviceType: "Search engine optimization",
      url: URL,
      description:
        "Technical SEO, on-page SEO, content strategy, local SEO, authority building and reporting to improve organic search visibility.",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SEO services",
        itemListElement: ["Technical SEO", "On-page SEO", "Content strategy", "Local SEO", "Authority building", "SEO analytics and reporting"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
        { "@type": "ListItem", position: 3, name: "SEO Optimization", item: URL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SeoOptimizationClient />
    </>
  );
}