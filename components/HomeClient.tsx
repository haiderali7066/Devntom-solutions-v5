"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  SiApple,
  SiCisco,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGoogle,
  SiHubspot,
  SiJavascript,
  SiMeta,
  SiMongodb,
  SiNextdotjs,
  SiRedis,
  SiSap,
  SiShopify,
  SiStripe,
  SiVercel,
  SiWordpress,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaAmazon, FaMicrosoft } from "react-icons/fa";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Globe,
  Megaphone,
  PenTool,
  Plus,
  Search,
  Smartphone,
  Star,
} from "lucide-react";

const pop = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  display: "swap",
});
const rob = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
const pw = Playwrite_CA({ weight: "400", display: "swap" });

const css = `
.ln{overflow:hidden;padding-bottom:.16em;margin-bottom:-.16em}
.ln>span{display:block;transform:translateY(112%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.in .ln>span{transform:none}
.rv{opacity:0;transform:translateY(48px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.rv.in{opacity:1;transform:none}
.gb{border:1px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,#00B4FF,#007BFF 60%,#0052CC) border-box}
.cols{background-image:linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:8.3333% 100%}
@keyframes marq{to{transform:translateX(-50%)}}
@keyframes breathe{0%,100%{opacity:.5}50%{opacity:1}}
.bar{animation:breathe 6s ease-in-out infinite}
.mq{animation:marq 32s linear infinite}
.dl{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.6s ease}
.in .dl{stroke-dashoffset:0}
.pulse{opacity:0}
.in .pulse{opacity:1;transition:opacity 1s 1.8s}
.tcar{transition:transform .85s cubic-bezier(.22,1,.36,1)}
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.orb{animation:rot var(--d) linear infinite}
.orb>*{animation:rot var(--d) linear infinite reverse}
@keyframes rot{to{transform:rotate(360deg)}}
.t1{font-size:clamp(2.8rem,7.4vw,7rem);line-height:.95;letter-spacing:-.04em;text-shadow:0 2px 40px rgba(5,14,31,.5)}
.t2{font-size:clamp(2.2rem,4.5vw,4.2rem);line-height:1.02;letter-spacing:-.035em}
.gf{background-image:linear-gradient(rgba(96,165,250,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.4) 1px,transparent 1px);background-size:64px 64px;animation:gf 3s linear infinite;-webkit-mask-image:linear-gradient(to top,#000 15%,transparent 80%);mask-image:linear-gradient(to top,#000 15%,transparent 80%)}
@keyframes gf{to{background-position:0 64px}}
.fl{animation:fl 7s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-10px)}}
.bar{transform-origin:bottom;animation:barIn 1.6s cubic-bezier(.16,1,.3,1) both,barPulse 5s ease-in-out infinite alternate}
@keyframes barIn{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes barPulse{from{opacity:.6}to{opacity:1}}
.pl{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)}
.in .pl{stroke-dashoffset:0}
.mq2{animation:mq2 42s linear infinite}.mq2.rev{animation-direction:reverse}.mqw:hover .mq2{animation-play-state:paused}
@keyframes mq2{to{transform:translate3d(-50%,0,0)}}
.spn{transition:opacity .3s linear var(--d)}.in .spn{opacity:0}
.chk{opacity:0;transform:scale(.3);transition:opacity .4s ease var(--d),transform .5s cubic-bezier(.34,1.56,.64,1) var(--d)}.in .chk{opacity:1;transform:none}
@media(min-width:1024px){.ofc{grid-template-columns:1fr 1fr 1fr;transition:grid-template-columns .9s cubic-bezier(.22,1,.36,1)}
.ofc:has(li:nth-child(1):is(:hover,:focus-within)){grid-template-columns:2.2fr 1fr 1fr}
.ofc:has(li:nth-child(2):is(:hover,:focus-within)){grid-template-columns:1fr 2.2fr 1fr}
.ofc:has(li:nth-child(3):is(:hover,:focus-within)){grid-template-columns:1fr 1fr 2.2fr}}
.t0{font-size:clamp(2.5rem,6.6vw,6.4rem);line-height:1.04;letter-spacing:-.04em}
.spin{animation:rot 18s linear infinite}
.grain{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");opacity:.07;mix-blend-mode:overlay}
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.bar,.mq,.orb,.orb>*,.gf,.fl,.spin,.bar,.mq2{animation:none!important}.dl{stroke-dashoffset:0;transition:none}.pulse{display:none}.tcar{transition:none!important}}
`;

const services = [
  [
    Globe,
    "Website Development",
    "/services/website-development",
    "Fast, responsive, SEO-friendly sites on Next.js and React, from company sites to e-commerce.",
  ],
  [
    Code2,
    "Custom Software",
    "/services/custom-software-development",
    "Web apps, SaaS, CRM and ERP systems that replace spreadsheets and manual steps.",
  ],
  [
    Smartphone,
    "Mobile Apps",
    "/services/mobile-app-development",
    "Native and cross-platform apps with reliable backends.",
  ],
  [
    Bot,
    "AI Automation",
    "/services/ai-automation",
    "Workflows and pipelines that remove repetitive work and errors.",
  ],
  [
    Megaphone,
    "Digital Marketing",
    "/services/digital-marketing",
    "Data-driven campaigns that bring in qualified leads.",
  ],
  [
    PenTool,
    "UI/UX Design",
    "/services/ui-ux-design",
    "Interfaces people understand on the first visit.",
  ],
  [
    Search,
    "SEO",
    "/services/seo-optimization",
    "Technical and content SEO for steady organic growth.",
  ],
] as const;

// REPLACE with real projects (title, text, tags, stack, href) once case studies are ready.
const projects = [
  [
    "Business website with SEO",
    "A fast, search-optimised company website with a CMS and lead forms.",
    ["Website", "SEO", "CMS"],
    "Next.js, Tailwind",
    "/projects",
  ],
  [
    "AI workflow automation",
    "Automated intake, routing and reporting that removes repetitive manual work.",
    ["AI", "Automation"],
    "Python, Node.js",
    "/projects",
  ],
  [
    "Custom CRM platform",
    "A tailored CRM that tracks leads, tasks and approvals in one place.",
    ["Software", "Dashboard"],
    "React, Node.js, Cloud",
    "/projects",
  ],
  [
    "Mobile app with backend",
    "A cross-platform app with secure accounts, notifications and an admin panel.",
    ["Mobile", "API"],
    "React Native, Node.js",
    "/projects",
  ],
  [
    "E-commerce store",
    "A fast storefront with catalogue, checkout and order management.",
    ["E-commerce", "Website"],
    "Next.js, Node.js",
    "/projects",
  ],
] as const;

const reasons = [
  [
    "Systems, not isolated features",
    "Every site, app and automation connects to the rest of your operation, so it keeps working as you grow.",
  ],
  [
    "Business goals first",
    "We learn how you earn and where time is lost, then choose the technology that fits.",
  ],
  [
    "Modern, maintainable stack",
    "Next.js, React, Node.js, Python and cloud infrastructure, written clean enough for any team to extend.",
  ],
  [
    "Clear communication",
    "Fixed scope, regular demos and no surprises. You always know what is being built and why.",
  ],
];

const steps = [
  [
    "Discovery and strategy",
    "Goals, users, constraints and a plan we both sign off on.",
  ],
  [
    "Architecture and design",
    "System structure, user flows and the visual design.",
  ],
  ["Development and build", "Iterative builds with a demo at every milestone."],
  ["Quality assurance", "Testing for speed, security and accessibility."],
  ["Launch and deployment", "Go-live with monitoring and a rollback plan."],
  ["Support and growth", "Ongoing fixes, improvements and search growth."],
];

