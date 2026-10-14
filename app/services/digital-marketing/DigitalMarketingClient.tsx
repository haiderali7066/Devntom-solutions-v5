"use client";

/**
 * /services/digital-marketing
 *
 * Client component for the page. Rendered by page.tsx (the server page that holds the
 * metadata and JSON-LD). It can receive the FAQs and a server-rendered summary as props; with no
 * props it falls back to the FAQs below. No Nav, no Footer (both live in app/layout.tsx).
 *
 * Sections: hero with a live example dashboard (counting number, drawing line chart, hover tooltip),
 * channel explorer (SEO, paid ads, social, email, content) with animated mock-ups, "every channel has
 * a job" funnel, an example monthly report, then what is included, process, related services, FAQ and
 * the contact form. All numbers and screens are illustrations, not client results.
 *
 * Palette: cobalt, navy, white, black.
 * Before launch, search this file for "TESTIMONIALS" to see where to drop your component.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, Heart, Mail, Megaphone, MessageCircle, MousePointerClick,
  PenTool, Plus, Search, Share2, Target, TrendingDown, TrendingUp, Users,
} from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB"; // true cobalt: borders, buttons, chart marks on light backgrounds
const COBALT_HI = "#2F7BFF"; // lighter cobalt: chart marks and glow on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

/* ------------------------------ CONTENT ------------------------------ */

const techs = ["SEO", "Google Ads", "Meta Ads", "LinkedIn Ads", "Email marketing", "Social media", "Content", "Analytics", "Conversion rate optimisation", "Remarketing"];

const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6"];
const LEADS = [120, 168, 190, 262, 340, 428];
const CPL = [100, 91, 82, 71, 64, 57];

const channels = [
  { name: "SEO", text: "Be the answer when people search for what you sell.", best: "Businesses that want steady, lasting traffic", has: ["Technical audit", "Keyword and content plan", "Local and map listings"] },
  { name: "Paid ads", text: "Search and social ads built around cost per lead, not clicks.", best: "Fast results and campaign launches", has: ["Google and Meta campaigns", "Landing page testing", "Budget and bid control"] },
  { name: "Social media", text: "Consistent, on-brand posts that people want to share.", best: "Brands building trust and community", has: ["Content calendar", "Design and copy", "Community replies"] },
  { name: "Email marketing", text: "Turn one-time visitors into repeat customers.", best: "Shops, services and subscription businesses", has: ["Welcome and follow-up flows", "Newsletters", "Segmentation"] },
  { name: "Content", text: "Articles, guides and pages that answer real questions.", best: "Long-term search and authority", has: ["Topic research", "Writing and editing", "Updates to old pages"] },
] as const;

const stages = [
  ["Attract", "Search, ads and social put you in front of the right people.", "SEO, paid ads, social"],
  ["Engage", "Useful content and email keep them interested.", "Content, email, community"],
  ["Convert", "Clear pages and offers turn interest into enquiries.", "Landing pages, testing"],
  ["Retain", "Follow-ups bring customers back and get them to refer.", "Email, remarketing, reviews"],
] as const;

const included = [
  [Target, "Strategy first", "Goals, audience and a channel plan before any money is spent."],
  [Search, "Search visibility", "Technical SEO, content and local listings that bring steady traffic."],
  [Megaphone, "Paid media", "Google and Meta campaigns managed against cost per lead."],
  [Share2, "Social and content", "A calendar of posts, articles and designs that fit your brand."],
  [Mail, "Email and follow-up", "Flows and newsletters that bring customers back."],
  [BarChart3, "Clear reporting", "Simple monthly reports on what worked, what did not and what is next."],
] as const;

const steps = [
  ["Audit and goals", "We review your site, competitors and numbers, then agree what success looks like."],
  ["Strategy and channel plan", "The right mix of channels, a budget split and a calendar you approve."],
  ["Tracking and assets", "Analytics, conversion tracking, ad accounts and creative set up properly."],
  ["Launch", "Campaigns, content and emails go live in stages."],
  ["Test and optimise", "We test messages, audiences and pages, and move budget to what works."],
  ["Report and scale", "Monthly reviews and a plan to grow what is working."],
] as const;

const related = [
  ["Website Development", "/services/website-development", "A fast site that turns visitors into enquiries."],
  ["AI Automation and Chatbots", "/services/ai-automation-chatbots", "Answer and qualify every lead the moment it arrives."],
  ["UI/UX Design", "/services/ui-ux-design", "Landing pages and flows designed to convert."],
  ["Custom Software", "/services/custom-software-development", "CRMs and dashboards that connect to your campaigns."],
] as const;

