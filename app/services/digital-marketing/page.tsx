import type { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";

export const metadata: Metadata = {
  title: "Digital Marketing & Growth Engineering | DEVNTOM Solutions",
  description:
    "Data-driven digital marketing, SEO, performance advertising, and conversion rate optimization engineered for absolute scale. Based in Lahore, serving global enterprises.",
  alternates: {
    canonical: "https://devntom.com/services/digital-marketing",
  },
  openGraph: {
    title: "Digital Marketing & Growth Engineering | DEVNTOM Solutions",
    description: "Algorithmic scaling and precision performance marketing for ambitious brands.",
    url: "https://devntom.com/services/digital-marketing",
    siteName: "DEVNTOM Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing & Growth Engineering | DEVNTOM Solutions",
    description: "Algorithmic scaling and precision performance marketing for ambitious brands.",
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
      "image": "https://devntom.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
        "addressCountry": "PK",
      },
      "url": "https://devntom.com",
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