const offices = [
  [
    "Lahore",
    "Pakistan",
    "+92 325 6036838",
    "tel:+923256036838",
    "Asia/Karachi",
  ],
  [
    "Riyadh",
    "Saudi Arabia",
    "+966 583 408034",
    "tel:+966583408034",
    "Asia/Riyadh",
  ],
  [
    "London",
    "United Kingdom",
    "info@devntomsolutions.com",
    "mailto:info@devntomsolutions.com",
    "Europe/London",
  ],
];
const stepTags = [
  ["Goals", "Users", "Roadmap"],
  ["Wireframes", "UI design", "System plan"],
  ["Sprints", "Demos", "Code reviews"],
  ["Testing", "Security", "Accessibility"],
  ["Deployment", "Monitoring", "Handover"],
  ["Support", "Improvements", "SEO"],
];
const stepBg = [
  "linear-gradient(135deg,#0B1F3B,#0A2A5C)",
  "linear-gradient(135deg,#0A2A5C,#0A3F9E)",
  "linear-gradient(135deg,#0A3F9E,#0052CC)",
];

const posts = [
  [
    "Pricing",
    "How much does website development cost in Pakistan?",
    "What drives the price of a business website and how to budget for it.",
    "/blog/website-development-cost-pakistan",
  ],
  [
    "Comparison",
    "Custom website vs template website: which is better?",
    "When a template is enough and when custom development pays off.",
    "/blog/custom-vs-template-website",
  ],
  [
    "Guide",
    "How to choose a website development company",
    "Questions to ask, proof to look for and red flags to avoid.",
    "/blog/how-to-choose-website-development-company",
  ],
];

const faqs = [
  [
    "What does Devntom Solutions build?",
    "Websites, custom software (web apps, SaaS, CRM, ERP), mobile apps, AI automation, UI/UX design, digital marketing and SEO, all delivered by one team.",
  ],
  [
    "Which technologies do you use?",
    "Mainly Next.js, React, Node.js, Python, AI/ML frameworks and cloud infrastructure. We choose the stack that fits your goals rather than forcing one.",
  ],
  [
    "How much will my project cost?",
    "It depends on scope. After a short discovery step we send a clear quote with deliverables and a timeline, so there are no surprises.",
  ],
  [
    "How does a project start?",
    "Send us your idea through the form or book a call. We then follow our six-step process, beginning with discovery and strategy.",
  ],
  [
    "Will my website be ready for search engines?",
    "Yes. We build with clean metadata, structured data, fast loading and mobile performance in mind from the first release.",
  ],
  [
    "Do you support projects after launch?",
    "Yes. Support and growth is the final step of our process, covering fixes, improvements and search growth after launch.",
  ],
  [
    "Where do you work?",
    "We have offices in Lahore, Riyadh and London, and we work with clients around the world.",
  ],
];

