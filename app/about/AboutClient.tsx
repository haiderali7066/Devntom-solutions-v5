"use client";


import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, BarChart3, Bot, Code2, Globe, Megaphone, Palette, Smartphone } from "lucide-react";
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

// REPLACE: confirm these are current.
const STATS: [number, string, string][] = [
  [150, "+", "Projects delivered"],
  [80, "+", "Clients worldwide"],
  [98, "%", "Client satisfaction"],
  [3, "", "Offices: Lahore, Riyadh, London"],
];

const MANIFESTO =
  "We are a software and digital agency with teams in Lahore, Riyadh and London. We design and build websites, software and marketing that help businesses grow. We talk plainly, deliver what we promise and stay around after launch.";

const values = [
  ["Plain talk", "No jargon. You always know what we are doing, why we are doing it and what it costs."],
  ["Built to last", "Clean code and sensible choices, so your product keeps working as your business grows."],
  ["Measured by results", "We agree what success looks like first, then report on it honestly."],
  ["Always reachable", "Real people, quick replies and support that continues after launch."],
] as const;

const services: [LucideIcon, string, string, string][] = [
  [Globe, "Website Development", "/services/website-development", "Fast, secure sites built with Next.js and React."],
  [Megaphone, "Digital Marketing", "/services/digital-marketing", "SEO, ads, social and email with clear reporting."],
  [Bot, "AI Automation and Chatbots", "/services/ai-automation-chatbots", "Assistants and workflows that handle routine work."],
  [Code2, "Custom Software", "/services/custom-software-development", "CRMs, ERPs, SaaS and internal tools."],
  [Smartphone, "Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps."],
  [Palette, "UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
];

// REPLACE: add your real team here. Example: { name: "Full Name", role: "Founder", photo: "/team/name.jpg" }
// Leave the array empty to hide the section.
const team: { name: string; role: string; photo?: string }[] = [];

const tools = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "GSAP", "Framer Motion", "PostgreSQL", "Vercel", "Figma"];

const cities = [
  { name: "Lahore", lon: 74.3, lat: 31.5, dx: 0, dy: -18 },
  { name: "Riyadh", lon: 46.7, lat: 24.7, dx: 0, dy: 26 },
  { name: "London", lon: -0.1, lat: 51.5, dx: 0, dy: -18 },
] as const;

/* ------------------------------ SMALL HELPERS ------------------------------ */

function useReduced() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return r;
}

