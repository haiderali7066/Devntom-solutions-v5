"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * /services/custom-software-development
 *
 * One self-contained file: no imports from your own files, no Nav, no Footer
 * (both live in app/layout.tsx).
 *
 * The opening is a pinned, scroll-driven isometric stack drawn in SVG (no WebGL):
 * Interface, API and logic, Database, Cloud. Scroll pulls the layers apart one at a
 * time while data packets travel between them. Below it: tabbed product mock-ups
 * (CRM, ERP, SaaS, internal tools), what is included, process, FAQ and a contact form.
 *
 * Palette: cobalt, navy, white, black.
 * Search this file for "TESTIMONIALS" to see where to drop your component.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Check, Layers, LifeBuoy, Package, Plug, Plus, Receipt, ShieldCheck, Users, Workflow } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB";
const COBALT_HI = "#2F7BFF"; // lighter cobalt for the 3D-style stack and glow on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const NAVY_DEEP = "#071A33";
const BLACK = "#02050B";
const WHITE = "#FFFFFF";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/custom-software-development";
const TITLE = "Custom Software Development Services | DEVNTOM Solutions";
const DESC = "Scalable web apps, SaaS platforms, CRM, ERP and business management systems built around how you work. DEVNTOM Solutions, Lahore, Riyadh and London.";

/* ------------------------------ CONTENT ------------------------------ */

const frames = [
  {
    kicker: "Custom software",
    title: "Software built around how you work",
    text: "Scalable web apps, SaaS platforms, CRM, ERP and business management systems built to streamline complex operations.",
    chips: [] as string[],
  },
  {
    kicker: "01 · Interface",
    title: "Screens people enjoy using",
    text: "Dashboards, portals and admin panels designed around real workflows, so your team and customers get things done faster.",
    chips: ["React and Next.js", "Role-based views", "Accessible UI"],
  },
  {
    kicker: "02 · API and logic",
    title: "Your rules in one reliable place",
    text: "Secure APIs and services that connect your tools, automate approvals and keep every business rule consistent.",
    chips: ["REST and GraphQL", "Auth and permissions", "Integrations"],
  },
  {
    kicker: "03 · Database",
    title: "Data you can trust",
    text: "Clean data models, backups and reporting, so every number on the screen is the right one.",
    chips: ["SQL and NoSQL", "Backups and recovery", "Reporting-ready"],
  },
  {
    kicker: "04 · Cloud",
    title: "Ready to scale from day one",
    text: "Deployment, monitoring and release pipelines, so the system stays fast and stable as your users and data grow.",
    chips: ["Cloud hosting", "Monitoring", "CI/CD"],
  },
];
const LAYERS = ["Interface", "API and logic", "Database", "Cloud"];

const builds = [
  {
    id: "crm",
    name: "CRM",
    title: "Track every lead and customer in one place",
    text: "A CRM shaped around your sales process, not a generic template. Your team always knows who to talk to next.",
    points: ["Pipelines and deal stages", "Contact and activity history", "Reminders and reports your team will use"],
  },
  {
    id: "erp",
    name: "ERP",
    title: "Run operations from one system",
    text: "Inventory, orders, invoicing and people, connected, so nobody re-types the same data into three places.",
    points: ["Inventory and orders", "Invoicing and finance", "Roles and approvals"],
  },
  {
    id: "saas",
    name: "SaaS",
    title: "Launch a platform customers can subscribe to",
    text: "Multi-tenant products with accounts, plans, billing and dashboards, built to grow with your customer base.",
    points: ["Accounts, plans and billing", "Usage dashboards", "APIs for your own customers"],
  },
  {
    id: "tools",
    name: "Internal tools",
    title: "Replace spreadsheets and email chains",
    text: "Simple, secure apps for the processes your team repeats every week, with the approvals and alerts built in.",
    points: ["Approval workflows", "Admin panels", "Automations and notifications"],
  },
] as const;

const included = [
  [Layers, "Discovery and architecture", "We map your process and design a system that fits it before a line of code is written."],
  [ShieldCheck, "Secure by design", "Authentication, permissions and safe handling of data are part of the first build, not an add-on."],
  [Plug, "Integrations", "Payments, email, messaging and the tools you already use, connected through clean APIs."],
  [BarChart3, "Admin and reporting", "Dashboards and exports so managers see what is happening without asking anyone."],
  [BadgeCheck, "Testing and quality", "Every release is tested on real scenarios before it reaches your team."],
  [LifeBuoy, "Support and scaling", "Fixes, improvements and new features after launch, as your needs change."],
] as const;

