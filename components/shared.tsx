import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import type { ReactNode } from "react";
import { Bot, Code2, Globe, Megaphone, PenTool, Search, Smartphone } from "lucide-react";

export const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
export const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
export const pw = Playwrite_CA({ weight: "400", display: "swap" });

export const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
export const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";

// Placeholder photos from Unsplash. Replace with real project screenshots and team photos.
export const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const services = [
  [Globe, "Website Development", "/services/website-development", "Fast, responsive, SEO-friendly sites on Next.js and React, from company sites to e-commerce."],
  [Code2, "Custom Software", "/services/custom-software-development", "Web apps, SaaS, CRM and ERP systems that replace spreadsheets and manual steps."],
  [Smartphone, "Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps with reliable backends."],
  [Bot, "AI Automation", "/services/ai-automation", "Workflows and pipelines that remove repetitive work and errors."],
  [Megaphone, "Digital Marketing", "/services/digital-marketing", "Data-driven campaigns that bring in qualified leads."],
  [PenTool, "UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
  [Search, "SEO", "/services/seo-optimization", "Technical and content SEO for steady organic growth."],
] as const;

export const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>
);

export function Lines({ lines, className = "", h1 = false }: { lines: ReactNode[]; className?: string; h1?: boolean }) {
  const Tag = (h1 ? "h1" : "h2") as "h2";
  return (
    <Tag data-r className={`${pop.className} font-extralight ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="ln block">
          <span style={{ transitionDelay: `${i * 110}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
