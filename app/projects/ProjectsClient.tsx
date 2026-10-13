"use client";

/**
 * /projects
 *
 * Client component for the projects page. Rendered by page.tsx (the server page that holds the metadata
 * and JSON-LD). No Nav, no Footer (both live in app/layout.tsx).
 *
 * Sections: hero, a toolbar (category filter and a Grid / List switch), the work itself, and a closing
 * call to action. Grid view is an editorial layout with a cursor-following "View" bubble. List view is a
 * big typographic index where a preview image follows the cursor (on touch screens each row shows a
 * thumbnail instead).
 *
 * Projects: pass your real work with <ProjectsClient projects={...} /> (see the Project type below).
 * With no prop it shows SAMPLE projects so the page is never empty. REPLACE: search this file for "SAMPLE".
 *
 * Performance: nothing animates layout or paint on scroll. The preview follower moves with one transform
 * per frame, and only while a row is hovered.
 *
 * Palette: cobalt, navy, white, black.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB";
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

/* ------------------------------ DATA ------------------------------ */

export type Project = {
  slug: string; // links to /projects/[slug]
  title: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  image?: string; // full URL or a /public path. A gradient shows if it is missing or fails to load.
  client?: string;
};

const IMG = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// SAMPLE projects: replace by passing `projects` from your data.
const SAMPLE: Project[] = [
  { slug: "sample-company-website", title: "Company website redesign", category: "Website", year: "2026", summary: "A faster, clearer site for a professional services firm, built to turn visitors into enquiries.", tags: ["Next.js", "SEO", "CMS"], image: IMG("1507238691740-187a5b1d37b8") },
  { slug: "sample-online-store", title: "Online store for a fashion brand", category: "E-commerce", year: "2026", summary: "A fast storefront with secure checkout and simple stock management.", tags: ["Storefront", "Payments"], image: IMG("1441986300917-64674bd600d8") },
  { slug: "sample-dashboard", title: "Operations dashboard", category: "Web App", year: "2025", summary: "A browser-based dashboard that replaced a patchwork of spreadsheets.", tags: ["React", "API", "Dashboards"], image: IMG("1551288049-bebda4e38f71") },
  { slug: "sample-campaign", title: "Lead generation campaign", category: "Marketing", year: "2025", summary: "Search and social campaigns with landing pages built to convert.", tags: ["Google Ads", "Landing pages"], image: IMG("1460925895917-afdab827c52f") },
  { slug: "sample-chatbot", title: "Customer support chatbot", category: "AI", year: "2026", summary: "An assistant trained on a company's own content, with handover to the team.", tags: ["Chatbot", "Automation"], image: IMG("1531746790731-6c087fecd65a") },
  { slug: "sample-crm", title: "Custom CRM for a services team", category: "Software", year: "2025", summary: "Leads, jobs and invoices in one place, shaped around how the team works.", tags: ["Custom software", "Integrations"], image: IMG("1461749280684-dccba630e2f6") },
  { slug: "sample-landing", title: "Product launch landing page", category: "Website", year: "2025", summary: "A focused one-page launch with fast load times and tracking set up.", tags: ["Landing page", "Speed"], image: IMG("1498050108023-c5249f4df085") },
  { slug: "sample-automation", title: "Lead follow-up automation", category: "AI", year: "2026", summary: "Enquiries read, scored and routed in seconds, with replies sent automatically.", tags: ["Workflows", "CRM"], image: IMG("1522202176988-66273c2fd55f") },
];

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

