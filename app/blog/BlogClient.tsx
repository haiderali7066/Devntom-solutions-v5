"use client";

/**
 * /blog
 *
 * Client component for the blog listing. Rendered by page.tsx (the server page that holds the metadata
 * and JSON-LD). No Nav, no Footer (both live in app/layout.tsx).
 *
 * Sections: hero with a CSS-only topic marquee, a search and category toolbar (filters instantly, no
 * network), a featured article, a grid with "Load more", and a closing call to action.
 *
 * Posts: pass your real articles with <BlogClient posts={...} /> (see the Post type below), mapping your
 * data layer's fields onto it. With no prop it shows SAMPLE posts so the page is never empty.
 * REPLACE: search this file for "SAMPLE".
 *
 * Performance: the marquee is a single CSS transform animation (compositor only, two copies of the list,
 * pauses on hover and when motion is reduced). Nothing animates layout or paint on scroll.
 *
 * Palette: cobalt, navy, white, black.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Clock, Search, X } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB";
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

/* ------------------------------ DATA ------------------------------ */

export type Post = {
  slug: string; // links to /blog/[slug]
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO, for example "2026-10-08"
  readMinutes: number;
  image?: string; // full URL or a /public path. A gradient shows if it is missing or fails to load.
  author?: string;
};

const IMG = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// SAMPLE posts: replace by passing `posts` from your data layer.
const SAMPLE: Post[] = [
  { slug: "how-fast-should-a-business-website-load", title: "How fast should a business website load?", excerpt: "Speed affects search rankings, enquiries and trust. Here is what to aim for and the quick fixes that make the biggest difference.", category: "Web Development", date: "2026-10-08", readMinutes: 6, image: IMG("1498050108023-c5249f4df085"), author: "DEVNTOM Team" },
  { slug: "seo-or-paid-ads-where-to-start", title: "SEO or paid ads: where should you start?", excerpt: "Both bring customers, but at different speeds and costs. A simple way to decide which fits your goals and budget.", category: "Digital Marketing", date: "2026-10-03", readMinutes: 7, image: IMG("1460925895917-afdab827c52f"), author: "DEVNTOM Team" },
  { slug: "what-an-ai-chatbot-can-and-cannot-do", title: "What an AI chatbot can and cannot do for your business", excerpt: "Where chatbots save hours, where they need a human, and how to set expectations before you build one.", category: "AI and Automation", date: "2026-09-27", readMinutes: 8, image: IMG("1531746790731-6c087fecd65a"), author: "DEVNTOM Team" },
  { slug: "custom-software-vs-off-the-shelf", title: "Custom software or off-the-shelf: how to choose", excerpt: "A practical checklist for deciding when a ready-made tool is enough and when building your own pays off.", category: "Software", date: "2026-09-19", readMinutes: 6, image: IMG("1461749280684-dccba630e2f6"), author: "DEVNTOM Team" },
  { slug: "website-redesign-checklist", title: "A website redesign checklist that protects your SEO", excerpt: "Redirects, content, tracking and testing: the steps that stop a redesign from costing you traffic.", category: "Web Development", date: "2026-09-11", readMinutes: 9, image: IMG("1507238691740-187a5b1d37b8"), author: "DEVNTOM Team" },
  { slug: "email-flows-that-bring-customers-back", title: "Four email flows that bring customers back", excerpt: "Welcome, reminder, offer and review: simple automated emails that keep paying for themselves.", category: "Digital Marketing", date: "2026-09-02", readMinutes: 5, image: IMG("1563986768609-322da13575f3"), author: "DEVNTOM Team" },
  { slug: "automate-your-lead-follow-up", title: "Automate your lead follow-up in an afternoon", excerpt: "Reply to every enquiry within minutes by connecting your form, CRM and email with a simple workflow.", category: "AI and Automation", date: "2026-08-24", readMinutes: 6, image: IMG("1551288049-bebda4e38f71"), author: "DEVNTOM Team" },
  { slug: "choosing-a-tech-stack-for-a-new-product", title: "Choosing a tech stack for a new product", excerpt: "Why we often start with Next.js, TypeScript and a managed database, and when we would choose differently.", category: "Software", date: "2026-08-15", readMinutes: 7, image: IMG("1555066931-4365d14bab8c"), author: "DEVNTOM Team" },
];

