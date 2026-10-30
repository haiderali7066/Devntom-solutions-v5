import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { projects } from "./projects";

const SITE = "https://www.devntomsolutions.com";
const TITLE = "Our Projects";
const DESC = `Explore ${projects.length} DEVNTOM Solutions case studies across business websites, e-commerce platforms and custom web applications.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/projects" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/projects", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Devntom Solutions project portfolio" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og.png"] },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: TITLE, url: SITE + "/projects", description: DESC, isPartOf: { "@type": "WebSite", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Projects", item: SITE + "/projects" },
  ] },
];

export default function Page() {
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <ProjectsClient projects={projects} />
    </>
  );
}