function Hero({ count, cats }: { count: number; cats: number }) {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Projects" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative pb-24 pt-36 md:pb-32 md:pt-44`}>
        <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
          <span className="h-2 w-2 rounded-full bg-[#2F7BFF]" />
          Selected work
        </p>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-10">
          <Lines h1 className="max-w-4xl text-[clamp(2.7rem,6.6vw,6.4rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Work we are", <><b className="font-bold">proud</b> <Acc>of.</Acc></>]} />
          <dl className="rv flex gap-10 pb-2" style={{ transitionDelay: "200ms" }}>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-white/60">Projects</dt><dd className={`${pop.className} mt-1 text-4xl font-semibold tracking-[-0.04em]`}>{count}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-white/60">Disciplines</dt><dd className={`${pop.className} mt-1 text-4xl font-semibold tracking-[-0.04em]`}>{cats}</dd></div>
          </dl>
        </div>
        <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
          Websites, stores, apps, campaigns and automation, designed and built for businesses that wanted more from their digital side.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ GRID VIEW ------------------------------ */

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

function GridCard({ p, i }: { p: Project; i: number }) {
  return (
    <li className={`wf-pop ${SPANS[i % 4]}`} style={{ animationDelay: `${(i % 4) * 70}ms` }}>
      <Link
        href={`/projects/${p.slug}`}
        className={`group block ${ring}`}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
        }}
      >
        <div className="relative h-[320px] overflow-hidden rounded-[6px] md:h-[440px]" style={cover}>
          <Img src={p.image} alt="" className="transition-transform duration-700 group-hover:scale-[1.05]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#02050B]/70 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/30 px-3.5 py-1.5 text-xs text-white">{p.category}</span>
          <span className="absolute right-5 top-5 text-sm tracking-widest text-white/90">{p.year}</span>
          <span aria-hidden className="pointer-events-none absolute z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-[#0047AB] text-sm font-medium text-white transition-transform duration-300 group-hover:scale-100" style={{ left: "var(--cx, 50%)", top: "var(--cy, 50%)" }}>View</span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className={`${pop.className} text-2xl font-extralight tracking-[-0.03em] md:text-3xl`}>{p.title}</h3>
            <p className="mt-2 max-w-md font-light leading-relaxed text-[#3B4A63]">{p.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border border-[#CBD8EE] px-3 py-1 text-xs text-[#3B4A63]">{t}</li>)}</ul>
          </div>
          <ArrowUpRight size={26} className="mt-1 shrink-0 text-[#0047AB] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </Link>
    </li>
  );
}

/* ------------------------------ LIST VIEW ------------------------------ */

