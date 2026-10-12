"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, BarChart3, Check, FileText, Link2, MapPin, Plus, Search, Settings2, Gauge } from "lucide-react";
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
.dr{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.4s cubic-bezier(.16,1,.3,1) var(--dl,0s)}
.in .dr{stroke-dashoffset:0}
.fa{opacity:0;transition:opacity 1.2s ease 1.6s}.in .fa{opacity:1}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.scan{animation:scan 7s linear infinite}
@keyframes scan{from{transform:translateY(-10%)}to{transform:translateY(110%)}}
.caret{animation:cr 1s steps(1) infinite}@keyframes cr{50%{opacity:0}}
.fl{animation:fl 6s ease-in-out infinite}@keyframes fl{50%{transform:translateY(-10px)}}
.t0{font-size:clamp(2.6rem,6.6vw,6rem);line-height:1.02;letter-spacing:-.04em}
.t2{font-size:clamp(2rem,4vw,3.6rem);line-height:1.05;letter-spacing:-.03em}
@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;transition:none!important}.dr{stroke-dashoffset:0;transition:none}.fa{opacity:1;transition:none}.scan,.caret,.fl{animation:none}}
`;

const queries = ["best website development company in Lahore", "SEO agency in Riyadh", "web design agency London", "how to rank higher on Google"];
const serp = [
  ["Devntom Solutions | Website, Software and SEO", "www.devntomsolutions.com", "Fast, search-ready websites and growth-focused SEO for businesses in Pakistan, Saudi Arabia and the UK."],
  ["Example Agency One | Web Services", "www.example-one.com", "Placeholder competitor result used to illustrate how rankings compete."],
  ["Example Agency Two | Digital Studio", "www.example-two.com", "Placeholder competitor result used to illustrate how rankings compete."],
  ["Example Agency Three | Marketing", "www.example-three.com", "Placeholder competitor result used to illustrate how rankings compete."],
] as const;

const pillars = [
  [Settings2, "Technical SEO", "The foundation search engines rely on.", ["Crawl and index health", "Core Web Vitals and speed", "Schema and structured data", "Sitemaps, canonicals and redirects"]],
  [FileText, "On-page SEO", "Pages written and structured to rank.", ["Keyword and intent mapping", "Titles, headings and metadata", "Internal linking structure", "Image and content optimisation"]],
  [Search, "Content strategy", "Content that earns trust and traffic.", ["Pillar page blueprints", "Topic clusters around your services", "Blog and case study planning", "Content refreshes that keep rankings"]],
  [MapPin, "Local SEO", "Be found in the cities you serve.", ["Google Business Profile setup", "Consistent name, address and phone", "Local pages for each office", "Reviews and citations"]],
  [Link2, "Authority building", "Earn links and mentions that matter.", ["Relevant backlink outreach", "Digital PR and guest content", "Directory and partner listings", "Toxic link review"]],
  [BarChart3, "Analytics and reporting", "Know exactly what is working.", ["Search Console and Analytics setup", "Rank and traffic tracking", "Conversion tracking", "Clear monthly reports"]],
] as const;

const checks = ["Pages load in under three seconds on mobile", "Every page has a unique title and description", "The whole site uses HTTPS", "An XML sitemap is submitted to Google", "Each page has one clear H1 and logical headings", "Images are compressed and have alt text", "Your Google Business Profile is claimed", "Important pages are linked from other pages", "You publish helpful content regularly", "You track rankings and traffic in Search Console"];

const phases = [
  ["Months 1 to 2", "Foundation", ["Full technical audit", "Keyword and competitor research", "Fix crawl, speed and indexing issues", "Tracking and reporting setup"]],
  ["Months 3 to 4", "On-page and content plan", ["Optimise key service pages", "Pillar page blueprints", "Topic cluster and calendar", "Schema markup"]],
  ["Months 5 to 6", "Authority and local", ["Publish cluster content", "Internal linking improvements", "Local pages and profiles", "Citation and outreach starts"]],
  ["Months 7 to 12", "Scale", ["Expand content clusters", "Ongoing link building", "Conversion optimisation", "Quarterly strategy reviews"]],
] as const;

const offices = [["Lahore", "Pakistan", "Rank for local searches across Punjab and nationwide."], ["Riyadh", "Saudi Arabia", "Reach Saudi customers searching in English and Arabic."], ["London", "United Kingdom", "Compete for UK business searches with local signals."]] as const;

const faqs = [
  ["How long does SEO take to work?", "SEO is a long-term channel. Technical fixes can show results within weeks, while competitive rankings usually build over three to six months or more, depending on your market."],
  ["Can you guarantee the number one position?", "No honest agency can. Search rankings depend on many factors outside anyone's control. We guarantee transparent work, clear reporting and a strategy built on proven practices."],
  ["What do you need from us to start?", "Access to your website, Search Console and Analytics, plus a short call about your goals and customers. We handle the audit and plan from there."],
  ["Do you do local SEO for multiple countries?", "Yes. We have offices in Lahore, Riyadh and London and can plan local and international SEO for each market."],
  ["Is SEO better than paid ads?", "They work together. Ads bring fast traffic while you pay, and SEO builds lasting visibility. We help you balance both."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
const nav = [["svc", "Services"], ["check", "Self-check"], ["road", "Roadmap"], ["local", "Local"], ["report", "Reporting"], ["faq", "FAQ"]];

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => <span className={`${pw.className} text-[.55em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>;
const Tag = ({ n, children, dark }: { n: string; children: ReactNode; dark?: boolean }) => <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] ${dark ? "text-[#38BDF8]" : "text-[#0052CC]"}`}><span>{n}</span><span className="h-px w-10 bg-current opacity-50" />{children}</p>;

function Spark({ d, color = "#00B4FF" }: { d: string; color?: string }) {
  return <svg viewBox="0 0 100 30" className="h-10 w-full" fill="none" aria-hidden="true"><path d={d} pathLength={1} className="dr" stroke={color} strokeWidth="2.2" strokeLinecap="round" /></svg>;
}

export default function SeoOptimizationClient() {
  const root = useRef<HTMLElement>(null);
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(queries[0]);
  const [step, setStep] = useState(0);
  const [pillar, setPillar] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => checks.map(() => false));
  const [active, setActive] = useState("svc");
  const bar = useRef<HTMLDivElement>(null);

  // typewriter + ranking climb (static under reduced motion)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(3); return; }
    let i = 0, t: ReturnType<typeof setTimeout>;
    const q = queries[qi];
    setTyped("");
    const type = () => { i++; setTyped(q.slice(0, i)); if (i < q.length) t = setTimeout(type, 55); else t = setTimeout(() => setQi((qi + 1) % queries.length), 3800); };
    t = setTimeout(type, 400);
    return () => clearTimeout(t);
  }, [qi]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 1500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    const sec = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
    nav.forEach(([id]) => { const n = document.getElementById(id); if (n) sec.observe(n); });
    let raf = 0;
    const prog = () => { raf = 0; const d = document.documentElement.scrollHeight - innerHeight; bar.current!.style.transform = `scaleX(${d > 0 ? scrollY / d : 0})`; };
    const onS = () => { if (!raf) raf = requestAnimationFrame(prog); };
    addEventListener("scroll", onS, { passive: true });
    return () => { io.disconnect(); sec.disconnect(); removeEventListener("scroll", onS); cancelAnimationFrame(raf); };
  }, []);

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  // our result climbs from 4th to 1st, holds, then resets
  const ourPos = Math.max(0, 3 - Math.min(step, 3));
  const others = [1, 2, 3];
  const posOf = (i: number) => (i === 0 ? ourPos : (() => { const slots = [0, 1, 2, 3].filter((x) => x !== ourPos); return slots[others.indexOf(i)]; })());
  const score = done.filter(Boolean).length;
  const verdict = score <= 3 ? "Big opportunities. A full audit will show where to start." : score <= 7 ? "A solid base. A few fixes could lift your rankings." : "Strong foundations. Let us help you scale.";
  const P = pillars[pillar];
  const P0 = P[0];

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-[#050E1F] text-white`}>
      <style>{css}</style>
      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1. HERO: a search that climbs */}
      <section className="relative isolate overflow-hidden px-6 pb-28 pt-36 text-center md:px-12 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%,rgba(0,123,255,.35),transparent 70%),#050E1F" }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(147,197,253,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(147,197,253,.08) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%,#000,transparent)" }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden"><div className="scan h-24 bg-gradient-to-b from-transparent via-[#00B4FF]/10 to-transparent" /></div>
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        <p className="rv inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.04] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#CFE2FF]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />SEO Optimization</p>
        <h1 className={`${pop.className} rv t0 mx-auto mt-7 max-w-5xl font-extralight`} style={{ transitionDelay: "100ms" }}>When they search, be the <b className="font-bold">answer</b><Acc>.</Acc></h1>
        <p className="rv mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-[#CFE2FF]" style={{ transitionDelay: "200ms" }}>Technical, on-page and local SEO that moves your website up the results and brings in customers who are already looking for you.</p>

        <div className="rv mx-auto mt-12 max-w-3xl text-left" style={{ transitionDelay: "300ms" }} aria-hidden="true">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/[.06] px-6 py-4 shadow-[0_0_60px_rgba(0,123,255,.25)] backdrop-blur"><Search size={20} className="text-[#38BDF8]" /><span className="truncate text-base md:text-lg">{typed}<i className="caret ml-0.5 inline-block h-5 w-px translate-y-1 bg-white" /></span></div>
          <div className="relative mt-4" style={{ height: "21rem" }}>
            {serp.map(([t, u, d], i) => (
              <div key={t} className={`absolute inset-x-0 h-[5rem] rounded-[10px] border px-5 py-3 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${i === 0 ? "z-10 border-[#00B4FF]/60 bg-[#0A2A5C]/90 shadow-[0_0_40px_rgba(0,180,255,.3)]" : "border-white/10 bg-white/[.04]"}`} style={{ transform: `translateY(${posOf(i) * 5.4}rem)` }}>
                <p className="flex items-center gap-2 text-xs text-[#93C5FD]">{u}{i === 0 && ourPos === 0 && <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] font-semibold text-black">#1</span>}</p>
                <p className={`${pop.className} truncate text-base font-semibold ${i === 0 ? "text-white" : "text-[#CFE2FF]/80"}`}>{t}</p>
                <p className="truncate text-xs text-[#B8C9DE]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-white/50">Illustrative example of a ranking climb. Competitor results are placeholders.</p>
        </div>
        <div className="rv mt-10 flex flex-wrap justify-center gap-3" style={{ transitionDelay: "400ms" }}>
          <a href="#check" className={`group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0B1F3B] transition-colors duration-300 hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Check your SEO now <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={16} aria-hidden="true" /></span></a>
          <a href="#contact" className={`rounded-full border border-white/25 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#050E1F]`}>Get a free SEO audit</a>
        </div>
      </section>

      {/* sticky section index */}
      <div className="sticky top-0 z-40 border-y border-white/10 bg-[#050E1F]/85 backdrop-blur-xl">
        <ul className={`${wrap} flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          {nav.map(([id, l]) => <li key={id}><a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`block whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-colors ${active === id ? "bg-[#007BFF] text-white" : "text-[#B8C9DE] hover:text-white"} ${ring}`}>{l}</a></li>)}
          <li className="ml-auto hidden md:block"><a href="#contact" className="block whitespace-nowrap px-4 py-2.5 text-sm font-medium text-[#38BDF8]">Free audit →</a></li>
        </ul>
      </div>

      {/* 2. SERVICES: pillar explorer */}
      <section id="svc" className="py-24 md:py-32" aria-labelledby="svct">
        <div className={wrap}>
          <div data-r className="rv"><Tag n="01" dark>What we do</Tag><h2 id="svct" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight`}>Six pillars of <b className="font-bold">SEO</b> that actually move rankings</h2></div>
          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <div role="tablist" aria-label="SEO pillars" className="grid gap-2 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {pillars.map(([Icon, n], k) => (
                <button key={n} role="tab" aria-selected={pillar === k} onClick={() => setPillar(k)} onMouseEnter={() => setPillar(k)} className={`group flex items-center gap-4 rounded-[4px] border px-5 py-4 text-left transition-all duration-300 ${pillar === k ? "border-[#00B4FF] bg-[#0A2A5C]/70 shadow-[0_0_30px_rgba(0,180,255,.2)]" : "border-white/10 bg-white/[.03] hover:border-white/30"} ${ring} focus-visible:ring-offset-[#050E1F]`}>
                  <span className="font-mono text-xs text-[#38BDF8]">0{k + 1}</span>
                  <Icon size={20} className={pillar === k ? "text-[#00B4FF]" : "text-white/60"} aria-hidden="true" />
                  <span className={`${pop.className} flex-1 font-semibold`}>{n}</span>
                  <ArrowUpRight size={18} className={`transition ${pillar === k ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[4px] border border-white/15 bg-[#071A33] p-8 md:p-12 lg:col-span-7" role="tabpanel">
              <span aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#007BFF]/25 blur-[90px]" />
              <div key={pillar} className="relative [animation:up_.6s_ease_both]">
                <P0 size={34} className="text-[#00B4FF]" aria-hidden="true" />
                <h3 className={`${pop.className} mt-6 text-3xl font-semibold tracking-[-0.02em]`}>{P[1]}</h3>
                <p className="mt-2 text-[#B8C9DE]">{P[2]}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">{P[3].map((x) => <li key={x} className="flex items-start gap-3 rounded-[4px] border border-white/10 bg-white/[.04] p-4 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-[#10B981]" aria-hidden="true" />{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
        <style>{"@keyframes up{from{opacity:0;transform:translateY(12px)}}"}</style>
      </section>

      {/* 3. SELF CHECK: interactive */}
      <section id="check" className="bg-[#F5F9FF] py-24 text-[#0B1F3B] md:py-32" aria-labelledby="chk">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5"><div className="lg:sticky lg:top-28">
            <div data-r className="rv"><Tag n="02">Quick self-check</Tag><h2 id="chk" className={`${pop.className} t2 mt-5 font-extralight`}>How search-ready is <b className="font-bold">your site</b>?</h2><p className="mt-4 text-[#475569]">Tick everything that is true today. It takes a minute and shows where to focus first.</p></div>
            <div className="mt-10 flex items-center gap-6 rounded-[4px] border border-[#CFE2FF] bg-white p-6" role="status">
              <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90 shrink-0" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="#E6F0FF" strokeWidth="8" /><circle cx="50" cy="50" r="42" fill="none" stroke="#007BFF" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={264 - (264 * score) / checks.length} style={{ transition: "stroke-dashoffset .8s cubic-bezier(.22,1,.36,1)" }} /></svg>
              <div><p className={`${pop.className} text-4xl font-semibold`}>{score}<span className="text-xl text-[#64748B]">/{checks.length}</span></p><p className="mt-1 text-sm text-[#475569]">{verdict}</p></div>
            </div>
            <a href="#contact" className={`mt-6 inline-flex items-center gap-2 rounded-full bg-[#007BFF] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0B1F3B] ${ring}`}>Get the full audit <ArrowRight size={16} aria-hidden="true" /></a>
          </div></div>
          <ul className="lg:col-span-7">
            {checks.map((c, k) => (
              <li key={c} className="border-t border-[#CFE2FF] last:border-b">
                <label className="flex cursor-pointer items-center gap-4 py-4 transition-colors hover:bg-white/60">
                  <input type="checkbox" checked={done[k]} onChange={() => setDone(done.map((v, i) => (i === k ? !v : v)))} className="peer sr-only" />
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] border-2 border-[#93C5FD] text-transparent transition-all duration-300 peer-checked:border-[#007BFF] peer-checked:bg-[#007BFF] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#00B4FF]"><Check size={16} strokeWidth={3} aria-hidden="true" /></span>
                  <span className="font-mono text-xs text-[#64748B]">{String(k + 1).padStart(2, "0")}</span>
                  <span className={`${pop.className} text-lg transition-colors ${done[k] ? "text-[#0052CC]" : ""}`}>{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. ROADMAP */}
      <section id="road" className="py-24 md:py-32" aria-labelledby="rd">
        <div className={wrap}>
          <div data-r className="rv"><Tag n="03" dark>12-month roadmap</Tag><h2 id="rd" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight`}>A plan that builds <b className="font-bold">month by month</b></h2></div>
          <ol data-r className="relative mt-16">
            <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-px origin-top scale-y-0 bg-gradient-to-b from-[#00B4FF] to-[#007BFF] shadow-[0_0_14px_#00B4FF] transition-transform duration-[2800ms] ease-out [.in_&]:scale-y-100 md:left-[calc(25%-1px)]" />
            {phases.map(([m, t, list], k) => (
              <li key={t} className="relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#00B4FF] bg-[#050E1F] md:left-[calc(25%-12px)]"><i className="h-2 w-2 rounded-full bg-[#00B4FF]" /></span>
                <p className="font-mono text-sm text-[#38BDF8] md:pr-12 md:text-right">{m}</p>
                <div className="md:col-span-3 md:pl-6"><h3 className={`${pop.className} text-2xl font-semibold`}>{t}</h3><ul className="mt-4 grid gap-2 sm:grid-cols-2">{list.map((x) => <li key={x} className="flex items-center gap-3 rounded-[4px] border border-white/10 bg-white/[.04] px-4 py-3 text-sm"><span className="font-mono text-[#38BDF8]">0{k + 1}</span>{x}</li>)}</ul></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. LOCAL */}
      <section id="local" className="bg-gradient-to-b from-[#0A3F9E] to-[#0B1F3B] py-24 md:py-32" aria-labelledby="loc">
        <div className={wrap}>
          <div data-r className="rv"><Tag n="04" dark>Local SEO</Tag><h2 id="loc" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight`}>Found in <b className="font-bold">every city</b> you serve</h2></div>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {offices.map(([c, k, d], i) => (
              <li key={c} data-r className="rv group relative overflow-hidden rounded-[4px] border border-white/20 bg-[#050E1F]/50 p-8 backdrop-blur transition-colors hover:border-[#00B4FF]" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="relative flex h-14 w-14 items-center justify-center"><span className="absolute inset-0 animate-ping rounded-full bg-[#00B4FF]/25" /><MapPin size={26} className="relative text-[#00B4FF]" aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-6 text-3xl font-semibold`}>{c}</h3><p className="text-sm text-[#93C5FD]">{k}</p><p className="mt-4 text-sm leading-relaxed text-[#CFE2FF]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. REPORTING */}
      <section id="report" className="py-24 md:py-32" aria-labelledby="rp">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-12`}>
          <div data-r className="rv lg:col-span-5"><Tag n="05" dark>Reporting</Tag><h2 id="rp" className={`${pop.className} t2 mt-5 font-extralight`}>Numbers you can <b className="font-bold">actually read</b></h2><p className="mt-5 text-[#B8C9DE]">Every month you get a plain-language report: what changed, why it matters and what we do next. No jargon, no vanity metrics.</p></div>
          <div data-r className="rv relative lg:col-span-7">
            <div className="rounded-[10px] border border-white/15 bg-[#071A33] p-6 shadow-[0_30px_90px_rgba(0,123,255,.25)]">
              <div className="grid grid-cols-3 gap-3">{[["Impressions", "M0 26 L20 20 L40 22 L60 12 L80 14 L100 3"], ["Clicks", "M0 27 L25 21 L50 17 L75 9 L100 4"], ["Avg. position", "M0 4 L25 9 L50 14 L75 20 L100 27"]].map(([l, d], i) => <div key={l} className="rounded-[4px] border border-white/10 bg-white/[.04] p-4"><p className="text-xs text-[#93C5FD]">{l}</p><Spark d={d} color={i === 2 ? "#10B981" : "#00B4FF"} /></div>)}</div>
              <svg viewBox="0 0 400 160" className="mt-6 h-44 w-full" fill="none" aria-hidden="true"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00B4FF" stopOpacity=".35" /><stop offset="1" stopColor="#00B4FF" stopOpacity="0" /></linearGradient></defs>{[40, 80, 120].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />)}<path d="M0 140 C60 135 90 120 140 105 S230 70 280 45 S360 20 400 10 V160 H0Z" fill="url(#ga)" className="fa" /><path d="M0 140 C60 135 90 120 140 105 S230 70 280 45 S360 20 400 10" pathLength={1} className="dr" stroke="#00B4FF" strokeWidth="3" strokeLinecap="round" /></svg>
              <p className="mt-2 text-xs text-white/50">Sample report layout with illustrative data. Real results vary by market and competition.</p>
            </div>
            <span className="fl absolute -right-3 -top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050E1F]/90 px-4 py-2 text-sm backdrop-blur"><Gauge size={15} className="text-[#10B981]" aria-hidden="true" />Core Web Vitals passing</span>
          </div>
        </div>
      </section>

      <div className="bg-white text-[#1F2937]"><ClientLogos /><Testimonials /><Blog /></div>

      {/* 7. FAQ */}
      <section id="faq" className="py-24 md:py-32" aria-labelledby="fq">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div data-r className="rv lg:col-span-4"><Tag n="06" dark>FAQ</Tag><h2 id="fq" className={`${pop.className} t2 mt-5 font-extralight`}>SEO <b className="font-bold">questions</b></h2></div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-t border-white/15 last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 ${ring} focus-visible:ring-offset-[#050E1F] [&::-webkit-details-marker]:hidden`}><span className={`${pop.className} text-lg font-semibold md:text-xl`}>{q}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3B82F6] text-[#93C5FD] transition group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span></summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#B8C9DE]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative isolate overflow-hidden py-28 text-center md:py-36" aria-labelledby="cta" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(circle,#000,transparent 70%)" }} />
        <div className={wrap}><h2 id="cta" data-r className={`${pop.className} rv t0 mx-auto max-w-4xl font-extralight`}>Ready to rank <b className="font-bold">higher</b>?</h2><p className="rv mx-auto mt-5 max-w-md text-lg font-light text-[#CFE2FF]">Get a free SEO audit and a clear plan. No obligation.</p><a href="#contact" className={`rv mt-9 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition-colors hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#0A3F9E]`}>Request your audit <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white"><ArrowRight size={18} aria-hidden="true" /></span></a></div>
      </section>

      <div id="contact" className="[&>*:last-child]:mb-0"><ContactForm /></div>
    </main>
  );
}