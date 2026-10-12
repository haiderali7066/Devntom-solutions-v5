"use client";

/**
 * /services/ai-automation-chatbots
 *
 * One self-contained file: no imports from your own files, no Nav, no Footer
 * (both live in app/layout.tsx).
 *
 * Sections: hero with a live, self-playing chatbot conversation, an automation workflow
 * diagram with four use cases (signals travel along the connections), "trained on your
 * business" cards, a channels section with a phone mock-up, then what is included, process,
 * related services, FAQ and the contact form. All screens are illustrations, not client work.
 *
 * Palette: cobalt, navy, white, black.
 * Before launch, search this file for "TESTIMONIALS" to see where to drop your component.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  ArrowRight, ArrowUpRight, BarChart3, Bell, Bot, CalendarCheck, Check, FileText, GitBranch, Globe, Headphones,
  Languages, Mail, MessageSquare, Plug, Plus, Receipt, ShieldCheck, Sparkles, UserCheck, Users, Clock, Database, Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB"; // true cobalt: borders, buttons, accents on light backgrounds
const COBALT_HI = "#2F7BFF"; // lighter cobalt tint: glow and accents on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/ai-automation-chatbots";
const TITLE = "AI Automation and Chatbot Development | DEVNTOM Solutions";
const DESC = "AI chatbots and workflow automation that answer customers, qualify leads and handle routine work, connected to your CRM, calendar and tools. DEVNTOM Solutions, Lahore, Riyadh and London.";

/* ------------------------------ CONTENT ------------------------------ */

const techs = ["OpenAI", "Claude", "n8n", "Zapier", "Make", "WhatsApp Business", "HubSpot", "Slack", "Google Workspace", "Stripe", "Shopify", "Airtable"];

type Msg = { who: "u" | "b"; text: string; act?: [LucideIcon, string] };
const CONVO: Msg[] = [
  { who: "u", text: "Hi! Do you deliver to Riyadh?" },
  { who: "b", text: "Yes, we do. Delivery takes 2 to 3 working days. Would you like to see the plans?" },
  { who: "u", text: "Can I book a demo for Thursday?" },
  { who: "b", text: "Thursday at 3:00 PM is free. I have booked it and emailed you the invite.", act: [CalendarCheck, "Demo booked in the calendar"] },
  { who: "b", text: "I have also passed your details to the team, so they can join with answers ready.", act: [Users, "Lead added to the CRM"] },
];

type Node = [LucideIcon, string, string];
const FLOWS: { name: string; blurb: string; t: Node; a: Node; d: Node; o: [Node, Node, Node] }[] = [
  {
    name: "Lead capture",
    blurb: "Every enquiry is read, scored and sent to the right person in seconds, even at 2 a.m.",
    t: [Globe, "New enquiry", "Website form or chat"],
    a: [Sparkles, "AI qualifies", "Reads need and urgency"],
    d: [GitBranch, "Score and route", "Hot, warm or cold"],
    o: [[Users, "Added to CRM", "Contact and notes"], [Bell, "Sales alerted", "Message to the owner"], [Mail, "Reply sent", "Booking link by email"]],
  },
  {
    name: "Support triage",
    blurb: "Common questions are answered instantly. The rest reach the right agent with context.",
    t: [MessageSquare, "Customer message", "Chat, email or WhatsApp"],
    a: [Sparkles, "AI understands", "Topic, language, mood"],
    d: [GitBranch, "Can it answer?", "Checks your help content"],
    o: [[Send, "Answer sent", "With the source shown"], [FileText, "Ticket created", "Summary attached"], [UserCheck, "Handed to a person", "Full chat history"]],
  },
  {
    name: "Invoices and documents",
    blurb: "Paperwork is read, checked and filed, and only the odd one out needs a human.",
    t: [Mail, "Document arrives", "Email or upload"],
    a: [Sparkles, "AI extracts", "Supplier, amounts, dates"],
    d: [GitBranch, "Matches the order?", "Rules you control"],
    o: [[Database, "Posted to accounts", "No re-typing"], [Bell, "Mismatch flagged", "Sent for review"], [Receipt, "Filed and logged", "Searchable record"]],
  },
  {
    name: "Appointments",
    blurb: "Customers book, change and cancel in chat. Your calendar and reminders stay in sync.",
    t: [MessageSquare, "Booking request", "Chat or WhatsApp"],
    a: [Sparkles, "AI finds a time", "Reads availability"],
    d: [GitBranch, "Slot free?", "Offers alternatives"],
    o: [[CalendarCheck, "Booking created", "Calendar updated"], [Clock, "Reminder scheduled", "Before the visit"], [Users, "CRM updated", "History kept"]],
  },
];

