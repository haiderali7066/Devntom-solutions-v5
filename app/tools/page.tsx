import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Calculator, Check, Percent, QrCode, Route as RouteIcon, type LucideIcon } from "lucide-react";

/* /tools: ONE server file. Metadata, structured data, design and a CSS-only topic filter.
   Everything lives in app/tools (nothing in lib). To add a tool, add one object to TOOLS below. */

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

const BASE = "https://www.devntomsolutions.com";
const TITLE = "Online Tools for Websites, VAT & ZATCA | DEVNTOM Solutions";
const DESC = "Practical online tools from DEVNTOM Solutions: a redirect map generator, VAT calculator, website cost calculator and ZATCA QR code generator.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: TITLE,
  description: DESC,
  keywords: ["redirect map generator", "VAT calculator", "website cost calculator", "ZATCA QR code generator", "online business tools"],
  alternates: { canonical: "/tools" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", url: `${BASE}/tools`, siteName: "DEVNTOM Solutions", title: TITLE, description: DESC,
    images: [{ url: "/og-tools.png", width: 1200, height: 630, alt: "DEVNTOM Solutions online tools" }],
  },
  twitter: { card: "summary_large_image", site: "@DevntomS18433", title: TITLE, description: DESC, images: ["/og-tools.png"] },
};

/* ---- the tools: one object each. `slug` is the folder name inside app/tools ---- */
type Tool = {
  slug: string;
  name: string;
  topic: "SEO and migration" | "Planning" | "Tax and invoicing";
  icon: LucideIcon;
  summary: string;
  points: string[];
  tags: string[];
  visual: "redirect" | "vat" | "cost" | "qr";
};

const TOPICS = ["SEO and migration", "Planning", "Tax and invoicing"] as const;

const TOOLS: Tool[] = [
  {
    slug: "redirect-map-generator", name: "Redirect Map Generator", topic: "SEO and migration", icon: RouteIcon, visual: "redirect",
    summary: "Moving or rebuilding a website? Turn a list of old and new URLs into ready-to-use redirect rules, so you keep your rankings and visitors.",
    points: ["Start from a simple CSV of old and new URLs", "Export rules for Next.js, Nginx and Apache", "Avoid broken links after a migration"],
    tags: ["301 redirects", "Migration", "SEO"],
  },
  {
    slug: "vat-calculator", name: "VAT Calculator", topic: "Tax and invoicing", icon: Percent, visual: "vat",
    summary: "Add VAT to a price or take it out of a total, and see the net, VAT and gross amounts at a glance, with country-specific rates.",
    points: ["Add or remove VAT in one step", "Net, VAT and gross shown clearly", "Pages for different countries"],
    tags: ["VAT", "GST", "Pricing"],
  },
  {
    slug: "website-cost-calculator", name: "Website Cost Calculator", topic: "Planning", icon: Calculator, visual: "cost",
    summary: "Choose the pages and features you need and get a realistic estimate for your website project before you speak to anyone.",
    points: ["Pick pages, features and design level", "See what drives the price", "Use the result to brief an agency"],
    tags: ["Budget", "Estimate", "Web design"],
  },
  {
    slug: "zatca-qr-code-generator", name: "ZATCA QR Code Generator", topic: "Tax and invoicing", icon: QrCode, visual: "qr",
    summary: "Create the QR code for Saudi e-invoices from your seller and invoice details, encoded in the TLV and Base64 format ZATCA expects.",
    points: ["Built for Saudi Arabia (ZATCA e-invoicing)", "TLV and Base64 encoding handled for you", "Download the QR code for your invoice"],
    tags: ["Saudi Arabia", "E-invoicing", "QR code"],
  },
];

/* ---- little illustrations, pure CSS/SVG, one per tool ---- */
const bar = (w: string, c = "bg-white/25") => <i className={`block h-2 rounded-full ${c}`} style={{ width: w }} />;

