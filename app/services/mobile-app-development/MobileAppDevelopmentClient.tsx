"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, BarChart3, Bell, Check, ChevronDown, ChevronRight, Code2, Download, Gauge, Headphones, Palette, Plus, Search, ShieldCheck, Smartphone, Star } from "lucide-react";
import { SiAndroid, SiApple, SiDocker, SiFigma, SiFirebase, SiFlutter, SiGit, SiKotlin, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiSwift, SiTypescript } from "react-icons/si";
import ClientLogos from "@/components/ClientLogos";
import Testimonials from "@/components/Testimonials";
import Industries from "@/components/Industries";
import Blog from "@/components/BlogInsights";
import ContactForm from "@/components/ContactForm";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

const css = `
.rv{opacity:0;transform:translateY(40px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.dr{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1) var(--dl,0s)}
.in .dr{stroke-dashoffset:0}
.dr0{stroke-dasharray:1;stroke-dashoffset:1;animation:dr0 2.6s cubic-bezier(.16,1,.3,1) .3s forwards}
@keyframes dr0{to{stroke-dashoffset:0}}
@keyframes sw{from{transform:translate3d(-4%,0,0) rotate(-12deg)}to{transform:translate3d(4%,-3%,0) rotate(-9deg)}}
.sw{animation:sw 12s ease-in-out infinite alternate}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
.xc{display:grid;transition:grid-template-columns .8s cubic-bezier(.22,1,.36,1)}
.wr{animation:wr 10s cubic-bezier(.76,0,.24,1) infinite}
@keyframes wr{0%,20%{transform:translateY(0)}25%,45%{transform:translateY(-20%)}50%,70%{transform:translateY(-40%)}75%,95%{transform:translateY(-60%)}100%{transform:translateY(-80%)}}
.bl{animation:bl 18s ease-in-out infinite alternate}
@keyframes bl{to{transform:translate3d(6vw,-5vh,0) scale(1.2)}}
.fl{animation:fl 6s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-12px)}}
@keyframes md{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}
.mq2{animation:mq2 40s linear infinite}.mq2.rev{animation-direction:reverse}.mqw:hover .mq2,.mqw:focus-within .mq2{animation-play-state:paused}
@keyframes mq2{to{transform:translate3d(-50%,0,0)}}
.sp{background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),rgba(0,123,255,.14),transparent 65%)}
.bp{animation:bp 8s cubic-bezier(.16,1,.3,1) infinite var(--dl)}
@keyframes bp{0%{opacity:0;transform:translateY(14px)}9%,82%{opacity:1;transform:none}94%,100%{opacity:0}}
.spk{stroke-dasharray:1;animation:spk 6s ease infinite var(--dl)}
@keyframes spk{0%{stroke-dashoffset:1}35%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}
.t0{font-size:clamp(2.4rem,5.4vw,5rem);line-height:1.04;letter-spacing:-.035em}
.t2{font-size:clamp(2rem,4vw,3.6rem);line-height:1.05;letter-spacing:-.03em}
@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;transition:none!important}.dr,.dr0{animation:none;stroke-dashoffset:0;transition:none}.sw,.wr,.bl,.fl,.mq2,.bp,.spk{animation:none}.bp{opacity:1}.spk{stroke-dashoffset:0}.xc{transition:none}}
`;

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const P = { team: "photo-1519389950473-47ba0277781c", dash: "photo-1551288049-bebda4e38f71", desk: "photo-1460925895917-afdab827c52f", lap: "photo-1531297484001-80022131f5a1", code: "photo-1498050108023-c5249f4df085", app: "photo-1512941937669-90a1b58e7e9c" };

