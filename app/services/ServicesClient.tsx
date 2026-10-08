"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * Client page for /services. Self-contained: no imports from your own files, no Nav, no Footer.
 * Data (services, FAQs) arrives as props from page.tsx so the structured data and the UI never drift apart.
 * Search this file for "TESTIMONIALS" to see where to drop your existing component.
 */

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import Lenis from "lenis";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Bot, Check, Code2, Globe, Megaphone, PenTool, Plus, Search, Smartphone } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/** Set to true only if Lenis is NOT already started in your layout. Starting it twice breaks scrolling. */
const USE_LENIS = false;

export interface Service { name: string; href: string; text: string; points: string[] }
interface Props { services: Service[]; faqs: [string, string][] }

/* ------------------------------ CONTENT ------------------------------ */

const icons: Record<string, typeof Globe> = {
  "website-development": Globe,
  "custom-software-development": Code2,
  "mobile-app-development": Smartphone,
  "ai-automation": Bot,
  "digital-marketing": Megaphone,
  "ui-ux-design": PenTool,
  "seo-optimization": Search,
};
const slugOf = (href: string) => href.split("/").pop() ?? "";
const iconOf = (href: string) => icons[slugOf(href)] ?? Globe;

// Recommended services per goal (slugs match the service hrefs).
const goals = [
  ["Launch or redesign a website", ["website-development", "ui-ux-design", "seo-optimization"]],
  ["Get found on Google", ["seo-optimization", "website-development"]],
  ["Replace spreadsheets with a system", ["custom-software-development", "ai-automation"]],
  ["Build a mobile app", ["mobile-app-development", "ui-ux-design", "custom-software-development"]],
  ["Remove repetitive manual work", ["ai-automation", "custom-software-development"]],
  ["Bring in more leads", ["digital-marketing", "seo-optimization", "website-development"]],
] as const;

const reasons = [
  ["Systems, not isolated features", "Every site, app and automation connects to the rest of your operation, so it keeps working as you grow."],
  ["Business goals first", "We learn how you earn and where time is lost, then choose the technology that fits."],
  ["Modern, maintainable stack", "Next.js, React, Node.js, Python and cloud infrastructure, written clean enough for any team to extend."],
  ["Clear communication", "Fixed scope, regular demos and no surprises. You always know what is being built and why."],
];
const stats = [["150+", "Projects delivered"], ["80+", "Clients worldwide"], ["12+", "Countries served"], ["98%", "Client satisfaction"]];

const steps = [
  ["Discovery and strategy", "Goals, users, constraints and a plan we both sign off on.", "Discovery"],
  ["Architecture and design", "System structure, user flows and the visual design.", "Architecture"],
  ["Development and build", "Iterative builds with a demo at every milestone.", "Development"],
  ["Quality assurance", "Testing for speed, security and accessibility.", "Quality"],
  ["Launch and deployment", "Go-live with monitoring and a rollback plan.", "Launch"],
  ["Support and growth", "Ongoing fixes, improvements and search growth.", "Support"],
] as const;
const stepX = [100, 300, 500, 700, 900, 1100];

/* ------------------------------ STYLES ------------------------------ */

