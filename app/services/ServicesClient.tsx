"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Bot, Check, Code2, Globe, Megaphone, PenTool, Plus, Search, Smartphone } from "lucide-react";
import Industries from "@/components/Industries";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/BlogInsights";
import ContactForm from "@/components/ContactForm";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

const css = `
.rv{opacity:0;transform:translateY(36px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.dr{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1) var(--dl,0s)}
.in .dr{stroke-dashoffset:0}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.spin{animation:rot 50s linear infinite}@keyframes rot{to{transform:rotate(360deg)}}
.pulse{animation:pl 3s ease-out infinite}@keyframes pl{from{transform:scale(1);opacity:.5}to{transform:scale(2.2);opacity:0}}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
.t0{font-size:clamp(2.6rem,6vw,5.4rem);line-height:1.03;letter-spacing:-.04em}
.t2{font-size:clamp(2rem,4vw,3.6rem);line-height:1.05;letter-spacing:-.03em}
@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;transition:none!important}.dr{stroke-dashoffset:0;transition:none}.spin,.pulse{animation:none}.chk{opacity:1;transform:none;transition:none}.spn{opacity:0}}
`;

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const services = [
  [Globe, "Website Development", "/services/website-development", "Fast, beautiful, search-ready websites on Next.js and React, from company sites to e-commerce.", ["Business sites", "E-commerce", "Web apps"], "photo-1460925895917-afdab827c52f"],
  [Code2, "Custom Software", "/services/custom-software-development", "Web apps, SaaS, CRM and ERP systems that replace spreadsheets and manual steps.", ["SaaS", "CRM and ERP", "Dashboards"], "photo-1498050108023-c5249f4df085"],
  [Smartphone, "Mobile Apps", "/services/mobile-app-development", "Native and cross-platform iOS and Android apps with secure backends and store launch.", ["iOS", "Android", "Cross-platform"], "photo-1512941937669-90a1b58e7e9c"],
  [Bot, "AI Automation", "/services/ai-automation", "Intelligent workflows and automation pipelines that save time and reduce manual errors.", ["Workflows", "AI agents", "Integrations"], "photo-1531297484001-80022131f5a1"],
  [Megaphone, "Digital Marketing", "/services/digital-marketing", "Data-driven campaigns across search, social, email and content that bring in qualified leads.", ["Paid ads", "Social", "Email"], "photo-1551288049-bebda4e38f71"],
  [PenTool, "UI/UX Design", "/services/ui-ux-design", "Research-led interfaces and design systems that are easy to use and built to convert.", ["Research", "UI design", "Prototypes"], "photo-1519389950473-47ba0277781c"],
  [Search, "SEO Optimization", "/services/seo-optimization", "Technical, on-page and local SEO that moves your website up the search results.", ["Technical", "Content", "Local"], "photo-1556742049-0cfed4f6a45d"],
] as const;

