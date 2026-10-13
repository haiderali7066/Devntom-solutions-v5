"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { SiFigma, SiFramer, SiMiro, SiNotion, SiReact, SiStorybook, SiTailwindcss } from "react-icons/si";
import { ArrowRight, Check, Component, Eye, FlaskConical, Layers, MessageSquare, MousePointer2, Palette, PenTool, Plus, Smartphone, Sparkles, Square, Type, Users } from "lucide-react";
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
.dots{background-image:radial-gradient(#C3D6F2 1.2px,transparent 1.2px);background-size:26px 26px}
.c1{animation:c1 9s ease-in-out infinite}.c2{animation:c2 11s ease-in-out infinite}.c3{animation:c3 10s ease-in-out infinite}
@keyframes c1{0%,100%{transform:translate(0,0)}35%{transform:translate(180px,60px)}70%{transform:translate(60px,150px)}}
@keyframes c2{0%,100%{transform:translate(0,0)}40%{transform:translate(-160px,40px)}75%{transform:translate(-60px,-90px)}}
@keyframes c3{0%,100%{transform:translate(0,0)}30%{transform:translate(-120px,-70px)}65%{transform:translate(90px,-40px)}}
.fl{animation:fl 6s ease-in-out infinite}@keyframes fl{50%{transform:translateY(-10px)}}
.mq2{animation:mq2 38s linear infinite}.mqw:hover .mq2{animation-play-state:paused}@keyframes mq2{to{transform:translate3d(-50%,0,0)}}
.t0{font-size:clamp(2.6rem,6.4vw,5.8rem);line-height:1.03;letter-spacing:-.04em}
.t2{font-size:clamp(2rem,4vw,3.6rem);line-height:1.05;letter-spacing:-.03em}
@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;transition:none!important}.dr{stroke-dashoffset:0;transition:none}.c1,.c2,.c3,.fl,.mq2{animation:none}}
`;

const swatches = ["#007BFF", "#00B4FF", "#6366F1", "#10B981", "#F59E0B", "#EF4444"];
const phases = [
  ["Discover", "Understand", ["Stakeholder interviews", "User research and surveys", "Competitor and market review"]],
  ["Define", "Focus", ["Personas and journeys", "Problem statements", "Success metrics"]],
  ["Develop", "Explore", ["Wireframes and flows", "UI design and design system", "Interactive prototypes"]],
  ["Deliver", "Ship", ["Usability testing", "Developer handoff", "Design QA and iteration"]],
] as const;
const deliverables = [[Users, "User research", "Interviews, surveys and journey maps that reveal what people really need."], [Layers, "Wireframes and flows", "Clear structure and navigation before any visual polish."], [Palette, "UI design", "Brand-led interfaces that feel premium and are easy to use."], [Component, "Design systems", "Reusable components and tokens so every screen stays consistent."], [Sparkles, "Prototypes", "Clickable prototypes to test ideas with real users early."], [FlaskConical, "Usability testing", "Test, learn and refine before development spends time and money."]] as const;
const issues = [
  { x: "18%", y: "14%", bad: "Navigation has too many links", good: "Five clear menu items" },
  { x: "62%", y: "34%", bad: "Main button is hard to spot", good: "One bold primary action" },
  { x: "24%", y: "62%", bad: "Dense text, no hierarchy", good: "Short copy with clear headings" },
  { x: "70%", y: "78%", bad: "Form asks for too much", good: "Three simple fields" },
];
const tools = [[SiFigma, "Figma"], [SiFramer, "Framer"], [SiMiro, "Miro"], [SiNotion, "Notion"], [SiStorybook, "Storybook"], [SiReact, "React"], [SiTailwindcss, "Tailwind CSS"]] as const;
const faqs = [
  ["What is the difference between UI and UX design?", "UX design is how a product works and feels: research, structure and flows. UI design is how it looks: layout, colour, typography and components. We do both together so they support each other."],
  ["How long does a design project take?", "A focused website or app design often takes a few weeks. Larger products and design systems take longer. You get a clear schedule after discovery."],
  ["Will you design for mobile and desktop?", "Yes. We design responsive layouts for every screen size, starting with the smallest, and test them in prototypes."],
  ["Do you hand off to developers?", "Yes. You receive organised Figma files, a component library and specs, and our developers can build the design for you."],
  ["Can you redesign an existing product?", "Yes. We start with a UX audit to find what is hurting usability and conversion, then redesign the parts that matter most."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

const Acc = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => <span className={`${pw.className} text-[.55em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>;
const Label = ({ n, children, dark }: { n: string; children: ReactNode; dark?: boolean }) => <p className={`flex items-center gap-3 text-sm font-medium ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}><span className="font-mono">{n}</span><span className="h-px w-8 bg-current opacity-60" />{children}</p>;
const Cursor = ({ name, color, cls, style }: { name: string; color: string; cls: string; style: CSSProperties }) => (
  <div aria-hidden="true" className={`${cls} absolute z-20`} style={style}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill={color} stroke="#fff" strokeWidth="1.5"><path d="M4 3l7 17 2.5-7L21 10z" /></svg>
    <span className="ml-4 -mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white" style={{ background: color }}>{name}</span>
  </div>
);

function Frame({ hi, title, children, wire, className = "" }: { hi: boolean; title: string; children: ReactNode; wire: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[14px] border bg-white shadow-[0_24px_70px_rgba(0,82,204,.16)] transition-colors duration-700 ${hi ? "border-[#CFE2FF]" : "border-dashed border-[#94A3B8]"} ${className}`}>
      <p className="absolute left-3 top-2 z-10 font-mono text-[10px] text-[#64748B]">{title}</p>
      <div className={`absolute inset-0 p-4 pt-8 transition-opacity duration-700 ${hi ? "opacity-0" : "opacity-100"}`}>{wire}</div>
      <div className={`absolute inset-0 p-4 pt-8 transition-opacity duration-700 ${hi ? "opacity-100" : "opacity-0"}`}>{children}</div>
    </div>
  );
}
const W = ({ c = "" }: { c?: string }) => <i className={`block rounded-[3px] border border-dashed border-[#94A3B8] bg-[#F1F5F9] ${c}`} />;

