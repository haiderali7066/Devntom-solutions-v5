"use client";

/* Blog list design, filters and search in ONE client file. Used by your existing server page.tsx
   (it passes `posts`). Needs ./posts.ts next to it. */

import { useMemo, useState } from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { CATEGORIES, fmtDate, type Category, type PostMeta } from "./posts";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ---- generated cover (pure SVG, one motif per category) ---- */
const PALETTE: Record<Category, [string, string]> = {
  "Web Development": ["#0A5CFF", "#0B1F3B"],
  "AI Automation": ["#00A3FF", "#0B1F3B"],
  "Digital Marketing": ["#2F6BFF", "#050E1F"],
  "Business Growth": ["#0052CC", "#0B1F3B"],
};
function CoverArt({ category, slug }: { category: Category; slug: string }) {
  const [a, b] = PALETTE[category] ?? PALETTE["Web Development"];
  const id = "ca-" + slug.replace(/[^a-z0-9]/gi, "");
  return (
    <svg viewBox="0 0 600 375" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={id + "g"} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <radialGradient id={id + "r"} cx=".85" cy=".1" r=".7"><stop offset="0" stopColor="#7DB0FF" stopOpacity=".55" /><stop offset="1" stopColor="#7DB0FF" stopOpacity="0" /></radialGradient>
        <pattern id={id + "p"} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#fff" strokeOpacity=".07" /></pattern>
      </defs>
      <rect width="600" height="375" fill={`url(#${id}g)`} /><rect width="600" height="375" fill={`url(#${id}p)`} /><rect width="600" height="375" fill={`url(#${id}r)`} />
      {category === "Web Development" && (
        <g>
          <rect x="130" y="70" width="340" height="235" rx="12" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".4" /><path d="M130 100H470" stroke="#fff" strokeOpacity=".3" />
          {[148, 164, 180].map((x) => <circle key={x} cx={x} cy="85" r="4" fill="#fff" fillOpacity=".5" />)}
          <rect x="156" y="124" width="140" height="14" rx="4" fill="#fff" fillOpacity=".85" /><rect x="156" y="148" width="100" height="8" rx="4" fill="#fff" fillOpacity=".4" /><rect x="156" y="176" width="84" height="26" rx="13" fill="#fff" /><rect x="320" y="120" width="124" height="96" rx="8" fill="#7DB0FF" fillOpacity=".5" />
          {[0, 1, 2].map((i) => <rect key={i} x={156 + i * 98} y="236" width="86" height="46" rx="6" fill="#fff" fillOpacity=".14" />)}
        </g>
      )}
      {category === "AI Automation" && (
        <g stroke="#fff" strokeOpacity=".45" fill="none">
          <path d="M120 190L260 110M120 190L260 260M260 110L400 190M260 260L400 190M400 190L490 120M400 190L490 270M260 110L260 260" />
          {[[120, 190, 14], [260, 110, 11], [260, 260, 11], [400, 190, 16], [490, 120, 9], [490, 270, 9]].map(([x, y, r]) => <circle key={x + "" + y} cx={x} cy={y} r={r} fill="#fff" fillOpacity=".9" stroke="none" />)}
          <circle cx="400" cy="190" r="34" strokeOpacity=".6" /><circle cx="400" cy="190" r="56" strokeOpacity=".25" />
        </g>
      )}
      {category === "Digital Marketing" && (
        <g>
          {[70, 110, 90, 150, 130, 200].map((h, i) => <rect key={i} x={120 + i * 52} y={300 - h} width="32" height={h} rx="4" fill="#fff" fillOpacity={0.25 + i * 0.1} />)}
          <path d="M120 250L212 205 290 220 380 150 470 100" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /><circle cx="470" cy="100" r="9" fill="#fff" /><circle cx="470" cy="100" r="22" fill="none" stroke="#fff" strokeOpacity=".5" />
        </g>
      )}
      {category === "Business Growth" && (
        <g fill="none" stroke="#fff">
          {[40, 80, 120, 160].map((r, i) => <circle key={r} cx="300" cy="200" r={r} strokeOpacity={0.5 - i * 0.1} />)}
          <path d="M170 290L260 220 320 250 430 120" strokeWidth="3" strokeLinecap="round" /><path d="M395 118H432V155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="300" cy="200" r="8" fill="#fff" stroke="none" />
        </g>
      )}
    </svg>
  );
}