const FAQS = [
  ["Which channels do you work with?", "SEO, Google and Meta ads, LinkedIn, social media, email and content. We recommend the mix that fits your goals and budget rather than selling everything."],
  ["How soon will I see results?", "Paid ads can bring traffic within days, though they improve as we test. SEO and content usually take a few months to build. We agree realistic milestones at the start."],
  ["Do you guarantee rankings or sales?", "No honest agency can. Rankings depend on search engines and competition. We guarantee clear tracking, steady improvement and plain reporting."],
  ["Is the ad budget included in your fee?", "No. Ad spend goes directly to Google, Meta and the other platforms from your own accounts, so you always see where it goes."],
  ["What will I receive each month?", "A short report covering traffic, leads, cost per lead and conversions, plus what we changed and what we plan to do next."],
  ["Can you work with my existing website?", "Yes. We start with an audit and fix tracking and speed issues first. If the site holds results back, we can improve or rebuild it."],
  ["Do you work with local and B2B businesses?", "Yes. Local listings and map results for service businesses, and LinkedIn, content and email for B2B."],
  ["How does pricing work?", "It depends on scope and channels. After a short discovery call we send a clear proposal with deliverables and a monthly fee."],
] as const;

const serviceOptions = ["Digital Marketing", "SEO", "Paid Ads", "Social Media", "Email Marketing", "Website Development", "AI Automation", "Something else"];

/* ------------------------------ SMALL HELPERS ------------------------------ */

const pp = (i: number) => ({ ["--i" as string]: i } as React.CSSProperties);

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

/** Counts from 0 to target once. */
function useCount(target: number, reduced: boolean, ms = 1700) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (reduced) { setV(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, ms]);
  return v;
}

/** Lays children out at a fixed design size, then scales the whole thing to fit its container. */
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

/* ------------------------------ CHARTS ------------------------------ */

type Theme = { ink: string; muted: string; grid: string; mark: string; surface: string };
const DARK: Theme = { ink: "#FFFFFF", muted: "rgba(220,231,251,.7)", grid: "rgba(255,255,255,.12)", mark: COBALT_HI, surface: "#0B1F3B" };
const LIGHT: Theme = { ink: NAVY, muted: "#5B6B84", grid: "#DCE5F5", mark: COBALT, surface: "#FFFFFF" };

/** Single-series line and area chart with a crosshair tooltip. The title names the series, so there is no legend. */
function LineChart({ values, labels, theme, name, fmt = (n: number) => String(n) }: { values: number[]; labels: string[]; theme: Theme; name: string; fmt?: (n: number) => string }) {
  const W = 520, H = 230, L = 34, R = 18, T = 16, B = 32;
  const max = Math.max(...values) * 1.1;
  const x = (i: number) => L + (i * (W - L - R)) / (values.length - 1);
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const pts = values.map((v, i) => [x(i), y(v)] as const);
  const line = pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1)} ${H - B} L${x(0)} ${H - B} Z`;
  const [hi, setHi] = React.useState<number | null>(null);
  const idx = hi ?? values.length - 1;
  const gid = React.useId().replace(/:/g, "");
  const move = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const f = (e.clientX - r.left) / r.width;
    setHi(Math.max(0, Math.min(values.length - 1, Math.round(f * (values.length - 1)))));
  };
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${name}: ${values.map((v, i) => `${labels[i]} ${fmt(v)}`).join(", ")}`}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={theme.mark} stopOpacity=".38" /><stop offset="1" stopColor={theme.mark} stopOpacity="0" /></linearGradient>
        </defs>
        {[0, 1, 2, 3].map((k) => { const gy = T + (k / 3) * (H - T - B); return <line key={k} x1={L} x2={W - R} y1={gy} y2={gy} stroke={theme.grid} strokeWidth="1" />; })}
        {labels.map((l, i) => <text key={l} x={x(i)} y={H - 9} textAnchor="middle" fontSize="11" fill={theme.muted}>{l}</text>)}
        <path d={area} fill={`url(#${gid})`} className="area-in" />
        <path d={line} fill="none" stroke={theme.mark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sw-line" />
        {hi !== null && <line x1={x(idx)} x2={x(idx)} y1={T} y2={H - B} stroke={theme.muted} strokeWidth="1" strokeDasharray="3 4" />}
        <circle cx={x(idx)} cy={y(values[idx])} r="5" fill={theme.mark} stroke={theme.surface} strokeWidth="2" />
        <rect x={L} y={0} width={W - L - R} height={H} fill="transparent" onPointerMove={move} onPointerLeave={() => setHi(null)} />
      </svg>
      <div className="pointer-events-none absolute rounded-[6px] border px-3 py-1.5 text-xs shadow-lg" style={{ left: `${(x(idx) / W) * 100}%`, top: `${(y(values[idx]) / H) * 100}%`, transform: "translate(-50%, -150%)", background: theme.surface, borderColor: theme.grid, color: theme.ink, opacity: hi === null ? 0 : 1, transition: "opacity .15s" }}>
        <span style={{ color: theme.muted }}>{labels[idx]} · </span><b>{fmt(values[idx])}</b>
      </div>
    </div>
  );
}

