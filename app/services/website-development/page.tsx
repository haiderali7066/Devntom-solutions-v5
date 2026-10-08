"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * /services/website-development
 * Self-contained page: no imports from your own files, no Nav, no Footer.
 * Nav and Footer come from app/layout.tsx.
 *
 * Before launch, search this file for "REPLACE" (projects) and "TESTIMONIALS" (where to drop your component).
 */

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Lenis from "lenis";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { SiDocker, SiFigma, SiGit, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiRedis, SiShopify, SiStripe, SiTailwindcss, SiTypescript, SiVercel, SiWordpress } from "react-icons/si";
import { ArrowRight, ArrowUpRight, Check, Code2, LayoutDashboard, Megaphone, MonitorSmartphone, PenTool, Plus, Search, ShieldCheck, ShoppingCart, X, Zap } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/** Set to true only if Lenis is NOT already started in your layout. Starting it twice breaks scrolling. */
const USE_LENIS = false;

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/website-development";
const TITLE = "Website Development Services | DEVNTOM Solutions";
const DESC = "Fast, responsive, SEO-ready websites built on Next.js and React, from company sites to e-commerce stores. DEVNTOM Solutions, Lahore, Riyadh and London.";

/* ------------------------------ CONTENT ------------------------------ */

const problems = [
  "Pages that load slowly, especially on phones",
  "Content that search engines cannot read properly",
  "Pages only a developer can change",
  "Visitors who leave without getting in touch",
];
const outcomes = [
  "Fast, responsive pages built on Next.js and React",
  "Clean metadata, structured data and mobile performance from day one",
  "A CMS so your team can update content without a developer",
  "Clear calls to action and lead forms that reach your inbox",
];

const features = [
  [Zap, "Fast Next.js builds", "Server rendering, optimised images and clean code so pages load quickly."],
  [MonitorSmartphone, "Responsive on every screen", "Layouts designed and tested from small phones to wide desktops."],
  [Search, "SEO-ready from day one", "Clean metadata, structured data and fast loading built in from the first release."],
  [LayoutDashboard, "CMS and lead forms", "Edit pages, posts and products yourself, and receive enquiries straight to your inbox."],
  [ShoppingCart, "E-commerce", "Catalogue, checkout and order management for online stores."],
  [ShieldCheck, "Secure and reliable", "Protected forms, secure hosting set-up and monitoring from launch day."],
] as const;

const types = [
  ["Business websites", "Company sites that explain what you do and bring in enquiries.", ["Service and about pages", "Blog and case studies", "Lead forms and analytics"], "Web", "linear-gradient(160deg,#0B1F3B,#0A3F9E)"],
  ["E-commerce stores", "Fast storefronts with catalogue, checkout and order management.", ["Product catalogue", "Checkout and payments", "Order management"], "Shop", "linear-gradient(160deg,#0A2A5C,#0052CC)"],
  ["Web platforms", "Portals and dashboards with accounts, content and integrations.", ["User accounts", "Admin dashboards", "API integrations"], "App", "linear-gradient(160deg,#0A3F9E,#0B1F3B)"],
] as const;