const included = [
  [Bot, "Trained on your content", "Your pages, documents and policies become the bot's knowledge, so answers match your business."],
  [UserCheck, "Human handover", "Sensitive or tricky questions go to your team with the whole conversation attached."],
  [ShieldCheck, "Guardrails and privacy", "Clear limits on what the bot can say and do, and careful handling of customer data."],
  [Plug, "Connected to your tools", "CRM, calendar, helpdesk, spreadsheets, payments and email, through their APIs."],
  [BarChart3, "Reports that help", "See what customers ask, what is automated and where the bot needs improving."],
  [Languages, "Multilingual", "English, Arabic, Urdu and more, matched to the language your customer writes in."],
] as const;

const steps = [
  ["Discovery and process mapping", "We find the repetitive work and the questions your team answers every day."],
  ["Conversation and workflow design", "Flows, tone and handover rules you approve before anything is built."],
  ["Build and connect", "The bot, the automations and the links to your CRM, calendar and tools."],
  ["Testing with real scenarios", "Real questions, edge cases and failures tried before customers see it."],
  ["Launch", "Go live on your channels with monitoring switched on from the first message."],
  ["Monitor and improve", "We review conversations, fix gaps and add automations as you grow."],
] as const;

const related = [
  ["Custom Software", "/services/custom-software-development", "CRMs, ERPs and internal tools your automations can plug into."],
  ["Website Development", "/services/website-development", "A fast site where your chatbot greets every visitor."],
  ["Digital Marketing", "/services/digital-marketing", "Campaigns that send people to a bot ready to convert them."],
  ["Mobile Apps", "/services/mobile-app-development", "Apps with the same assistant built in."],
] as const;

const faqs = [
  ["What can an AI chatbot do for my business?", "Answer common questions, qualify leads, book appointments, check order status and hand over to your team when needed, on your website, WhatsApp and other channels."],
  ["Will the chatbot give wrong answers?", "We ground answers in your own content and set clear limits on what it can say. When it is unsure, it says so and hands over to a person. We also review real conversations after launch."],
  ["Which AI models and tools do you use?", "We choose what fits the job: models from OpenAI or Anthropic, and tools such as n8n, Zapier, Make or custom code. You are not tied to one vendor."],
  ["Can it connect to our CRM and other systems?", "Yes. If a tool has an API or a standard integration, we can usually connect it: CRMs, calendars, helpdesks, spreadsheets, payments and email."],
  ["Which channels are supported?", "Website chat, WhatsApp Business, Instagram and Facebook messaging, Telegram, Slack, Teams and email. We confirm the best mix for your customers."],
  ["Can customers still reach a human?", "Always. Handover rules are part of the design, and your team sees the full conversation when they take over."],
  ["Is our data safe?", "We limit what data the bot can see, protect keys and credentials, and agree with you in advance what is stored and for how long."],
  ["How long does it take and what does it cost?", "It depends on scope. After a short discovery call we send a clear quote with deliverables and a timeline."],
] as const;

const serviceOptions = ["AI Automation", "Chatbot Development", "Website Development", "Digital Marketing", "Custom Software", "Mobile Apps", "UI/UX Design", "Something else"];

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Service", name: "AI Automation and Chatbot Development", serviceType: "AI automation and chatbot development", description: DESC, url: SITE + PATH, provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
    { "@type": "ListItem", position: 3, name: "AI Automation and Chatbots", item: SITE + PATH },
  ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
];