const tabs = [
  { key: "iOS apps", title: "Polished apps for iPhone and iPad", blurb: "Native-feel apps that follow Apple design standards and run smoothly.", items: [["Native performance", "Fluid animations and fast launch times on every supported device."], ["Apple design standards", "Interfaces that feel familiar and pass App Store review."], ["Device features", "Face ID, push notifications, camera, location and Apple Pay where needed."], ["TestFlight beta testing", "Real users test builds before the public release."]] },
  { key: "Android apps", title: "Reliable apps for the Android ecosystem", blurb: "Apps built for the wide range of Android phones and screen sizes.", items: [["Wide device support", "Tested across popular screen sizes and Android versions."], ["Material design", "Clean interfaces that feel at home on Android."], ["Background features", "Notifications, sync and location handled efficiently."], ["Google Play release", "Store listing, signing and staged rollouts handled for you."]] },
  { key: "Cross-platform", title: "One codebase, two stores", blurb: "Flutter and React Native apps that ship to iOS and Android together.", items: [["Faster delivery", "Build and maintain one codebase instead of two."], ["Native-feel UI", "Smooth animations and platform-aware components."], ["Lower cost of change", "New features reach both platforms at the same time."], ["Native modules when needed", "We drop to native code for features that demand it."]] },
  { key: "Backend and APIs", title: "The engine behind your app", blurb: "Secure, scalable servers, databases and integrations that power the experience.", items: [["Secure authentication", "Sign-in, roles and protected data from day one."], ["Scalable APIs", "Built to handle growth in users and traffic."], ["Real-time features", "Live updates, chat and notifications."], ["Admin dashboard", "A web panel to manage users, content and orders."]] },
  { key: "App store launch", title: "From finished build to live listing", blurb: "We handle the steps between a working app and one people can download.", items: [["Store listing and ASO", "Titles, keywords and screenshots that help people find you."], ["Review and compliance", "Guidelines, privacy labels and policies prepared correctly."], ["Release management", "Staged rollouts and version updates."], ["Analytics and crash reporting", "See how people use the app and fix issues fast."]] },
];
const mocks = [
  <><i className="block h-20 rounded-[10px] bg-gradient-to-br from-[#0052CC] to-[#00B4FF]" /><i className="block h-3 w-2/3 rounded-full bg-[#CFE2FF]" /><i className="block h-3 w-1/2 rounded-full bg-[#E6F0FF]" /><i className="block h-9 rounded-full bg-[#007BFF]" /></>,
  <><div className="grid grid-cols-2 gap-2">{[0, 1, 2, 3].map((k) => <i key={k} className="h-14 rounded-[8px] bg-[#CFE2FF]" />)}</div><i className="block h-3 w-3/4 rounded-full bg-[#E6F0FF]" /></>,
  <><div className="flex h-24 items-end gap-2">{[40, 60, 45, 80, 65, 95].map((h, k) => <i key={k} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#0052CC] to-[#00B4FF]" style={{ height: `${h}%` }} />)}</div><i className="block h-3 w-1/2 rounded-full bg-[#CFE2FF]" /></>,
  <><div className="space-y-2">{[0, 1, 2].map((k) => <div key={k} className="flex items-center gap-2 rounded-[8px] border border-[#CFE2FF] p-2"><i className="h-6 w-6 rounded-full bg-[#E6F0FF]" /><i className="h-2 flex-1 rounded-full bg-[#CFE2FF]" /><Check size={14} className="text-[#10B981]" /></div>)}</div></>,
];
const about = [
  ["Experience", P.team, "150+ projects delivered for 80+ clients across 12+ countries. Figures reflect our growth trajectory and are updated quarterly."],
  ["Expertise", P.code, "Swift, Kotlin, Flutter, React Native and Node.js, chosen to fit your product rather than forced on every project."],
  ["Innovation", P.lap, "AI features, real-time experiences and smooth motion that make apps feel modern."],
  ["Technology", P.dash, "Cloud backends, secure APIs and monitoring that keep your app fast and available."],
];
const why = [["Fast and smooth", "Optimised launch time and fluid interactions on real devices."], ["Secure by design", "Encrypted data, safe sign-in and privacy-ready flows."], ["Built to scale", "Backends and APIs that grow with your users."], ["Store ready", "We prepare and submit to the App Store and Google Play."]];
const steps = [["Discovery", "Goals, users and scope."], ["UX and design", "Flows and interface."], ["Development", "Sprints with weekly demos."], ["Testing", "Devices, speed and security."], ["Store launch", "Listing, review and release."], ["Support", "Updates and growth."]];
const faqs = [
  ["How much does a mobile app cost?", "It depends on features, platforms and integrations. After a short discovery call we send a fixed quote with deliverables and a timeline."],
  ["How long does it take to build an app?", "A focused first version often takes a few months. Larger products take longer. You get a dated roadmap before we start."],
  ["Should I build for iOS, Android or both?", "Many products start cross-platform with Flutter or React Native to reach both stores quickly. We recommend the right approach after learning your goals."],
  ["Do you build the backend too?", "Yes. We build the secure APIs, database and admin dashboard your app needs, so one team owns the whole system."],
  ["Will you publish the app to the stores?", "Yes. We prepare store listings, handle review requirements and manage releases on the App Store and Google Play."],
  ["Do you support the app after launch?", "Yes. We offer maintenance, monitoring, OS updates and new features as your users grow."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

const included = [[Gauge, "Smooth performance", "Fast launch and fluid animations on real devices."], [Smartphone, "iOS and Android", "Apps that feel right on every supported phone."], [ShieldCheck, "Secure data and sign-in", "Encryption, safe authentication and privacy-ready flows."], [Palette, "Native-feel UI/UX", "Interfaces designed around how people hold a phone."], [Code2, "Clean API backend", "Scalable servers and an admin dashboard."], [BarChart3, "Analytics and crash reports", "See usage and fix issues quickly."], [Search, "App store optimisation", "Listing copy and keywords that help people find you."], [Headphones, "Post-launch support", "Updates, OS compatibility and new features."]] as const;
const techRows = [[[SiSwift, "Swift"], [SiKotlin, "Kotlin"], [SiFlutter, "Flutter"], [SiReact, "React Native"], [SiTypescript, "TypeScript"], [SiApple, "iOS"], [SiAndroid, "Android"]], [[SiNodedotjs, "Node.js"], [SiPython, "Python"], [SiFirebase, "Firebase"], [SiPostgresql, "PostgreSQL"], [SiDocker, "Docker"], [SiFigma, "Figma"], [SiGit, "Git"]]] as const;
// SAMPLE engagement options: confirm scope and wording before launch. Pricing is agreed after discovery.
const packs = [
  ["MVP", "For new ideas and startups", ["Core features for a first release", "iOS and Android from one codebase", "Clean, tested UI", "Store submission"], false],
  ["Growth app", "For businesses with users", ["Full feature set and custom design", "Secure backend and admin dashboard", "Analytics and push notifications", "Performance and security hardening", "Post-launch support"], true],
  ["Enterprise", "For complex, high-scale products", ["Native or hybrid architecture", "Integrations with internal systems", "Roles, permissions and compliance", "Scalable cloud infrastructure", "Ongoing product development"], false],
] as const;

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (n: number) => { const q = Math.min(1, (n - t0) / 1800); el.textContent = Math.round(to * (1 - Math.pow(1 - q, 3))) + suffix; if (q < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>{to}{suffix}</span>;
}

function Site({ good }: { good?: boolean }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${good ? "bg-gradient-to-br from-[#0B1F3B] to-[#0A3F9E]" : "bg-[#E5E7EB]"}`}>
      <div className={`relative h-[22rem] w-[11rem] overflow-hidden rounded-[2rem] border-[6px] p-3 ${good ? "border-white/80 bg-[#050E1F] text-white" : "border-[#6B7280] bg-white text-[#4B5563]"}`}>
        {good ? (<><div className="flex items-center justify-between"><i className="h-6 w-6 rounded-full bg-[#00B4FF]" /><i className="h-2 w-12 rounded-full bg-white/40" /></div><div className="mt-4 h-24 rounded-[10px] bg-gradient-to-br from-[#0052CC] to-[#00B4FF]" /><div className="mt-3 space-y-2">{[0, 1, 2].map((k) => <div key={k} className="flex items-center gap-2 rounded-[8px] bg-white/10 p-2"><i className="h-5 w-5 rounded-full bg-[#00B4FF]/70" /><i className="h-2 flex-1 rounded-full bg-white/30" /></div>)}</div><i className="mt-4 block h-9 rounded-full bg-white" /></>) : (<><div className="flex flex-wrap gap-1">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} className="h-3 w-8 rounded bg-[#9CA3AF]" />)}</div><div className="mt-3 h-16 rounded bg-[#9CA3AF]" /><p className="mt-3 text-[9px] leading-snug">Welcome! Tap here. Tap there. Many options and many menus…</p><div className="mt-2 grid grid-cols-2 gap-2">{[0, 1, 2, 3].map((k) => <i key={k} className="h-10 rounded bg-[#D1D5DB]" />)}</div></>)}
      </div>
      <p className={`absolute bottom-5 ${good ? "right-5 bg-[#10B981] text-black" : "left-5 bg-[#EF4444] text-white"} rounded-full px-4 py-1.5 text-sm font-semibold`}>{good ? "Opens in 1.1 s" : "Opens in 5.2 s"}</p>
    </div>
  );
}

function Compare() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative mx-auto h-[28rem] max-w-5xl select-none overflow-hidden rounded-[22px] border border-[#CFE2FF] shadow-[0_30px_80px_rgba(0,82,204,.18)]">
      <Site good />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><Site /></div>
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0B1F3B]">Before: typical app</span>
      <span className="absolute right-4 top-4 rounded-full bg-[#007BFF] px-3 py-1 text-xs font-semibold text-white">After: Devntom app</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_#00B4FF]" style={{ left: `${pos}%` }}><span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0052CC] shadow-xl"><ChevronRight size={16} className="rotate-180" /><ChevronRight size={16} /></span></div>
      <input type="range" min={4} max={96} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Drag to compare a typical app with a Devntom app" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" style={{ touchAction: "pan-y" }} />
    </div>
  );
}

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => <span className={`${pw.className} text-[.55em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>;

/** A rounded border that draws itself. Parent needs data-r (or the hero animation). */
function Frame({ r = 20, light = false, delay = 0, hero = false }: { r?: number; light?: boolean; delay?: number; hero?: boolean }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-visible">
      <rect width="100%" height="100%" rx={r} fill="none" pathLength={1} className={hero ? "dr0" : "dr"} stroke={light ? "rgba(255,255,255,.55)" : "url(#gl)"} strokeWidth="1.8" style={{ "--dl": `${delay}s`, animationDelay: `${0.5 + delay}s` } as CSSProperties} />
    </svg>
  );
}

export default function MobileAppDevelopmentClient() {
  const root = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const [card, setCard] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    root.current!.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    const h = heroRef.current!;
    const mv = (e: PointerEvent) => { const r = h.getBoundingClientRect(); h.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2)); h.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2)); };
    h.addEventListener("pointermove", mv);
    let raf = 0;
    const prog = () => { raf = 0; const d = document.documentElement.scrollHeight - innerHeight; barRef.current!.style.transform = `scaleX(${d > 0 ? scrollY / d : 0})`; };
    const onS = () => { if (!raf) raf = requestAnimationFrame(prog); };
    addEventListener("scroll", onS, { passive: true });
    return () => { io.disconnect(); h.removeEventListener("pointermove", mv); removeEventListener("scroll", onS); cancelAnimationFrame(raf); };
  }, []);

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const btn = `rounded-full bg-[#007BFF] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#0B1F3B] ${ring}`;
  const t = tabs[tab];

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <div ref={barRef} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <svg width="0" height="0" className="absolute" aria-hidden="true"><defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00B4FF" /><stop offset=".55" stopColor="#007BFF" /><stop offset="1" stopColor="#93C5FD" /></linearGradient></defs></svg>

      {/* 1. HERO */}
      <section ref={heroRef} className="relative isolate overflow-hidden px-6 pb-48 pt-32 text-white md:px-12 md:pt-40" style={{ background: "#050E1F", "--px": 0, "--py": 0 } as CSSProperties}>
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#050E1F 0%,#08214A 38%,#0A3F9E 80%,#0052CC 100%)" }} />
          <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: "translate3d(calc(var(--px,0) * 30px),calc(var(--py,0) * 20px),0)" }}><div className="bl absolute -right-[8%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-[#007BFF]/35 blur-[120px]" /></div>
          <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: "translate3d(calc(var(--px,0) * -24px),calc(var(--py,0) * -16px),0)" }}><div className="bl absolute -left-[10%] bottom-[-10%] h-[30rem] w-[30rem] rounded-full bg-[#6366F1]/30 blur-[120px]" style={{ animationDelay: "-8s" }} /></div>
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "repeating-linear-gradient(90deg,rgba(147,197,253,.07) 0 1px,transparent 1px 8.3333%)", maskImage: "linear-gradient(to bottom,transparent,#000 40%,transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#050E1F] to-transparent" />
          <div className="grain absolute inset-0" />
        </div>
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <svg aria-hidden="true" viewBox="0 0 700 520" className="pointer-events-none absolute top-1/2 hidden aspect-[700/520] h-[min(66vh,540px)] -translate-y-1/2 overflow-visible lg:block" style={{ right: "-4rem" }} fill="none">
              <path d="M-1800 40 H340 A220 220 0 0 1 340 480 H-1800" pathLength={1} className="dr0" stroke="url(#gl)" strokeWidth="2.2" />
              <circle r="5" fill="#fff" style={{ filter: "drop-shadow(0 0 8px #00B4FF)" }}><animateMotion dur="14s" begin="3.2s" repeatCount="indefinite" path="M-1800 40 H340 A220 220 0 0 1 340 480 H-1800" /></circle>
            </svg>
            <div className="relative py-8 lg:pl-4">
              <p className="rv inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.05] px-4 py-1.5 text-sm text-[#CFE2FF] backdrop-blur"><span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />Mobile App Development</p>
              <h1 className={`${pop.className} rv t0 mt-6 font-extralight`} style={{ transitionDelay: "100ms" }}>
                Apps people
                <span className="block"><span className="relative inline-block h-[1.14em] overflow-hidden align-bottom"><span className="wr flex flex-col">{["love", "trust", "open daily", "recommend", "love"].map((w, k) => <b key={k} className="block h-[1.14em] whitespace-nowrap bg-gradient-to-r from-[#93C5FD] via-[#00B4FF] to-[#E6F0FF] bg-clip-text font-bold leading-[1.14] text-transparent">{w}</b>)}</span></span><Acc>, built right.</Acc></span>
              </h1>
              <p className="rv mt-6 max-w-lg text-lg font-light leading-relaxed text-[#CFE2FF]" style={{ transitionDelay: "200ms" }}>We design and engineer fast, secure iOS and Android apps, with the backend, dashboard and store launch included.</p>
              <div className="rv mt-8 flex flex-wrap gap-3" style={{ transitionDelay: "300ms" }}>
                <a href="#contact" className={`group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0B1F3B] transition-colors duration-300 hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Discuss your app <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={16} aria-hidden="true" /></span></a>
                <Link href="/projects" className={`rounded-full border border-white/25 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#050E1F]`}>See our work</Link>
              </div>
              <dl className="rv mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6" style={{ transitionDelay: "400ms" }}>
                {[["150+", "Projects delivered"], ["12+", "Countries served"], ["98%", "Client satisfaction"]].map(([v, l]) => <div key={l}><dd className={`${pop.className} text-3xl font-semibold`}>{v}</dd><dt className="text-xs text-[#93C5FD]">{l}</dt></div>)}
              </dl>
            </div>
          </div>
          <div className="relative flex justify-center py-6 lg:col-span-6">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#007BFF]/30 blur-[90px]" />
            <div className="fl relative h-[30rem] w-[15rem] rounded-[2.6rem] border-[7px] border-[#CFE2FF]/80 bg-[#050E1F] shadow-[0_50px_120px_rgba(0,20,80,.7)]" style={{ transform: "rotate(-4deg)" }} aria-hidden="true">
              <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute inset-0 flex flex-col p-4 pt-10 text-white">
                <div className="bp flex items-center justify-between" style={{ "--dl": "0.2s" } as CSSProperties}><span className="text-xs text-white/60">Good morning</span><i className="h-7 w-7 rounded-full bg-gradient-to-br from-[#00B4FF] to-[#007BFF]" /></div>
                <p className={`bp ${pop.className} mt-2 text-xl font-semibold`} style={{ "--dl": "0.5s" } as CSSProperties}>Dashboard</p>
                <div className="bp mt-3 rounded-[14px] bg-gradient-to-br from-[#0052CC] to-[#00B4FF] p-3" style={{ "--dl": "0.8s" } as CSSProperties}><p className="text-[10px] text-white/80">This week</p><p className={`${pop.className} text-2xl font-semibold`}>+128%</p><svg viewBox="0 0 100 26" className="mt-1 h-7 w-full" fill="none"><path d="M0 22 L18 16 L36 19 L54 8 L72 11 L100 2" pathLength={1} className="spk" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg></div>
                <div className="mt-3 space-y-2">{[1.1, 1.4, 1.7].map((d, k) => <div key={k} className="bp flex items-center gap-2 rounded-[10px] bg-white/10 p-2" style={{ "--dl": `${d}s` } as CSSProperties}><i className="h-7 w-7 rounded-full bg-[#00B4FF]/70" /><span className="flex-1 space-y-1"><i className="block h-2 w-3/4 rounded-full bg-white/40" /><i className="block h-2 w-1/2 rounded-full bg-white/20" /></span></div>)}</div>
                <div className="mt-auto flex justify-around rounded-full bg-white/10 py-2">{[0, 1, 2, 3].map((k) => <i key={k} className={`h-2 w-2 rounded-full ${k === 0 ? "bg-[#00B4FF]" : "bg-white/40"}`} />)}</div>
              </div>
            </div>
            <span className="fl absolute left-[4%] top-[14%] z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050E1F]/85 px-4 py-2 text-sm shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur" style={{ animationDelay: "-2s" }}><Bell size={15} className="text-[#00B4FF]" aria-hidden="true" />New order received</span>
            <span className="fl absolute right-[2%] top-[42%] z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050E1F]/85 px-4 py-2 text-sm shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur" style={{ animationDelay: "-4s" }}><span className="flex">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={13} className="fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />)}</span>Loved by users</span>
            <span className="fl absolute bottom-[8%] left-[2%] z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050E1F]/85 px-4 py-2 text-sm shadow-[0_10px_40px_rgba(0,0,0,.4)] backdrop-blur" style={{ animationDelay: "-5s" }}><Download size={15} className="text-[#10B981]" aria-hidden="true" />Ready for the stores</span>
          </div>
        </div>
        <a href="#platforms" aria-label="Scroll to platforms" className="absolute bottom-24 left-1/2 hidden h-12 w-8 -translate-x-1/2 justify-center rounded-full border border-white/40 pt-3 md:flex"><i className="block h-2 w-1 rounded-full bg-white" style={{ animation: "md 1.6s ease-in-out infinite" }} /></a>
      </section>

      {/* 2. PLATFORMS: tabs + accordion */}
      <section id="platforms" className="relative z-10 -mt-14 rounded-t-[3rem] bg-white py-20 md:py-28" aria-labelledby="plat">
        <div className={wrap}>
          <div data-r className="rv mb-20 grid gap-6 border-b border-[#E2ECFA] pb-14 sm:grid-cols-2 lg:grid-cols-4">
            {[[150, "+", "Projects delivered"], [80, "+", "Clients worldwide"], [12, "+", "Countries served"], [98, "%", "Client satisfaction"]].map(([v, x, l]) => <div key={String(l)} className="relative pl-5"><span aria-hidden="true" className="absolute left-0 top-1 h-12 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-[#00B4FF] to-[#007BFF] transition-transform duration-[1400ms] [.in_&]:scale-y-100" /><p className={`${pop.className} text-4xl font-semibold text-[#0B1F3B]`}><Count to={v as number} suffix={x as string} /></p><p className="text-sm text-[#475569]">{l}</p></div>)}
            <p className="text-xs text-[#64748B] sm:col-span-2 lg:col-span-4">Figures reflect our growth trajectory and are updated quarterly.</p>
          </div>
          <h2 id="plat" data-r className={`${pop.className} rv t2 text-center font-light text-[#0B1F3B]`}>Learn more about our <b className="font-semibold">app platforms</b></h2>
          <div role="tablist" className="rv mx-auto mt-10 flex max-w-5xl gap-1 overflow-x-auto rounded-full bg-[#EEF3FA] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((x, k) => <button key={x.key} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setOpen(0); }} className={`flex-1 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-all duration-500 ${tab === k ? "bg-[#0B1F3B] text-white shadow-lg" : "text-[#0B1F3B]/70 hover:text-[#0B1F3B]"} ${ring}`}>{x.key}</button>)}
          </div>
          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-baseline justify-between gap-4">
            <h3 className={`${pop.className} text-2xl font-semibold text-[#0052CC]`}>{t.title}</h3>
            <p className="max-w-lg text-[#475569]">{t.blurb}</p>
          </div>
          <div data-r className="rv mx-auto mt-8 grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div className="relative rounded-[22px] bg-[#EEF3FA] p-8">
              <div className="relative mx-auto w-[13rem] overflow-hidden rounded-[2.2rem] border-[6px] border-[#0B1F3B] bg-white shadow-[0_20px_60px_rgba(0,82,204,.25)]">
                <span className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0B1F3B]" />
                <div key={`${tab}-${open}`} className="space-y-3 p-4 pt-9 [animation:fadeUp_.6s_ease_both]" style={{ minHeight: "22rem" }}>{mocks[(tab + open) % 4]}</div>
              </div>
            </div>
            <ul>
              {t.items.map(([q, a], k) => (
                <li key={q} className="border-t border-[#0B1F3B]">
                  <button onClick={() => setOpen(k)} aria-expanded={open === k} className={`flex w-full items-center justify-between py-4 text-left ${pop.className} text-xl text-[#0B1F3B] ${ring}`}>{q}<ChevronDown size={20} className={`transition-transform duration-500 ${open === k ? "rotate-180" : ""}`} aria-hidden="true" /></button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ${open === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><p className="overflow-hidden pb-4 text-[#475569]">{a}</p></div>
                </li>
              ))}
              <li className="border-t border-[#0B1F3B]" />
            </ul>
          </div>
        </div>
        <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}}"}</style>
      </section>

      {/* 2b. INCLUDED */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="inc">
        <div className={wrap}>
          <div data-r className="rv flex flex-wrap items-end justify-between gap-6"><h2 id="inc" className={`${pop.className} t2 max-w-2xl font-light text-[#0B1F3B]`}>Included with <b className="font-semibold">every app</b></h2><p className="max-w-sm text-[#475569]">The essentials are never extras. Every project ships with these foundations.</p></div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map(([Icon, h, d], k) => (
              <li key={h} data-r className="rv" style={{ transitionDelay: `${(k % 4) * 80}ms` }}>
                <div onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }} className="group relative h-full overflow-hidden rounded-[18px] border border-[#CFE2FF] bg-white p-6 transition-colors duration-300 hover:border-[#007BFF]">
                  <span aria-hidden="true" className="sp pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#E6F0FF] text-[#0052CC] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-[#007BFF] group-hover:text-white"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className={`${pop.className} relative mt-5 text-lg font-semibold text-[#0B1F3B]`}>{h}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-[#475569]">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2c. BEFORE / AFTER */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="cmp">
        <div className={wrap}>
          <h2 id="cmp" data-r className={`${pop.className} rv t2 mx-auto max-w-3xl text-center font-light text-[#0B1F3B]`}>See the <b className="font-semibold">difference</b> a better app makes</h2>
          <p data-r className="rv mx-auto mb-10 mt-4 max-w-xl text-center text-[#475569]">Drag the slider, or use the arrow keys, to compare a typical app with a Devntom app. Illustrative example.</p>
          <div data-r className="rv"><Compare /></div>
        </div>
      </section>

      {/* 3. INTRO CARD with drawn chevron */}
      <div style={{ background: "linear-gradient(#EEF3FA 50%,#0A3F9E 50%)" }} className="py-16">
        <div className={wrap}>
          <div data-r className="rv relative flex min-h-[22rem] items-stretch overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,30,90,.2)]">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-14">
              <h2 className={`${pop.className} t2 font-light text-[#0052CC]`}>Got an <b className="font-semibold">app idea</b> to shape?</h2>
              <p className="mt-4 max-w-md text-[#475569]">Book a free idea session. We help you shape the features, platforms and a realistic roadmap.</p>
              <div className="mt-7 flex flex-wrap gap-3"><a href="#contact" className={btn}>Book an idea session</a><a href="#platforms" className={`rounded-full border border-[#0052CC] px-6 py-3 text-sm font-medium text-[#0052CC] transition hover:bg-[#0052CC] hover:text-white ${ring}`}>Explore platforms</a></div>
            </div>
            <div className="relative hidden aspect-[5/6] shrink-0 md:block" style={{ height: "auto", minHeight: "22rem" }}>
              <img src={img(P.app, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 100%,93% 50%)" }} />
              <svg aria-hidden="true" viewBox="0 0 500 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMinYMid slice" fill="none"><path d="M0 0 L465 300 L0 600" pathLength={1} className="dr" stroke="url(#gl)" strokeWidth="3" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ABOUT: expanding cards */}
      <section className="bg-gradient-to-b from-[#0A3F9E] to-[#0B1F3B] pb-24 pt-16 text-white md:pb-32" aria-labelledby="abt">
        <div className={wrap}>
          <div data-r className="rv grid gap-6 md:grid-cols-12">
            <h2 id="abt" className={`${pop.className} text-3xl font-semibold md:col-span-4`}>About our apps</h2>
            <div className="md:col-span-8"><p className="max-w-2xl font-light leading-relaxed text-[#CFE2FF]">We bring engineering, design and product thinking together to create apps that feel fast, look premium and keep working as your user base grows.</p><Link href="/about" className={`mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0A3F9E] transition hover:bg-[#00B4FF] hover:text-white ${ring}`}>Learn more</Link></div>
          </div>
          <ul className="xc mt-12 h-[26rem] gap-3" style={{ gridTemplateColumns: about.map((_, k) => (card === k ? "3fr" : "1fr")).join(" ") }}>
            {about.map(([n, id, d], k) => (
              <li key={n} className="min-w-0">
                <button onClick={() => setCard(k)} onMouseEnter={() => setCard(k)} onFocus={() => setCard(k)} aria-expanded={card === k} data-open={card === k} className={`group relative flex h-full w-full overflow-hidden rounded-[22px] bg-[#EEF3FA] text-left text-[#0B1F3B] ${ring}`}>
                  <img src={img(id, 700)} alt="" loading="lazy" className="absolute inset-y-0 left-0 hidden w-1/2 object-cover opacity-0 transition-opacity duration-700 group-data-[open=true]:opacity-100 md:block" />
                  <span className={`${pop.className} absolute left-5 top-5 whitespace-nowrap text-xl transition-all duration-700 md:group-data-[open=true]:left-[52%]`}>{n}</span>
                  <span className="absolute bottom-5 left-[52%] hidden w-[44%] text-sm leading-relaxed opacity-0 transition-opacity duration-700 group-data-[open=true]:opacity-100 md:block">{d}</span>
                  <ChevronRight size={22} className="absolute bottom-5 left-5 text-[#0052CC] transition group-data-[open=true]:opacity-0" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm text-[#CFE2FF] md:hidden">{about[card][2]}</p>
        </div>
      </section>

      {/* 5. WHY: drawn borders */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="why">
        <div className={wrap}>
          <h2 id="why" data-r className={`${pop.className} rv t2 max-w-3xl font-light text-[#0B1F3B]`}>Why our apps <b className="font-semibold">perform</b> <Acc dark={false}>better</Acc></h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([h, d], k) => (
              <li key={h} data-r className="rv group relative rounded-[22px] bg-[#F5F9FF] p-8 transition-colors duration-500 hover:bg-[#EAF2FF]" style={{ transitionDelay: `${k * 90}ms` }}>
                <Frame delay={k * 0.25} />
                <span className="font-mono text-xs text-[#0052CC]">0{k + 1}</span>
                <h3 className={`${pop.className} mt-10 flex items-start justify-between text-xl font-semibold text-[#0B1F3B]`}>{h}<ArrowUpRight size={20} className="text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5b. TECH */}
      <section className="overflow-hidden bg-[#F5F9FF] py-20" aria-label="Technologies we use">
        <h2 data-r className={`${pop.className} rv mb-10 text-center text-2xl font-light text-[#0B1F3B]`}>Built with tools <b className="font-semibold">we trust</b></h2>
        <div className="mqw space-y-4" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
          {techRows.map((row, r) => (
            <div key={r} className={`mq2 flex w-max ${r ? "rev" : ""}`} style={{ animationDuration: r ? "48s" : "40s" }}>
              {[...row, ...row].map(([Ic, n], i) => <span key={i} className="mr-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-[#CFE2FF] bg-white px-6 py-3.5 text-base text-[#0B1F3B]"><Ic aria-hidden="true" className="h-6 w-6 text-[#0052CC]" />{n}</span>)}
            </div>
          ))}
        </div>
      </section>

      {/* 6. PROCESS: drawn timeline with ticks */}
      <section className="bg-[#050E1F] py-24 text-white md:py-32" aria-labelledby="proc">
        <div className={wrap}>
          <h2 id="proc" data-r className={`${pop.className} rv t2 mx-auto max-w-2xl text-center font-light`}>Six steps from idea to <Acc>app store</Acc></h2>
          <ol data-r className="relative mt-16 grid gap-10 md:grid-cols-6 md:gap-4">
            <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[22px] hidden h-px origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF] shadow-[0_0_14px_#00B4FF] transition-transform duration-[2800ms] ease-out [.in_&]:scale-x-100 md:block" />
            {steps.map(([n, d], k) => (
              <li key={n} className="relative text-center">
                <span className="relative mx-auto block h-11 w-11" style={{ "--d": `${0.5 + k * 0.45}s` } as CSSProperties}>
                  <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" />
                  <span className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-black"><Check size={18} strokeWidth={3} aria-label="Done" /></span>
                </span>
                <h3 className={`${pop.className} mt-4 font-semibold`}>{n}</h3>
                <p className="mt-1 text-sm font-light text-[#B8C9DE]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6b. ENGAGEMENT OPTIONS */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="pk">
        <div className={wrap}>
          <div data-r className="rv text-center"><h2 id="pk" className={`${pop.className} t2 font-light text-[#0B1F3B]`}>Choose how we <b className="font-semibold">work together</b></h2><p className="mx-auto mt-4 max-w-xl text-[#475569]">Three ways to start. Scope and pricing are confirmed after a free discovery call, with no surprises.</p></div>
          <ul className="mt-14 grid gap-5 lg:grid-cols-3">
            {packs.map(([n, who, list, hi], k) => (
              <li key={n} data-r className={`rv group relative rounded-[24px] p-8 transition-transform duration-500 hover:-translate-y-2 ${hi ? "text-white shadow-[0_30px_80px_rgba(0,82,204,.35)]" : "bg-[#F5F9FF] text-[#0B1F3B]"}`} style={{ transitionDelay: `${k * 100}ms`, background: hi ? "linear-gradient(150deg,#0B1F3B,#0A3F9E 70%,#007BFF)" : undefined }}>
                <Frame r={24} light={hi} delay={k * 0.3} />
                {hi && <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0052CC]">Recommended</span>}
                <h3 className={`${pop.className} text-2xl font-semibold`}>{n}</h3>
                <p className={`mt-1 text-sm ${hi ? "text-[#CFE2FF]" : "text-[#475569]"}`}>{who}</p>
                <ul className="mt-6 space-y-3">{list.map((x) => <li key={x} className="flex items-start gap-3 text-sm"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${hi ? "bg-[#00B4FF] text-[#0B1F3B]" : "bg-[#CFE2FF] text-[#0052CC]"}`}><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{x}</li>)}</ul>
                <a href="#contact" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${hi ? "bg-white text-[#0B1F3B] hover:bg-[#00B4FF] hover:text-white" : "bg-[#007BFF] text-white hover:bg-[#0B1F3B]"} ${ring}`}>Request a quote <ArrowRight size={16} aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Industries />
      <ClientLogos />
      <Testimonials />
      <Blog />

      {/* 7. FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="faq">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <h2 id="faq" data-r className={`${pop.className} rv t2 font-light text-[#0B1F3B] lg:col-span-4`}>App <b className="font-semibold">questions</b></h2>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-t border-[#CFE2FF] last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 ${ring} [&::-webkit-details-marker]:hidden`}><span className={`${pop.className} text-lg font-semibold text-[#0B1F3B] md:text-xl`}>{q}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span></summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOW CAN WE HELP: outlined card, round photo */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="help">
        <div className={wrap}>
          <div data-r className="rv relative overflow-hidden rounded-[28px] bg-[#0B1F3B] text-white">
            <Frame r={28} delay={0.1} />
            <div className="relative grid items-center md:grid-cols-2">
              <div className="p-8 md:p-14"><h2 id="help" className={`${pop.className} t2 font-light`}>How can we <b className="font-semibold">help?</b></h2><p className="mt-4 max-w-sm text-[#CFE2FF]">Tell us about your project, or ask any question. We reply with a plan, a timeline and a quote.</p><a href="#contact" className={`mt-7 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#0B1F3B]`}>Contact us</a></div>
              <div className="relative h-72 md:h-[26rem]"><img src={img(P.team, 1000)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover md:rounded-l-[16rem]" /></div>
            </div>
          </div>
        </div>
      </section>

      <div id="contact" className="[&>*:last-child]:mb-0"><ContactForm /></div>
    </main>
  );
}