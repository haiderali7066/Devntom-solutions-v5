import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const SITE = "https://www.devntomsolutions.com";
const TITLE = "Contact DEVNTOM Solutions | Start Your Project";
const DESC = "Tell us about your website, marketing, software or automation project. Email or WhatsApp us, or send the form. Offices in Lahore, Riyadh and London.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/contact" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/contact", type: "website" },
  twitter: { card: "summary_large_image" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: TITLE,
    url: SITE + "/contact",
    mainEntity: {
      "@type": "Organization",
      name: "DEVNTOM Solutions",
      url: SITE,
      email: "info@devntomsolutions.com",
      contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "info@devntomsolutions.com", telephone: "+92 325 6036838" }],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Contact", item: SITE + "/contact" },
    ],
  },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <ContactClient />
    </>
  );
}