"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * /services/website-development
 *
 * One self-contained file: no imports from your own files, no Nav, no Footer
 * (both live in app/layout.tsx).
 *
 * Sections: hero (animated browser and phone mock-ups with pointer parallax), the pinned
 * "build" animation, types of websites (live mock-ups), selected work (parallax showcase),
 * then what is included, process, related services, FAQ and the contact form.
 * Images are Unsplash links for now: swap the ids in PH, or the IMG() helper, for your own.
 *
 * Palette: cobalt, navy, white, black.
 * Includes the shared client stories section.
 */

import * as React from "react";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import { projects as caseStudies } from "../../projects/projects";
import type { Project } from "../../projects/ProjectsClient";
import { Poppins, Roboto, Roboto_Mono, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Bell, Check, Code2, Gauge, LayoutDashboard, Plus, Search, ShieldCheck, ShoppingCart, Smartphone, Star } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB"; // true cobalt: borders, buttons, accents on light backgrounds
const COBALT_HI = "#2F7BFF"; // lighter cobalt tint: the 3D object and glow on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const NAVY_DEEP = "#071A33";
const BLACK = "#02050B";
const WHITE = "#FFFFFF";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/website-development";

/* ------------------------------ CONTENT ------------------------------ */

const NAME = "Build";
const SPECS = ["Design to launch", "Next.js and React", "SEO built in", "Fast and secure", "CMS and lead forms"];
const TAGLINE = [{ text: "Websites" }, { text: "built to", small: true }, { text: "convert" }, { text: "every visit", small: true }];

// Hover or focus a type in frame 3 to read what it covers.
const TYPES: [string, string][] = [
  ["Company sites", "Clear, credible sites that explain what you do and earn enquiries."],
  ["E-commerce", "Fast stores with secure checkout and simple product management."],
  ["Web apps", "Dashboards, portals and tools that run in the browser."],
  ["Landing pages", "Focused pages built to lift conversions from campaigns."],
  ["CMS sites", "Edit your own content without calling a developer."],
  ["Portals", "Secure logins, accounts and member areas."],
  ["Redesigns", "A new look and faster code on top of what already works."],
  ["Performance", "Speed, accessibility and Core Web Vitals work on existing sites."],
];

const STATS = [["150+", "Projects delivered"], ["80+", "Clients worldwide"], ["98%", "Client satisfaction"]];

const included = [
  [Gauge, "Speed built in", "Optimised images, clean code and fast hosting so pages load quickly everywhere."],
  [Smartphone, "Responsive by default", "Every page designed and tested from small phones to wide desktops."],
  [Search, "SEO foundations", "Clean structure, metadata and structured data so search engines understand you."],
  [ShieldCheck, "Secure and reliable", "Hardened forms, safe dependencies and sensible hosting from day one."],
  [LayoutDashboard, "Easy to manage", "A CMS or admin panel so your team can update content without help."],
  [Code2, "Clean, scalable code", "Next.js, React and TypeScript, written to be easy to extend later."],
] as const;

const steps = [
  ["Discovery and strategy", "Goals, audience, pages and a plan we both sign off on."],
  ["UI/UX and wireframes", "Layouts and visual design you approve before any code."],
  ["Development", "Pages, components and integrations built and reviewed."],
  ["Testing and QA", "Devices, browsers, forms and speed checked before launch."],
  ["Launch", "Deployment, redirects and monitoring handled for you."],
  ["Support and growth", "Fixes, improvements and search growth after launch."],
] as const;

