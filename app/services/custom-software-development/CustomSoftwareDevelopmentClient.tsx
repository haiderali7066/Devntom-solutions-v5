"use client";

/**
 * /services/custom-software-development
 *
 * Client component for the page. Rendered by page.tsx (the server page that holds the metadata and
 * JSON-LD). It can receive the FAQs and a server-rendered summary as props; with no props it falls back
 * to the FAQs below. No Nav, no Footer (both live in app/layout.tsx).
 *
 * SEO: one H1 ("Custom Software Development Services for Growing Businesses"), a clear H2 per topic, and
 * keywords used where they fit the sentence. Services are only the ones listed in the keyword brief.
 * Nothing on the page states prices, client names or results. Every screen is an illustration.
 *
 * Sections: hero with a layered-architecture diagram, overview, solutions explorer, technical
 * capabilities, AI-powered software, process, who we work with, project cost, locations, related
 * services, FAQ and the contact form.
 *
 * Palette: cobalt, navy, white, black.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  ArrowRight, ArrowUpRight, Bot, Building2, Check, Database, FileText, Layers, LayoutDashboard, LifeBuoy, MapPin, Plug,
  Plus, RefreshCw, Rocket, ShieldCheck, Sparkles, Users, Workflow, Briefcase, Code2, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB";
const COBALT_HI = "#2F7BFF";
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

/* ------------------------------ CONTENT ------------------------------ */

const techs = ["Custom software", "Web applications", "SaaS platforms", "CRM and ERP", "Workflow automation", "API integration", "AI-powered software", "Legacy modernization", "Maintenance and support"];

const stack = ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "REST and GraphQL APIs", "Cloud hosting"];

type Solution = { name: string; keyword: string; text: string; has: string[]; fit: string; mock: { title: string; kpis: string[]; rows: [string, string][] } };
const solutions: Solution[] = [
  {
    name: "CRM and ERP systems",
    keyword: "Custom business management software",
    text: "CRM software development and ERP software development that put customers, orders, stock, invoices and reports in one system, shaped around how your team really works instead of the other way round.",
    has: ["Customer and lead management", "Quotes, orders and invoicing", "Inventory and purchasing", "Role-based access and reporting"],
    fit: "Teams outgrowing spreadsheets and disconnected tools",
    mock: { title: "Customer pipeline", kpis: ["New leads", "Open quotes", "Invoices due"], rows: [["Account 1042", "Quote sent"], ["Account 1043", "Meeting set"], ["Account 1044", "Won"], ["Account 1045", "New lead"]] },
  },
  {
    name: "Web applications and SaaS",
    keyword: "Web application development",
    text: "Web application development and SaaS application development, from a first working version to a multi-user platform with accounts, subscriptions, dashboards and admin tools.",
    has: ["Multi-user accounts and permissions", "Subscriptions and billing", "Dashboards and analytics", "Admin and support tools"],
    fit: "Startups launching a product and companies selling software",
    mock: { title: "Workspace overview", kpis: ["Active users", "Plans", "Uptime"], rows: [["Team workspace", "Active"], ["Billing cycle", "Renewed"], ["New sign-up", "Onboarding"], ["Support ticket", "Open"]] },
  },
  {
    name: "Workflow automation",
    keyword: "Workflow automation software",
    text: "Software for business process automation: approvals, hand-offs, reminders and data entry handled automatically, with people stepping in only when a decision is needed.",
    has: ["Approval and hand-off flows", "Automatic data transfer between systems", "Alerts and reminders", "An audit trail for every step"],
    fit: "Operations with repetitive, manual, error-prone work",
    mock: { title: "Order workflow", kpis: ["Received", "In review", "Completed"], rows: [["Order received", "Done"], ["Stock checked", "Done"], ["Approval needed", "Waiting"], ["Invoice created", "Queued"]] },
  },
  {
    name: "Enterprise software",
    keyword: "Enterprise software development",
    text: "Enterprise software development for larger teams: several departments, many user roles, security requirements and integrations with the systems you already run.",
    has: ["Multi-department structure", "Single sign-on and detailed roles", "Integration with existing systems", "Reporting across the business"],
    fit: "Established companies with complex processes",
    mock: { title: "Departments", kpis: ["Sales", "Finance", "Operations"], rows: [["Sales report", "Ready"], ["Finance review", "In progress"], ["Operations sync", "Done"], ["Compliance check", "Scheduled"]] },
  },
  {
    name: "Portals and internal tools",
    keyword: "Custom web-based business applications",
    text: "Custom web-based business applications for staff and customers: portals, admin panels and internal tools that replace email chains and shared files with one clear place to work.",
    has: ["Customer and partner portals", "Staff dashboards and admin panels", "Document and request handling", "Notifications and status tracking"],
    fit: "Businesses whose teams share work through email and spreadsheets",
    mock: { title: "Customer portal", kpis: ["Requests", "Documents", "Messages"], rows: [["Request submitted", "Received"], ["Document shared", "New"], ["Status update", "Sent"], ["Invoice ready", "Paid"]] },
  },
  {
    name: "AI-powered software",
    keyword: "AI-powered software development",
    text: "AI-powered software development that adds assistants, document reading and smart automation to the systems you already use, with clear limits and a human in the loop.",
    has: ["Assistants trained on your content", "Document and data extraction", "Automatic classification and routing", "Summaries and suggestions for staff"],
    fit: "Teams that want to save time on reading, sorting and replying",
    mock: { title: "AI inbox", kpis: ["Read", "Sorted", "Replied"], rows: [["Invoice received", "Extracted"], ["Support request", "Answered"], ["Enquiry", "Routed to sales"], ["Unclear request", "Sent to a person"]] },
  },
];

