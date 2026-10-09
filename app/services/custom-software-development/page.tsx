import type { Metadata } from "next";
import CustomSoftwareClient from "./CustomSoftwareDevelopmentClient";

const SITE_URL = "https://www.devntomsolutions.com";
const PAGE_URL = `${SITE_URL}/services/custom-software`;

export const metadata: Metadata = {
  title: "Custom Software Development Services | SaaS & ERP | DEVNTOM Solutions",
  description:
    "DEVNTOM Solutions engineers bespoke custom software, SaaS platforms, internal tools, and enterprise web applications designed to automate workflows and scale businesses.",
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
    title: "Custom Software Development Services | DEVNTOM Solutions",
    description:
      "Engineer bespoke custom software, SaaS platforms, and enterprise web applications built on modern, scalable tech stacks.",
    images: [
      {
        url: `${SITE_URL}/images/custom-software-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Custom Software Development Services by DEVNTOM Solutions",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development Services | DEVNTOM Solutions",
    description:
      "Bespoke software solutions, enterprise web apps, and SaaS development.",
    images: [`${SITE_URL}/images/custom-software-og.jpg`],
  },
  keywords: [
    "custom software development",
    "SaaS application development",
    "enterprise software solutions",
    "web application development",
    "custom CRM development",
    "custom ERP development",
    "software development agency",
    "MERN stack developers",
    "Next.js software agency",
    "legacy software modernization",
    "DEVNTOM Solutions",
  ],
  category: "Technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Custom Software Development",
  serviceType: "Software Engineering & SaaS Development",
  url: PAGE_URL,
  description:
    "End-to-end custom software development services, specializing in SaaS products, enterprise web apps, internal dashboards, and API integrations.",
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DEVNTOM Solutions",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "Worldwide" },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Enterprises, SaaS founders, and mid-market businesses",
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
      <CustomSoftwareClient />
    </>
  );
}