/** Single-series bars: 4px rounded tops, anchored to the baseline, a direct label on the last bar and a tooltip on hover. */
function BarChart({ values, labels, theme, name }: { values: number[]; labels: string[]; theme: Theme; name: string }) {
  const W = 520, H = 230, L = 34, R = 18, T = 26, B = 32;
  const max = Math.max(...values) * 1.08;
  const slot = (W - L - R) / values.length;
  const bw = slot - 14;
  const [hi, setHi] = React.useState<number | null>(null);
  const base = H - B;
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${name}: ${values.map((v, i) => `${labels[i]} ${v}`).join(", ")}`}>
        {[0, 1, 2, 3].map((k) => { const gy = T + (k / 3) * (base - T); return <line key={k} x1={L} x2={W - R} y1={gy} y2={gy} stroke={theme.grid} strokeWidth="1" />; })}
        {values.map((v, i) => {
          const h = (v / max) * (base - T);
          const x0 = L + i * slot + 7, y0 = base - h, r = 4;
          const d = `M${x0} ${base} V${y0 + r} Q${x0} ${y0} ${x0 + r} ${y0} H${x0 + bw - r} Q${x0 + bw} ${y0} ${x0 + bw} ${y0 + r} V${base} Z`;
          return (
            <g key={i} style={{ opacity: hi === null || hi === i ? 1 : 0.5, transition: "opacity .15s" }}>
              <path d={d} fill={theme.mark} className="bar-in" style={{ animationDelay: `${i * 90}ms` }} />
              <text x={x0 + bw / 2} y={base + 19} textAnchor="middle" fontSize="11" fill={theme.muted}>{labels[i]}</text>
              {i === values.length - 1 && <text x={x0 + bw / 2} y={y0 - 8} textAnchor="middle" fontSize="12" fontWeight="600" fill={theme.ink}>{v}</text>}
              <rect x={L + i * slot} y={0} width={slot} height={H} fill="transparent" onPointerEnter={() => setHi(i)} onPointerLeave={() => setHi(null)} />
            </g>
          );
        })}
      </svg>
      {hi !== null && (
        <div className="pointer-events-none absolute rounded-[6px] border px-3 py-1.5 text-xs shadow-lg" style={{ left: `${((L + hi * slot + slot / 2) / W) * 100}%`, top: `${((base - (values[hi] / max) * (base - T)) / H) * 100}%`, transform: "translate(-50%, -150%)", background: theme.surface, borderColor: theme.grid, color: theme.ink }}>
          <span style={{ color: theme.muted }}>{labels[hi]} · </span><b>{values[hi]}</b>
        </div>
      )}
    </div>
  );
}

function Spark({ values, down = false }: { values: number[]; down?: boolean }) {
  const mx = Math.max(...values), mn = Math.min(...values);
  const p = values.map((v, i) => `${i ? "L" : "M"}${(i / (values.length - 1)) * 100} ${22 - ((v - mn) / (mx - mn || 1)) * 20}`).join(" ");
  return <svg viewBox="0 0 100 24" className="mt-3 h-6 w-full" aria-hidden="true"><path d={p} fill="none" stroke={down ? COBALT_TEXT : COBALT_HI} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sw-line" /></svg>;
}

/* ------------------------------ HERO ------------------------------ */

function Dashboard() {
  const reduced = useReduced();
  const n = useCount(LEADS[LEADS.length - 1], reduced);
  const growth = Math.round((LEADS[LEADS.length - 1] / LEADS[0] - 1) * 100);
  const kpis: [string, string, number[], boolean, boolean][] = [
    ["Cost per lead", "-43%", [100, 91, 82, 71, 64, 57], true, true],
    ["Site traffic", "+112%", [40, 48, 55, 70, 79, 85], false, false],
    ["Conversion rate", "+1.8 pts", [2.1, 2.3, 2.6, 3.0, 3.6, 3.9], false, false],
  ];
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full opacity-80 blur-2xl" style={{ background: `radial-gradient(closest-side, ${COBALT}99, transparent)` }} />
      <div className="mk-float-slow rounded-[22px] border border-white/20 bg-[#0B1F3B]/85 p-6 shadow-[0_50px_120px_rgba(0,71,171,.55)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#BFD4FF]">Qualified leads per month</p>
            <p className={`${pop.className} mt-1 flex items-baseline gap-3 text-5xl font-semibold tracking-[-0.04em] text-white`}>
              <span aria-label={`${LEADS[LEADS.length - 1]} leads`}>{n}</span>
              <span className="flex items-center gap-1 rounded-full bg-[#2F7BFF]/20 px-3 py-1 text-sm font-medium tracking-normal text-[#BFD4FF]"><TrendingUp size={14} aria-hidden="true" />+{growth}%</span>
            </p>
          </div>
          <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-wider text-white/70">Example</span>
        </div>
        <div className="mt-4"><LineChart values={LEADS} labels={MONTHS} theme={DARK} name="Qualified leads per month" /></div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {kpis.map(([t, v, s, d]) => (
            <div key={t} className="rounded-[10px] border border-white/10 bg-white/[0.05] p-3">
              <p className="text-[11px] text-[#BFD4FF]">{t}</p>
              <p className="mt-1 flex items-center gap-1 text-base font-semibold text-white">{d ? <TrendingDown size={14} className="text-[#6EA1FF]" aria-hidden="true" /> : <TrendingUp size={14} className="text-[#6EA1FF]" aria-hidden="true" />}{v}</p>
              <Spark values={s} down={d} />
            </div>
          ))}
        </div>
      </div>
      <div aria-hidden className="mk-float absolute -left-8 top-[38%] hidden items-center gap-2 rounded-full border border-white/25 bg-[#0B1F3B]/90 px-4 py-2.5 text-sm text-white backdrop-blur sm:flex"><Search size={15} className="text-[#6EA1FF]" />Ranking up</div>
      <div aria-hidden className="mk-float-slow absolute -right-6 bottom-[22%] hidden items-center gap-2 rounded-full border border-white/25 bg-[#0B1F3B]/90 px-4 py-2.5 text-sm text-white backdrop-blur sm:flex"><MousePointerClick size={15} className="text-[#6EA1FF]" />More enquiries</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Digital marketing" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[100svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-6">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            Digital marketing
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.7rem,6.2vw,6rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Marketing that", <><b className="font-bold">earns</b> its</>, <><Acc>keep.</Acc></>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            SEO, paid ads, social, email and content, planned around your goals and reported in plain numbers, so you always know what is working.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <a href="#contact-form" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Get a free audit <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#channels" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>Explore channels</a>
          </div>
          <ul className="rv mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#DCE7FB]" style={{ transitionDelay: "350ms" }}>
            {["Plain monthly reports", "You own your accounts", "No lock-in tricks"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6"><Dashboard /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 py-5 backdrop-blur-sm" aria-label="What we do">
        <div className="overflow-hidden">
          <div className="mq flex w-max items-center gap-14 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-white/60">
            {[...techs, ...techs, ...techs, ...techs].map((t, i) => <span key={i} className="flex items-center gap-14">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CHANNEL MOCK-UPS (640 x 400 design px) ------------------------------ */

const bar = (w: string, extra = "") => <span className={`block h-2 rounded-full bg-[#DCE5F5] ${extra}`} style={{ width: w }} />;

function MockShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className="relative h-[400px] w-[640px] overflow-hidden" style={{ background: dark ? "#071A33" : "#F7FAFF" }}>{children}</div>;
}

function MockSeo() {
  const reduced = useReduced();
  const rows: [string, string][] = [["Northside Supplies", "northsidesupplies.com"], ["Quick Quote Co", "quickquote.co"], ["Brightline Group", "brightline.group"], ["The Local Guide", "thelocalguide.net"], ["Your Brand", "yourbrand.com"]];
  const [pos, setPos] = React.useState(4);
  React.useEffect(() => {
    if (reduced) { setPos(0); return; }
    const t = setInterval(() => setPos((p) => (p <= 0 ? 4 : p - 1)), 1100);
    return () => clearInterval(t);
  }, [reduced]);
  // order of the other rows, with "Your Brand" inserted at the current position
  const others = rows.slice(0, 4);
  const order = [...others.slice(0, pos), rows[4], ...others.slice(pos)];
  return (
    <MockShell>
      <div className="flex items-center gap-3 border-b border-[#DCE5F5] bg-white px-6 py-4">
        <span className="text-[22px] font-bold tracking-tight" style={{ color: COBALT }}>Search</span>
        <span className="flex h-10 flex-1 items-center gap-3 rounded-full border border-[#CBD8EE] px-5 text-[13px] text-[#3B4A63]"><Search size={15} />best supplier near me</span>
      </div>
      <div className="relative mx-6 mt-4">
        {order.map(([t, u]) => {
          const mine = t === "Your Brand";
          const i = order.findIndex((r) => r[0] === t);
          return (
            <div key={t} className="absolute left-0 right-0 flex h-[62px] items-center gap-4 rounded-[10px] px-4 transition-all duration-700" style={{ top: i * 68, background: mine ? "#fff" : "transparent", border: mine ? `1.5px solid ${COBALT}` : "1.5px solid transparent", boxShadow: mine ? "0 10px 30px rgba(0,71,171,.18)" : "none", zIndex: mine ? 2 : 1 }}>
              <span className="w-7 text-center text-[13px] font-semibold" style={{ color: mine ? COBALT : "#8A97AD" }}>{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] text-[#5B6B84]">{u}</span>
                <span className="block text-[15px] font-medium" style={{ color: mine ? COBALT : "#1A3C86" }}>{t} | Trusted supplier</span>
                {bar(mine ? "80%" : "65%", "mt-1.5")}
              </span>
              {mine && <span className="rounded-full bg-[#0047AB] px-3 py-1 text-[11px] font-medium text-white">#{i + 1}</span>}
            </div>
          );
        })}
      </div>
    </MockShell>
  );
}

function MockAds() {
  const m: [string, string, number][] = [["Clicks", "+64%", 78], ["Leads", "+41%", 62], ["Cost per lead", "-27%", 44]];
  return (
    <MockShell>
      <div className="grid h-full grid-cols-12 gap-5 p-6">
        <div className="col-span-7 flex flex-col gap-3">
          <div className="wf-pop rounded-[12px] border border-[#DCE5F5] bg-white p-4 shadow-sm" style={pp(0)}>
            <div className="flex items-center gap-2 text-[11px]"><span className="rounded-[4px] border border-[#3B4A63] px-1.5 py-px font-bold text-[#3B4A63]">Ad</span><span className="text-[#5B6B84]">yourbrand.com</span></div>
            <p className="mt-2 text-[20px] font-medium leading-snug" style={{ color: "#1A3C86" }}>Fast websites for growing businesses | Free audit</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#3B4A63]">Get more enquiries from the people already searching for you. Book a free 20-minute review.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]" style={{ color: "#1A3C86" }}>{["Pricing", "Case studies", "Book a call"].map((s) => <span key={s} className="whitespace-nowrap rounded-[6px] border border-[#DCE5F5] px-3 py-1.5">{s}</span>)}</div>
          </div>
          <div className="wf-pop rounded-[12px] border border-[#DCE5F5] bg-white p-4 shadow-sm" style={pp(1)}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">Audience</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[12px]">{["Owners", "Searched this week", "Viewed pricing"].map((s, i) => <span key={s} className={`rounded-full px-3 py-1.5 ${i === 2 ? "bg-[#0047AB] text-white" : "bg-[#E3ECFB] text-[#0047AB]"}`}>{s}</span>)}</div>
          </div>
        </div>
        <div className="wf-pop col-span-5 rounded-[12px] border border-[#DCE5F5] bg-white p-5 shadow-sm" style={pp(2)}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">This month vs last</p>
          <div className="mt-5 space-y-6">
            {m.map(([t, v, w], i) => (
              <div key={t}>
                <div className="flex items-baseline justify-between"><span className="text-[13px] text-[#3B4A63]">{t}</span><span className="text-[15px] font-semibold" style={{ color: NAVY }}>{v}</span></div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#E3ECFB]"><span className="gx block h-full rounded-full bg-[#0047AB]" style={{ width: `${w}%`, animationDelay: `${i * 150 + 300}ms` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function MockSocial() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const plan: Record<string, string> = { "0-1": "Reel", "1-0": "Post", "2-2": "Story", "3-1": "Post", "4-0": "Reel", "5-2": "Story", "6-1": "Post", "2-0": "Post", "4-2": "Post" };
  return (
    <MockShell>
      <div className="grid h-full grid-cols-12 gap-5 p-6">
        <div className="wf-pop col-span-5 overflow-hidden rounded-[12px] border border-[#DCE5F5] bg-white shadow-sm" style={pp(0)}>
          <div className="flex items-center gap-3 px-4 py-3"><span className="h-8 w-8 rounded-full" style={{ background: `linear-gradient(135deg,${NAVY},${COBALT})` }} /><span className="text-[12px] font-semibold">yourbrand</span></div>
          <div className="relative h-[170px]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT} 70%,${COBALT_HI})` }}>
            <span className={`${pop.className} absolute inset-0 flex items-center justify-center px-6 text-center text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white`}>New season. Same promise.</span>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center gap-4 text-[#0B1F3B]"><Heart size={18} className="mk-beat text-[#0047AB]" fill="currentColor" /><MessageCircle size={18} /><Share2 size={18} /></div>
            <p className="mt-2 text-[12px] font-semibold">1,284 likes</p>
            {bar("90%", "mt-2")}{bar("60%", "mt-1.5")}
          </div>
        </div>
        <div className="wf-pop col-span-7 rounded-[12px] border border-[#DCE5F5] bg-white p-5 shadow-sm" style={pp(1)}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">Content calendar</p>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px] text-[#5B6B84]">
            {days.map((d) => <span key={d}>{d}</span>)}
            {[0, 1, 2].map((r) => days.map((_, c) => { const k = plan[`${c}-${r}`]; return <span key={`${c}-${r}`} className={`flex h-[58px] items-center justify-center rounded-[8px] text-[11px] font-medium ${k ? (k === "Reel" ? "bg-[#0047AB] text-white" : k === "Story" ? "bg-[#0B1F3B] text-white" : "bg-[#E3ECFB] text-[#0047AB]") : "border border-dashed border-[#DCE5F5]"}`}>{k ?? ""}</span>; }))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function MockEmail() {
  const flow = ["Welcome", "Reminder", "Offer", "Review"];
  return (
    <MockShell>
      <div className="p-6">
        <div className="wf-pop overflow-hidden rounded-[12px] border border-[#DCE5F5] bg-white shadow-sm" style={pp(0)}>
          <div className="flex items-center gap-3 border-b border-[#DCE5F5] px-5 py-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0047AB] text-white"><Mail size={15} /></span><div className="leading-tight"><p className="text-[13px] font-semibold">Welcome! Here is 10% off your first order</p><p className="text-[11px] text-[#5B6B84]">yourbrand &lt;hello@yourbrand.com&gt;</p></div></div>
          <div className="grid grid-cols-12 gap-5 p-5">
            <div className="col-span-7 space-y-2">
              <p className={`${pop.className} text-[22px] font-semibold leading-tight tracking-[-0.03em]`}>Thanks for joining us.</p>
              {bar("100%")}{bar("92%")}{bar("70%")}
              <span className="mt-3 inline-block rounded-full bg-[#0047AB] px-5 py-2.5 text-[12px] font-medium text-white">Claim your 10%</span>
            </div>
            <div className="col-span-5 rounded-[10px]" style={{ background: `linear-gradient(140deg,${NAVY},${COBALT})`, minHeight: 130 }} />
          </div>
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">Automated follow-up</p>
        <div className="mt-3 flex items-center">
          {flow.map((f, i) => (
            <React.Fragment key={f}>
              <span className="wf-pop flex items-center gap-2 rounded-full border border-[#CBD8EE] bg-white px-4 py-2.5 text-[12px] font-medium" style={pp(2 + i)}><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0047AB] text-white"><Check size={11} strokeWidth={3} /></span>{f}</span>
              {i < flow.length - 1 && <span className="h-px flex-1 border-t-2 border-dashed border-[#8FB0E8]" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function MockContent() {
  const cols: [string, string[]][] = [["Ideas", ["How to choose a supplier", "Pricing explained", "Common mistakes"]], ["Writing", ["Buyer's guide 2026", "Case study draft"]], ["Published", ["Beginner's checklist", "Local area guide", "FAQ roundup"]]];
  return (
    <MockShell>
      <div className="grid h-full grid-cols-3 gap-4 p-6">
        {cols.map(([t, cards], c) => (
          <div key={t} className="rounded-[12px] bg-[#EAF1FC] p-3">
            <p className="flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">{t}<span className="rounded-full bg-white px-2 py-0.5 text-[10px]">{cards.length}</span></p>
            <div className="mt-3 space-y-3">
              {cards.map((x, i) => (
                <div key={x} className="wf-pop rounded-[10px] border border-[#DCE5F5] bg-white p-3 shadow-sm" style={pp(c * 2 + i)}>
                  <p className="text-[12px] font-medium leading-snug">{x}</p>
                  <div className="mt-3 flex items-center justify-between">{bar("45%")}{c === 2 ? <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0047AB] text-white"><Check size={11} strokeWidth={3} /></span> : <PenTool size={13} className="text-[#0047AB]" />}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

const mocks = [<MockSeo key="s" />, <MockAds key="a" />, <MockSocial key="so" />, <MockEmail key="e" />, <MockContent key="c" />];

/* ------------------------------ CHANNELS ------------------------------ */

function Channels() {
  const [sel, setSel] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const reduced = useReduced();
  React.useEffect(() => {
    if (!auto || reduced) return;
    const t = setTimeout(() => setSel((s) => (s + 1) % channels.length), 7000);
    return () => clearTimeout(t);
  }, [auto, sel, reduced]);
  const c = channels[sel];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = channels.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setSel(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <section id="channels" className="bg-white py-24 md:py-36" aria-label="Marketing channels" onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>The right <b className="font-bold">channels</b>,</>, <>chosen for <Acc dark={false}>your goals</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Pick a channel to see how it works. These screens are illustrations, not client results.</p>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Marketing channels" aria-orientation="vertical" className="lg:col-span-4">
            {channels.map((x, i) => (
              <button key={x.name} role="tab" id={`ch-tab-${i}`} aria-selected={sel === i} aria-controls="ch-panel" tabIndex={sel === i ? 0 : -1} onClick={() => { setSel(i); setAuto(false); }} onKeyDown={(e) => onKey(e, i)} className={`relative block w-full border-t border-[#CBD8EE] py-5 pr-4 text-left transition last:border-b ${ring}`}>
                <span className="flex items-baseline gap-4">
                  <span className="text-xs text-[#5B6B84]">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${pop.className} text-2xl tracking-[-0.03em] transition-colors ${sel === i ? "font-semibold text-[#0047AB]" : "font-extralight text-[#0B1F3B] hover:text-[#0047AB]"}`}>{x.name}</span>
                </span>
                <span className={`grid transition-all duration-500 ${sel === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden"><span className="mt-3 block max-w-sm pl-9 text-sm font-light leading-relaxed text-[#3B4A63]">{x.text}</span></span>
                </span>
                {sel === i && <span aria-hidden className="absolute bottom-[-1px] left-0 h-[2px] bg-[#0047AB]" style={auto && !reduced ? { animation: "tabfill 7s linear forwards" } : { width: "100%" }} />}
              </button>
            ))}
          </div>
          <div id="ch-panel" role="tabpanel" aria-labelledby={`ch-tab-${sel}`} className="lg:col-span-8">
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 -z-10 rounded-[24px] opacity-70" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(47,123,255,.22), transparent 70%)" }} />
              <div key={sel} className="mk-swap">
                <Scaled w={640} h={400} className="rounded-[12px] shadow-[0_40px_110px_rgba(11,31,59,.28)] ring-1 ring-[#0B1F3B]/15"><div aria-hidden="true">{mocks[sel]}</div></Scaled>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">Best for</p><p className="mt-2 text-[#0B1F3B]">{c.best}</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">What we do</p><ul className="mt-2 flex flex-wrap gap-2">{c.has.map((h) => <li key={h} className="rounded-full border border-[#CBD8EE] px-3.5 py-1.5 text-sm text-[#3B4A63]">{h}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ THE FUNNEL ------------------------------ */

function Funnel() {
  const widths = [100, 80, 60, 42];
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-36" aria-label="How channels work together" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 85% 15%, rgba(0,71,171,.5), transparent 45%)" }} />
      <div className={`${wrap} relative`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Every channel</>, <>has a <b className="font-bold">job</b> to <Acc>do</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-white/70">Channels work best as a system. We plan them around the journey from first search to loyal customer.</p>
        </div>
        <ol className="mt-16 space-y-3">
          {stages.map(([name, text, tools], i) => (
            <li key={name} className="rv grid items-center gap-4 lg:grid-cols-12" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="lg:col-span-7">
                <div className="mx-auto flex h-[88px] items-center justify-between rounded-[6px] px-6 transition-[width] duration-1000" style={{ width: `${widths[i]}%`, background: `linear-gradient(90deg, ${COBALT} 0%, ${COBALT_HI} 100%)`, opacity: 1 - i * 0.12 }}>
                  <span className={`${pop.className} text-2xl font-semibold tracking-[-0.03em]`}>{name}</span>
                  <span className="text-sm text-white/80">0{i + 1}</span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="font-light leading-relaxed text-white/85">{text}</p>
                <p className="mt-1 text-sm text-[#6EA1FF]">{tools}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ REPORTING ------------------------------ */

function Reporting() {
  const rows: [string, string, string, boolean][] = [["Website visits", "18,420", "+12%", true], ["Qualified leads", "428", "+26%", true], ["Conversion rate", "3.9%", "+0.3 pts", true], ["Cost per lead", "Index 57", "-11%", false]];
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Reporting">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Lines className="t2" lines={[<>No mystery.</>, <>Just <b className="font-bold">clear</b> <Acc dark={false}>numbers</Acc></>]} />
          <p className="rv mt-6 max-w-md font-light leading-relaxed text-[#3B4A63]">Every month you get a short report in plain language: what we did, what changed and what we will do next. Your accounts and data always stay yours.</p>
          <ul className="rv mt-8 space-y-4" style={{ transitionDelay: "120ms" }}>
            {[[Users, "Leads, not vanity metrics", "We report enquiries and cost per lead, not just clicks and likes."], [BarChart3, "Live dashboard", "See traffic, leads and spend whenever you like."], [Target, "Next steps every month", "A short plan for what to test and where to move budget."]].map(([I, t, d]) => {
              const Icon = I as typeof Users;
              return <li key={t as string} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-[#E3ECFB] text-[#0047AB]"><Icon size={20} aria-hidden="true" /></span><span><span className={`${pop.className} block font-semibold`}>{t as string}</span><span className="text-[#3B4A63]">{d as string}</span></span></li>;
            })}
          </ul>
        </div>
        <div className="rv lg:col-span-7" style={{ transitionDelay: "120ms" }}>
          <div className="rounded-[10px] border border-[#CBD8EE] bg-white p-6 shadow-[0_30px_80px_rgba(11,31,59,.12)] md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">Example monthly report</p><h3 className={`${pop.className} mt-2 text-xl font-semibold tracking-[-0.02em]`}>Cost per lead, index (month 1 = 100)</h3><p className="mt-1 text-sm text-[#3B4A63]">Lower is better.</p></div>
              <span className="rounded-full border border-[#CBD8EE] px-3 py-1 text-[11px] uppercase tracking-wider text-[#5B6B84]">Example</span>
            </div>
            <div className="mt-5"><BarChart values={CPL} labels={MONTHS} theme={LIGHT} name="Cost per lead index by month" /></div>
            <table className="mt-6 w-full text-left text-sm">
              <caption className="sr-only">Example key numbers this month compared with last month</caption>
              <thead><tr className="border-b border-[#DCE5F5] text-xs uppercase tracking-wider text-[#5B6B84]"><th className="py-2 font-medium">Metric</th><th className="py-2 font-medium">This month</th><th className="py-2 text-right font-medium">vs last month</th></tr></thead>
              <tbody>
                {rows.map(([m, v, d, up]) => (
                  <tr key={m} className="border-b border-[#EEF2FA] last:border-0"><td className="py-3 text-[#3B4A63]">{m}</td><td className="py-3 font-medium">{v}</td><td className="py-3 text-right"><span className="inline-flex items-center gap-1 font-medium text-[#0047AB]">{up ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}{d}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
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
@keyframes wfpop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.wf-pop{animation:wfpop .5s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0) * 120ms)}
@keyframes msgin{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}
.msg-in{animation:msgin .45s cubic-bezier(.16,1,.3,1) both}
@keyframes dotb{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
.dot{animation:dotb 1s ease-in-out infinite}
@keyframes mkfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.mk-float{animation:mkfloat 5.5s ease-in-out infinite}
.mk-float-slow{animation:mkfloat 8s ease-in-out infinite}
@keyframes mq{to{transform:translateX(-25%)}}
.mq{animation:mq 38s linear infinite}
@keyframes gridmove{to{background-position:64px 64px}}
.hero-grid{background-image:linear-gradient(rgba(110,161,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(110,161,255,.5) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);animation:gridmove 12s linear infinite}
@keyframes kbbar{0%{width:0}60%,100%{width:100%}}
.kb-bar{width:0;animation:kbbar 6s ease-in-out infinite}
@keyframes kbchk{0%,55%{opacity:0;transform:scale(.3)}70%,100%{opacity:1;transform:none}}
.kb-check{opacity:0;animation:kbchk 6s ease-in-out infinite}
@keyframes tabfill{from{width:0}to{width:100%}}
@keyframes mkswap{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
.mk-swap{animation:mkswap .7s cubic-bezier(.16,1,.3,1) both}
@keyframes mkdraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.sw-line{stroke-dasharray:1;animation:mkdraw 1.6s ease .3s both}
@keyframes areain{from{opacity:0}to{opacity:1}}
.area-in{animation:areain 1.2s ease 1s both}
@keyframes barin{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.bar-in{transform-box:fill-box;transform-origin:bottom;animation:barin .8s cubic-bezier(.16,1,.3,1) both}
@keyframes gx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.gx{transform-origin:left;animation:gx .9s cubic-bezier(.16,1,.3,1) both}
@keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}
.mk-beat{animation:beat 1.6s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function DigitalMarketingClient({ faqs = FAQS, geo }: { faqs?: readonly (readonly [string, string])[]; geo?: React.ReactNode }) {
  const main = React.useRef<HTMLElement>(null);
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

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
      <style>{PAGE_CSS}</style>

      <Hero />
      <Channels />
      <Funnel />
      <Reporting />

      {/* 2. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2" lines={[<>Everything you <b className="font-bold">need</b>,</>, <>nothing you <Acc dark={false}>don&apos;t</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">A focused mix of channels, set up properly and reported honestly.</p>
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
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we run marketing">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%,rgba(0,71,171,.55),transparent 50%)" }} />
        <div className={`${wrap} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>launch day</Acc></>]} />
            <p className="rv mt-5 font-light text-white/70">Six phases, one process. Every project follows it, and every phase feeds the next.</p>
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

      {/* TESTIMONIALS: drop your existing <Testimonials /> component here and import it at the top of this file. */}

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

      {/* Server-rendered summary and locations (passed in from page.tsx) */}
      {geo}

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
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your marketing project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s grow</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's grow", <><Acc>your</Acc> <b className="font-bold">business.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us about your business and goals. We reply with a free audit, a plan and a quote.</p>
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
              <select name="service" required defaultValue="Digital Marketing" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, website, channels you use, monthly budget" /></label>
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