import type { Metadata } from "next";
import IndustriesClient from "./IndustriesClient";

const SITE = "https://www.devntomsolutions.com";
const TITLE = "Industries We Serve ";
const DESC = "Websites, software, digital marketing and AI automation for healthcare, retail, real estate, education, finance, hospitality, professional services and logistics.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/industries" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/industries", type: "website" },
  twitter: { card: "summary_large_image" },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: TITLE, url: SITE + "/industries", description: DESC, isPartOf: { "@type": "WebSite", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Industries", item: SITE + "/industries" },
  ] },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <IndustriesClient />
    </>
  );
}