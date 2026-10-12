"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { Poppins, Roboto } from "next/font/google";
import { SiFigma, SiFramer,  SiMiro, SiNotion } from "react-icons/si";
import { ArrowRight, ArrowUpRight, Compass, Eye, Layers, Palette, Sparkles, UserCheck, Zap } from "lucide-react";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

const pop = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });

const css = `
:root { --bg-dark: #010204; --accent: #00A6FF; --accent-glow: rgba(0, 166, 255, 0.35); }
body { background-color: var(--bg-dark); }
.grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.06; mix-blend-mode: overlay; pointer-events: none; z-index: 50; }
.vignette { position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 20%, #010204 100%); pointer-events: none; z-index: 40; }
.ln { overflow: hidden; padding-bottom: 0.2em; margin-bottom: -0.2em; }
.ln > span { display: block; transform: translateY(115%) rotate(3deg); opacity: 0; transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease; transform-origin: top left; }
.in .ln > span { transform: none; opacity: 1; }
.rv { opacity: 0; transform: translateY(40px) scale(0.98); transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s); filter: blur(5px); }
.rv.in { opacity: 1; transform: none; filter: blur(0); }
.t-hero { font-size: clamp(3rem, 9vw, 9.5rem); line-height: 0.92; letter-spacing: -0.05em; font-weight: 200; }
.t-sec { font-size: clamp(2.5rem, 5vw, 5.5rem); line-height: 1; letter-spacing: -0.04em; }
.glow-text { background: linear-gradient(to bottom right, #ffffff, #6482a6); -webkit-background-clip: text; color: transparent; }
.spotlight-card { position: relative; overflow: hidden; }
.spotlight-card::before { content: ""; position: absolute; top: var(--y, 50%); left: var(--x, 50%); transform: translate(-50%, -50%); width: 450px; height: 450px; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%); opacity: 0; transition: opacity 0.5s ease; z-index: 0; pointer-events: none; }
.spotlight-card:hover::before { opacity: 1; }
.cinematic-list-item { transition: opacity 0.5s ease, filter 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.cinematic-list:hover .cinematic-list-item:not(:hover) { opacity: 0.2; filter: blur(4px); transform: scale(0.98); }
.mq { animation: mq 35s linear infinite; }
@keyframes mq { to { transform: translate3d(-50%, 0, 0); } }
@keyframes pulse-glow { 0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); } 50% { opacity: 0.6; transform: scale(1.05) translate(2%, 2%); } }
.orb { animation: pulse-glow 10s ease-in-out infinite alternate; }
`;

const services = [
  [Compass, "User Research & Strategy", "Uncovering behavioral patterns, user pain points, and product positioning through rigorous UX research.", "photo-1531403009284-440f080d1e12"],
  [Layers, "Wireframing & Information Architecture", "Structuring complex workflows into frictionless, logical user journeys before a single pixel of styling begins.", "photo-1581291518633-83b4ebd1d83e"],
  [Palette, "High-Fidelity UI & Design Systems", "Crafting world-class visual aesthetics backed by scalable, component-driven design libraries in Figma.", "photo-1507238691740-187a5b1d37b8"],
  [Sparkles, "Interactive Prototyping & Motion", "Bringing interfaces to life with fluid micro-interactions and high-fidelity clickable prototypes that validate concepts.", "photo-1550745165-9bc0b252726f"],
] as const;