const topics = ["Web Development", "SEO", "Paid Ads", "Email Marketing", "AI Chatbots", "Automation", "Custom Software", "UI/UX", "E-commerce", "Analytics"];
const PAGE_SIZE = 6;

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/* ------------------------------ SMALL HELPERS ------------------------------ */

/** A photo that fills its relative parent. If the link fails, the parent's gradient shows instead. */
function Img({ src, alt = "", className = "" }: { src?: string; alt?: string; className?: string }) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [ok, setOk] = React.useState(true);
  React.useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!src || !ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setOk(false)} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
  );
}

const cover = { background: `linear-gradient(140deg, ${NAVY} 0%, ${COBALT} 100%)` } as React.CSSProperties;

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Blog" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative pb-44 pt-36 md:pb-52 md:pt-44`}>
        <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
          <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />
          The DEVNTOM blog
        </p>
        <Lines h1 className="mt-7 max-w-4xl text-[clamp(2.7rem,6.6vw,6.4rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Insights for", <><b className="font-bold">growing</b> <Acc>businesses.</Acc></>]} />
        <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
          Practical guides on websites, marketing, software and automation, written in plain language by the people who do the work.
        </p>
      </div>
      {/* CSS-only marquee: one transform animation, two copies of the list */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 py-5" aria-label="Topics we write about">
        <div className="mq-wrap overflow-hidden">
          <div className="mq-track flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center gap-14 pr-14 text-sm uppercase tracking-[0.2em] text-white/60">
                {topics.map((t) => <li key={t} className="flex items-center gap-14 whitespace-nowrap">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></li>)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CARDS ------------------------------ */

function Meta({ p, light = false }: { p: Post; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${light ? "text-[#DCE7FB]" : "text-[#5B6B84]"}`}>
      <time dateTime={p.date}>{fmt(p.date)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden="true" />{p.readMinutes} min read</span>
    </p>
  );
}

function Featured({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`} className={`group grid overflow-hidden rounded-[8px] border border-[#CBD8EE] bg-white transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(11,31,59,.14)] lg:grid-cols-12 ${ring}`}>
      <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[420px]" style={cover}>
        <Img src={p.image} alt="" className="transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-5 top-5 rounded-full bg-[#0047AB] px-4 py-1.5 text-xs font-medium text-white">Featured</span>
      </div>
      <div className="flex flex-col justify-between gap-10 p-8 md:p-12 lg:col-span-5">
        <div>
          <span className="rounded-full bg-[#E3ECFB] px-3.5 py-1.5 text-xs font-medium text-[#0047AB]">{p.category}</span>
          <h2 className={`${pop.className} mt-6 text-3xl font-semibold leading-[1.1] tracking-[-0.035em] md:text-4xl`}>{p.title}</h2>
          <p className="mt-5 font-light leading-relaxed text-[#3B4A63]">{p.excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Meta p={p} />
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#0047AB]">Read article <ArrowUpRight size={18} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></span>
        </div>
      </div>
    </Link>
  );
}

function Card({ p, i }: { p: Post; i: number }) {
  return (
    <li className="wf-pop" style={{ animationDelay: `${(i % PAGE_SIZE) * 60}ms` }}>
      <Link href={`/blog/${p.slug}`} className={`group flex h-full flex-col rounded-[6px] ${ring}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]" style={cover}>
          <Img src={p.image} alt="" className="transition-transform duration-700 group-hover:scale-[1.05]" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-medium text-[#0047AB]">{p.category}</span>
        </div>
        <div className="mt-5 flex flex-1 flex-col">
          <Meta p={p} />
          <h3 className={`${pop.className} mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-[#0047AB]`}>{p.title}</h3>
          <p className="mt-3 line-clamp-3 font-light leading-relaxed text-[#3B4A63]">{p.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-[#0047AB]">Read article <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
        </div>
      </Link>
    </li>
  );
}

/* ------------------------------ LISTING ------------------------------ */

function Listing({ posts }: { posts: Post[] }) {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [shown, setShown] = React.useState(PAGE_SIZE);
  const cats = React.useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const sorted = React.useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts]);

  const list = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    return sorted.filter((p) => (cat === "All" || p.category === cat) && (!s || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(s)));
  }, [sorted, q, cat]);

  const featured = !q.trim() && cat === "All" ? list[0] : undefined;
  const rest = featured ? list.slice(1) : list;
  const visible = rest.slice(0, shown);
  const reset = () => { setQ(""); setCat("All"); setShown(PAGE_SIZE); };

  return (
    <section className="bg-white py-16 md:py-24" aria-label="Articles">
      <div className={wrap}>
        <div className="flex flex-col gap-6 border-b border-[#CBD8EE] pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2.5">
            {cats.map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => { setCat(c); setShown(PAGE_SIZE); }} className={`rounded-full border px-5 py-2.5 text-sm transition ${cat === c ? "border-[#0047AB] bg-[#0047AB] text-white" : "border-[#CBD8EE] text-[#0B1F3B] hover:border-[#0047AB] hover:text-[#0047AB]"} ${ring}`}>{c}</button>
            ))}
          </div>
          <label className="relative block w-full lg:w-[320px]">
            <span className="sr-only">Search articles</span>
            <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5B6B84]" aria-hidden="true" />
            <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE_SIZE); }} placeholder="Search articles" className="w-full rounded-full border border-[#CBD8EE] bg-[#F4F8FE] py-3 pl-11 pr-10 [&::-webkit-search-cancel-button]:hidden text-[#0B1F3B] placeholder:text-[#5B6B84] focus:border-[#0047AB] focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30" />
            {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className={`absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#5B6B84] hover:bg-[#E3ECFB] ${ring}`}><X size={15} /></button>}
          </label>
        </div>

        <p role="status" aria-live="polite" className="mt-6 text-sm text-[#5B6B84]">{list.length} {list.length === 1 ? "article" : "articles"}{cat !== "All" ? ` in ${cat}` : ""}{q.trim() ? ` matching “${q.trim()}”` : ""}</p>

        {featured && <div className="mt-8" key={featured.slug}><Featured p={featured} /></div>}

        {visible.length > 0 && (
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
          </ul>
        )}

        {list.length === 0 && (
          <div className="mx-auto mt-16 max-w-md text-center">
            <p className={`${pop.className} text-2xl font-extralight tracking-[-0.03em]`}>No articles found</p>
            <p className="mt-3 font-light text-[#3B4A63]">Try a different word or clear the filters.</p>
            <button onClick={reset} className={`mt-6 rounded-full bg-[#0047AB] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#0B1F3B] ${ring}`}>Clear filters</button>
          </div>
        )}

        {rest.length > shown && (
          <div className="mt-16 text-center">
            <button onClick={() => setShown((n) => n + PAGE_SIZE)} className={`group inline-flex items-center gap-3 rounded-full border border-[#0B1F3B]/30 px-9 py-4 text-sm font-medium transition hover:border-[#0047AB] hover:text-[#0047AB] ${ring}`}>
              Load more articles <ArrowRight size={16} className="rotate-90 transition group-hover:translate-y-1" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ CLOSING CTA ------------------------------ */

function Closing() {
  return (
    <section className="relative isolate overflow-hidden py-28 text-white md:py-36" aria-label="Work with us" style={{ background: `linear-gradient(120deg, ${BLACK} 0%, ${NAVY} 45%, ${COBALT} 100%)` }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
      <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s talk</div>
      <div className={`${wrap} text-center`}>
        <Lines className="t1" lines={["Have a project", <><Acc>in</Acc> <b className="font-bold">mind?</b></>]} />
        <p className="rv mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Reading is a good start. If you would rather talk it through, we are happy to help.</p>
        <div className="rv mt-10 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: "150ms" }}>
          <Link href="/contact" className={`group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
            Contact us <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/services" className={`inline-flex items-center rounded-full border border-white/30 px-9 py-4 text-sm font-medium transition hover:border-white ${ringDark}`}>Our services</Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ PAGE STYLES ------------------------------ */

const PAGE_CSS = `
.ln{overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.in .ln>span{transform:none}
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.t1{font-size:clamp(2.8rem,7.4vw,7rem);line-height:.95;letter-spacing:-.04em;text-shadow:0 2px 40px rgba(2,5,11,.5)}
.t2{font-size:clamp(2.2rem,4.5vw,4.2rem);line-height:1.02;letter-spacing:-.035em}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
@keyframes wfpop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.wf-pop{animation:wfpop .5s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0) * 120ms)}
@keyframes msgin{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}
.msg-in{animation:msgin .45s cubic-bezier(.16,1,.3,1) both}
@keyframes dotb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
.dot{animation:dotb 1s ease-in-out infinite}
@keyframes mkfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.mk-float{animation:mkfloat 5.5s ease-in-out infinite}
.mk-float-slow{animation:mkfloat 8s ease-in-out infinite}
@keyframes mq{to{transform:translate3d(-50%,0,0)}}
.mq-track{animation:mq 45s linear infinite;will-change:transform;backface-visibility:hidden}
.mq-wrap{-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.mq-wrap:hover .mq-track{animation-play-state:paused}
.hero-grid{background-image:linear-gradient(rgba(110,161,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(110,161,255,.5) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent)}
@keyframes kbbar{0%{width:0}60%,100%{width:100%}}
.kb-bar{width:0;animation:kbbar 6s ease-in-out infinite}
@keyframes kbchk{0%,55%{opacity:0;transform:scale(.3)}70%,100%{opacity:1;transform:none}}
.kb-check{opacity:0;animation:kbchk 6s ease-in-out infinite}
@keyframes tabfill{from{width:0}to{width:100%}}
@keyframes mkswap{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.mk-swap{animation:mkswap .7s cubic-bezier(.16,1,.3,1) both}
@keyframes mkdraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.sw-line{stroke-dasharray:1;animation:mkdraw 1.6s ease .3s both}
@keyframes areain{from{opacity:0}to{opacity:1}}
.area-in{animation:areain 1.2s ease 1s both}
@keyframes barin{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.bar-in{transform-box:fill-box;transform-origin:bottom;animation:barin .8s cubic-bezier(.16,1,.3,1) both}
@keyframes gx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.gx{transform-origin:left;animation:gx .9s cubic-bezier(.16,1,.3,1) both}
@keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}
.mk-beat{animation:beat 1.6s ease-in-out infinite}
@keyframes ring{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2.2);opacity:0}}
.pulse-ring{animation:ring 2.6s ease-out infinite}
@media (prefers-reduced-motion:reduce){.pulse-ring{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq-track,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
`;

const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] focus-visible:ring-offset-2";
const ringDark = `${ring} focus-visible:ring-offset-[#0B1F3B]`;
const field = "mt-2 w-full rounded-[3px] border border-[#CBD8EE] bg-[#F4F8FE] px-4 py-3 text-[#0B1F3B] placeholder:text-[#5B6B84] focus:border-[#0047AB] focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30";
const label = "text-sm font-medium text-[#0B1F3B]";

function Lines({ lines, className = "", h1 = false }: { lines: React.ReactNode[]; className?: string; h1?: boolean }) {
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

const Acc = ({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#6EA1FF]" : "text-[#0047AB]"}`}>{children}</span>
);

/* ------------------------------ PAGE ------------------------------ */

export default function BlogClient({ posts = SAMPLE }: { posts?: Post[] }) {
  const main = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = main.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={main} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#0B1F3B]`}>
      <style>{PAGE_CSS}</style>
      <Hero />
      <Listing posts={posts} />
      <Closing />
    </main>
  );
}