const goals: [string, number[]][] = [["Get more visitors", [6, 4]], ["Sell online", [0, 4, 6]], ["Launch an app", [2, 5]], ["Automate manual work", [3, 1]], ["Improve design and UX", [5, 0]], ["Build custom software", [1, 2]]];
const bundles = [["Launch a business", "Look credible and get found from day one.", [0, 5, 6]], ["Grow online", "Turn search and social into steady leads.", [6, 4, 0]], ["Build a product", "Take an idea from design to the stores.", [1, 2, 5]], ["Work smarter", "Automate and connect how your team works.", [3, 1]]] as const;
const steps = [["Discovery", "Goals and scope."], ["Design", "Structure and visuals."], ["Build", "Weekly demos."], ["Test", "Speed and security."], ["Launch", "Go live safely."], ["Grow", "Support and results."]];
const faqs = [
  ["Do I have to buy several services together?", "No. Each service works on its own. Many clients combine them because a website, design, SEO and marketing reinforce each other."],
  ["Which service should I start with?", "Use the finder above, or book a short call. We recommend the smallest set of services that gets you to your goal."],
  ["Do you work with clients outside Pakistan?", "Yes. We have offices in Lahore, Riyadh and London and work with clients around the world."],
  ["How do projects and pricing work?", "After a discovery call we send a fixed scope, timeline and quote, so you know what you are getting before work starts."],
  ["Do you offer support after launch?", "Yes. Every service includes the option of ongoing support, monitoring and improvements."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => <span className={`${pw.className} text-[.55em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>;
const Label = ({ n, children, dark }: { n: string; children: ReactNode; dark?: boolean }) => <p className={`flex items-center gap-3 text-sm font-medium ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}><span className="font-mono">{n}</span><span className="h-px w-8 bg-current opacity-60" />{children}</p>;

export default function ServicesClient() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const prev = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState<number | null>(null);
  const [sel, setSel] = useState<number[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    root.current!.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    let raf = 0;
    const prog = () => { raf = 0; const d = document.documentElement.scrollHeight - innerHeight; bar.current!.style.transform = `scaleX(${d > 0 ? scrollY / d : 0})`; };
    const onS = () => { if (!raf) raf = requestAnimationFrame(prog); };
    addEventListener("scroll", onS, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onS); cancelAnimationFrame(raf); };
  }, []);

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const score = new Map<number, number>();
  sel.forEach((g) => goals[g][1].forEach((s) => score.set(s, (score.get(s) ?? 0) + 1)));
  const rec = [...score.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  const N = services.length;

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1. HERO: the hub */}
      <section className="relative isolate overflow-hidden bg-[#050E1F] px-6 pb-28 pt-36 text-white md:px-12 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 60% at 78% 45%,rgba(0,123,255,.4),transparent 70%),radial-gradient(ellipse 40% 40% at 0% 100%,rgba(99,102,241,.22),transparent 70%),#050E1F" }} />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="rv inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.05] px-4 py-1.5 text-sm text-[#CFE2FF]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />Our services</p>
            <h1 className={`${pop.className} rv t0 mt-6 font-extralight`} style={{ transitionDelay: "100ms" }}>One team. <b className="font-bold">Seven services.</b> <Acc>One system.</Acc></h1>
            <p className="rv mt-6 max-w-lg text-lg font-light leading-relaxed text-[#CFE2FF]" style={{ transitionDelay: "200ms" }}>From websites and software to apps, AI, design, marketing and SEO, we engineer the digital systems that become the backbone of your business.</p>
            <div className="rv mt-8 flex flex-wrap gap-3" style={{ transitionDelay: "300ms" }}>
              <a href="#finder" className={`group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0B1F3B] transition-colors duration-300 hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Find the right service <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={16} aria-hidden="true" /></span></a>
              <a href="#contact" className={`rounded-full border border-white/25 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#050E1F]`}>Talk to us</a>
            </div>
          </div>
          <div data-r className="relative mx-auto aspect-square w-full max-w-[34rem] lg:col-span-6">
            <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
              <g className="spin" style={{ transformOrigin: "240px 240px" }}><circle cx="240" cy="240" r="170" stroke="rgba(147,197,253,.45)" strokeWidth="1.5" strokeDasharray="3 10" strokeLinecap="round" /></g>
              {services.map((_, k) => { const a = (-90 + (360 / N) * k) * (Math.PI / 180); return <path key={k} d={`M240 240 L${240 + 170 * Math.cos(a)} ${240 + 170 * Math.sin(a)}`} pathLength={1} className="dr" stroke="url(#hg)" strokeWidth="1.8" style={{ "--dl": `${0.3 + k * 0.15}s` } as CSSProperties} />; })}
              <defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stopColor="#00B4FF" /><stop offset="1" stopColor="#007BFF" /></linearGradient></defs>
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center" aria-hidden="true"><span className="pulse absolute inset-0 rounded-full bg-[#007BFF]/40" /><span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0052CC] to-[#00B4FF] shadow-[0_0_60px_rgba(0,180,255,.6)]"><svg width="38" height="38" viewBox="0 0 32 32"><path d="M4 4h12a12 12 0 0 1 0 24H4l6-8h6a4 4 0 0 0 0-8H4z" fill="#fff" /></svg></span></div>
            {services.map(([Icon, name, href], k) => { const a = (-90 + (360 / N) * k) * (Math.PI / 180); return (
              <Link key={name} href={href} aria-label={name} className={`group absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0B1F3B] text-[#38BDF8] shadow-lg transition-all duration-300 hover:scale-125 hover:border-[#00B4FF] hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`} style={{ left: `${((240 + 170 * Math.cos(a)) / 480) * 100}%`, top: `${((240 + 170 * Math.sin(a)) / 480) * 100}%` }}>
                <Icon size={22} aria-hidden="true" /><span className="pointer-events-none absolute top-full mt-2 hidden whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-[#0B1F3B] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 md:block">{name}</span>
              </Link>); })}
          </div>
        </div>
      </section>

      {/* 2. SERVICE LIST with hover preview */}
      <section className="py-24 md:py-32" aria-labelledby="all">
        <div className={wrap}>
          <div data-r className="rv"><Label n="01">All services</Label><h2 id="all" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight text-[#0B1F3B]`}>Everything you need to <b className="font-bold">build, launch and grow</b></h2></div>
          <ul className="relative mt-14 border-t border-[#0B1F3B]" onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); if (prev.current) prev.current.style.transform = `translate3d(${e.clientX - r.left + 28}px,${e.clientY - r.top - 110}px,0)`; }} onPointerLeave={() => setHov(null)}>
            {services.map(([Icon, name, href, d, tags], k) => (
              <li key={name} data-r className="rv border-b border-[#CFE2FF]" onPointerEnter={() => setHov(k)} style={{ transitionDelay: `${(k % 3) * 70}ms` }}>
                <Link href={href} onFocus={() => setHov(k)} className={`group grid items-center gap-4 py-7 transition-colors duration-300 hover:bg-[#F5F9FF] md:grid-cols-12 md:gap-8 md:px-4 ${ring}`}>
                  <span className="font-mono text-sm text-[#0052CC] md:col-span-1">0{k + 1}</span>
                  <h3 className={`${pop.className} flex items-center gap-4 text-2xl font-semibold tracking-[-0.02em] text-[#0B1F3B] transition-transform duration-300 group-hover:translate-x-2 md:col-span-4 md:text-3xl`}><Icon size={26} className="text-[#007BFF]" aria-hidden="true" />{name}</h3>
                  <p className="text-[15px] leading-relaxed text-[#475569] md:col-span-4">{d}</p>
                  <span className="flex items-center justify-between gap-3 md:col-span-3"><span className="flex flex-wrap gap-2">{tags.map((t) => <span key={t} className="rounded-full border border-[#CFE2FF] px-3 py-1 text-xs text-[#0052CC]">{t}</span>)}</span><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#007BFF] group-hover:bg-[#007BFF] group-hover:text-white"><ArrowUpRight size={18} aria-hidden="true" /></span></span>
                </Link>
              </li>
            ))}
            <div ref={prev} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block" style={{ opacity: hov === null ? 0 : 1, transition: "opacity .3s" }}><div className="h-52 w-72 overflow-hidden rounded-[14px] border border-white bg-[#0B1F3B] shadow-[0_30px_80px_rgba(0,30,90,.35)]">{hov !== null && <img key={hov} src={img(services[hov][5])} alt="" className="h-full w-full object-cover [animation:pv_.5s_ease_both]" />}</div></div>
          </ul>
        </div>
        <style>{"@keyframes pv{from{opacity:0;transform:scale(1.08)}}"}</style>
      </section>

      {/* 3. FINDER */}
      <section id="finder" className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="fd">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <div data-r className="rv"><Label n="02">Service finder</Label><h2 id="fd" className={`${pop.className} t2 mt-5 font-extralight text-[#0B1F3B]`}>What do you want to <b className="font-bold">achieve</b>?</h2><p className="mt-4 text-[#475569]">Tick everything that applies. We will point you to the services that fit.</p></div>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Your goals">{goals.map(([g], k) => <button key={g} onClick={() => setSel(sel.includes(k) ? sel.filter((x) => x !== k) : [...sel, k])} aria-pressed={sel.includes(k)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${sel.includes(k) ? "border-[#007BFF] bg-[#007BFF] text-white" : "border-[#CFE2FF] bg-white text-[#0B1F3B] hover:border-[#007BFF]"} ${ring}`}>{sel.includes(k) && <Check size={14} strokeWidth={3} aria-hidden="true" />}{g}</button>)}</div>
          </div>
          <div className="lg:col-span-7" role="status" aria-live="polite">
            {rec.length === 0 ? <div className="flex h-full min-h-[14rem] items-center justify-center rounded-[20px] border-2 border-dashed border-[#CFE2FF] p-8 text-center text-[#64748B]">Choose a goal to see recommended services.</div> : (
              <ul className="grid gap-4 sm:grid-cols-2">{rec.slice(0, 4).map(([s, n], i) => { const [Icon, name, href, d] = services[s]; return (
                <li key={s} className="[animation:pv_.5s_ease_both]" style={{ animationDelay: `${i * 80}ms` }}><Link href={href} className={`group relative block h-full rounded-[18px] border border-[#CFE2FF] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#007BFF] hover:shadow-[0_20px_50px_rgba(0,123,255,.15)] ${ring}`}>
                  {i === 0 && <span className="absolute right-4 top-4 rounded-full bg-[#10B981] px-2.5 py-0.5 text-[11px] font-semibold text-black">Best match</span>}
                  <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#E6F0FF] text-[#0052CC] transition group-hover:bg-[#007BFF] group-hover:text-white"><Icon size={20} aria-hidden="true" /></span>
                  <h3 className={`${pop.className} mt-4 text-lg font-semibold text-[#0B1F3B]`}>{name}</h3><p className="mt-1 line-clamp-2 text-sm text-[#475569]">{d}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0052CC]">Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link></li>); })}</ul>
            )}
          </div>
        </div>
        <style>{"@keyframes pv{from{opacity:0;transform:translateY(12px)}}"}</style>
      </section>

      {/* 4. BUNDLES */}
      <section className="py-24 md:py-32" aria-labelledby="bd">
        <div className={wrap}>
          <div data-r className="rv"><Label n="03">Popular combinations</Label><h2 id="bd" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight text-[#0B1F3B]`}>Services that <b className="font-bold">work better together</b></h2></div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {bundles.map(([t, d, ids], k) => (
              <li key={t} data-r className="rv relative overflow-hidden rounded-[22px] bg-[#0B1F3B] p-8 text-white md:p-10" style={{ transitionDelay: `${(k % 2) * 100}ms` }}>
                <svg aria-hidden="true" className="pointer-events-none absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-visible"><rect width="100%" height="100%" rx="22" fill="none" pathLength={1} className="dr" stroke="url(#hg)" strokeWidth="1.8" style={{ "--dl": `${k * 0.3}s` } as CSSProperties} /></svg>
                <span className="font-mono text-xs text-[#38BDF8]">Bundle 0{k + 1}</span>
                <h3 className={`${pop.className} mt-3 text-3xl font-semibold tracking-[-0.02em]`}>{t}</h3><p className="mt-2 text-[#B8C9DE]">{d}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">{ids.map((s, i) => { const [Icon, name, href] = services[s]; return <span key={s} className="flex items-center gap-2"><Link href={href} className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm transition-colors hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#0B1F3B]`}><Icon size={15} aria-hidden="true" />{name}</Link>{i < ids.length - 1 && <Plus size={14} className="text-[#38BDF8]" aria-hidden="true" />}</span>; })}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="bg-[#050E1F] py-24 text-white md:py-32" aria-labelledby="pr">
        <div className={wrap}>
          <div data-r className="rv text-center"><Label n="04" dark>How we work</Label><h2 id="pr" className={`${pop.className} t2 mx-auto mt-5 max-w-2xl font-extralight`}>The same six steps on <b className="font-bold">every project</b></h2></div>
          <ol data-r className="relative mt-16 grid gap-10 md:grid-cols-6 md:gap-4">
            <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[22px] hidden h-px origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF] shadow-[0_0_14px_#00B4FF] transition-transform duration-[2800ms] ease-out [.in_&]:scale-x-100 md:block" />
            {steps.map(([n, d], k) => (
              <li key={n} className="relative text-center">
                <span className="relative mx-auto block h-11 w-11" style={{ "--d": `${0.5 + k * 0.45}s` } as CSSProperties}><span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" /><span className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-black"><Check size={18} strokeWidth={3} aria-label="Done" /></span></span>
                <h3 className={`${pop.className} mt-4 font-semibold`}>{n}</h3><p className="mt-1 text-sm font-light text-[#B8C9DE]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Industries />
      <ClientLogos />
      <Testimonials />
      <Blog />

      {/* FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="fq">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div data-r className="rv lg:col-span-4"><Label n="05">FAQ</Label><h2 id="fq" className={`${pop.className} t2 mt-5 font-extralight text-[#0B1F3B]`}>Common <b className="font-bold">questions</b></h2></div>
          <div className="lg:col-span-8">{faqs.map(([q, a]) => (
            <details key={q} className="group border-t border-[#CFE2FF] last:border-b">
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 ${ring} [&::-webkit-details-marker]:hidden`}><span className={`${pop.className} text-lg font-semibold text-[#0B1F3B] md:text-xl`}>{q}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span></summary>
              <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">{a}</p>
            </details>
          ))}</div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden py-28 text-center text-white md:py-36" aria-labelledby="cta" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(circle,#000,transparent 70%)" }} />
        <div className={wrap}><h2 id="cta" data-r className={`${pop.className} rv t0 mx-auto max-w-4xl font-extralight`}>Let&apos;s build <b className="font-bold">what&apos;s next</b></h2><p className="rv mx-auto mt-5 max-w-md text-lg font-light text-[#CFE2FF]">Tell us your goal. We reply with a plan, a timeline and a quote.</p><a href="#contact" className={`rv mt-9 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition-colors hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#0A3F9E]`}>Book a call <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white"><ArrowRight size={18} aria-hidden="true" /></span></a></div>
      </section>

      <div id="contact" className="[&>*:last-child]:mb-0"><ContactForm /></div>
    </main>
  );
}