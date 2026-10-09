
"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, SiVercel, SiPostgresql, SiFigma, SiWordpress, SiShopify } from "react-icons/si";
import { ArrowRight, ArrowUpRight, Building2, Gauge, LayoutDashboard, Plus, RefreshCw, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, Zap } from "lucide-react";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Industries from "@/components/Industries";
import Blog from "@/components/BlogInsights";
import ContactForm from "@/components/ContactForm";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

const css = `
.ln{overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.in .ln>span{transform:none}
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.t0{font-size:clamp(2.5rem,6.4vw,6.2rem);line-height:1.04;letter-spacing:-.04em}
.t2{font-size:clamp(2.2rem,4.5vw,4.2rem);line-height:1.02;letter-spacing:-.035em}
.bp{animation:bp 8s cubic-bezier(.16,1,.3,1) infinite var(--dl)}
@keyframes bp{0%{opacity:0;transform:translateY(16px) scale(.97)}9%,82%{opacity:1;transform:none}94%,100%{opacity:0}}
.mock{transform:perspective(1500px) rotateX(calc(12deg * (1 - var(--t,0)))) scale(calc(.95 + .05 * var(--t,0)));transform-origin:50% 0}
.sr{stroke-dasharray:276.5;stroke-dashoffset:276.5;transition:stroke-dashoffset 2s cubic-bezier(.16,1,.3,1) var(--dl,0s)}
.in .sr{stroke-dashoffset:calc(276.5 * (1 - var(--v) / 100))}
.mq{animation:mq 40s linear infinite}
.mqw:hover .mq{animation-play-state:paused}
@keyframes mq{to{transform:translate3d(-50%,0,0)}}
.imr{opacity:0;transform:translateY(40px) scale(0.96);transition:opacity 1s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)}
.imr.in{opacity:1;transform:none}
.path-curve{stroke-dasharray: 1500; transition: stroke-dashoffset 0.2s ease-out;}
@media (prefers-reduced-motion:reduce){.imr{opacity:1!important;transform:none!important;transition:none}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.bp,.mq{animation:none!important}.bp{opacity:1}.sr{transition:none;stroke-dashoffset:calc(276.5 * (1 - var(--v) / 100))}.mock{transform:none}}
`;

const types = [
  [Building2, "Business websites", "Clear, credible company sites that turn visitors into enquiries."],
  [ShoppingCart, "E-commerce stores", "Fast catalogues, smooth checkout and order management."],
  [LayoutDashboard, "Web apps and portals", "Dashboards, customer portals and booking systems."],
  [Rocket, "Landing pages", "One-goal pages for campaigns, launches and lead capture."],
  [RefreshCw, "Redesign and migration", "Modernise a slow or outdated site without losing search rankings."],
  [Search, "SEO-first builds", "Structure, speed and schema planned from the first wireframe."],
] as const;

// Placeholder photos
const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const typeImgs = ["photo-1519389950473-47ba0277781c", "photo-1556742049-0cfed4f6a45d", "photo-1551288049-bebda4e38f71", "photo-1460925895917-afdab827c52f", "photo-1498050108023-c5249f4df085", "photo-1531297484001-80022131f5a1"];
const strip = [["photo-1498050108023-c5249f4df085", "Clean, modern code"], ["photo-1551288049-bebda4e38f71", "Dashboards that make sense"], ["photo-1512941937669-90a1b58e7e9c", "Perfect on every screen"]];
const proc = [
  ["01", "Discovery & Strategy", "We learn your goals, customers and competitors, then agree scope, sitemap and success metrics.", ["Goals", "Users", "Roadmap"], "photo-1519389950473-47ba0277781c"],
  ["02", "Wireframes & UX", "Every page is sketched and tested as a clickable flow before any visual design starts.", ["Sitemap", "Wireframes", "User flows"], "photo-1460925895917-afdab827c52f"],
  ["03", "Visual Design", "Brand-led layouts, typography and motion designed in Figma and approved by you.", ["UI design", "Motion", "Design system"], "photo-1531297484001-80022131f5a1"],
  ["04", "Development", "Clean, component-based code with a demo at every milestone so you always see progress.", ["Next.js", "CMS", "Integrations"], "photo-1498050108023-c5249f4df085"],
  ["05", "Testing & Launch", "Speed, security, accessibility and device testing, then a monitored go-live with a rollback plan.", ["QA", "Performance", "Deployment"], "photo-1551288049-bebda4e38f71"],
  ["06", "Support & Growth", "Updates, monitoring, SEO and new features, so your website keeps getting better.", ["Care plans", "SEO", "Analytics"], "photo-1512941937669-90a1b58e7e9c"],
] as const;

