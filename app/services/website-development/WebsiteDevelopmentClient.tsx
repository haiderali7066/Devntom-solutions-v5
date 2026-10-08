"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus, X } from "lucide-react";
import { SiDocker, SiFigma, SiGit, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiRedis, SiShopify, SiStripe, SiTailwindcss, SiTypescript, SiVercel, SiWordpress } from "react-icons/si";

// Layout owns Nav, Footer and Lenis. These two are your existing shared components.
// If your file or export names differ, change only these two lines.
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

import { Acc, Lines, Words, PageFx } from "@/components/motion";
import { img, pop, ring, wrap } from "@/lib/ui";
import { projects, services } from "@/lib/site-data";
import { faqs, features, outcomes, problems, steps, types } from "@/lib/website-service";

const local = `
.fl{animation:fl 7s ease-in-out infinite}
@keyframes fl{50%{transform:translateY(-10px)}}
.mk{transform-origin:bottom;animation:mk 1.6s cubic-bezier(.16,1,.3,1) both,mkp 5s ease-in-out infinite alternate}
@keyframes mk{from{transform:scaleY(0)}}
@keyframes mkp{from{opacity:.55}to{opacity:1}}
.pl{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)}
.in .pl{stroke-dashoffset:0}
.mq2.rev{animation-direction:reverse}
@media (prefers-reduced-motion:reduce){.fl,.mk{animation:none!important}.pl{stroke-dashoffset:0;transition:none}.dot{display:none}}
`;

const stepX = [100, 300, 500, 700, 900, 1100];
const panelBg = ["linear-gradient(160deg,#0B1F3B,#0A3F9E)", "linear-gradient(160deg,#0A2A5C,#0052CC)", "linear-gradient(160deg,#0A3F9E,#007BFF)"];
const markBars = [38, 62, 46, 80, 58, 92, 70, 100, 76, 88];

