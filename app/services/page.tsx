import type { Metadata } from "next";
import ServicesClient, { type Service } from "./ServicesClient";

/**
 * /services
 * Server component: owns the metadata and structured data, then renders the client page.
 * Nav and Footer come from app/layout.tsx.
 */

const SITE = "https://www.devntomsolutions.com";
const URL = `${SITE}/services`;
const title = "Digital Services: Web, Software, AI and SEO | DEVNTOM";
const description =
  "Website development, custom software, mobile apps, AI automation, digital marketing, UI/UX design and SEO from one team in Lahore, Riyadh and London.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL },
  openGraph: { title, description, url: URL, siteName: "DEVNTOM Solutions", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const services: Service[] = [
  { name: "Website Development", href: "/services/website-development", text: "Stunning, responsive, high-performance websites optimised for speed, security and scalability, from company sites to e-commerce.", points: ["Next.js and React builds", "SEO and structured data", "CMS and lead forms"] },
  { name: "Custom Software", href: "/services/custom-software-development", text: "Scalable web apps, SaaS platforms, CRM, ERP and business management systems built to streamline complex operations.", points: ["SaaS platforms and web apps", "CRM, ERP and internal tools", "Dashboards and integrations"] },
  { name: "Mobile Apps", href: "/services/mobile-app-development", text: "Native and cross-platform mobile applications with powerful backend systems for smooth, reliable performance.", points: ["iOS and Android apps", "Secure accounts and notifications", "Admin panel and API"] },
  { name: "AI Automation", href: "/services/ai-automation", text: "Intelligent AI workflows and automation pipelines that save time, reduce manual errors and boost efficiency.", points: ["Workflow automation", "Intake, routing and reporting", "AI and ML integrations"] },
  { name: "Digital Marketing", href: "/services/digital-marketing", text: "Smart, data-driven marketing strategies and targeted campaigns designed to increase visibility and conversions online.", points: ["Campaign strategy", "Targeted paid and social", "Lead and conversion reporting"] },
  { name: "UI/UX Design", href: "/services/ui-ux-design", text: "Intuitive, user-centred branding and interface design that drives engagement and delivers a flawless digital experience.", points: ["Branding and interface design", "User flows and wireframes", "Reusable design systems"] },
  { name: "SEO", href: "/services/seo-optimization", text: "Technical and content-driven search optimisation to climb the rankings and drive sustainable organic growth.", points: ["Technical SEO audits", "Content-driven strategy", "Ongoing ranking growth"] },
];

const faqs: [string, string][] = [
  ["What services does Devntom Solutions offer?", "Seven practice areas: website development, custom software, mobile apps, AI automation, digital marketing, UI/UX design and SEO, all delivered by one team."],
  ["How do I choose the right service?", "Start with your goal, such as a new website, more leads or less manual work. If you are not sure, tell us what you are trying to achieve and we will recommend where to begin."],
  ["Can I combine several services in one project?", "Yes, and we recommend it. A website works harder with SEO and good design behind it, and software works harder with automation. We plan them as one connected system."],
  ["How does a project start?", "Send us your idea through the form or book a call. We then follow our six-step process, beginning with discovery and strategy."],
  ["How much will my project cost?", "It depends on scope. After a short discovery step we send a clear quote with deliverables and a timeline, so there are no surprises."],
  ["Do you work with clients outside Pakistan?", "Yes. We have offices in Lahore, Riyadh and London, and we work with clients around the world."],
  ["Do you support projects after launch?", "Yes. Support and growth is the final step of our process, covering fixes, improvements and search growth after launch."],
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services",
    url: URL,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name: s.name, url: SITE + s.href, description: s.text, provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE } },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <ServicesClient services={services} faqs={faqs} />
    </>
  );
}
