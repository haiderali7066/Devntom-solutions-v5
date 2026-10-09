"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { Poppins, Roboto } from "next/font/google";
import { ArrowRight, ArrowUpRight, Target, TrendingUp, BarChart, Crosshair, Zap, Eye, MousePointerClick, Globe } from "lucide-react";
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
@keyframes pulse-glow { 0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); } 50% { opacity: 0.6; transform: scale(1.05) translate(2%, 2%); } }
.orb { animation: pulse-glow 10s ease-in-out infinite alternate; }
`;

const services = [
  [Globe, "Search Architecture", "Reverse-engineering algorithms to secure absolute visibility and dominate organic search verticals.", "photo-1460925895917-afdab827c52f"],
  [Target, "Precision PPC", "Hyper-targeted, algorithmic media buying that turns advertising spend into a predictable revenue engine.", "photo-1551288049-bebda4e38f71"],
  [Eye, "Brand Gravity", "Magnetic social strategies and content architectures that capture attention and command industry authority.", "photo-1611162617474-5b21e879e113"],
  [MousePointerClick, "Conversion Engineering", "Relentless A/B testing and psychological UX refinement to extract maximum value from every single click.", "photo-1533750516457-a7f992034fec"],
] as const;

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function DigitalMarketingClient() {
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

    // Scroll-jacking Parallax & Text Fade
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
        {/* Core Lighting Setup */}
        <div className="orb absolute top-[-10%] right-[-5%] h-[700px] w-[900px] rounded-[100%] bg-[#0055FF] opacity-30 blur-[180px] mix-blend-screen" />
        <div className="orb absolute bottom-0 left-0 h-[600px] w-[600px] translate-y-1/4 -translate-x-1/4 rounded-[100%] bg-[#00A6FF] opacity-20 blur-[150px] mix-blend-screen" style={{ animationDelay: "-3s" }} />

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <p className="rv mb-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-[#00A6FF]" style={{ "--delay": "0.1s" } as CSSProperties}>
            <span className="h-px w-8 bg-[#00A6FF]" /> Growth Engineering
          </p>
          
          <h1 data-r className={`${pop.className} t-hero mx-auto max-w-6xl`}>
            <span className="ln"><span className="glow-text">Algorithmic</span></span>
            <span className="ln"><span className="glow-text">Dominance.</span></span>
          </h1>
          
          <p className="rv mx-auto mt-10 max-w-2xl text-lg font-light leading-relaxed text-[#8B9DB4]" style={{ "--delay": "0.6s" } as CSSProperties}>
            We don't just run ads. We engineer mathematical growth engines. By fusing deep data analytics with aggressive performance marketing, we scale your revenue with absolute precision.
          </p>

          <div className="rv mt-14 flex items-center justify-center gap-6" style={{ "--delay": "0.8s" } as CSSProperties}>
            <Link href="#contact" className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">Deploy Campaign <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#00A6FF] to-[#0055FF] opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 transition-opacity group-hover:opacity-100">Deploy Campaign <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>

        {/* Abstract Performance Graph Visual */}
        <div className="rv absolute bottom-0 left-1/2 w-full max-w-5xl -translate-x-1/2 translate-y-[40%]" style={{ "--delay": "1s" } as CSSProperties}>
          <div className="relative aspect-[21/9] overflow-hidden rounded-t-[40px] border-x border-t border-white/5 bg-[#03060C]/80 shadow-[0_-40px_100px_rgba(0,166,255,0.1)] backdrop-blur-2xl">
             {/* Chart Grids */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-70" />
             {/* Cinematic Trend Line */}
             <svg className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 300">
               <path d="M0,250 C150,230 250,150 400,180 C550,210 650,80 800,100 C900,110 950,20 1000,0 L1000,300 L0,300 Z" fill="url(#grad)" />
               <path d="M0,250 C150,230 250,150 400,180 C550,210 650,80 800,100 C900,110 950,20 1000,0" fill="none" stroke="#00A6FF" strokeWidth="4" className="drop-shadow-[0_0_15px_#00A6FF]" />
               <defs>
                 <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
                 </linearGradient>
               </defs>
             </svg>
          </div>
        </div>
      </section>

      {/* 2. THE REALITY (Sticky/Scroll Text) */}
      <section className="relative z-20 bg-[#010204] py-32 md:py-48">
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <p className="mb-12 text-sm font-semibold tracking-[0.2em] text-[#4A6382] uppercase">The Reality</p>
          <p className={`${pop.className} t-sec flex flex-wrap gap-x-4 gap-y-2 font-light text-white`}>
            {"Algorithms change daily.".split(" ").map((w, i) => <span key={`w1-${i}`} data-cinematic-word className="inline-block">{w}</span>)}
            {"Tactics expire. Hacks get penalized.".split(" ").map((w, i) => <span key={`w2-${i}`} data-cinematic-word className="inline-block text-[#4A6382]">{w}</span>)}
            {"True brand gravity is built on unshakeable data and psychology.".split(" ").map((w, i) => <span key={`w3-${i}`} data-cinematic-word className="inline-block text-[#00A6FF]">{w}</span>)}
          </p>
        </div>
      </section>

      {/* 3. CINEMATIC SERVICES (Hover Reveal) */}
      <section className="relative min-h-screen border-y border-white/5 bg-[#010204] py-32">
        {/* Dynamic Background Image */}
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
        <div className="absolute left-0 top-1/4 h-[800px] w-[400px] rounded-[100%] bg-[#00A6FF] opacity-5 blur-[150px]" />
        
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
             <p className="rv text-sm font-semibold tracking-[0.2em] text-[#00A6FF] uppercase mb-4" style={{ "--delay": "0s" } as CSSProperties}>Methodology</p>
             <h2 data-r className={`${pop.className} t-sec text-white`}><span className="ln"><span>The Growth</span></span> <span className="ln"><span>Protocol.</span></span></h2>
             <p className="rv mt-8 text-lg font-light text-[#8B9DB4] max-w-md" style={{ "--delay": "0.3s" } as CSSProperties}>Marketing is not art; it is math. We operate on a strict infrastructure of data capture, hypothesis testing, and exponential scaling.</p>
          </div>

          <div className="lg:col-span-7 space-y-24 mt-16 lg:mt-0">
            {[
              ["Market Blueprinting", "Deep-dive competitor analysis, keyword taxonomy, and mapping the total addressable market to identify unseen revenue gaps."],
              ["Omnichannel Deployment", "Synchronizing ad copy, creative assets, and landing pages across Google, Meta, LinkedIn, and TikTok for a unified brand assault."],
              ["Algorithmic Scaling", "Utilizing server-side tracking, ROAS optimization, and relentless A/B testing to kill losers and infinitely scale winners."]
            ].map(([title, desc], i) => (
              <div key={i} className="rv group relative pl-12 md:pl-20" style={{ "--delay": `${i * 0.2}s` } as CSSProperties}>
                 {/* Glowing Line */}
                 <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-hover:bg-[#00A6FF] transition-colors duration-700 shadow-[0_0_15px_rgba(0,166,255,0)] group-hover:shadow-[0_0_15px_rgba(0,166,255,0.6)]" />
                 {/* Node */}
                 <div className="absolute left-[-4px] top-2 h-[10px] w-[10px] rounded-full bg-white/20 group-hover:bg-[#00A6FF] transition-colors duration-700 group-hover:shadow-[0_0_20px_#00A6FF]" />
                 
                 <h3 className={`${pop.className} text-3xl font-light text-white mb-4`}>{title}</h3>
                 <p className="text-xl text-[#8B9DB4] font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. METRICS / PRINCIPLES */}
      <section className="py-20 md:py-32 relative border-y border-white/5 bg-[#010204]">
        <div className="mx-auto w-full max-w-[1400px] px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
             [BarChart, "Data-Driven", "Decisions backed by server-side analytics, not gut feelings."],
             [Crosshair, "Hyper-Targeted", "Zeroing in on high-intent cohorts with sniper precision."],
             [TrendingUp, "ROAS Obsessed", "Your return on ad spend is the only metric that matters."],
             [Zap, "Agile Execution", "Rapid iteration cycles to outmaneuver the competition."]
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

      {/* 6. CINEMATIC CTA */}
      <section className="relative py-48 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#002a7a_0%,#010204_60%)] opacity-30" />
        <div className="vignette" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-[#00A6FF] uppercase mb-8">Scale Operations</p>
          <h2 data-r className={`${pop.className} t-hero text-white mb-12`}>
             <span className="ln"><span>Dominate</span></span>
             <span className="ln"><span><b className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8B9DB4]">The Market.</b></span></span>
          </h2>
          
          <Link href="#contact" className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-white/5 px-10 py-5 text-lg font-light text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#00A6FF]/50 hover:shadow-[0_0_30px_rgba(0,166,255,0.3)]">
            <span className="relative z-10">Request Strategy Audit</span>
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