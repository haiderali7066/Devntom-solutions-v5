/**
 * app/services/custom-software-development/page.tsx  (server component, no "use client")
 * Rename this file to page.tsx (it replaces the older single-file page). Holds the metadata and JSON-LD.
 */
import type { Metadata } from "next";
import CustomSoftwareClient from "./CustomSoftwareDevelopmentClient";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/custom-software-development";
const TITLE = "Custom Software Development Services | DEVNTOM Solutions";
const DESC = "Custom software development services by DEVNTOM Solutions. Build scalable business applications, custom platforms and software solutions tailored to your workflows and goals.";

const faqs = [
  ["What are custom software development services?", "They cover designing, building and maintaining software made for one business instead of buying a ready-made product. It is shaped around your workflows, your data and your goals, and you own the result."],
  ["When should I choose custom software instead of off-the-shelf tools?", "When ready-made tools force you to change how you work, when you pay for features you do not use, or when your processes are what make your business different. If an existing tool fits well, we will tell you."],
  ["How much does custom software development cost?", "It depends on scope, users, integrations, design and timeline, so we do not publish fixed prices. After a short consultation we send a clear proposal with deliverables, a timeline and a price. Building in phases helps you control spend."],
  ["Do you work with startups and small businesses?", "Yes. For startups we usually start with a focused first release. For small businesses we often replace spreadsheets and manual steps with one simple system that can grow."],
  ["Can you build CRM and ERP systems?", "Yes. We build custom CRM and ERP software, as well as workflow automation, portals, internal tools and SaaS platforms, and connect them to the tools you already use."],
  ["Can you modernize our existing software?", "Yes. We review what you have, keep what works and move the rest to a modern platform in stages, so the business keeps running during the change."],
  ["Can we outsource custom software development to you?", "Yes. Many clients hand us the whole project, from discovery to launch and support, while others use us to extend their own team. We agree who does what in the proposal."],
  ["Who owns the code and the data?", "You do. We agree this in writing at the start, and we document the system so it is not dependent on us."],
  ["Do you support the software after launch?", "Yes. We offer maintenance and support covering monitoring, updates, fixes and new features."],
  ["Where do you work?", "We have teams in Lahore, Riyadh and London and work with businesses worldwide, using video calls and shared tools to keep projects moving."],
] as const;

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Service", name: "Custom Software Development Services", serviceType: "Custom software development", description: DESC, url: SITE + PATH,
    areaServed: ["Pakistan", "Saudi Arabia", "United Kingdom", "Worldwide"], provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
    { "@type": "ListItem", position: 3, name: "Custom Software Development", item: SITE + PATH },
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
      <CustomSoftwareClient faqs={faqs} />
    </>
  );
}