function ListView({ items }: { items: Project[] }) {
  const wrapRef = React.useRef<HTMLUListElement>(null);
  const prev = React.useRef<HTMLDivElement>(null);
  const [hot, setHot] = React.useState<number | null>(null);
  const pos = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const loop = React.useCallback(() => {
    const s = pos.current;
    s.x += (s.tx - s.x) * 0.16;
    s.y += (s.ty - s.y) * 0.16;
    if (prev.current) prev.current.style.transform = `translate3d(${s.x + 32}px, ${s.y - 110}px, 0)`;
    s.raf = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.5 ? requestAnimationFrame(loop) : 0;
  }, []);

  const move = (e: React.PointerEvent) => {
    const s = pos.current;
    s.tx = e.clientX;
    s.ty = e.clientY;
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  };
  React.useEffect(() => () => cancelAnimationFrame(pos.current.raf), []);

  return (
    <>
      <ul ref={wrapRef} className="border-t border-[#CBD8EE]" onPointerMove={move} onPointerLeave={() => setHot(null)}>
        {items.map((p, i) => (
          <li key={p.slug} className="wf-pop" style={{ animationDelay: `${i * 40}ms` }} onPointerEnter={() => setHot(i)}>
            <Link href={`/projects/${p.slug}`} className={`group grid items-center gap-x-6 gap-y-3 border-b border-[#CBD8EE] py-8 transition-colors hover:bg-[#F4F8FE] md:grid-cols-12 md:px-4 md:py-10 ${ring}`}>
              <span className="relative h-40 overflow-hidden rounded-[4px] md:hidden" style={cover}><Img src={p.image} alt="" /></span>
              <span className="text-sm text-[#5B6B84] md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`${pop.className} text-3xl font-extralight tracking-[-0.035em] transition-colors group-hover:text-[#0047AB] md:col-span-6 md:text-5xl`}>{p.title}</h3>
              <span className="text-sm text-[#3B4A63] md:col-span-3">{p.category}</span>
              <span className="flex items-center justify-between gap-4 text-sm text-[#5B6B84] md:col-span-2 md:justify-end"><span>{p.year}</span><ArrowUpRight size={22} className="text-[#0047AB] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </li>
        ))}
      </ul>
      {/* the follower: a single transformed element, shown only while a row is hovered, hidden on touch */}
      <div aria-hidden ref={prev} className="pv pointer-events-none fixed left-0 top-0 z-30 hidden h-[220px] w-[320px] overflow-hidden rounded-[8px] shadow-[0_30px_80px_rgba(2,5,11,.35)] transition-opacity duration-200 md:block" style={{ ...cover, opacity: hot === null ? 0 : 1 }}>
        {items.map((p, i) => (
          <div key={p.slug} className="absolute inset-0 transition-opacity duration-200" style={{ opacity: hot === i ? 1 : 0 }}><Img src={p.image} alt="" /></div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------ WORK ------------------------------ */

function Work({ projects }: { projects: Project[] }) {
  const [cat, setCat] = React.useState("All");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const cats = React.useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const items = React.useMemo(() => (cat === "All" ? projects : projects.filter((p) => p.category === cat)), [projects, cat]);

  return (
    <section id="work" className="bg-white py-16 md:py-24" aria-label="Projects">
      <div className={wrap}>
        <div className="flex flex-col gap-6 border-b border-[#CBD8EE] pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2.5">
            {cats.map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2.5 text-sm transition ${cat === c ? "border-[#0047AB] bg-[#0047AB] text-white" : "border-[#CBD8EE] text-[#0B1F3B] hover:border-[#0047AB] hover:text-[#0047AB]"} ${ring}`}>{c}</button>
            ))}
          </div>
          <div role="group" aria-label="Layout" className="inline-flex rounded-full border border-[#CBD8EE] p-1">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} aria-pressed={view === v} onClick={() => setView(v)} className={`rounded-full px-5 py-2 text-sm capitalize transition ${view === v ? "bg-[#0B1F3B] text-white" : "text-[#3B4A63] hover:text-[#0047AB]"} ${ring}`}>{v}</button>
            ))}
          </div>
        </div>
        <p role="status" aria-live="polite" className="mt-6 text-sm text-[#5B6B84]">{items.length} {items.length === 1 ? "project" : "projects"}{cat !== "All" ? ` in ${cat}` : ""}</p>

        <div className="mt-10" key={`${view}-${cat}`}>
          {view === "grid" ? (
            <ul className="grid gap-x-8 gap-y-16 md:grid-cols-12">{items.map((p, i) => <GridCard key={p.slug} p={p} i={i} />)}</ul>
          ) : (
            <ListView items={items} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CLOSING CTA ------------------------------ */

function Closing() {
  return (
    <section className="relative isolate overflow-hidden py-28 text-white md:py-36" aria-label="Start a project" style={{ background: `linear-gradient(120deg, ${BLACK} 0%, ${NAVY} 45%, ${COBALT} 100%)` }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
      <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Your project</div>
      <div className={`${wrap} text-center`}>
        <Lines className="t1" lines={["Your project", <><Acc>could be</Acc> <b className="font-bold">next.</b></>]} />
        <p className="rv mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us what you want to build. We reply with a plan, a timeline and a quote.</p>
        <div className="rv mt-10 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: "150ms" }}>
          <Link href="/contact" className={`group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
            Start a project <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
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
@media (hover:none){.pv{display:none!important}}
@media (prefers-reduced-motion:reduce){.pv{transition:none!important}.pulse-ring{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq-track,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function ProjectsClient({ projects = SAMPLE }: { projects?: Project[] }) {
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
      <Hero count={projects.length} cats={new Set(projects.map((p) => p.category)).size} />
      <Work projects={projects} />
      <Closing />
    </main>
  );
}
