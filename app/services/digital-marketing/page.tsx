import { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";

export const metadata: Metadata = {
  title: "Digital Marketing & Growth | DEVNTOM Solutions",
  description: "We don't just run campaigns; we engineer omnipresence. Data-driven performance marketing, SEO, and CRO for brands that demand absolute scale.",
  openGraph: {
    title: "Digital Marketing & Growth | DEVNTOM Solutions",
    description: "Algorithmic growth, performance marketing, and conversion rate optimization engineered for scale.",
    type: "website",
  },
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingClient />;
}