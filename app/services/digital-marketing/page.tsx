import type { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";

const SITE = "https://www.devntomsolutions.com";
const PAGE_URL = `${SITE}/services/digital-marketing`;

export const metadata: Metadata = {
  title: "Digital Marketing & Growth Engineering",
  description:
    "Data-driven digital marketing, SEO, performance advertising, and conversion rate optimization engineered for absolute scale. Based in Lahore, serving global enterprises.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Digital Marketing & Growth Engineering | DEVNTOM Solutions",
    description: "Algorithmic scaling and precision performance marketing for ambitious brands.",
    url: PAGE_URL,
    siteName: "DEVNTOM Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Digital marketing by Devntom Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Growth Engineering | DEVNTOM Solutions",
    description: "Algorithmic scaling and precision performance marketing for ambitious brands.",
    images: ["/og.png"],
  },
};

export default function DigitalMarketingPage() {
  // Local Business & Service Schema for Local/Geo SEO (Lahore, PK)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "DEVNTOM Solutions",
      "image": `${SITE}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
        "addressCountry": "PK",
      },
      "url": SITE,
    },
    "areaServed": [
      { "@type": "City", "name": "Lahore" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "description": "High-performance digital marketing, SEO, and PPC campaigns engineered by DEVNTOM Solutions.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalMarketingClient />
    </>
  );
}
