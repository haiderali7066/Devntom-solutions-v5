"use client";

/**
 * /contact
 *
 * Client component for the page. Rendered by page.tsx (the server page that holds the metadata and
 * JSON-LD). No Nav, no Footer (both live in app/layout.tsx).
 *
 * Sections: hero with direct email and WhatsApp tiles and live local times, the project form (service
 * chips, budget, timeline, inline validation, success state) beside what happens next, an offices
 * section with live clocks, and a short FAQ. The form POSTs to /api/contact with
 * { name, email, service, message, company } (company is the honeypot). Phone, budget and timeline
 * are added to the end of the message so the existing endpoint needs no changes.
 *
 * Palette: cobalt, navy, white, black.
 */

import * as React from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, MessageCircle, Moon, Plus, Send, Sun } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB";
const NAVY = "#0B1F3B";
const BLACK = "#02050B";

/* ------------------------------ CONTENT ------------------------------ */

const EMAIL = "info@devntomsolutions.com";
const WHATSAPP_URL = "https://wa.me/923256036838";
const WHATSAPP_LABEL = "+92 325 6036838";

const offices = [
  { city: "Lahore", country: "Pakistan", tz: "Asia/Karachi", abbr: "PKT" },
  { city: "Riyadh", country: "Saudi Arabia", tz: "Asia/Riyadh", abbr: "AST" },
  { city: "London", country: "United Kingdom", tz: "Europe/London", abbr: "UK" },
] as const;

const serviceOptions = ["Website Development", "Digital Marketing", "AI Automation and Chatbots", "Custom Software", "Mobile Apps", "UI/UX Design", "Something else"];
const budgets = ["Not sure yet", "Under $1,000", "$1,000 to $5,000", "$5,000 to $15,000", "$15,000 or more"];
const timelines = ["As soon as possible", "Within a month", "In 1 to 3 months", "Just exploring"];

const next = [
  ["You send the details", "Tell us what you want to achieve. A few lines is enough, and you can attach links in the message."],
  ["We read and reply by email", "We review your message, ask anything that is unclear and suggest the best way forward."],
  ["A plan and a quote", "After a short call if it helps, you receive a clear scope, timeline and price with no pressure to accept."],
] as const;

const faqs = [
  ["How soon will you reply?", "We read every message and reply by email as soon as we can. If it is urgent, WhatsApp is the fastest way to reach us."],
  ["Do I need a detailed brief?", "No. A few lines about your business and what you want to achieve is enough. We ask the right questions after that."],
  ["Is the first conversation free?", "Yes. Talking through your idea and getting a rough direction costs nothing."],
  ["Can we talk on a call?", "Of course. Mention it in your message with a time that suits you and your time zone, and we will arrange it."],
  ["Do you work with clients outside Pakistan?", "Yes. We have people in Lahore, Riyadh and London and work with clients around the world."],
] as const;

/* ------------------------------ SMALL HELPERS ------------------------------ */

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