const steps = [
  ["Discovery and strategy", "Goals, users, processes and a plan we both sign off on."],
  ["UI/UX and architecture", "Screens and system design you approve before development."],
  ["Development", "Built in short cycles, with working software you can try early."],
  ["Testing and QA", "Real scenarios, devices and data checked before launch."],
  ["Launch", "Deployment, data migration and training handled with you."],
  ["Support and growth", "Monitoring, fixes and new features as you grow."],
] as const;

const stack = ["React and Next.js", "TypeScript", "Node.js", "REST and GraphQL APIs", "SQL and NoSQL databases", "Cloud hosting and CI/CD"];

const related = [
  ["AI Automation", "/services/ai-automation", "Workflows that remove repetitive work from your new system."],
  ["Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps that connect to it."],
  ["UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
  ["Website Development", "/services/website-development", "A fast public site to go with your platform."],
] as const;

const faqs = [
  ["What kinds of software do you build?", "Web apps, SaaS platforms, CRM, ERP, internal tools, portals and business management systems. If a process lives in spreadsheets or email, we can turn it into software."],
  ["Why custom software instead of an off-the-shelf tool?", "Off-the-shelf tools make you adapt your process to them. Custom software adapts to you, connects to your other systems and grows with you, with no per-seat surprises."],
  ["How does a project start?", "Tell us what you want to achieve. We run a short discovery step, then send a clear plan with deliverables, a timeline and a quote."],
  ["Will I see progress during development?", "Yes. We build in short cycles and share working software early, so you can give feedback while it is cheap to change."],
  ["Can you connect it to the tools we already use?", "Yes. We integrate with payment providers, email, messaging, accounting tools and other systems through their APIs."],
  ["Who owns the code?", "You do. We agree ownership, documentation and handover terms in the project scope, so you are never locked in."],
  ["How do you keep the software secure?", "Authentication, role-based permissions, validated input, backups and monitoring are part of the build from the start, and we review them before every release."],
  ["Do you support the software after launch?", "Yes. Support and growth is the last step of our process, covering fixes, monitoring and new features."],
] as const;

const serviceOptions = ["Custom Software", "Website Development", "Mobile Apps", "AI Automation", "Digital Marketing", "UI/UX Design", "SEO", "Something else"];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development",
    serviceType: "Custom software development",
    description: DESC,
    url: SITE + PATH,
    provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
      { "@type": "ListItem", position: 3, name: "Custom Software", item: SITE + PATH },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

/* ------------------------------ SCROLL TIMELINE ------------------------------ */

const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** 0 while the root's top sits at the stage's top, 1 when its bottom does. */
const progressFrom = (top: number, height: number, viewport: number) => {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp01(-top / travel);
};

/** Scroll progress to a continuous frame coordinate in 0..n-1. Each frame holds for `hold` of its slot. */
const sceneCoord = (p: number, n: number, hold: number) => {
  if (n <= 1) return 0;
  const t = clamp01(p) * (n - 1);
  const i = Math.min(Math.floor(t), n - 2);
  const h = hold / 2;
  return i + easeInOut(clamp01((t - i - h) / (1 - 2 * h)));
};

/** How present one frame is at `coord`. */
const reveal = (coord: number, scene: number) => clamp01((0.62 - Math.abs(coord - scene)) / 0.22);

const SCENES = frames.length;
const HOLD = 0.34;

/* ------------------------------ ISOMETRIC STACK ------------------------------ */

const SIZE = 150; // half the side of one layer's square, in plane units
const THICK = 22;
const ISO = "matrix(0.866 0.5 -0.866 0.5 500 0)";
const CX = 500;
const CY = 440;
/** four connector ports on each layer, in plane coordinates */
const PORTS: [number, number][] = [[-70, -70], [70, -70], [-70, 70], [70, 70]];
const portX = (p: [number, number]) => CX + (p[0] - p[1]) * 0.866;
const portY = (p: [number, number]) => (p[0] + p[1]) * 0.5;

const RX = SIZE * 0.866 * 2; // horizontal half-width of the rhombus (matches the iso matrix)
const TOP = `${CX},${-SIZE} ${CX + RX},0 ${CX},${SIZE} ${CX - RX},0`;
const LEFT = `${CX - RX},0 ${CX},${SIZE} ${CX},${SIZE + THICK} ${CX - RX},${THICK}`;
const RIGHT = `${CX},${SIZE} ${CX + RX},0 ${CX + RX},${THICK} ${CX},${SIZE + THICK}`;

const stroke = { fill: "none", stroke: COBALT_TEXT, strokeWidth: 1.6, strokeLinejoin: "round" } as const;
const soft = { fill: "rgba(47,123,255,0.16)", stroke: COBALT_TEXT, strokeWidth: 1.4, strokeLinejoin: "round" } as const;

function LayerArt({ i }: { i: number }) {
  if (i === 0)
    return (
      <>
        <rect x={-120} y={-110} width={240} height={220} rx={8} {...stroke} />
        <rect x={-120} y={-110} width={240} height={26} rx={8} {...soft} />
        {[0, 1, 2].map((k) => <circle key={k} cx={-106 + k * 14} cy={-97} r={3.5} fill={COBALT_TEXT} />)}
        <rect x={-120} y={-84} width={50} height={194} {...soft} />
        {[0, 1, 2].map((k) => <rect key={k} x={-62 + k * 60} y={-76} width={54} height={44} rx={4} {...soft} />)}
        {[30, 52, 40, 70, 58, 84].map((h, k) => <rect key={k} x={-56 + k * 28} y={96 - h} width={16} height={h} rx={2} fill={COBALT_HI} opacity={0.75} />)}
      </>
    );
  if (i === 1) {
    const n: [number, number][] = [[-92, -62], [-22, -96], [72, -52], [-72, 40], [8, 8], [94, 62], [-8, 92]];
    const e = [[0, 1], [1, 2], [0, 4], [1, 4], [2, 4], [3, 4], [4, 5], [4, 6], [3, 6], [2, 5]];
    return (
      <>
        {e.map(([a, b], k) => <line key={k} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={COBALT_TEXT} strokeWidth={1.6} opacity={0.8} />)}
        {n.map((p, k) => <circle key={k} cx={p[0]} cy={p[1]} r={k === 4 ? 16 : 10} fill={k === 4 ? COBALT_HI : "rgba(47,123,255,0.25)"} stroke={COBALT_TEXT} strokeWidth={1.6} />)}
      </>
    );
  }
  if (i === 2)
    return (
      <>
        {[-90, -25, 40].map((y, k) => (
          <g key={k}>
            <rect x={-104} y={y} width={208} height={50} rx={6} {...soft} />
            <circle cx={-84} cy={y + 25} r={5} fill={COBALT_HI} />
            {[0, 1, 2, 3].map((r) => <rect key={r} x={-62 + r * 42} y={y + 21} width={30} height={8} rx={2} fill={COBALT_TEXT} opacity={0.55} />)}
          </g>
        ))}
      </>
    );
  return (
    <>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={-102 + c * 72} y={-102 + r * 72} width={60} height={60} rx={6} {...soft} />
            <circle cx={-90 + c * 72} cy={-90 + r * 72} r={3.5} fill={(r + c) % 2 ? COBALT_HI : WHITE} opacity={0.9} />
            <rect x={-90 + c * 72} y={-72 + r * 72} width={36} height={5} rx={2} fill={COBALT_TEXT} opacity={0.5} />
            <rect x={-90 + c * 72} y={-62 + r * 72} width={24} height={5} rx={2} fill={COBALT_TEXT} opacity={0.5} />
          </g>
        ))
      )}
    </>
  );
}

