import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const SITE = "https://www.devntomsolutions.com";
const URL = `${SITE}/services`;

export const metadata: Metadata = {
  title: "Our Services: Websites, Software, Apps, AI, Design, Marketing and SEO",
  description:
    "Explore Devntom Solutions' seven services: website development, custom software, mobile apps, AI automation, digital marketing, UI/UX design and SEO. Offices in Lahore, Riyadh and London.",
  keywords: ["software development services", "website development", "mobile app development", "AI automation", "digital marketing", "UI/UX design", "SEO services"],
  alternates: { canonical: "/services" },
  openGraph: { type: "website", url: URL, title: "Our Services | Devntom Solutions", description: "One team, seven services: websites, software, apps, AI, design, marketing and SEO.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Devntom Solutions services" }] },
  twitter: { card: "summary_large_image", title: "Our Services | Devntom Solutions", description: "One team, seven services.", images: ["/og.png"] },
};

const items: [string, string][] = [
  ["Website Development", "website-development"], ["Custom Software Development", "custom-software-development"], ["Mobile App Development", "mobile-app-development"],
  ["AI Automation", "ai-automation"], ["Digital Marketing", "digital-marketing"], ["UI/UX Design", "ui-ux-design"], ["SEO Optimization", "seo-optimization"],
];

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "CollectionPage", "@id": `${URL}#page`, url: URL, name: "Services", isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#organization` } },
    { "@type": "ItemList", itemListElement: items.map(([name, slug], i) => ({ "@type": "ListItem", position: i + 1, name, url: `${URL}/${slug}` })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Services", item: URL }] },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ServicesClient />
    </>
  );
}