const capabilities: [LucideIcon, string, string][] = [
  [Plug, "API development and integration", "REST and GraphQL APIs, plus connections to payments, accounting, CRM, email and messaging, so your systems share data instead of duplicating it."],
  [Database, "Database-driven application development", "Applications designed around a clean data model, with the right database for the job and backups and migrations planned from day one."],
  [Layers, "Scalable software architecture", "A structure that handles more users, more data and more features without a rewrite every time the business grows."],
  [RefreshCw, "Legacy software modernization", "Moving ageing or spreadsheet-based systems to a modern, maintainable platform in safe stages, keeping the business running."],
  [LifeBuoy, "Software maintenance and support", "Monitoring, updates, bug fixes and improvements after launch, so the software stays secure and keeps pace with your needs."],
  [ShieldCheck, "Security and access control", "Role-based permissions, protected data, safe dependencies and sensible defaults built in rather than added at the end."],
];

const ai: [LucideIcon, string, string][] = [
  [Bot, "Assistants inside your software", "A chatbot or assistant that answers staff and customer questions from your own content and data."],
  [FileText, "Document and data processing", "Invoices, forms and emails read automatically, checked against your rules and filed in the right place."],
  [Sparkles, "Smart automation", "Classification, routing and suggestions that remove routine decisions and keep people on the work that matters."],
];

const steps = [
  ["Discovery and consultation", "We learn your business, your users and the problem. You leave with a clear understanding of what to build first."],
  ["Scope and architecture", "Requirements, a technical plan, a timeline and a fixed scope for the first release."],
  ["UX and interface design", "Screens and flows designed and approved before development starts."],
  ["Development in sprints", "Working software delivered in short cycles, reviewed with you as it grows."],
  ["Testing and launch", "Testing on real scenarios, data migration if needed and a managed go-live."],
  ["Support and evolution", "Maintenance, monitoring and new features as your business changes."],
] as const;

const audiences: [LucideIcon, string, string][] = [
  [Rocket, "Startups", "Software development for startups: a focused first version that proves your idea, built so it can grow into the full product."],
  [Briefcase, "Small businesses", "Custom software for small businesses that have outgrown spreadsheets and off-the-shelf tools that do not quite fit."],
  [LayoutDashboard, "Growing businesses", "Scalable software solutions for growing businesses: systems that keep up as teams, customers and data increase."],
  [Building2, "Established companies", "Integration, modernization and new platforms for companies with existing systems and more complex processes."],
];

const costFactors = [
  ["Scope and features", "The number of modules, screens and rules the software needs."],
  ["Users and roles", "Who uses it, what each role can see and do."],
  ["Integrations", "How many other systems it must connect to, and how well they are documented."],
  ["Design depth", "A simple internal tool needs less design than a customer-facing product."],
  ["Existing data", "Migrating and cleaning data from spreadsheets or older systems."],
  ["Timeline and support", "How fast you need it and what ongoing support you want."],
] as const;