const tech = [
  [SiNextdotjs, "Next.js"], [SiReact, "React"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"], [SiNodedotjs, "Node.js"],
  [SiPostgresql, "PostgreSQL"], [SiMongodb, "MongoDB"], [SiVercel, "Vercel"], [SiDocker, "Docker"], [SiFigma, "Figma"],
  [SiGit, "Git"], [SiShopify, "Shopify"], [SiWordpress, "WordPress"], [SiStripe, "Stripe"], [SiRedis, "Redis"],
] as const;

const steps = [
  ["Discovery and strategy", "Goals, audience, sitemap and a plan we both sign off on.", "Discovery"],
  ["Architecture and design", "Page structure, wireframes and the visual design.", "Design"],
  ["Development and build", "A Next.js build with a demo at every milestone.", "Build"],
  ["Quality assurance", "Testing for speed, security, accessibility and every screen size.", "Quality"],
  ["Launch and deployment", "Go-live with analytics, monitoring and a rollback plan.", "Launch"],
  ["Support and growth", "Fixes, improvements and search growth after launch.", "Support"],
] as const;
const stepX = [100, 300, 500, 700, 900, 1100];

// REPLACE with real website and e-commerce projects (same placeholders as the home page).
const projects = [
  ["Business website with SEO", "A fast, search-optimised company website with a CMS and lead forms.", ["Website", "SEO", "CMS"], "Next.js, Tailwind", "/projects", "photo-1498050108023-c5249f4df085"],
  ["E-commerce store", "A fast storefront with catalogue, checkout and order management.", ["E-commerce", "Website"], "Next.js, Node.js", "/projects", "photo-1556742049-0cfed4f6a45d"],
] as const;

const related = [
  [PenTool, "UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
  [Search, "SEO", "/services/seo-optimization", "Technical and content SEO for steady organic growth."],
  [Code2, "Custom Software", "/services/custom-software-development", "Web apps, SaaS, CRM and ERP systems."],
  [Megaphone, "Digital Marketing", "/services/digital-marketing", "Data-driven campaigns that bring in qualified leads."],
] as const;

const faqs = [
  ["What does your website development service include?", "Planning, design, Next.js and React development, on-page SEO and structured data, CMS and lead forms, testing, launch and support after go-live."],
  ["Do you build e-commerce websites?", "Yes. We build fast storefronts with a product catalogue, checkout and order management."],
  ["Which technologies do you use for websites?", "Mainly Next.js, React, TypeScript, Tailwind CSS and Node.js, with a database and CMS chosen to fit the project. We pick the stack that suits your goals rather than forcing one."],
  ["Will my website be ready for search engines?", "Yes. We build with clean metadata, structured data, fast loading and mobile performance in mind from the first release."],
  ["Will my website work on phones and tablets?", "Yes. Every layout is responsive and tested from small phones to wide desktop screens."],
  ["Can I update the content myself?", "Yes. Where you need to edit pages, blog posts or products without a developer, we add a CMS and show your team how to use it."],
  ["How much does a website cost and how long does it take?", "It depends on the number of pages, the features and the integrations. After a short discovery step we send a clear quote with deliverables and a timeline, so there are no surprises."],
  ["Do you support the website after launch?", "Yes. Support and growth is the final step of our process, covering fixes, improvements and search growth after launch."],
] as const;

const serviceOptions = ["Website Development", "Custom Software", "Mobile Apps", "AI Automation", "Digital Marketing", "UI/UX Design", "SEO", "Something else"];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Development",
    serviceType: "Website development",
    description: DESC,
    url: SITE + PATH,
    provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
      { "@type": "ListItem", position: 3, name: "Website Development", item: SITE + PATH },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

/* ------------------------------ STYLES ------------------------------ */

const css = `
.ln{overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.in .ln>span{transform:none}
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.gb{border:1px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#00B4FF,#007BFF 60%,#0052CC) border-box}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.t0{font-size:clamp(2.5rem,6.6vw,6.4rem);line-height:1.04;letter-spacing:-.04em}
.t1{font-size:clamp(2.8rem,7.4vw,7rem);line-height:.95;letter-spacing:-.04em;text-shadow:0 2px 40px rgba(5,14,31,.5)}
.t2{font-size:clamp(2.2rem,4.5vw,4.2rem);line-height:1.02;letter-spacing:-.035em}
.gf{background-image:linear-gradient(rgba(96,165,250,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.4) 1px,transparent 1px);background-size:64px 64px;animation:gf 3s linear infinite;-webkit-mask-image:linear-gradient(to top,#000 15%,transparent 80%);mask-image:linear-gradient(to top,#000 15%,transparent 80%)}
@keyframes gf{to{background-position:0 64px}}
.fl{animation:fl 7s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-10px)}}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.pl{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)}
.in .pl{stroke-dashoffset:0}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
.mq2{animation:mq2 42s linear infinite}.mq2.rev{animation-direction:reverse}.mqw:hover .mq2{animation-play-state:paused}
@keyframes mq2{to{transform:translate3d(-50%,0,0)}}
@media(min-width:1024px){.ofc{grid-template-columns:1fr 1fr 1fr;transition:grid-template-columns .9s cubic-bezier(.22,1,.36,1)}
.ofc:has(li:nth-child(1):is(:hover,:focus-within)){grid-template-columns:2.2fr 1fr 1fr}
.ofc:has(li:nth-child(2):is(:hover,:focus-within)){grid-template-columns:1fr 2.2fr 1fr}
.ofc:has(li:nth-child(3):is(:hover,:focus-within)){grid-template-columns:1fr 1fr 2.2fr}}
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.gf,.fl,.mq2{animation:none!important}.pl{stroke-dashoffset:0;transition:none}.spn{display:none}.chk{opacity:1;transform:none;transition:none}.ofc{transition:none!important}}
`;

const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
const ringDark = `${ring} focus-visible:ring-offset-[#050E1F]`;
const field = "mt-2 w-full rounded-[3px] border border-[#CFE2FF] bg-[#F5F9FF] px-4 py-3 text-[#1F2937] placeholder:text-[#64748B] focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30";
const label = "text-sm font-medium text-[#0B1F3B]";

/* ------------------------------ SMALL PARTS ------------------------------ */

function Lines({ lines, className = "", h1 = false }: { lines: ReactNode[]; className?: string; h1?: boolean }) {
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

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p data-words className={`${pop.className} ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ opacity: 0.16 }}>{w}{" "}</span>
      ))}
    </p>
  );
}

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="flex items-center gap-3 text-sm font-medium text-[#0052CC]"><span className="h-px w-8 bg-[#007BFF]" />{children}</p>
);

function TechRow({ rev = false }: { rev?: boolean }) {
  const list = rev ? [...tech].reverse() : tech;
  const items = (hidden: boolean) => (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {list.map(([Icon, name]) => (
        <li key={name} className="mx-3 flex items-center gap-3 rounded-full border border-[#CFE2FF] bg-white px-6 py-3 text-[#0B1F3B]">
          <Icon size={22} aria-hidden="true" className="text-[#0052CC]" />
          <span className="whitespace-nowrap font-medium">{name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="mqw overflow-hidden py-2">
      <div className={`mq2 ${rev ? "rev" : ""} flex w-max`}>
        {items(false)}
        {items(true)}
      </div>
    </div>
  );
}

/* ------------------------------ PAGE ------------------------------ */

export default function WebsiteDevelopmentPage() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const el = root.current!, barEl = bar.current!, curEl = cur.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off: (() => void)[] = [];

    // Smooth scroll (off by default, see USE_LENIS)
    if (USE_LENIS && !reduce) {
      const l = new Lenis({ lerp: 0.09 });
      let r = requestAnimationFrame(function f(t) { l.raf(t); r = requestAnimationFrame(f); });
      off.push(() => { cancelAnimationFrame(r); l.destroy(); });
    }

    // Scroll progress bar
    const prog = () => { const h = document.documentElement.scrollHeight - innerHeight; barEl.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
    prog();
    addEventListener("scroll", prog, { passive: true });
    off.push(() => removeEventListener("scroll", prog));

    // Cursor, magnetic buttons, tilt (desktop pointers only)
    if (reduce || !matchMedia("(pointer: fine)").matches) {
      curEl.style.display = "none";
    } else {
      const dot = curEl.firstElementChild as HTMLElement;
      const lab = dot.firstElementChild as HTMLElement;
      const mags = [...el.querySelectorAll<HTMLElement>("[data-magnetic]")];
      const lum = (n: HTMLElement | null): number => {
        while (n) {
          const c = getComputedStyle(n);
          let m = c.backgroundColor.match(/[\d.]+/g);
          if (m && (m.length < 4 || +m[3] > 0.5)) return (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
          const g = c.backgroundImage.match(/rgba?\([^)]+\)/);
          if (g) { m = g[0].match(/[\d.]+/g); if (m) return (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255; }
          n = n.parentElement;
        }
        return 1;
      };
      let lastT: HTMLElement | null = null, col = "#fff", txt = "#0B1F3B";
      let x = -100, y = -100, cx = -100, cy = -100, tilt: HTMLElement | null = null, raf = 0;
      const move = (e: PointerEvent) => {
        x = e.clientX; y = e.clientY;
        const t = e.target as HTMLElement;
        const view = t.closest("[data-cursor='view']");
        const link = t.closest("a,button,summary,select,input,textarea");
        curEl.style.opacity = t.closest("[data-nocursor]") ? "0" : "1";
        if (t !== lastT) { lastT = t; const light = lum(t) > 0.6; col = light ? "#007BFF" : "#fff"; txt = light ? "#fff" : "#0B1F3B"; }
        const hollow = !!link && !view;
        dot.style.width = dot.style.height = (view ? 88 : link ? 56 : 14) + "px";
        dot.style.background = hollow ? "transparent" : col;
        dot.style.border = hollow ? `2px solid ${col}` : "0";
        lab.style.color = txt;
        lab.style.opacity = view ? "1" : "0";
        mags.forEach((m) => {
          const r = m.getBoundingClientRect();
          const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
          m.style.transform = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.7 ? `translate(${(dx * 0.1).toFixed(1)}px,${(dy * 0.12).toFixed(1)}px)` : "";
        });
        const tl = t.closest<HTMLElement>("[data-tilt]");
        if (tilt && tilt !== tl) tilt.style.transform = "";
        if (tl) {
          const r = tl.getBoundingClientRect();
          tl.style.transition = "transform .2s ease-out";
          tl.style.transform = `perspective(900px) rotateX(${(-((y - r.top) / r.height - 0.5) * 8).toFixed(2)}deg) rotateY(${(((x - r.left) / r.width - 0.5) * 8).toFixed(2)}deg)`;
        }
        tilt = tl;
      };
      const loop = () => { raf = requestAnimationFrame(loop); cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; curEl.style.transform = `translate3d(${cx}px,${cy}px,0)`; };
      addEventListener("pointermove", move);
      loop();
      off.push(() => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); });
    }

    // Reveals
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    off.push(() => io.disconnect());

    // Word-by-word fill
    const words = [...el.querySelectorAll<HTMLElement>("[data-words]")];
    if (reduce) {
      words.forEach((w) => [...w.children].forEach((c) => ((c as HTMLElement).style.opacity = "1")));
    } else if (words.length) {
      let raf = 0;
      const tick = () => {
        raf = 0;
        const vh = innerHeight;
        words.forEach((w) => {
          const r = w.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)));
          const n = w.children.length;
          [...w.children].forEach((c, i) => ((c as HTMLElement).style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, (p * 1.25 - i / n) * 6)))));
        });
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
      tick();
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      off.push(() => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); });
    }

    return () => off.forEach((f) => f());
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      {/* Page metadata. React 19 / Next 15 move these into <head>. */}
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={SITE + PATH} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content={SITE + PATH} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <style>{css}</style>

      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <div ref={cur} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block">
        <span className="absolute left-1/2 top-1/2 flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center box-border rounded-full transition-[width,height,background-color,border-color] duration-300">
          <span className="text-xs font-semibold text-black opacity-0 transition-opacity">View</span>
        </span>
      </div>

      {/* 1. HERO */}
      <section className="relative isolate overflow-hidden bg-[#050E1F] pb-24 pt-36 text-white md:pb-32 md:pt-44" aria-label="Website development">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 85% 10%,rgba(0,123,255,.35),transparent 50%)" }} />
        <div aria-hidden="true" className="gf absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-40" />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className={`${wrap} grid items-center gap-16 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="rv text-sm text-[#93C5FD]">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className={`rounded-[3px] hover:text-white ${ringDark}`}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className={`rounded-[3px] hover:text-white ${ringDark}`}>Services</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/70">Website Development</li>
              </ol>
            </nav>
            <p className="rv mt-8 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.04] px-4 py-1.5 text-sm text-[#CFE2FF] shadow-[0_0_30px_rgba(0,123,255,.25)]"><span className="text-[#F59E0B]" aria-hidden="true">✦</span>Website development</p>
            <Lines h1 className="t0 mt-6 max-w-3xl" lines={["Websites built for speed,", <>search and <Acc>growth</Acc></>]} />
            <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70" style={{ transitionDelay: "200ms" }}>Fast, responsive, SEO-friendly sites on Next.js and React, from company websites to e-commerce stores, designed and built by one team.</p>
            <div className="rv mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "300ms" }}>
              <a href="#contact-form" data-magnetic className={`rounded-[4px] bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ringDark}`}>Get a quote</a>
              <Link href="/projects" className={`rounded-[4px] border border-white/25 bg-black/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>See our work</Link>
            </div>
          </div>

          {/* Browser mock-up: illustrative, not a real site */}
          <div className="rv lg:col-span-5" style={{ transitionDelay: "250ms" }} aria-hidden="true">
            <div className="fl">
              <div className="overflow-hidden rounded-[6px] border border-white/15 bg-[#071A33] shadow-[0_30px_100px_rgba(0,123,255,.35)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-3 flex-1 rounded-full bg-white/[.07] px-4 py-1 text-xs text-white/50">yourbrand.com</span>
                </div>
                <div className="p-5">
                  <div className="h-28 rounded-[4px]" style={{ background: "linear-gradient(135deg,#0052CC,#00B4FF)" }} />
                  <div className="mt-4 h-3 w-2/3 rounded-full bg-white/20" />
                  <div className="mt-2 h-3 w-1/2 rounded-full bg-white/10" />
                  <ul className="mt-6 space-y-3">
                    {["Responsive on every screen", "SEO-ready markup", "Fast loading", "Easy to update"].map((t, i) => (
                      <li key={t} className="flex items-center gap-3 text-sm text-white/80">
                        <span className="relative block h-5 w-5 shrink-0" style={{ "--d": `${0.8 + i * 0.5}s` } as CSSProperties}>
                          <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" />
                          <span className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-black"><Check size={12} strokeWidth={3} /></span>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATEMENT */}
      <section className="bg-white py-28 md:py-44" aria-label="Our approach to websites">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-3">
            <Eyebrow>Our approach</Eyebrow>
            <Link href="/projects" className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B1F3B] underline underline-offset-4 hover:text-[#007BFF] ${ring}`}>See our work <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <Words className="text-[clamp(1.8rem,4.2vw,3.8rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0B1F3B] md:col-span-9" text="A website is not a brochure. We build it as part of your business system, fast to load, easy to find and simple to grow, so every visit has a clear path to becoming a customer." />
        </div>
      </section>

      {/* 3. PROBLEM AND OUTCOME */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-label="Problems and outcomes">
        <div className={wrap}>
          <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Most websites <b className="font-bold">stall</b></>, <>where yours should <Acc dark={false}>start</Acc></>]} />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rv rounded-[4px] border border-[#CFE2FF] bg-white p-8 md:p-12">
              <h3 className={`${pop.className} text-2xl font-semibold tracking-[-0.02em] text-[#0B1F3B]`}>Where websites fall short</h3>
              <ul className="mt-8 space-y-5">
                {problems.map((t) => (
                  <li key={t} className="flex items-start gap-4 font-light leading-relaxed text-[#475569]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#B91C1C]"><X size={14} strokeWidth={3} aria-hidden="true" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv relative overflow-hidden rounded-[4px] border border-[#3B82F6]/40 p-8 text-white shadow-[0_0_80px_rgba(59,130,246,.25)] md:p-12" style={{ background: "linear-gradient(160deg,#0B1F3B 30%,#1E3A6B)", transitionDelay: "120ms" }}>
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle,rgba(0,180,255,.35),transparent 65%)" }} />
              <h3 className={`${pop.className} relative text-2xl font-semibold tracking-[-0.02em]`}>What you get with Devntom</h3>
              <ul className="relative mt-8 space-y-5">
                {outcomes.map((t) => (
                  <li key={t} className="flex items-start gap-4 font-light leading-relaxed text-[#CFE2FF]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-black"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Everything your site <b className="font-bold">needs</b></>, <>to <Acc dark={false}>perform</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#475569]">One team handles strategy, design, development and launch, so nothing gets lost between suppliers.</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([Icon, t, d], i) => (
              <li key={t} data-tilt className="rv group rounded-[4px] border border-[#CFE2FF] p-8 transition-colors duration-300 hover:border-[#007BFF] hover:bg-[#F5F9FF]" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E6F0FF] text-[#0052CC] transition-colors duration-300 group-hover:bg-[#007BFF] group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-8 flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#007BFF] opacity-0 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true" /></h3>
                <p className="mt-3 font-light leading-relaxed text-[#475569]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. TYPES OF WEBSITES: expanding panels */}
      <section className="relative overflow-hidden bg-[#050E1F] py-24 text-white md:py-36" aria-label="Types of websites we build">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%,rgba(0,123,255,.28),transparent 45%)" }} />
        <div className={`${wrap} relative`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2" lines={[<>Three kinds of site,</>, <><b className="font-bold">one</b> standard</>]} />
            <p className="rv max-w-sm font-light text-[#CFE2FF]">Whatever you are launching, it gets the same speed, SEO and design discipline.</p>
          </div>
          <ul className="ofc mt-14 grid gap-3 lg:h-[440px]">
            {types.map(([n, d, pts, ghost, bg], i) => (
              <li key={n} className="rv min-h-[260px] min-w-0" style={{ transitionDelay: `${i * 100}ms` }}>
                <a href="#contact-form" className={`group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[4px] border border-white/15 p-6 ${ringDark}`} style={{ background: bg }}>
                  <span aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-6 -right-2 select-none text-[9rem] font-bold leading-none text-white/[.07] transition duration-700 group-hover:-translate-y-3 group-hover:text-white/[.12]`}>{ghost}</span>
                  <span className="relative inline-flex w-fit items-center gap-2 text-sm text-[#93C5FD]">Discuss this build <ArrowUpRight size={16} aria-hidden="true" className="transition group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
                  <div className="relative">
                    <h3 className={`${pop.className} text-3xl font-extralight leading-none tracking-[-0.03em] md:text-4xl`}>{n}</h3>
                    <p className="mt-3 max-w-sm font-light text-[#CFE2FF]">{d}</p>
                    <ul className="mt-5 space-y-1.5 text-sm text-white/80">
                      {pts.map((p) => <li key={p} className="flex items-center gap-2"><Check size={14} className="text-[#00B4FF]" aria-hidden="true" />{p}</li>)}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. TECHNOLOGY */}
      <section className="bg-white py-24 md:py-32" aria-label="Technologies we use">
        <div className={`${wrap} mb-12 text-center`}>
          <Lines className="t2 text-[#0B1F3B]" lines={[<>Built with tools <b className="font-bold">we trust</b></>]} />
          <p className="rv mx-auto mt-5 max-w-xl font-light text-[#475569]">Mainly Next.js and React. We pick what fits your goals rather than forcing one stack.</p>
        </div>
        <div className="rv" style={{ maskImage: "linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)", WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)" }}>
          <TechRow />
          <div className="mt-4"><TechRow rev /></div>
        </div>
      </section>

      {/* 7. PROCESS: flow diagram */}
      <section className="relative overflow-hidden bg-black py-24 text-white md:py-32" aria-label="Our website process">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>live website</Acc></>]} />
            <p className="rv mt-5 font-light text-white/60">Six phases, one delivery process. Every project follows it, and every phase feeds the next.</p>
          </div>
          <div data-r className="mt-16 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[.04] to-transparent px-4 pb-12 pt-14 md:px-10">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-5">
              {steps.map(([t, d, short], i) => (
                <li key={t} className="group relative">
                  <div className="relative h-48 border border-white/15 bg-gradient-to-br from-white/[.09] to-white/[.02] p-4 transition duration-500 group-hover:-translate-y-2 group-hover:border-[#3B82F6]/70" style={{ clipPath: "polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%)" }}>
                    <span aria-hidden="true" className="absolute right-0 top-0 h-7 w-7 bg-gradient-to-br from-white/20 to-transparent" />
                    <span className="relative block h-6 w-6" style={{ "--d": `${0.9 + i * 0.9}s` } as CSSProperties}><span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" /><span aria-label="Done" className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-xs font-bold text-black">✓</span></span>
                    <h3 className="sr-only">{t}</h3>
                    <p className="mt-5 text-[13px] font-light leading-relaxed text-white/60">{d}</p>
                  </div>
                  <span className={`${pop.className} absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[5px] border border-white/20 bg-[#0B1F3B]/90 px-3.5 py-1.5 text-sm font-medium backdrop-blur transition group-hover:border-[#3B82F6] group-hover:bg-[#0052CC]`}>{short}</span>
                </li>
              ))}
            </ol>
            <svg viewBox="0 0 1200 150" className="mx-auto mt-6 hidden h-auto w-full md:block" fill="none" aria-hidden="true">
              {stepX.map((x, i) => {
                const d = `M${x} 0 V45 L${x < 600 ? x + 28 : x - 28} 73 H600`;
                return (
                  <g key={x}>
                    <path d={d} pathLength={1} className="pl" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" style={{ transitionDelay: `${300 + i * 140}ms` }} />
                    <circle r="3.5" fill="#00B4FF"><animateMotion dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d + " V150"} /></circle>
                  </g>
                );
              })}
              <path d="M600 73 V150" pathLength={1} className="pl" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" style={{ transitionDelay: "1200ms" }} />
              <circle cx="600" cy="73" r="5" fill="#000" stroke="rgba(255,255,255,.6)" />
            </svg>
            <div className="mt-8 flex justify-center md:-mt-1">
              <a href="#contact-form" className={`inline-flex items-center gap-3 rounded-full border border-white/25 bg-gradient-to-b from-white/10 to-white/[.02] py-3 pl-4 pr-8 text-lg shadow-[0_0_40px_rgba(0,123,255,.25)] transition hover:border-[#3B82F6] ${ring} focus-visible:ring-offset-black`}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1] text-xl leading-none">+</span>Your website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RELATED PROJECTS */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-label="Website projects">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Websites we have <b className="font-bold">built</b></>, <>to <Acc dark={false}>perform</Acc></>]} />
            <Link href="/projects" data-magnetic className={`inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-6 py-3 font-medium text-white transition hover:bg-[#007BFF] ${ring}`}>All projects <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map(([t, d, tags, stack, href, id], i) => (
              <li key={t} className="rv" style={{ transitionDelay: `${i * 100}ms` }}>
                <Link href={href} data-tilt data-cursor="view" className={`gb group block h-full overflow-hidden rounded-[4px] ${ring}`}>
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#0B1F3B]">
                    <img src={img(id, 1000)} alt={`${t} preview`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/60 to-transparent" />
                    <ul className="absolute left-4 top-4 flex flex-wrap gap-2">{tags.map((g) => <li key={g} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0052CC]">{g}</li>)}</ul>
                  </div>
                  <div className="p-6">
                    <h3 className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                    <p className="mt-2 font-light leading-relaxed text-[#475569]">{d}</p>
                    <p className="mt-4 border-t border-[#E5E7EB] pt-3 text-sm text-[#64748B]">Stack: <span className="font-medium text-[#1F2937]">{stack}</span></p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIALS: drop your existing <Testimonials /> component here and import it at the top of this file. */}

      {/* 9. RELATED SERVICES */}
      <section className="bg-white py-24 md:py-32" aria-label="Related services">
        <div className={wrap}>
          <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Pairs well <b className="font-bold">with</b></>]} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(([Icon, n, href, d], i) => (
              <li key={n} className="rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <Link href={href} className={`group flex h-full flex-col justify-between gap-10 rounded-[4px] border border-[#CFE2FF] p-6 transition-colors duration-300 hover:border-[#007BFF] hover:bg-[#F5F9FF] ${ring}`}>
                  <Icon size={26} className="text-[#0052CC]" aria-hidden="true" />
                  <div>
                    <h3 className={`${pop.className} flex items-start justify-between gap-3 text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{n}<ArrowUpRight size={18} className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-[#475569]">{d}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-label="Frequently asked questions">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Lines className="t2 text-[#0B1F3B]" lines={[<>Questions,</>, <><b className="font-bold">answered</b></>]} />
              <p className="rv mt-6 max-w-xs font-light leading-relaxed text-[#475569]">Can&apos;t find what you need? Write to <a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] font-medium text-[#0052CC] underline underline-offset-4 ${ring}`}>info@devntomsolutions.com</a>.</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="rv group border-t border-[#CFE2FF] last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left ${ring} [&::-webkit-details-marker]:hidden`}>
                  <span className={`${pop.className} text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B] md:text-xl`}>{q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:border-[#007BFF] group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span>
                </summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CONTACT FORM */}
      <section id="contact-form" data-nocursor className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your website project" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s talk</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>your</Acc> <b className="font-bold">website.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#CFE2FF]">Tell us what you want to build. We reply with a plan, a timeline and a quote.</p>
            <ul className="rv mt-8 space-y-2 font-medium">
              <li><a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD] ${ring} focus-visible:ring-offset-[#0A3F9E]`}>info@devntomsolutions.com</a></li>
              <li><a href="https://wa.me/923256036838" className={`rounded-[3px] underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD] ${ring} focus-visible:ring-offset-[#0A3F9E]`}>WhatsApp +92 325 6036838</a></li>
            </ul>
          </div>
          <form onSubmit={submit} className="rv rounded-[4px] bg-white p-7 text-[#1F2937] shadow-[0_30px_100px_rgba(0,123,255,.35)] md:p-9 lg:col-span-6" style={{ transitionDelay: "120ms" }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={label}>Full name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label>
              <label className={label}>Email<input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" /></label>
            </div>
            <label className={`${label} mt-5 block`}>What do you need?
              <select name="service" required defaultValue="Website Development" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, pages or features, timeline" /></label>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button disabled={state === "sending"} className={`group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 font-medium text-white transition hover:bg-[#0052CC] disabled:opacity-60 ${ring}`}>
              {state === "sending" ? "Sending…" : "Send message"} <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p role="status" className={`mt-4 text-sm ${state === "error" ? "text-[#B91C1C]" : "text-[#047857]"}`}>
              {state === "sent" && "Thank you. We received your message and will reply soon."}
              {state === "error" && "Something went wrong. Please email info@devntomsolutions.com instead."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}