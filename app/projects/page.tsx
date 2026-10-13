import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
// import { projects } from "@/data/projects"; // your data: map its fields onto the Project type in ProjectsClient

const SITE = "https://www.devntomsolutions.com";
const TITLE = "Our Projects | Websites, Apps, Marketing and Automation | DEVNTOM Solutions";
const DESC = "A selection of websites, online stores, web apps, marketing campaigns and AI automation projects delivered by DEVNTOM Solutions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/projects" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/projects", type: "website" },
  twitter: { card: "summary_large_image" },
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
      <ProjectsClient /* projects={projects} */ />
    </>
  );
}