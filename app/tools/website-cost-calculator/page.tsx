import type { Metadata } from "next";
import WebsiteCostCalculatorClient from "./WebsiteCostCalculator";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/tools/website-cost-calculator";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
  title: "Website Cost Calculator: Pakistan, Saudi Arabia and UK (PKR, SAR, GBP)",
  description:
    "Free website cost calculator. Choose your site type, pages and features to get an indicative price range in PKR, SAR or GBP for Pakistan, Saudi Arabia and the UK.",
  keywords: [
    "website cost calculator", "website cost in Pakistan", "website development cost Pakistan",
    "website cost Saudi Arabia", "website cost UK", "how much does a website cost",
    "ecommerce website cost", "web design cost calculator",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: URL,
    title: "Website Cost Calculator for Pakistan, Saudi Arabia and the UK",
    description: "Get an indicative website price range in PKR, SAR or GBP in seconds. Free, no sign-up.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Website cost calculator by Devntom Solutions" }], // TODO: add a tool-specific image
  },
  twitter: { card: "summary_large_image", title: "Website Cost Calculator | Devntom Solutions", description: "Indicative website prices in PKR, SAR and GBP.", images: ["/og.png"] },
};

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${URL}#tool`,
      name: "Website Cost Calculator",
      url: URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description: "Estimate website development costs in Pakistan, Saudi Arabia and the United Kingdom, in PKR, SAR or GBP.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE}/tools` },
        { "@type": "ListItem", position: 3, name: "Website Cost Calculator", item: URL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <WebsiteCostCalculatorClient />
    </>
  );
}