function Count({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const reduced = useReduced();
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    if (reduced) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const f = (t: number) => {
      const k = Math.min(1, (t - t0) / 1800);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [run, to, reduced]);
  return <span aria-label={`${to}${suffix}`}>{v}{suffix}</span>;
}

/* ------------------------------ HERO: THREE CITIES ------------------------------ */

const MW = 560, MH = 400;
const px = (lon: number) => ((lon + 25) / 120) * MW;
const py = (lat: number) => ((62 - lat) / 45) * MH;

function Network() {
  const pts = cities.map((c) => ({ ...c, x: px(c.lon), y: py(c.lat) }));
  const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.28;
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  };
  const links: [number, number][] = [[2, 1], [1, 0], [2, 0]];
  const reduced = useReduced();
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-2xl" style={{ background: `radial-gradient(closest-side, ${COBALT}88, transparent)` }} />
      <svg viewBox={`0 0 ${MW} ${MH}`} className="block h-auto w-full" role="img" aria-label="Network diagram linking our offices in London, Riyadh and Lahore">
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="rgba(110,161,255,.35)" /></pattern>
          <radialGradient id="fade" cx=".5" cy=".5" r=".6"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="m"><rect width={MW} height={MH} fill="url(#fade)" /></mask>
        </defs>
        <rect width={MW} height={MH} fill="url(#dots)" mask="url(#m)" />
        {links.map(([a, b], i) => <path key={i} d={arc(pts[a], pts[b])} fill="none" stroke={COBALT_HI} strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="4 6" />)}
        {!reduced && links.map(([a, b], i) => (
          <circle key={i} r="4" fill="#fff">
            <animateMotion dur={`${3.4 + i * 0.7}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" path={arc(pts[a], pts[b])} />
          </circle>
        ))}
        {pts.map((p, i) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="16" fill={COBALT_HI} opacity=".18" className={reduced ? "" : "pulse-ring"} style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${p.x}px ${p.y}px` }} />
            <circle cx={p.x} cy={p.y} r="6" fill={COBALT_HI} stroke="#0B1F3B" strokeWidth="2" />
            <text x={p.x} y={p.y + p.dy} textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff" style={{ letterSpacing: ".04em" }}>{p.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white" aria-label="About DEVNTOM Solutions" style={{ background: `radial-gradient(70% 60% at 76% 34%, ${COBALT}70 0%, transparent 65%), radial-gradient(50% 50% at 8% 90%, ${COBALT}33 0%, transparent 70%), linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" />
      <div className={`${wrap} relative grid min-h-[92svh] items-center gap-14 pb-36 pt-32 lg:grid-cols-12 lg:pt-36`}>
        <div className="lg:col-span-7">
          <p className="rv inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-3 pr-5 text-[11px] uppercase tracking-[0.18em] text-[#DCE7FB]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F7BFF] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F7BFF]" /></span>
            About DEVNTOM Solutions
          </p>
          <Lines h1 className="mt-7 text-[clamp(2.7rem,6.4vw,6.2rem)] leading-[0.96] tracking-[-0.045em] [text-shadow:0_2px_40px_rgba(2,5,11,.5)]" lines={["The team behind", <><b className="font-bold">your</b> digital</>, <><Acc>growth.</Acc></>]} />
          <p className="rv mt-8 max-w-lg text-lg font-light leading-relaxed text-[#DCE7FB]" style={{ transitionDelay: "150ms" }}>
            We design, build and grow websites, software and marketing for businesses across the world, from our offices in Lahore, Riyadh and London.
          </p>
          <div className="rv mt-9 flex flex-wrap items-center gap-3" style={{ transitionDelay: "250ms" }}>
            <Link href="/contact" className={`group inline-flex items-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-[#0B1F3B] ${ringDark}`}>
              Work with us <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/projects" className={`inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition hover:border-white ${ringDark}`}>See our work</Link>
          </div>
        </div>
        <div className="lg:col-span-5"><Network /></div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/30 py-5 backdrop-blur-sm" aria-label="Tools we build with">
        <div className="overflow-hidden">
          <div className="mq flex w-max items-center gap-14 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-white/60">
            {[...tools, ...tools, ...tools, ...tools].map((t, i) => <span key={i} className="flex items-center gap-14">{t}<span className="h-1 w-1 rounded-full bg-[#2F7BFF]" /></span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ MANIFESTO: WORDS LIGHT UP ON SCROLL ------------------------------ */

function Manifesto() {
  const root = React.useRef<HTMLElement>(null);
  const reduced = useReduced();
  const [p, setP] = React.useState(0);
  const words = React.useMemo(() => MANIFESTO.split(" "), []);

  React.useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      setP(travel <= 0 ? 1 : Math.max(0, Math.min(1, -r.top / travel)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [reduced]);

  const n = words.length;
  const lit = reduced ? n : p * 1.15 * n;
  return (
    <section ref={root} aria-label="Who we are" className="relative bg-white" style={{ height: reduced ? "auto" : "260vh" }}>
      <div className={`${reduced ? "py-28" : "sticky top-0 flex h-screen items-center"}`}>
        <div className={wrap}>
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#0047AB]">Who we are</p>
          <p className={`${pop.className} max-w-5xl text-[clamp(1.7rem,4.2vw,3.6rem)] font-semibold leading-[1.15] tracking-[-0.035em]`}>
            {words.map((w, i) => {
              const o = Math.max(0.14, Math.min(1, lit - i));
              return <span key={i} style={{ opacity: o, color: o > 0.95 ? NAVY : "#7C8BA5", transition: "opacity .25s linear, color .25s linear" }}>{w} </span>;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ STATS ------------------------------ */

function Stats() {
  const ref = React.useRef<HTMLUListElement>(null);
  const [run, setRun] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="relative overflow-hidden py-20 text-white md:py-28" aria-label="Our numbers" style={{ background: `linear-gradient(120deg, ${BLACK} 0%, ${NAVY} 50%, ${COBALT} 100%)` }}>
      <div className={wrap}>
        <ul ref={ref} className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {STATS.map(([n, s, l]) => (
            <li key={l} className="lg:px-10 lg:first:pl-0">
              <p className={`${pop.className} text-6xl font-semibold tabular-nums tracking-[-0.05em] md:text-7xl`}><Count to={n} suffix={s} run={run} /></p>
              <p className="mt-3 max-w-[14rem] font-light leading-snug text-[#DCE7FB]">{l}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ VALUES ------------------------------ */

function Values() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="How we work">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>How we</>, <><b className="font-bold">work</b>, <Acc dark={false}>every day</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Four habits that shape every project, large or small.</p>
        </div>
        <ol className="mt-16">
          {values.map(([t, d], i) => (
            <li key={t} className="rv group grid items-baseline gap-4 border-t border-[#CBD8EE] py-10 transition-colors last:border-b hover:bg-[#F4F8FE] md:grid-cols-12 md:px-4" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="text-sm text-[#5B6B84] md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`${pop.className} text-3xl font-extralight tracking-[-0.035em] transition-colors group-hover:text-[#0047AB] md:col-span-5 md:text-5xl`}>{t}</h3>
              <p className="max-w-md font-light leading-relaxed text-[#3B4A63] md:col-span-6 md:text-lg">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICES ------------------------------ */

function Services() {
  return (
    <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="What we do">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>What we</>, <><b className="font-bold">do</b> for <Acc dark={false}>clients</Acc></>]} />
          <Link href="/services" className={`group inline-flex items-center gap-3 rounded-full border border-[#0B1F3B]/30 px-7 py-3.5 text-sm font-medium transition hover:border-[#0047AB] hover:text-[#0047AB] ${ring}`}>
            All services <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([Icon, t, href, d], i) => (
            <li key={t} className="rv" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <Link href={href} className={`group flex h-full flex-col justify-between gap-12 rounded-[4px] border border-[#CBD8EE] bg-white p-8 transition-colors duration-300 hover:border-[#0047AB] ${ring}`}>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                  <ArrowUpRight size={24} className="text-[#0047AB] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`${pop.className} text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
                  <p className="mt-2 font-light leading-relaxed text-[#3B4A63]">{d}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ TEAM (hidden until you add people) ------------------------------ */

function Team() {
  if (!team.length) return null;
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Our team">
      <div className={wrap}>
        <Lines className="t2 max-w-3xl" lines={[<>The people</>, <>behind the <Acc dark={false}>work</Acc></>]} />
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <li key={m.name} className="rv" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]" style={{ background: `linear-gradient(140deg, ${NAVY}, ${COBALT})` }}>
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className={`${pop.className} absolute inset-0 flex items-center justify-center text-6xl font-semibold text-white/80`}>{m.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</span>
                )}
              </div>
              <h3 className={`${pop.className} mt-4 text-xl font-semibold tracking-[-0.01em]`}>{m.name}</h3>
              <p className="text-sm text-[#3B4A63]">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ CLOSING CTA ------------------------------ */

function Closing() {
  return (
    <section className="relative isolate overflow-hidden py-28 text-white md:py-40" aria-label="Work with us" style={{ background: `linear-gradient(120deg, ${BLACK} 0%, ${NAVY} 45%, ${COBALT} 100%)` }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
      <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Together</div>
      <div className={`${wrap} text-center`}>
        <Lines className="t1" lines={["Let's build", <><Acc>something</Acc> <b className="font-bold">great.</b></>]} />
        <p className="rv mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us about your project. We reply with a plan, a timeline and a quote.</p>
        <div className="rv mt-10 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: "150ms" }}>
          <Link href="/contact" className={`group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0047AB] hover:text-white ${ringDark}`}>
            Start a project <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a href="mailto:info@devntomsolutions.com" className={`inline-flex items-center rounded-full border border-white/30 px-9 py-4 text-sm font-medium transition hover:border-white ${ringDark}`}>info@devntomsolutions.com</a>
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
@keyframes ring{0%{transform:scale(.6);opacity:.5}100%{transform:scale(2.2);opacity:0}}
.pulse-ring{animation:ring 2.6s ease-out infinite}
@media (prefers-reduced-motion:reduce){.pulse-ring{animation:none!important}.mk-swap,.sw-line,.area-in,.bar-in,.gx,.mk-beat{animation:none!important}.sw-line{stroke-dasharray:none}.mk-float,.mk-float-slow,.mq,.hero-grid,.dot,.msg-in,.wf-pop{animation:none!important}.kb-bar{animation:none;width:100%}.kb-check{animation:none;opacity:1}.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function AboutClient() {
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
      <Manifesto />
      <Stats />
      <Values />
      <Services />
      <Team />
      <Closing />
    </main>
  );
}