const tools = [
  [SiFigma, "Figma"],
  [SiFramer, "Framer"],
  // [SiAdobeillustrator, "Illustrator"],
  // [SiAdobexd, "Adobe XD"],
  [SiMiro, "Miro"],
  [SiNotion, "Notion"],
];

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function UIUXDesignClient() {
  const root = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver((es) => es.forEach((e) => { 
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } 
    }), { threshold: 0.15 });
    
    el.querySelectorAll("[data-r], .rv").forEach((n) => io.observe(n));

    // Spotlight mouse tracking
    const cards = [...el.querySelectorAll<HTMLElement>(".spotlight-card")];
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    cards.forEach(card => card.addEventListener("mousemove", (e) => handleMouseMove(e, card)));

    // Scroll text reveal parallax
    const words = [...el.querySelectorAll<HTMLElement>("[data-cinematic-word]")];
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      words.forEach((w) => {
        const b = w.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh * 0.75 - b.top) / (b.height + vh * 0.2)));
        w.style.opacity = String(0.1 + progress * 0.9);
        w.style.transform = `translateY(${(1 - progress) * 25}px)`;
        w.style.filter = `blur(${(1 - progress) * 12}px)`;
      });
    };
    
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => { 
      io.disconnect(); 
      window.removeEventListener("scroll", onScroll); 
      cancelAnimationFrame(raf);
      cards.forEach(card => card.removeEventListener("mousemove", (e) => handleMouseMove(e, card)));
    };
  }, []);

  const changeBg = (src: string) => {
    if (bgImgRef.current) {
      bgImgRef.current.style.opacity = "0.35";
      bgImgRef.current.src = src;
    }
  };
  const resetBg = () => { if (bgImgRef.current) bgImgRef.current.style.opacity = "0"; };

  return (
    <main ref={root} className={`${rob.className} overflow-hidden bg-[#010204] text-white selection:bg-[#00A6FF] selection:text-white`}>
      <style>{css}</style>
      <div className="grain" />

      {/* 1. CINEMATIC HERO */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="vignette" />
        <div className="orb absolute top-[-10%] left-[-5%] h-[700px] w-[900px] rounded-[100%] bg-[#0055FF] opacity-30 blur-[180px] mix-blend-screen" />
        <div className="orb absolute bottom-0 right-0 h-[600px] w-[600px] translate-y-1/4 translate-x-1/4 rounded-[100%] bg-[#00A6FF] opacity-20 blur-[150px] mix-blend-screen" style={{ animationDelay: "-3s" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <p className="rv mb-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-[#00A6FF]" style={{ "--delay": "0.1s" } as CSSProperties}>
            <span className="h-px w-8 bg-[#00A6FF]" /> Product Design & Strategy
          </p>
          
          <h1 data-r className={`${pop.className} t-hero mx-auto max-w-6xl`}>
            <span className="ln"><span className="glow-text">Designing</span></span>
            <span className="ln"><span className="glow-text">Human Intuition.</span></span>
          </h1>
          
          <p className="rv mx-auto mt-10 max-w-2xl text-lg font-light leading-relaxed text-[#8B9DB4]" style={{ "--delay": "0.6s" } as CSSProperties}>
            We translate complex business logic into effortless, high-converting digital interfaces. From deep user research to meticulous design systems, we build products people love to use.
          </p>

          <div className="rv mt-14 flex items-center justify-center gap-6" style={{ "--delay": "0.8s" } as CSSProperties}>
            <Link href="#contact" className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">Start Design Sprint <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#00A6FF] to-[#0055FF] opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity group-hover:opacity-100">Start Design Sprint <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>

        {/* Abstract UI Wireframe Visual */}
        <div className="rv absolute bottom-0 left-1/2 w-full max-w-5xl -translate-x-1/2 translate-y-[40%]" style={{ "--delay": "1s" } as CSSProperties}>
          <div className="relative aspect-[21/9] overflow-hidden rounded-t-[40px] border-x border-t border-white/5 bg-[#03060C]/80 shadow-[0_-40px_100px_rgba(0,166,255,0.1)] backdrop-blur-2xl">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-70" />
             {/* Abstract Floating UI Cards */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between">
                   <div className="flex gap-2"><i className="h-3 w-3 rounded-full bg-red-500/85" /><i className="h-3 w-3 rounded-full bg-yellow-500/85" /><i className="h-3 w-3 rounded-full bg-green-500/85" /></div>
                   <div className="h-2 w-24 rounded bg-white/20" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <div className="h-20 rounded-lg bg-[#00A6FF]/10 border border-[#00A6FF]/30 p-3 flex flex-col justify-between"><div className="h-2 w-10 rounded bg-[#00A6FF]" /><div className="h-4 w-16 rounded bg-white/40" /></div>
                   <div className="h-20 rounded-lg bg-white/5 border border-white/10 p-3 flex flex-col justify-between"><div className="h-2 w-10 rounded bg-white/20" /><div className="h-4 w-16 rounded bg-white/40" /></div>
                   <div className="h-20 rounded-lg bg-white/5 border border-white/10 p-3 flex flex-col justify-between"><div className="h-2 w-10 rounded bg-white/20" /><div className="h-4 w-16 rounded bg-white/40" /></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE REALITY (Sticky/Scroll Text) */}
      <section className="relative z-20 bg-[#010204] py-32 md:py-48">
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <p className="mb-12 text-sm font-semibold tracking-[0.2em] text-[#4A6382] uppercase">The Philosophy</p>
          <p className={`${pop.className} t-sec flex flex-wrap gap-x-4 gap-y-2 font-light text-white`}>
            {"Great design is invisible.".split(" ").map((w, i) => <span key={`w1-${i}`} data-cinematic-word className="inline-block">{w}</span>)}
            {"It doesn't demand attention; it anticipates intent.".split(" ").map((w, i) => <span key={`w2-${i}`} data-cinematic-word className="inline-block text-[#4A6382]">{w}</span>)}
            {"We craft experiences so intuitive they feel second nature.".split(" ").map((w, i) => <span key={`w3-${i}`} data-cinematic-word className="inline-block text-[#00A6FF]">{w}</span>)}
          </p>
        </div>
      </section>

      {/* 3. CINEMATIC SERVICES (Hover Reveal) */}
      <section className="relative min-h-screen border-y border-white/5 bg-[#010204] py-32">
        <img ref={bgImgRef} src="" alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-in-out mix-blend-luminosity grayscale-[30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-[#010204]/85 to-[#010204] z-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
          <div data-r className="mb-20">
            <h2 className="ln"><span className={`${pop.className} t-sec text-white`}>Capabilities</span></h2>
          </div>
          
          <div className="cinematic-list flex flex-col border-t border-white/10">
            {services.map(([Icon, title, desc, imgId], i) => (
              <div 
                key={i} 
                className="cinematic-list-item group relative flex cursor-pointer flex-col justify-between border-b border-white/10 py-12 transition-colors hover:border-white/30 md:flex-row md:items-center"
                onMouseEnter={() => changeBg(img(imgId as string))}
                onMouseLeave={resetBg}
              >
                <div className="flex items-center gap-8 md:w-1/2">
                  <span className="font-mono text-sm text-[#4A6382] transition-colors group-hover:text-[#00A6FF]">0{i + 1}</span>
                  <h3 className={`${pop.className} text-4xl font-light text-white transition-transform duration-500 group-hover:translate-x-4 md:text-5xl`}>{title}</h3>
                </div>
                <div className="mt-6 flex md:mt-0 md:w-1/2 md:justify-end">
                  <p className="max-w-sm text-lg font-light text-[#8B9DB4] transition-colors group-hover:text-white">{desc}</p>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:-translate-x-8 group-hover:opacity-100 hidden md:block">
                  <ArrowUpRight size={40} className="text-[#00A6FF]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE BLUEPRINT (Process Timeline) */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[800px] w-[400px] rounded-[100%] bg-[#00A6FF] opacity-5 blur-[150px]" />
        
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
             <p className="rv text-sm font-semibold tracking-[0.2em] text-[#00A6FF] uppercase mb-4" style={{ "--delay": "0s" } as CSSProperties}>Methodology</p>
             <h2 data-r className={`${pop.className} t-sec text-white`}><span className="ln"><span>The Design</span></span> <span className="ln"><span>Sprint.</span></span></h2>
             <p className="rv mt-8 text-lg font-light text-[#8B9DB4] max-w-md" style={{ "--delay": "0.3s" } as CSSProperties}>Our structured design lifecycle moves from ambiguous user problems to crystal-clear, developer-ready design systems.</p>
          </div>

          <div className="lg:col-span-7 space-y-24 mt-16 lg:mt-0">
            {[
              ["Discovery & Empathy", "Conducting user interviews, stakeholder workshops, and heuristic evaluations to map true user intent."],
              ["Architecture & Wireframing", "Translating insights into low-fi and mid-fi wireframes, validating user flows before visual styling."],
              ["Visual Polish & Handover", "Applying high-end typography, color psychology, and tokenized design systems with clean developer handoff in Figma."]
            ].map(([title, desc], i) => (
              <div key={i} className="rv group relative pl-12 md:pl-20" style={{ "--delay": `${i * 0.2}s` } as CSSProperties}>
                 <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-hover:bg-[#00A6FF] transition-colors duration-700 shadow-[0_0_15px_rgba(0,166,255,0)] group-hover:shadow-[0_0_15px_rgba(0,166,255,0.6)]" />
                 <div className="absolute left-[-4px] top-2 h-[10px] w-[10px] rounded-full bg-white/20 group-hover:bg-[#00A6FF] transition-colors duration-700 group-hover:shadow-[0_0_20px_#00A6FF]" />
                 
                 <h3 className={`${pop.className} text-3xl font-light text-white mb-4`}>{title}</h3>
                 <p className="text-xl text-[#8B9DB4] font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOOLS STACK TICKER */}
      <section className="relative border-y border-white/5 bg-[#03060C] py-16 overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#03060C] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#03060C] to-transparent pointer-events-none" />
        
        <div className="mq flex w-max items-center">
          {[...tools, ...tools, ...tools].map(([Ic, n], i) => (
            <span key={i} className="mr-16 flex items-center gap-4 opacity-50 transition-opacity hover:opacity-100">
              <Ic className="h-7 w-7 text-[#00A6FF]" />
              <span className={`${pop.className} text-2xl font-light text-white tracking-wider`}>{n}</span>
            </span>
          ))}
        </div>
      </section>

      {/* 6. PRINCIPLES / METRICS */}
      <section className="py-20 md:py-32 relative border-b border-white/5 bg-[#010204]">
        <div className="mx-auto w-full max-w-[1400px] px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
             [UserCheck, "User-Centric", "Decisions anchored firmly in real user testing and feedback."],
             [Eye, "Pixel-Perfect", "Meticulous attention to spacing, contrast, and visual rhythm."],
             [Layers, "Scalable Systems", "Tokenized component libraries designed for seamless developer handoff."],
             [Zap, "Conversion-Ready", "UI layouts optimized to guide users smoothly toward conversion."]
          ].map(([Icon, title, desc], i) => (
            <div key={i} className="rv spotlight-card rounded-2xl border border-white/5 bg-white/[0.01] p-10 backdrop-blur-md" style={{ "--delay": `${i * 0.1}s` } as CSSProperties}>
               <div className="relative z-10">
                 <Icon size={32} className="text-[#00A6FF] mb-8" strokeWidth={1.5} />
                 <h3 className={`${pop.className} text-2xl font-light text-white mb-4`}>{title}</h3>
                 <p className="text-[#8B9DB4] font-light">{desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <ClientLogos />
      <Testimonials />

      {/* 7. CINEMATIC CTA */}
      <section className="relative py-48 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#002a7a_0%,#010204_60%)] opacity-30" />
        <div className="vignette" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#00A6FF] uppercase mb-8">Design Excellence</p>
          <h2 data-r className={`${pop.className} t-hero text-white mb-12`}>
             <span className="ln"><span>Elevate Your</span></span>
             <span className="ln"><span><b className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8B9DB4]">Digital Product.</b></span></span>
          </h2>
          
          <Link href="#contact" className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-white/5 px-10 py-5 text-lg font-light text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#00A6FF]/50 hover:shadow-[0_0_30px_rgba(0,166,255,0.3)]">
            <span className="relative z-10">Book Design Consultation</span>
            <ArrowRight size={20} className="relative z-10 text-[#00A6FF] transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <div id="contact" className="relative z-20 bg-[#010204]">
        <ContactForm />
      </div>
    </main>
  );
}