/* ------------------------------ PINNED STAGE ------------------------------ */

function StackStage() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const layerRefs = React.useRef<(SVGGElement | null)[]>([]);
  const glowRefs = React.useRef<(SVGPolygonElement | null)[]>([]);
  const labelRefs = React.useRef<(SVGGElement | null)[]>([]);
  const lineRefs = React.useRef<(SVGLineElement | null)[]>([]);
  const packetRefs = React.useRef<(SVGCircleElement | null)[]>([]);
  const haloRef = React.useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = React.useState(false);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const look = React.useRef({ reduced });
  look.current = { reduced };

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const items = Array.from(stage.querySelectorAll<HTMLElement>("[data-sc]")).map((el) => ({ el, scene: Number(el.dataset.sc), last: -1 }));

    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let time = 0;
    let prog = -1;
    let shown = -1;
    let pointer = 0;
    let pointerTarget = 0;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      pointerTarget = ((e.clientX - r.left) / r.width) * 2 - 1;
    };
    stage.addEventListener("pointermove", onMove);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const still = look.current.reduced;
      if (!still) time += dt;

      const r = root.getBoundingClientRect();
      const p = progressFrom(r.top, r.height, stage.clientHeight);
      prog = prog < 0 || still ? p : prog + (p - prog) * (1 - Math.exp(-dt * 9));
      const coord = sceneCoord(prog, SCENES, HOLD);
      const scene = Math.round(coord);
      if (scene !== shown) {
        shown = scene;
        setActive(scene);
      }
      pointer += (pointerTarget - pointer) * (1 - Math.exp(-dt * 4));

      // layout of the stack
      const e = easeInOut(clamp01(coord));
      const gap = 40 + (138 - 40) * e;
      const bob = still ? 0 : Math.sin(time * 0.9) * 5;
      const ys = [0, 1, 2, 3].map((i) => CY + (i - 1.5) * gap + bob);
      const px = still ? 0 : pointer * 14;
      const hs = [0, 1, 2, 3].map((i) => clamp01(1 - Math.abs(coord - (i + 1)) * 1.4));

      for (let i = 0; i < 4; i++) {
        layerRefs.current[i]?.setAttribute("transform", `translate(${px.toFixed(1)} ${ys[i].toFixed(1)})`);
        const g = glowRefs.current[i];
        if (g) g.style.opacity = String(0.12 * (1 - e) + hs[i] * 0.95);
        const lb = labelRefs.current[i];
        if (lb) lb.style.opacity = String(e * (0.35 + 0.65 * hs[i]));
      }

      for (let i = 0; i < 3; i++) {
        const strong = Math.max(hs[i], hs[i + 1]);
        for (let j = 0; j < 4; j++) {
          const x = portX(PORTS[j]) + px;
          const y1 = ys[i] + portY(PORTS[j]);
          const y2 = ys[i + 1] + portY(PORTS[j]);
          const ln = lineRefs.current[i * 4 + j];
          if (ln) {
            ln.setAttribute("x1", x.toFixed(1));
            ln.setAttribute("x2", x.toFixed(1));
            ln.setAttribute("y1", y1.toFixed(1));
            ln.setAttribute("y2", y2.toFixed(1));
            ln.style.opacity = String(e * (0.18 + 0.6 * strong));
          }
          for (let k = 0; k < 2; k++) {
            const c = packetRefs.current[(i * 4 + j) * 2 + k];
            if (!c) continue;
            let t = (time * 0.32 + j * 0.23 + k * 0.5) % 1;
            if (j % 2) t = 1 - t;
            c.setAttribute("cx", x.toFixed(1));
            c.setAttribute("cy", (y1 + (y2 - y1) * t).toFixed(1));
            c.style.opacity = String(e * Math.sin(Math.PI * t) * (0.45 + 0.55 * strong));
          }
        }
      }

      // the haze behind the stack follows the active layer
      const halo = haloRef.current;
      if (halo) {
        const focus = Math.max(0, Math.min(3, coord - 1));
        const yy = coord < 1 ? CY : CY + (focus - 1.5) * gap;
        halo.style.setProperty("--hy", `${((yy / 900) * 100).toFixed(1)}%`);
      }

      // the text
      for (const it of items) {
        const v = reveal(coord, it.scene);
        const q = Math.round(v * 500) / 500;
        if (q === it.last) continue;
        it.last = q;
        const s = it.el.style;
        const dir = coord < it.scene ? 1 : -1;
        s.visibility = q <= 0 ? "hidden" : "";
        s.opacity = String(q);
        if (!still) {
          s.transform = `translateY(${((1 - q) * 28 * dir).toFixed(1)}px)`;
          s.filter = q > 0.995 ? "" : `blur(${((1 - q) * 6).toFixed(1)}px)`;
        }
      }
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
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
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
      stage.removeEventListener("pointermove", onMove);
    };
  }, []);

  const jump = (i: number) => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const r = root.getBoundingClientRect();
    const travel = r.height - stage.clientHeight;
    window.scrollBy({ top: (i / (SCENES - 1)) * travel + r.top, behavior: reduced ? "auto" : "smooth" });
  };

  const sans = { fontFamily: rob.style.fontFamily } as React.CSSProperties;
  const display = { fontFamily: pop.style.fontFamily } as React.CSSProperties;

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{ height: `calc(100svh * ${(1 + (SCENES - 1) * 1.1).toFixed(2)})`, background: BLACK }}
      aria-label="Custom software, explained in four layers"
    >
      <div ref={stageRef} className="sticky top-0 w-full select-none overflow-hidden" style={{ height: "100svh", background: BLACK, color: WHITE }}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 90% at 70% 50%, ${NAVY} 0%, ${BLACK} 70%)` }} />
        <div
          ref={haloRef}
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-full lg:w-[66%]"
          style={{ ["--hy" as string]: "49%", background: `radial-gradient(closest-side at 50% var(--hy), ${COBALT}80, ${COBALT}22 55%, transparent 100%)` } as React.CSSProperties}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(rgba(110,161,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(110,161,255,.5) 1px,transparent 1px)", backgroundSize: "64px 64px", WebkitMaskImage: "radial-gradient(70% 70% at 70% 50%,#000,transparent)", maskImage: "radial-gradient(70% 70% at 70% 50%,#000,transparent)" }} />

        {/* the stack */}
        <div className="absolute right-0 top-0 h-[54%] w-full lg:h-full lg:w-[66%]">
          <svg viewBox="0 0 1000 900" role="img" aria-label="Four layers of a software system: interface, API and logic, database and cloud" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="sw-top" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#10305E" />
                <stop offset="1" stopColor="#0A1B38" />
              </linearGradient>
              <linearGradient id="sw-side" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0A2A5C" />
                <stop offset="1" stopColor="#050E1F" />
              </linearGradient>
              <filter id="sw-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" /></filter>
              <filter id="sw-dot" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3.5" /></filter>
            </defs>

            {Array.from({ length: 12 }).map((_, k) => (
              <line key={k} ref={(el) => { lineRefs.current[k] = el; }} stroke={COBALT_TEXT} strokeWidth={1.3} strokeDasharray="3 6" opacity={0} />
            ))}

            {[3, 2, 1, 0].map((i) => (
              <g key={i} ref={(el) => { layerRefs.current[i] = el; }} transform={`translate(0 ${CY + (i - 1.5) * 40})`}>
                <polygon points={LEFT} fill="url(#sw-side)" stroke="rgba(110,161,255,.35)" strokeWidth={1} strokeLinejoin="round" />
                <polygon points={RIGHT} fill="url(#sw-side)" stroke="rgba(110,161,255,.35)" strokeWidth={1} strokeLinejoin="round" opacity={0.85} />
                <polygon ref={(el) => { glowRefs.current[i] = el; }} points={TOP} fill={COBALT_HI} stroke={COBALT_HI} strokeWidth={14} strokeLinejoin="round" filter="url(#sw-blur)" opacity={0.12} />
                <polygon points={TOP} fill="url(#sw-top)" stroke={COBALT_HI} strokeWidth={2} strokeLinejoin="round" />
                <g transform={ISO}><LayerArt i={i} /></g>
                {PORTS.map((p, k) => <circle key={k} cx={portX(p)} cy={portY(p)} r={4.5} fill={BLACK} stroke={WHITE} strokeWidth={1.6} />)}
                <g ref={(el) => { labelRefs.current[i] = el; }} opacity={0}>
                  <line x1={CX + RX + 12} y1={0} x2={CX + RX + 60} y2={0} stroke={COBALT_TEXT} strokeWidth={1.2} />
                  <text x={CX + RX + 70} y={6} fill={WHITE} fontSize={22} style={{ ...display, fontWeight: 300 }}>{LAYERS[i]}</text>
                </g>
              </g>
            ))}

            <g filter="url(#sw-dot)">
              {Array.from({ length: 24 }).map((_, k) => (
                <circle key={k} ref={(el) => { packetRefs.current[k] = el; }} r={6} fill={COBALT_TEXT} opacity={0} />
              ))}
            </g>
            <g>
              {Array.from({ length: 24 }).map((_, k) => (
                <circle key={k} ref={(el) => { packetRefs.current[24 + k] = el; }} r={2.6} fill={WHITE} opacity={0} />
              ))}
            </g>
          </svg>
        </div>

        {/* the text frames */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] lg:inset-y-0 lg:right-auto lg:h-full lg:w-[44%]">
          {frames.map((f, i) => (
            <div
              key={f.kicker}
              data-sc={i}
              className="pointer-events-auto absolute inset-0 flex flex-col justify-start px-6 pt-2 md:px-12 lg:justify-center lg:pt-0 xl:pl-[max(3rem,calc((100vw-1400px)/2+3rem))]"
              style={{ visibility: i === 0 ? undefined : "hidden", opacity: i === 0 ? undefined : 0 }}
              aria-hidden={active !== i}
            >
              <p style={sans} className="text-xs uppercase tracking-[0.22em] text-[#6EA1FF]">{f.kicker}</p>
              <p style={{ ...display, fontWeight: 200, letterSpacing: "-0.04em" }} className={`mt-4 leading-[1] ${i === 0 ? "text-[clamp(2.1rem,5.2vw,5rem)]" : "text-[clamp(1.8rem,4vw,3.8rem)]"}`}>{f.title}</p>
              <p style={sans} className="mt-5 max-w-md text-[0.95rem] font-light leading-relaxed text-[#DCE7FB] md:text-base">{f.text}</p>
              {f.chips.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {f.chips.map((c) => <li key={c} style={sans} className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-[#DCE7FB]">{c}</li>)}
                </ul>
              )}
              {i === 0 && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#contact-form" style={sans} className="group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EA1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    Start a project <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                  <a href="#builds" style={sans} className="inline-flex items-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EA1FF]">See what we build</a>
                </div>
              )}
              {i === SCENES - 1 && (
                <div className="mt-8">
                  <a href="#contact-form" style={sans} className="group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EA1FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    Tell us what to build <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* frame dots */}
        <nav aria-label="Software layers" className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {frames.map((f, i) => (
            <button
              key={f.kicker}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Go to ${f.kicker}`}
              aria-current={active === i ? "step" : undefined}
              className="group flex h-4 w-4 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6EA1FF]"
            >
              <span className={`block rounded-full transition-all ${active === i ? "h-3 w-3 bg-[#2F7BFF]" : "h-1.5 w-1.5 bg-white/40 group-hover:bg-white"}`} />
            </button>
          ))}
        </nav>
        <div style={sans} className="pointer-events-none absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.3em] text-white/60 md:left-12 lg:bottom-6">Scroll to pull the layers apart</div>
      </div>
    </section>
  );
}

