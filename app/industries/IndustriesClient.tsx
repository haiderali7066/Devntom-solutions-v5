"use client";

/**
 * /industries
 *
 * Client component for the industries page. Rendered by page.tsx (the server page that holds the metadata
 * and JSON-LD). No Nav, no Footer (both live in app/layout.tsx).
 *
 * Sections: hero with a slowly turning ring of industry icons (CSS transforms only), an industry explorer
 * (pick an industry to see what we build, the usual challenges and how we help), reusable building blocks,
 * how we approach a new industry, and a closing call to action.
 *
 * The copy describes the kinds of solutions we build for each industry. It makes no claims about specific
 * clients, certifications or results. Edit the `industries` array to change anything.
 *
 * Palette: cobalt, navy, white, black.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  ArrowRight, ArrowUpRight, Briefcase, Building2, Calendar, Check, CreditCard, GraduationCap, Landmark, LayoutDashboard,
  Plug, ShoppingBag, Stethoscope, Truck, UserCircle, UtensilsCrossed, Workflow,
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

type Industry = {
  name: string;
  icon: LucideIcon;
  tagline: string;
  intro: string;
  builds: string[];
  challenges: [string, string][]; // [challenge, how we help]
  services: [string, string][]; // [label, href]
};

const industries: Industry[] = [
  {
    name: "Healthcare",
    icon: Stethoscope,
    tagline: "Easier for patients to find you and book.",
    intro: "Clinics, practices and health businesses need clear information, simple booking and careful handling of personal data.",
    builds: ["Clinic and practice websites", "Online appointment booking", "Patient reminders and follow-up", "Secure enquiry forms"],
    challenges: [["Missed appointments", "Automated reminders by message or email"], ["Phones always busy", "A chatbot that answers common questions and books slots"], ["Trust at first glance", "A clear, fast, accessible website"]],
    services: [["Website Development", "/services/website-development"], ["AI Automation and Chatbots", "/services/ai-automation-chatbots"]],
  },
  {
    name: "Retail and E-commerce",
    icon: ShoppingBag,
    tagline: "Stores that load fast and sell more.",
    intro: "Online and multi-channel retailers need fast storefronts, smooth checkout and marketing that brings buyers back.",
    builds: ["Custom and platform-based online stores", "Checkout and payment setup", "Stock and order tools", "Email and ad campaigns"],
    challenges: [["Slow pages and abandoned carts", "Performance work and a simpler checkout"], ["Paying too much per sale", "Tracked ads and email flows that bring customers back"], ["Support questions about orders", "Order-status chatbot with handover to your team"]],
    services: [["Website Development", "/services/website-development"], ["Digital Marketing", "/services/digital-marketing"]],
  },
  {
    name: "Real Estate",
    icon: Building2,
    tagline: "Listings that attract and leads that get answered.",
    intro: "Agencies and developers need property showcases that look the part and a fast way to respond to every enquiry.",
    builds: ["Property listing sites with search and filters", "Lead capture and instant replies", "Viewing booking", "Agent and CRM tools"],
    challenges: [["Leads going cold", "Automatic first reply and routing to the right agent"], ["Listings that are hard to browse", "Fast search with filters and clear galleries"], ["Scattered data", "A simple CRM that keeps enquiries and viewings together"]],
    services: [["Custom Software", "/services/custom-software-development"], ["Digital Marketing", "/services/digital-marketing"]],
  },
  {
    name: "Education",
    icon: GraduationCap,
    tagline: "Clear journeys for students and parents.",
    intro: "Schools, academies and training providers need easy enrolment, clear course information and tools that save staff time.",
    builds: ["School and academy websites", "Course catalogues and enrolment forms", "Student and parent portals", "Admissions chatbots"],
    challenges: [["Repeated admissions questions", "A chatbot trained on your own prospectus"], ["Paper forms", "Online enrolment that feeds your records"], ["Reaching new students", "Search and social campaigns for each intake"]],
    services: [["Website Development", "/services/website-development"], ["AI Automation and Chatbots", "/services/ai-automation-chatbots"]],
  },
  {
    name: "Finance and Fintech",
    icon: Landmark,
    tagline: "Clear, careful and built for trust.",
    intro: "Financial businesses need interfaces people can trust, secure flows and tools that handle repetitive checks.",
    builds: ["Fintech web apps and dashboards", "Secure customer portals", "Document and invoice processing", "Reporting and analytics"],
    challenges: [["Manual document handling", "Automated reading and checking, with exceptions flagged"], ["Complex products to explain", "Clear design and guided flows"], ["Reporting by hand", "Dashboards that update themselves"]],
    services: [["Custom Software", "/services/custom-software-development"], ["AI Automation and Chatbots", "/services/ai-automation-chatbots"]],
  },
  {
    name: "Hospitality and Travel",
    icon: UtensilsCrossed,
    tagline: "More direct bookings, fewer missed messages.",
    intro: "Hotels, restaurants and travel businesses need attractive sites, easy booking and quick replies in several languages.",
    builds: ["Hotel and restaurant websites", "Direct booking and reservations", "Multilingual chat assistants", "Local search and review campaigns"],
    challenges: [["Reliance on booking platforms", "A direct booking experience and local SEO"], ["Messages at all hours", "A multilingual assistant on website and WhatsApp"], ["Seasonal demand", "Campaigns planned around your peaks"]],
    services: [["Website Development", "/services/website-development"], ["Digital Marketing", "/services/digital-marketing"]],
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    tagline: "Win clients with credibility and clarity.",
    intro: "Law, accounting, consulting and agency firms win on trust. Their sites and processes need to show expertise and respond fast.",
    builds: ["Credible company websites", "Enquiry and consultation booking", "Client portals", "Content and thought-leadership marketing"],
    challenges: [["Hard to stand out", "Clear positioning, case studies and useful content"], ["Slow enquiry handling", "Instant acknowledgement and routing"], ["Admin overload", "Workflows for onboarding, documents and reminders"]],
    services: [["Website Development", "/services/website-development"], ["Digital Marketing", "/services/digital-marketing"]],
  },
  {
    name: "Logistics and Operations",
    icon: Truck,
    tagline: "Fewer spreadsheets, more visibility.",
    intro: "Logistics, distribution and operations teams need tools that track work, share status and cut manual entry.",
    builds: ["Tracking and status portals", "Internal dashboards and admin tools", "Quote and order systems", "Workflow automation between systems"],
    challenges: [["Information in many places", "One system that connects your tools"], ["Customers asking for updates", "Self-service status pages and chat"], ["Manual data entry", "Automations that move data for you"]],
    services: [["Custom Software", "/services/custom-software-development"], ["AI Automation and Chatbots", "/services/ai-automation-chatbots"]],
  },
];

const blocks: [LucideIcon, string, string][] = [
  [Calendar, "Booking and scheduling", "Appointments, reservations and reminders that sync with your calendar."],
  [CreditCard, "Payments and checkout", "Secure online payments, invoices and subscriptions."],
  [UserCircle, "Customer portals", "Logins where customers see orders, documents and history."],
  [LayoutDashboard, "Dashboards and reports", "Your numbers in one place, updated automatically."],
  [Workflow, "Workflow automation", "Routine tasks handled in the background, with a human in the loop."],
  [Plug, "Integrations", "CRM, accounting, email, messaging and the tools you already use."],
];

const approach = [
  ["We learn your language", "A short discovery call to understand your customers, your terms and what matters in your industry."],
  ["We ask about the rules", "Privacy, payments and accessibility requirements differ by sector and country. We raise them early and design with them in mind."],
  ["We reuse what already works", "Proven building blocks get you live sooner, then we tailor the details to your business."],
] as const;

/* ------------------------------ SMALL HELPERS ------------------------------ */

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

