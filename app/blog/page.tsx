import type { Metadata } from "next";
import BlogClient from "./BlogClient";
// import { getAllPosts } from "@/lib/blog"; // your data layer: map its fields onto the Post type in BlogClient

const SITE = "https://www.devntomsolutions.com";
const TITLE = "Our Blog";
const DESC = "Practical guides on websites, digital marketing, custom software and AI automation from the team at Devntom Solutions.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: SITE + "/blog" },
  openGraph: { title: TITLE, description: DESC, url: SITE + "/blog", type: "website", images: [{ url: "/og-blog.png", width: 1200, height: 630, alt: "Devntom Solutions blog" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-blog.png"] },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Blog", name: "DEVNTOM Solutions Blog", url: SITE + "/blog", description: DESC, publisher: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/blog" },
  ] },
];

export default function Page() {
  // const posts = getAllPosts().map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, date: p.date, readMinutes: p.readTime, image: p.image }));
  return (
    <>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <BlogClient /* posts={posts} */ />
    </>
  );
}
