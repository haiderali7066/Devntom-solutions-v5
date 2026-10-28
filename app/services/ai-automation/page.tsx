
import type { Metadata } from "next";
import AiAutomationClient from "./AiAutomationClient";

const SITE_URL = "https://www.devntomsolutions.com";
const PAGE_URL = `${SITE_URL}/ai-automation`;

export const metadata: Metadata = {
  title:
    "AI Automation Services ",

  description:
    "Automate business workflows with AI-powered solutions, intelligent agents, and custom automation systems. DEVNTOM Solutions serves businesses in Pakistan, Saudi Arabia, and the United Kingdom.",

  keywords: [
    "AI automation services",
    "AI automation company",
    "business process automation",
    "AI workflow automation",
    "AI agents for business",
    "custom AI solutions",
    "intelligent business automation",
    "AI automation Pakistan",
    "AI automation Saudi Arabia",
    "AI automation UK",
    "business automation services",
    "DEVNTOM Solutions",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "AI Automation Services | DEVNTOM Solutions",
    description:
      "Transform business operations with AI automation, intelligent workflows, and custom AI-powered systems for growing businesses.",
    url: PAGE_URL,
    siteName: "DEVNTOM Solutions",
    type: "website",
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services | DEVNTOM Solutions",
    description:
      "Build smarter business operations with AI agents, workflow automation, and intelligent systems.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function AiAutomationPage() {
  return <AiAutomationClient />;
}
