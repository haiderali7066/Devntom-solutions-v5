"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, SiVercel, SiPostgresql, SiFigma, SiWordpress, SiShopify } from "react-icons/si";
import { ArrowRight, ArrowUpRight, Building2, Check, Gauge, LayoutDashboard, Plus, RefreshCw, Rocket, Search, ShieldCheck, ShoppingCart, Smartphone, Zap } from "lucide-react";
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
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
.bar{transform-origin:bottom;animation:barIn 1.6s cubic-bezier(.16,1,.3,1) both,barPulse 5s ease-in-out infinite alternate}
@keyframes barIn{from{transform:scaleY(0)}}
@keyframes barPulse{from{opacity:.6}}
.bp{animation:bp 8s cubic-bezier(.16,1,.3,1) infinite var(--dl)}
@keyframes bp{0%{opacity:0;transform:translateY(16px) scale(.97)}9%,82%{opacity:1;transform:none}94%,100%{opacity:0}}
.fl{animation:fl 7s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-12px)}}
.mock{transform:perspective(1500px) rotateX(calc(18deg * (1 - var(--t,0)))) scale(calc(.92 + .08 * var(--t,0)));transform-origin:50% 0}
.sr{stroke-dasharray:276.5;stroke-dashoffset:276.5;transition:stroke-dashoffset 2s cubic-bezier(.16,1,.3,1) var(--dl,0s)}
.in .sr{stroke-dashoffset:calc(276.5 * (1 - var(--v) / 100))}
[data-sc]{pointer-events:none}[data-sc] a,[data-sc] button{pointer-events:auto}
.mq{animation:mq 40s linear infinite}
.mqw:hover .mq{animation-play-state:paused}
@keyframes mq{to{transform:translate3d(-50%,0,0)}}
.imr{clip-path:inset(0 0 100% 0);transition:clip-path 1.5s cubic-bezier(.16,1,.3,1)}.in .imr,.imr.in{clip-path:inset(0)}
.blob{animation:blob 16s ease-in-out infinite alternate}@keyframes blob{to{transform:translate3d(8vw,-6vh,0) scale(1.25)}}
.rb{background:linear-gradient(110deg,#00B4FF,rgba(0,180,255,.08) 25%,#007BFF 50%,rgba(0,123,255,.08) 75%,#00B4FF);background-size:300% 100%;animation:rb 6s linear infinite}@keyframes rb{to{background-position:300% 0}}
.spk{stroke-dasharray:1;animation:spk 5s ease infinite var(--dl)}@keyframes spk{0%{stroke-dashoffset:1}35%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:0;opacity:0}}
.cur{animation:cur 8s ease-in-out infinite}@keyframes cur{0%,100%{left:68%;top:88%}35%{left:16%;top:56%}42%{transform:scale(.8)}50%{left:16%;top:56%;transform:none}75%{left:60%;top:30%}}
@media (prefers-reduced-motion:reduce){.imr{clip-path:none!important;transition:none}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.bar,.bp,.fl,.mq,.blob,.rb,.spk,.cur{animation:none!important}.spk{stroke-dashoffset:0}.bp{opacity:1}.sr{transition:none;stroke-dashoffset:calc(276.5 * (1 - var(--v) / 100))}.mock{transform:none}}
`;

const types = [
  [Building2, "Business websites", "Clear, credible company sites that turn visitors into enquiries."],
  [ShoppingCart, "E-commerce stores", "Fast catalogues, smooth checkout and order management."],
  [LayoutDashboard, "Web apps and portals", "Dashboards, customer portals and booking systems."],
  [Rocket, "Landing pages", "One-goal pages for campaigns, launches and lead capture."],
  [RefreshCw, "Redesign and migration", "Modernise a slow or outdated site without losing search rankings."],
  [Search, "SEO-first builds", "Structure, speed and schema planned from the first wireframe."],
] as const;

// Placeholder photos from Unsplash. Replace with real project screenshots before launch.
const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const typeImgs = ["photo-1519389950473-47ba0277781c", "photo-1556742049-0cfed4f6a45d", "photo-1551288049-bebda4e38f71", "photo-1460925895917-afdab827c52f", "photo-1498050108023-c5249f4df085", "photo-1531297484001-80022131f5a1"];
const strip = [["photo-1498050108023-c5249f4df085", "Clean, modern code"], ["photo-1551288049-bebda4e38f71", "Dashboards that make sense"], ["photo-1512941937669-90a1b58e7e9c", "Perfect on every screen"]];
const proc = [
  ["01", "Discovery and strategy", "We learn your goals, customers and competitors, then agree scope, sitemap and success metrics.", ["Goals", "Users", "Roadmap"], "photo-1519389950473-47ba0277781c"],
  ["02", "Wireframes and UX", "Every page is sketched and tested as a clickable flow before any visual design starts.", ["Sitemap", "Wireframes", "User flows"], "photo-1460925895917-afdab827c52f"],
  ["03", "Visual design", "Brand-led layouts, typography and motion designed in Figma and approved by you.", ["UI design", "Motion", "Design system"], "photo-1531297484001-80022131f5a1"],
  ["04", "Development", "Clean, component-based code with a demo at every milestone so you always see progress.", ["Next.js", "CMS", "Integrations"], "photo-1498050108023-c5249f4df085"],
  ["05", "Testing and launch", "Speed, security, accessibility and device testing, then a monitored go-live with a rollback plan.", ["QA", "Performance", "Deployment"], "photo-1551288049-bebda4e38f71"],
  ["06", "Support and growth", "Updates, monitoring, SEO and new features, so your website keeps getting better.", ["Care plans", "SEO", "Analytics"], "photo-1512941937669-90a1b58e7e9c"],
] as const;

const roadPts = [[250, 160], [750, 476], [250, 792], [750, 1108], [250, 1424], [750, 1740]];
const ROAD = `M500 0 C500 90 250 60 250 160 ` + roadPts.slice(1).map(([x, y], i) => `C${roadPts[i][0]} ${roadPts[i][1] + 158} ${x} ${y - 158} ${x} ${y}`).join(" ") + " C750 1830 500 1810 500 1900";

const principles = [
  [Gauge, "Fast by default", "Optimised images, lean code and edge hosting so pages feel instant."],
  [Smartphone, "Mobile first", "Designed on the smallest screen first, then expanded."],
  [Search, "Search ready", "Clean metadata, structured data and a logical content structure."],
  [ShieldCheck, "Secure and scalable", "Safe forms, protected data and an architecture that grows with you."],
] as const;

const scores = [["Performance", 98], ["Accessibility", 100], ["Best practices", 100], ["SEO", 100]] as const;
const stack = [[SiNextdotjs, "Next.js"], [SiReact, "React"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"], [SiNodedotjs, "Node.js"], [SiPostgresql, "PostgreSQL"], [SiVercel, "Vercel"], [SiFigma, "Figma"], [SiWordpress, "WordPress"], [SiShopify, "Shopify"]] as const;

const stages = [
  ["01", "Design", "We map goals and users, then wireframe every page before any visual polish."],
  ["02", "Build", "Real components, real content and animation that supports the story."],
  ["03", "Launch", "Tested, measured and deployed with monitoring and a rollback plan."],
] as const;

const faqs = [
  ["How much does a website cost?", "It depends on pages, features and integrations. After a short discovery call we send a fixed quote with deliverables and a timeline."],
  ["How long does a website take?", "A focused business site usually takes a few weeks. Larger e-commerce sites and web apps take longer. You get a dated plan before we start."],
  ["Will my website rank on Google?", "We build search foundations in from day one: fast loading, clean structure, metadata and schema. Rankings also depend on content and competition, so we can add ongoing SEO."],
  ["Can I update the website myself?", "Yes. We connect a CMS or admin panel that suits your team and show you how to use it."],
  ["Do you support the site after launch?", "Yes. We offer maintenance, performance monitoring, security updates and new features."],
];
const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

const bars = Array.from({ length: 34 }, (_, i) => 28 + 72 * Math.exp(-(((i - 16.5) / 8.5) ** 2)));

const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sceneCoord = (p: number, n: number, hold: number) => { const t = clamp01(p) * (n - 1); const i = Math.min(Math.floor(t), n - 2); const h = hold / 2; return i + easeInOut(clamp01((t - i - h) / (1 - 2 * h))); };
const reveal = (coord: number, scene: number, delay: number) => { const d = coord - scene; const lag = d < 0 ? delay : 1 - delay; return clamp01((0.6 - Math.abs(d) - lag * 0.2) / 0.25); };
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

// Camera frames for the exploded website: rotation, layer gap, scale, offset (vw, vh).
const KEYS = [
  { rx: 56, ry: -26, gap: 14, s: 0.82, x: 0, y: 10 },
  { rx: 60, ry: -32, gap: 110, s: 0.8, x: 20, y: 0 },
  { rx: 22, ry: -20, gap: 64, s: 0.95, x: 20, y: 0 },
  { rx: 10, ry: 16, gap: 34, s: 1, x: -20, y: 0 },
  { rx: 0, ry: 0, gap: 4, s: 1.12, x: 16, y: 0 },
  { rx: 64, ry: 22, gap: 26, s: 0.62, x: 0, y: -6 },
];
const PLATE_OP = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0.35, 0.35, 0.5, 1, 0.6], [0.3, 0.3, 0.3, 0.6, 1], [0, 0, 0, 1, 1], [1, 1, 1, 1, 1]];
const PLATES = ["Hosting", "Code", "Content", "Design", "Speed and SEO"];
const PLATE_BG = ["#0A1A33", "#071A33", "#0B2447", "linear-gradient(135deg,#0A3F9E,#0B1F3B)", "rgba(255,255,255,.05)"];
const SCENE_NAV = ["Cover", "Layers", "Design", "Speed", "Launch", "Start"];

const PARS = Array.from({ length: 28 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53) % 100, s: 0.3 + ((i * 13) % 10) / 10, r: 1 + (i % 3) }));
const GHOST = ["Layers", "Design", "Speed", "Launch"];

const PLATE_INFO = ["Fast, secure servers, SSL and a global CDN.", "Clean, component-based code that any team can extend.", "Search-ready copy, headings and media.", "Brand-led layouts, type, colour and motion.", "Lighthouse speed, accessibility and SEO checks."];
const procDo = [["Goals and audience", "Sitemap and scope", "Success metrics"], ["Wireframes", "Clickable flows", "Content outline"], ["Design system", "Page layouts", "Motion plan"], ["Component build", "CMS and forms", "Weekly demos"], ["Speed and device tests", "Security checks", "Go-live plan"], ["Monitoring", "Updates", "SEO and growth"]];

function PlateBody({ i, scene }: { i: number; scene: number }) {
  if (i === 0) return <div className="space-y-2.5 p-6 pt-12">{[0, 1, 2, 3].map((k) => <div key={k} className="flex items-center gap-3 rounded-[4px] border border-white/10 bg-white/[.04] px-3 py-2"><i className={`h-2 w-2 rounded-full transition-colors duration-700 ${scene >= 4 || k < 2 ? "bg-[#10B981]" : "bg-[#F59E0B]"}`} /><i className="h-2 flex-1 rounded-full bg-white/15" /><i className="h-2 w-10 rounded-full bg-[#00B4FF]/60" /></div>)}{scene >= 4 && <p className="text-xs text-[#10B981]">All systems live</p>}</div>;
  if (i === 1) return <div className="space-y-2 p-6 pt-12">{[["w-1/3", "bg-[#00B4FF]"], ["w-3/5", "bg-[#93C5FD]"], ["w-2/5", "bg-[#3B82F6]"], ["w-4/5", "bg-[#93C5FD]"], ["w-1/2", "bg-[#00B4FF]"], ["w-2/3", "bg-[#3B82F6]"]].map(([w, c], k) => <i key={k} className={`block h-2 rounded-full transition-all duration-700 ${w} ${c}`} style={{ marginLeft: `${(k % 3) * 18}px`, opacity: scene === 1 ? 1 : 0.55 }} />)}</div>;
  if (i === 2) return <div className="grid grid-cols-5 gap-3 p-6 pt-12"><div className="col-span-2 h-28 rounded-[6px] bg-white/10" /><div className="col-span-3 space-y-2.5"><i className="block h-3 w-4/5 rounded-full bg-white/30" /><i className="block h-2 w-full rounded-full bg-white/15" /><i className="block h-2 w-5/6 rounded-full bg-white/15" /><i className="block h-2 w-2/3 rounded-full bg-white/15" /></div></div>;
  if (i === 3) return <div className="space-y-3 p-6 pt-12"><div className="flex items-center justify-between"><i className="h-4 w-4 rounded-full bg-[#00B4FF]" /><i className="h-5 w-16 rounded-full bg-white" /></div><div className="relative h-28 overflow-hidden rounded-[6px]"><img src={img("photo-1551288049-bebda4e38f71", 700)} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC]/80 to-[#00B4FF]/20" /><b className={`${pop.className} absolute bottom-3 left-4 text-xl`}>Grow faster online.</b></div>{scene === 2 ? <div className="flex items-center gap-2">{["#0052CC", "#007BFF", "#00B4FF", "#93C5FD"].map((c) => <i key={c} className="h-6 w-6 rounded-full border border-white/30" style={{ background: c }} />)}<span className={`${pop.className} ml-2 text-xl font-semibold`}>Aa</span></div> : <i className="block h-8 w-28 rounded-full bg-white" />}</div>;
  if (scene === 3) return <div className="flex h-full items-end gap-2 p-6 pt-14">{[40, 55, 48, 72, 66, 88, 80, 100].map((h, k) => <i key={k} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#0052CC] to-[#00B4FF]" style={{ height: `${h * 0.7}%` }} />)}</div>;
  return <div className="flex flex-wrap gap-3 p-6 pt-12">{[["98", "Speed"], ["100", "SEO"], ["100", "Access"]].map(([v, l]) => <div key={l} className="rounded-[8px] border border-[#00B4FF]/30 bg-[#00B4FF]/10 px-4 py-3"><p className={`${pop.className} text-2xl font-semibold text-[#10B981]`}>{v}</p><p className="text-xs text-white/60">{l}</p></div>)}</div>;
}

const Acc = ({ children, dark = true }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>{children}</span>
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
  const [scene, setScene] = useState(0);
  const [hot, setHot] = useState<number | null>(null);
  const [sel, setSel] = useState<number | null>(null);
  const live = useRef({ hot: -1, sel: -1 });
  live.current.hot = hot ?? -1;
  live.current.sel = sel ?? -1;
  const dragMoved = useRef(0);

  useEffect(() => {
    const el = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    el.querySelectorAll("[data-r],.rv,.imr").forEach((n) => io.observe(n));
    const wrapEl = el.querySelector<HTMLElement>("[data-scrubwrap]")!;
    const obj = el.querySelector<HTMLElement>("[data-obj]")!;
    const plates = [...obj.querySelectorAll<HTMLElement>("[data-plate]")];
    const items = [...wrapEl.querySelectorAll<HTMLElement>("[data-sc]")].map((e) => ({ e, sc: Number(e.dataset.sc), d: Number(e.dataset.d) || 0 }));
    const ticks = [...wrapEl.querySelectorAll<HTMLElement>("[data-tick]")];
    const glowEl = wrapEl.querySelector<HTMLElement>("[data-glow]")!;
    const pars = [...wrapEl.querySelectorAll<HTMLElement>("[data-par]")];
    const lbls = [...wrapEl.querySelectorAll<HTMLElement>("[data-lbl]")];
    const barEl = wrapEl.querySelector<HTMLElement>("[data-bar]")!;
    const cntEl = wrapEl.querySelector<HTMLElement>("[data-cnt]")!;
    const proc = el.querySelector<HTMLElement>("[data-proc]")!;
    const stepEls = [...proc.querySelectorAll<HTMLElement>("[data-step]")];
    const road = proc.querySelector<SVGPathElement>("path[data-road]");
    const mk = proc.querySelector<HTMLElement>("[data-marker]");
    const hud = el.querySelector<HTMLElement>("[data-hud]");
    const hbar = el.querySelector<HTMLElement>("[data-hudbar]");
    const sceneEl = wrapEl.querySelector<HTMLElement>("[data-scene]")!;
    const lift = plates.map(() => 0);
    let raf = 0, vis = true, last = performance.now(), time = 0, prog = -1, px = 0, py = 0, tx = 0, ty = 0, drx = 0, dry = 0, vyaw = 0, vpit = 0, lastScene = -1, dragX = 0, dragY = 0;
    let dragging = false;
    const vio = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    vio.observe(wrapEl);
    const onMove = (e: PointerEvent) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; };
    addEventListener("pointermove", onMove);
    const down = (e: PointerEvent) => { if (e.pointerType === "touch") return; dragging = true; dragX = e.clientX; dragY = e.clientY; dragMoved.current = 0; };
    const dmove = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - dragX, dy = e.clientY - dragY; dragX = e.clientX; dragY = e.clientY; dragMoved.current += Math.abs(dx) + Math.abs(dy); dry += dx * 0.35; drx = Math.max(-55, Math.min(55, drx - dy * 0.3)); vyaw = dx * 0.06; };
    const up = () => { dragging = false; };
    sceneEl.addEventListener("pointerdown", down);
    addEventListener("pointermove", dmove);
    addEventListener("pointerup", up);
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const vh = innerHeight;
      const pr = proc.getBoundingClientRect();
      const pp = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.6 - pr.top) / pr.height));
      proc.style.setProperty("--pp", pp.toFixed(3));
      if (road && mk && innerWidth >= 1024) { try { const L = road.getTotalLength(); const pt = road.getPointAtLength(pp * L); const q = road.getPointAtLength(Math.min(L, pp * L + 6)); mk.style.left = `${pt.x / 10}%`; mk.style.top = `${pt.y / 19}%`; mk.style.transform = `translate(-50%,-50%) rotate(${(Math.atan2(q.x - pt.x, -(q.y - pt.y)) * 180 / Math.PI).toFixed(1)}deg)`; } catch { /* hidden */ } }
      let cnt = 0;
      stepEls.forEach((st) => { const c = st.querySelector("[data-card]")!.getBoundingClientRect(); const on = reduce || c.top + c.height / 2 < vh * 0.62; st.dataset.on = String(on); if (on) cnt++; });
      if (hud) hud.textContent = `Stop ${String(cnt).padStart(2, "0")} / 06`;
      if (hbar) hbar.style.transform = `scaleX(${pp.toFixed(3)})`;
      if (!vis) return;
      if (!reduce) time += dt;
      px += (tx - px) * (1 - Math.exp(-dt * 4)); py += (ty - py) * (1 - Math.exp(-dt * 4));
      const r = wrapEl.getBoundingClientRect();
      const p = clamp01(-r.top / (r.height - vh));
      prog = prog < 0 || reduce ? p : prog + (p - prog) * (1 - Math.exp(-dt * 9));
      const coord = sceneCoord(prog, 6, 0.34);
      const i = Math.max(0, Math.min(4, Math.floor(coord))), f = coord - i;
      const a = KEYS[i], b = KEYS[i + 1], small = innerWidth < 768;
      if (!dragging) { dry += vyaw; drx += vpit; vyaw *= Math.exp(-dt * 3); vpit *= Math.exp(-dt * 3); const kk = Math.exp(-dt * 0.9); dry *= kk; drx *= kk; }
      const rx = lerp(a.rx, b.rx, f) + (reduce ? 0 : py * -5) + drx;
      const ry = lerp(a.ry, b.ry, f) + (reduce ? 0 : px * 8 + Math.sin(time * 0.6) * 3) + dry;
      const gap = lerp(a.gap, b.gap, f), sc = lerp(a.s, b.s, f) * (small ? 0.6 : 1);
      const x = small ? 0 : lerp(a.x, b.x, f), y = lerp(a.y, b.y, f) + (small ? 20 : 0);
      obj.style.transform = `translate3d(${x}vw,${y}vh,0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
const H = live.current.hot, S = live.current.sel;
      plates.forEach((pl, k) => {
        const on = k === H || k === S;
        lift[k] += ((on ? 46 : 0) - lift[k]) * (1 - Math.exp(-dt * 10));
        pl.style.transform = `translateZ(${((k - 2) * gap + lift[k]).toFixed(1)}px)`;
        pl.style.opacity = String((lerp(PLATE_OP[i][k], PLATE_OP[i + 1][k], f) * (S >= 0 && k !== S ? 0.3 : 1)).toFixed(3));
        pl.dataset.hot = String(on);
      });
      items.forEach((it) => {
        const v = reveal(coord, it.sc, it.d), dir = coord < it.sc ? 1 : -1, s2 = it.e.style;
        s2.visibility = v <= 0 ? "hidden" : ""; s2.opacity = String(v);
        if (!reduce) {
          const dr = it.e.dataset.drift ? (coord - it.sc) * -16 : 0;
          s2.transform = `translate3d(${dr.toFixed(2)}vw,${((1 - v) * 34 * dir).toFixed(1)}px,0)`;
          s2.filter = v > 0.995 || it.e.dataset.drift ? "" : `blur(${((1 - v) * 8).toFixed(1)}px)`;
        }
      });
      glowEl.style.transform = `translate3d(${x * 1.4}vw,${y * 1.2}vh,0) scale(${(0.8 + sc * 0.45).toFixed(3)})`;
      glowEl.style.opacity = String((0.55 + 0.45 * Math.sin(coord * 1.3 + 1)).toFixed(3));
      pars.forEach((q) => { const sp = Number(q.dataset.par); q.style.transform = `translate3d(${(px * sp * 40).toFixed(1)}px,${(-prog * sp * 520 + py * sp * 20).toFixed(1)}px,0)`; });
      const lv = reveal(coord, 1, 0.3) * 0.9 + reveal(coord, 2, 0.3) * 0.4;
      lbls.forEach((l) => { l.style.opacity = String(Math.min(1, lv)); });
      barEl.style.transform = `scaleX(${prog.toFixed(3)})`;
      const scene = Math.round(coord);
      if (scene !== lastScene) { lastScene = scene; setScene(scene); }
      ticks.forEach((t, k) => { t.dataset.on = String(k === scene); });
      cntEl.textContent = `0${scene + 1} / 06`;
    };
    raf = requestAnimationFrame(frame);
    return () => { io.disconnect(); vio.disconnect(); removeEventListener("pointermove", onMove); removeEventListener("pointermove", dmove); removeEventListener("pointerup", up); sceneEl.removeEventListener("pointerdown", down); cancelAnimationFrame(raf); };
  }, []);

  const jump = (i: number) => {
    const w = root.current!.querySelector<HTMLElement>("[data-scrubwrap]")!;
    const r = w.getBoundingClientRect();
    window.scrollTo({ top: scrollY + r.top + (i / 5) * (r.height - innerHeight), behavior: "smooth" });
  };

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  // Full literal class names so Tailwind can detect them.
  const on = ["group-data-[stage=0]:opacity-100", "group-data-[stage=1]:opacity-100", "group-data-[stage=2]:opacity-100"];
  const step = ["group-data-[stage=0]:opacity-100 group-data-[stage=0]:translate-x-3", "group-data-[stage=1]:opacity-100 group-data-[stage=1]:translate-x-3", "group-data-[stage=2]:opacity-100 group-data-[stage=2]:translate-x-3"];
  const stageCls = (n: number) => `transition-opacity duration-700 opacity-0 ${on[n]}`;

  return (
    <main ref={root} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* 1. SCROLL-SCRUBBED STAGE: an exploded website, scroll is the timeline */}
      <section data-scrubwrap className="relative bg-[#050E1F]" style={{ height: "750svh" }} aria-label="Website development">
        <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
          <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 40%,rgba(0,123,255,.38),transparent 70%),radial-gradient(ellipse 50% 45% at 5% 100%,rgba(0,180,255,.2),transparent 70%),linear-gradient(180deg,#02060F,#06142B)" }} />
          <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(147,197,253,.3) 1px,transparent 1px)", backgroundSize: "30px 30px", maskImage: "radial-gradient(ellipse 70% 60% at 60% 45%,#000,transparent)" }} />
          <div aria-hidden="true" className="grain absolute inset-0" />
          <div aria-hidden="true" data-glow className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -ml-[35vmin] -mt-[35vmin] rounded-full bg-[#007BFF]/35 blur-[110px]" style={{ willChange: "transform" }} />
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {PARS.map((q, i) => <i key={i} data-par={q.s} className="absolute block rounded-full bg-[#93C5FD]" style={{ left: `${q.x}%`, top: `${q.y}%`, width: q.r * 2, height: q.r * 2, opacity: 0.25 + q.s * 0.4 }} />)}
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10"><i data-bar className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF] shadow-[0_0_14px_#00B4FF]" /></div>
          <p aria-hidden="true" data-cnt className="absolute bottom-[3.2vh] right-[6vw] hidden font-mono text-xs tracking-[0.2em] text-white/60 md:block">01 / 06</p>
          {GHOST.map((g, k) => <p key={g} aria-hidden="true" data-sc={k + 1} data-d="0" data-drift="1" className={`${pop.className} pointer-events-none absolute left-[2vw] top-[26vh] whitespace-nowrap text-[clamp(6rem,24vw,24rem)] font-bold leading-none tracking-[-0.06em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(147,197,253,.16)" }}>{g}</p>)}
          <div data-sc="0" data-d="0.6" aria-hidden="true" className="absolute bottom-[3vh] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 md:flex"><span>Scroll</span><i className="block h-9 w-5 rounded-full border border-white/40 p-1"><b className="block h-2 w-1 animate-bounce rounded-full bg-[#00B4FF] mx-auto" /></i></div>

          <div aria-hidden="true" className="absolute bottom-[12vh] left-1/2 h-12 w-[55vw] -translate-x-1/2 rounded-full bg-[#007BFF]/25 blur-3xl" />
          <div data-scene className="absolute inset-0 grid cursor-grab place-items-center active:cursor-grabbing" style={{ perspective: "1700px", touchAction: "pan-y" }}>
            <div data-obj className="relative h-[min(44vh,400px)] w-[min(80vw,700px)]" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
              {PLATES.map((l, k) => (
                <div key={l} data-plate data-hot="false" role="button" tabIndex={0} aria-label={`${l} layer`} aria-pressed={sel === k}
                  onPointerEnter={() => setHot(k)} onPointerLeave={() => setHot(null)} onFocus={() => setHot(k)} onBlur={() => setHot(null)}
                  onClick={() => { if (dragMoved.current < 6) setSel(sel === k ? null : k); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(sel === k ? null : k); } }}
                  className="absolute inset-0 overflow-hidden rounded-[14px] border border-white/20 shadow-[0_30px_80px_rgba(0,123,255,.25)] outline-none backdrop-blur-sm transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#00B4FF] data-[hot=true]:border-[#00B4FF] data-[hot=true]:shadow-[0_0_70px_rgba(0,180,255,.6)]"
                  style={{ background: PLATE_BG[k], willChange: "transform,opacity" }}>
                  <span className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#38BDF8]">0{k + 1} {l}</span>
                  <PlateBody i={k} scene={scene} />
                </div>
              ))}
            </div>
          </div>
          {scene >= 1 && scene <= 4 && (
            <div className="pointer-events-none absolute bottom-[4vh] left-1/2 z-10 w-[min(92vw,32rem)] -translate-x-1/2 rounded-[10px] border border-white/15 bg-[#050E1F]/80 px-5 py-3 text-center text-sm text-[#CFE2FF] backdrop-blur">
              {(hot ?? sel) !== null ? <><b className={`${pop.className} text-white`}>{PLATES[(hot ?? sel) as number]}</b>: {PLATE_INFO[(hot ?? sel) as number]}{sel !== null && <span className="text-[#38BDF8]"> Click again to release.</span>}</> : "Drag to rotate. Hover a layer. Click to focus it."}
            </div>
          )}

          {/* scene 0 */}
          <p data-sc="0" data-d="0" className="absolute left-[6vw] top-[16vh] inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.04] px-4 py-1.5 text-sm text-[#CFE2FF]"><span className="text-[#F59E0B]" aria-hidden="true">✦</span>Website Development</p>
          <p data-sc="0" data-d="0.2" className="absolute left-[6vw] top-[24vh] max-w-sm text-lg font-light leading-relaxed text-white/70">We design and engineer fast, beautiful, search-ready websites that win trust in the first three seconds.</p>
          <h1 data-sc="0" data-d="0.1" className={`${pop.className} absolute bottom-[6vh] left-[5vw] text-[clamp(3.4rem,15vw,14rem)] font-bold leading-[.85] tracking-[-0.05em]`}>Websites <Acc>that win</Acc></h1>
          <div data-sc="0" data-d="0.4" className="absolute bottom-[9vh] right-[6vw] hidden flex-col gap-3 md:flex">
            <a href="#contact" className={`rounded-[4px] bg-white px-6 py-3 text-center text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-black`}>Start your website</a>
            <Link href="/projects" className={`rounded-[4px] border border-white/25 px-6 py-3 text-center text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-black`}>See our work</Link>
          </div>

          {/* scene 1 */}
          <div data-sc="1" data-d="0.1" className="absolute left-[6vw] top-[14vh] max-w-md md:top-1/2 md:-translate-y-1/2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#38BDF8]">01 / Layers</p>
            <h2 className={`${pop.className} mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-extralight leading-[1] tracking-[-0.035em]`}>Five layers.<br /><b className="font-bold">One</b> website.</h2>
            <ol className="mt-6 space-y-2 text-[15px] font-light text-[#B8C9DE]">{PLATES.map((l, k) => <li key={l} className="flex gap-3"><span className="font-mono text-[#38BDF8]">0{k + 1}</span>{["Fast, secure infrastructure", "Clean, component-based code", "Clear, search-ready content", "Brand-led interface design", "Measured speed and SEO"][k]}</li>)}</ol>
          </div>
          {/* scene 2 */}
          <div data-sc="2" data-d="0.1" className="absolute left-[6vw] top-[14vh] max-w-md md:top-1/2 md:-translate-y-1/2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#38BDF8]">02 / Design</p>
            <h2 className={`${pop.className} mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-extralight leading-[1] tracking-[-0.035em]`}>Designed to be <b className="font-bold">remembered</b></h2>
            <p className="mt-5 font-light leading-relaxed text-[#B8C9DE]">Typography, colour and motion built around your brand, then tested on every screen before a single line goes live.</p>
            <div className="mt-6 flex items-center gap-3">{["#0052CC", "#007BFF", "#00B4FF", "#93C5FD", "#0B1F3B"].map((c) => <i key={c} className="h-9 w-9 rounded-full border border-white/30" style={{ background: c }} />)}<span className={`${pop.className} ml-3 text-3xl font-semibold`}>Aa</span></div>
          </div>
          {/* scene 3 */}
          <div data-sc="3" data-d="0.1" className="absolute right-[6vw] top-[14vh] max-w-md md:top-1/2 md:-translate-y-1/2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#38BDF8]">03 / Speed</p>
            <h2 className={`${pop.className} mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-extralight leading-[1] tracking-[-0.035em]`}>Measured, <b className="font-bold">not guessed</b></h2>
            <div className="mt-6 grid grid-cols-2 gap-3">{[["98", "Performance"], ["100", "Accessibility"], ["100", "Best practices"], ["100", "SEO"]].map(([v, l]) => <div key={l} className="rounded-[8px] border border-white/15 bg-white/[.05] p-4"><p className={`${pop.className} text-3xl font-semibold text-[#10B981]`}>{v}</p><p className="text-sm text-[#B8C9DE]">{l}</p></div>)}</div>
            <p className="mt-4 text-xs text-white/50">Lighthouse targets we build to. Tested and reported per project.</p>
          </div>
          {/* scene 4 */}
          <div data-sc="4" data-d="0.1" className="absolute left-[6vw] top-[14vh] max-w-md md:top-1/2 md:-translate-y-1/2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#38BDF8]">04 / Launch</p>
            <h2 className={`${pop.className} mt-3 text-[clamp(2.2rem,5vw,4.4rem)] font-extralight leading-[1] tracking-[-0.035em]`}>Live in weeks, <b className="font-bold">not months</b></h2>
            <p className="mt-5 font-light leading-relaxed text-[#B8C9DE]">Tested, monitored and deployed with a rollback plan, then supported as your business grows.</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#10B981] px-4 py-1.5 text-sm font-semibold text-black"><Zap size={14} aria-hidden="true" />Deployed</span>
          </div>
          {/* scene 5 */}
          <div data-sc="5" data-d="0.1" className="absolute inset-x-0 bottom-[7vh] px-6 text-center">
            <h2 className={`${pop.className} mx-auto max-w-4xl text-[clamp(2.4rem,6.4vw,6rem)] font-extralight leading-[1.02] tracking-[-0.04em]`}>Let&apos;s build <b className="font-bold">yours</b> <Acc>today</Acc></h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className={`group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-black`}>Book a call <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={18} aria-hidden="true" /></span></a>
              <a href="https://wa.me/923256036838" className={`rounded-full border border-white/30 px-7 py-3 font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-black`}>WhatsApp us</a>
            </div>
          </div>

          <nav aria-label="Page frames" className="absolute right-[2vw] top-1/2 hidden -translate-y-1/2 flex-col items-end md:flex">
            {SCENE_NAV.map((n, k) => (
              <button key={n} type="button" data-tick data-on="false" onClick={() => jump(k)} className="group flex items-center gap-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 data-[on=true]:text-white">
                <span className="opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">{n}</span>
                <span className="block h-px w-4 bg-current opacity-50 transition-all duration-500 group-data-[on=true]:w-9 group-data-[on=true]:bg-[#00B4FF] group-data-[on=true]:opacity-100" />
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* 5. WHAT WE BUILD */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="build">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>Every kind of</>, <><b className="font-bold">website</b>, <Acc dark={false}>done right</Acc></>]} />
            <p id="build" className="rv max-w-sm font-light leading-relaxed text-[#475569]">From a ten-page company site to a full e-commerce platform, built on one proven process.</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {types.map(([Icon, t, d], i) => (
              <li key={t} className="rv group relative flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#071A33] text-white shadow-[0_20px_60px_rgba(7,26,51,.14)] transition-colors duration-500 hover:border-[#00B4FF]/40" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={img(typeImgs[i], 700)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/30 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/20 bg-[#050E1F]/70 text-[#38BDF8] backdrop-blur"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className="absolute right-5 top-5 font-mono text-xs tracking-[0.18em] text-white/60">0{i + 1}</span>
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute -left-[45%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[.07] to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
                <div className="relative p-7">
                  <h3 className={`${pop.className} flex items-start justify-between gap-3 text-[22px] font-semibold tracking-[-0.02em]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#38BDF8] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                  <p className="mt-3 text-[14px] font-light leading-[1.75] text-[#B8C9DE]">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5b. PROCESS: the road */}
      <section className="relative overflow-x-clip bg-[#050E1F] py-24 text-white md:py-36" aria-labelledby="proc">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 15% 10%,rgba(0,123,255,.25),transparent 45%),radial-gradient(circle at 90% 90%,rgba(0,180,255,.15),transparent 45%)" }} />
        <div className={`${wrap} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>The road to a</>, <>website that <Acc>wins</Acc></>]} />
            <p id="proc" className="rv mt-5 font-light text-white/60">Six stops, one clear route. Scroll and follow the glowing line from first call to a site that keeps growing.</p>
          </div>
          <div aria-hidden="true" className="sticky top-20 z-20 mx-auto mt-10 flex w-fit items-center gap-4 rounded-full border border-white/15 bg-[#050E1F]/85 px-5 py-2 text-sm backdrop-blur">
            <span data-hud className="font-mono text-[#38BDF8]">Stop 00 / 06</span>
            <span className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10"><i data-hudbar className="block h-full origin-left rounded-full bg-gradient-to-r from-[#007BFF] to-[#00B4FF]" style={{ transform: "scaleX(0)" }} /></span>
          </div>
          <div data-proc className="relative mx-auto mt-10 max-w-[1100px] lg:aspect-[1000/1900]" style={{ "--pp": 0 } as CSSProperties}>
            <svg aria-hidden="true" className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 1900" fill="none">
              <path d={ROAD} stroke="#2A4A80" strokeWidth="96" strokeLinecap="round" />
              <path d={ROAD} stroke="#0E2243" strokeWidth="88" strokeLinecap="round" />
              <path d={ROAD} stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeDasharray="16 18" />
              <path data-road d={ROAD} pathLength={1} stroke="#00B4FF" strokeWidth="7" strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--pp))", filter: "drop-shadow(0 0 10px #00B4FF)" }} />
            </svg>
            <span data-marker aria-hidden="true" className="absolute z-10 hidden h-10 w-10 items-center justify-center lg:flex" style={{ left: "50%", top: 0, transform: "translate(-50%,-50%)" }}><svg viewBox="0 0 24 24" className="h-9 w-9 drop-shadow-[0_0_14px_#00B4FF]"><path d="M12 2 L21 21 L12 16.5 L3 21 Z" fill="#fff" stroke="#00B4FF" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
            <ol className="space-y-6 lg:space-y-0">
              {proc.map(([n, t, d, tags, id], i) => {
                const [x, y] = roadPts[i];
                return (
                  <li key={t} data-step data-on="false" className="group relative lg:contents">
                    <span aria-hidden="true" className={`${pop.className} absolute z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 bg-[#050E1F] font-mono text-sm transition-all duration-700 group-data-[on=true]:scale-110 group-data-[on=true]:border-[#00B4FF] group-data-[on=true]:bg-[#007BFF] group-data-[on=true]:shadow-[0_0_35px_#00B4FF] lg:flex`} style={{ left: `${x / 10}%`, top: `${y / 19}%` }}><span className="absolute inset-0 rounded-full border border-[#00B4FF] opacity-0 group-data-[on=true]:animate-ping" />{n}</span>
                    <div data-card data-r className={`overflow-hidden rounded-[10px] border border-white/10 bg-[#071A33]/90 opacity-40 backdrop-blur transition-opacity duration-1000 group-data-[on=true]:opacity-100 lg:absolute lg:w-[40%] lg:-translate-y-1/2 ${x < 500 ? "lg:left-[56%]" : "lg:left-[4%]"}`} style={{ top: `${y / 19}%` }}>
                      <div className="imr h-32 overflow-hidden"><img src={img(id, 700)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                      <div className="p-5">
                        <p className="font-mono text-xs text-[#38BDF8]">Stop {n}</p>
                        <h3 className={`${pop.className} mt-1 text-xl font-semibold tracking-[-0.02em]`}>{t}</h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-[#B8C9DE]">{d}</p>
                        <ul className="mt-4 space-y-1.5">{procDo[i].map((g, j) => <li key={g} className="flex items-center gap-2.5 text-sm text-[#CFE2FF]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-transparent transition-all duration-500 group-data-[on=true]:bg-[#10B981] group-data-[on=true]:text-black" style={{ transitionDelay: `${300 + j * 250}ms` }}><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{g}</li>)}</ul>
                        <ul className="mt-4 flex flex-wrap gap-2">{tags.map((g) => <li key={g} className="rounded-full border border-white/15 bg-white/[.05] px-2.5 py-0.5 text-xs text-[#93C5FD]">{g}</li>)}</ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <Industries />

      {/* 6. WHY OUR WEBSITES PERFORM */}
      <section className="relative overflow-hidden py-24 text-white md:py-36" style={{ background: "linear-gradient(135deg,#0B1F3B,#0A1A2F)" }} aria-labelledby="why">
        <div aria-hidden="true" className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[#007BFF]/25 blur-[140px]" />
        <div className={`${wrap} relative`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl" lines={[<>Why our websites</>, <><b className="font-bold">perform</b> <Acc>better</Acc></>]} />
            <p id="why" className="rv max-w-sm font-light leading-relaxed text-[#CFE2FF]">Four habits behind every site we ship. Each one is measured, not promised.</p>
          </div>
          <ul className="mt-14 grid gap-5 lg:grid-cols-12">
            {principles.map(([Icon, t, d], i) => (
              <li key={t} data-r className={`rv group relative overflow-hidden rounded-[10px] border border-white/10 bg-[#071A33]/80 p-8 transition-colors duration-500 hover:border-[#00B4FF]/50 md:p-10 ${i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5"}`} style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#007BFF]/20 blur-[80px] transition group-hover:bg-[#00B4FF]/30" />
                <span aria-hidden="true" className="pointer-events-none absolute -left-[45%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[.07] to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
                <div className="relative flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-[#00B4FF]/25 bg-[#007BFF]/15 text-[#38BDF8]"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className="font-mono text-xs tracking-[0.18em] text-white/35">0{i + 1}</span></div>
                <h3 className={`${pop.className} relative mt-8 text-2xl font-semibold tracking-[-0.02em]`}>{t}</h3>
                <p className="relative mt-2 max-w-md font-light leading-relaxed text-[#B8C9DE]">{d}</p>
                <div className="relative" aria-hidden="true">
                  {i === 0 && <div className="mt-8 space-y-4">{[["Typical site", "about 4 s", "w-full", "bg-white/25"], ["Our target", "under 1.5 s", "w-[34%]", "bg-gradient-to-r from-[#007BFF] to-[#00B4FF]"]].map(([l, v, w, c]) => <div key={l}><div className="mb-1.5 flex justify-between text-xs text-[#B8C9DE]"><span>{l}</span><span>{v}</span></div><div className="h-2.5 rounded-full bg-white/10"><i className={`block h-full origin-left scale-x-0 rounded-full transition-transform duration-[1800ms] ease-out [.in_&]:scale-x-100 ${w} ${c}`} /></div></div>)}</div>}
                  {i === 1 && <div className="mt-8 flex items-end gap-4"><i className="fl block h-24 w-14 rounded-[10px] border-2 border-[#00B4FF]/60 p-1.5"><b className="block h-3 rounded-full bg-[#007BFF]" /></i><i className="fl block h-28 w-24 rounded-[8px] border-2 border-white/30" style={{ animationDelay: "-2s" }} /><i className="fl hidden h-24 w-36 rounded-[6px] border-2 border-white/20 sm:block" style={{ animationDelay: "-4s" }} /></div>}
                  {i === 2 && <div className="mt-8 rounded-[6px] border border-white/10 bg-white/[.05] p-4"><p className="text-xs text-[#93C5FD]">yourbrand.com</p><p className="mt-1 text-lg font-semibold">Your Website | Trusted Experts</p><p className="mt-1 text-xs text-[#B8C9DE]">★★★★★ Clear structure, schema and fast loading.</p><span className="absolute right-8 top-24 animate-pulse rounded-full bg-[#10B981] px-3 py-1 text-xs font-bold text-black">#1</span></div>}
                  {i === 3 && <div className="mt-8 flex items-center"><span className="relative flex h-16 w-16 items-center justify-center"><span className="absolute inset-0 animate-ping rounded-full bg-[#00B4FF]/30" /><span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#007BFF]/30 text-[#38BDF8]"><ShieldCheck size={30} /></span></span><p className="ml-5 text-sm text-[#B8C9DE]">SSL, secure forms, safe data handling</p></div>}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mqw relative mt-16 overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }} aria-label="Technologies we use">
          <div className="mq flex w-max">
            {[...stack, ...stack].map(([Ic, n], i) => <span key={i} className="mr-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-white/15 bg-white/[.05] px-6 py-3.5 text-lg"><Ic aria-hidden="true" className="h-6 w-6 text-[#93C5FD]" />{n}</span>)}
          </div>
        </div>
      </section>

      <ClientLogos />
      <Testimonials />
      <Blog />

      {/* 7. FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-32" aria-labelledby="faq">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4"><div className="lg:sticky lg:top-28"><Lines className="t2 text-[#0B1F3B]" lines={[<>Website</>, <><b className="font-bold">questions</b></>]} /><p id="faq" className="rv mt-6 max-w-xs font-light text-[#475569]">More questions? Write to <a href="mailto:info@devntomsolutions.com" className="font-medium text-[#0052CC] underline underline-offset-4">info@devntomsolutions.com</a>.</p></div></div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="rv group border-t border-[#CFE2FF] last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 ${ring} [&::-webkit-details-marker]:hidden`}>
                  <span className={`${pop.className} text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B] md:text-xl`}>{q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span>
                </summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative isolate overflow-hidden py-28 text-center text-white md:py-40" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }} aria-labelledby="cta">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(circle,#000,transparent 70%)" }} />
        <div className={wrap}>
          <Lines className="t0 mx-auto max-w-4xl" lines={[<>Ready for a website</>, <>people <Acc>remember?</Acc></>]} />
          <p id="cta" className="rv mx-auto mt-6 max-w-md text-lg font-light text-[#CFE2FF]">Tell us about your project. We reply with a plan, a timeline and a quote.</p>
          <div className="rv mt-10 flex flex-wrap justify-center gap-3">
            <a href="#contact" className={`group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#0A3F9E]`}>Book a call <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={18} aria-hidden="true" /></span></a>
            <a href="https://wa.me/923256036838" className={`rounded-full border border-white/30 px-7 py-3 font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-[#0A3F9E]`}>WhatsApp us</a>
          </div>
        </div>
      </section>
      <div id="contact"><ContactForm /></div>
    </main>
  );
}