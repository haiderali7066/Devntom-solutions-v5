import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

const SITE = "https://www.devntomsolutions.com";

// Page-level SEO: overrides the layout defaults for the homepage only.
export const metadata: Metadata = {
  title: {
    absolute: "Website, Software & AI Development Company | Devntom Solutions",
  },
  description:
    "Devntom Solutions builds fast websites, custom software, mobile apps and AI automation. Offices in Lahore, Riyadh and London. ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    title: "Devntom Solutions | Where Systems Become Strategy",
    description: "We engineer digital systems that scale: websites, software, apps and AI automation.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Devntom Solutions digital systems" }],
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE}/#webpage`,
  url: SITE,
  name: "Devntom Solutions | Where Systems Become Strategy",
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@id": `${SITE}/#organization` },
  inLanguage: "en",
  hasPart: [
    "website-development", "custom-software-development", "mobile-app-development",
    "ai-automation", "digital-marketing", "ui-ux-design", "seo-optimization",
  ].map((s) => ({ "@type": "WebPage", url: `${SITE}/services/${s}` })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {/* HomeClient renders its own <main id="main"> and the FAQ JSON-LD */}
      <HomeClient />
    </>
  );
}