function Visual({ kind }: { kind: Tool["visual"] }): ReactNode {
  if (kind === "redirect")
    return (
      <div className="space-y-2.5">
        {[["/old-services", "/services"], ["/blog/2019/post", "/blog/new-post"], ["/about-us.html", "/about"]].map(([a, b]) => (
          <div key={a} className="flex items-center gap-3 rounded-[6px] border border-white/10 bg-white/[.05] px-3 py-2.5 font-mono text-[11px] text-[#CFE2FF]">
            <span className="min-w-0 flex-1 truncate text-white/60 line-through decoration-white/25">{a}</span>
            <ArrowRight size={13} className="shrink-0 text-[#4D8BFF]" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-white">{b}</span>
            <span className="rounded bg-[#10B981]/20 px-1.5 py-0.5 text-[10px] text-[#34D399]">301</span>
          </div>
        ))}
      </div>
    );
  if (kind === "vat")
    return (
      <div className="rounded-[8px] border border-white/10 bg-white/[.05] p-4">
        <div className="mb-4 flex gap-1.5 text-[11px]"><span className="rounded-full bg-[#0A5CFF] px-3 py-1 text-white">Add VAT</span><span className="rounded-full border border-white/15 px-3 py-1 text-white/55">Remove VAT</span></div>
        {[["Net", "62%", "bg-white/45"], ["VAT", "11%", "bg-[#4D8BFF]"], ["Gross", "73%", "bg-[#0A5CFF]"]].map(([l, w, c]) => (
          <div key={l} className="mt-3 flex items-center gap-3 text-[11px] text-white/60"><span className="w-10">{l}</span><span className="h-2.5 flex-1 rounded-full bg-white/[.07]">{bar(w, c)}</span></div>
        ))}
      </div>
    );
  if (kind === "cost")
    return (
      <div className="rounded-[8px] border border-white/10 bg-white/[.05] p-4">
        {[["Pages", true], ["Online store", false], ["Blog and SEO", true], ["Custom design", true]].map(([l, on]) => (
          <div key={String(l)} className="flex items-center justify-between py-1.5 text-[12px] text-white/75"><span>{l}</span><span className={`relative h-4 w-8 rounded-full ${on ? "bg-[#0A5CFF]" : "bg-white/20"}`}><i className={`absolute top-0.5 h-3 w-3 rounded-full bg-white ${on ? "right-0.5" : "left-0.5"}`} /></span></div>
        ))}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/55"><span>Estimated range</span><span className="h-2.5 w-24 rounded-full bg-gradient-to-r from-[#0A5CFF] to-[#00B4FF]" /></div>
      </div>
    );
  const cells = [1,1,1,0,1,0,1,1,1, 1,0,1,0,0,1,1,0,1, 1,1,1,0,1,1,1,1,1, 0,0,0,0,1,0,0,0,0, 1,0,1,1,0,1,0,1,1, 0,1,0,0,1,1,0,0,1, 1,1,1,0,0,1,1,0,1, 1,0,1,0,1,0,0,1,0, 1,1,1,0,1,1,1,0,1];
  return (
    <div className="flex items-center gap-5">
      <div className="grid shrink-0 grid-cols-9 gap-[3px] rounded-[8px] bg-white p-3" aria-hidden="true">{cells.map((c, i) => <i key={i} className={`block h-3 w-3 rounded-[2px] ${c ? "bg-[#0B1F3B]" : "bg-transparent"}`} />)}</div>
      <div className="min-w-0 flex-1 space-y-2.5 font-mono text-[11px] text-white/60">
        {["Seller name", "VAT number", "Timestamp", "Total and VAT"].map((l) => <div key={l} className="flex items-center gap-2"><Check size={12} className="shrink-0 text-[#34D399]" aria-hidden="true" />{l}</div>)}
        <span className="inline-block rounded bg-[#0A5CFF]/25 px-2 py-0.5 text-[10px] text-[#9FD0FF]">TLV · Base64</span>
      </div>
    </div>
  );
}

/* ---- styles: animation + CSS-only filter (radio buttons and :has(), no client JS) ---- */
const filterCss =
  TOPICS.map((t, i) => `.tl-wrap:has(#t-${i}:checked) .tl-item:not([data-topic="${t}"]){display:none}`).join("");
const css =
  ".tl-aur{will-change:transform;animation:tl-aur 20s ease-in-out infinite alternate}@keyframes tl-aur{to{transform:translate3d(7%,-5%,0) scale(1.18)}}" +
  ".tl-grid{background-image:linear-gradient(rgba(96,165,250,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.13) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)}" +
  ".tl-up{opacity:0;animation:tl-up .9s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d,0s)}@keyframes tl-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}" +
  ".tl-line{display:block;overflow:hidden;padding-bottom:.12em}.tl-line>span{display:block;transform:translateY(112%);animation:tl-ln 1.1s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d,0s)}@keyframes tl-ln{to{transform:none}}" +
  filterCss +
  "@media (prefers-reduced-motion:reduce){.tl-aur{animation:none}.tl-up{opacity:1;animation:none}.tl-line>span{transform:none;animation:none}}";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
const d = (s: number) => ({ ["--d" as string]: `${s}s` });

export default function ToolsPage() {
  const url = `${BASE}/tools`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: TITLE, description: DESC, inLanguage: "en", isPartOf: { "@type": "WebSite", "@id": `${BASE}/#website`, url: BASE, name: "DEVNTOM Solutions" }, breadcrumb: { "@id": `${url}#breadcrumb` }, mainEntity: { "@id": `${url}#list` } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Tools", item: url }] },
      {
        "@type": "ItemList", "@id": `${url}#list`, name: "DEVNTOM Solutions online tools", numberOfItems: TOOLS.length,
        itemListElement: TOOLS.map((t, i) => ({
          "@type": "ListItem", position: i + 1, url: `${BASE}/tools/${t.slug}`,
          item: { "@type": "WebApplication", name: t.name, description: t.summary, url: `${BASE}/tools/${t.slug}`, applicationCategory: "BusinessApplication", operatingSystem: "Any (web browser)", publisher: { "@id": `${BASE}/#organization` } },
        })),
      },
    ],
  };

  return (
    <main id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-[#030A17] px-6 pb-24 pt-36 text-white md:rounded-b-[4rem] md:px-12 md:pb-28 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="tl-aur absolute -left-[12%] -top-[22%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] rounded-full bg-[#0052CC]/45 blur-[140px]" />
          <div className="tl-aur absolute -right-[10%] top-[6%] h-[44vw] max-h-[600px] w-[44vw] max-w-[600px] rounded-full bg-[#00B4FF]/25 blur-[130px]" style={{ animationDelay: "-8s", animationDuration: "26s" }} />
          <div className="tl-grid absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030A17] to-transparent" />
        </div>
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="tl-up flex items-center gap-2 text-sm text-white/55">
            <Link href="/" className="transition hover:text-white">Home</Link><span aria-hidden="true">/</span><span className="text-white/85">Tools</span>
          </nav>
          <div className="tl-up mt-8 flex items-center gap-3" style={d(0.05)}><span className="h-px w-9 bg-[#00B4FF]" /><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7DB0FF]">Tools</span></div>
          <h1 className={`${pop.className} mt-6 max-w-4xl text-[clamp(2.5rem,6.6vw,6rem)] font-extralight leading-[1.02] tracking-[-0.04em]`}>
            <span className="tl-line" style={d(0.1)}><span>Small tools for</span></span>
            <span className="tl-line" style={d(0.22)}><span><b className="font-bold">big</b> <span className={`${pw.className} text-[0.6em] font-normal text-[#7DB0FF]`}>jobs</span></span></span>
          </h1>
          <p className="tl-up mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70" style={d(0.35)}>Practical tools we built for ourselves and our clients: migrate a website without losing traffic, work out VAT, plan a project budget and create Saudi e-invoice QR codes.</p>
          <p className="tl-up mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.05] px-5 py-2 text-sm text-[#CFE2FF]" style={d(0.45)}>{TOOLS.length} tools<span aria-hidden="true" className="text-white/30">·</span>Built by DEVNTOM Solutions</p>
        </div>
      </section>

      <div className="tl-wrap">
        {/* FILTER */}
        <section className="px-6 pt-14 md:px-12 md:pt-20" aria-label="Filter tools">
          <fieldset className="mx-auto max-w-[1400px]">
            <legend className="sr-only">Filter by topic</legend>
            <div className="flex flex-wrap gap-2">
              {[{ id: "t-all", label: "All tools", n: TOOLS.length, checked: true }, ...TOPICS.map((t, i) => ({ id: `t-${i}`, label: t, n: TOOLS.filter((x) => x.topic === t).length, checked: false }))].map((p) => (
                <span key={p.id} className="contents">
                  <input type="radio" name="topic" id={p.id} defaultChecked={p.checked} className="peer sr-only" />
                  <label htmlFor={p.id} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#CFE2FF] bg-white px-4 py-2 text-sm text-[#0B1F3B] transition duration-300 hover:border-[#0A5CFF] peer-checked:border-[#0A5CFF] peer-checked:bg-[#0A5CFF] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#00B4FF] peer-focus-visible:ring-offset-2">{p.label}<span className="text-xs opacity-60">{p.n}</span></label>
                </span>
              ))}
            </div>
          </fieldset>
        </section>

        {/* GRID */}
        <section className="px-6 py-12 md:px-12 md:py-16" aria-label="All tools">
          <ul className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2">
            {TOOLS.map((t, i) => {
              const Icon = t.icon;
              return (
                <li key={t.slug} data-topic={t.topic} className="tl-item tl-up" style={d(0.1 + i * 0.08)}>
                  <Link href={`/tools/${t.slug}`} className={`group flex h-full flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] text-white shadow-[0_24px_70px_rgba(7,26,51,.16)] transition duration-500 hover:-translate-y-1.5 hover:border-[#00B4FF]/40 ${ring}`}>
                    <div className="relative overflow-hidden border-b border-white/10 p-6 md:p-7">
                      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#0A5CFF]/30 blur-[70px] transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative min-h-[170px]" aria-hidden="true"><Visual kind={t.visual} /></div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 bg-white/[.05] text-[#7DB0FF]"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span>
                        <span className="rounded-full border border-white/15 bg-white/[.05] px-3 py-1 text-[11px] text-[#CFE2FF]">{t.topic}</span>
                      </div>
                      <h2 className={`${pop.className} mt-6 text-2xl font-semibold tracking-[-0.02em]`}>{t.name}</h2>
                      <p className="mt-3 font-light leading-relaxed text-[#B8C9DE]">{t.summary}</p>
                      <ul className="mt-5 space-y-2 text-[14px] text-[#CFE2FF]">{t.points.map((p) => <li key={p} className="flex items-start gap-2.5"><Check size={15} className="mt-0.5 shrink-0 text-[#34D399]" aria-hidden="true" />{p}</li>)}</ul>
                      <ul className="mt-5 flex flex-wrap gap-2">{t.tags.map((g) => <li key={g} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#9FB1C7]">{g}</li>)}</ul>
                      <span className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-medium text-white">Open the tool <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A5CFF] transition group-hover:bg-white group-hover:text-[#0B1F3B]"><ArrowUpRight size={16} aria-hidden="true" /></span></span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* CUSTOM TOOL CTA */}
      <section className="bg-[#050E1F] px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`${pop.className} text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.02] tracking-[-0.035em]`}>Need a tool <b className="font-bold">like these</b>?</p>
            <p className="mt-4 max-w-lg font-light text-[#B8C9DE]">We build custom calculators, generators and internal tools for businesses. Tell us the problem and we will reply with a plan, a timeline and a quote.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0A5CFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Start a project <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/services/custom-software-development" className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#050E1F]`}>Custom software</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