const places = [
  { city: "Lahore", country: "Pakistan", h: "Custom software development company in Lahore", text: "Our Lahore team builds custom software and business systems for companies across Pakistan, from local startups to established firms." },
  { city: "Riyadh", country: "Saudi Arabia", h: "Software development company in Riyadh and Saudi Arabia", text: "From Riyadh we support businesses in Saudi Arabia with custom software, integrations and multilingual interfaces where they are needed." },
  { city: "London", country: "United Kingdom", h: "Custom software development company in London", text: "Our London team works with UK startups and growing companies on custom software development services across the United Kingdom." },
] as const;

const related = [
  ["AI Automation and Chatbots", "/services/ai-automation", "Add assistants and automation to the software you build."],
  ["Website Development", "/services/website-development", "Fast, secure websites that connect to your systems."],
  ["Digital Marketing", "/services/digital-marketing", "Bring the right customers to your platform."],
  ["Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps to go with your software."],
] as const;

const FAQS = [
  ["What are custom software development services?", "They cover designing, building and maintaining software made for one business instead of buying a ready-made product. It is shaped around your workflows, your data and your goals, and you own the result."],
  ["When should I choose custom software instead of off-the-shelf tools?", "When ready-made tools force you to change how you work, when you pay for features you do not use, or when your processes are what make your business different. If an existing tool fits well, we will tell you."],
  ["How much does custom software development cost?", "It depends on scope, users, integrations, design and timeline, so we do not publish fixed prices. After a short consultation we send a clear proposal with deliverables, a timeline and a price. Building in phases helps you control spend."],
  ["Do you work with startups and small businesses?", "Yes. For startups we usually start with a focused first release. For small businesses we often replace spreadsheets and manual steps with one simple system that can grow."],
  ["Can you build CRM and ERP systems?", "Yes. We build custom CRM and ERP software, as well as workflow automation, portals, internal tools and SaaS platforms, and connect them to the tools you already use."],
  ["Can you modernize our existing software?", "Yes. We review what you have, keep what works and move the rest to a modern platform in stages, so the business keeps running during the change."],
  ["Can we outsource custom software development to you?", "Yes. Many clients hand us the whole project, from discovery to launch and support, while others use us to extend their own team. We agree who does what in the proposal."],
  ["Who owns the code and the data?", "You do. We agree this in writing at the start, and we document the system so it is not dependent on us."],
  ["Do you support the software after launch?", "Yes. We offer maintenance and support covering monitoring, updates, fixes and new features."],
  ["Where do you work?", "We have teams in Lahore, Riyadh and London and work with businesses worldwide, using video calls and shared tools to keep projects moving."],
] as const;

const serviceOptions = ["Custom Software", "CRM or ERP", "SaaS or Web Application", "Workflow Automation", "AI Integration", "Legacy Modernization", "Website Development", "Something else"];

/* ------------------------------ SMALL HELPERS ------------------------------ */

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

const bar = (w: string, extra = "") => <span className={`block h-2 rounded-full bg-white/20 ${extra}`} style={{ width: w }} />;

/* ------------------------------ HERO: LAYERED ARCHITECTURE ------------------------------ */

function Layer({ label, items, delay }: { label: string; items: [LucideIcon, string][]; delay: number }) {
  return (
    <div className="wf-pop rounded-[16px] border border-white/20 bg-[#0B1F3B]/90 p-5 shadow-[0_30px_80px_rgba(0,71,171,.35)]" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6EA1FF]">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {items.map(([I, t]) => <li key={t} className="flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-[#E6EEFF]"><I size={16} className="text-[#6EA1FF]" aria-hidden="true" />{t}</li>)}
      </ul>
    </div>
  );
}

function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <div aria-hidden className="relative mx-auto h-9 w-px overflow-hidden bg-gradient-to-b from-transparent via-[#2F7BFF]/60 to-transparent">
      <span className="flow absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_#2F7BFF]" style={{ animationDelay: `${delay}ms` }} />
    </div>
  );
}

