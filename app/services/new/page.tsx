import type { Metadata } from "next";
import MarketingPreviewClient from "./MarketingPreviewClient";

const SITE = "https://www.devntomsolutions.com";
const CANONICAL = `${SITE}/services/digital-marketing`;
const DESCRIPTION =
  "Data-driven digital marketing: SEO, paid search and social, email, landing pages and reporting, built as one system. DEVNTOM Solutions, Lahore, Riyadh and London.";

export const metadata: Metadata = {
  title: "Digital Marketing Preview",
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: "DEVNTOM Solutions",
    title: "Digital Marketing Services | DEVNTOM Solutions",
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Digital marketing by Devntom Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | DEVNTOM Solutions",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function Page() {
  return <MarketingPreviewClient />;
}