/* ------------------------------ SMALL HELPERS ------------------------------ */

const pp = (i: number) => ({ ["--i" as string]: i } as React.CSSProperties);

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
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

/* ------------------------------ HERO: A LIVE CHAT ------------------------------ */

function ChatDemo() {
  const reduced = useReduced();
  const [n, setN] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const end = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced) { setN(CONVO.length); setTyping(false); return; }
    let t: ReturnType<typeof setTimeout>;
    const step = (i: number) => {
      if (i >= CONVO.length) { t = setTimeout(() => { setN(0); step(0); }, 4800); return; }
      if (CONVO[i].who === "b") {
        setTyping(true);
        t = setTimeout(() => { setTyping(false); setN(i + 1); t = setTimeout(() => step(i + 1), 1500); }, 1300);
      } else {
        t = setTimeout(() => { setN(i + 1); step(i + 1); }, i === 0 ? 1000 : 1400);
      }
    };
    step(0);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full opacity-80 blur-2xl" style={{ background: `radial-gradient(closest-side, ${COBALT}99, transparent)` }} />
      <div className="mk-float-slow overflow-hidden rounded-[22px] border border-white/20 bg-[#0B1F3B]/85 shadow-[0_50px_120px_rgba(0,71,171,.55)] backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-5 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0047AB] text-white"><Bot size={20} aria-hidden="true" /></span>
          <div className="leading-tight">
            <p className="text-sm font-medium text-white">Devntom Assistant</p>
            <p className="flex items-center gap-1.5 text-xs text-[#9DB8E8]"><span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />Online, replies instantly</p>
          </div>
        </div>
        <div className="flex h-[360px] flex-col justify-end gap-3 overflow-hidden px-5 py-5" role="log" aria-label="Example conversation">
          {CONVO.slice(0, n).map((m, i) => (
            <div key={i} className={`msg-in flex flex-col ${m.who === "u" ? "items-end" : "items-start"}`}>
              <p className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-snug ${m.who === "u" ? "rounded-[16px_16px_4px_16px] bg-[#0047AB] text-white" : "rounded-[16px_16px_16px_4px] border border-white/10 bg-white/10 text-[#E6EEFF]"}`}>{m.text}</p>
              {m.act && (() => { const [I, l] = m.act; return <span className="msg-in mt-2 inline-flex items-center gap-2 rounded-full border border-[#2F7BFF]/50 bg-[#2F7BFF]/15 px-3 py-1.5 text-xs text-[#BFD4FF]"><I size={13} aria-hidden="true" />{l}<Check size={12} strokeWidth={3} className="text-[#4ADE80]" aria-hidden="true" /></span>; })()}
            </div>
          ))}
          {typing && (
            <div className="msg-in flex w-fit items-center gap-1.5 rounded-[16px_16px_16px_4px] border border-white/10 bg-white/10 px-4 py-3" aria-label="Assistant is typing">
              {[0, 1, 2].map((k) => <span key={k} className="dot h-1.5 w-1.5 rounded-full bg-[#9DB8E8]" style={{ animationDelay: `${k * 160}ms` }} />)}
            </div>
          )}
          <div ref={end} />
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
          <span className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white/50">Type a message</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0047AB] text-white"><Send size={16} aria-hidden="true" /></span>
        </div>
      </div>
      <div aria-hidden className="mk-float absolute -left-8 top-[44%] hidden items-center gap-2 rounded-full border border-white/25 bg-[#0B1F3B]/85 px-4 py-2.5 text-sm text-white backdrop-blur sm:flex"><Clock size={15} className="text-[#6EA1FF]" />Answers in seconds</div>
      <div aria-hidden className="mk-float-slow absolute -right-5 bottom-24 hidden items-center gap-2 rounded-full border border-white/25 bg-[#0B1F3B]/85 px-4 py-2.5 text-sm text-white backdrop-blur sm:flex"><Headphones size={15} className="text-[#6EA1FF]" />Human handover</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="AI automation and chatbots" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[100svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-6">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            AI automation and chatbots
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.7rem,6.2vw,6rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Automate the", <><b className="font-bold">busywork.</b></>, <><Acc>Answer</Acc> everyone.</>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            AI chatbots and workflows that reply to customers, qualify leads and handle routine tasks around the clock, connected to the tools you already use.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <a href="#contact-form" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Start a project <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#workflows" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>See how it works</a>
          </div>
          <ul className="rv mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#DCE7FB]" style={{ transitionDelay: "350ms" }}>
            {["Trained on your content", "Human handover built in", "Connects to your tools"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6"><ChatDemo /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 py-5 backdrop-blur-sm" aria-label="Tools we work with">
        <div className="overflow-hidden">
          <div className="mq flex w-max items-center gap-14 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-white/60">
            {[...techs, ...techs, ...techs, ...techs].map((t, i) => <span key={i} className="flex items-center gap-14">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WORKFLOWS ------------------------------ */

const POS = { t: [10, 184], a: [250, 184], d: [490, 184], o0: [730, 28], o1: [730, 184], o2: [730, 340] } as const;
const NW = 180;
const NH = 72;
const EDGES: [keyof typeof POS, keyof typeof POS][] = [["t", "a"], ["a", "d"], ["d", "o0"], ["d", "o1"], ["d", "o2"]];
const edgePath = (a: keyof typeof POS, b: keyof typeof POS) => {
  const x1 = POS[a][0] + NW, y1 = POS[a][1] + NH / 2, x2 = POS[b][0], y2 = POS[b][1] + NH / 2;
  return `M${x1} ${y1} C${x1 + 36} ${y1} ${x2 - 36} ${y2} ${x2} ${y2}`;
};

function FlowNode({ k, n, kind, i }: { k: keyof typeof POS; n: Node; kind: "trigger" | "ai" | "logic" | "out"; i: number }) {
  const [Icon, title, sub] = n;
  const dark = kind === "ai";
  return (
    <div className="wf-pop absolute flex items-center gap-3 rounded-[12px] border px-4" style={{ ...pp(i), left: POS[k][0], top: POS[k][1], width: NW, height: NH, background: dark ? `linear-gradient(135deg, ${NAVY}, ${COBALT})` : "#FFFFFF", borderColor: dark ? "transparent" : kind === "trigger" ? COBALT : "#CBD8EE", boxShadow: dark ? "0 18px 50px rgba(0,71,171,.45)" : "0 8px 24px rgba(11,31,59,.08)", color: dark ? "#fff" : NAVY }}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]" style={{ background: dark ? "rgba(255,255,255,.15)" : "#E3ECFB", color: dark ? "#fff" : COBALT }}><Icon size={18} aria-hidden="true" /></span>
      <span className="min-w-0 leading-tight"><span className="block text-[13px] font-semibold leading-tight">{title}</span><span className="mt-0.5 block text-[11px] leading-tight" style={{ color: dark ? "#BFD4FF" : "#5B6B84" }}>{sub}</span></span>
    </div>
  );
}

function Workflows() {
  const [sel, setSel] = React.useState(0);
  const reduced = useReduced();
  const f = FLOWS[sel];
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = FLOWS.length;
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setSel(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  const stage = (k: number) => (k <= 0 ? 0 : k === 1 ? 1 : 2);
  const list: [string, Node, string][] = [["Trigger", f.t, "t"], ["AI step", f.a, "a"], ["Decision", f.d, "d"], ["Action", f.o[0], "o"], ["Action", f.o[1], "o"], ["Action", f.o[2], "o"]];

  return (
    <section id="workflows" className="bg-white py-24 md:py-36" aria-label="Automation workflows">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Work that runs</>, <>by <b className="font-bold">itself</b>, <Acc dark={false}>reliably</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">A trigger starts it, AI reads and decides, and your systems do the rest. Pick a workflow to see how it flows. These are illustrations, not client work.</p>
        </div>

        <div role="tablist" aria-label="Example workflows" className="rv mt-12 flex flex-wrap gap-3">
          {FLOWS.map((x, i) => (
            <button key={x.name} role="tab" id={`flow-tab-${i}`} aria-selected={sel === i} aria-controls="flow-panel" tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)} onKeyDown={(e) => onKey(e, i)}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition ${sel === i ? "border-[#0047AB] bg-[#0047AB] text-white" : "border-[#CBD8EE] text-[#0B1F3B] hover:border-[#0047AB] hover:text-[#0047AB]"} ${ring}`}>{x.name}</button>
          ))}
        </div>

        <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${sel}`} className="mt-8">
          <p className="max-w-2xl text-lg font-light leading-relaxed text-[#3B4A63]">{f.blurb}</p>

          {/* wide screens: the diagram */}
          <div className="relative mt-8 hidden md:block">
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[24px]" style={{ background: "radial-gradient(60% 60% at 50% 45%, rgba(47,123,255,.14), transparent 70%)" }} />
            <Scaled w={920} h={440} className="rounded-[14px] border border-[#DCE5F5] bg-[#F7FAFF]">
              <div key={sel} aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#C8D6EE 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
                <svg width="920" height="440" viewBox="0 0 920 440" className="absolute inset-0">
                  {EDGES.map(([a, b], i) => <path key={i} d={edgePath(a, b)} fill="none" stroke="#8FB0E8" strokeWidth="2" strokeDasharray="5 6" />)}
                  {!reduced && EDGES.map(([a, b], i) => {
                    const k = stage(i === 0 ? 0 : i === 1 ? 1 : 2);
                    const s = k / 3, e = (k + 1) / 3;
                    return [0, 1].map((c) => (
                      <circle key={`${i}-${c}`} r="5" fill={COBALT_HI} stroke="#fff" strokeWidth="2">
                        <animateMotion dur="4.8s" begin={`${c * 2.4}s`} repeatCount="indefinite" path={edgePath(a, b)} calcMode="linear" keyPoints={`0;0;1;1`} keyTimes={`0;${(s / 2).toFixed(3)};${(e / 2).toFixed(3)};1`} />
                        <animate attributeName="opacity" dur="4.8s" begin={`${c * 2.4}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${(s / 2).toFixed(3)};${(s / 2 + 0.01).toFixed(3)};${(e / 2 - 0.01).toFixed(3)};${(e / 2).toFixed(3)};1`} />
                      </circle>
                    ));
                  })}
                </svg>
                <FlowNode k="t" n={f.t} kind="trigger" i={0} />
                <FlowNode k="a" n={f.a} kind="ai" i={1} />
                <FlowNode k="d" n={f.d} kind="logic" i={2} />
                <FlowNode k="o0" n={f.o[0]} kind="out" i={3} />
                <FlowNode k="o1" n={f.o[1]} kind="out" i={4} />
                <FlowNode k="o2" n={f.o[2]} kind="out" i={5} />
              </div>
            </Scaled>
          </div>

          {/* phones: a simple ordered list */}
          <ol className="mt-8 space-y-3 md:hidden">
            {list.map(([role, [Icon, t, s]], i) => (
              <li key={i} className="flex items-center gap-4 rounded-[10px] border border-[#CBD8EE] p-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] ${role === "AI step" ? "bg-[#0047AB] text-white" : "bg-[#E3ECFB] text-[#0047AB]"}`}><Icon size={18} aria-hidden="true" /></span>
                <span className="leading-tight"><span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5B6B84]">{role}</span><span className="block font-medium">{t}</span><span className="block text-sm text-[#3B4A63]">{s}</span></span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TRAINED ON YOUR BUSINESS ------------------------------ */

function Knowledge() {
  const sources = ["Website pages", "PDFs and policies", "Product catalogue", "Past conversations"];
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-36" aria-label="Trained on your business" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 12% 10%, rgba(0,71,171,.5), transparent 45%)" }} />
      <div className={`${wrap} relative`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>A bot that actually</>, <><b className="font-bold">knows</b> your <Acc>business</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-white/70">Generic chatbots guess. Ours learn from your own content, show where an answer came from and step aside when a person should take over.</p>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <article className="rv rounded-[6px] border border-white/15 bg-white/[0.05] p-7">
            <p className="text-sm text-[#6EA1FF]">01 Learn</p>
            <h3 className={`${pop.className} mt-3 text-2xl font-extralight tracking-[-0.03em]`}>Reads your content</h3>
            <ul className="mt-7 space-y-4">
              {sources.map((s, i) => (
                <li key={s}>
                  <div className="flex items-center justify-between text-sm text-white/85"><span>{s}</span><span className="kb-check flex h-5 w-5 items-center justify-center rounded-full bg-[#2F7BFF]" style={{ animationDelay: `${1.2 + i * 0.6}s` }}><Check size={12} strokeWidth={3} aria-hidden="true" /></span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><span className="kb-bar block h-full rounded-full bg-gradient-to-r from-[#0047AB] to-[#6EA1FF]" style={{ animationDelay: `${i * 0.6}s` }} /></div>
                </li>
              ))}
            </ul>
          </article>
          <article className="rv rounded-[6px] border border-white/15 bg-white/[0.05] p-7" style={{ transitionDelay: "90ms" }}>
            <p className="text-sm text-[#6EA1FF]">02 Answer</p>
            <h3 className={`${pop.className} mt-3 text-2xl font-extralight tracking-[-0.03em]`}>Answers with sources</h3>
            <div className="mt-7 space-y-3 text-[14px]">
              <p className="ml-auto w-fit max-w-[85%] rounded-[16px_16px_4px_16px] bg-[#0047AB] px-4 py-2.5">What is your returns policy?</p>
              <p className="w-fit max-w-[92%] rounded-[16px_16px_16px_4px] border border-white/10 bg-white/10 px-4 py-2.5 text-[#E6EEFF]">You can return unused items within the period set in your returns policy. I can start a return for you now.</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2F7BFF]/50 bg-[#2F7BFF]/15 px-3 py-1.5 text-xs text-[#BFD4FF]"><FileText size={13} aria-hidden="true" />Source: Returns policy</span>
            </div>
          </article>
          <article className="rv rounded-[6px] border border-white/15 bg-white/[0.05] p-7" style={{ transitionDelay: "180ms" }}>
            <p className="text-sm text-[#6EA1FF]">03 Hand over</p>
            <h3 className={`${pop.className} mt-3 text-2xl font-extralight tracking-[-0.03em]`}>Steps aside gracefully</h3>
            <div className="mt-7 rounded-[10px] border border-white/15 bg-black/25 p-5">
              <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><UserCheck size={20} aria-hidden="true" /></span><div className="leading-tight"><p className="font-medium">Passing you to the team</p><p className="text-sm text-white/65">They can see everything you said</p></div></div>
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {["Full conversation attached", "Summary written for the agent", "Marked priority if the customer is upset"].map((t) => <li key={t} className="flex items-center gap-2"><Check size={14} strokeWidth={3} className="text-[#6EA1FF]" aria-hidden="true" />{t}</li>)}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CHANNELS ------------------------------ */

const channels = ["Website chat", "WhatsApp Business", "Instagram messages", "Facebook Messenger", "Telegram", "Slack and Teams", "Email"];

function Channels() {
  const stepsOrder = [["Packed", true], ["Shipped", true], ["Out for delivery", true], ["Delivered", false]] as const;
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Channels">
      <div className={`${wrap} grid items-center gap-16 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Lines className="t2" lines={[<>One assistant,</>, <><b className="font-bold">every</b> <Acc dark={false}>channel</Acc></>]} />
          <p className="rv mt-6 max-w-lg font-light leading-relaxed text-[#3B4A63]">Meet customers where they already are. The same knowledge and the same rules follow them from your website to their phone, with rich replies, buttons and cards where the channel allows.</p>
          <ul className="rv mt-8 flex flex-wrap gap-3" style={{ transitionDelay: "120ms" }}>
            {channels.map((c) => <li key={c} className="rounded-full border border-[#CBD8EE] bg-white px-5 py-2.5 text-sm text-[#0B1F3B]">{c}</li>)}
          </ul>
          <ul className="rv mt-10 space-y-4" style={{ transitionDelay: "200ms" }}>
            {[[Clock, "Always on", "Replies at any hour, in the customer's language."], [Users, "Your team stays in charge", "Take over any conversation with one click."], [BarChart3, "Learns what people ask", "Reports show gaps in your content and your service."]].map(([I, t, d]) => {
              const Icon = I as LucideIcon;
              return <li key={t as string} className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-[#E3ECFB] text-[#0047AB]"><Icon size={20} aria-hidden="true" /></span><span><span className={`${pop.className} block font-semibold`}>{t as string}</span><span className="text-[#3B4A63]">{d as string}</span></span></li>;
            })}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div aria-hidden="true" className="relative mx-auto w-[310px]">
            <div className="absolute -inset-10 -z-10 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(47,123,255,.35), transparent)" }} />
            <div className="mk-float-slow overflow-hidden rounded-[40px] border-[8px] border-[#0B1F3B] bg-white shadow-[0_50px_100px_rgba(11,31,59,.35)]">
              <div className="flex items-center gap-3 bg-[#0B1F3B] px-5 pb-4 pt-8 text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0047AB]"><Bot size={18} /></span><div className="leading-tight"><p className="text-sm font-medium">Devntom Assistant</p><p className="text-[11px] text-[#9DB8E8]">Online</p></div></div>
              <div className="space-y-3 bg-[#F4F8FE] px-4 py-5" style={{ minHeight: 430 }}>
                <p className="wf-pop ml-auto w-fit rounded-[14px_14px_4px_14px] bg-[#0047AB] px-3.5 py-2 text-[13px] text-white" style={pp(0)}>Where is my order?</p>
                <p className="wf-pop w-fit rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2 text-[13px] shadow-sm" style={pp(2)}>Found it. Order #10482 is on its way.</p>
                <div className="wf-pop rounded-[12px] border border-[#DCE5F5] bg-white p-4 shadow-sm" style={pp(4)}>
                  <div className="flex items-center justify-between text-[12px]"><span className="font-semibold">Order #10482</span><span className="rounded-full bg-[#E3ECFB] px-2.5 py-0.5 text-[11px] font-medium text-[#0047AB]">Today</span></div>
                  <ol className="mt-4 space-y-3">
                    {stepsOrder.map(([s, done], i) => (
                      <li key={s} className="flex items-center gap-3 text-[12px]">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${done ? "bg-[#0047AB] text-white" : "border border-[#CBD8EE]"}`}>{done && <Check size={11} strokeWidth={3} />}</span>
                        <span className={i === 2 ? "font-semibold" : done ? "" : "text-[#5B6B84]"}>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="wf-pop flex flex-wrap gap-2" style={pp(6)}>
                  {["Change address", "Talk to a person"].map((b) => <span key={b} className="rounded-full border border-[#0047AB] px-3.5 py-1.5 text-[12px] font-medium text-[#0047AB]">{b}</span>)}
                </div>
              </div>
            </div>
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
@media (prefers-reduced-motion:reduce){.mk-float,.mk-float-slow,.mq,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function AiAutomationChatbotsPage() {
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

      <Hero />
      <Workflows />
      <Knowledge />
      <Channels />

      {/* 2. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2" lines={[<>Built to <b className="font-bold">work</b>,</>, <>safe to <Acc dark={false}>trust</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Every assistant and automation we build is useful on day one and safe to leave running.</p>
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
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we build AI systems">
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
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your AI project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s automate</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's automate", <><Acc>your</Acc> <b className="font-bold">work.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us what eats your team's time or what customers keep asking. We reply with a plan, a timeline and a quote.</p>
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
              <select name="service" required defaultValue="AI Automation" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="What should be automated, tools you use, timeline" /></label>
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