const related = [
  ["Digital Marketing", "/services/digital-marketing", "Campaigns that send the right visitors to your new site."],
  ["SEO", "/services/seo-optimization", "Technical and content SEO for steady organic growth."],
  ["UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
  ["Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps to go with your site."],
] as const;

const faqs = [
  ["What types of websites do you build?", "Company sites, e-commerce stores, landing pages, CMS-driven sites, portals and web apps. If it runs in a browser, we can build it."],
  ["Which technologies do you use?", "Mainly Next.js, React, TypeScript and Tailwind CSS, with a CMS or backend chosen to suit the project."],
  ["Will my website be fast and mobile friendly?", "Yes. Speed and responsive design are part of every build, and we test on real devices and browsers before launch."],
  ["Is SEO included?", "The technical foundations are: clean structure, metadata, structured data and speed. Ongoing content and ranking work is available as our SEO service."],
  ["Can I edit the content myself?", "Yes. We add a CMS or admin panel where it makes sense, so your team can update pages without a developer."],
  ["Can you redesign my existing website?", "Yes. We audit what you have, keep what works and rebuild what holds you back."],
  ["How long does a website take?", "It depends on scope. After a short discovery step we send a clear quote with deliverables and a timeline."],
  ["Do you support the site after launch?", "Yes. Support and growth is the last step of our process, covering fixes, improvements and monitoring."],
] as const;

const serviceOptions = ["Website Development", "Digital Marketing", "Custom Software", "Mobile Apps", "AI Automation", "UI/UX Design", "SEO", "Something else"];

const jsonLd = [
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

/* ------------------------------ SCROLL HELPERS ------------------------------ */

const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** 0 while the root's top sits at the stage's top, 1 when its bottom does. */
const progressFrom = (top: number, height: number, viewport: number) => {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp01(-top / travel);
};


/* ------------------------------ THE BUILD: A LINE TO A WEBSITE ------------------------------ */

/**
 * A pinned, scroll-driven walkthrough of how a site gets made: a line, a grid, a layout,
 * a typeface, a colour, a line of code, a button, a launch. Scroll sets one CSS variable,
 * --p (0 to 1), on the stage. Every element reads it through ramp() and fades, draws or
 * slides on its own interval, so the animation is plain CSS maths with no per-element JS.
 */

const mono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const INK = "#0B1F3B";
const BODY = "#3B4A63";
const GUIDE = "rgba(11,31,59,.55)";

/** CSS 0..1 ramp of --p between a and b */
const ramp = (a: number, b: number) => `clamp(0, calc((var(--p) - ${a}) / ${(b - a).toFixed(4)}), 1)`;
/** CSS 1..0 ramp */
const away = (a: number, b: number) => `calc(1 - ${ramp(a, b)})`;
/** visible between two ramps */
const between = (a: number, b: number, c: number, d: number) => `calc(${ramp(a, b)} * ${away(c, d)})`;

const BUILD_STEPS = [
  ["A line.", "Every website starts as a measurement: a size, a frame, a line."],
  ["A grid.", "Columns, gaps and a surface. The scaffolding everything lines up with later."],
  ["A layout.", "Lines become surfaces: navigation, headline, image, button. Order first, ornament later."],
  ["A typeface.", "Type is attitude. Size, weight and line breaks are tuned to every single line."],
  ["A colour.", "Navy, cobalt, black and white. A small palette, used with discipline."],
  ["A line of code.", "What we design, we also build. Clean, readable, no page builder."],
  ["A button.", "States, motion and focus: the details people feel without noticing."],
  ["A launch.", "Tested, deployed and monitored. Your site goes live, ready to grow."],
] as const;

type Seg = [string, "p" | "t" | "a" | "s" | "x"];
const CODE_A: Seg[][] = [
  [["<", "p"], ["Button", "t"], [" href", "a"], ["=", "p"], ['"/contact"', "s"], [">", "p"]],
  [["  Start a project", "x"]],
  [["</", "p"], ["Button", "t"], [">", "p"]],
  [],
  [[".btn", "t"], [" {", "p"]],
  [["  height", "a"], [": ", "p"], ["52px", "s"], [";", "p"]],
  [["  background", "a"], [": ", "p"], ["#0047AB", "s"], [";", "p"]],
  [["  border-radius", "a"], [": ", "p"], ["999px", "s"], [";", "p"]],
  [["}", "p"]],
];
const CODE_B: Seg[][] = [
  [],
  [[".btn:hover", "t"], [" {", "p"]],
  [["  background", "a"], [": ", "p"], ["#0B1F3B", "s"], [";", "p"]],
  [["}", "p"]],
];
const lineLen = (l: Seg[]) => l.reduce((n, s) => n + s[0].length, 0) + 1;
const LEN_A = CODE_A.reduce((n, l) => n + lineLen(l), 0);
const LEN_B = CODE_B.reduce((n, l) => n + lineLen(l), 0);
const codeColor: Record<Seg[1], string> = { p: "#7F93B5", t: "#6EA1FF", a: "#9DB8E8", s: "#FFFFFF", x: "#DCE7FB" };

function CodeLines({ lines, chars, start }: { lines: Seg[][]; chars: number; start: number }) {
  let left = chars;
  return (
    <>
      {lines.map((l, i) => {
        const shown: React.ReactNode[] = [];
        let used = 0;
        for (let k = 0; k < l.length && left > 0; k++) {
          const t = l[k][0].slice(0, left);
          shown.push(<span key={k} style={{ color: codeColor[l[k][1]] }}>{t}</span>);
          left -= t.length;
          used += t.length;
        }
        const full = used === l.reduce((n, s) => n + s[0].length, 0);
        if (full && left > 0) left -= 1;
        const visible = used > 0 || left > 0 || l.length === 0;
        return (
          <div key={i} className="flex" style={{ opacity: visible ? 1 : 0, minHeight: 24 }}>
            <span className="w-8 shrink-0 select-none text-right text-[#5F7396]">{start + i + 1}</span>
            <span className="ml-4 whitespace-pre">{shown}</span>
          </div>
        );
      })}
    </>
  );
}

const box = (x: number, y: number, w: number, h: number): React.CSSProperties => ({ position: "absolute", left: x, top: y, width: w, height: h });
const outline = `1.5px solid rgba(11,31,59,.78)`;

function BuildStage() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = React.useState(false);
  const [view, setView] = React.useState({ step: 0, pct: 0, a: 0, b: 0 });

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // fit the 1080 x 675 canvas to the stage
  React.useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const fit = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const top = W < 768 ? 120 : 108;
      const bottom = W < 768 ? 190 : 170;
      const k = Math.max(0.2, Math.min((W - (W < 768 ? 28 : 120)) / 1080, (H - top - bottom) / 745));
      canvas.style.transform = `translate(${((W - 1080 * k) / 2).toFixed(1)}px, ${(top + 32 * k).toFixed(1)}px) scale(${k.toFixed(4)})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (reduced) {
      stage.style.setProperty("--p", "1");
      setView({ step: 7, pct: 100, a: LEN_A, b: LEN_B });
      return;
    }
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let prog = -1;
    const r01 = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const r = root.getBoundingClientRect();
      const p = progressFrom(r.top, r.height, stage.clientHeight);
      prog = prog < 0 ? p : prog + (p - prog) * (1 - Math.exp(-dt * 10));
      stage.style.setProperty("--p", prog.toFixed(4));
      const next = {
        step: Math.min(BUILD_STEPS.length - 1, Math.floor(prog * BUILD_STEPS.length)),
        pct: Math.round(prog * 100),
        a: Math.floor(r01(prog, 0.635, 0.74) * LEN_A),
        b: Math.floor(r01(prog, 0.78, 0.84) * LEN_B),
      };
      setView((v) => (v.step === next.step && v.pct === next.pct && v.a === next.a && v.b === next.b ? v : next));
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  const [title, text] = BUILD_STEPS[view.step];
  const colW = (972 - 11 * 16) / 12;
  const pad = String(view.pct).padStart(3, "0");
  const swatches: [string, string][] = [[BLACK, "#02050B"], [NAVY, "#0B1F3B"], [COBALT, "#0047AB"], [WHITE, "#FFFFFF"]];

  return (
    <section ref={rootRef} className="relative w-full" style={{ height: reduced ? "auto" : "calc(100svh * 7.5)", background: "#F4F8FE" }} aria-label="How a website gets built, step by step">
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden select-none"
        style={{ height: "100svh", ["--p" as string]: reduced ? 1 : 0, backgroundColor: "#F4F8FE", backgroundImage: "radial-gradient(rgba(11,31,59,.16) 1px, transparent 1px)", backgroundSize: "22px 22px", color: INK } as React.CSSProperties}
      >
        {/* HUD */}
        <div className={`${mono.className} absolute left-5 top-24 text-[11px] leading-[1.6] md:left-8 md:top-28`}>
          <div className="text-[#5B6B84]">The build</div>
          <div>From a line to a website.</div>
        </div>
        <div className={`${mono.className} absolute right-5 top-24 text-right md:right-8 md:top-28`}>
          <div className="text-[11px] text-[#5B6B84]">Build progress</div>
          <div className={`${pop.className} text-[clamp(2.6rem,6vw,5.5rem)] font-extralight leading-none tracking-[-0.04em] text-[#0B1F3B]/15`} aria-hidden="true">
            {pad}<span className="text-[0.4em]">%</span>
          </div>
        </div>

        {/* the canvas: a 1080 x 675 browser, scaled to fit */}
        <div ref={canvasRef} className="absolute left-0 top-0" style={{ width: 1080, height: 675, transformOrigin: "0 0" }} aria-hidden="true">
          {/* dashed centre guide and the width measure */}
          <div style={{ ...box(540, -70, 0, 815), borderLeft: `1px dashed ${GUIDE}`, opacity: between(0.03, 0.08, 0.3, 0.38) }} />
          <div className={mono.className} style={{ ...box(0, -34, 1080, 20), opacity: between(0.02, 0.07, 0.3, 0.38), fontSize: 12, color: COBALT, textAlign: "center" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 1, background: COBALT, transformOrigin: "0 50%", transform: `scaleX(${ramp(0.02, 0.09)})` }} />
            <div style={{ position: "absolute", left: 0, top: 0, height: 9, width: 1, background: COBALT }} />
            <div style={{ position: "absolute", right: 0, top: 0, height: 9, width: 1, background: COBALT }} />
            <span style={{ position: "relative", top: -14, background: "#F4F8FE", padding: "0 8px" }}>1080 × 675</span>
          </div>

          {/* the frame draws itself */}
          <div style={{ ...box(0, 0, 1080, 675), borderRadius: 14, background: WHITE, opacity: ramp(0.06, 0.12), boxShadow: "0 40px 120px rgba(0,71,171,.12)" }} />
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 675, overflow: "visible" }}>
            <rect x={0.75} y={0.75} width={1078.5} height={673.5} rx={14} fill="none" stroke={INK} strokeOpacity={0.8} strokeWidth={1.5} pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${ramp(0, 0.075)})` }} />
            <line x1={0} y1={40} x2={1080} y2={40} stroke={INK} strokeOpacity={0.8} strokeWidth={1.5} pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${ramp(0.05, 0.1)})` }} />
          </svg>
          {[0, 1, 2].map((i) => <span key={i} style={{ position: "absolute", left: 20 + i * 18, top: 15, width: 10, height: 10, borderRadius: 99, background: i === 2 ? COBALT_HI : "#B9C6DC", opacity: ramp(0.08, 0.11) }} />)}
          <div className={mono.className} style={{ position: "absolute", right: 22, top: 10, fontSize: 12, color: COBALT, opacity: ramp(0.9, 0.94), display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: COBALT_HI, boxShadow: `0 0 10px ${COBALT_HI}` }} /> Live
          </div>

          {/* a grid */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ ...box(54 + i * (colW + 16), 40, colW, 635), background: "rgba(0,71,171,.07)", transformOrigin: "50% 0", transform: `scaleY(${ramp(0.13 + i * 0.004, 0.19 + i * 0.004)})`, opacity: away(0.38, 0.45) }} />
          ))}
          {[150, 300, 560].map((y, i) => (
            <div key={y} style={{ ...box(-340, y, 1760, 1), background: i === 1 ? COBALT : GUIDE, opacity: between(0.14 + i * 0.01, 0.2 + i * 0.01, 0.27, 0.33), transformOrigin: "0 50%", transform: `scaleX(${ramp(0.14 + i * 0.01, 0.21 + i * 0.01)})` }} />
          ))}
          <div style={{ ...box(82, 362, 236, 236), border: `1.5px solid ${COBALT}`, borderRadius: 999, opacity: between(0.17, 0.21, 0.25, 0.3), transform: `scale(${ramp(0.17, 0.22)})` }}>
            <span style={{ position: "absolute", left: 111, top: 111, width: 12, height: 12, borderRadius: 99, background: COBALT }} />
            <span className={mono.className} style={{ position: "absolute", left: 244, top: 112, fontSize: 12, color: COBALT }}>r 118</span>
          </div>

          {/* a layout: logo, nav, headline, paragraph, buttons, image */}
          <div style={{ ...box(54, 78, 120, 34), border: outline, borderRadius: 4, opacity: between(0.25, 0.3, 0.38, 0.43) }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...box(636 + i * 104, 80, 94, 32), border: outline, borderRadius: 99, opacity: ramp(0.26 + i * 0.01, 0.31 + i * 0.01), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: INK }}>
              <span style={{ opacity: ramp(0.4, 0.45) }}>{["Work", "Services", "About"][i]}</span>
            </div>
          ))}
          <div style={{ ...box(54, 186, 540, 160), border: outline, borderRadius: 6, opacity: between(0.27, 0.32, 0.38, 0.43) }}>
            <span style={{ ...box(10, 12, 230, 44), background: "rgba(11,31,59,.14)" }} />
            <span style={{ ...box(10, 70, 430, 60), background: "rgba(11,31,59,.14)" }} />
          </div>
          <div style={{ ...box(54, 392, 440, 72), border: outline, borderRadius: 6, opacity: between(0.29, 0.34, 0.43, 0.48) }}>
            <span style={{ ...box(8, 14, 400, 10), background: "rgba(11,31,59,.14)" }} />
            <span style={{ ...box(8, 36, 300, 10), background: "rgba(11,31,59,.14)" }} />
          </div>
          <div style={{ ...box(626, 140, 400, 450), border: outline, borderRadius: 8, opacity: ramp(0.3, 0.35) }}>
            <svg width={400} height={450} style={{ position: "absolute", inset: 0, opacity: away(0.5, 0.56) }}>
              <line x1={0} y1={0} x2={400} y2={450} stroke={INK} strokeOpacity={0.6} />
              <line x1={400} y1={0} x2={0} y2={450} stroke={INK} strokeOpacity={0.6} />
            </svg>
          </div>

          {/* a typeface */}
          <div className={pop.className} style={{ ...box(54, 78, 160, 34), display: "flex", alignItems: "center", fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", opacity: ramp(0.4, 0.45) }}>
            devntom<span style={{ color: COBALT, opacity: ramp(0.52, 0.56) }}>.</span><span style={{ color: INK, opacity: away(0.52, 0.56), position: "absolute", left: 117 }}>.</span>
          </div>
          <div className={pop.className} style={{ ...box(54, 188, 560, 140), fontSize: 64, lineHeight: "70px", letterSpacing: "-0.04em", fontWeight: 200 }}>
            {["Websites built", "to perform."].map((t, i) => (
              <div key={t} style={{ overflow: "hidden", height: 70 }}>
                <div style={{ transform: `translateY(calc((1 - ${ramp(0.38 + i * 0.015, 0.44 + i * 0.015)}) * 110%))`, position: "relative" }}>
                  {i === 1 ? (
                    <>
                      to <b style={{ fontWeight: 700, position: "relative" }}>perform.<b style={{ position: "absolute", left: 0, top: 0, fontWeight: 700, color: COBALT, opacity: ramp(0.52, 0.57) }}>perform.</b></b>
                    </>
                  ) : t}
                </div>
              </div>
            ))}
          </div>
          <div className={mono.className} style={{ ...box(54, 356, 540, 20), fontSize: 12, color: COBALT, textAlign: "center", opacity: between(0.3, 0.35, 0.74, 0.8) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: COBALT }} />
            <span style={{ position: "relative", top: 6, background: WHITE, padding: "0 6px" }}>540</span>
          </div>
          <p style={{ ...box(54, 396, 430, 70), margin: 0, fontSize: 18, lineHeight: "28px", color: BODY, fontWeight: 300, opacity: ramp(0.44, 0.49) }}>
            Fast, secure, responsive websites built with Next.js and React, from first sketch to launch.
          </p>

          {/* buttons: outline, then fill, then hover */}
          <div style={{ ...box(54, 480, 196, 52), border: outline, borderRadius: 99, opacity: ramp(0.31, 0.36), overflow: "hidden" }}>
            <span style={{ ...box(0, 0, 196, 52), background: COBALT, opacity: ramp(0.5, 0.55) }} />
            <span style={{ ...box(0, 0, 196, 52), background: NAVY, opacity: ramp(0.8, 0.84) }} />
            <span className={rob.className} style={{ position: "absolute", left: 24, top: 0, height: 52, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500, color: INK, opacity: calcMix(0.46, 0.5, 0.5, 0.55) }}>Start a project</span>
            <span className={rob.className} style={{ position: "absolute", left: 24, top: 0, height: 52, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500, color: WHITE, opacity: ramp(0.5, 0.55) }}>Start a project</span>
            <span style={{ position: "absolute", right: 7, top: 7, width: 38, height: 38, borderRadius: 99, background: WHITE, opacity: ramp(0.51, 0.56), display: "flex", alignItems: "center", justifyContent: "center", color: COBALT, transform: `translateX(calc(${ramp(0.82, 0.86)} * -4px))` }}>
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </div>
          <div style={{ ...box(54, 480, 196, 52), borderRadius: 99, border: `2px solid ${COBALT}`, opacity: `calc(${ramp(0.85, 0.88)} * (1 - ${ramp(0.85, 0.88)}) * 4)`, transform: `scale(calc(1 + ${ramp(0.85, 0.9)} * 0.3))` }} />
          <div className={rob.className} style={{ ...box(264, 480, 170, 52), border: outline, borderRadius: 99, opacity: ramp(0.32, 0.37), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 500, color: INK }}>
            <span style={{ opacity: ramp(0.46, 0.5) }}>See our work</span>
          </div>
          {/* button height measure */}
          <div className={mono.className} style={{ ...box(22, 480, 28, 52), opacity: between(0.31, 0.36, 0.86, 0.9), fontSize: 12, color: COBALT }}>
            <span style={{ position: "absolute", left: 18, top: 0, width: 1, height: 52, background: COBALT }} />
            <span style={{ position: "absolute", left: 13, top: 0, width: 11, height: 1, background: COBALT }} />
            <span style={{ position: "absolute", left: 13, bottom: 0, width: 11, height: 1, background: COBALT }} />
            <span style={{ position: "absolute", left: -6, top: 18 }}>52</span>
          </div>
          {/* image height measure */}
          <div className={mono.className} style={{ ...box(1040, 140, 40, 450), opacity: between(0.31, 0.36, 0.5, 0.56), fontSize: 12, color: COBALT }}>
            <span style={{ position: "absolute", left: 6, top: 0, width: 1, height: 450, background: COBALT }} />
            <span style={{ position: "absolute", left: 14, top: 215 }}>450</span>
          </div>

          {/* a colour: the image fills, the palette appears */}
          <div style={{ ...box(626, 140, 400, 450), borderRadius: 8, overflow: "hidden", opacity: ramp(0.52, 0.6), background: `linear-gradient(140deg, ${NAVY} 0%, ${COBALT} 100%)` }}>
            <div style={{ ...box(36, 40, 328, 190), borderRadius: 10, background: "rgba(255,255,255,.96)", transform: `translateY(calc((1 - ${ramp(0.56, 0.62)}) * 30px))`, opacity: ramp(0.56, 0.62), padding: 18 }}>
              <span style={{ display: "block", height: 10, width: 120, borderRadius: 9, background: "#CFE0FA" }} />
              <span style={{ display: "block", height: 8, width: 200, borderRadius: 9, background: "#E3ECFB", marginTop: 10 }} />
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90, marginTop: 22 }}>
                {[40, 62, 48, 80, 66, 90].map((h, i) => <span key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? COBALT : "#9DBDF2", borderRadius: "4px 4px 0 0" }} />)}
              </div>
            </div>
            <div style={{ ...box(36, 256, 154, 150), borderRadius: 10, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)" }} />
            <div style={{ ...box(210, 256, 154, 150), borderRadius: 10, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)" }} />
          </div>
          <div className={mono.className} style={{ ...box(54, 704, 480, 34), display: "flex", gap: 22, fontSize: 12, color: BODY, opacity: between(0.52, 0.57, 0.62, 0.67) }}>
            {swatches.map(([c, h]) => (
              <span key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: c, border: "1px solid rgba(11,31,59,.25)" }} />
                {h}
              </span>
            ))}
          </div>

          {/* a line of code */}
          <div className={mono.className} style={{ ...box(596, 150, 470, 340), borderRadius: 10, background: "#071223", boxShadow: "0 30px 80px rgba(2,5,11,.35)", opacity: between(0.62, 0.67, 0.88, 0.93), transform: `translateX(calc((1 - ${ramp(0.62, 0.67)}) * 40px))`, color: "#DCE7FB", fontSize: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 11, letterSpacing: "0.12em", color: "#9DB8E8" }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: COBALT_HI }} /> BUTTON.TSX
            </div>
            <div style={{ padding: "18px 18px 0", lineHeight: "24px" }}>
              <CodeLines lines={CODE_A} chars={view.a} start={0} />
              <CodeLines lines={CODE_B} chars={view.a >= LEN_A - 1 ? view.b : 0} start={CODE_A.length} />
            </div>
          </div>

          {/* a button: the pointer arrives, hovers and clicks */}
          <svg width={26} height={26} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0, opacity: between(0.74, 0.77, 0.9, 0.94), transform: `translate(calc(880px + ${ramp(0.74, 0.8)} * -740px), calc(300px + ${ramp(0.74, 0.8)} * 210px)) scale(calc(1 - ${ramp(0.84, 0.86)} * 0.15 + ${ramp(0.86, 0.88)} * 0.15))`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))" }}>
            <path d="M5 3l14 8-6.2 1.6L9.5 19 5 3z" fill={INK} stroke={WHITE} strokeWidth={1.4} strokeLinejoin="round" />
          </svg>

          {/* a launch */}
          <a href="#contact-form" className={`${rob.className} group inline-flex items-center gap-3 rounded-full bg-[#0047AB] text-white transition hover:bg-[#0B1F3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] focus-visible:ring-offset-2`} style={{ position: "absolute", right: 0, top: 698, height: 52, padding: "0 28px", fontSize: 16, fontWeight: 500, opacity: ramp(0.92, 0.97), pointerEvents: "auto" }}>
            Start your website <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        {/* step caption */}
        <div className="pointer-events-none absolute bottom-6 left-5 max-w-[min(30rem,70vw)] md:bottom-8 md:left-8">
          <div className={`${mono.className} flex items-center gap-3 text-[11px]`}>
            <span className="text-[#0047AB]">{String(view.step + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-[#0B1F3B]/40" />
            <span className="text-[#5B6B84]">{String(BUILD_STEPS.length).padStart(2, "0")}</span>
          </div>
          <div key={view.step} style={{ animation: "bsin .5s cubic-bezier(.16,1,.3,1) both" }}>
            <p className={`${pop.className} mt-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.04em]`}>{title}</p>
            <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-[#3B4A63]">{text}</p>
          </div>
        </div>
        <a href="#types" className={`${mono.className} absolute bottom-6 right-5 flex items-center gap-2 rounded-[3px] text-[11px] text-[#0B1F3B] hover:text-[#0047AB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] md:bottom-8 md:right-8`}>
          Skip the build <ArrowRight size={13} className="rotate-90" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/** opacity that is 1 until a..b ramps the element out, then 0: a text that fades before its twin fades in */
function calcMix(inA: number, inB: number, outA: number, outB: number) {
  return `calc(${ramp(inA, inB)} * ${away(outA, outB)})`;
}


/* ------------------------------ IMAGES ------------------------------ */

// Online images for now (Unsplash). Swap these ids, or the whole IMG() helper, for your own files in /public.
const IMG = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const PH = {
  laptop: "1498050108023-c5249f4df085",
  code: "1461749280684-dccba630e2f6",
  desk: "1507238691740-187a5b1d37b8",
  team: "1522202176988-66273c2fd55f",
  office: "1497366216548-37526070297c",
  dashboard: "1551288049-bebda4e38f71",
  watch: "1523275335684-37898b6baf30",
  headphones: "1505740420928-5e560c06d30e",
  shoes: "1542291026-7eec264c27ff",
  sunglasses: "1572635196237-14b3f281503f",
  writer: "1499750310107-5fef28a66643",
  notes: "1455390582262-044cdead277a",
  design: "1559028012-481c04fa702d",
  typing: "1486312338219-ce68d2c6f44d",
  workspace: "1531403009284-440f080d1e12",
  meeting: "1519389950473-47ba0277781c",
  store: "1441986300917-64674bd600d8",
};

/** A photo that fills its (relative) parent. If the link fails the parent's gradient shows instead. */
function Img({ src, alt = "", className = "", style }: { src: string; alt?: string; className?: string; style?: React.CSSProperties }) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [ok, setOk] = React.useState(true);
  React.useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setOk(false);
  }, []);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={ref} src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setOk(false)} className={`absolute inset-0 h-full w-full object-cover ${className}`} style={style} />
  );
}

