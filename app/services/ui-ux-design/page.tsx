import type { Metadata } from "next";
import UIUXDesignClient from "./UiUxDesignClient";

const SITE_URL = "https://www.devntomsolutions.com";
const PAGE_URL = `${SITE_URL}/services/ui-ux-design`;

export const metadata: Metadata = {
  title: "UI/UX Design & Product Strategy Services",
  description:
    "High-end UI/UX design, interactive prototyping, and scalable design systems engineered for user delight and conversion. Based in Lahore, serving global enterprises.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "UI/UX Design & Product Strategy Services | DEVNTOM Solutions",
    description: "Crafting intuitive digital experiences and memorable brand identities through meticulous design thinking.",
    url: PAGE_URL,
    siteName: "DEVNTOM Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/ui-ux-design-og.jpg`,
        width: 1200,
        height: 630,
        alt: "UI/UX Design Services by DEVNTOM Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design & Product Strategy Services | DEVNTOM Solutions",
    description: "High-end UI/UX design and interactive prototyping for modern digital products.",
    images: [`${SITE_URL}/images/ui-ux-design-og.jpg`],
  },
  keywords: [
    "UI UX design services",
    "product design agency",
    "Figma design systems",
    "interactive prototyping",
    "user experience design",
    "web and mobile UI design",
    "UX research and wireframing",
    "DEVNTOM Solutions",
    "UI UX agency in Lahore",
  ],
};

export default function UIUXDesignPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "UI/UX Design & Product Strategy",
    "provider": {
      "@type": "LocalBusiness",
      "name": "DEVNTOM Solutions",
      "image": `${SITE_URL}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
        "addressCountry": "PK",
      },
      "url": SITE_URL,
    },
    "areaServed": [
      { "@type": "City", "name": "Lahore" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "description": "Premium UI/UX design, wireframing, and Figma design systems engineered by DEVNTOM Solutions.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <UIUXDesignClient />
    </>
  );
}