/* ------------------------------ HERO ------------------------------ */

function Ring() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute -inset-8 -z-10 rounded-full opacity-70 blur-2xl" style={{ background: `radial-gradient(closest-side, ${COBALT}88, transparent)` }} />
      <div className="absolute inset-[11%] rounded-full border border-dashed border-white/20" />
      <div className="absolute inset-[30%] rounded-full border border-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-[#0B1F3B] text-center shadow-[0_0_80px_rgba(47,123,255,.5)]">
          <span className={`${pop.className} text-sm font-semibold leading-tight tracking-[-0.01em]`}>Your<br />industry</span>
        </div>
      </div>
      <div className="orbit absolute inset-0">
        {industries.map((x, i) => {
          const a = (i / industries.length) * Math.PI * 2 - Math.PI / 2;
          const Icon = x.icon;
          return (
            <div key={x.name} className="absolute" style={{ left: `${50 + Math.cos(a) * 41}%`, top: `${50 + Math.sin(a) * 41}%` }}>
              <div className="orbit-i -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#0B1F3B] text-[#6EA1FF] shadow-[0_10px_40px_rgba(2,5,11,.5)]"><Icon size={22} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Industries" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[88svh] items-center gap-14 pb-24 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-7">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            Industries
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.7rem,6.4vw,6.2rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Built for the", <><b className="font-bold">way you</b> <Acc>work.</Acc></>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            Every industry has its own customers, rules and habits. We design websites, software, marketing and automation around yours.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <a href="#explore" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Explore industries <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <Link href="/contact" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>Talk to us</Link>
          </div>
        </div>
        <div className="lg:col-span-5"><Ring /></div>
      </div>
    </section>
  );
}

/* ------------------------------ EXPLORER ------------------------------ */

function Explorer() {
  const [sel, setSel] = React.useState(0);
  const x = industries[sel];
  const Icon = x.icon;
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = industries.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setSel(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="explore" className="bg-white py-24 md:py-36" aria-label="Industries we serve">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Find your</>, <><b className="font-bold">industry</b>, <Acc dark={false}>see the fit</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Pick an industry to see what we usually build, the problems we solve and where to start.</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Industries" aria-orientation="vertical" className="lg:col-span-5">
            {industries.map((it, i) => {
              const I = it.icon;
              return (
                <button key={it.name} role="tab" id={`ind-tab-${i}`} aria-selected={sel === i} aria-controls="ind-panel" tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)} onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setSel(i)} onKeyDown={(e) => onKey(e, i)}
                  className={`group flex w-full items-center gap-5 border-t border-[#CBD8EE] py-5 pr-4 text-left transition last:border-b ${ring}`}>
                  <span className="w-6 text-xs text-[#5B6B84]">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] transition-colors ${sel === i ? "bg-[#0047AB] text-white" : "bg-[#E3ECFB] text-[#0047AB]"}`}><I size={20} aria-hidden="true" /></span>
                  <span className={`${pop.className} flex-1 text-2xl tracking-[-0.03em] transition-colors ${sel === i ? "font-semibold text-[#0047AB]" : "font-extralight text-[#0B1F3B] group-hover:text-[#0047AB]"}`}>{it.name}</span>
                  <ArrowRight size={18} className={`text-[#0047AB] transition ${sel === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${sel}`} className="lg:col-span-7">
            <div key={sel} className="mk-swap overflow-hidden rounded-[10px] text-white shadow-[0_40px_100px_rgba(11,31,59,.3)] lg:sticky lg:top-28" style={{ background: `linear-gradient(150deg, ${NAVY} 0%, #0A2A57 60%, ${COBALT} 130%)` }}>
              <div className="p-8 md:p-12">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2F7BFF]/20 text-[#9DC0FF]"><Icon size={30} aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-6 text-3xl font-semibold leading-[1.1] tracking-[-0.035em] md:text-4xl`}>{x.tagline}</h3>
                <p className="mt-4 max-w-xl font-light leading-relaxed text-[#DCE7FB]">{x.intro}</p>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#6EA1FF]">What we build</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {x.builds.map((b) => <li key={b} className="flex items-start gap-3 text-[#E6EEFF]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{b}</li>)}
                </ul>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#6EA1FF]">Common challenges, and how we help</p>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {x.challenges.map(([c, h]) => (
                    <li key={c} className="grid gap-1 py-4 sm:grid-cols-2 sm:gap-6"><span className="font-medium">{c}</span><span className="font-light text-[#BFD4FF]">{h}</span></li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
                  <ul className="flex flex-wrap gap-2">
                    {x.services.map(([l, h]) => <li key={l}><Link href={h} className={`rounded-full border border-white/30 px-4 py-2 text-sm transition hover:border-white hover:bg-white/10 ${ringDark}`}>{l}</Link></li>)}
                  </ul>
                  <Link href={`/contact?industry=${encodeURIComponent(x.name)}`} className={`group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
                    Talk about {x.name} <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ BUILDING BLOCKS ------------------------------ */

function Blocks() {
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Building blocks">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Different industries,</>, <><b className="font-bold">shared</b> <Acc dark={false}>foundations</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Most businesses need a few of the same things. We start from proven building blocks and shape them to fit you.</p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([I, t, d], i) => (
            <li key={t} className="rv group rounded-[4px] border border-[#CBD8EE] bg-white p-8 transition-colors duration-300 hover:border-[#0047AB]" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><I size={24} aria-hidden="true" /></span>
              <h3 className={`${pop.className} mt-8 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
              <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ APPROACH ------------------------------ */

function Approach() {
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-32" aria-label="How we approach a new industry" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%, rgba(0,71,171,.5), transparent 50%)" }} />
      <div className={`${wrap} relative`}>
        <div className="mx-auto max-w-2xl text-center">
          <Lines className="t2" lines={[<>New to us? <Acc>New to your sector?</Acc></>]} />
          <p className="rv mt-5 font-light text-white/70">Here is how we make sure the work fits your industry from day one.</p>
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/15 md:grid-cols-3">
          {approach.map(([t, d], i) => (
            <li key={t} className="rv bg-[#0B1F3B] p-8 md:p-10" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="text-sm text-[#6EA1FF]">0{i + 1}</span>
              <h3 className={`${pop.className} mt-6 text-2xl font-extralight tracking-[-0.03em]`}>{t}</h3>
              <p className="mt-3 font-light leading-relaxed text-white/70">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ CLOSING CTA ------------------------------ */

function Closing() {
  return (
    <section className="relative isolate overflow-hidden py-28 text-white md:py-36" aria-label="Your industry" style={{ background: `linear-gradient(120deg, ${BLACK} 0%, ${NAVY} 45%, ${COBALT} 100%)` }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
      <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Your sector</div>
      <div className={`${wrap} text-center`}>
        <Lines className="t1" lines={["Don't see your", <><b className="font-bold">industry</b><Acc>?</Acc></>]} />
        <p className="rv mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">The same approach works across many sectors. Tell us about yours and we will tell you honestly how we can help.</p>
        <div className="rv mt-10 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: "150ms" }}>
          <Link href="/contact" className={`group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
            Contact us <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/projects" className={`inline-flex items-center rounded-full border border-white/30 px-9 py-4 text-sm font-medium transition hover:border-white ${ringDark}`}>See our work</Link>
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
@keyframes mq{to{transform:translate3d(-50%,0,0)}}
.mq-track{animation:mq 45s linear infinite;will-change:transform;backface-visibility:hidden}
.mq-wrap{-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.mq-wrap:hover .mq-track{animation-play-state:paused}
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
@keyframes ring{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2.2);opacity:0}}
.pulse-ring{animation:ring 2.6s ease-out infinite}
@keyframes mkswap{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.mk-swap{animation:mkswap .55s cubic-bezier(.16,1,.3,1) both}
@keyframes orbit{to{transform:rotate(360deg)}}
.orbit{animation:orbit 70s linear infinite;will-change:transform}
.orbit-i{animation:orbit 70s linear infinite reverse;will-change:transform}
@media (prefers-reduced-motion:reduce){.orbit,.orbit-i,.mk-swap{animation:none!important}.pulse-ring{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq-track,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function IndustriesClient() {
  const main = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = main.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={main} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#0B1F3B]`}>
      <style>{PAGE_CSS}</style>
      <Hero />
      <Explorer />
      <Blocks />
      <Approach />
      <Closing />
    </main>
  );
}
