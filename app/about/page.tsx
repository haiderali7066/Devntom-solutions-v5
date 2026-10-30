import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE = "https://www.devntomsolutions.com";
const TITLE = "About Us";
const DESC = "Devntom Solutions designs and builds websites, software and marketing for businesses worldwide, from offices in Lahore, Riyadh and London.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/about" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/about", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "About Devntom Solutions" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og.png"] },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    url: SITE + "/about",
    mainEntity: {
      "@type": "Organization",
      name: "DEVNTOM Solutions",
      url: SITE,
      description: DESC,
      email: "info@devntomsolutions.com",
      location: ["Lahore, Pakistan", "Riyadh, Saudi Arabia", "London, United Kingdom"].map((n) => ({ "@type": "Place", name: n })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "About", item: SITE + "/about" },
    ],
  },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <AboutClient />
    </>
  );
}