const principles = [
  [Gauge, "Fast by default", "Optimised images, lean code and edge hosting so pages feel instant."],
  [Smartphone, "Mobile first", "Designed on the smallest screen first, then expanded for desktop mastery."],
  [Search, "Search ready", "Clean metadata, structured data and a logical hierarchy built in."],
  [ShieldCheck, "Secure & scalable", "Protected data and a modern architecture that grows with your business."],
] as const;

const scores = [["Performance", 98], ["Accessibility", 100], ["Best practices", 100], ["SEO", 100]] as const;
const stack = [[SiNextdotjs, "Next.js"], [SiReact, "React"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"], [SiNodedotjs, "Node.js"], [SiPostgresql, "PostgreSQL"], [SiVercel, "Vercel"], [SiFigma, "Figma"], [SiWordpress, "WordPress"], [SiShopify, "Shopify"]] as const;

const stages = [
  ["01", "Blueprint", "We map out the architecture, defining the optimal user journey and structure before writing a single line of code."],
  ["02", "Engineering", "Translating designs into reality. We build responsive, interactive components powered by modern web technologies."],
  ["03", "Deployment", "Rigorous testing across devices ensures flawless performance. We launch safely with monitoring in place."],
] as const;

const faqs = [
  ["How much does a website cost?", "It depends on pages, features and integrations. After a short discovery call we send a fixed quote with deliverables and a timeline."],
  ["How long does a website take?", "A focused business site usually takes a few weeks. Larger e-commerce sites and web apps take longer. You get a dated plan before we start."],
  ["Will my website rank on Google?", "We build search foundations in from day one: fast loading, clean structure, metadata and schema. Rankings also depend on content and competition, so we can add ongoing SEO."],
  ["Can I update the website myself?", "Yes. We connect a CMS or admin panel that suits your team and show you how to use it."],
  ["Do you support the site after launch?", "Yes. We offer maintenance, performance monitoring, security updates and new features."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#00B4FF]" : "text-[#0052CC]"}`}>{children}</span>
);

function Lines({ lines, className = "", h1 = false }: { lines: ReactNode[]; className?: string; h1?: boolean }) {
  const Tag = (h1 ? "h1" : "h2") as "h2";
  return (
    <Tag data-r className={`${pop.className} font-extralight ${className}`}>
      {lines.map((l, i) => <span key={i} className="ln block"><span style={{ transitionDelay: `${i * 110}ms` }}>{l}</span></span>)}
    </Tag>
  );
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (n: number) => { const p = Math.min(1, (n - t0) / 2000); el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{to}</span>;
}

const Block = ({ c, className = "" }: { c: string; className?: string }) => <i className={`block rounded-[3px] ${c} ${className}`} />;

export default function WebsiteDevelopmentClient() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    el.querySelectorAll("[data-r],.rv,.imr").forEach((n) => io.observe(n));
    const words = [...el.querySelectorAll<HTMLElement>("[data-words]")];
    const hero = el.querySelector<HTMLElement>("[data-hero]")!;
    const proc = el.querySelector<HTMLElement>("[data-proc]")!;
    const stepEls = [...proc.querySelectorAll<HTMLElement>("[data-step]")];
    const pin = el.querySelector<HTMLElement>("[data-pin]")!;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      hero.style.setProperty("--t", Math.min(1, scrollY / (vh * 0.7)).toFixed(3));
      const r = pin.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      pin.dataset.stage = String(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
      
      const pr = proc.getBoundingClientRect();
      proc.style.setProperty("--pp", Math.min(1, Math.max(0, (vh * 0.7 - pr.top) / pr.height)).toFixed(3));
      stepEls.forEach((st) => { const b = st.getBoundingClientRect(); st.dataset.on = String(b.top + b.height / 2 < vh * 0.85); });
      
      words.forEach((w) => {
        const b = w.getBoundingClientRect();
        const q = Math.min(1, Math.max(0, (vh * 0.85 - b.top) / (b.height + vh * 0.25)));
        const n = w.children.length;
        [...w.children].forEach((c, i) => ((c as HTMLElement).style.opacity = String(0.16 + 0.84 * Math.min(1, Math.max(0, (q * 1.25 - i / n) * 6)))));
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (reduce) { words.forEach((w) => [...w.children].forEach((c) => ((c as HTMLElement).style.opacity = "1"))); pin.dataset.stage = "2"; hero.style.setProperty("--t", "1"); proc.style.setProperty("--pp", "1"); stepEls.forEach((st) => (st.dataset.on = "true")); }
    else { tick(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on); }
    return () => { io.disconnect(); removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const on = ["group-data-[stage=0]:opacity-100 group-data-[stage=0]:translate-y-0", "group-data-[stage=1]:opacity-100 group-data-[stage=1]:translate-y-0", "group-data-[stage=2]:opacity-100 group-data-[stage=2]:translate-y-0"];
  const step = ["group-data-[stage=0]:opacity-100 group-data-[stage=0]:translate-x-4", "group-data-[stage=1]:opacity-100 group-data-[stage=1]:translate-x-4", "group-data-[stage=2]:opacity-100 group-data-[stage=2]:translate-x-4"];
  const stageCls = (n: number) => `transition-all duration-700 opacity-0 translate-y-4 ${on[n]}`;

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1. HERO: Redesigned with cleaner grid and no floating elements */}
      <section data-hero className="relative isolate overflow-hidden bg-[#030816] px-5 pb-32 pt-36 text-center text-white md:pt-44" style={{ "--t": 0 } as CSSProperties}>
        {/* Modern Grid & Glow Background */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#007BFF] opacity-20 blur-[120px]" />
        
        <p className="rv inline-flex items-center gap-2 rounded-full border border-[#00B4FF]/30 bg-[#00B4FF]/10 px-4 py-1.5 text-sm font-medium text-[#CFE2FF] backdrop-blur-md"><span className="text-[#00B4FF]" aria-hidden="true">✦</span> Next-Gen Web Development</p>
        <Lines h1 className="t0 mx-auto mt-8 max-w-5xl text-white drop-shadow-sm" lines={[<>Websites that look</>, <><b className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#CFE2FF]">expensive</b> and load <Acc>instantly</Acc></>]} />
        <p className="rv mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-[#B8C9DE]" style={{ transitionDelay: "200ms" }}>We design and engineer fast, beautiful, search-ready websites that win trust in the first three seconds.</p>
        <div className="rv mt-10 flex flex-wrap justify-center gap-4" style={{ transitionDelay: "300ms" }}>
          <Link href="/contact" className={`rounded-[6px] bg-gradient-to-r from-[#007BFF] to-[#00B4FF] px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#007BFF]/25 transition hover:shadow-[#007BFF]/40 hover:scale-[1.02] ${ring} focus-visible:ring-offset-black`}>Start your website</Link>
          <Link href="/projects" className={`rounded-[6px] border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/10 ${ring} focus-visible:ring-offset-black`}>See our work</Link>
        </div>

        {/* Improved Dashboard Mockup (Floating images removed) */}
        <div className="relative mx-auto mt-20 max-w-5xl px-4" aria-hidden="true">
          <div className="mock overflow-hidden rounded-xl border border-white/10 bg-[#0A1122] text-left shadow-[0_0_80px_rgba(0,123,255,0.15)] ring-1 ring-white/5">
            <div className="flex items-center gap-2 border-b border-white/5 bg-[#050914] px-4 py-3">
              <i className="h-3 w-3 rounded-full bg-[#EF4444]" /><i className="h-3 w-3 rounded-full bg-[#F59E0B]" /><i className="h-3 w-3 rounded-full bg-[#10B981]" />
              <div className="mx-auto flex h-6 items-center rounded-md bg-white/5 px-8 text-[11px] tracking-wider text-white/40">devntomsolutions.com</div>
            </div>
            <div className="space-y-6 bg-[radial-gradient(ellipse_at_top_right,rgba(0,180,255,0.08),transparent_50%)] p-6 md:p-10">
              <div className="bp flex items-center justify-between" style={{ "--dl": "0.2s" } as CSSProperties}>
                <span className="flex items-center gap-3"><i className="h-6 w-6 rounded-md bg-gradient-to-br from-[#00B4FF] to-[#0052CC]" /><i className="h-2 w-20 rounded-full bg-white/20" /></span>
                <span className="hidden gap-6 sm:flex"><i className="h-2 w-12 rounded-full bg-white/10" /><i className="h-2 w-12 rounded-full bg-white/10" /><i className="h-2 w-12 rounded-full bg-white/10" /></span>
                <i className="h-8 w-24 rounded-md bg-white/10" />
              </div>
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <p className={`bp ${pop.className} text-3xl font-semibold leading-tight text-white md:text-5xl`} style={{ "--dl": "0.6s" } as CSSProperties}>Scale your<br />vision.</p>
                  <i className="bp block h-2 w-3/4 rounded-full bg-[#B8C9DE]/30" style={{ "--dl": "0.9s" } as CSSProperties} />
                  <i className="bp block h-2 w-1/2 rounded-full bg-[#B8C9DE]/20" style={{ "--dl": "1.1s" } as CSSProperties} />
                  <i className="bp mt-4 block h-10 w-32 rounded-md bg-gradient-to-r from-[#007BFF] to-[#00B4FF]" style={{ "--dl": "1.4s" } as CSSProperties} />
                </div>
                <div className="bp h-40 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm md:h-52 relative overflow-hidden" style={{ "--dl": "1s" } as CSSProperties}>
                  <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 px-4 opacity-50">
                    {[40, 70, 50, 90, 60, 100].map((h, i) => <i key={i} className="flex-1 rounded-t-sm bg-[#00B4FF]" style={{ height: `${h}%` }} />)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {[1.7, 1.9, 2.1].map((d) => <div key={d} className="bp h-20 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm md:h-24" style={{ "--dl": `${d}s` } as CSSProperties} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATEMENT */}
      <section className="bg-white py-24 md:py-36">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <p className="flex items-center gap-3 text-sm font-semibold tracking-wide text-[#0052CC] uppercase md:col-span-3"><span className="h-px w-8 bg-[#007BFF]" />The Standard</p>
          <p data-words className={`${pop.className} text-[clamp(1.8rem,4.2vw,3.6rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0B1F3B] md:col-span-9`}>
            {"Your website is not a brochure. It is your fastest salesperson, working every hour, in every country, judged in three seconds.".split(" ").map((w, i) => <span key={i} style={{ opacity: 0.16 }}>{w} </span>)}
          </p>
        </div>
      </section>

      {/* 2b. TICKER */}
      <div aria-hidden="true" className="mqw overflow-hidden border-y border-[#E5EAF1] bg-[#F8FAFC] py-8">
        <div className="mq flex w-max" style={{ animationDuration: "34s" }}>
          {[0, 1].flatMap((k) => ["Fast", "Beautiful", "Secure", "Search-ready"].map((w) => (
            <span key={`${k}-${w}`} className={`${pop.className} mr-14 text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-[-0.04em] text-transparent`} style={{ WebkitTextStroke: "1.5px #007BFF" }}>{w} <span className="text-[#00B4FF]">✦</span></span>
          )))}
        </div>
      </div>

      {/* 2c. VISUAL STRIP (Fixed Imr visibility) */}
      <section className="bg-white py-24 md:py-36" aria-label="Our website craft">
        <div className={wrap}>
          <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>Crafted <b className="font-bold text-[#007BFF]">pixel</b> by pixel,</>, <>built to <Acc dark={false}>last</Acc></>]} />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {strip.map(([id, label], i) => (
              <figure key={label} className={`imr relative h-[450px] overflow-hidden rounded-2xl bg-[#0B1F3B] shadow-xl shadow-blue-900/5 ${i === 1 ? "md:translate-y-12" : ""}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <img src={img(id, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105 hover:opacity-100" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050E1F]/90 via-[#050E1F]/20 to-transparent pointer-events-none" />
                <figcaption className={`${pop.className} absolute bottom-8 left-8 right-8 text-xl font-semibold text-white`}>{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SCORES (Upgraded to premium glassmorphic/dark theme) */}
      <section className="bg-[#030816] py-24 text-white md:py-36 relative overflow-hidden" aria-labelledby="scores">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(0,123,255,0.1),transparent_50%)]" />
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl" lines={[<>Built to score</>, <><b className="font-bold text-[#00B4FF]">near-perfect</b> <Acc>everywhere</Acc></>]} />
            <p id="scores" className="rv max-w-sm font-light leading-relaxed text-[#B8C9DE]">These are the Lighthouse targets we build every site to. We test before launch and share the report.</p>
          </div>
          <ul data-r className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {scores.map(([l, v], i) => (
              <li key={l} className="rv group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-colors hover:bg-white/[0.04] hover:border-white/20" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00B4FF]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative h-36 w-36 drop-shadow-[0_0_15px_rgba(0,180,255,0.3)]">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#00B4FF" strokeWidth="4" strokeLinecap="round" className="sr drop-shadow-[0_0_8px_#00B4FF]" style={{ "--v": v, "--dl": `${i * 0.15}s` } as CSSProperties} />
                  </svg>
                  <span className={`${pop.className} absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white`}><Count to={v} /></span>
                </div>
                <p className="mt-6 font-medium tracking-wide text-[#CFE2FF]">{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. PINNED STAGES (Upgraded mockup visualizations) */}
      <section data-pin data-stage="0" className="group relative h-[320svh] bg-[#02050E] text-white" aria-label="How a website comes together">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,123,255,0.15),transparent_60%)]" />
          <div className={`${wrap} relative grid items-center gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold tracking-widest text-[#00B4FF] uppercase">The Lifecycle</p>
              <ol className="mt-8 space-y-12">
                {stages.map(([n, t, d], i) => (
                  <li key={t} className={`${pop.className} transition-all duration-700 opacity-20 ${step[i]}`}>
                    <span className="font-mono text-sm text-[#00B4FF]">{n} //</span>
                    <h3 className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl mt-2">{t}</h3>
                    <p className="mt-4 max-w-sm text-[16px] font-light leading-relaxed text-[#B8C9DE]">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-7" aria-hidden="true">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-white/10 bg-[#070D1C] shadow-[0_40px_120px_rgba(0,123,255,0.15)] ring-1 ring-white/5">
                <div className="flex gap-2 border-b border-white/5 bg-[#03060C] px-5 py-4">
                  <i className="h-3 w-3 rounded-full bg-white/10" /><i className="h-3 w-3 rounded-full bg-white/10" /><i className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                
                {/* Stage 0: Wireframe Blueprint */}
                <div className={`absolute inset-x-0 bottom-0 top-12 space-y-4 p-8 ${stageCls(0)}`}>
                  <Block c="border-2 border-dashed border-white/20" className="h-10 w-full" />
                  <div className="flex gap-4">
                    <Block c="border-2 border-dashed border-white/20" className="h-40 w-1/2" />
                    <Block c="border-2 border-dashed border-white/20" className="h-40 w-1/2" />
                  </div>
                  <Block c="border-2 border-dashed border-white/20" className="h-20 w-3/4" />
                </div>
                
                {/* Stage 1: Engineering Components */}
                <div className={`absolute inset-x-0 bottom-0 top-12 space-y-4 p-8 bg-[#0A1122] ${stageCls(1)}`}>
                  <Block c="bg-white/10" className="h-10 w-full" />
                  <div className="flex gap-4">
                    <Block c="bg-gradient-to-br from-[#0052CC]/50 to-[#00B4FF]/50 border border-[#00B4FF]/20" className="h-40 w-1/2 rounded-lg" />
                    <div className="w-1/2 space-y-4">
                       <Block c="bg-white/10" className="h-10 w-full" />
                       <Block c="bg-white/10" className="h-10 w-3/4" />
                       <Block c="bg-[#00B4FF]/30" className="h-12 w-1/2 rounded-md" />
                    </div>
                  </div>
                </div>
                
                {/* Stage 2: Live Polish */}
                <div className={`absolute inset-x-0 bottom-0 top-12 space-y-4 p-8 bg-[#0B1529] ${stageCls(2)}`}>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                     <Block c="bg-white/80" className="h-6 w-32" />
                     <div className="flex gap-3"><Block c="bg-white/20" className="h-2 w-10" /><Block c="bg-white/20" className="h-2 w-10" /></div>
                  </div>
                  <Block c="bg-gradient-to-r from-[#0052CC] via-[#007BFF] to-[#00B4FF] shadow-lg shadow-blue-500/20" className="h-32 w-full rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    <Block c="bg-white/10" className="h-24 rounded-lg" />
                    <Block c="bg-white/10" className="h-24 rounded-lg" />
                    <Block c="bg-white/10" className="h-24 rounded-lg" />
                  </div>
                  <span className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1.5 text-xs font-semibold text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
                    <Zap size={14} className="fill-[#10B981]" /> Live Optimized
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT WE BUILD */}
      <section className="bg-[#F8FAFC] py-24 md:py-36" aria-labelledby="build">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>Every kind of</>, <><b className="font-bold text-[#007BFF]">website</b>, <Acc dark={false}>done right</Acc></>]} />
            <p id="build" className="rv max-w-sm font-light leading-relaxed text-[#475569]">From a ten-page company site to a full e-commerce platform, built on one proven process.</p>
          </div>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map(([Icon, t, d], i) => (
              <li key={t} className="rv group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-[#00B4FF]/30" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="relative h-48 overflow-hidden bg-[#0A1122]">
                  <img src={img(typeImgs[i], 700)} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0A1122] to-transparent" />
                  <span className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                </div>
                <div className="relative p-8">
                  <h3 className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#00B4FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                  <p className="mt-3 text-[15px] font-light leading-[1.75] text-[#475569]">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5b. CREATIVE PROCESS (Curved SVG Winding Road Layout) */}
      <section className="relative overflow-hidden bg-[#020613] py-24 text-white md:py-36" aria-labelledby="proc">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,123,255,0.1),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(0,180,255,0.05),transparent_40%)]" />
        <div className={`${wrap} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>A process you</>, <>can <Acc>see</Acc> and follow</>]} />
            <p id="proc" className="rv mt-6 font-light text-[#B8C9DE]">Six clear stages. Scroll to follow the journey from first call to a website that keeps growing.</p>
          </div>
          
          <div data-proc className="relative mt-24 py-10" style={{ "--pp": 0 } as CSSProperties}>
            {/* Desktop SVG Winding Road */}
            <div className="absolute inset-x-0 top-0 bottom-0 z-0 hidden lg:block overflow-visible" aria-hidden="true">
              <svg className="absolute left-1/2 h-full w-[300px] -translate-x-1/2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 1000">
                {/* Background Track */}
                <path d="M 50,0 C 100,83 100,83 50,166 C 0,250 0,250 50,333 C 100,416 100,416 50,500 C 0,583 0,583 50,666 C 100,750 100,750 50,833 C 0,916 0,916 50,1000" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" />
                {/* Animated Fill Track */}
                <path d="M 50,0 C 100,83 100,83 50,166 C 0,250 0,250 50,333 C 100,416 100,416 50,500 C 0,583 0,583 50,666 C 100,750 100,750 50,833 C 0,916 0,916 50,1000" fill="none" stroke="url(#road-grad)" strokeWidth="4" strokeLinecap="round" className="path-curve drop-shadow-[0_0_8px_#00B4FF]" style={{ strokeDashoffset: 'calc(1500 * (1 - var(--pp)))' }} />
                <defs>
                  <linearGradient id="road-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B4FF" />
                    <stop offset="100%" stopColor="#0052CC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Mobile straight line */}
            <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-px bg-white/10 lg:hidden" />
            <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-[2px] origin-top bg-gradient-to-b from-[#00B4FF] to-[#0052CC] lg:hidden" style={{ transform: "scaleY(var(--pp))" }} />

            <ol className="relative z-10 space-y-16 lg:space-y-24">
              {proc.map(([n, t, d, tags, id], i) => {
                const isEven = i % 2 === 0;
                return (
                  <li key={t} data-step data-on="false" className="group relative grid items-center gap-8 pl-14 opacity-30 transition-all duration-1000 data-[on=true]:opacity-100 lg:grid-cols-2 lg:gap-32 lg:pl-0">
                    <span aria-hidden="true" className={`${pop.className} absolute left-6 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-[#020613] font-mono text-sm font-semibold transition-all duration-700 group-data-[on=true]:border-[#00B4FF] group-data-[on=true]:bg-[#007BFF] group-data-[on=true]:text-white group-data-[on=true]:shadow-[0_0_20px_#00B4FF] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2`}>{n}</span>
                    <div className={isEven ? "lg:text-right" : "lg:order-2"}>
                      <h3 className={`${pop.className} text-3xl font-semibold tracking-[-0.02em] md:text-4xl text-white`}>{t}</h3>
                      <p className="mt-4 font-light leading-relaxed text-[#B8C9DE] lg:inline-block lg:max-w-md">{d}</p>
                      <ul className={`mt-6 flex flex-wrap gap-2 ${isEven ? "lg:justify-end" : ""}`}>
                        {tags.map((g) => <li key={g} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#CFE2FF] backdrop-blur-sm">{g}</li>)}
                      </ul>
                    </div>
                    <div className={`imr overflow-hidden rounded-xl border border-white/10 ring-1 ring-white/5 ${isEven ? "lg:order-1" : ""}`}>
                      <img src={img(id, 800)} alt="" loading="lazy" className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100 md:h-80" />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <Industries />

      {/* 6. PRINCIPLES + STACK (Upgraded to premium Glassmorphic Bento Grid) */}
      <section className="relative overflow-hidden py-24 text-white md:py-36" style={{ background: "linear-gradient(135deg,#030816,#07142A)" }} aria-labelledby="why">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,123,255,0.15),transparent_60%)]" />
        <div className={wrap}>
          <Lines className="t2 max-w-3xl" lines={[<>Why our websites</>, <><b className="font-bold text-[#00B4FF]">perform better</b></>]} />
          <p id="why" className="sr-only">Our website principles</p>
          <ul className="mt-16 grid gap-6 md:grid-cols-2">
            {principles.map(([Icon, t, d], i) => (
              <li key={t} className="rv group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-[#00B4FF]/40 hover:shadow-[0_20px_40px_rgba(0,180,255,0.05)]" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B4FF]/0 to-[#00B4FF]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-3 relative z-10">
                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-[#00B4FF]"><Icon size={24} aria-hidden="true" /></div>
                   <ArrowUpRight size={20} className="text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#00B4FF]" aria-hidden="true" />
                </div>
                <h3 className={`${pop.className} mt-8 text-2xl font-semibold tracking-[-0.01em] relative z-10`}>{t}</h3>
                <p className="mt-3 max-w-md font-light leading-relaxed text-[#B8C9DE] relative z-10">{d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mqw mt-20 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }} aria-label="Technologies we use">
          <div className="mq flex w-max">
            {[...stack, ...stack].map(([Ic, n], i) => <span key={i} className="mr-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[15px] font-medium backdrop-blur-sm"><Ic aria-hidden="true" className="h-5 w-5 text-[#00B4FF]" />{n}</span>)}
          </div>
        </div>
      </section>

      <ClientLogos />
      <Testimonials />
      <Blog />

      {/* 7. FAQ */}
      <section className="bg-[#F8FAFC] py-24 md:py-36" aria-labelledby="faq">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4"><div className="lg:sticky lg:top-32"><Lines className="t2 text-[#0B1F3B]" lines={[<>Website</>, <><b className="font-bold text-[#007BFF]">questions</b></>]} /><p id="faq" className="rv mt-6 max-w-xs font-light text-[#475569]">More questions? Write to <a href="mailto:info@devntomsolutions.com" className="font-medium text-[#007BFF] underline underline-offset-4 hover:text-[#0052CC]">info@devntomsolutions.com</a>.</p></div></div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="rv group border-b border-[#E5EAF1] first:border-t">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-8 ${ring} [&::-webkit-details-marker]:hidden`}>
                  <span className={`${pop.className} text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{q}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#00B4FF]/30 bg-white text-[#007BFF] shadow-sm transition-all group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white"><Plus size={20} aria-hidden="true" /></span>
                </summary>
                <p className="max-w-2xl pb-8 text-[16px] font-light leading-relaxed text-[#475569]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative isolate overflow-hidden py-32 text-center text-white md:py-48" style={{ background: "linear-gradient(135deg,#030816 0%,#0052CC 100%)" }} aria-labelledby="cta">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.2) 1px,transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(circle_at_center,#000_20%,transparent_80%)" }} />
        <div className={wrap}>
          <Lines className="t0 mx-auto max-w-4xl drop-shadow-md" lines={[<>Ready for a website</>, <>people <Acc dark={false}><span className="text-white">remember?</span></Acc></>]} />
          <p id="cta" className="rv mx-auto mt-8 max-w-md text-lg font-light text-[#CFE2FF]">Tell us about your project. We reply with a plan, a timeline and a solid quote.</p>
          <div className="rv mt-12 flex flex-wrap justify-center gap-4">
            <a href="#contact" className={`group inline-flex items-center gap-3 rounded-[6px] bg-white py-3.5 pl-8 pr-4 font-semibold text-[#0052CC] shadow-xl transition hover:bg-[#F8FAFC] hover:scale-[1.02] ${ring} focus-visible:ring-offset-[#0052CC]`}>Book a call <span className="flex h-8 w-8 items-center justify-center rounded bg-[#0052CC] text-white transition group-hover:translate-x-1"><ArrowRight size={16} aria-hidden="true" /></span></a>
            <a href="https://wa.me/923256036838" className={`rounded-[6px] border border-white/20 bg-white/5 px-8 py-3.5 font-medium backdrop-blur-sm transition hover:bg-white/10 ${ring} focus-visible:ring-offset-[#0052CC]`}>WhatsApp us</a>
          </div>
        </div>
      </section>
      <div id="contact"><ContactForm /></div>
    </main>
  );
}