const css =
  ".bl-aur{will-change:transform;animation:bl-aur 20s ease-in-out infinite alternate}" +
  "@keyframes bl-aur{to{transform:translate3d(7%,-5%,0) scale(1.18)}}" +
  ".bl-grid{background-image:linear-gradient(rgba(96,165,250,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.13) 1px,transparent 1px);background-size:72px 72px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)}" +
  ".bl-up{opacity:0;animation:bl-up .9s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d,0s)}" +
  "@keyframes bl-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}" +
  ".bl-line{display:block;overflow:hidden;padding-bottom:.12em}.bl-line>span{display:block;transform:translateY(112%);animation:bl-ln 1.1s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d,0s)}" +
  "@keyframes bl-ln{to{transform:none}}" +
  "@media (prefers-reduced-motion:reduce){.bl-aur{animation:none}.bl-up{opacity:1;animation:none}.bl-line>span{transform:none;animation:none}}";

const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";

function Card({ p, i }: { p: PostMeta; i: number }) {
  return (
    <li className="bl-up" style={{ ["--d" as string]: `${Math.min(i, 8) * 0.07}s` }}>
      <Link href={`/blog/${p.slug}`} className={`group flex h-full flex-col overflow-hidden rounded-[12px] border border-[#DCE8F7] bg-white transition duration-500 hover:-translate-y-1.5 hover:border-[#0A5CFF]/50 hover:shadow-[0_24px_70px_rgba(10,92,255,.14)] ${ring}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1F3B]">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-105"><CoverArt category={p.category} slug={p.slug} /></div>
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#050E1F]/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">{p.category}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs text-[#64748B]"><time dateTime={p.date}>{fmtDate(p.date)}</time><span aria-hidden="true"> · </span>{p.readMins} min read</p>
          <h3 className={`${pop.className} mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0B1F3B] transition-colors group-hover:text-[#0052CC]`}>{p.title}</h3>
          <p className="mt-3 line-clamp-3 text-[15px] font-light leading-relaxed text-[#475569]">{p.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-[#0052CC]">Read article <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
        </div>
      </Link>
    </li>
  );
}

export default function BlogClient({
  posts = [],
}: {
  posts?: PostMeta[];
}) {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const filtering = cat !== "All" || q.trim() !== "";

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => (cat === "All" || p.category === cat) && (!needle || (p.title + " " + p.excerpt + " " + p.tags.join(" ") + " " + p.category).toLowerCase().includes(needle)));
  }, [posts, cat, q]);
  const grid = filtering ? results : results.filter((p) => p.slug !== featured?.slug);
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c, posts.filter((p) => p.category === c).length])), [posts]);

  return (
    <main id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>

      {/* HERO */}
      <section className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-[#030A17] px-6 pb-24 pt-36 text-white md:rounded-b-[4rem] md:px-12 md:pb-28 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="bl-aur absolute -left-[12%] -top-[22%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] rounded-full bg-[#0052CC]/45 blur-[140px]" />
          <div className="bl-aur absolute -right-[10%] top-[6%] h-[44vw] max-h-[600px] w-[44vw] max-w-[600px] rounded-full bg-[#00B4FF]/25 blur-[130px]" style={{ animationDelay: "-8s", animationDuration: "26s" }} />
          <div className="bl-grid absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030A17] to-transparent" />
        </div>
        <div className="mx-auto max-w-[1400px]">
          <div className="bl-up flex items-center gap-3"><span className="h-px w-9 bg-[#00B4FF]" /><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7DB0FF]">Insights</span></div>
          <h1 className={`${pop.className} mt-6 max-w-4xl text-[clamp(2.5rem,6.6vw,6rem)] font-extralight leading-[1.02] tracking-[-0.04em]`}>
            <span className="bl-line" style={{ ["--d" as string]: "0.1s" }}><span>Ideas for building</span></span>
            <span className="bl-line" style={{ ["--d" as string]: "0.22s" }}><span><b className="font-bold">better</b> <span className={`${pw.className} text-[0.6em] font-normal text-[#7DB0FF]`}>websites</span></span></span>
          </h1>
          <p className="bl-up mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70" style={{ ["--d" as string]: "0.35s" }}>Practical articles on web development, AI automation, digital marketing and growing a business online, from the team at DEVNTOM Solutions.</p>
          <p className="bl-up mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.05] px-5 py-2 text-sm text-[#CFE2FF]" style={{ ["--d" as string]: "0.45s" }}>{posts.length} articles<span aria-hidden="true" className="text-white/30">·</span>{CATEGORIES.length} topics</p>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="px-6 pt-14 md:px-12 md:pt-20" aria-label="Filter articles">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2" role="list">
            {["All", ...CATEGORIES].map((c) => {
              const on = cat === c;
              return (
                <li key={c}>
                  <button type="button" onClick={() => setCat(c)} aria-pressed={on} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition duration-300 ${ring} ${on ? "border-[#0A5CFF] bg-[#0A5CFF] text-white" : "border-[#CFE2FF] bg-white text-[#0B1F3B] hover:border-[#0A5CFF]"}`}>
                    {c}<span className={`text-xs ${on ? "text-white/75" : "text-[#94A3B8]"}`}>{c === "All" ? posts.length : counts[c]}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <label className="relative block w-full lg:w-[340px]">
            <span className="sr-only">Search articles</span>
            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className={`w-full rounded-full border border-[#CFE2FF] bg-white py-3 pl-11 pr-11 text-sm text-[#0B1F3B] placeholder:text-[#94A3B8] ${ring}`} />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className={`absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#64748B] hover:bg-[#EEF4FF] ${ring}`}><X size={16} aria-hidden="true" /></button>}
          </label>
        </div>
      </section>

      {/* FEATURED */}
      {!filtering && featured && (
        <section className="px-6 pt-10 md:px-12" aria-label="Featured article">
          <div className="mx-auto max-w-[1400px]">
            <Link href={`/blog/${featured.slug}`} className={`bl-up group grid overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] text-white shadow-[0_30px_90px_rgba(7,26,51,.2)] transition duration-500 hover:border-[#00B4FF]/40 lg:grid-cols-12 ${ring}`}>
              <div className="relative min-h-[260px] overflow-hidden lg:col-span-7">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><CoverArt category={featured.category} slug={featured.slug} /></div>
              </div>
              <div className="relative flex flex-col justify-center p-8 md:p-12 lg:col-span-5">
                <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#0A5CFF]/25 blur-[80px]" />
                <p className="relative flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7DB0FF]"><span className="h-px w-7 bg-[#7DB0FF]" />Featured · {featured.category}</p>
                <h2 className={`${pop.className} relative mt-5 text-3xl font-light leading-[1.1] tracking-[-0.03em] md:text-4xl`}>{featured.title}</h2>
                <p className="relative mt-5 font-light leading-relaxed text-[#B8C9DE]">{featured.excerpt}</p>
                <p className="relative mt-6 text-sm text-[#9FB1C7]"><time dateTime={featured.date}>{fmtDate(featured.date)}</time> · {featured.readMins} min read</p>
                <span className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition group-hover:bg-[#0A5CFF] group-hover:text-white">Read the article <ArrowRight size={16} aria-hidden="true" /></span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="px-6 py-14 md:px-12 md:py-20" aria-label="All articles">
        <div className="mx-auto max-w-[1400px]">
          <p className="sr-only" role="status" aria-live="polite">{results.length} {results.length === 1 ? "article" : "articles"} found</p>
          {grid.length > 0 ? (
            <ul key={cat + "|" + q} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{grid.map((p, i) => <Card key={p.slug} p={p} i={i} />)}</ul>
          ) : !filtering ? null : (
            <div className="rounded-[12px] border border-dashed border-[#CFE2FF] bg-[#F5F9FF] px-6 py-16 text-center">
              <p className={`${pop.className} text-2xl font-semibold text-[#0B1F3B]`}>No articles found</p>
              <p className="mt-2 font-light text-[#475569]">Try a different word, or browse every topic.</p>
              <button type="button" onClick={() => { setCat("All"); setQ(""); }} className={`mt-6 rounded-full bg-[#0A5CFF] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0B1F3B] ${ring}`}>Show all articles</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#050E1F] px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`${pop.className} text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.02] tracking-[-0.035em]`}>Have a project <b className="font-bold">in mind</b>?</p>
            <p className="mt-4 max-w-md font-light text-[#B8C9DE]">Tell us what you want to build. We reply with a plan, a timeline and a quote.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0A5CFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Start a project <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/services" className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#050E1F]`}>Our services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}