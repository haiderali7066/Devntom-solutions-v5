 import type { Metadata } from "next";
import WebsiteDevelopmentClient from "./WebsiteDevelopmentClient";

const SITE_URL = "https://www.devntomsolutions.com";
const PAGE_URL = `${SITE_URL}/services/website-development`;

export const metadata: Metadata = {
  title:
    "Website Development Services | Custom Business Websites | DEVNTOM Solutions",

  description:
    "DEVNTOM Solutions delivers custom website development for businesses, startups, and enterprises. Build fast, responsive, SEO-friendly websites designed to drive growth worldwide.",

  alternates: {
    canonical: PAGE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "DEVNTOM Solutions",
    title:
      "Website Development Services | DEVNTOM Solutions",
    description:
      "Discover custom website development solutions for businesses, startups, and enterprises, built for performance, user experience, and online growth.",
    images: [
      {
        url: `${SITE_URL}/images/website-development-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom Website Development Services by DEVNTOM Solutions",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Website Development Services | DEVNTOM Solutions",
    description:
      "Custom, responsive, performance-focused websites for businesses worldwide.",
    images: [`${SITE_URL}/images/website-development-og.jpg`],
  },

  keywords: [
    "website development services",
    "custom website development",
    "business website development",
    "professional web development company",
    "responsive website development",
    "SEO-friendly website development",
    "website developers in Pakistan",
    "web development company in Lahore",
    "website development for startups",
    "enterprise website development",
    "DEVNTOM Solutions",
  ],

  category: "Technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Website Development Services",
  serviceType: "Custom Website Development",
  url: PAGE_URL,
  description:
    "Custom website development services for businesses, startups, and enterprises, focused on performance, responsive design, search visibility, and business growth.",
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DEVNTOM Solutions",
    url: SITE_URL,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Pakistan",
    },
    {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    {
      "@type": "Country",
      name: "United Kingdom",
    },
    {
      "@type": "Place",
      name: "Worldwide",
    },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Businesses, startups, and enterprises",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <WebsiteDevelopmentClient />
    </>
  );
}