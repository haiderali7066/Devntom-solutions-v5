import { Gauge, LayoutDashboard, Search, ShieldCheck, ShoppingCart, Smartphone } from "lucide-react";

export const PATH = "/services/website-development";

export const problems = [
  "Slow pages that lose visitors before they read a word",
  "Good-looking sites that never show up in search",
  "Template builds that are hard to change and harder to scale",
  "Forms and enquiries that go nowhere",
];

export const outcomes = [
  "Fast, responsive pages built on Next.js and React",
  "Clean metadata and structured data from the first release",
  "A CMS your own team can use without a developer",
  "Lead forms wired to your inbox or CRM",
];

export const features = [
  { icon: Gauge, title: "Speed by default", text: "Server rendering, optimised images and lean code so pages load quickly on any connection." },
  { icon: Smartphone, title: "Responsive on every screen", text: "Layouts designed for phones first, then tablets and large desktops, and tested on all three." },
  { icon: Search, title: "SEO built in", text: "Clean URLs, metadata, sitemap and structured data are part of the build, not an add-on." },
  { icon: LayoutDashboard, title: "A CMS you can use", text: "Edit pages, posts and products yourself, with a structure that keeps the design intact." },
  { icon: ShoppingCart, title: "E-commerce ready", text: "Catalogues, checkout, payments and order management when you need to sell online." },
  { icon: ShieldCheck, title: "Secure and maintainable", text: "Spam-protected forms, typed code and clear structure that any team can extend later." },
] as const;

export const types = [
  { ghost: "WEB", title: "Business websites", text: "Company sites that explain what you do, build trust and turn visits into enquiries.", list: ["Service and about pages", "Blog and case studies", "Lead forms and CMS"] },
  { ghost: "SHOP", title: "E-commerce stores", text: "Fast storefronts with the catalogue, checkout and order tools your team needs.", list: ["Product catalogue", "Checkout and payments", "Order management"] },
  { ghost: "APP", title: "Web platforms and portals", text: "Logged-in experiences such as customer portals, booking systems and dashboards.", list: ["Accounts and roles", "Dashboards and reports", "API integrations"] },
] as const;

export const steps = [
  ["Discovery and strategy", "Goals, audience, sitemap and content plan signed off before design starts.", "Discovery"],
  ["Architecture and design", "Page structure, wireframes, visual design and a reusable component system.", "Design"],
  ["Development and build", "A Next.js build in sprints, with a working demo at every milestone.", "Development"],
  ["Quality assurance", "Speed, security, accessibility and cross-browser checks before launch.", "Quality"],
  ["Launch and deployment", "Deployment, redirects, analytics and monitoring, with a rollback plan.", "Launch"],
  ["Support and growth", "Fixes, content updates and search growth after go-live.", "Support"],
] as const;

export const faqs = [
  ["What types of websites do you build?", "Company websites, e-commerce stores, landing pages, portals and web platforms, all on Next.js and React."],
  ["Why do you build with Next.js and React?", "They give fast page loads, a strong SEO foundation and clean, maintainable code that any development team can extend later."],
  ["Will my website be ready for search engines?", "Yes. We build with clean metadata, structured data, a sitemap, fast loading and mobile performance in mind from the first release."],
  ["How much does a website cost?", "It depends on the number of pages, features and integrations. After a short discovery step we send a clear quote with deliverables and a timeline, so there are no surprises."],
  ["How long does a website take to build?", "It depends on scope. We agree the timeline during discovery and show a working demo at every milestone, so you always know where the project stands."],
  ["Can I update the content myself?", "Yes. We connect a CMS so your team can edit pages, posts and products without needing a developer."],
  ["Can you redesign or move my existing website?", "Yes. We rebuild existing sites and keep your important URLs with proper redirects, so you do not lose the search visibility you already have."],
  ["Do you support the website after launch?", "Yes. Support and growth is the last step of our process, covering fixes, improvements, monitoring and search growth."],
] as const;