const stats = [
  ["150+", "Projects delivered"],
  ["80+", "Clients worldwide"],
  ["12+", "Countries served"],
  ["98%", "Client satisfaction"],
];
const tech = [
  [SiNextdotjs, "Next.js"],
  [SiReact, "React"],
  [SiNodedotjs, "Node.js"],
  [SiPython, "Python"],
  [SiTypescript, "TypeScript"],
  [SiTailwindcss, "Tailwind CSS"],
  [SiPostgresql, "PostgreSQL"],
  [SiDocker, "Docker"],
  [SiFigma, "Figma"],
] as const;
// Placeholder photos from Unsplash. Replace with real project screenshots and team photos.
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const projectImgs = [
  "https://images.pexels.com/photos/16675632/pexels-photo-16675632.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhJJMGMwX1pSB_ps5oy-oGOHHQ7ixM_jFDTlpqdP0nJJL9467WmSXJms&s=10",
  "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
];
const industries = [
  [
    "Healthcare",
    "Booking, patient portals and records.",
    "photo-1576091160399-112ba8d25d1d",
  ],
  [
    "Fintech and finance",
    "Dashboards, payments and reporting.",
    "photo-1554224155-6726b3ff858f",
  ],
  [
    "Logistics",
    "Tracking, inventory and dispatch.",
    "photo-1586528116311-ad8dd3c8310d",
  ],
  [
    "E-commerce and retail",
    "Stores, catalogues and checkout flows.",
    "photo-1556742049-0cfed4f6a45d",
  ],
  [
    "Education",
    "Learning platforms and admin tools.",
    "photo-1503676260728-1c00da094a0b",
  ],
  [
    "Restaurants and hospitality",
    "Ordering, reservations and operations.",
    "photo-1517248135467-4c7edcad34c4",
  ],
] as const;
const postImgs = [
  "photo-1460925895917-afdab827c52f",
  "photo-1531297484001-80022131f5a1",
  "photo-1519389950473-47ba0277781c",
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Acc = ({
  children,
  dark = true,
}: {
  children: ReactNode;
  dark?: boolean;
}) => (
  <span
    className={`${pw.className} text-[.58em] font-normal tracking-normal ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}
  >
    {children}
  </span>
);

const bars = Array.from({ length: 34 }, (_, i) =>
  Number((30 + 70 * Math.exp(-(((i - 16.5) / 8.5) ** 2))).toFixed(4)),
);
const stepLabel = [
  "Discovery",
  "Architecture",
  "Development",
  "Quality",
  "Launch",
  "Support",
];
const stepX = [100, 300, 500, 700, 900, 1100];

// Brand logos (react-icons). Only list companies you have actually worked with,
// logos imply a client relationship. Format: [Icon, name, brand colour on hover]
const clients: [typeof SiReact, string, string][] = [
  [FaMicrosoft, "Microsoft", "#00A4EF"],
  [SiGoogle, "Google", "#4285F4"],
  [FaAmazon, "Amazon", "#FF9900"],
  [SiMeta, "Meta", "#0668E1"],
  [SiApple, "Apple", "#0B1F3B"],
  [SiShopify, "Shopify", "#7AB55C"],
  [SiHubspot, "HubSpot", "#FF7A59"],
  [SiStripe, "Stripe", "#635BFF"],
  [SiSap, "SAP", "#0FAAFF"],
  [SiCisco, "Cisco", "#049FD9"],
];
const techRows: [typeof SiReact, string][][] = [
  [
    [SiNextdotjs, "Next.js"],
    [SiReact, "React"],
    [SiNodedotjs, "Node.js"],
    [SiTypescript, "TypeScript"],
    [SiJavascript, "JavaScript"],
    [SiTailwindcss, "Tailwind CSS"],
    [SiVercel, "Vercel"],
    [SiGit, "Git"],
  ],
  [
    [SiPython, "Python"],
    [SiPostgresql, "PostgreSQL"],
    [SiMongodb, "MongoDB"],
    [SiRedis, "Redis"],
    [SiDocker, "Docker"],
    [SiFlutter, "Flutter"],
    [SiFigma, "Figma"],
    [SiWordpress, "WordPress"],
    [SiShopify, "Shopify"],
  ],
];
// SAMPLE TEXT: replace with real, approved client testimonials before launch
// [quote, name, role and company, service tag]
const quotes = [
  [
    "They treated our platform as a business system, not a task list. Delivery was predictable and communication was clear.",
    "Client name",
    "Role, Company",
    "Custom software",
  ],
  [
    "Our new website loads fast and our enquiries went up within weeks of launch.",
    "Client name",
    "Role, Company",
    "Website",
  ],
  [
    "The AI automation removed hours of manual reporting every week. The team explained every step.",
    "Client name",
    "Role, Company",
    "AI automation",
  ],
  [
    "From design to deployment, one team handled everything. No hand-offs, no surprises.",
    "Client name",
    "Role, Company",
    "End-to-end build",
  ],
  [
    "They understood our market and built exactly what we needed, on schedule.",
    "Client name",
    "Role, Company",
    "Web platform",
  ],
] as const;

function Testimonials() {
  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const GAP = 20; // must match gap-5 on the track

  const view = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLLIElement>(null);
  const startPt = useRef<{ x: number; y: number } | null>(null);
  const dx = useRef(0);
  const moved = useRef(false);

  const [idx, setIdx] = useState(0);
  const [per, setPer] = useState(1);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const max = Math.max(0, quotes.length - per);

  // measure card width + how many cards fit
  useEffect(() => {
    const measure = () => {
      const v = view.current,
        c = first.current;
      if (!v || !c) return;
      const s = c.offsetWidth + GAP;
      setStep(s);
      setPer(Math.max(1, Math.round((v.clientWidth + GAP) / s)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (view.current) ro.observe(view.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIdx((i) => Math.min(i, max));
  }, [max]);

  // buttons loop around: last -> first, first -> last
  const go = (dir: number) =>
    setIdx((i) => {
      const n = i + dir;
      return n > max ? 0 : n < 0 ? max : n;
    });

  // autoplay (restarts after every move, pauses on hover/focus/drag)
  useEffect(() => {
    if (paused || dragging || max === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setIdx((i) => (i >= max ? 0 : i + 1)),
      5200,
    );
    return () => window.clearTimeout(id);
  }, [paused, dragging, idx, max]);

  // swipe / drag
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startPt.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    dx.current = 0;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = startPt.current;
    if (!s) return;
    const x = e.clientX - s.x;
    if (!moved.current) {
      if (Math.abs(x) < 8) return;
      if (Math.abs(e.clientY - s.y) > Math.abs(x)) {
        startPt.current = null;
        return;
      }
      moved.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    // resistance at the ends
    const atEdge = (idx === 0 && x > 0) || (idx === max && x < 0);
    dx.current = atEdge ? x * 0.3 : x;
    setDrag(dx.current);
  };
  const onUp = () => {
    if (!startPt.current) return;
    startPt.current = null;
    if (!moved.current) return;
    const d = dx.current;
    moved.current = false;
    dx.current = 0;
    setDragging(false);
    setDrag(0);
    if (d < -50) setIdx((i) => Math.min(max, i + 1));
    else if (d > 50) setIdx((i) => Math.max(0, i - 1));
  };

  const arrow = (dir: 1 | -1, size: string) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={dir === 1 ? "Next testimonial" : "Previous testimonial"}
      className={`group flex ${size} items-center justify-center rounded-full border border-[#D9E3EF] bg-white text-[#071A33] shadow-sm transition duration-300 hover:border-[#006BFF] hover:bg-[#006BFF] hover:text-white active:scale-95 ${ring}`}
    >
      <ArrowRight
        size={18}
        aria-hidden="true"
        className={`transition-transform duration-300 ${dir === 1 ? "group-hover:translate-x-0.5" : "rotate-180 group-hover:-translate-x-0.5"}`}
      />
    </button>
  );

  return (
    <section
      aria-labelledby="tst"
      className="relative overflow-hidden bg-white py-20 md:py-28"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#006BFF]/[0.06] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#00B4FF]/[0.05] blur-[120px]"
      />

      <div className={`${wrap} relative`}>
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#006BFF]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#006BFF]">
                Client stories
              </span>
            </div>
            <Lines
              className="t2 text-[#071A33]"
              lines={[
                <>
                  What our <b className="font-bold">clients</b> say
                </>,
              ]}
            />
            <p
              id="tst"
              className="rv mt-5 max-w-md font-light leading-relaxed text-[#475569]"
            >
              Real feedback from teams we have built websites, software and
              automation for.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            {arrow(-1, "h-12 w-12")}
            {arrow(1, "h-12 w-12")}
          </div>
        </div>

        {/* VIEWPORT */}
        <div
          ref={view}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="-my-6 cursor-grab touch-pan-y overflow-hidden py-6 active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <ul
            aria-live={paused ? "polite" : "off"}
            className={`flex gap-5 will-change-transform ${dragging ? "" : "tcar"}`}
            style={{ transform: `translate3d(${-idx * step + drag}px,0,0)` }}
          >
            {quotes.map(([q, n, r, tag], i) => (
              <li
                key={q}
                ref={i === 0 ? first : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${quotes.length}`}
                className="w-[88%] shrink-0 sm:w-[70%] md:w-[47%] lg:w-[32%]"
              >
                <figure className="group relative flex h-full min-h-[340px] select-none flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] p-7 text-white shadow-[0_18px_55px_rgba(7,26,51,0.16)] transition-transform duration-500 hover:-translate-y-1 md:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#006BFF]/25 blur-[85px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#00B4FF]/10 blur-[80px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[60%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-[#006BFF] via-[#00B4FF] to-transparent"
                  />

                  {/* top row: stars + tag */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div
                      className="flex gap-0.5"
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          aria-hidden="true"
                          className="fill-[#FBBF24] text-[#FBBF24]"
                        />
                      ))}
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9FD0FF]">
                      {tag}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-14 select-none font-serif text-[110px] leading-none text-[#00B4FF]/[0.09]"
                  >
                    “
                  </span>

                  <blockquote className="relative z-10 mt-8 flex-1 text-[15px] font-light leading-[1.8] text-white/90 md:text-[16px]">
                    “{q}”
                  </blockquote>

                  <figcaption className="relative z-10 mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span
                      className={`${pop.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#006BFF] to-[#00B4FF] text-sm font-bold text-white shadow-[0_0_25px_rgba(0,107,255,0.3)]`}
                    >
                      {n[0]}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">
                        {n}
                      </span>
                      <span className="mt-1 block truncate text-xs text-[#9FB1C7]">
                        {r}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTROLS: mobile buttons + dots + counter */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: max + 1 }, (_, d) => (
              <button
                key={d}
                type="button"
                onClick={() => setIdx(d)}
                aria-label={`Go to testimonial ${d + 1}`}
                aria-current={d === idx}
                className={`h-2 rounded-full transition-all duration-500 ${d === idx ? "w-8 bg-[#006BFF]" : "w-2 bg-[#CBD8E8] hover:bg-[#93C5FD]"} ${ring}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.15em] text-[#94A3B8]"
            >
              {String(idx + 1).padStart(2, "0")} /{" "}
              {String(max + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-2 sm:hidden">
              {arrow(-1, "h-10 w-10")}
              {arrow(1, "h-10 w-10")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lines({
  lines,
  className = "",
  h1 = false,
}: {
  lines: ReactNode[];
  className?: string;
  h1?: boolean;
}) {
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
        <span key={i} style={{ opacity: 0.16 }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

function Ring({
  size,
  d,
  items,
}: {
  size: number;
  d: number;
  items: ReactNode[];
}) {
  return (
    <div
      className="orb absolute rounded-full border border-[#93C5FD]/60"
      style={
        {
          width: `${size}%`,
          height: `${size}%`,
          left: `${(100 - size) / 2}%`,
          top: `${(100 - size) / 2}%`,
          "--d": `${d}s`,
        } as CSSProperties
      }
    >
      {items.map((it, i) => {
        const a = (i / items.length) * 2 * Math.PI;

        const left = Number((50 + 50 * Math.cos(a)).toFixed(6));
        const top = Number((50 + 50 * Math.sin(a)).toFixed(6));

        return (
          <span
            key={i}
            className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#CFE2FF] bg-white text-2xl text-[#0052CC] shadow-md"
            style={{
              left: `calc(${left}% - 24px)`,
              top: `calc(${top}% - 24px)`,
            }}
          >
            {it}
          </span>
        );
      })}
    </div>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const f = (n: number) => {
        const p = Math.min(1, (n - t0) / 1600);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

function initFx(
  root: HTMLElement,
  bar: HTMLElement,
  cur: HTMLElement,
  reduce: boolean,
) {
  const off: (() => void)[] = [];
  let lenis: Lenis | undefined,
    lr = 0;
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.09 });
    const r = (t: number) => {
      lenis!.raf(t);
      lr = requestAnimationFrame(r);
    };
    lr = requestAnimationFrame(r);
    off.push(() => {
      cancelAnimationFrame(lr);
      lenis!.destroy();
    });
  }
  const prog = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener("scroll", prog, { passive: true });
  off.push(() => removeEventListener("scroll", prog));
  if (reduce || !matchMedia("(pointer: fine)").matches) {
    cur.style.display = "none";
  } else {
    const dot = cur.firstElementChild as HTMLElement;
    const label = dot.firstElementChild as HTMLElement;
    const mags = [...root.querySelectorAll<HTMLElement>("[data-magnetic]")];
    const lum = (el: HTMLElement | null): number => {
      while (el) {
        const c = getComputedStyle(el);
        let m = c.backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || +m[3] > 0.5))
          return (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
        const g = c.backgroundImage.match(/rgba?\([^)]+\)/);
        if (g) {
          m = g[0].match(/[\d.]+/g);
          if (m) return (0.299 * +m[0] + 0.587 * +m[1] + 0.114 * +m[2]) / 255;
        }
        el = el.parentElement;
      }
      return 1;
    };
    let lastT: HTMLElement | null = null,
      col = "#fff",
      txt = "#0B1F3B";
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      tilt: HTMLElement | null = null,
      raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view']");
      const link = t.closest("a,button,summary,select,input,textarea");
      cur.style.opacity = t.closest("[data-nocursor]") ? "0" : "1";
      if (t !== lastT) {
        lastT = t;
        const light = lum(t) > 0.6;
        col = light ? "#007BFF" : "#fff";
        txt = light ? "#fff" : "#0B1F3B";
      }
      const hollow = !!link && !view;
      dot.style.width = dot.style.height = (view ? 88 : link ? 56 : 14) + "px";
      dot.style.background = hollow ? "transparent" : col;
      dot.style.border = hollow ? `2px solid ${col}` : "0";
      label.style.color = txt;
      label.style.opacity = view ? "1" : "0";
      mags.forEach((m) => {
        const r = m.getBoundingClientRect();
        const dx = x - (r.left + r.width / 2),
          dy = y - (r.top + r.height / 2);
        m.style.transform =
          Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.7
            ? `translate(${(dx * 0.1).toFixed(1)}px,${(dy * 0.12).toFixed(1)}px)`
            : "";
      });
      const tl = t.closest<HTMLElement>("[data-tilt]");
      if (tilt && tilt !== tl) tilt.style.transform = "";
      if (tl) {
        const r = tl.getBoundingClientRect();
        tl.style.transition = "transform .2s ease-out";
        tl.style.transform = `perspective(900px) rotateX(${(-((y - r.top) / r.height - 0.5) * 8).toFixed(2)}deg) rotateY(${(((x - r.left) / r.width - 0.5) * 8).toFixed(2)}deg)`;
      }
      tilt = tl;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    };
    addEventListener("pointermove", move);
    loop();
    off.push(() => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
    });
  }
  return () => off.forEach((f) => f());
}

function initHero(hero: HTMLElement, reduce: boolean) {
  const t = { x: 0, y: 0 },
    c = { x: 0, y: 0 };
  let raf = 0,
    vis = true;
  const move = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    t.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    t.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  const reset = () => {
    t.x = 0;
    t.y = 0;
  };
  const vio = new IntersectionObserver(([e]) => {
    vis = e.isIntersecting;
  });
  vio.observe(hero);
  if (reduce) return () => vio.disconnect();
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!vis) return;
    c.x += (t.x - c.x) * 0.06;
    c.y += (t.y - c.y) * 0.06;
    hero.style.setProperty("--px", c.x.toFixed(3));
    hero.style.setProperty("--py", c.y.toFixed(3));
  };
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerleave", reset);
  loop();
  return () => {
    cancelAnimationFrame(raf);
    vio.disconnect();
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", reset);
  };
}

function Clock({ tz }: { tz: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, [tz]);
  return <time className="tabular-nums">{t || "--:--:--"}</time>;
}

export default function HomeClient() {
  const root = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    const el = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopLiquid = initHero(heroRef.current!, reduce);
    const stopFx = initFx(el, bar.current!, cur.current!, reduce);
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    const layers = [...el.querySelectorAll<HTMLElement>("[data-speed]")];
    const words = [...el.querySelectorAll<HTMLElement>("[data-words]")];
    const zooms = [...el.querySelectorAll<HTMLElement>("[data-zoom]")];
    const hs = [...el.querySelectorAll<HTMLElement>("[data-hs]")];
    if (reduce) {
      words.forEach((w) =>
        [...w.children].forEach(
          (c) => ((c as HTMLElement).style.opacity = "1"),
        ),
      );
      hs.forEach((h) => {
        (h.querySelector("[data-scroller]") as HTMLElement).style.overflowX =
          "auto";
      });
      zooms.forEach((z) => {
        z.style.transform = "none";
        z.style.borderRadius = "0";
        (z.querySelector("[data-ztext]") as HTMLElement).style.opacity = "1";
      });
      return () => {
        stopFx();
        io.disconnect();
        stopLiquid();
      };
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      zooms.forEach((z) => {
        const r = z.closest("section")!.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        const k = Math.min(1, p * 1.7);
        z.style.transform = `scale(${0.7 + 0.3 * k})`;
        z.style.borderRadius = `${32 * (1 - k)}px`;
        (z.querySelector("[data-ztext]") as HTMLElement).style.opacity = String(
          Math.min(1, Math.max(0, (p - 0.35) * 3)),
        );
      });
      hs.forEach((h) => {
        const tr = h.querySelector<HTMLElement>("[data-track]")!;
        if (innerWidth < 1024) {
          tr.style.transform = "";
          return;
        }
        const p = Math.min(
          1,
          Math.max(
            0,
            -h.getBoundingClientRect().top / Math.max(1, h.offsetHeight - vh),
          ),
        );
        tr.style.transform = `translate3d(${-(tr.scrollWidth - innerWidth) * p}px,0,0)`;
      });
      layers.forEach((l) => {
        const r = l.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        l.style.transform = `translate3d(0,${((r.top + r.height / 2 - vh / 2) * Number(l.dataset.speed)).toFixed(1)}px,0)`;
      });
      words.forEach((w) => {
        const r = w.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)),
        );
        const n = w.children.length;
        [...w.children].forEach(
          (c, i) =>
            ((c as HTMLElement).style.opacity = String(
              0.16 + 0.84 * Math.min(1, Math.max(0, (p * 1.25 - i / n) * 6)),
            )),
        );
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      stopFx();
      stopLiquid();
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const field =
    "mt-2 w-full rounded-[3px] border border-[#CFE2FF] bg-[#F5F9FF] px-4 py-3 text-[#1F2937] placeholder:text-[#94A3B8] focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30";
  const label = "text-sm font-medium text-[#0B1F3B]";

  return (
    <main
      ref={root}
      className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}
    >
      <style>{css}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#00B4FF] to-[#007BFF]"
      />
      <div
        ref={cur}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden [@media(pointer:fine)]:block"
      >
        <span className="absolute left-1/2 top-1/2 flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center box-border rounded-full transition-[width,height,background-color,border-color] duration-300">
          <span className="text-xs font-semibold text-black opacity-0 transition-opacity">
            View
          </span>
        </span>
      </div>

      {/* 1. HERO */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden bg-black px-5 pb-[34vh] pt-40 text-center text-white md:pt-44"
        style={{ "--px": 0, "--py": 0 } as CSSProperties}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 flex h-[48%] items-end gap-px overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]"
          style={{
            maskImage: "linear-gradient(to top,#000 55%,transparent)",
            transform: "translate3d(calc(var(--px) * -14px),0,0)",
          }}
        >
          {bars.map((h, i) => (
            <i
              key={i}
              className="bar block flex-1"
              style={{
                height: `${h}%`,
                animationDelay: `${0.1 + Math.abs(i - 16.5) * 0.045}s, ${i * 0.12}s`,
                background:
                  "linear-gradient(to top,#9DBBFF,#2F5BFF 42%,rgba(0,123,255,.15) 80%,transparent)",
              }}
            />
          ))}
        </div>
        <p className="rv inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.04] px-4 py-1.5 text-sm text-[#CFE2FF] shadow-[0_0_30px_rgba(0,123,255,.25)]">
          <span className="text-[#F59E0B]" aria-hidden="true">
            ✦
          </span>
          Where systems become strategy
        </p>
        <Lines
          h1
          className="t0 mx-auto mt-8 max-w-5xl"
          lines={[
            <>We engineer digital</>,
            <>
              systems that <Acc>scale</Acc>
            </>,
          ]}
        />
        <p
          className="rv mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70"
          style={{ transitionDelay: "200ms" }}
        >
          Websites, custom software, mobile apps and AI automation, designed as
          one connected system so your business runs faster and grows further.
        </p>
        <div
          className="rv mt-10 flex flex-wrap justify-center gap-3"
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href="/projects"
            className={`rounded-[4px] border border-white/25 bg-black/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-black`}
          >
            See our work
          </Link>
          <Link
            href="/contact"
            data-magnetic
            className={`rounded-[4px] bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-black`}
          >
            Book a call
          </Link>
        </div>
      </section>

      {/* 2. STATEMENT */}
      <section className="bg-white py-28 md:py-44">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-3">
            <p className="flex items-center gap-3 text-sm font-medium text-[#0052CC]">
              <span className="h-px w-8 bg-[#007BFF]" />
              About Devntom
            </p>
            <Link
              href="/about"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B1F3B] underline underline-offset-4 hover:text-[#007BFF]"
            >
              Our story <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <Words
            className="text-[clamp(1.8rem,4.2vw,3.8rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0B1F3B] md:col-span-9"
            text="We do not just build websites or write code. We engineer digital systems that become the strategic backbone of your business, built to scale from the first release."
          />
        </div>
      </section>

      {/* 7. PROCESS: flow diagram */}
      <section
        className="relative overflow-hidden bg-black py-24 text-white md:py-32"
        aria-labelledby="proc"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines
              className="t2"
              lines={[
                <>
                  From first call to <Acc>live system</Acc>
                </>,
              ]}
            />
            <p id="proc" className="rv mt-5 font-light text-white/60">
              Six phases, one delivery process. Every project follows it, and
              every phase feeds the next.
            </p>
          </div>
          <div
            data-r
            className="mt-16 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[.04] to-transparent px-4 pb-12 pt-14 md:px-10"
          >
            <ol className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-5">
              {steps.map(([t, d], i) => (
                <li key={t} className="group relative">
                  <div
                    className="relative h-48 border border-white/15 bg-gradient-to-br from-white/[.09] to-white/[.02] p-4 transition duration-500 group-hover:-translate-y-2 group-hover:border-[#3B82F6]/70"
                    style={{
                      clipPath:
                        "polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-0 h-7 w-7 bg-gradient-to-br from-white/20 to-transparent"
                    />
                    <span
                      className="relative block h-6 w-6"
                      style={{ "--d": `${0.9 + i * 0.9}s` } as CSSProperties}
                    >
                      <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" />
                      <span
                        aria-label="Done"
                        className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-xs font-bold text-black"
                      >
                        ✓
                      </span>
                    </span>
                    <h3 className="sr-only">{t}</h3>
                    <p className="mt-5 text-[13px] font-light leading-relaxed text-white/60">
                      {d}
                    </p>
                  </div>
                  <span
                    className={`${pop.className} absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[5px] border border-white/20 bg-[#0B1F3B]/90 px-3.5 py-1.5 text-sm font-medium backdrop-blur transition group-hover:border-[#3B82F6] group-hover:bg-[#0052CC]`}
                  >
                    {stepLabel[i]}
                  </span>
                </li>
              ))}
            </ol>
            <svg
              viewBox="0 0 1200 150"
              className="mx-auto mt-6 hidden h-auto w-full md:block"
              fill="none"
              aria-hidden="true"
            >
              {stepX.map((x, i) => {
                const d = `M${x} 0 V45 L${x < 600 ? x + 28 : x - 28} 73 H600`;
                return (
                  <g key={x}>
                    <path
                      d={d}
                      pathLength={1}
                      className="pl"
                      stroke="rgba(255,255,255,.35)"
                      strokeWidth="1.5"
                      style={{ transitionDelay: `${300 + i * 140}ms` }}
                    />
                    <circle r="3.5" fill="#00B4FF">
                      <animateMotion
                        dur="3.6s"
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                        path={d + " V150"}
                      />
                    </circle>
                  </g>
                );
              })}
              <path
                d="M600 73 V150"
                pathLength={1}
                className="pl"
                stroke="rgba(255,255,255,.35)"
                strokeWidth="1.5"
                style={{ transitionDelay: "1200ms" }}
              />
              <circle
                cx="600"
                cy="73"
                r="5"
                fill="#000"
                stroke="rgba(255,255,255,.6)"
              />
            </svg>
            <div className="mt-8 flex justify-center md:-mt-1">
              <Link
                href="/contact"
                className={`inline-flex items-center gap-3 rounded-full border border-white/25 bg-gradient-to-b from-white/10 to-white/[.02] py-3 pl-4 pr-8 text-lg shadow-[0_0_40px_rgba(0,123,255,.25)] transition hover:border-[#3B82F6] ${ring} focus-visible:ring-offset-black`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1] text-xl leading-none">
                  +
                </span>
                Your business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. ZOOM SHOWCASE */}
      <section className="relative h-[230svh] bg-white" aria-label="Our team">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-white">
          <div
            data-zoom
            className="relative isolate h-full w-full overflow-hidden"
            style={{
              transform: "scale(.7)",
              borderRadius: 32,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Engineers collaborating on a software project"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            >
              <source src="https://www.pexels.com/download/video/34189433/" />
            </video>

            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050E1F] via-[#0B1F3B]/70 to-[#0B1F3B]/40"
            />

            <div
              data-ztext
              className="mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 text-white opacity-0 md:px-12 md:pb-24"
            >
              <h2
                className={`${pop.className} max-w-4xl text-[clamp(2.2rem,5.4vw,5rem)] font-light leading-[1.02] tracking-[-0.035em]`}
              >
                Engineers, designers and strategists,{" "}
                <b className="font-bold">one team</b>
              </h2>

              <p className="mt-5 max-w-xl text-lg font-light text-[#CFE2FF]">
                From Lahore, Riyadh and London we turn complex challenges into
                products that move your business forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. CLIENTS (about) */}
      <section
        aria-label="Companies we have worked with"
        className="relative overflow-hidden bg-white py-0"
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-3 md:px-12">
          <span className="h-px w-8 bg-[#DCE5EF]" />
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">
            Trusted by companies worldwide
          </p>
          <span className="h-px flex-1 bg-[#EEF2F7]" />
        </div>

        <div className="relative overflow-hidden border-y border-[#EEF2F7]">
          <div
            className="mqw overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            }}
          >
            <div
              className="mq2 flex w-max items-center"
              style={{ willChange: "transform" }}
            >
              {[0, 1].flatMap((k) =>
                clients.map(([Icon, name, color]) => (
                  <div
                    key={`${k}-${name}`}
                    aria-hidden={k === 1 || undefined}
                    className="group flex h-[76px] w-[200px] shrink-0 items-center justify-center gap-3 md:h-[84px] md:w-[230px]"
                    style={{ "--c": color } as CSSProperties}
                  >
                    <Icon
                      aria-hidden="true"
                      size={28}
                      className="shrink-0 text-[#A5B1C2] transition-colors duration-300 group-hover:[color:var(--c)]"
                    />
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#8795A8] transition-colors duration-300 group-hover:text-[#172B4D]">
                      {name}
                    </span>
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section
        id="services"
        className="relative overflow-hidden bg-[#ffffff] py-24 md:py-32"
        aria-labelledby="svc"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-[#007BFF]/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-[5%] h-80 w-80 rounded-full bg-[#00B4FF]/10 blur-[130px]"
        />

        <div className={`${wrap} relative`}>
          {/* HEADER */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#007BFF]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#007BFF]">
                  What we do
                </span>
              </div>

              <Lines
                className="t2 text-[#0B1F3B]"
                lines={[
                  <>
                    <b className="font-bold">Seven</b> services.
                  </>,
                  <>
                    One <Acc dark={false}>connected</Acc> team.
                  </>,
                ]}
              />
            </div>

            <p
              id="svc"
              className="rv max-w-md font-light leading-[1.8] text-[#475569] lg:pb-2"
            >
              Strategy, design, technology and growth working together as one
              connected digital system.
            </p>
          </div>

          {/* SERVICES GRID */}
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([Icon, name, href, text], i) => (
              <li key={name} className="h-full">
                <Link
                  href={href}
                  className={`rv group relative flex h-[365px] flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#071A33] p-8 text-white shadow-[0_20px_60px_rgba(7,26,51,0.12)] transition-colors duration-500 hover:border-[#00B4FF]/40 ${ring}`}
                  style={{
                    transitionDelay: `${(i % 4) * 70}ms`,
                  }}
                >
                  {/* Blue ambient glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#007BFF]/20 blur-[80px]"
                  />

                  {/* Secondary glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-[#00B4FF]/10 blur-[75px]"
                  />

                  {/* Glass shine */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[45%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100"
                  />

                  {/* Top glass edge */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />

                  {/* Number */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-mono text-xs font-medium tracking-[0.18em] text-white/35">
                      0{i + 1}
                    </span>

                    {/* Icon */}
                    <span className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-[#00B4FF]/20 bg-[#007BFF]/10 text-[#38BDF8] shadow-[0_0_30px_rgba(0,180,255,0.10)] transition-colors duration-300 group-hover:border-[#00B4FF]/40 group-hover:bg-[#007BFF]/20">
                      <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-12">
                    <h3
                      className={`${pop.className} text-[23px] font-semibold tracking-[-0.025em]`}
                    >
                      {name}
                    </h3>

                    <p className="mt-4 text-[14px] font-light leading-[1.75] text-[#B8C9DE]">
                      {text}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 group-hover:text-[#38BDF8]">
                      Explore
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 group-hover:border-[#00B4FF]/50 group-hover:text-[#38BDF8]">
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* CTA CARD — DESKTOP 8TH CARD */}
            <li className="h-full">
              <Link
                href="/contact"
                className={`rv group relative flex h-[365px] flex-col overflow-hidden rounded-[10px] border border-[#00B4FF]/25 bg-[#006BFF] p-8 text-white shadow-[0_20px_60px_rgba(0,107,255,0.20)] transition-colors duration-500 hover:border-[#00B4FF]/60 hover:bg-[#005FE0] ${ring}`}
              >
                {/* CTA glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00B4FF]/30 blur-[90px]"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-[80px]"
                />

                {/* Glass shine */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[45%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100"
                />

                {/* Number */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-xs font-medium tracking-[0.18em] text-white/45">
                    08
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-[8px] border border-white/20 bg-white/10">
                    <ArrowUpRight
                      size={25}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* CTA content */}
                <div className="relative z-10 mt-12">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Start a conversation
                  </span>

                  <h3
                    className={`${pop.className} mt-4 text-[25px] font-semibold leading-tight tracking-[-0.025em]`}
                  >
                    Not sure what
                    <br />
                    you need?
                  </h3>

                  <p className="mt-4 text-[14px] font-light leading-[1.7] text-white/70">
                    Tell us what you need.
                  </p>
                </div>

                {/* CTA bottom */}
                <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/15 pt-6">
                  <span className="text-sm font-medium">Book a free call</span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#006BFF] transition-colors duration-300 group-hover:bg-[#071A33] group-hover:text-white">
                    <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. PROJECTS: pinned horizontal gallery */}
      <section data-hs className="bg-white lg:h-[340vh]" aria-labelledby="prj">
        <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
          <div
            className={`${wrap} flex flex-wrap items-end justify-between gap-6`}
          >
            <Lines
              className="max-w-3xl t2 text-[#0B1F3B]"
              lines={[
                <>
                  Selected <b className="font-bold">projects</b>
                </>,
                <>
                  built to <Acc dark={false}>perform</Acc>
                </>,
              ]}
            />
            <Link
              href="/projects"
              id="prj"
              data-magnetic
              className={`inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-6 py-3 font-medium text-white transition hover:bg-[#007BFF] ${ring}`}
            >
              All projects <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div
            data-scroller
            className="mt-10 overflow-x-auto lg:overflow-visible"
          >
            <div
              data-track
              className="flex w-max gap-6 px-6 pb-4 md:px-12 lg:pr-24"
            >
              {projects.map(([t, d, tags, stack, href], i) => (
                <Link
                  key={t}
                  href={href}
                  data-tilt
                  data-cursor="view"
                  className={`gb group block w-[82vw] shrink-0 overflow-hidden rounded-[4px] md:w-[46vw] lg:w-[30vw] ${ring}`}
                >
                  <div className="relative h-[34vh] min-h-[220px] overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#0B1F3B]">
                    <img
                      src={projectImgs[i]}
                      alt={`${t} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/60 to-transparent"
                    />
                    <ul className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {tags.map((g) => (
                        <li
                          key={g}
                          className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0052CC]"
                        >
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6">
                    <h3
                      className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}
                    >
                      {t}
                      <ArrowUpRight
                        size={20}
                        className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </h3>
                    <p className="mt-2 font-light leading-relaxed text-[#475569]">
                      {d}
                    </p>
                    <p className="mt-4 border-t border-[#E5E7EB] pt-3 text-sm text-[#64748B]">
                      Stack:{" "}
                      <span className="font-medium text-[#1F2937]">
                        {stack}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY */}
      <section
        className="relative isolate overflow-hidden py-24 text-white md:py-36"
        style={{ background: "linear-gradient(135deg,#0B1F3B,#0A1A2F)" }}
        aria-labelledby="why"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            data-speed="-0.25"
            className="absolute -left-40 top-1/4 h-[40rem] w-[40rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(0,123,255,.35),transparent 65%)",
            }}
          />
        </div>
        <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <div
              className="rv relative overflow-hidden rounded-[4px] border border-[#3B82F6]/40 p-8 shadow-[0_0_80px_rgba(59,130,246,.25)] md:p-12 lg:sticky lg:top-24"
              style={{
                background: "linear-gradient(160deg,#0B1F3B 30%,#1E3A6B)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full opacity-70"
              >
                <defs>
                  <linearGradient id="arc" x1="0" x2="1">
                    <stop offset="0" stopColor="#00B4FF" stopOpacity="0" />
                    <stop offset="1" stopColor="#93C5FD" />
                  </linearGradient>
                </defs>
                <path
                  d="M-20 330 C 120 330, 180 120, 420 140"
                  fill="none"
                  stroke="url(#arc)"
                  strokeWidth="2"
                />
                <path
                  d="M120 -10 C 220 120, 190 300, 140 420"
                  fill="none"
                  stroke="#CFE2FF"
                  strokeOpacity=".4"
                  strokeWidth="1.5"
                />
              </svg>
              <h2
                id="why"
                className={`${pop.className} relative text-[clamp(2.3rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.035em]`}
              >
                Why <b className="font-bold">Devntom</b>
              </h2>
              <dl className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map(([n, l]) => (
                  <div key={l} className="border-t border-white/25 pt-4">
                    <dd
                      className={`${pop.className} text-5xl font-semibold tracking-[-0.04em]`}
                    >
                      <Count to={parseInt(n)} suffix={n.replace(/\d/g, "")} />
                    </dd>
                    <dt className="mt-1 text-sm font-light text-[#CFE2FF]">
                      {l}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="space-y-5 lg:col-span-6">
            {reasons.map(([t, d], i) => (
              <div
                key={t}
                data-tilt
                className="rv group rounded-[4px] border border-[#3B82F6]/30 border-l-4 border-l-[#00B4FF] p-8 transition-colors duration-300 hover:border-[#00B4FF]"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(11,31,59,.9),rgba(59,130,246,.22))",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <h3
                  className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em]`}
                >
                  {t}
                  <ArrowUpRight
                    size={20}
                    className="mt-1 shrink-0 text-[#00B4FF] transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-3 max-w-lg font-light leading-relaxed text-[#CFE2FF]">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. INDUSTRIES */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="ind">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines
              className="max-w-3xl t2 text-[#0B1F3B]"
              lines={[
                <>
                  Software for <b className="font-bold">every</b>
                </>,
                <>
                  kind of <Acc dark={false}>industry</Acc>
                </>,
              ]}
            />
            <Link
              href="/industries"
              id="ind"
              data-magnetic
              className={`inline-flex items-center gap-2 rounded-full border border-[#0B1F3B] px-6 py-3 font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}
            >
              Explore industries <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(([n, d, id], i) => (
              <Link
                key={n}
                href="/industries"
                data-tilt
                data-cursor="view"
                className={`rv group relative block h-80 overflow-hidden rounded-[4px] bg-gradient-to-br from-[#0052CC] to-[#0B1F3B] ${ring}`}
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <img
                  src={img(id, 900)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#050E1F] via-[#050E1F]/40 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3
                    className={`${pop.className} text-2xl font-semibold tracking-[-0.01em]`}
                  >
                    {n}
                  </h3>
                  <p className="mt-1 font-light text-[#CFE2FF]">{d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5c. TECH STACK: orbit */}
      <section className="bg-white py-24 md:py-36" aria-labelledby="tech">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
          <div>
            <Lines
              className="t2 text-[#0B1F3B]"
              lines={[
                <>The right tools,</>,
                <>
                  <b className="font-bold">chosen</b>{" "}
                  <Acc dark={false}>for you</Acc>
                </>,
              ]}
            />
            <p
              id="tech"
              className="rv mt-6 max-w-lg text-lg font-light leading-relaxed text-[#475569]"
            >
              We build on a modern, proven stack, from Next.js and React on the
              front end to Node.js, Python and cloud infrastructure behind it,
              and we pick what fits your goals.
            </p>
            <Link
              href="/services"
              data-magnetic
              className={`rv mt-8 inline-flex items-center gap-2 rounded-full bg-[#007BFF] px-7 py-3.5 font-medium text-white transition hover:bg-[#0052CC] ${ring}`}
            >
              View all services <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div
            className="relative mx-auto aspect-square w-full max-w-[480px]"
            aria-hidden="true"
          >
            <Ring
              size={88}
              d={50}
              items={tech.slice(0, 4).map(([Ic, n]) => (
                <Ic key={n} />
              ))}
            />
            <Ring
              size={62}
              d={36}
              items={tech.slice(4, 7).map(([Ic, n]) => (
                <Ic key={n} />
              ))}
            />
            <Ring
              size={38}
              d={26}
              items={tech.slice(7, 9).map(([Ic, n]) => (
                <Ic key={n} />
              ))}
            />
            <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B1F3B] shadow-[0_0_60px_rgba(0,123,255,.5)]">
              <svg width="30" height="30" viewBox="0 0 32 32">
                <path
                  d="M4 4h12a12 12 0 0 1 0 24H4l6-8h6a4 4 0 0 0 0-8H4z"
                  fill="#00B4FF"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECH MARQUEE */}
      <section
        aria-label="Technologies we use"
        className="relative overflow-hidden bg-white "
      >
        <div className="mx-auto mb-10 max-w-[1400px] px-6 text-center md:px-12">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D7E3F2]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
              Our technology stack
            </span>

            <span className="h-px w-8 bg-[#D7E3F2]" />
          </div>

          <p className="text-sm font-light text-[#64748B] md:text-base">
            Built with tools we trust
          </p>
        </div>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          {/* Row 1 */}
          <div className="mqw overflow-hidden">
            <div
              className="mq2 flex w-max items-center"
              style={{ animationDuration: "42s" }}
            >
              {[...techRows[0], ...techRows[0]].map(([Ic, name], i) => (
                <span
                  key={`tech-top-${i}`}
                  className="group mx-2 inline-flex shrink-0 items-center gap-3 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-5 py-3 text-sm font-medium text-[#334155] shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white hover:shadow-[0_8px_25px_rgba(15,23,42,0.07)] md:px-6 md:py-3.5 md:text-base"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] transition-transform duration-300 group-hover:scale-110">
                    <Ic
                      aria-hidden="true"
                      className="h-5 w-5 text-[#64748B] transition-colors duration-300 group-hover:text-[#006BFF]"
                    />
                  </span>

                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="mqw mt-4 overflow-hidden">
            <div
              className="mq2 rev flex w-max items-center"
              style={{ animationDuration: "48s" }}
            >
              {[...techRows[1], ...techRows[1]].map(([Ic, name], i) => (
                <span
                  key={`tech-bottom-${i}`}
                  className="group mx-2 inline-flex shrink-0 items-center gap-3 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-5 py-3 text-sm font-medium text-[#334155] shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white hover:shadow-[0_8px_25px_rgba(15,23,42,0.07)] md:px-6 md:py-3.5 md:text-base"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] transition-transform duration-300 group-hover:scale-110">
                    <Ic
                      aria-hidden="true"
                      className="h-5 w-5 text-[#64748B] transition-colors duration-300 group-hover:text-[#7C3AED]"
                    />
                  </span>

                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. OFFICES: expanding panels */}
      <section
        className="relative overflow-hidden bg-[#050E1F] py-24 text-white md:py-36"
        aria-labelledby="off"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 88% 12%,rgba(0,123,255,.28),transparent 45%)",
          }}
        />
        <div className={`${wrap} relative`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines
              className="t2"
              lines={[
                <>
                  Three offices, <b className="font-bold">one</b> team
                </>,
              ]}
            />
            <p id="off" className="rv max-w-sm font-light text-[#CFE2FF]">
              Local understanding in South Asia, the Middle East and Europe,
              with delivery for clients worldwide.
            </p>
          </div>
          <ul className="ofc mt-14 grid gap-3 lg:h-[440px]">
            {offices.map(([city, country, contact, href, tz], i) => (
              <li
                key={city}
                className="rv min-h-[220px] min-w-0"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <a
                  href={href}
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[4px] border border-white/15 p-6 ${ring} focus-visible:ring-offset-[#050E1F]`}
                  style={{
                    background: [
                      "linear-gradient(160deg,#0B1F3B,#0A3F9E)",
                      "linear-gradient(160deg,#0A2A5C,#0052CC)",
                      "linear-gradient(160deg,#0B1F3B,#0A63E0)",
                    ][i],
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`${pop.className} pointer-events-none absolute -bottom-6 -right-2 select-none text-[11rem] font-bold leading-none text-white/[.07] transition duration-700 group-hover:-translate-y-3 group-hover:text-white/[.12]`}
                  >
                    {["PK", "SA", "UK"][i]}
                  </span>
                  <p className={`${pop.className} relative text-lg font-light`}>
                    <Clock tz={tz} />
                    <span className="ml-2 text-sm text-[#93C5FD]">
                      local time
                    </span>
                  </p>
                  <div className="relative">
                    <p className="text-sm text-[#CFE2FF]">{country}</p>
                    <h3
                      className={`${pop.className} mt-1 text-4xl font-extralight leading-none tracking-[-0.03em] md:text-5xl`}
                    >
                      {city}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-2 font-medium">
                      {contact}
                      <ArrowUpRight
                        size={18}
                        className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8b. TESTIMONIALS */}
      <Testimonials />

      {/* 9. INSIGHTS */}
      <section className="bg-white py-24 md:py-36" aria-labelledby="blog">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines
              className="max-w-3xl t2 text-[#0B1F3B]"
              lines={[
                <>
                  Ideas for <b className="font-bold">better</b>
                </>,
                <>
                  websites and <Acc dark={false}>software</Acc>
                </>,
              ]}
            />
            <Link
              href="/blog"
              id="blog"
              className={`rv inline-flex items-center gap-2 rounded-full border border-[#0B1F3B] px-6 py-3 font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}
            >
              Read the blog <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 grid border-t border-[#0B1F3B] md:grid-cols-3">
            {posts.map(([tag, t, d, href], i) => (
              <Link
                key={t}
                href={href}
                className={`rv group flex flex-col justify-between gap-12 py-8 transition hover:bg-[#F5F9FF] md:px-8 ${i ? "md:border-l md:border-[#CFE2FF]" : "md:pl-0"} ${ring}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div>
                  <div className="mb-6 overflow-hidden rounded-[3px]">
                    <img
                      src={img(postImgs[i], 800)}
                      alt={t}
                      loading="lazy"
                      className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="rounded-full bg-[#E6F0FF] px-3 py-1 text-xs font-medium text-[#0052CC]">
                    {tag}
                  </span>
                  <h3
                    className={`${pop.className} mt-6 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#0B1F3B]`}
                  >
                    {t}
                  </h3>
                  <p className="mt-3 font-light leading-relaxed text-[#475569]">
                    {d}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 font-medium text-[#0052CC]">
                  Read article{" "}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="faq">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Lines
                className="t2 text-[#0B1F3B]"
                lines={[
                  <>Questions,</>,
                  <>
                    <b className="font-bold">answered</b>
                  </>,
                ]}
              />
              <p
                id="faq"
                className="rv mt-6 max-w-xs font-light leading-relaxed text-[#475569]"
              >
                Can't find what you need? Write to{" "}
                <a
                  href="mailto:info@devntomsolutions.com"
                  className="font-medium text-[#0052CC] underline underline-offset-4"
                >
                  info@devntomsolutions.com
                </a>
                .
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="rv group border-t border-[#CFE2FF] last:border-b"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left ${ring} [&::-webkit-details-marker]:hidden`}
                >
                  <span
                    className={`${pop.className} text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B] md:text-xl`}
                  >
                    {q}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:border-[#007BFF] group-open:bg-[#007BFF] group-open:text-white">
                    <Plus size={18} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CONTACT FORM */}
      <section
        id="contact-form"
        data-nocursor
        className="relative isolate overflow-hidden py-24 text-white md:py-32"
        aria-labelledby="cta"
        style={{
          background:
            "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)",
            maskImage: "linear-gradient(to right,transparent 20%,#000)",
          }}
        />
        <div
          aria-hidden="true"
          className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`}
          style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}
        >
          <span data-speed="-0.12" className="block">
            Let's talk
          </span>
        </div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines
              className="t1"
              lines={[
                "Let's build",
                <>
                  <Acc>what's</Acc> <b className="font-bold">next.</b>
                </>,
              ]}
            />
            <p
              id="cta"
              className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#CFE2FF]"
            >
              Tell us what you want to build. We reply with a plan, a timeline
              and a quote.
            </p>
            <ul className="rv mt-8 space-y-2 font-medium">
              <li>
                <a
                  href="mailto:info@devntomsolutions.com"
                  className="underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD]"
                >
                  info@devntomsolutions.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923256036838"
                  className="underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD]"
                >
                  WhatsApp +92 325 6036838
                </a>
              </li>
            </ul>
          </div>
          <form
            onSubmit={submit}
            className="rv rounded-[4px] bg-white p-7 text-[#1F2937] shadow-[0_30px_100px_rgba(0,123,255,.35)] md:p-9 lg:col-span-6"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={label}>
                Full name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={field}
                  placeholder="Your name"
                />
              </label>
              <label className={label}>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={field}
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className={`${label} mt-5 block`}>
              What do you need?
              <select name="service" required defaultValue="" className={field}>
                <option value="" disabled>
                  Select a service
                </option>
                {services.map(([, n]) => (
                  <option key={n}>{n}</option>
                ))}
                <option>Something else</option>
              </select>
            </label>
            <label className={`${label} mt-5 block`}>
              Project details
              <textarea
                name="message"
                required
                rows={4}
                className={field}
                placeholder="Goals, features, timeline"
              />
            </label>
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <button
              disabled={state === "sending"}
              className={`group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 font-medium text-white transition hover:bg-[#0052CC] disabled:opacity-60 ${ring} focus-visible:ring-offset-white`}
            >
              {state === "sending" ? "Sending…" : "Send message"}{" "}
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <p
              role="status"
              className={`mt-4 text-sm ${state === "error" ? "text-[#EF4444]" : "text-[#047857]"}`}
            >
              {state === "sent" &&
                "Thank you. We received your message and will reply soon."}
              {state === "error" &&
                "Something went wrong. Please email info@devntomsolutions.com instead."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