function Architecture() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]" role="img" aria-label="Diagram of a custom software system: interfaces on top, business logic and APIs in the middle, data underneath, connected to your existing tools">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-2xl" style={{ background: `radial-gradient(closest-side, ${COBALT}88, transparent)` }} />
      <div className="mk-float-slow">
        <Layer label="Interfaces" delay={0} items={[[Globe, "Web app"], [LayoutDashboard, "Admin panel"], [Users, "Customer portal"]]} />
        <Connector />
        <Layer label="Business logic and APIs" delay={150} items={[[Workflow, "Workflows"], [ShieldCheck, "Roles and security"], [Plug, "Integrations"]]} />
        <Connector delay={600} />
        <Layer label="Data" delay={300} items={[[Database, "Database"], [FileText, "Documents"], [LayoutDashboard, "Reports"]]} />
        <div className="mt-4 flex justify-center">
          <span className="pulse-soft inline-flex items-center gap-2 rounded-full border border-dashed border-[#6EA1FF]/70 px-4 py-2 text-sm text-[#BFD4FF]"><Plus size={14} aria-hidden="true" />New module when you need it</span>
        </div>
      </div>
      <div aria-hidden className="mk-float absolute -right-5 top-[27%] hidden items-center gap-2 rounded-full border border-white/25 bg-[#0B1F3B]/95 px-4 py-2.5 text-sm text-white xl:flex"><Plug size={15} className="text-[#6EA1FF]" />Your existing tools</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Custom software development services" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[100svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-6">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            Custom software development company
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.2rem,4vw,3.9rem)] leading-[0.98] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={[<b key="a" className="font-bold">Custom Software</b>, "Development Services", <>for <Acc>Growing</Acc> Businesses</>]} />
          <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            DEVNTOM Solutions designs and builds scalable business applications, custom platforms and software solutions tailored to your workflows and goals, from the first idea to launch and long-term support.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <a href="#contact-form" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Book a free consultation <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#solutions" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>See what we build</a>
          </div>
          <ul className="rv mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#DCE7FB]" style={{ transitionDelay: "350ms" }}>
            {["End-to-end delivery", "You own the code", "Support after launch"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6"><Architecture /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/40 py-5" aria-label="What we build">
        <div className="overflow-hidden">
          <div className="mq flex w-max items-center gap-14 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-white/60">
            {[...techs, ...techs, ...techs].map((t, i) => <span key={i} className="flex items-center gap-14">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ OVERVIEW ------------------------------ */

function Overview() {
  const points: [LucideIcon, string, string][] = [
    [Workflow, "Fits your workflows", "Software modelled on how your team actually works, with no features you do not need and no workarounds for the ones you do."],
    [Layers, "Built to scale", "A scalable software architecture that grows with your users, data and ambitions, without a costly rewrite."],
    [ShieldCheck, "Yours to own", "You own the code and the data, with clear documentation, so you are never locked in."],
  ];
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Overview">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Lines className="t2" lines={[<>A custom software</>, <>development <b className="font-bold">company</b></>, <>built around <Acc dark={false}>you</Acc></>]} />
          <div className="rv mt-8 space-y-5 text-lg font-light leading-relaxed text-[#3B4A63]" style={{ transitionDelay: "120ms" }}>
            <p>Off-the-shelf tools work until your business does something they do not expect. Our custom software development services close that gap with bespoke software development shaped around your processes, your customers and your goals.</p>
            <p>As a software development company with teams in Lahore, Riyadh and London, we deliver end-to-end software development: discovery, design, engineering, testing, launch and support. The result is business software development you can rely on, with tailored software solutions that your team will actually use.</p>
          </div>
        </div>
        <ul className="grid gap-5 lg:col-span-6">
          {points.map(([I, t, d], i) => (
            <li key={t} className="rv group flex gap-6 rounded-[4px] border border-[#CBD8EE] p-7 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE]" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><I size={24} aria-hidden="true" /></span>
              <span><h3 className={`${pop.className} text-xl font-semibold tracking-[-0.01em]`}>{t}</h3><p className="mt-2 font-light leading-relaxed text-[#3B4A63]">{d}</p></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ SOLUTIONS EXPLORER ------------------------------ */

function SolutionMock({ s }: { s: Solution }) {
  const m = s.mock;
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-[12px] border border-white/15 bg-[#071A33] shadow-[0_30px_80px_rgba(2,5,11,.4)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-[#2F7BFF]" /><span className="ml-3 text-xs text-white/60">{m.title}</span></div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          {m.kpis.map((k, i) => <div key={k} className="wf-pop rounded-[8px] border border-white/10 bg-white/[0.05] p-3" style={{ animationDelay: `${i * 90}ms` }}><p className="text-[11px] text-[#BFD4FF]">{k}</p>{bar("55%", "mt-3 !bg-white/70 !h-3")}</div>)}
        </div>
        <ul className="mt-4 divide-y divide-white/10 rounded-[8px] border border-white/10">
          {m.rows.map(([a, b], i) => (
            <li key={a} className="wf-pop flex items-center justify-between px-4 py-3 text-sm" style={{ animationDelay: `${250 + i * 90}ms` }}>
              <span className="flex items-center gap-3 text-[#E6EEFF]"><span className="h-6 w-6 rounded-full bg-white/15" />{a}</span>
              <span className={`rounded-full px-3 py-1 text-[11px] ${/Done|Won|Paid|Ready|Renewed|Answered|Extracted|Active/.test(b) ? "bg-[#2F7BFF] text-white" : "bg-white/10 text-white/80"}`}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Solutions() {
  const [sel, setSel] = React.useState(0);
  const s = solutions[sel];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = solutions.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setSel(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <section id="solutions" className="relative overflow-hidden py-24 text-white md:py-36" aria-label="Custom software solutions" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 12% 10%, rgba(0,71,171,.5), transparent 45%)" }} />
      <div className={`${wrap} relative`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Custom software</>, <><b className="font-bold">solutions</b> we <Acc>build</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-white/70">From business management systems to SaaS platforms, choose a type of software to see what it covers. Screens are illustrations.</p>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Types of custom software" aria-orientation="vertical" className="lg:col-span-4">
            {solutions.map((x, i) => (
              <button key={x.name} role="tab" id={`sol-tab-${i}`} aria-selected={sel === i} aria-controls="sol-panel" tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)} onKeyDown={(e) => onKey(e, i)} className={`flex w-full items-baseline gap-4 border-t border-white/15 py-5 pr-4 text-left transition last:border-b ${ringDark}`}>
                <span className="text-xs text-white/50">{String(i + 1).padStart(2, "0")}</span>
                <span className={`${pop.className} text-2xl tracking-[-0.03em] transition-colors ${sel === i ? "font-semibold text-[#6EA1FF]" : "font-extralight text-white hover:text-[#6EA1FF]"}`}>{x.name}</span>
              </button>
            ))}
          </div>
          <div id="sol-panel" role="tabpanel" aria-labelledby={`sol-tab-${sel}`} className="lg:col-span-8">
            <div key={sel} className="mk-swap grid gap-8 md:grid-cols-2">
              <div>
                <h3 className={`${pop.className} text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl`}>{s.keyword}</h3>
                <p className="mt-4 font-light leading-relaxed text-[#DCE7FB]">{s.text}</p>
                <ul className="mt-6 space-y-3">
                  {s.has.map((h) => <li key={h} className="flex items-start gap-3 text-[#E6EEFF]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{h}</li>)}
                </ul>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#6EA1FF]">A good fit for</p>
                <p className="mt-1 text-[#DCE7FB]">{s.fit}</p>
              </div>
              <SolutionMock s={s} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CAPABILITIES ------------------------------ */

function Capabilities() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Technical capabilities">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Technical</>, <><b className="font-bold">capabilities</b> that <Acc dark={false}>last</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Good software is more than screens. These are the foundations we build into every project.</p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(([I, t, d], i) => (
            <li key={t} className="rv group rounded-[4px] border border-[#CBD8EE] p-8 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE]" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><I size={24} aria-hidden="true" /></span>
              <h3 className={`${pop.className} mt-8 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
              <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{d}</p>
            </li>
          ))}
        </ul>
        <div className="rv mt-12 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5B6B84]">Built with</span>
          {stack.map((t) => <span key={t} className="rounded-full border border-[#CBD8EE] px-4 py-2 text-sm text-[#3B4A63]">{t}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ AI-POWERED SOFTWARE ------------------------------ */

function AiSection() {
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="AI-powered software">
      <div className={`${wrap} grid items-start gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Lines className="t2" lines={[<>AI-powered</>, <>software <b className="font-bold">development</b></>]} />
          <p className="rv mt-6 max-w-md font-light leading-relaxed text-[#3B4A63]">We can build intelligence into your software where it clearly helps: reading documents, answering questions and routing work, always with limits you control and a person able to step in.</p>
          <Link href="/services/ai-automation" className={`rv group mt-8 inline-flex items-center gap-3 rounded-full border border-[#0B1F3B]/30 px-7 py-3.5 text-sm font-medium transition hover:border-[#0047AB] hover:text-[#0047AB] ${ring}`}>
            AI automation and chatbots <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-5 lg:col-span-7">
          {ai.map(([I, t, d], i) => (
            <li key={t} className="rv flex gap-6 rounded-[4px] border border-[#CBD8EE] bg-white p-7" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#0047AB] text-white"><I size={24} aria-hidden="true" /></span>
              <span><h3 className={`${pop.className} text-xl font-semibold tracking-[-0.01em]`}>{t}</h3><p className="mt-2 font-light leading-relaxed text-[#3B4A63]">{d}</p></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ AUDIENCES ------------------------------ */

function Audiences() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Who we build software for">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Software for startups,</>, <>small and <b className="font-bold">growing</b> <Acc dark={false}>businesses</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Whatever your size, we start from your goals and build only what moves you toward them.</p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(([I, t, d], i) => (
            <li key={t} className="rv rounded-[4px] border border-[#CBD8EE] p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB]"><I size={24} aria-hidden="true" /></span>
              <h3 className={`${pop.className} mt-6 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
              <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ COST ------------------------------ */

function Cost() {
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-32" aria-label="Project cost" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%, rgba(0,71,171,.5), transparent 50%)" }} />
      <div className={`${wrap} relative grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Lines className="t2" lines={[<>What affects</>, <>custom software</>, <>project <b className="font-bold">cost</b></>]} />
          <p className="rv mt-6 max-w-md font-light leading-relaxed text-white/75">Every project is different, so we scope before we price. After a short consultation you receive a clear proposal with deliverables and a timeline, and we can deliver in phases so you spend as you see results.</p>
          <a href="#contact-form" className={`rv group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
            Request a quote <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:col-span-7">
          {costFactors.map(([t, d], i) => (
            <li key={t} className="rv bg-[#0B1F3B] p-7" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <span className="text-sm text-[#6EA1FF]">0{i + 1}</span>
              <h3 className={`${pop.className} mt-3 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
              <p className="mt-2 font-light leading-relaxed text-white/70">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ LOCATIONS ------------------------------ */

function Places() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Where we work">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Custom software in</>, <><b className="font-bold">Pakistan</b>, Saudi Arabia</>, <>and the <Acc dark={false}>UK</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Three offices, one delivery process, and a custom software development company for businesses worldwide.</p>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {places.map((p, i) => (
            <li key={p.city} className="rv rounded-[4px] border border-[#CBD8EE] p-8" style={{ transitionDelay: `${i * 90}ms` }}>
              <p className="flex items-center gap-2 text-sm text-[#0047AB]"><MapPin size={16} aria-hidden="true" />{p.city}, {p.country}</p>
              <h3 className={`${pop.className} mt-5 text-xl font-semibold leading-snug tracking-[-0.01em]`}>{p.h}</h3>
              <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{p.text}</p>
            </li>
          ))}
        </ul>
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
@keyframes mq{to{transform:translate3d(-25%,0,0)}}
.mq{animation:mq 45s linear infinite;will-change:transform;backface-visibility:hidden}
.mq:hover{animation-play-state:paused}
.hero-grid{background-image:linear-gradient(rgba(110,161,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(110,161,255,.5) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent);mask-image:radial-gradient(75% 75% at 70% 40%,#000,transparent)}
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
@keyframes flow{0%{transform:translate(-50%,-8px);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translate(-50%,40px);opacity:0}}
.flow{animation:flow 2.2s linear infinite}
@keyframes softpulse{0%,100%{opacity:.65}50%{opacity:1}}
.pulse-soft{animation:softpulse 2.4s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.flow,.pulse-soft{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function CustomSoftwareClient({ faqs = FAQS, geo }: { faqs?: readonly (readonly [string, string])[]; geo?: React.ReactNode }) {
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
      <Overview />
      <Solutions />
      <Capabilities />
      <AiSection />
      <Audiences />
      {/* 3. PROCESS */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we build software">
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

      <Cost />
      <Places />

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
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your software project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s build</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>your</Acc> <b className="font-bold">software.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us about your business and what the software should do. We reply with a plan, a timeline and a quote.</p>
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
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="What should the software do? Who will use it? Systems it must connect to, and your timeline" /></label>
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