const stackA = [[SiNextdotjs, "Next.js"], [SiReact, "React"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"], [SiNodedotjs, "Node.js"], [SiVercel, "Vercel"], [SiGit, "Git"], [SiFigma, "Figma"]] as const;
const stackB = [[SiPostgresql, "PostgreSQL"], [SiMongodb, "MongoDB"], [SiRedis, "Redis"], [SiStripe, "Stripe"], [SiShopify, "Shopify"], [SiWordpress, "WordPress"], [SiPython, "Python"], [SiDocker, "Docker"]] as const;

const related = ["/services/ui-ux-design", "/services/seo-optimization", "/services/custom-software-development"]
  .map((h) => services.find((s) => s.href === h)!)
  .filter(Boolean);

// REPLACE: shows the placeholder projects tagged "Website" until real case studies exist.
const siteProjects = projects.filter((p) => p.tags.includes("Website"));

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-medium ${dark ? "text-[#93C5FD]" : "text-[#0052CC]"}`}>
      <span className="h-px w-8 bg-[#007BFF]" />{children}
    </p>
  );
}

function Marquee({ items, reverse = false }: { items: readonly (readonly [React.ElementType, string])[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map(([Icon, name]) => (
        <li key={name} className="mr-4 flex items-center gap-3 rounded-full border border-[#CFE2FF] bg-white px-6 py-3 text-[#0B1F3B]">
          <Icon size={22} aria-hidden="true" className="text-[#0052CC]" />
          <span className={`${pop.className} whitespace-nowrap text-sm font-semibold`}>{name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="mqw overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
      <div className={`mq2 flex w-max ${reverse ? "rev" : ""}`}>{row(false)}{row(true)}</div>
    </div>
  );
}

export default function WebsiteDevelopmentClient() {
  return (
    <PageFx lenis={false}>
      <style>{local}</style>

      {/* 1. HERO */}
      <section className="relative isolate overflow-hidden bg-[#050E1F] pb-24 pt-36 text-white md:pb-32 md:pt-48">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 85% 0%,rgba(0,123,255,.35),transparent 50%)" }} />
        <div aria-hidden="true" className="gf absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-40" />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10" />
        <div className={`${wrap} grid items-center gap-16 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="rv text-sm text-[#93C5FD]">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className={`rounded-[3px] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/services" className={`rounded-[3px] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}>Services</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/70">Website Development</li>
              </ol>
            </nav>
            <div className="rv mt-8"><Eyebrow dark>Website Development</Eyebrow></div>
            <Lines h1 className="t0 mt-5" lines={[<>Websites built to <b className="font-bold">perform</b></>, <>and <Acc>grow</Acc> with you</>]} />
            <p className="rv mt-8 max-w-xl text-lg font-light leading-relaxed text-white/70" style={{ transitionDelay: "200ms" }}>
              Fast, responsive, SEO-friendly websites on Next.js and React, from company sites to e-commerce. Designed and built as part of your wider digital system.
            </p>
            <div className="rv mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "300ms" }}>
              <Link href="/contact" data-magnetic className={`inline-flex items-center gap-2 rounded-[4px] bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-black`}>Get a quote <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/projects" className={`rounded-[4px] border border-white/25 bg-black/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-[#0B1F3B] ${ring} focus-visible:ring-offset-black`}>See our work</Link>
            </div>
          </div>

          {/* Decorative browser mock-up */}
          <div aria-hidden="true" className="rv relative hidden lg:col-span-5 lg:block" style={{ transitionDelay: "250ms" }}>
            <div className="fl overflow-hidden rounded-[4px] border border-white/15 bg-gradient-to-b from-white/[.09] to-white/[.02] shadow-[0_30px_100px_rgba(0,123,255,.3)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="ml-3 h-6 flex-1 rounded-full bg-white/10" />
              </div>
              <div className="p-6">
                <div className="h-3 w-2/5 rounded-full bg-white/25" />
                <div className="mt-4 h-8 w-4/5 rounded-[3px] bg-white/15" />
                <div className="mt-3 h-8 w-3/5 rounded-[3px] bg-white/15" />
                <div className="mt-6 h-9 w-32 rounded-full bg-[#007BFF]" />
                <div className="mt-8 flex h-28 items-end gap-1.5">
                  {markBars.map((h, i) => (
                    <i key={i} className="mk block flex-1 rounded-t-[2px]" style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.08}s, ${i * 0.2}s`, background: "linear-gradient(to top,#2F5BFF,#9DBBFF)" }} />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((n) => <div key={n} className="h-16 rounded-[3px] border border-white/10 bg-white/[.06]" />)}
                </div>
              </div>
            </div>
            <span className="absolute -left-6 top-24 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0B1F3B]/90 px-4 py-2 text-sm backdrop-blur"><Check size={14} className="text-[#10B981]" />SEO ready</span>
            <span className="absolute -right-4 bottom-16 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0B1F3B]/90 px-4 py-2 text-sm backdrop-blur"><Check size={14} className="text-[#10B981]" />Mobile ready</span>
          </div>
        </div>
      </section>

      {/* 2. STATEMENT */}
      <section className="bg-white py-28 md:py-44">
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-3"><Eyebrow>Our approach</Eyebrow></div>
          <Words className="text-[clamp(1.8rem,4.2vw,3.8rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0B1F3B] md:col-span-9" text="A website is the front door of your business. We build it as a system: fast to load, easy to find, simple to manage and ready to grow with you." />
        </div>
      </section>

      {/* 3. PROBLEM AND OUTCOME */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="po">
        <div className={wrap}>
          <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>From a site that <b className="font-bold">exists</b></>, <>to one that <Acc dark={false}>works</Acc></>]} />
          <p id="po" className="rv mt-5 max-w-xl font-light leading-relaxed text-[#475569]">Most websites fail for the same few reasons. Here is what we fix, and what you get instead.</p>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="rv rounded-[4px] border border-[#CFE2FF] bg-white p-8 md:p-10">
              <h3 className={`${pop.className} text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>Where websites fall short</h3>
              <ul className="mt-6 space-y-4">
                {problems.map((t) => (
                  <li key={t} className="flex gap-3 font-light leading-relaxed text-[#475569]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2] text-[#B91C1C]"><X size={12} strokeWidth={3} aria-hidden="true" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv relative overflow-hidden rounded-[4px] p-8 text-white md:p-10" style={{ background: "linear-gradient(160deg,#0B1F3B 30%,#0A3F9E)", transitionDelay: "120ms" }}>
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle,rgba(0,180,255,.35),transparent 65%)" }} />
              <h3 className={`${pop.className} relative text-xl font-semibold tracking-[-0.01em]`}>What you get with Devntom</h3>
              <ul className="relative mt-6 space-y-4">
                {outcomes.map((t) => (
                  <li key={t} className="flex gap-3 font-light leading-relaxed text-[#CFE2FF]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-black"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-labelledby="inc">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>What every website</>, <><b className="font-bold">includes</b></>]} />
            <p id="inc" className="rv max-w-sm font-light leading-relaxed text-[#475569]">Six foundations that ship with every build, whatever the size of the project.</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rv" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <div data-tilt className="gb group h-full rounded-[4px] p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E6F0FF] text-[#0052CC] transition-colors duration-300 group-hover:bg-[#007BFF] group-hover:text-white"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className={`${pop.className} mt-6 flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{title}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                  <p className="mt-3 font-light leading-relaxed text-[#475569]">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. TYPES: expanding panels */}
      <section className="relative overflow-hidden bg-[#050E1F] py-24 text-white md:py-36" aria-labelledby="typ">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%,rgba(0,123,255,.28),transparent 45%)" }} />
        <div className={`${wrap} relative`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2" lines={[<>One craft, <b className="font-bold">three</b> kinds</>, <>of <Acc>website</Acc></>]} />
            <p id="typ" className="rv max-w-sm font-light text-[#CFE2FF]">Tell us what the website has to do. We pick the structure and the stack to match.</p>
          </div>
          <ul className="ofc mt-14 grid gap-3 lg:h-[460px]">
            {types.map((t, i) => (
              <li key={t.title} className="rv min-h-[300px] min-w-0" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[4px] border border-white/15 p-6 md:p-8" style={{ background: panelBg[i] }}>
                  <span aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-6 -right-2 select-none text-[9rem] font-bold leading-none text-white/[.07] transition duration-700 group-hover:-translate-y-3 group-hover:text-white/[.12]`}>{t.ghost}</span>
                  <h3 className={`${pop.className} relative text-3xl font-extralight leading-none tracking-[-0.03em] md:text-4xl`}>{t.title}</h3>
                  <div className="relative">
                    <p className="max-w-sm font-light leading-relaxed text-[#CFE2FF]">{t.text}</p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {t.list.map((l) => <li key={l} className="flex items-center gap-2"><Check size={14} className="text-[#00B4FF]" aria-hidden="true" />{l}</li>)}
                    </ul>
                    <Link href="/contact" className={`mt-6 inline-flex items-center gap-2 font-medium underline decoration-[#3B82F6] underline-offset-4 hover:text-[#93C5FD] ${ring} focus-visible:ring-offset-[#0A3F9E]`}>Start this project <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. PROCESS: flow diagram */}
      <section className="relative overflow-hidden bg-black py-24 text-white md:py-32" aria-labelledby="proc">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>live website</Acc></>]} />
            <p id="proc" className="rv mt-5 font-light text-white/60">The same six-phase process as every Devntom project, with the deliverables that matter for a website.</p>
          </div>
          <div data-r className="mt-16 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[.04] to-transparent px-4 pb-12 pt-14 md:px-10">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-5">
              {steps.map(([t, d, label], i) => (
                <li key={t} className="group relative">
                  <div className="relative h-52 border border-white/15 bg-gradient-to-br from-white/[.09] to-white/[.02] p-4 transition duration-500 group-hover:-translate-y-2 group-hover:border-[#3B82F6]/70" style={{ clipPath: "polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%)" }}>
                    <span aria-hidden="true" className="absolute right-0 top-0 h-7 w-7 bg-gradient-to-br from-white/20 to-transparent" />
                    <span className="relative block h-6 w-6" style={{ "--d": `${0.9 + i * 0.9}s` } as CSSProperties}>
                      <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#8B9CFF]" />
                      <span aria-label="Done" className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#10B981] text-xs font-bold text-black">✓</span>
                    </span>
                    <h3 className="sr-only">{t}</h3>
                    <p className="mt-5 text-[13px] font-light leading-relaxed text-white/60">{d}</p>
                  </div>
                  <span className={`${pop.className} absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[5px] border border-white/20 bg-[#0B1F3B]/90 px-3.5 py-1.5 text-sm font-medium backdrop-blur transition group-hover:border-[#3B82F6] group-hover:bg-[#0052CC]`}>{label}</span>
                </li>
              ))}
            </ol>
            <svg viewBox="0 0 1200 150" className="mx-auto mt-6 hidden h-auto w-full md:block" fill="none" aria-hidden="true">
              {stepX.map((x, i) => {
                const d = `M${x} 0 V45 L${x < 600 ? x + 28 : x - 28} 73 H600`;
                return (
                  <g key={x}>
                    <path d={d} pathLength={1} className="pl" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" style={{ transitionDelay: `${300 + i * 140}ms` }} />
                    <circle className="dot" r="3.5" fill="#00B4FF"><animateMotion dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d + " V150"} /></circle>
                  </g>
                );
              })}
              <path d="M600 73 V150" pathLength={1} className="pl" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" style={{ transitionDelay: "1200ms" }} />
              <circle cx="600" cy="73" r="5" fill="#000" stroke="rgba(255,255,255,.6)" />
            </svg>
            <div className="mt-8 flex justify-center md:-mt-1">
              <Link href="/contact" className={`inline-flex items-center gap-3 rounded-full border border-white/25 bg-gradient-to-b from-white/10 to-white/[.02] py-3 pl-4 pr-8 text-lg shadow-[0_0_40px_rgba(0,123,255,.25)] transition hover:border-[#3B82F6] ${ring} focus-visible:ring-offset-black`}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6366F1] text-xl leading-none" aria-hidden="true">+</span>Your live website
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECHNOLOGY */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="tech">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2 text-[#0B1F3B]" lines={[<>Built with tools</>, <>we <b className="font-bold">trust</b></>]} />
            <p id="tech" className="rv mt-5 font-light text-[#475569]">A modern, maintainable stack. We choose what fits your goals rather than forcing one.</p>
          </div>
        </div>
        <div className="rv mt-14 space-y-4">
          <Marquee items={stackA} />
          <Marquee items={stackB} reverse />
        </div>
      </section>

      {/* 8. RELATED PROJECTS */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="prj">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>Websites we have <b className="font-bold">built</b></>, <>and <Acc dark={false}>launched</Acc></>]} />
            <Link href="/projects" id="prj" data-magnetic className={`rv inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-6 py-3 font-medium text-white transition hover:bg-[#007BFF] ${ring}`}>All projects <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {siteProjects.map((p, i) => (
              <li key={p.title} className="rv" style={{ transitionDelay: `${i * 100}ms` }}>
                <Link href={p.href} data-tilt data-cursor="view" className={`gb group block h-full overflow-hidden rounded-[4px] ${ring}`}>
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#0B1F3B]">
                    <img src={img(p.img, 1000)} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/60 to-transparent" />
                    <ul className="absolute left-4 top-4 flex flex-wrap gap-2">{p.tags.map((g) => <li key={g} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0052CC]">{g}</li>)}</ul>
                  </div>
                  <div className="p-6">
                    <h3 className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{p.title}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                    <p className="mt-2 font-light leading-relaxed text-[#475569]">{p.text}</p>
                    <p className="mt-4 border-t border-[#E5E7EB] pt-3 text-sm text-[#64748B]">Stack: <span className="font-medium text-[#1F2937]">{p.stack}</span></p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. TESTIMONIALS (existing shared component) */}
      <Testimonials />

      {/* 10. RELATED SERVICES */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="rel">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="t2 max-w-3xl text-[#0B1F3B]" lines={[<>Pairs well <b className="font-bold">with</b></>]} />
            <p id="rel" className="rv max-w-sm font-light leading-relaxed text-[#475569]">A website works hardest when design, search and software are planned together.</p>
          </div>
          <ul className="mt-12 grid border-t border-[#0B1F3B] md:grid-cols-3">
            {related.map(({ icon: Icon, name, href, text }, i) => (
              <li key={href} className={`rv ${i ? "md:border-l md:border-[#CFE2FF]" : ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <Link href={href} className={`group flex h-full flex-col justify-between gap-12 py-8 transition hover:bg-[#F5F9FF] md:px-8 ${i === 0 ? "md:pl-0" : ""} ${ring}`}>
                  <div>
                    <Icon size={26} className="text-[#007BFF]" aria-hidden="true" />
                    <h3 className={`${pop.className} mt-6 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#0B1F3B]`}>{name}</h3>
                    <p className="mt-3 font-light leading-relaxed text-[#475569]">{text}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-medium text-[#0052CC]">Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. FAQ (FAQPage JSON-LD is in page.tsx) */}
      <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="faq">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Lines className="t2 text-[#0B1F3B]" lines={[<>Questions,</>, <><b className="font-bold">answered</b></>]} />
              <p id="faq" className="rv mt-6 max-w-xs font-light leading-relaxed text-[#475569]">Can&apos;t find what you need? Write to <a href="mailto:info@devntomsolutions.com" className="font-medium text-[#0052CC] underline underline-offset-4">info@devntomsolutions.com</a>.</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="rv group border-t border-[#CFE2FF] last:border-b">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left ${ring} [&::-webkit-details-marker]:hidden`}>
                  <span className={`${pop.className} text-lg font-semibold tracking-[-0.01em] text-[#0B1F3B] md:text-xl`}>{q}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:border-[#007BFF] group-open:bg-[#007BFF] group-open:text-white"><Plus size={18} aria-hidden="true" /></span>
                </summary>
                <p className="max-w-2xl pb-6 font-light leading-relaxed text-[#475569]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CONTACT FORM (existing shared component) */}
      <ContactForm />
    </PageFx>
  );
}
