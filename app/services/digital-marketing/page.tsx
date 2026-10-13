/**
 * app/services/digital-marketing/page.tsx  (server component, no "use client")
 * Rename this file to page.tsx. It holds the metadata and JSON-LD, and renders the client page.
 */
import type { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/digital-marketing";
const TITLE = "Digital Marketing Services | DEVNTOM Solutions";
const DESC = "SEO, paid ads, social media, email and content marketing with clear reporting. Digital marketing that brings the right customers to your business. DEVNTOM Solutions, Lahore, Riyadh and London.";

const faqs = [
  ["Which channels do you work with?", "SEO, Google and Meta ads, LinkedIn, social media, email and content. We recommend the mix that fits your goals and budget rather than selling everything."],
  ["How soon will I see results?", "Paid ads can bring traffic within days, though they improve as we test. SEO and content usually take a few months to build. We agree realistic milestones at the start."],
  ["Do you guarantee rankings or sales?", "No honest agency can. Rankings depend on search engines and competition. We guarantee clear tracking, steady improvement and plain reporting."],
  ["Is the ad budget included in your fee?", "No. Ad spend goes directly to Google, Meta and the other platforms from your own accounts, so you always see where it goes."],
  ["What will I receive each month?", "A short report covering traffic, leads, cost per lead and conversions, plus what we changed and what we plan to do next."],
  ["Can you work with my existing website?", "Yes. We start with an audit and fix tracking and speed issues first. If the site holds results back, we can improve or rebuild it."],
  ["Do you work with local and B2B businesses?", "Yes. Local listings and map results for service businesses, and LinkedIn, content and email for B2B."],
  ["How does pricing work?", "It depends on scope and channels. After a short discovery call we send a clear proposal with deliverables and a monthly fee."],
] as const;

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Service", name: "Digital Marketing", serviceType: "Digital marketing", description: DESC, url: SITE + PATH, provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
    { "@type": "ListItem", position: 3, name: "Digital Marketing", item: SITE + PATH },
  ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + PATH },
  openGraph: { title: TITLE, description: DESC, url: SITE + PATH, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <DigitalMarketingClient faqs={faqs} />
    </>
  );
}