/* ------------------------------ PRODUCT MOCK-UPS ------------------------------ */

const bar = "block rounded-full bg-white/25";
const pill = "rounded-full px-2.5 py-0.5 text-[10px] font-medium";

function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-white/15 bg-[#071A33] shadow-[0_30px_90px_rgba(0,71,171,.35)]" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2F7BFF]" />
        <span className="ml-3 text-xs text-white/60">{title}</span>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

function MockCRM() {
  const cols: [string, number][] = [["New", 3], ["Contacted", 2], ["Proposal", 3], ["Won", 2]];
  return (
    <WindowFrame title="CRM · Pipeline">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cols.map(([n, c], ci) => (
          <div key={n} className="rounded-[4px] bg-white/[0.05] p-3">
            <div className="mb-3 flex items-center justify-between text-xs text-white/70"><span>{n}</span><span className={`${pill} bg-[#2F7BFF]/25 text-[#6EA1FF]`}>{c}</span></div>
            <div className="space-y-2">
              {Array.from({ length: c }).map((_, k) => (
                <div key={k} className="sw-pop rounded-[4px] border border-white/10 bg-white/[0.06] p-3" style={{ ["--i" as string]: ci * 2 + k } as React.CSSProperties}>
                  <span className={`${bar} h-2 w-3/4`} />
                  <span className={`${bar} mt-2 h-2 w-1/2 opacity-60`} />
                  <span className={`${pill} mt-3 inline-block ${n === "Won" ? "bg-[#2F7BFF] text-white" : "bg-white/10 text-white/70"}`}>{n === "Won" ? "Closed" : "Follow up"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

function MockERP() {
  const mods = [[Package, "Inventory"], [Receipt, "Invoicing"], [Users, "People"], [Workflow, "Orders"]] as const;
  const bars = [38, 56, 44, 72, 60, 88, 68];
  return (
    <WindowFrame title="ERP · Operations">
      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <ul className="space-y-2">
          {mods.map(([Icon, n], k) => (
            <li key={n} className={`sw-pop flex items-center gap-3 rounded-[4px] px-3 py-3 text-sm ${k === 0 ? "bg-[#2F7BFF]/25 text-white" : "bg-white/[0.05] text-white/70"}`} style={{ ["--i" as string]: k } as React.CSSProperties}>
              <Icon size={16} aria-hidden="true" /> {n}
            </li>
          ))}
        </ul>
        <div className="rounded-[4px] bg-white/[0.05] p-4">
          <span className={`${bar} h-2 w-1/3`} />
          <div className="mt-5 flex h-36 items-end gap-3">
            {bars.map((h, k) => <span key={k} className="sw-pop flex-1 rounded-t-[3px] bg-gradient-to-t from-[#0047AB] to-[#2F7BFF]" style={{ height: `${h}%`, ["--i" as string]: k + 2 } as React.CSSProperties} />)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((k) => <span key={k} className={`${bar} h-2`} />)}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function MockSaaS() {
  return (
    <WindowFrame title="SaaS · Dashboard">
      <div className="grid grid-cols-3 gap-3">
        {["Active users", "Usage", "Plan"].map((n, k) => (
          <div key={n} className="sw-pop rounded-[4px] bg-white/[0.05] p-3" style={{ ["--i" as string]: k } as React.CSSProperties}>
            <div className="text-[11px] text-white/60">{n}</div>
            <span className={`${bar} mt-3 h-3 w-2/3`} />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[4px] bg-white/[0.05] p-4">
        <svg viewBox="0 0 400 110" className="h-28 w-full" preserveAspectRatio="none">
          <path d="M0 90 C40 80 60 60 100 66 S170 30 210 40 S290 70 330 32 S380 18 400 12 L400 110 L0 110Z" fill="rgba(47,123,255,.18)" />
          <path className="sw-draw" pathLength={1} d="M0 90 C40 80 60 60 100 66 S170 30 210 40 S290 70 330 32 S380 18 400 12" fill="none" stroke={COBALT_TEXT} strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((k) => (
          <div key={k} className="sw-pop flex items-center justify-between rounded-[4px] bg-white/[0.05] px-3 py-3" style={{ ["--i" as string]: k + 3 } as React.CSSProperties}>
            <span className={`${bar} h-2 w-1/3`} />
            <span className={`${pill} ${k === 0 ? "bg-[#2F7BFF] text-white" : "bg-white/10 text-white/70"}`}>{k === 0 ? "Pro" : "Starter"}</span>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

function MockTools() {
  const rows: [string, string, boolean][] = [["Leave request", "Approved", true], ["Purchase order", "Pending", false], ["Access request", "In review", false], ["Expense claim", "Approved", true]];
  return (
    <WindowFrame title="Internal tools · Approvals">
      <div className="space-y-2">
        {rows.map(([n, s, ok], k) => (
          <div key={n} className="sw-pop flex items-center justify-between gap-3 rounded-[4px] bg-white/[0.05] px-4 py-3.5" style={{ ["--i" as string]: k } as React.CSSProperties}>
            <div className="flex items-center gap-3">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${ok ? "bg-[#2F7BFF] text-white" : "border border-white/30 text-transparent"}`}><Check size={13} strokeWidth={3} /></span>
              <span className="text-sm text-white/85">{n}</span>
            </div>
            <span className={`${pill} ${ok ? "bg-[#2F7BFF]/25 text-[#6EA1FF]" : "bg-white/10 text-white/70"}`}>{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3"><span className="rounded-full bg-[#0047AB] px-5 py-2 text-xs text-white">Approve</span><span className="rounded-full border border-white/25 px-5 py-2 text-xs text-white/70">Request changes</span></div>
    </WindowFrame>
  );
}

const mocks: Record<string, React.ReactNode> = { crm: <MockCRM />, erp: <MockERP />, saas: <MockSaaS />, tools: <MockTools /> };

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
@keyframes swpop{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
.sw-pop{animation:swpop .6s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes swdraw{to{stroke-dashoffset:0}}
.sw-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:swdraw 1.4s ease .2s forwards}
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}.sw-pop{animation:none}.sw-draw{animation:none;stroke-dashoffset:0}}
`;

const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] focus-visible:ring-offset-2";
const field = "mt-2 w-full rounded-[3px] border border-[#CBD8EE] bg-[#F4F8FE] px-4 py-3 text-[#0B1F3B] placeholder:text-[#5B6B84] focus:border-[#0047AB] focus:outline-none focus:ring-2 focus:ring-[#0047AB]/30";
const label = "text-sm font-medium text-[#0B1F3B]";

function Lines({ lines, className = "" }: { lines: React.ReactNode[]; className?: string }) {
  return (
    <h2 data-r className={`${pop.className} font-extralight ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="ln block">
          <span style={{ transitionDelay: `${i * 110}ms` }}>{l}</span>
        </span>
      ))}
    </h2>
  );
}

const Acc = ({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) => (
  <span className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#6EA1FF]" : "text-[#0047AB]"}`}>{children}</span>
);

/* ------------------------------ PAGE ------------------------------ */

export default function CustomSoftwarePage() {
  const main = React.useRef<HTMLElement>(null);
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [tab, setTab] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const el = main.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % builds.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + builds.length) % builds.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = builds.length - 1;
    else return;
    e.preventDefault();
    setTab(n);
    tabRefs.current[n]?.focus();
  };

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

  const b = builds[tab];

  return (
    <main ref={main} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#0B1F3B]`}>
      {/* Page metadata. React 19 / Next 15 move these into <head>. */}
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={SITE + PATH} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content={SITE + PATH} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <style>{PAGE_CSS}</style>

      <h1 className="sr-only">Custom Software Development Services by DEVNTOM Solutions</h1>

      {/* 1. PINNED ISOMETRIC STACK */}
      <StackStage />

      {/* 2. WHAT WE BUILD */}
      <section id="builds" className="relative overflow-hidden py-24 text-white md:py-32" aria-label="What we build" style={{ background: `linear-gradient(180deg,${BLACK} 0%,${NAVY} 100%)` }}>
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl" lines={[<>What we <b className="font-bold">build</b></>, <>for <Acc>your team</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#DCE7FB]">Pick a system to see the kind of screens we deliver. These are illustrations, not client data.</p>
          </div>

          <div role="tablist" aria-label="Types of software" className="rv mt-12 flex flex-wrap gap-2">
            {builds.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={tab === i}
                aria-controls={`panel-${x.id}`}
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`rounded-full border px-6 py-3 text-sm font-medium transition ${tab === i ? "border-[#2F7BFF] bg-[#2F7BFF] text-white" : "border-white/25 text-white/80 hover:border-white hover:text-white"} ${ring} focus-visible:ring-offset-[#0B1F3B]`}
              >
                {x.name}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${b.id}`} aria-labelledby={`tab-${b.id}`} className="mt-10 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className={`${pop.className} text-3xl font-extralight leading-[1.1] tracking-[-0.03em] md:text-4xl`}>{b.title}</h3>
              <p className="mt-5 max-w-md font-light leading-relaxed text-[#DCE7FB]">{b.text}</p>
              <ul className="mt-6 space-y-3">
                {b.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-white/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7" key={b.id}>{mocks[b.id]}</div>
          </div>
        </div>
      </section>

      {/* 3. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl" lines={[<>Built to run your</>, <><b className="font-bold">business</b>, <Acc dark={false}>properly</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Every project includes the work that makes software dependable, not just the screens you can see.</p>
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
          <div className="rv mt-14 border-t border-[#CBD8EE] pt-8">
            <p className="text-sm font-medium text-[#0B1F3B]">Tools we choose from</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((s) => <li key={s} className="rounded-full border border-[#CBD8EE] px-4 py-2 text-sm text-[#3B4A63]">{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we build software">
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

      {/* TESTIMONIALS: drop your existing <Testimonials /> component here and import it at the top of this file. */}

      {/* 5. RELATED SERVICES */}
      <section className="bg-white py-24 md:py-32" aria-label="Related services">
        <div className={wrap}>
          <Lines className="t2 max-w-3xl" lines={[<>Works best <b className="font-bold">with</b></>]} />
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

      {/* 6. FAQ */}
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

      {/* 7. CONTACT FORM */}
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your software project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s build</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>your</Acc> <b className="font-bold">system.</b></>]} />
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
              <select name="service" required defaultValue="Custom Software" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="What should it do, who will use it, timeline" /></label>
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