/** Current time, ticking every second. Null until mounted so server and client markup match. */
function useNow() {
  const [now, setNow] = React.useState<Date | null>(null);
  React.useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function parts(now: Date | null, tz: string) {
  if (!now) return { hh: "--", mm: "--", ss: "--", hour: -1 };
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(now);
  const g = (t: string) => f.find((p) => p.type === t)?.value ?? "--";
  return { hh: g("hour") === "24" ? "00" : g("hour"), mm: g("minute"), ss: g("second"), hour: Number(g("hour")) % 24 };
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  const now = useNow();
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="Contact us" style={{ background: `radial-gradient(70% 60% at 78% 30%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 6% 95%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[84svh] items-center gap-14 pb-44 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-7">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            Contact
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.8rem,7vw,6.6rem)] leading-[0.95] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["Let's talk", <>about your</>, <><b className="font-bold">project</b><Acc>.</Acc></>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            Websites, marketing, software or automation. Tell us what you have in mind and we will reply with a clear plan, a timeline and a quote.
          </p>
          <div className="rv mt-9" style={{ transitionDelay: "250ms" }}>
            <a href="#contact-form" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Send a message <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="grid gap-4 lg:col-span-5">
          <a href={`mailto:${EMAIL}`} className={`rv group flex items-center gap-5 rounded-[14px] border border-white/20 bg-white/[0.06] p-6 backdrop-blur transition hover:border-white/50 hover:bg-white/10 ${ringDark}`} style={{ transitionDelay: "200ms" }}>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0047AB] text-white"><Mail size={24} aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm text-[#9DB8E8]">Email us</span><span className={`${pop.className} block break-all text-xl font-semibold tracking-[-0.02em]`}>{EMAIL}</span></span>
            <ArrowUpRight size={24} className="shrink-0 text-[#6EA1FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a href={WHATSAPP_URL} className={`rv group flex items-center gap-5 rounded-[14px] border border-white/20 bg-white/[0.06] p-6 backdrop-blur transition hover:border-white/50 hover:bg-white/10 ${ringDark}`} style={{ transitionDelay: "300ms" }}>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0047AB] text-white"><MessageCircle size={24} aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm text-[#9DB8E8]">WhatsApp, the fastest way</span><span className={`${pop.className} block text-xl font-semibold tracking-[-0.02em]`}>{WHATSAPP_LABEL}</span></span>
            <ArrowUpRight size={24} className="shrink-0 text-[#6EA1FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <ul className={`${wrap} grid grid-cols-3 divide-x divide-white/10 py-4`} aria-label="Local time in our offices">
          {offices.map((o) => {
            const t = parts(now, o.tz);
            return (
              <li key={o.city} className="px-3 first:pl-0 md:px-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{o.city}</p>
                <p className={`${pop.className} mt-1 text-xl font-light tabular-nums tracking-[-0.02em] md:text-2xl`} suppressHydrationWarning>{t.hh}:{t.mm}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ FORM ------------------------------ */

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function ContactForm() {
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const [service, setService] = React.useState(serviceOptions[0]);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (d.company) return; // honeypot
    const er: Errors = {};
    if (!d.name?.trim()) er.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email ?? "")) er.email = "Please enter a valid email address.";
    if ((d.message ?? "").trim().length < 10) er.message = "Please add a few words about your project.";
    setErrors(er);
    if (Object.keys(er).length) {
      (form.querySelector(`[name="${Object.keys(er)[0]}"]`) as HTMLElement | null)?.focus();
      return;
    }
    const extra = [d.phone && `Phone: ${d.phone}`, d.budget && `Budget: ${d.budget}`, d.timeline && `Timeline: ${d.timeline}`].filter(Boolean).join("\n");
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: d.name.trim(), email: d.email.trim(), service, message: extra ? `${d.message.trim()}\n\n${extra}` : d.message.trim(), company: d.company ?? "" }),
      });
      if (!r.ok) throw new Error();
      setState("sent");
      form.reset();
      setService(serviceOptions[0]);
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div id="contact-form" role="status" className="rounded-[10px] border border-[#CBD8EE] bg-white p-10 text-center shadow-[0_30px_80px_rgba(11,31,59,.12)] md:p-14">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0047AB] text-white"><Check size={30} strokeWidth={3} aria-hidden="true" /></span>
        <h3 className={`${pop.className} mt-6 text-3xl font-extralight tracking-[-0.03em]`}>Thank you. <b className="font-bold">Message received.</b></h3>
        <p className="mx-auto mt-4 max-w-md font-light leading-relaxed text-[#3B4A63]">We will read it and reply by email. For anything urgent, message us on WhatsApp.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP_URL} className={`rounded-full bg-[#0047AB] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#0B1F3B] ${ring}`}>WhatsApp us</a>
          <button onClick={() => setState("idle")} className={`rounded-full border border-[#CBD8EE] px-7 py-3.5 text-sm font-medium transition hover:border-[#0047AB] hover:text-[#0047AB] ${ring}`}>Send another message</button>
        </div>
      </div>
    );
  }

  const inv = (k: keyof Errors) => (errors[k] ? "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]/25" : "");
  return (
    <form id="contact-form" ref={formRef} onSubmit={submit} noValidate className="rounded-[10px] border border-[#CBD8EE] bg-white p-7 shadow-[0_30px_80px_rgba(11,31,59,.12)] md:p-10" aria-label="Contact form">
      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div role="radiogroup" className="mt-3 flex flex-wrap gap-2.5">
          {serviceOptions.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="service" value={s} checked={service === s} onChange={() => setService(s)} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-[#CBD8EE] px-4 py-2.5 text-sm text-[#0B1F3B] transition peer-checked:border-[#0047AB] peer-checked:bg-[#0047AB] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F7BFF] peer-focus-visible:ring-offset-2 hover:border-[#0047AB]">{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Full name</label>
          <input id="c-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-e" : undefined} className={`${field} ${inv("name")}`} placeholder="Your name" />
          {errors.name && <p id="c-name-e" className="mt-1.5 text-sm text-[#B91C1C]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-e" : undefined} className={`${field} ${inv("email")}`} placeholder="you@company.com" />
          {errors.email && <p id="c-email-e" className="mt-1.5 text-sm text-[#B91C1C]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="c-phone" className={label}>Phone or WhatsApp <span className="font-normal text-[#5B6B84]">(optional)</span></label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="+92 300 0000000" />
        </div>
        <div>
          <label htmlFor="c-budget" className={label}>Budget <span className="font-normal text-[#5B6B84]">(optional)</span></label>
          <select id="c-budget" name="budget" defaultValue="" className={field}>
            <option value="">Choose a range</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-timeline" className={label}>When do you want to start? <span className="font-normal text-[#5B6B84]">(optional)</span></label>
        <select id="c-timeline" name="timeline" defaultValue="" className={field}>
          <option value="">Choose a timeline</option>
          {timelines.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className={label}>Tell us about your project</label>
        <textarea id="c-message" name="message" required rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-e" : undefined} className={`${field} ${inv("message")}`} placeholder="What do you want to achieve? Add links, goals and anything that helps." />
        {errors.message && <p id="c-message-e" className="mt-1.5 text-sm text-[#B91C1C]">{errors.message}</p>}
      </div>

      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button disabled={state === "sending"} className={`group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 font-medium text-white transition hover:bg-[#0B1F3B] disabled:opacity-60 ${ring}`}>
        {state === "sending" ? "Sending…" : "Send message"} <Send size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
      </button>
      <p role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-sm text-[#B91C1C]">
        {state === "error" && <>Something went wrong. Please email <a href={`mailto:${EMAIL}`} className="font-medium underline underline-offset-4">{EMAIL}</a> instead.</>}
      </p>
      <p className="text-xs text-[#5B6B84]">We only use your details to reply to your enquiry.</p>
    </form>
  );
}

function FormSection() {
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Project enquiry">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Lines className="t2" lines={[<>Start with</>, <>a <b className="font-bold">message</b></>]} />
            <p className="rv mt-6 max-w-md font-light leading-relaxed text-[#3B4A63]">No forms to fight with and no sales pitch. Just tell us what you need and we will take it from there.</p>
            <ol className="mt-12 space-y-8">
              {next.map(([t, d], i) => (
                <li key={t} className="rv flex gap-5" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className={`${pop.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0047AB] text-sm font-semibold text-[#0047AB]`}>{i + 1}</span>
                  <span><span className={`${pop.className} block text-lg font-semibold tracking-[-0.01em]`}>{t}</span><span className="mt-1 block font-light leading-relaxed text-[#3B4A63]">{d}</span></span>
                </li>
              ))}
            </ol>
            <p className="rv mt-12 text-sm text-[#3B4A63]">Prefer to write directly? <a href={`mailto:${EMAIL}`} className={`rounded-[3px] font-medium text-[#0047AB] underline underline-offset-4 ${ring}`}>{EMAIL}</a></p>
          </div>
        </div>
        <div className="rv lg:col-span-7" style={{ transitionDelay: "120ms" }}><ContactForm /></div>
      </div>
    </section>
  );
}

/* ------------------------------ OFFICES ------------------------------ */

function Offices() {
  const now = useNow();
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-32" aria-label="Our offices" style={{ background: `linear-gradient(180deg, ${NAVY} 0%, ${BLACK} 100%)` }}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 85% 10%, rgba(0,71,171,.5), transparent 45%)" }} />
      <div className={`${wrap} relative`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Three cities,</>, <><b className="font-bold">one</b> <Acc>team</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-white/70">We work across time zones, so someone is usually online when you write. The clocks below show the local time in each city.</p>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {offices.map((o, i) => {
            const t = parts(now, o.tz);
            const day = t.hour >= 6 && t.hour < 18;
            return (
              <li key={o.city} className="rv rounded-[8px] border border-white/15 bg-white/[0.05] p-8" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="flex items-center justify-between text-sm text-[#9DB8E8]">
                  <span className="flex items-center gap-2"><MapPin size={15} aria-hidden="true" />{o.country}</span>
                  <span className="flex items-center gap-2">{t.hour < 0 ? null : day ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}{o.abbr}</span>
                </div>
                <h3 className={`${pop.className} mt-8 text-3xl font-extralight tracking-[-0.03em]`}>{o.city}</h3>
                <p className={`${pop.className} mt-3 text-5xl font-semibold tabular-nums tracking-[-0.04em]`} suppressHydrationWarning>
                  {t.hh}<span className="clk-colon text-[#2F7BFF]">:</span>{t.mm}
                </p>
                <p className="mt-2 text-xs text-white/55" suppressHydrationWarning>{t.hour < 0 ? "Local time" : `Local time, ${day ? "daytime" : "evening and night"}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ FAQ ------------------------------ */

function Faq() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Frequently asked questions">
      <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Lines className="t2" lines={[<>Before you</>, <><b className="font-bold">write</b></>]} />
            <p className="rv mt-6 max-w-xs font-light leading-relaxed text-[#3B4A63]">Short answers to what people ask us first.</p>
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
@keyframes clk{50%{opacity:.25}}
.clk-colon{animation:clk 1s steps(1) infinite}
@media (prefers-reduced-motion:reduce){.clk-colon{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function ContactClient() {
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
      <FormSection />
      <Offices />
      <Faq />
    </main>
  );
}
