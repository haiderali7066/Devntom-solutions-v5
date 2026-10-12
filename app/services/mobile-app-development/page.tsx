import type { Metadata } from "next";
import MobileAppDevelopmentClient from "./MobileAppDevelopmentClient";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/mobile-app-development";
const URL = `${SITE}${PATH}`;

// The layout adds " | Devntom Solutions" through its title template.
export const metadata: Metadata = {
  title: "Mobile App Development Company: iOS and Android Apps",
  description:
    "Devntom Solutions designs and builds fast, secure iOS and Android apps with the backend, admin dashboard and App Store launch included. Offices in Lahore, Riyadh and London.",
  keywords: [
    "mobile app development company", "iOS app development", "Android app development",
    "Flutter app development", "React Native app development", "app development Pakistan",
    "app development Saudi Arabia", "app development London", "MVP app development",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: URL,
    title: "Mobile App Development | Devntom Solutions",
    description: "Apps people love: iOS, Android and cross-platform apps with secure backends and store launch.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mobile app development by Devntom Solutions" }], // TODO: add a page-specific image
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development | Devntom Solutions",
    description: "iOS, Android and cross-platform apps with secure backends and store launch.",
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
      name: "Mobile App Development",
      serviceType: "Mobile app development",
      url: URL,
      description:
        "Design and development of iOS, Android and cross-platform mobile apps, including backend APIs, admin dashboards and app store launch.",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: [
        { "@type": "Country", name: "Pakistan" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mobile app services",
        itemListElement: ["iOS app development", "Android app development", "Cross-platform app development", "Backend and API development", "App store launch and support"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
        { "@type": "ListItem", position: 3, name: "Mobile App Development", item: URL },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <MobileAppDevelopmentClient />
    </>
  );
}