/* ------------------------------ BROWSER MOCK-UP KIT ------------------------------ */

const pp = (i: number) => ({ ["--i" as string]: i } as React.CSSProperties);

/** Lays out children at a fixed design size, then scales the whole thing to fit its container. */
function Scaled({ w, h, children, className = "" }: { w: number; h: number; children: React.ReactNode; className?: string }) {
  const box = React.useRef<HTMLDivElement>(null);
  const [s, setS] = React.useState(0.6);
  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setS(el.clientWidth / w);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: "0 0", position: "absolute", left: 0, top: 0 }}>{children}</div>
    </div>
  );
}

/** Browser window, 760 x 475 design px: 34px chrome and a 441px page. */
function Browser({ url, children, dark = false }: { url: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex h-[475px] w-[760px] flex-col overflow-hidden bg-white">
      <div className="flex h-[34px] shrink-0 items-center gap-2 border-b px-4" style={{ background: dark ? "#0A1B38" : "#F1F5FC", borderColor: dark ? "rgba(255,255,255,.1)" : "#DCE5F5" }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#C3CFE6]" /><span className="h-2.5 w-2.5 rounded-full bg-[#C3CFE6]" /><span className="h-2.5 w-2.5 rounded-full bg-[#2F7BFF]" />
        <span className="ml-3 flex h-[20px] w-[250px] items-center rounded-full px-3 text-[10px]" style={{ background: dark ? "rgba(255,255,255,.08)" : "#FFFFFF", color: dark ? "#9DB8E8" : "#5B6B84" }}>{url}</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function MiniLogo({ color = NAVY, name = "yourbrand" }: { color?: string; name?: string }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="18" height="19" viewBox="0 0 26 28" aria-hidden>
        {[10, 18, 26, 16, 22].map((h, i) => <rect key={i} x={i * 5.6} y={28 - h} width="3.6" height={h} rx="1.2" fill={i === 2 ? COBALT_HI : color} />)}
      </svg>
      <span className={`${pop.className} text-[15px] font-semibold tracking-[-0.03em]`} style={{ color }}>{name}</span>
    </span>
  );
}

/* ------------------------------ HERO ------------------------------ */

const techs = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "Vercel", "Figma"];

function HeroPage() {
  return (
    <Browser url="yourbrand.com">
      <div className="flex h-full flex-col bg-white text-[#0B1F3B]">
        <div className="flex items-center justify-between px-9 pt-6">
          <MiniLogo />
          <div className="flex items-center gap-7 text-[13px] text-[#3B4A63]"><span>Work</span><span>Services</span><span>About</span><span className="rounded-full bg-[#0047AB] px-5 py-2.5 font-medium text-white">Get a quote</span></div>
        </div>
        <div className="grid flex-1 grid-cols-12 items-center gap-8 px-9">
          <div className="col-span-6">
            <span className="wf-pop inline-flex rounded-full bg-[#E3ECFB] px-3 py-1 text-[11px] font-medium text-[#0047AB]" style={pp(0)}>Now booking for autumn</span>
            <h3 className={`${pop.className} wf-pop mt-4 text-[44px] font-semibold leading-[1] tracking-[-0.045em]`} style={pp(1)}>A site that works as hard as you do.</h3>
            <p className="wf-pop mt-4 text-[14px] leading-relaxed text-[#3B4A63]" style={pp(2)}>Fast pages, clear messages and a simple way to get in touch.</p>
            <div className="wf-pop mt-6 flex gap-3" style={pp(3)}>
              <span className="rounded-full bg-[#0B1F3B] px-6 py-3 text-[13px] font-medium text-white">Book a call</span>
              <span className="rounded-full border border-[#0B1F3B]/25 px-6 py-3 text-[13px] font-medium">See pricing</span>
            </div>
          </div>
          <div className="relative col-span-6 h-[260px]">
            <div className="absolute inset-0 overflow-hidden rounded-[16px]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT})` }}><Img src={IMG(PH.laptop)} /></div>
            <div className="mk-float absolute -left-7 bottom-7 flex items-center gap-3 rounded-[12px] bg-white px-4 py-3 shadow-[0_18px_50px_rgba(2,5,11,.25)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0047AB] text-white"><Check size={14} strokeWidth={3} /></span>
              <span className="text-[12px] font-medium">Booking confirmed</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 px-9 pb-6">
          {["Fast", "Secure", "Easy to edit"].map((t, i) => (
            <div key={t} className="wf-pop flex items-center gap-3 rounded-[10px] border border-[#DCE5F5] p-3" style={pp(4 + i)}>
              <span className="h-8 w-8 rounded-[8px] bg-[#E3ECFB]" /><span className="text-[12px] font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

function Hero() {
  const ref = React.useRef<HTMLElement>(null);

  // pointer parallax: --mx and --my glide between -1 and 1, and the layers read them in CSS
  React.useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, visible = true;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  const layer = (x: number, y: number) => ({ transform: `translate3d(calc(var(--mx,0) * ${x}px), calc(var(--my,0) * ${y}px), 0)` } as React.CSSProperties);

  return (
    <section ref={ref} className="relative isolate overflow-hidden text-white" aria-label="Website development" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[100svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-6">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            Website development · Lahore · Riyadh · London
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.7rem,6.4vw,6.2rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Websites that", <><b className="font-bold">win</b> <Acc>customers.</Acc></>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            Fast, secure, responsive websites designed and built by one team, from the first sketch to launch day.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <a href="#contact-form" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Start a project <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#work" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>See our work</a>
          </div>
          <ul className="rv mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#DCE7FB]" style={{ transitionDelay: "350ms" }}>
            {["Built with Next.js and React", "SEO built in", "Support after launch"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>

        {/* the device stack */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-[660px] lg:col-span-6">
          <div className="relative aspect-[6/5]">
            <div className="absolute left-0 top-[6%] w-[88%]" style={layer(-10, -8)}>
              <div className="mk-float-slow">
                <Scaled w={760} h={475} className="rounded-[12px] shadow-[0_50px_120px_rgba(0,71,171,.5)] ring-1 ring-white/20"><HeroPage /></Scaled>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[27%]" style={layer(18, 12)}>
              <div className="mk-float">
                <div className="relative aspect-[9/18] overflow-hidden rounded-[22px] border-[5px] border-[#0B1F3B] bg-white shadow-[0_40px_90px_rgba(2,5,11,.6)] ring-1 ring-white/25">
                  <div className="absolute left-1/2 top-0 z-10 h-3 w-14 -translate-x-1/2 rounded-b-[8px] bg-[#0B1F3B]" />
                  <div className="relative mt-5 h-[40%]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT})` }}><Img src={IMG(PH.laptop, 600)} /></div>
                  <div className="space-y-2 p-3">
                    <span className="block h-2.5 w-4/5 rounded-full bg-[#0B1F3B]" />
                    <span className="block h-2 w-3/5 rounded-full bg-[#CFE0FA]" />
                    <span className="mt-3 block h-7 rounded-full bg-[#0047AB]" />
                    <span className="block h-7 rounded-full border border-[#CBD8EE]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-2 right-[6%]" style={layer(26, -18)}>
              <div className="mk-float flex items-center gap-3 rounded-full border border-white/25 bg-[#0B1F3B]/80 px-5 py-3 text-sm backdrop-blur"><Smartphone size={16} className="text-[#6EA1FF]" />Responsive</div>
            </div>
            <div className="absolute bottom-[14%] left-[-4%]" style={layer(30, 16)}>
              <div className="mk-float-slow flex items-center gap-3 rounded-full border border-white/25 bg-[#0B1F3B]/80 px-5 py-3 text-sm backdrop-blur"><Search size={16} className="text-[#6EA1FF]" />SEO-ready</div>
            </div>
            <div className="absolute bottom-[-2%] left-[34%]" style={layer(22, 22)}>
              <div className="mk-float flex items-center gap-3 rounded-full border border-white/25 bg-[#0B1F3B]/80 px-5 py-3 text-sm backdrop-blur"><ShieldCheck size={16} className="text-[#6EA1FF]" />Secure</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 py-5 backdrop-blur-sm" aria-label="Tools we build with">
        <div className="overflow-hidden">
          <div className="mq flex w-max items-center gap-14 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-white/60">
            {[...techs, ...techs, ...techs, ...techs].map((t, i) => <span key={i} className="flex items-center gap-14">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TYPES OF WEBSITES ------------------------------ */

const bar = (w: string, extra = "") => <span className={`block h-2 rounded-full bg-[#DCE5F5] ${extra}`} style={{ width: w }} />;

function MockCompany() {
  return (
    <Browser url="harbourlaw.co">
      <div className="flex h-full flex-col bg-white text-[#0B1F3B]">
        <div className="flex items-center justify-between px-9 pt-5">
          <MiniLogo name="harbour" />
          <div className="flex items-center gap-6 text-[12px] text-[#3B4A63]"><span>Services</span><span>Team</span><span>Insights</span><span className="rounded-full bg-[#0B1F3B] px-4 py-2 font-medium text-white">Contact</span></div>
        </div>
        <div className="grid grid-cols-12 items-center gap-8 px-9 pt-6">
          <div className="col-span-6">
            <span className="wf-pop inline-block rounded-full bg-[#E3ECFB] px-3 py-1 text-[11px] font-medium text-[#0047AB]" style={pp(0)}>Trusted advisers</span>
            <h3 className={`${pop.className} wf-pop mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.045em]`} style={pp(1)}>Clear advice for growing firms.</h3>
            <p className="wf-pop mt-3 text-[13px] leading-relaxed text-[#3B4A63]" style={pp(2)}>Practical guidance on contracts, hiring and growth, without the jargon.</p>
            <div className="wf-pop mt-5 flex gap-3 text-[12px] font-medium" style={pp(3)}><span className="rounded-full bg-[#0047AB] px-5 py-2.5 text-white">Book a consultation</span><span className="rounded-full border border-[#0B1F3B]/25 px-5 py-2.5">Our services</span></div>
          </div>
          <div className="relative col-span-6 h-[200px] overflow-hidden rounded-[14px]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT})` }}>
            <Img src={IMG(PH.office)} />
            <div className="mk-float absolute bottom-3 left-3 right-3 rounded-[10px] bg-white/95 p-3 text-[11px] shadow-lg"><div className="flex gap-0.5 text-[#0047AB]">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={11} fill="currentColor" />)}</div><p className="mt-1 text-[#3B4A63]">&ldquo;Clear, quick and genuinely helpful.&rdquo;</p></div>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-4 px-9 pb-6">
          {["Contracts", "Employment", "Property"].map((t, i) => (
            <div key={t} className="wf-pop rounded-[10px] border border-[#DCE5F5] p-4" style={pp(4 + i)}>
              <span className="mb-3 block h-7 w-7 rounded-[8px] bg-[#E3ECFB]" /><p className="text-[12px] font-semibold">{t}</p>{bar("70%", "mt-2")}
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

function MockStore() {
  const items: [string, string, string][] = [["Classic watch", "$129", PH.watch], ["Wireless headphones", "$89", PH.headphones], ["Running shoes", "$74", PH.shoes], ["Sunglasses", "$58", PH.sunglasses]];
  return (
    <Browser url="shop.northfield.store">
      <div className="relative flex h-full flex-col bg-[#F7F9FD] text-[#0B1F3B]">
        <div className="bg-[#0B1F3B] py-1.5 text-center text-[10px] tracking-wide text-white/80">Free delivery on orders over $50</div>
        <div className="flex items-center justify-between bg-white px-8 py-3">
          <MiniLogo name="northfield" />
          <div className="flex h-8 w-[230px] items-center gap-2 rounded-full bg-[#F1F5FC] px-4 text-[11px] text-[#5B6B84]"><Search size={13} />Search products</div>
          <span className="relative"><ShoppingCart size={20} /><span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0047AB] text-[9px] font-bold text-white">2</span></span>
        </div>
        <div className="flex items-end justify-between px-8 pt-5">
          <h3 className={`${pop.className} text-[26px] font-semibold tracking-[-0.04em]`}>New arrivals</h3>
          <div className="flex gap-2 text-[11px]">{["All", "Watches", "Audio", "Shoes"].map((t, i) => <span key={t} className={`rounded-full px-3.5 py-1.5 ${i === 0 ? "bg-[#0B1F3B] text-white" : "border border-[#CBD8EE]"}`}>{t}</span>)}</div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-8 pt-4">
          {items.map(([n, p, id], i) => (
            <div key={n} className="wf-pop" style={pp(i)}>
              <div className="relative h-[150px] overflow-hidden rounded-[10px] bg-[#E3ECFB]"><Img src={IMG(id, 500)} /><span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0047AB] shadow"><Plus size={13} /></span></div>
              <p className="mt-2 text-[12px] font-medium">{n}</p>
              <div className="flex items-center justify-between"><span className="text-[12px] text-[#0047AB]">{p}</span><span className="flex gap-0.5 text-[#0047AB]">{[0, 1, 2, 3].map((k) => <Star key={k} size={9} fill="currentColor" />)}</span></div>
            </div>
          ))}
        </div>
        <div className="mk-toast absolute bottom-4 right-5 flex items-center gap-3 rounded-[12px] bg-[#0B1F3B] px-4 py-3 text-[12px] text-white shadow-[0_20px_50px_rgba(2,5,11,.35)]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F7BFF]"><Check size={13} strokeWidth={3} /></span>Added to cart
        </div>
      </div>
    </Browser>
  );
}

function MockLanding() {
  return (
    <Browser url="launchkit.io/start" dark>
      <div className="relative flex h-full flex-col items-center overflow-hidden px-10 pt-6 text-center text-white" style={{ background: `radial-gradient(80% 70% at 50% 0%, ${COBALT} 0%, ${NAVY} 55%, ${BLACK} 100%)` }}>
        <div className="flex w-full items-center justify-between text-[12px] text-white/75"><MiniLogo color="#fff" name="launchkit" /><span className="rounded-full border border-white/30 px-4 py-1.5">Sign in</span></div>
        <span className="wf-pop mt-7 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px]" style={pp(0)}>New: automated onboarding</span>
        <h3 className={`${pop.className} wf-pop mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.045em]`} style={pp(1)}>Launch your product<br />in days, not months.</h3>
        <div className="wf-pop mt-5 flex w-[400px] items-center rounded-full bg-white p-1.5 text-[#0B1F3B]" style={pp(2)}>
          <span className="flex-1 pl-4 text-left text-[12px] text-[#5B6B84]">you@company.com</span><span className="rounded-full bg-[#0047AB] px-5 py-2.5 text-[12px] font-medium text-white">Get early access</span>
        </div>
        <div className="wf-pop mt-4 flex items-center gap-3 text-[11px] text-white/75" style={pp(3)}>
          <span className="flex -space-x-2">{[PH.team, PH.meeting, PH.desk].map((id) => <span key={id} className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-[#0B1F3B] bg-[#2F7BFF]"><Img src={IMG(id, 100)} /></span>)}</span>
          Loved by product teams
        </div>
        <div className="wf-pop relative mt-5 h-[120px] w-[560px] overflow-hidden rounded-t-[14px] border border-white/20 bg-white/10 shadow-[0_-20px_80px_rgba(47,123,255,.35)]" style={pp(4)}><Img src={IMG(PH.dashboard, 900)} className="opacity-90" /></div>
      </div>
    </Browser>
  );
}

function MockApp() {
  return (
    <Browser url="app.flowdesk.io/dashboard" dark>
      <div className="flex h-full bg-[#071A33] text-white">
        <div className="flex w-[64px] flex-col items-center gap-4 border-r border-white/10 bg-[#050E1F] py-5">
          <span className="h-7 w-7 rounded-[8px] bg-[#2F7BFF]" />
          {[0, 1, 2, 3].map((k) => <span key={k} className="h-6 w-6 rounded-[6px] border border-white/20" />)}
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between"><h3 className={`${pop.className} text-[18px] font-semibold tracking-[-0.03em]`}>Overview</h3><div className="flex items-center gap-3"><span className="flex h-7 w-[150px] items-center gap-2 rounded-full bg-white/10 px-3 text-[10px] text-white/60"><Search size={11} />Search</span><Bell size={15} className="text-white/60" /><span className="relative h-7 w-7 overflow-hidden rounded-full bg-[#2F7BFF]"><Img src={IMG(PH.team, 100)} /></span></div></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Active users", "Tasks done", "Response time"].map((t, i) => (
              <div key={t} className="wf-pop rounded-[10px] border border-white/10 bg-white/[0.05] p-3" style={pp(i)}>
                <p className="text-[10px] text-white/60">{t}</p>
                <span className="mt-2 block h-3.5 w-14 rounded-full bg-white/80" />
                <svg viewBox="0 0 100 24" className="mt-2 h-6 w-full"><path className="sw-line" pathLength={1} d={i === 1 ? "M0 20 L20 16 L40 18 L60 8 L80 10 L100 3" : i === 2 ? "M0 6 L20 10 L40 8 L60 14 L80 12 L100 18" : "M0 18 L20 12 L40 14 L60 6 L80 9 L100 2"} fill="none" stroke={COBALT_TEXT} strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-3">
            <div className="wf-pop col-span-3 rounded-[10px] border border-white/10 bg-white/[0.05] p-3" style={pp(3)}>
              <p className="text-[10px] text-white/60">Weekly activity</p>
              <div className="mt-2 flex h-[110px] items-end gap-2">{[40, 62, 48, 80, 66, 92, 74].map((h, k) => <span key={k} className="mk-grow flex-1 rounded-t-[4px] bg-gradient-to-t from-[#0047AB] to-[#2F7BFF]" style={{ height: `${h}%`, animationDelay: `${k * 70 + 300}ms` }} />)}</div>
            </div>
            <div className="wf-pop col-span-2 space-y-2 rounded-[10px] border border-white/10 bg-white/[0.05] p-3" style={pp(4)}>
              <p className="text-[10px] text-white/60">Recent activity</p>
              {[["Invoice sent", "Done"], ["New signup", "New"], ["Report ready", "Done"]].map(([t, s], k) => <div key={k} className="flex items-center justify-between"><span className="flex items-center gap-2 text-[11px]"><span className="h-5 w-5 rounded-full bg-white/15" />{t}</span><span className={`rounded-full px-2 py-0.5 text-[9px] ${s === "New" ? "bg-[#2F7BFF] text-white" : "bg-white/10 text-white/70"}`}>{s}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function MockCMS() {
  const posts: [string, string][] = [["5 ways to speed up your site", PH.laptop], ["Designing for trust", PH.design], ["Content that ranks", PH.notes]];
  return (
    <Browser url="studio.pressroom.cms/edit">
      <div className="flex h-full bg-[#F7F9FD] text-[#0B1F3B]">
        <div className="w-[200px] space-y-2 border-r border-[#DCE5F5] bg-white p-3">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-[#5B6B84]">Posts</p>
          {posts.map(([t, id], i) => (
            <div key={t} className={`wf-pop flex items-center gap-2 rounded-[8px] p-2 ${i === 0 ? "bg-[#E3ECFB]" : ""}`} style={pp(i)}>
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[6px] bg-[#CFE0FA]"><Img src={IMG(id, 120)} /></span><span className="text-[11px] font-medium leading-tight">{t}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">{["B", "I", "H1", "“”", "↗"].map((t) => <span key={t} className="flex h-7 min-w-7 items-center justify-center rounded-[6px] border border-[#DCE5F5] bg-white px-1.5 text-[11px] font-semibold">{t}</span>)}</div>
            <span className="rounded-full bg-[#0047AB] px-5 py-2 text-[11px] font-medium text-white">Publish</span>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-[10px] border border-[#DCE5F5] bg-white p-4">
              <h3 className={`${pop.className} text-[20px] font-semibold tracking-[-0.03em]`}>5 ways to speed up your site<span className="mk-caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-[#0047AB]" /></h3>
              <div className="relative mt-3 h-[96px] overflow-hidden rounded-[8px] bg-[#CFE0FA]"><Img src={IMG(PH.laptop, 800)} /></div>
              <div className="mt-3 space-y-2">{bar("100%")}{bar("92%")}{bar("96%")}{bar("60%")}</div>
            </div>
            <div className="col-span-4 space-y-3">
              <div className="wf-pop rounded-[10px] border border-[#DCE5F5] bg-white p-3" style={pp(3)}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5B6B84]">SEO</p>
                <span className="mt-2 block rounded-[6px] bg-[#F1F5FC] px-2 py-1.5 text-[10px] text-[#3B4A63]">Meta title</span>
                <span className="mt-1.5 block rounded-[6px] bg-[#F1F5FC] px-2 py-3 text-[10px] text-[#3B4A63]">Meta description</span>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#E3ECFB] px-2 py-0.5 text-[10px] font-medium text-[#0047AB]"><Check size={10} strokeWidth={3} />Looks good</span>
              </div>
              <div className="wf-pop rounded-[10px] border border-[#DCE5F5] bg-white p-3 text-[10px]" style={pp(4)}><p className="font-semibold uppercase tracking-wider text-[#5B6B84]">Schedule</p><p className="mt-2 text-[#3B4A63]">Tomorrow, 9:00</p></div>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function MockRedesign() {
  return (
    <Browser url="yourbrand.com">
      <div className="relative h-full overflow-hidden bg-white text-[#0B1F3B]">
        {/* after */}
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-9 pt-5"><MiniLogo /><div className="flex items-center gap-6 text-[12px] text-[#3B4A63]"><span>Work</span><span>Services</span><span className="rounded-full bg-[#0047AB] px-4 py-2 font-medium text-white">Contact</span></div></div>
          <div className="grid grid-cols-12 items-center gap-8 px-9 pt-8">
            <div className="col-span-6"><h3 className={`${pop.className} text-[40px] font-semibold leading-[1.02] tracking-[-0.045em]`}>Modern, fast and easy to use.</h3><p className="mt-3 text-[13px] leading-relaxed text-[#3B4A63]">The same business, a far clearer story.</p><span className="mt-5 inline-block rounded-full bg-[#0B1F3B] px-6 py-3 text-[12px] font-medium text-white">Get started</span></div>
            <div className="relative col-span-6 h-[210px] overflow-hidden rounded-[14px]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT})` }}><Img src={IMG(PH.workspace)} /></div>
          </div>
          <div className="mt-auto grid grid-cols-3 gap-4 px-9 pb-6">{[0, 1, 2].map((k) => <div key={k} className="rounded-[10px] border border-[#DCE5F5] p-4"><span className="mb-3 block h-7 w-7 rounded-[8px] bg-[#E3ECFB]" />{bar("80%")}{bar("55%", "mt-2")}</div>)}</div>
        </div>
        {/* before, wiped away and back */}
        <div className="mk-wipe absolute inset-0 overflow-hidden bg-[#E9E4D6]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <div className="bg-[#7A1F1F] px-6 py-3 text-[20px] font-bold text-[#FFE9A8]">YOUR BRAND &mdash; Welcome to our website!!!</div>
          <div className="flex gap-3 bg-[#BFB59B] px-6 py-1.5 text-[11px] text-[#1020A0] underline"><span>Home</span><span>About Us</span><span>Products</span><span>Services</span><span>Links</span><span>Guestbook</span><span>Contact</span></div>
          <div className="grid grid-cols-3 gap-3 p-5">
            <div className="col-span-2 space-y-2 text-[12px] leading-snug text-[#222]"><p className="text-[22px] font-bold text-[#B22222]">Click here to learn more</p><p>We are a company that offers many different products and services for many different customers since 1998. Please read the text below carefully.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p><p className="underline text-[#1020A0]">Read more &gt;&gt; Read more &gt;&gt; Read more &gt;&gt;</p></div>
            <div className="space-y-2"><div className="h-[90px] border-2 border-dashed border-[#7A1F1F] bg-[#D8CDB0] p-2 text-center text-[11px]">[ image loading... ]</div><div className="bg-[#B22222] py-2 text-center text-[11px] font-bold text-white">BUY NOW!!!</div></div>
          </div>
        </div>
        <div className="mk-handle pointer-events-none absolute bottom-0 top-0 w-[2px] bg-[#0047AB]"><span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0047AB] text-[11px] font-bold text-white shadow-lg">&#8596;</span></div>
        <span className="absolute left-4 top-[48px] rounded-full bg-black/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">Before</span>
        <span className="absolute right-4 top-[48px] rounded-full bg-[#0047AB] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">After</span>
      </div>
    </Browser>
  );
}

const siteTypes = [
  { name: "Company websites", url: "harbourlaw.co", text: "Clear, credible sites that explain what you do and earn enquiries.", best: "Agencies, clinics, firms and consultancies", has: ["Service pages", "Lead forms", "Blog and case studies"], mock: <MockCompany /> },
  { name: "E-commerce stores", url: "shop.northfield.store", text: "Fast stores with secure checkout and simple product management.", best: "Retail and direct-to-consumer brands", has: ["Catalogue and search", "Secure payments", "Order and stock tools"], mock: <MockStore /> },
  { name: "Landing pages", url: "launchkit.io/start", text: "Focused pages built to lift conversions from your campaigns.", best: "Ads, product launches and events", has: ["Test-ready layouts", "Fast load times", "Tracking set up"], mock: <MockLanding /> },
  { name: "Web apps and portals", url: "app.flowdesk.io", text: "Dashboards, logins and tools that run in the browser.", best: "SaaS products and member areas", has: ["Accounts and roles", "Dashboards", "API integrations"], mock: <MockApp /> },
  { name: "CMS and blogs", url: "studio.pressroom.cms", text: "Edit your own content without calling a developer.", best: "Publishers and content marketing teams", has: ["Editor-friendly CMS", "SEO fields", "Scheduled posts"], mock: <MockCMS /> },
  { name: "Redesigns", url: "yourbrand.com", text: "A new look and faster code on top of what already works.", best: "Sites that look dated or load slowly", has: ["Audit first", "Content migration", "Redirects that protect SEO"], mock: <MockRedesign /> },
] as const;

function TypesSection() {
  const [sel, setSel] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  React.useEffect(() => {
    if (!auto || reduced) return;
    const t = setTimeout(() => setSel((s) => (s + 1) % siteTypes.length), 6500);
    return () => clearTimeout(t);
  }, [auto, sel, reduced]);

  const t = siteTypes[sel];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = siteTypes.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setSel(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="types" className="bg-white py-24 md:py-36" aria-label="Types of websites we build" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Every kind of <b className="font-bold">website</b>,</>, <>built <Acc dark={false}>properly</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Choose a type to see the kind of site we build. These are illustrations, not client work.</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Types of websites" aria-orientation="vertical" className="lg:col-span-4">
            {siteTypes.map((x, i) => (
              <button
                key={x.name}
                role="tab"
                id={`type-tab-${i}`}
                aria-selected={sel === i}
                aria-controls="type-panel"
                tabIndex={sel === i ? 0 : -1}
                onClick={() => { setSel(i); setAuto(false); }}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative block w-full border-t border-[#CBD8EE] py-5 pr-4 text-left transition last:border-b ${ring}`}
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs text-[#5B6B84]">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${pop.className} text-2xl tracking-[-0.03em] transition-colors ${sel === i ? "font-semibold text-[#0047AB]" : "font-extralight text-[#0B1F3B] hover:text-[#0047AB]"}`}>{x.name}</span>
                </span>
                <span className={`grid transition-all duration-500 ${sel === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden"><span className="mt-3 block max-w-sm pl-9 text-sm font-light leading-relaxed text-[#3B4A63]">{x.text}</span></span>
                </span>
                {sel === i && <span aria-hidden className="absolute bottom-[-1px] left-0 h-[2px] bg-[#0047AB]" style={auto && !reduced ? { animation: "tabfill 6.5s linear forwards" } : { width: "100%" }} />}
              </button>
            ))}
          </div>

          <div id="type-panel" role="tabpanel" aria-labelledby={`type-tab-${sel}`} className="lg:col-span-8">
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 -z-10 rounded-[24px] opacity-70" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(47,123,255,.22), transparent 70%)" }} />
              <div key={sel} className="mk-swap">
                <Scaled w={760} h={475} className="rounded-[10px] shadow-[0_40px_110px_rgba(11,31,59,.28)] ring-1 ring-[#0B1F3B]/15">
                  <div aria-hidden="true">{t.mock}</div>
                </Scaled>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">Best for</p><p className="mt-2 text-[#0B1F3B]">{t.best}</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">Usually includes</p><ul className="mt-2 flex flex-wrap gap-2">{t.has.map((h) => <li key={h} className="rounded-full border border-[#CBD8EE] px-3.5 py-1.5 text-sm text-[#3B4A63]">{h}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SELECTED WORK ------------------------------ */

const work = caseStudies
  .filter((project): project is Project & { url: string } =>
    project.category === "Websites & Business Platforms" && typeof project.url === "string",
  )
  .slice(0, 6);

function WorkCard({ w, i }: { w: (typeof work)[number]; i: number }) {
  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <li className="rv" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
      <a href={w.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${w.title} website (opens in a new tab)`} className={`group relative block ${ringDark}`} onPointerMove={onPointerMove}>
        <div className={`relative overflow-hidden rounded-[6px] ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`} style={{ background: `linear-gradient(140deg, ${NAVY} 0%, ${COBALT} 100%)` }}>
          <div aria-hidden className="absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.4) 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#02050B]/75 via-transparent to-[#02050B]/20" />
          <span className="absolute left-5 top-4 text-sm tracking-widest text-white/90">{String(i + 1).padStart(2, "0")}</span>
          <span className="absolute right-5 top-4 rounded-full border border-white/40 bg-black/20 px-3 py-1 text-xs text-white backdrop-blur">Website</span>
          <span className={`${pop.className} absolute bottom-7 left-7 right-7 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white/90 md:text-4xl`}>{w.industry}</span>
          <span aria-hidden className="pointer-events-none absolute z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-[#0047AB] text-sm font-medium text-white transition-transform duration-300 group-hover:scale-100" style={{ left: "var(--cx, 50%)", top: "var(--cy, 50%)" }}>Visit website</span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className={`${pop.className} text-2xl font-extralight tracking-[-0.03em]`}>{w.title}</h3>
            <p className="mt-2 text-sm font-light text-white/65">{w.industry}</p>
          </div>
          <ArrowUpRight size={26} className="mt-1 shrink-0 text-[#6EA1FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </a>
    </li>
  );
}

function WorkSection() {
  const root = React.useRef<HTMLElement>(null);

  // Parallax: the two columns drift at different speeds, each photo slides inside its frame,
  // and the outlined word behind the heading travels sideways.
  React.useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cols = Array.from(el.querySelectorAll<HTMLElement>("[data-col]"));
    const word = el.querySelector<HTMLElement>("[data-word]");
    const grid = el.querySelector<HTMLElement>("[data-grid]");
    let raf = 0;
    let visible = false;
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      const wide = window.innerWidth >= 768;
      const gr = (grid ?? el).getBoundingClientRect();
      const pc = Math.max(-1, Math.min(1, (vh / 2 - (gr.top + gr.height / 2)) / vh));
      cols.forEach((c) => {
        const speed = Number(c.dataset.col);
        const base = Number(c.dataset.base || 0);
        c.style.transform = wide ? `translate3d(0, ${(base + pc * speed).toFixed(1)}px, 0)` : "";
      });
      if (word) {
        const r = el.getBoundingClientRect();
        word.style.transform = `translate3d(${(((vh / 2 - r.top) / vh) * -160).toFixed(1)}px, 0, 0)`;
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const left = work.filter((_, i) => i % 2 === 0);
  const right = work.filter((_, i) => i % 2 === 1);

  return (
    <section ref={root} id="work" className="relative overflow-hidden pb-40 pt-24 text-white md:pb-56 md:pt-32" aria-label="Selected work" style={{ background: `linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className={`${pop.className} pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} data-word style={{ WebkitTextStroke: "1px rgba(255,255,255,.10)", willChange: "transform" }}>Selected work &middot; Selected work</div>
      <div className={`${wrap} relative`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Selected <b className="font-bold">work</b></>, <>that <Acc>performs</Acc></>]} />
          <Link href="/projects" className={`group inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium transition hover:border-white ${ringDark}`}>
            View all projects <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <div data-grid className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:gap-x-20">
          <ul data-col="-40" className="space-y-14 will-change-transform md:space-y-24">{left.map((w) => <WorkCard key={w.slug} w={w} i={work.indexOf(w)} />)}</ul>
          <ul data-col="90" data-base="110" className="space-y-14 will-change-transform md:space-y-24">{right.map((w) => <WorkCard key={w.slug} w={w} i={work.indexOf(w)} />)}</ul>
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
@keyframes bsin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes wfpop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.wf-pop{animation:wfpop .5s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0) * 55ms)}
@keyframes mkfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.mk-float{animation:mkfloat 5.5s ease-in-out infinite}
.mk-float-slow{animation:mkfloat 8s ease-in-out infinite}
@keyframes mq{to{transform:translateX(-25%)}}
.mq{animation:mq 38s linear infinite}
@keyframes gridmove{to{background-position:64px 64px}}
.hero-grid{background-image:linear-gradient(rgba(110,161,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(110,161,255,.5) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);animation:gridmove 12s linear infinite}
@keyframes tabfill{from{width:0}to{width:100%}}
@keyframes mkswap{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.mk-swap{animation:mkswap .7s cubic-bezier(.16,1,.3,1) both}
@keyframes mktoast{0%,12%{opacity:0;transform:translateY(14px)}22%,80%{opacity:1;transform:none}92%,100%{opacity:0;transform:translateY(14px)}}
.mk-toast{animation:mktoast 5s ease-in-out .8s infinite both}
@keyframes mkgrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.mk-grow{transform-origin:bottom;animation:mkgrow .8s cubic-bezier(.16,1,.3,1) both}
@keyframes mkdraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.sw-line{stroke-dasharray:1;animation:mkdraw 1.4s ease .4s both}
@keyframes mkcaret{50%{opacity:0}}
.mk-caret{animation:mkcaret 1s steps(1) infinite}
@keyframes mkwipe{0%,100%{clip-path:inset(0 52% 0 0)}50%{clip-path:inset(0 12% 0 0)}}
@keyframes mkhandle{0%,100%{left:48%}50%{left:88%}}
.mk-wipe{animation:mkwipe 7s ease-in-out infinite}
.mk-handle{animation:mkhandle 7s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.mk-float,.mk-float-slow,.mq,.hero-grid,.mk-toast,.mk-wipe,.mk-handle,.mk-caret,.mk-grow,.sw-line,.mk-swap{animation:none!important}.mk-toast{opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}.wf-pop{animation:none}}
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

export default function WebsiteDevelopmentPage() {
  const main = React.useRef<HTMLElement>(null);
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  // Reveal-on-scroll for the sections below the scene.
  React.useEffect(() => {
    const el = main.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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
    <main ref={main} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#0B1F3B]`}>
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <style>{PAGE_CSS}</style>

      {/* 1. HERO */}
      <Hero />

      {/* 1b. THE BUILD: a line to a website */}
      <BuildStage />

      {/* 1c. TYPES OF WEBSITES */}
      <TypesSection />

      {/* 1d. SELECTED WORK */}
      <WorkSection />

      {/* 2. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2" lines={[<>Built <b className="font-bold">fast</b>,</>, <>built to <Acc dark={false}>last</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Every site we build is fast, secure and ready to grow with your business.</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(([Icon, t, d], i) => (
              <li key={t} className="rv group rounded-[4px] border border-[#CBD8EE] p-8 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE]" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-8 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
                <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we build websites">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%,rgba(0,71,171,.55),transparent 50%)" }} />
        <div className={`${wrap} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>launch day</Acc></>]} />
            <p className="rv mt-5 font-light text-white/70">Six phases, one delivery process. Every project follows it, and every phase feeds the next.</p>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="rv bg-[#0B1F3B] p-8 md:p-10" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <div className="flex items-center gap-4">
                  <span className="relative block h-7 w-7 shrink-0" style={{ "--d": `${0.6 + i * 0.5}s` } as React.CSSProperties}>
                    <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#2F7BFF]/30 border-t-[#6EA1FF]" />
                    <span className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>
                  </span>
                  <span className="text-sm text-[#6EA1FF]">Phase {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={`${pop.className} mt-6 text-2xl font-extralight tracking-[-0.03em]`}>{t}</h3>
                <p className="mt-3 font-light leading-relaxed text-white/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />

      {/* 4. RELATED SERVICES */}
      <section className="bg-white py-24 md:py-32" aria-label="Related services">
        <div className={wrap}>
          <Lines className="max-w-3xl t2" lines={[<>Works best <b className="font-bold">with</b></>]} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(([n, href, d], i) => (
              <li key={n} className="rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <Link href={href} className={`group flex h-full flex-col justify-between gap-10 rounded-[4px] border border-[#CBD8EE] p-6 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE] ${ring}`}>
                  <ArrowUpRight size={26} className="text-[#0047AB] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  <div>
                    <h3 className={`${pop.className} text-lg font-semibold tracking-[-0.01em]`}>{n}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-[#3B4A63]">{d}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Frequently asked questions">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Lines className="t2" lines={[<>Questions,</>, <><b className="font-bold">answered</b></>]} />
              <p className="rv mt-6 max-w-xs font-light leading-relaxed text-[#3B4A63]">Can&apos;t find what you need? Write to <a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] font-medium text-[#0047AB] underline underline-offset-4 ${ring}`}>info@devntomsolutions.com</a>.</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="rv group border-t border-[#CBD8EE] last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left ${ring} [&::-webkit-details-marker]:hidden`}>
                  <span className={`${pop.className} text-lg font-semibold tracking-[-0.01em] md:text-xl`}>{q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#8FB0E8] text-[#0047AB] transition group-open:rotate-45 group-open:border-[#0047AB] group-open:bg-[#0047AB] group-open:text-white"><Plus size={18} aria-hidden="true" /></span>
                </summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#3B4A63]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT FORM */}
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your website project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s build</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>your</Acc> <b className="font-bold">website.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us what you want to achieve. We reply with a plan, a timeline and a quote.</p>
            <ul className="rv mt-8 space-y-2 font-medium">
              <li><a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] underline decoration-[#6EA1FF] underline-offset-4 hover:text-[#6EA1FF] ${ring} focus-visible:ring-offset-[#0B1F3B]`}>info@devntomsolutions.com</a></li>
              <li><a href="https://wa.me/923256036838" className={`rounded-[3px] underline decoration-[#6EA1FF] underline-offset-4 hover:text-[#6EA1FF] ${ring} focus-visible:ring-offset-[#0B1F3B]`}>WhatsApp +92 325 6036838</a></li>
            </ul>
          </div>
          <form onSubmit={submit} className="rv rounded-[4px] bg-white p-7 text-[#0B1F3B] shadow-[0_30px_100px_rgba(0,71,171,.45)] md:p-9 lg:col-span-6" style={{ transitionDelay: "120ms" }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={label}>Full name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label>
              <label className={label}>Email<input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" /></label>
            </div>
            <label className={`${label} mt-5 block`}>What do you need?
              <select name="service" required defaultValue="Website Development" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, audience, budget, timeline" /></label>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button disabled={state === "sending"} className={`group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 font-medium text-white transition hover:bg-[#0B1F3B] disabled:opacity-60 ${ring}`}>
              {state === "sending" ? "Sending…" : "Send message"} <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p role="status" className={`mt-4 text-sm ${state === "error" ? "text-[#B91C1C]" : "text-[#0B1F3B]"}`}>
              {state === "sent" && "Thank you. We received your message and will reply soon."}
              {state === "error" && "Something went wrong. Please email info@devntomsolutions.com instead."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
