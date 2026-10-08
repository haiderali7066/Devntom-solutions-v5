"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Acc, Lines, pop, ring, services, wrap } from "./shared";

const field = "mt-2 w-full rounded-[3px] border border-[#CFE2FF] bg-[#F5F9FF] px-4 py-3 text-[#1F2937] placeholder:text-[#94A3B8] focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/30";
const label = "text-sm font-medium text-[#0B1F3B]";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  return (
    <section id="contact-form" data-nocursor className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-labelledby="cta" style={{ background: "linear-gradient(120deg,#0B1F3B 0%,#0A3F9E 55%,#0A63E0 100%)" }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
      <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}><span data-speed="-0.12" className="block">Let's talk</span></div>
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <Lines className="t1" lines={["Let's build", <><Acc>what's</Acc> <b className="font-bold">next.</b></>]} />
          <p id="cta" className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#CFE2FF]">Tell us what you want to build. We reply with a plan, a timeline and a quote.</p>
          <ul className="rv mt-8 space-y-2 font-medium">
            <li><a href="mailto:info@devntomsolutions.com" className="underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD]">info@devntomsolutions.com</a></li>
            <li><a href="https://wa.me/923256036838" className="underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD]">WhatsApp (Pakistan) +92 325 6036838</a></li>
              <li><a href="https://wa.me/966583408034" className="underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD]">WhatsApp (Saudi Arabia) +966 583 408034</a></li>
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
              {services.map(([, n]) => <option key={n}>{n}</option>)}
              <option>Something else</option>
            </select>
          </label>
          <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, features, timeline" /></label>
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button disabled={state === "sending"} className={`group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 font-medium text-white transition hover:bg-[#0052CC] disabled:opacity-60 ${ring} focus-visible:ring-offset-white`}>
            {state === "sending" ? "Sending…" : "Send message"} <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <p role="status" className={`mt-4 text-sm ${state === "error" ? "text-[#EF4444]" : "text-[#047857]"}`}>
            {state === "sent" && "Thank you. We received your message and will reply soon."}
            {state === "error" && "Something went wrong. Please email info@devntomsolutions.com instead."}
          </p>
        </form>
      </div>
    </section>
  );
}
