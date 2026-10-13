import Link from "next/link";
import type { ReactNode } from "react";
import { Poppins, Roboto } from "next/font/google";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

/* Shared layout for /privacy-policy, /terms-and-conditions and /cookie-policy.
   Server component: no client JS. Fonts use the same config as the rest of the site. */

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });

export const BASE = "https://www.devntomsolutions.com";
export const LAST_UPDATED = "13 October 2026";
export const LAST_UPDATED_ISO = "2026-10-13";

/** Single source of truth for company details used inside the policies. */
export const CO = {
  name: "DEVNTOM Solutions",
  site: "www.devntomsolutions.com",
  email: "info@devntomsolutions.com",
  phones: [
    ["Pakistan", "+92 325 6036838", "+923256036838"],
    ["Saudi Arabia", "+966 583 408034", "+966583408034"],
    ["United Kingdom", "+44 7475 352330", "+447475352330"],
  ] as const,
  offices: "Lahore (Pakistan), Riyadh (Saudi Arabia) and London (United Kingdom)",
  // CONFIRM with your lawyer: the entity that signs contracts and the courts that hear disputes.
  lawText: "the laws of Pakistan",
  venueText: "the courts of Lahore, Pakistan",
};

export const LEGAL_LINKS = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms and Conditions", "/terms-and-conditions"],
  ["Cookie Policy", "/cookie-policy"],
] as const;

/* ---- small typographic helpers so every policy looks the same ---- */
export const P = ({ children }: { children: ReactNode }) => <p>{children}</p>;
export const H3 = ({ children }: { children: ReactNode }) => <h3 className={`${pop.className} !mt-8 text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{children}</h3>;
export const Ul = ({ children }: { children: ReactNode }) => <ul className="list-none space-y-2.5 pl-0">{children}</ul>;
export const Li = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#0A5CFF]">{children}</li>
);
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4 transition hover:text-[#007BFF]" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
);
export const Callout = ({ children }: { children: ReactNode }) => (
  <div className="rounded-[4px] border border-[#CFE2FF] bg-[#F5F9FF] p-5 text-[15px] leading-relaxed text-[#1F3350]">{children}</div>
);
export const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto rounded-[4px] border border-[#DCE8F7]">
    <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
      <thead className="bg-[#F5F9FF] text-[#0B1F3B]">
        <tr>{head.map((h) => <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em]">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-[#DCE8F7] align-top">{r.map((c, j) => <td key={j} className={`px-4 py-3.5 ${j === 0 ? "font-medium text-[#0B1F3B]" : ""}`}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

export type LegalSection = { id: string; title: string; content: ReactNode };

type Props = { slug: string; title: string; summary: string; sections: LegalSection[] };

export default function LegalLayout({ slug, title, summary, sections }: Props) {
  const url = `${BASE}/${slug}`;
  const words = title.split(" ");
  const last = words.pop();
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description: summary, inLanguage: "en", dateModified: LAST_UPDATED_ISO, isPartOf: { "@type": "WebSite", "@id": `${BASE}/#website`, url: BASE, name: CO.name }, breadcrumb: { "@id": `${url}#breadcrumb` } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: title, item: url }] },
    ],
  };

  return (
    <main id="main" className={`${rob.className} bg-white text-[#1F2937]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#030A17] px-6 pb-20 pt-36 text-white md:px-12 md:pb-28 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -left-[10%] -top-[30%] h-[640px] w-[640px] rounded-full bg-[#0052CC]/40 blur-[140px]" />
          <div className="absolute -right-[8%] top-[10%] h-[460px] w-[460px] rounded-full bg-[#00B4FF]/20 blur-[130px]" />
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.12) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)" }} />
        </div>
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/55">
            <Link href="/" className="transition hover:text-white">Home</Link><span aria-hidden="true">/</span><span className="text-white/85">{title}</span>
          </nav>
          <div className="mt-8 flex items-center gap-3"><span className="h-px w-9 bg-[#00B4FF]" /><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7DB0FF]">Legal</span></div>
          <h1 className={`${pop.className} mt-5 text-[clamp(2.4rem,6vw,5rem)] font-extralight leading-[1.02] tracking-[-0.04em]`}>{words.join(" ")} <b className="font-bold">{last}</b></h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">{summary}</p>
          <p className="mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-full border border-white/15 bg-white/[.05] px-5 py-2 text-sm text-[#CFE2FF]">
            <span>Last updated {LAST_UPDATED}</span><span aria-hidden="true" className="text-white/30">·</span><span>Applies to {CO.site}</span>
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <nav aria-label="On this page">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">On this page</p>
                <ol className="mt-4 space-y-1 border-l border-[#E2ECF9]">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-[#475569] transition hover:border-[#0A5CFF] hover:text-[#0A5CFF]">
                        <span className="font-mono text-xs text-[#94A3B8]">{String(i + 1).padStart(2, "0")}</span><span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <nav aria-label="Other legal pages" className="mt-10 hidden lg:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">Other policies</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {LEGAL_LINKS.filter(([, href]) => href !== `/${slug}`).map(([label, href]) => (
                    <li key={href}><Link href={href} className="inline-flex items-center gap-1.5 text-[#0052CC] transition hover:text-[#007BFF]">{label}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-[#E2ECF9] py-10 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-h`} className={`${pop.className} flex items-baseline gap-4 text-2xl font-semibold tracking-[-0.025em] text-[#0B1F3B] md:text-3xl`}>
                  <span className="font-mono text-sm font-normal text-[#0A5CFF]">{String(i + 1).padStart(2, "0")}</span>{s.title}
                </h2>
                <div className="mt-5 space-y-4 text-[16px] leading-[1.85] text-[#374151]">{s.content}</div>
              </section>
            ))}
          </article>
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="bg-[#050E1F] px-6 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`${pop.className} text-3xl font-extralight tracking-[-0.03em] md:text-4xl`}>Questions about this <b className="font-bold">page</b>?</p>
            <p className="mt-3 max-w-md font-light text-[#B8C9DE]">Write to us and a real person will reply.</p>
          </div>
          <div className="flex flex-col gap-3 text-[15px] sm:flex-row sm:flex-wrap sm:items-center">
            <a href={`mailto:${CO.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#0B1F3B] transition hover:bg-[#0A5CFF] hover:text-white"><Mail size={16} aria-hidden="true" />{CO.email}</a>
            <a href={`tel:${CO.phones[0][2]}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 transition hover:bg-white hover:text-[#0B1F3B]"><Phone size={16} aria-hidden="true" />{CO.phones[0][1]}</a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-2 py-3 text-[#93C5FD] underline underline-offset-4 transition hover:text-white">Contact page</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