export default function UiUxDesignClient() {
  const root = useRef<HTMLElement>(null);
  const [hi, setHi] = useState(true);
  const [auto, setAuto] = useState(true);
  const [ac, setAc] = useState(0);
  const [rad, setRad] = useState(12);
  const [bold, setBold] = useState(true);
  const [fix, setFix] = useState(false);
  const [ph, setPh] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setHi((v) => !v), 3800);
    return () => clearInterval(id);
  }, [auto]);
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
  const color = swatches[ac];

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1. HERO: a live design canvas */}
      <section className="dots relative isolate overflow-hidden bg-[#F5F9FF] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#007BFF]/15 blur-[110px]" />
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="rv inline-flex items-center gap-2 rounded-full border border-[#CFE2FF] bg-white px-4 py-1.5 text-sm text-[#0052CC]"><Sparkles size={15} aria-hidden="true" />UI/UX Design</p>
          <h1 className={`${pop.className} rv t0 mx-auto mt-6 max-w-5xl font-extralight text-[#0B1F3B]`} style={{ transitionDelay: "100ms" }}>Design people <b className="font-bold">understand</b> at a glance<Acc>.</Acc></h1>
          <p className="rv mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-[#475569]" style={{ transitionDelay: "200ms" }}>Research-led interfaces for websites and apps that are easy to use, beautiful to look at and built to convert.</p>
          <div className="rv mt-8 flex flex-wrap justify-center gap-3" style={{ transitionDelay: "300ms" }}>
            <a href="#contact" className={`group inline-flex items-center gap-3 rounded-full bg-[#0B1F3B] py-3 pl-7 pr-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#007BFF] ${ring}`}>Start a design project <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={16} aria-hidden="true" /></span></a>
            <a href="#playground" className={`rounded-full border border-[#0B1F3B] px-7 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}>Try the design playground</a>
          </div>

          <div className="rv relative mx-auto mt-14 max-w-5xl text-left" style={{ transitionDelay: "400ms" }}>
            <div className="absolute -top-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#CFE2FF] bg-white p-1 shadow-lg" role="group" aria-label="Design fidelity">
              {[[false, "Wireframe"], [true, "Hi-fi"]].map(([v, l]) => <button key={String(l)} onClick={() => { setHi(v as boolean); setAuto(false); }} aria-pressed={hi === v} className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${hi === v ? "bg-[#007BFF] text-white" : "text-[#475569] hover:text-[#0B1F3B]"} ${ring}`}>{l as string}</button>)}
            </div>
            <div className="relative grid h-[26rem] grid-cols-12 items-center gap-5 pt-6" aria-hidden="true">
              <Frame hi={hi} title="Mobile · 390" className="col-span-3 hidden h-[22rem] md:block" wire={<div className="space-y-3"><W c="h-5 w-full" /><W c="h-28" /><W c="h-3 w-3/4" /><W c="h-9" /></div>}>
                <div className="space-y-3"><div className="flex items-center justify-between"><i className="h-5 w-5 rounded-full bg-[#007BFF]" /><i className="h-2 w-10 rounded-full bg-[#CFE2FF]" /></div><i className="block h-28 rounded-[10px] bg-gradient-to-br from-[#0052CC] to-[#00B4FF]" /><i className="block h-3 w-3/4 rounded-full bg-[#0B1F3B]/70" /><i className="block h-9 rounded-full bg-[#007BFF]" /></div>
              </Frame>
              <div className="relative col-span-12 md:col-span-6">
                <Frame hi={hi} title="Desktop · 1440" className="h-[22rem]" wire={<div className="space-y-3"><W c="h-6 w-full" /><div className="grid grid-cols-2 gap-3"><div className="space-y-2"><W c="h-5 w-4/5" /><W c="h-3" /><W c="h-3 w-2/3" /><W c="h-8 w-24" /></div><W c="h-32" /></div><div className="grid grid-cols-3 gap-3"><W c="h-16" /><W c="h-16" /><W c="h-16" /></div></div>}>
                  <div className="space-y-3"><div className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="h-5 w-5 rounded-full bg-[#00B4FF]" /><i className="h-2 w-14 rounded-full bg-[#0B1F3B]/60" /></span><i className="h-6 w-20 rounded-full bg-[#007BFF]" /></div><div className="grid grid-cols-2 items-center gap-3"><div className="space-y-2"><p className={`${pop.className} text-2xl font-semibold leading-tight text-[#0B1F3B]`}>Simple. Clear. Yours.</p><i className="block h-2.5 w-4/5 rounded-full bg-[#CFE2FF]" /><i className="mt-2 block h-9 w-28 rounded-full bg-[#0B1F3B]" /></div><i className="block h-32 rounded-[12px] bg-gradient-to-br from-[#0052CC] via-[#007BFF] to-[#00B4FF]" /></div><div className="grid grid-cols-3 gap-3">{[0, 1, 2].map((k) => <i key={k} className="block h-16 rounded-[10px] bg-[#E6F0FF]" />)}</div></div>
                </Frame>
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[14px] border-2 border-[#007BFF]">{["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => <i key={p} className={`absolute h-2.5 w-2.5 rounded-[2px] border-2 border-[#007BFF] bg-white ${p}`} />)}<span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-[#007BFF] px-2 py-0.5 font-mono text-[10px] text-white">Hero · 1440 × 900</span></div>
              </div>
              <Frame hi={hi} title="Card" className="col-span-3 hidden h-[16rem] md:block" wire={<div className="space-y-3"><W c="h-20" /><W c="h-3 w-4/5" /><W c="h-3 w-3/5" /></div>}>
                <div className="space-y-3"><i className="block h-20 rounded-[10px] bg-[#E6F0FF]" /><i className="block h-3 w-4/5 rounded-full bg-[#0B1F3B]/60" /><i className="block h-3 w-3/5 rounded-full bg-[#CFE2FF]" /></div>
              </Frame>
              <Cursor name="Designer" color="#007BFF" cls="c1" style={{ left: "6%", top: "14%" }} />
              <Cursor name="Researcher" color="#6366F1" cls="c2" style={{ right: "10%", top: "30%" }} />
              <Cursor name="Developer" color="#10B981" cls="c3" style={{ left: "52%", bottom: "6%" }} />
            </div>
            <div className="fl absolute -left-3 bottom-4 z-30 hidden items-center gap-1 rounded-full border border-[#CFE2FF] bg-white p-1.5 shadow-lg md:flex" aria-hidden="true">{[MousePointer2, Square, Type, PenTool].map((I, k) => <span key={k} className={`flex h-9 w-9 items-center justify-center rounded-full ${k === 0 ? "bg-[#007BFF] text-white" : "text-[#475569]"}`}><I size={16} /></span>)}</div>
          </div>
        </div>
      </section>

      {/* 2. PLAYGROUND */}
      <section id="playground" className="py-24 md:py-32" aria-labelledby="pg">
        <div className={wrap}>
          <div data-r className="rv"><Label n="01">Design system playground</Label><h2 id="pg" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight text-[#0B1F3B]`}>One system, <b className="font-bold">every screen</b> stays consistent</h2><p className="mt-4 max-w-xl text-[#475569]">Change a token and watch every component update. This is how our design systems keep large products consistent.</p></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div className="space-y-7 rounded-[18px] border border-[#CFE2FF] bg-[#F5F9FF] p-7 lg:col-span-4">
              <fieldset><legend className="text-sm font-medium text-[#0B1F3B]">Brand colour</legend><div className="mt-3 flex flex-wrap gap-3">{swatches.map((c, k) => <button key={c} onClick={() => setAc(k)} aria-label={`Use colour ${c}`} aria-pressed={ac === k} className={`h-11 w-11 rounded-full border-4 transition-transform hover:scale-110 ${ac === k ? "border-[#0B1F3B]" : "border-white"} ${ring}`} style={{ background: c }} />)}</div></fieldset>
              <label className="block text-sm font-medium text-[#0B1F3B]">Corner radius: {rad}px<input type="range" min={0} max={28} value={rad} onChange={(e) => setRad(Number(e.target.value))} className="mt-3 w-full accent-[#007BFF]" /></label>
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#0B1F3B]">Bold headings</span><button role="switch" aria-checked={bold} onClick={() => setBold(!bold)} className={`relative h-8 w-14 rounded-full transition-colors ${bold ? "bg-[#007BFF]" : "bg-[#CBD5E1]"} ${ring}`}><i className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${bold ? "left-7" : "left-1"}`} /></button></div>
              <pre className="overflow-x-auto rounded-[10px] bg-[#0B1F3B] p-4 font-mono text-xs leading-relaxed text-[#93C5FD]">{`--color-brand: ${color};\n--radius: ${rad}px;\n--heading-weight: ${bold ? 700 : 300};`}</pre>
            </div>
            <div className="relative overflow-hidden rounded-[18px] border border-[#CFE2FF] bg-white p-8 shadow-[0_30px_80px_rgba(0,82,204,.12)] md:p-12 lg:col-span-8" style={{ ["--ac" as string]: color, ["--r" as string]: `${rad}px` } as CSSProperties}>
              <span aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[90px] transition-colors duration-500" style={{ background: color, opacity: 0.18 }} />
              <div className="relative mx-auto max-w-md space-y-5">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><i className="h-8 w-8 transition-all duration-300" style={{ background: color, borderRadius: rad }} /><b className={`${pop.className} text-[#0B1F3B]`}>YourApp</b></span><span className="rounded-full px-3 py-1 text-xs font-medium text-white transition-colors duration-300" style={{ background: color }}>New</span></div>
                <h3 className={`${pop.className} text-3xl tracking-[-0.02em] text-[#0B1F3B] transition-all duration-300`} style={{ fontWeight: bold ? 700 : 300 }}>Welcome back</h3>
                <p className="text-sm text-[#475569]">Sign in to continue to your dashboard.</p>
                <input aria-label="Email" placeholder="you@company.com" className="w-full border border-[#CFE2FF] bg-[#F5F9FF] px-4 py-3 outline-none transition-all duration-300 focus:ring-2" style={{ borderRadius: rad, ["--tw-ring-color" as string]: color }} />
                <button className="w-full px-5 py-3 font-medium text-white transition-all duration-300 hover:brightness-110" style={{ background: color, borderRadius: rad }}>Sign in</button>
                <div className="grid grid-cols-2 gap-3">{["Overview", "Reports"].map((x) => <div key={x} className="border border-[#CFE2FF] p-4 transition-all duration-300" style={{ borderRadius: rad }}><i className="mb-2 block h-2 w-8 rounded-full" style={{ background: color }} /><p className="text-sm font-medium text-[#0B1F3B]">{x}</p></div>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UX AUDIT TOGGLE */}
      <section className="bg-[#0B1F3B] py-24 text-white md:py-32" aria-labelledby="ux">
        <div className={wrap}>
          <div data-r className="rv flex flex-wrap items-end justify-between gap-6"><div><Label n="02" dark>UX audit</Label><h2 id="ux" className={`${pop.className} t2 mt-5 max-w-2xl font-extralight`}>Spot what hurts, <b className="font-bold">fix what matters</b></h2></div>
            <div className="flex rounded-full border border-white/20 p-1" role="group" aria-label="Show problems or fixes">{[[false, "Problems"], [true, "Fixes"]].map(([v, l]) => <button key={String(l)} onClick={() => setFix(v as boolean)} aria-pressed={fix === v} className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${fix === v ? (v ? "bg-[#10B981] text-black" : "bg-[#EF4444] text-white") : "text-[#CFE2FF]"} ${ring} focus-visible:ring-offset-[#0B1F3B]`}>{l as string}</button>)}</div>
          </div>
          <div data-r className="rv relative mx-auto mt-12 h-[26rem] max-w-5xl overflow-hidden rounded-[14px] border border-white/15 bg-white text-[#0B1F3B]">
            <div className="flex gap-1.5 border-b border-[#E2E8F0] px-4 py-3"><i className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" /><i className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" /><i className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]" /></div>
            <div className={`absolute inset-x-0 bottom-0 top-10 p-6 transition-opacity duration-700 ${fix ? "opacity-0" : "opacity-100"}`} aria-hidden="true"><div className="flex flex-wrap gap-2">{[...Array(9)].map((_, k) => <i key={k} className="h-3 w-12 rounded bg-[#CBD5E1]" />)}</div><div className="mt-5 grid grid-cols-2 gap-5"><div className="space-y-2">{[...Array(6)].map((_, k) => <i key={k} className="block h-2 rounded bg-[#CBD5E1]" style={{ width: `${90 - k * 6}%` }} />)}<i className="mt-3 block h-7 w-24 rounded bg-[#E2E8F0]" /></div><div className="space-y-3"><i className="block h-9 rounded bg-[#E2E8F0]" /><i className="block h-9 rounded bg-[#E2E8F0]" /><i className="block h-9 rounded bg-[#E2E8F0]" /><i className="block h-9 rounded bg-[#E2E8F0]" /><i className="block h-9 rounded bg-[#E2E8F0]" /></div></div></div>
            <div className={`absolute inset-x-0 bottom-0 top-10 p-6 transition-opacity duration-700 ${fix ? "opacity-100" : "opacity-0"}`} aria-hidden="true"><div className="flex items-center justify-between"><i className="h-5 w-5 rounded-full bg-[#007BFF]" /><span className="flex gap-4">{[0, 1, 2, 3, 4].map((k) => <i key={k} className="h-2.5 w-12 rounded-full bg-[#CFE2FF]" />)}</span></div><div className="mt-8 grid grid-cols-2 items-center gap-6"><div><p className={`${pop.className} text-3xl font-semibold`}>One clear message.</p><i className="mt-3 block h-2.5 w-4/5 rounded-full bg-[#CFE2FF]" /><i className="mt-5 block h-10 w-36 rounded-full bg-[#007BFF]" /></div><div className="space-y-3"><i className="block h-10 rounded-[10px] bg-[#E6F0FF]" /><i className="block h-10 rounded-[10px] bg-[#E6F0FF]" /><i className="block h-10 rounded-[10px] bg-[#E6F0FF]" /></div></div></div>
            {issues.map((p, k) => (
              <div key={p.bad} className="absolute z-10" style={{ left: p.x, top: p.y }}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg transition-colors duration-500 ${fix ? "bg-[#10B981]" : "animate-pulse bg-[#EF4444]"}`}>{fix ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : k + 1}</span>
                <span className={`absolute left-9 top-0 w-44 rounded-[8px] px-3 py-2 text-xs font-medium shadow-lg transition-colors duration-500 ${fix ? "bg-[#10B981] text-black" : "bg-[#EF4444] text-white"}`}>{fix ? p.good : p.bad}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOUBLE DIAMOND */}
      <section className="py-24 md:py-32" aria-labelledby="dd">
        <div className={wrap}>
          <div data-r className="rv text-center"><Label n="03">Our design process</Label><h2 id="dd" className={`${pop.className} t2 mx-auto mt-5 max-w-3xl font-extralight text-[#0B1F3B]`}>Diverge to explore. <b className="font-bold">Converge to decide.</b></h2></div>
          <div data-r className="mt-14">
            <svg viewBox="0 0 1000 220" className="h-auto w-full" fill="none" aria-hidden="true">
              <path d="M10 110 L255 20 L500 110 L255 200 Z" pathLength={1} className="dr" stroke="url(#dg)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M500 110 L745 20 L990 110 L745 200 Z" pathLength={1} className="dr" stroke="url(#dg)" strokeWidth="2.5" strokeLinejoin="round" style={{ "--dl": "0.8s" } as CSSProperties} />
              <defs><linearGradient id="dg" x1="0" x2="1"><stop offset="0" stopColor="#00B4FF" /><stop offset="1" stopColor="#0052CC" /></linearGradient></defs>
              {[10, 255, 500, 745, 990].map((x) => <circle key={x} cx={x} cy="110" r="6" fill="#007BFF" />)}
            </svg>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {phases.map(([n, w, list], k) => (
              <li key={n} data-r className="rv" style={{ transitionDelay: `${k * 100}ms` }}>
                <button onMouseEnter={() => setPh(k)} onFocus={() => setPh(k)} className={`h-full w-full rounded-[14px] border p-6 text-left transition-all duration-300 ${ph === k ? "border-[#007BFF] bg-[#EAF2FF] shadow-[0_20px_50px_rgba(0,123,255,.18)]" : "border-[#CFE2FF] bg-white"} ${ring}`}>
                  <span className="font-mono text-xs text-[#0052CC]">0{k + 1} · {w}</span>
                  <h3 className={`${pop.className} mt-3 text-2xl font-semibold text-[#0B1F3B]`}>{n}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-[#475569]">{list.map((x) => <li key={x} className="flex items-start gap-2"><Check size={14} className="mt-1 shrink-0 text-[#10B981]" aria-hidden="true" />{x}</li>)}</ul>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. DELIVERABLES */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="dl">
        <div className={wrap}>
          <div data-r className="rv"><Label n="04">What you get</Label><h2 id="dl" className={`${pop.className} t2 mt-5 max-w-3xl font-extralight text-[#0B1F3B]`}>Everything from first sketch to <b className="font-bold">dev-ready files</b></h2></div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map(([Icon, h, d], k) => (
              <li key={h} data-r className="rv group relative overflow-hidden rounded-[18px] border border-[#CFE2FF] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#007BFF] hover:shadow-[0_24px_60px_rgba(0,123,255,.15)]" style={{ transitionDelay: `${(k % 3) * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#E6F0FF] text-[#0052CC] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-[#007BFF] group-hover:text-white"><Icon size={22} aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-6 text-xl font-semibold text-[#0B1F3B]`}>{h}</h3><p className="mt-2 text-sm leading-relaxed text-[#475569]">{d}</p>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF] transition-transform duration-500 group-hover:scale-x-100" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* tools */}
      <section className="overflow-hidden bg-white py-16" aria-label="Design tools we use">
        <p className="mb-8 text-center text-sm text-[#64748B]">Tools we design and build with</p>
        <div className="mqw" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}><div className="mq2 flex w-max">{[...tools, ...tools].map(([Ic, n], i) => <span key={i} className="mr-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-[#CFE2FF] bg-[#F5F9FF] px-6 py-3.5 text-[#0B1F3B]"><Ic aria-hidden="true" className="h-6 w-6 text-[#0052CC]" />{n}</span>)}</div></div>
      </section>

      <ClientLogos />
      <Testimonials />
      <Blog />

      {/* FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="fq">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div data-r className="rv lg:col-span-4"><Label n="05">FAQ</Label><h2 id="fq" className={`${pop.className} t2 mt-5 font-extralight text-[#0B1F3B]`}>Design <b className="font-bold">questions</b></h2></div>
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
        <div className={wrap}><h2 id="cta" data-r className={`${pop.className} rv t0 mx-auto max-w-4xl font-extralight`}>Let&apos;s design something <b className="font-bold">people love</b></h2><a href="#contact" className={`rv mt-9 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition-colors hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#0A3F9E]`}>Book a design call <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white"><ArrowRight size={18} aria-hidden="true" /></span></a></div>
      </section>

      <div id="contact" className="[&>*:last-child]:mb-0"><ContactForm /></div>
    </main>
  );
}