const css = `
.ln{overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.in .ln>span{transform:none}
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.fu{animation:fu .6s cubic-bezier(.16,1,.3,1) both}
@keyframes fu{from{opacity:0;transform:translateY(16px)}}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.t0{font-size:clamp(2.5rem,6.6vw,6.4rem);line-height:1.04;letter-spacing:-.04em}
.t1{font-size:clamp(2.8rem,7.4vw,7rem);line-height:.95;letter-spacing:-.04em;text-shadow:0 2px 40px rgba(5,14,31,.5)}
.t2{font-size:clamp(2.2rem,4.5vw,4.2rem);line-height:1.02;letter-spacing:-.035em}
.gf{background-image:linear-gradient(rgba(96,165,250,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.4) 1px,transparent 1px);background-size:64px 64px;animation:gf 3s linear infinite;-webkit-mask-image:linear-gradient(to top,#000 15%,transparent 80%);mask-image:linear-gradient(to top,#000 15%,transparent 80%)}
@keyframes gf{to{background-position:0 64px}}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.orb{animation:rot var(--d) linear infinite}
.orbi{display:flex;animation:rot var(--d) linear infinite reverse}
@keyframes rot{to{transform:rotate(360deg)}}
.pl{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)}
.in .pl{stroke-dashoffset:0}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.fu{animation:none!important}.gf,.orb,.orbi{animation:none!important}.pl{stroke-dashoffset:0;transition:none}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      <span className="sr-only">{to}{suffix}</span>
      <span aria-hidden="true">{n}{suffix}</span>
    </span>
  );
}

/** Decorative ring of icons that rotate around the centre while staying upright. */
function Orbit({ items, size, d, reverse = false }: { items: string[]; size: string; d: string; reverse?: boolean }) {
  return (
    <div className="orb absolute rounded-full border border-white/15" style={{ inset: size, "--d": d, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}>
      {items.map((href, i) => {
        const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const Icon = iconOf(href);
        return (
          <div key={href} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}>
            <span className="orbi h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#0B1F3B] text-[#93C5FD] shadow-[0_0_30px_rgba(0,123,255,.35)] md:h-14 md:w-14" style={{ "--d": d, animationDirection: reverse ? "normal" : "reverse" } as CSSProperties}>
              <Icon size={22} aria-hidden="true" />
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ PAGE ------------------------------ */

export default function ServicesClient({ services, faqs }: Props) {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [active, setActive] = useState(0);
  const [goal, setGoal] = useState(0);

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
          tl.style.transform = `perspective(900px) rotateX(${(-((y - r.top) / r.height - 0.5) * 6).toFixed(2)}deg) rotateY(${(((x - r.left) / r.width - 0.5) * 6).toFixed(2)}deg)`;
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

    // Which service card is in the middle of the screen (drives the sticky index)
    const cards = [...el.querySelectorAll<HTMLElement>("[data-svc]")];
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.svc)); }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    cards.forEach((c) => spy.observe(c));
    off.push(() => spy.disconnect());

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

  const half = Math.ceil(services.length / 2);
  const outer = services.slice(0, half).map((s) => s.href);
  const inner = services.slice(half).map((s) => s.href);
  const picked = goals[goal][1].map((slug) => services.find((s) => slugOf(s.href) === slug)).filter((s): s is Service => !!s);

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>

      <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]" />
      <div ref={cur} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block">
        <span className="absolute left-1/2 top-1/2 flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center box-border rounded-full transition-[width,height,background-color,border-color] duration-300">
          <span className="text-xs font-semibold text-black opacity-0 transition-opacity">View</span>
        </span>
      </div>

      {/* 1. HERO: orbit of the seven services */}
      <section className="relative isolate overflow-hidden bg-[#050E1F] pb-24 pt-36 text-white md:pb-32 md:pt-44" aria-label="Services">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 80% 30%,rgba(0,123,255,.38),transparent 52%)" }} />
        <div aria-hidden="true" className="gf absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-40" />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className={`${wrap} grid items-center gap-16 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="rv text-sm text-[#93C5FD]">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className={`rounded-[3px] hover:text-white ${ringDark}`}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/70">Services</li>
              </ol>
            </nav>
            <p className="rv mt-8 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.04] px-4 py-1.5 text-sm text-[#CFE2FF] shadow-[0_0_30px_rgba(0,123,255,.25)]"><span className="text-[#F59E0B]" aria-hidden="true">✦</span>What we do</p>
            <Lines h1 className="t0 mt-6 max-w-3xl" lines={["Seven services,", <>one connected <Acc>system</Acc></>]} />
            <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70" style={{ transitionDelay: "200ms" }}>Websites, custom software, mobile apps, AI automation, marketing, design and SEO, delivered by one team so every piece works with the rest.</p>
            <div className="rv mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "300ms" }}>
              <a href="#all-services" data-magnetic className={`rounded-[4px] bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ringDark}`}>Explore services</a>
              <a href="#contact-form" className={`rounded-[4px] border border-white/25 bg-black/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>Get a quote</a>
            </div>
          </div>

          <div className="rv mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:col-span-5 lg:max-w-[520px]" style={{ transitionDelay: "250ms" }} aria-hidden="true">
            <div className="relative aspect-square">
              <div className="absolute inset-[30%] rounded-full" style={{ background: "radial-gradient(circle,rgba(0,180,255,.35),transparent 70%)" }} />
              <Orbit items={outer} size="0%" d="48s" />
              <Orbit items={inner} size="24%" d="34s" reverse />
              <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-gradient-to-b from-white/10 to-white/[.02] text-center text-sm font-medium shadow-[0_0_60px_rgba(0,123,255,.45)] md:h-28 md:w-28">Your<br />business</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATEMENT */}
      <section className="bg-white py-28 md:py-44" aria-label="Our approach">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-3">
            <p className="flex items-center gap-3 text-sm font-medium text-[#0052CC]"><span className="h-px w-8 bg-[#007BFF]" />Our approach</p>
            <Link href="/about" className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B1F3B] underline underline-offset-4 hover:text-[#007BFF] ${ring}`}>About Devntom <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <Words className="text-[clamp(1.8rem,4.2vw,3.8rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0B1F3B] md:col-span-9" text="We do not sell isolated features. Each service is one part of a system, designed so your website, software, automation and marketing work together and grow with your business." />
        </div>
      </section>

      {/* 3. ALL SERVICES: sticky index + detailed cards */}
      <section id="all-services" className="scroll-mt-20 bg-[#F5F9FF] py-24 md:py-36" aria-label="All services">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <Lines className="t2 text-[#0B1F3B]" lines={[<>Pick what</>, <>you <b className="font-bold">need</b></>]} />
              <nav aria-label="Services index" className="mt-10">
                <ul className="border-l border-[#CFE2FF]">
                  {services.map((s, i) => (
                    <li key={s.href}>
                      <a href={`#${slugOf(s.href)}`} aria-current={active === i ? "true" : undefined} className={`relative block py-2.5 pl-6 transition-colors duration-300 ${active === i ? `${pop.className} font-semibold text-[#0B1F3B]` : "font-light text-[#64748B] hover:text-[#0B1F3B]"} ${ring}`}>
                        <span aria-hidden="true" className={`absolute -left-px top-0 h-full w-0.5 origin-center bg-[#007BFF] transition-transform duration-300 ${active === i ? "scale-y-100" : "scale-y-0"}`} />
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="lg:hidden"><Lines className="t2 mb-12 text-[#0B1F3B]" lines={[<>Pick what</>, <>you <b className="font-bold">need</b></>]} /></div>
            <ul className="space-y-6">
              {services.map((s, i) => {
                const Icon = iconOf(s.href);
                return (
                  <li key={s.href}>
                    <article id={slugOf(s.href)} data-svc={i} data-tilt className={`rv group relative scroll-mt-28 overflow-hidden rounded-[4px] border bg-white p-8 transition-[border-color,box-shadow] duration-500 md:p-12 ${active === i ? "border-[#007BFF] shadow-[0_24px_70px_rgba(0,123,255,.16)]" : "border-[#CFE2FF] shadow-none"}`}>
                      <Icon aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -bottom-10 -right-8 h-64 w-64 text-[#E6F0FF] transition duration-700 group-hover:-translate-y-2 group-hover:text-[#CFE2FF]" />
                      <div className="relative">
                        <span className={`flex h-14 w-14 items-center justify-center rounded-[4px] transition-colors duration-500 ${active === i ? "bg-[#007BFF] text-white" : "bg-[#E6F0FF] text-[#0052CC]"}`}><Icon size={26} aria-hidden="true" /></span>
                        <h3 className={`${pop.className} mt-8 text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-tight tracking-[-0.03em] text-[#0B1F3B]`}>{s.name}</h3>
                        <p className="mt-4 max-w-xl text-lg font-light leading-relaxed text-[#475569]">{s.text}</p>
                        <ul className="mt-8 flex flex-wrap gap-2">
                          {s.points.map((p) => <li key={p} className="flex items-center gap-2 rounded-full bg-[#E6F0FF] px-4 py-1.5 text-sm font-medium text-[#0052CC]"><Check size={14} aria-hidden="true" />{p}</li>)}
                        </ul>
                        <Link href={s.href} data-magnetic className={`mt-10 inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-6 py-3 font-medium text-white transition hover:bg-[#007BFF] ${ring}`}>
                          Explore {s.name}<ArrowRight size={18} aria-hidden="true" className="transition group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. WHY DEVNTOM */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-36" style={{ background: "linear-gradient(135deg,#0B1F3B,#0A1A2F)" }} aria-label="Why Devntom">
        <div aria-hidden="true" className="absolute -left-40 top-1/4 -z-10 h-[40rem] w-[40rem] rounded-full" style={{ background: "radial-gradient(circle,rgba(0,123,255,.35),transparent 65%)" }} />
        <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <div className="rv relative overflow-hidden rounded-[4px] border border-[#3B82F6]/40 p-8 shadow-[0_0_80px_rgba(59,130,246,.25)] md:p-12 lg:sticky lg:top-24" style={{ background: "linear-gradient(160deg,#0B1F3B 30%,#1E3A6B)" }}>
              <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-70">
                <defs><linearGradient id="svcArc" x1="0" x2="1"><stop offset="0" stopColor="#00B4FF" stopOpacity="0" /><stop offset="1" stopColor="#93C5FD" /></linearGradient></defs>
                <path d="M-20 330 C 120 330, 180 120, 420 140" fill="none" stroke="url(#svcArc)" strokeWidth="2" />
                <path d="M120 -10 C 220 120, 190 300, 140 420" fill="none" stroke="#CFE2FF" strokeOpacity=".4" strokeWidth="1.5" />
              </svg>
              <h2 className={`${pop.className} relative text-[clamp(2.3rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]`}>Why <b className="font-bold">Devntom</b></h2>
              <dl className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map(([n, l]) => (
                  <div key={l} className="border-t border-white/25 pt-4">
                    <dd className={`${pop.className} text-5xl font-semibold tracking-[-0.04em]`}><Count to={parseInt(n)} suffix={n.replace(/\d/g, "")} /></dd>
                    <dt className="mt-1 text-sm font-light text-[#CFE2FF]">{l}</dt>
                  </div>
                ))}
              </dl>
              <p className="relative mt-8 text-xs text-[#93C5FD]">Figures reflect our current growth trajectory and are updated quarterly.</p>
            </div>
          </div>
          <ul className="space-y-5 lg:col-span-6">
            {reasons.map(([t, d], i) => (
              <li key={t} data-tilt className="rv group rounded-[4px] border border-[#3B82F6]/30 border-l-4 border-l-[#00B4FF] p-8 transition-colors duration-300 hover:border-[#00B4FF]" style={{ background: "linear-gradient(135deg,rgba(11,31,59,.9),rgba(59,130,246,.12))", transitionDelay: `${i * 90}ms` }}>
                <h3 className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#00B4FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                <p className="mt-3 max-w-lg font-light leading-relaxed text-[#CFE2FF]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. NOT SURE WHERE TO START: goal finder */}
      <section className="bg-white py-24 md:py-36" aria-label="Find the right service">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Not sure where</>, <>to <Acc dark={false}>start</Acc>?</>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#475569]">Choose what you are trying to achieve and we will show where we would begin.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <div role="group" aria-label="Your goal" className="rv flex flex-col gap-2 lg:col-span-5">
              {goals.map(([g], i) => (
                <button key={g} type="button" aria-pressed={goal === i} onClick={() => setGoal(i)} className={`flex items-center justify-between gap-4 rounded-[4px] border px-5 py-4 text-left font-medium transition-colors duration-300 ${goal === i ? "border-[#007BFF] bg-[#007BFF] text-white" : "border-[#CFE2FF] text-[#0B1F3B] hover:border-[#007BFF] hover:bg-[#F5F9FF]"} ${ring}`}>
                  {g}<ArrowRight size={18} aria-hidden="true" className={`shrink-0 transition-transform duration-300 ${goal === i ? "translate-x-0" : "-translate-x-1 opacity-50"}`} />
                </button>
              ))}
            </div>
            <div className="rv lg:col-span-7" style={{ transitionDelay: "120ms" }}>
              <div key={goal} aria-live="polite" className="fu relative h-full overflow-hidden rounded-[4px] border border-[#3B82F6]/40 p-8 text-white shadow-[0_0_80px_rgba(59,130,246,.2)] md:p-10" style={{ background: "linear-gradient(160deg,#0B1F3B 30%,#1E3A6B)" }}>
                <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(0,180,255,.3),transparent 65%)" }} />
                <p className="relative text-sm text-[#93C5FD]">We would start with</p>
                <ul className="relative mt-6 divide-y divide-white/10">
                  {picked.map((s) => {
                    const Icon = iconOf(s.href);
                    return (
                      <li key={s.href}>
                        <Link href={s.href} className={`group flex items-start gap-4 py-5 ${ringDark}`}>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border border-white/15 bg-white/[.05] transition-colors group-hover:border-[#007BFF] group-hover:bg-[#007BFF]"><Icon size={20} aria-hidden="true" /></span>
                          <span className="min-w-0">
                            <span className={`${pop.className} flex items-center gap-2 text-lg font-semibold`}>{s.name}<ArrowUpRight size={16} aria-hidden="true" className="text-[#93C5FD] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                            <span className="mt-1 block text-sm font-light leading-relaxed text-[#CFE2FF]">{s.points.join(", ")}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <a href="#contact-form" className={`relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ringDark}`}>Talk to us about this <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS: drop your existing <Testimonials /> component here and import it at the top of this file. */}

      {/* 6. PROCESS: flow diagram */}
      <section className="relative overflow-hidden bg-black py-24 text-white md:py-32" aria-label="How we work">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>live system</Acc></>]} />
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
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1] text-xl leading-none">+</span>Your business
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
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

      {/* 8. CONTACT FORM */}
      <section id="contact-form" data-nocursor className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start a project" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s talk</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>what&apos;s</Acc> <b className="font-bold">next.</b></>]} />
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
              <select name="service" required defaultValue="" className={field}>
                <option value="" disabled>Select a service</option>
                {services.map((s) => <option key={s.href}>{s.name}</option>)}
                <option>Something else</option>
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, features, timeline" /></label>
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
