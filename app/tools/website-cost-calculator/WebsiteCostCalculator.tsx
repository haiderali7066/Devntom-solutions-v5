"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import {
  FaArrowRight,
  FaBolt,
  FaBuilding,
  FaBullseye,
  FaCartShopping,
  FaCheck,
  FaCircleInfo,
  FaClock,
  FaCoins,
  FaCopy,
  FaGaugeHigh,
  FaGlobe,
  FaLaptopCode,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaPalette,
  FaPlus,
  FaPrint,
  FaShieldHalved,
  FaWhatsapp,
} from "react-icons/fa6";
import ContactForm from "@/components/ContactForm";

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

/* ------------------------------------------------------------------ *
 *  PRICING MODEL: EDIT THESE NUMBERS TO MATCH YOUR REAL PRICING.
 *  Prices are USD "global" terms, adjusted per market and converted to
 *  local currency. They are sample assumptions only.
 * ------------------------------------------------------------------ */
const MARKETS = {
  PK: { name: "Pakistan", currency: "PKR", rate: 280, mult: 0.45, round: 1000 },
  SA: {
    name: "Saudi Arabia",
    currency: "SAR",
    rate: 3.75,
    mult: 0.9,
    round: 50,
  },
  UK: {
    name: "United Kingdom",
    currency: "GBP",
    rate: 0.78,
    mult: 1.25,
    round: 50,
  },
} as const;
type Market = keyof typeof MARKETS;
const MKEYS = Object.keys(MARKETS) as Market[];

const TYPES = [
  {
    id: "landing",
    name: "Landing page",
    base: 500,
    included: 1,
    hint: "One focused page for a campaign or launch",
    Icon: FaBullseye,
  },
  {
    id: "business",
    name: "Business website",
    base: 1200,
    included: 5,
    hint: "Company site with up to 5 pages",
    Icon: FaBuilding,
  },
  {
    id: "ecommerce",
    name: "E-commerce store",
    base: 3500,
    included: 10,
    hint: "Catalogue, cart and checkout",
    Icon: FaCartShopping,
  },
  {
    id: "webapp",
    name: "Web app or portal",
    base: 6000,
    included: 10,
    hint: "Logins, dashboards and custom features",
    Icon: FaLaptopCode,
  },
] as const;
const PAGE_PRICE = 80;
const FEATURES = [
  ["cms", "Content management system", 400],
  ["blog", "Blog and article pages", 300],
  ["multi", "Multilingual (for example Arabic and English)", 600],
  ["booking", "Online booking", 700],
  ["pay", "Payment gateway", 500],
  ["motion", "Custom animations", 800],
  ["chat", "WhatsApp and live chat", 150],
  ["seo", "SEO setup", 400],
  ["analytics", "Analytics and tracking", 150],
  ["login", "User accounts and login", 900],
] as const;
const DESIGN = [
  [
    "template",
    "Template-based",
    0.7,
    "Customised from a proven layout",
    FaLayerGroup,
  ],
  ["custom", "Custom design", 1, "Designed around your brand", FaPalette],
  [
    "premium",
    "Premium with motion",
    1.35,
    "Custom design plus advanced animation",
    FaBolt,
  ],
] as const;
const SPEED = [
  ["standard", "Standard timeline", 1, FaClock],
  ["fast", "Fast delivery", 1.25, FaBolt],
] as const;
const LOW = 0.85,
  HIGH = 1.2;

type Inputs = {
  market: Market;
  type: number;
  pages: number;
  feats: string[];
  design: number;
  speed: number;
  care: boolean;
};

function estimate(i: Inputs) {
  const t = TYPES[i.type],
    m = MARKETS[i.market],
    k = m.mult * m.rate;
  const r = (v: number) => Math.round(v / m.round) * m.round;
  const extra = Math.max(0, i.pages - t.included);
  const fl = FEATURES.filter((f) => i.feats.includes(f[0]));
  const sub = t.base + extra * PAGE_PRICE + fl.reduce((s, f) => s + f[2], 0);
  const ad = sub * DESIGN[i.design][2],
    af = ad * SPEED[i.speed][2];
  const items: [string, number][] = [[`${t.name} (base)`, t.base * k]];
  if (extra > 0) items.push([`Extra pages (${extra})`, extra * PAGE_PRICE * k]);
  fl.forEach((f) => items.push([f[1], f[2] * k]));
  if (ad !== sub)
    items.push([`${DESIGN[i.design][1]} adjustment`, (ad - sub) * k]);
  if (af !== ad) items.push(["Fast delivery", (af - ad) * k]);
  return {
    low: r(af * k * LOW),
    high: r(af * k * HIGH),
    items: items.map(([l, v]) => [l, r(v)] as [string, number]),
    care: r((t.base / 30 + 30) * k),
    k,
    r,
  };
}
const money = (n: number, c: string) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);

const factors = [
  [
    FaLayerGroup,
    "Number of pages",
    "More pages mean more design, content and testing time.",
  ],
  [
    FaPalette,
    "Design level",
    "Template-based sites cost less than fully custom, animated designs.",
  ],
  [
    FaGlobe,
    "Features",
    "Booking, payments, logins and languages each add development work.",
  ],
  [FaClock, "Timeline", "Rushed delivery needs more people working at once."],
  [
    FaGaugeHigh,
    "Performance and SEO",
    "Speed tuning and search setup add work but pay back in traffic.",
  ],
  [
    FaShieldHalved,
    "Support",
    "Hosting, updates and security keep your site healthy after launch.",
  ],
] as const;
const faqs = [
  [
    "How much does a website cost?",
    "It depends on the type of site, the number of pages, the features you need and the design level. Use the calculator above for an indicative range in your currency, then request a fixed quote.",
  ],
  [
    "Why do prices differ between Pakistan, Saudi Arabia and the UK?",
    "Market rates, salaries and client expectations differ by country. The calculator adjusts a common scope for each market and shows the result in the local currency.",
  ],
  [
    "Is this a final quote?",
    "No. It is an indicative estimate. After a short discovery call we send a fixed scope, timeline and price so there are no surprises.",
  ],
  [
    "Can I save the estimate as a PDF?",
    "Yes. Press Print or save as PDF, then choose Save as PDF as the destination in your browser's print window. Add your name first to personalise it.",
  ],
  [
    "Does the price include hosting and a domain?",
    "Not by default. Domains and hosting are usually small yearly costs, and we can set them up for you. Ongoing care plans cover updates, backups and monitoring.",
  ],
  [
    "Can I lower the cost?",
    "Yes. Start with the essential pages and features, choose a template-based design, and add more later. A phased plan spreads cost without losing quality.",
  ],
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

const Acc = ({ children }: { children: ReactNode }) => (
  <span
    className={`${pw.className} text-[.55em] font-normal tracking-normal text-[#93C5FD]`}
  >
    {children}
  </span>
);
const Logo = ({ c = "#007BFF", size = 28 }: { c?: string; size?: number }) => (
  <svg
    height={size}
    width={Math.round(size * 1.212)}
    viewBox="160 267 913 753"
    role="img"
    aria-label="Devntom Solutions"
  >
    <path
      fill={c}
      fillRule="evenodd"
      d="M274 267H700C906 267 1073 437 1073 648C1073 853 919 1020 730 1020H160L433 551ZM543 433H680C792 433 883 528 883 645C883 762 792 858 680 858H447L628 555Z"
    />
  </svg>
);

function useTween(target: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      from.current = target;
      return;
    }
    const a = from.current,
      t0 = performance.now();
    let raf = 0;
    const f = (n: number) => {
      const p = Math.min(1, (n - t0) / 600),
        cur = a + (target - a) * (1 - Math.pow(1 - p, 3));
      setV(cur);
      from.current = cur;
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

export default function WebsiteCostCalculatorClient() {
  const root = useRef<HTMLElement>(null);
  const [inp, setInp] = useState<Inputs>({
    market: "PK",
    type: 1,
    pages: 5,
    feats: ["cms"],
    design: 1,
    speed: 0,
    care: true,
  });
  const [who, setWho] = useState("");
  const [copied, setCopied] = useState(false);
  const [meta, setMeta] = useState({ ref: "", date: "" });
  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
    setInp((p) => ({ ...p, [k]: v }));
  const e = estimate(inp),
    m = MARKETS[inp.market],
    cur = m.currency;
  const lo = useTween(e.low),
    hi = useTween(e.high);

  useEffect(() => {
    const d = new Date();
    setMeta({
      ref: `DEV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      date: d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("in");
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    root.current!.querySelectorAll(".rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const featNames = FEATURES.filter((f) => inp.feats.includes(f[0])).map(
    (f) => f[1],
  );
  const summary = `Website estimate${who ? ` for ${who}` : ""}: ${TYPES[inp.type].name}, ${inp.pages} page${inp.pages > 1 ? "s" : ""}, ${DESIGN[inp.design][1]}, ${SPEED[inp.speed][1]}. Features: ${featNames.join(", ") || "none"}. Estimated range in ${m.name}: ${money(e.low, cur)} to ${money(e.high, cur)}.`;
  const wa = `https://wa.me/923256036838?text=${encodeURIComponent(`Hi Devntom Solutions, I used your website cost calculator. ${summary} Please send me an exact quote.`)}`;
  const card = "rounded-[20px] border border-[#CFE2FF] bg-white p-6 md:p-8";
  const tile = (on: boolean) =>
    `rounded-[14px] border p-4 text-left transition-all duration-300 ${on ? "border-[#007BFF] bg-[#EAF2FF] shadow-[0_10px_30px_rgba(0,123,255,.15)]" : "border-[#CFE2FF] bg-white hover:border-[#93C5FD]"} ${ring}`;
  const head = (n: number, t: string) => (
    <p
      className={`${pop.className} mb-5 flex items-center gap-3 text-lg font-semibold text-[#0B1F3B]`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F3B] font-mono text-xs text-white">
        {n}
      </span>
      {t}
    </p>
  );

  // The estimate document: shown on screen as a paper receipt and printed as the PDF.
  const doc = (
    <div className="text-[#0B1F3B]">
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#CBD5E1] pb-5">
        <div className="flex items-center gap-2.5">
          <Logo />
          <div>
            <p className={`${pop.className} font-semibold leading-tight`}>
              Devntom Solutions
            </p>
            <p className="text-xs text-[#64748B]">Website estimate</p>
          </div>
        </div>
        <div className="text-right text-xs text-[#64748B]">
          <p>Ref {meta.ref || "..."}</p>
          <p>{meta.date}</p>
        </div>
      </div>
      {who && (
        <p className="mt-4 text-sm">
          Prepared for <b>{who}</b>
        </p>
      )}
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
        {[
          ["Market", m.name],
          ["Type", TYPES[inp.type].name],
          ["Pages", String(inp.pages)],
          ["Design", DESIGN[inp.design][1]],
          ["Timeline", SPEED[inp.speed][1]],
          ["Currency", cur],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between gap-2 border-b border-[#EEF2F7] py-1"
          >
            <dt className="text-[#64748B]">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-5 divide-y divide-[#E2E8F0] text-sm">
        {e.items.map(([l, v]) => (
          <li key={l} className="flex justify-between gap-4 py-2">
            <span>{l}</span>
            <span className="shrink-0 font-medium tabular-nums">
              {money(v, cur)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-[10px] bg-[#EAF2FF] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0052CC]">
          Estimated range
        </p>
        <p
          className={`${pop.className} mt-1 text-2xl font-semibold tabular-nums`}
        >
          {money(e.low, cur)} to {money(e.high, cur)}
        </p>
        {inp.care && (
          <p className="mt-1 text-xs text-[#475569]">
            Optional care plan from about {money(e.care, cur)} per month
          </p>
        )}
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-[#64748B]">
        Indicative estimate only, not a quote. Final pricing depends on your
        exact requirements and is confirmed in a written proposal after a
        discovery call.
      </p>
      <p className="mt-3 border-t border-dashed border-[#CBD5E1] pt-3 text-[11px] text-[#475569]">
        Devntom Solutions · info@devntomsolutions.com · +92 325 6036838 ·
        www.devntomsolutions.com
      </p>
    </div>
  );

  return (
    <main
      ref={root}
      id="main"
      className={`${rob.className} overflow-x-clip bg-white text-[#1F2937]`}
    >
      <style>{`
.rv{opacity:0;transform:translateY(32px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}.rv.in{opacity:1;transform:none}
.t0{font-size:clamp(2.4rem,5.2vw,4.6rem);line-height:1.04;letter-spacing:-.04em}.t2{font-size:clamp(1.9rem,3.6vw,3.2rem);line-height:1.06;letter-spacing:-.03em}
.rcp{animation:rcp 1.1s cubic-bezier(.16,1,.3,1) .3s both}@keyframes rcp{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}}
.paper{-webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/18px 100%;mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/18px 100%;padding-bottom:22px}
.fi{animation:fi .5s ease both}@keyframes fi{from{opacity:0;transform:translateY(6px)}}
#print-sheet{display:none}
@media print{@page{margin:14mm}body{background:#fff!important}body>*:not(main){display:none!important}main>*:not(#print-sheet){display:none!important}#print-sheet{display:block!important;max-width:720px;margin:0 auto;font-family:system-ui,sans-serif;color:#0B1F3B}}
@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;transition:none!important}.rcp,.fi{animation:none}}
`}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div id="print-sheet" aria-hidden="true">
        {doc}
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#050E1F] px-6 pb-20 pt-32 text-white md:px-12 md:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 85% 30%,rgba(0,123,255,.45),transparent 70%),radial-gradient(ellipse 40% 50% at 0% 100%,rgba(99,102,241,.22),transparent 70%),#050E1F",
          }}
        />
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="rv text-sm text-[#93C5FD]">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/tools" className="hover:text-white">
                Tools
              </Link>{" "}
              / <span className="text-white">Website Cost Calculator</span>
            </nav>
            <p className="rv mt-6 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-white/[.05] px-4 py-1.5 text-sm text-[#CFE2FF]">
              <FaCoins aria-hidden="true" />
              Free tool. No sign-up.
            </p>
            <h1
              className={`${pop.className} rv t0 mt-5 font-extralight`}
              style={{ transitionDelay: "80ms" }}
            >
              Website cost calculator for{" "}
              <b className="font-bold">Pakistan, Saudi Arabia and the UK</b>
              <Acc>.</Acc>
            </h1>
            <p
              className="rv mt-5 max-w-xl text-lg font-light leading-relaxed text-[#CFE2FF]"
              style={{ transitionDelay: "160ms" }}
            >
              Build your scope, see a live price range, then print it, save it
              as a PDF or send it on WhatsApp.
            </p>
            <a
              href="#calculator"
              className={`rv group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0B1F3B] transition-colors hover:bg-[#007BFF] hover:text-white ${ring} focus-visible:ring-offset-[#050E1F]`}
              style={{ transitionDelay: "240ms" }}
            >
              Start calculating{" "}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white transition group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]">
                <FaArrowRight size={13} aria-hidden="true" />
              </span>
            </a>
          </div>
          <div
            className="rv lg:col-span-5"
            style={{ transitionDelay: "200ms" }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
              Your project in three markets
            </p>
            <ul className="space-y-3">
              {MKEYS.map((k) => {
                const r = estimate({ ...inp, market: k });
                return (
                  <li key={k}>
                    <button
                      onClick={() => set("market", k)}
                      className={`flex w-full items-center justify-between gap-4 rounded-[16px] border px-5 py-4 text-left backdrop-blur transition-all duration-300 ${inp.market === k ? "border-[#00B4FF] bg-[#0A2A5C]/80 shadow-[0_0_40px_rgba(0,180,255,.25)]" : "border-white/15 bg-white/[.05] hover:border-white/40"} ${ring} focus-visible:ring-offset-[#050E1F]`}
                    >
                      <span>
                        <span className="block text-sm text-[#93C5FD]">
                          {MARKETS[k].name}
                        </span>
                        <span
                          key={`${r.low}${k}`}
                          className={`${pop.className} fi block text-lg font-semibold tabular-nums md:text-xl`}
                        >
                          {money(r.low, MARKETS[k].currency)} to{" "}
                          {money(r.high, MARKETS[k].currency)}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-[#38BDF8]">
                        {MARKETS[k].currency}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        className="bg-[#F5F9FF] py-14 md:py-20"
        aria-label="Website cost calculator"
      >
        <div className={`${wrap} grid gap-6 lg:grid-cols-12`}>
          <div className="space-y-5 lg:col-span-7">
            <fieldset className={card}>
              <legend className="sr-only">Market</legend>
              {head(1, "Where is your business?")}
              <div className="grid gap-3 sm:grid-cols-3">
                {MKEYS.map((k) => (
                  <button
                    key={k}
                    onClick={() => set("market", k)}
                    aria-pressed={inp.market === k}
                    className={tile(inp.market === k)}
                  >
                    <span
                      className={`${pop.className} font-semibold text-[#0B1F3B]`}
                    >
                      {MARKETS[k].name}
                    </span>
                    <span className="block font-mono text-xs text-[#0052CC]">
                      {MARKETS[k].currency}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={card}>
              <legend className="sr-only">Website type</legend>
              {head(2, "What kind of website?")}
              <div className="grid gap-3 sm:grid-cols-2">
                {TYPES.map((t, k) => (
                  <button
                    key={t.id}
                    onClick={() =>
                      setInp((p) => ({
                        ...p,
                        type: k,
                        pages: Math.max(p.pages, t.included),
                      }))
                    }
                    aria-pressed={inp.type === k}
                    className={`${tile(inp.type === k)} flex items-start gap-4`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] transition-colors ${inp.type === k ? "bg-[#007BFF] text-white" : "bg-[#E6F0FF] text-[#0052CC]"}`}
                    >
                      <t.Icon size={18} aria-hidden="true" />
                    </span>
                    <span>
                      <span
                        className={`${pop.className} block font-semibold text-[#0B1F3B]`}
                      >
                        {t.name}
                      </span>
                      <span className="text-sm text-[#475569]">{t.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={card}>
              <label className="block">
                <span className="flex items-center justify-between">
                  {head(3, "How many pages?")}
                  <span
                    className={`${pop.className} -mt-5 text-3xl font-semibold text-[#0052CC]`}
                  >
                    {inp.pages}
                  </span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={inp.pages}
                  onChange={(x) => set("pages", Number(x.target.value))}
                  className="w-full accent-[#007BFF]"
                />
                <span className="mt-2 block text-sm text-[#64748B]">
                  {TYPES[inp.type].included} page
                  {TYPES[inp.type].included > 1 ? "s" : ""} included. Each extra
                  page adds to the price.
                </span>
              </label>
            </div>

            <fieldset className={card}>
              <legend className="sr-only">Features</legend>
              {head(4, "Which features do you need?")}
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {FEATURES.map(([id, name, usd]) => {
                  const on = inp.feats.includes(id);
                  return (
                    <li key={id}>
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-[14px] border p-3.5 transition-colors ${on ? "border-[#007BFF] bg-[#EAF2FF]" : "border-[#CFE2FF] hover:border-[#93C5FD]"}`}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() =>
                            set(
                              "feats",
                              on
                                ? inp.feats.filter((f) => f !== id)
                                : [...inp.feats, id],
                            )
                          }
                          className="peer sr-only"
                        />
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] border-2 border-[#93C5FD] text-transparent transition peer-checked:border-[#007BFF] peer-checked:bg-[#007BFF] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#00B4FF]">
                          <FaCheck size={11} aria-hidden="true" />
                        </span>
                        <span className="flex-1 text-sm text-[#0B1F3B]">
                          {name}
                        </span>
                        <span className="text-xs font-medium text-[#0052CC]">
                          +{money(e.r(usd * e.k), cur)}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <div className={`${card} grid gap-8 md:grid-cols-2`}>
              <fieldset>
                <legend className="sr-only">Design level</legend>
                {head(5, "Design level")}
                <div className="space-y-2">
                  {DESIGN.map(([id, n, , d, I], k) => (
                    <button
                      key={id}
                      onClick={() => set("design", k)}
                      aria-pressed={inp.design === k}
                      className={`${tile(inp.design === k)} flex w-full items-center gap-3 !p-3.5`}
                    >
                      <I
                        size={16}
                        className="shrink-0 text-[#0052CC]"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-medium text-[#0B1F3B]">
                          {n}
                        </span>
                        <span className="block text-xs text-[#64748B]">
                          {d}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Timeline</legend>
                {head(6, "Timeline")}
                <div className="space-y-2">
                  {SPEED.map(([id, n, , I], k) => (
                    <button
                      key={id}
                      onClick={() => set("speed", k)}
                      aria-pressed={inp.speed === k}
                      className={`${tile(inp.speed === k)} flex w-full items-center gap-3 !p-3.5`}
                    >
                      <I
                        size={16}
                        className="text-[#0052CC]"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-[#0B1F3B]">{n}</span>
                    </button>
                  ))}
                </div>
                <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-[#0B1F3B]">
                  <input
                    type="checkbox"
                    checked={inp.care}
                    onChange={() => set("care", !inp.care)}
                    className="h-5 w-5 accent-[#007BFF]"
                  />
                  Include monthly care plan estimate
                </label>
              </fieldset>
            </div>
          </div>

          {/* RECEIPT */}
          <aside className="lg:col-span-5" aria-live="polite">
            <div className="lg:sticky lg:top-24">
              <div
                className="rounded-[22px] p-7 text-white shadow-[0_30px_80px_rgba(0,30,90,.3)]"
                style={{
                  background:
                    "linear-gradient(150deg,#0B1F3B,#0A3F9E 80%,#007BFF)",
                }}
              >
                <p className="text-sm text-[#CFE2FF]">
                  Estimated price in {m.name}
                </p>
                <p
                  className={`${pop.className} mt-1 text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] tabular-nums`}
                >
                  {money(Math.round(lo / m.round) * m.round, cur)}
                  <span className="mx-2 text-[#93C5FD]">to</span>
                  <br className="hidden xl:block" />
                  {money(Math.round(hi / m.round) * m.round, cur)}
                </p>
              </div>
              <label className="np mt-4 block text-sm">
                <span className="mb-1 block font-medium text-[#0B1F3B]">
                  Prepared for (optional, appears on the PDF)
                </span>
                <input
                  value={who}
                  onChange={(x) => setWho(x.target.value)}
                  maxLength={60}
                  placeholder="Your name or company"
                  className={`w-full rounded-[12px] border border-[#CFE2FF] bg-white px-4 py-3 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/30`}
                />
              </label>
              <div className="rcp mt-4 drop-shadow-[0_20px_30px_rgba(0,50,120,.18)]">
                <div className="paper bg-white p-6 md:p-7">{doc}</div>
              </div>
              <div className="np mt-5 grid gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#1FB958] ${ring}`}
                >
                  <FaWhatsapp size={20} aria-hidden="true" />
                  Send on WhatsApp
                </a>
                <button
                  onClick={() => window.print()}
                  className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0B1F3B] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#007BFF] ${ring}`}
                >
                  <FaPrint size={16} aria-hidden="true" />
                  Print or save as PDF
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#contact"
                    className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#0B1F3B] px-4 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}
                  >
                    Exact quote <FaArrowRight size={12} aria-hidden="true" />
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(summary);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#CFE2FF] bg-white px-4 py-3 text-sm font-medium text-[#0B1F3B] transition hover:border-[#007BFF] ${ring}`}
                  >
                    {copied ? (
                      <FaCheck size={13} aria-hidden="true" />
                    ) : (
                      <FaCopy size={13} aria-hidden="true" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="flex gap-2 text-xs leading-relaxed text-[#64748B]">
                  <FaCircleInfo
                    size={13}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  To save a PDF, choose &quot;Save as PDF&quot; as the
                  destination in the print window.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* RANGES TABLE */}
      <section className="py-20 md:py-28" aria-labelledby="rg">
        <div className={wrap}>
          <h2
            id="rg"
            className={`${pop.className} rv t2 max-w-3xl font-extralight text-[#0B1F3B]`}
          >
            Typical website costs <b className="font-bold">by country</b>
          </h2>
          <p className="rv mt-4 max-w-2xl text-[#475569]">
            Indicative ranges for a custom-designed site with standard delivery
            and no extra features. Use the calculator to adjust for your
            project.
          </p>
          <div className="rv mt-10 overflow-x-auto rounded-[18px] border border-[#CFE2FF]">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Indicative website cost ranges in Pakistan, Saudi Arabia and the
                United Kingdom
              </caption>
              <thead className="bg-[#0B1F3B] text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Website type
                  </th>
                  {MKEYS.map((k) => (
                    <th key={k} scope="col" className="px-5 py-4 font-medium">
                      {MARKETS[k].name} ({MARKETS[k].currency})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TYPES.map((t, k) => (
                  <tr
                    key={t.id}
                    className="border-t border-[#CFE2FF] odd:bg-white even:bg-[#F5F9FF]"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-semibold text-[#0B1F3B]"
                    >
                      {t.name}
                    </th>
                    {MKEYS.map((c) => {
                      const r = estimate({
                        market: c,
                        type: k,
                        pages: t.included,
                        feats: [],
                        design: 1,
                        speed: 0,
                        care: false,
                      });
                      return (
                        <td key={c} className="px-5 py-4 tabular-nums">
                          {money(r.low, MARKETS[c].currency)} to{" "}
                          {money(r.high, MARKETS[c].currency)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FACTORS */}
      <section className="bg-[#F5F9FF] py-20 md:py-28" aria-labelledby="fc">
        <div className={wrap}>
          <h2
            id="fc"
            className={`${pop.className} rv t2 max-w-3xl font-extralight text-[#0B1F3B]`}
          >
            What affects the <b className="font-bold">cost of a website</b>?
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {factors.map(([I, h, d], k) => (
              <li
                key={h}
                className="rv group rounded-[18px] border border-[#CFE2FF] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#007BFF] hover:shadow-[0_20px_50px_rgba(0,123,255,.14)]"
                style={{ transitionDelay: `${(k % 3) * 80}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#E6F0FF] text-[#0052CC] transition group-hover:bg-[#007BFF] group-hover:text-white">
                  <I size={20} aria-hidden="true" />
                </span>
                <h3
                  className={`${pop.className} mt-5 text-lg font-semibold text-[#0B1F3B]`}
                >
                  {h}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                  {d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-20 md:py-24" aria-labelledby="rl">
        <div className={wrap}>
          <h2
            id="rl"
            className={`${pop.className} rv t2 font-extralight text-[#0B1F3B]`}
          >
            Ready to <b className="font-bold">build it</b>?
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Website Development", "/services/website-development", FaGlobe],
              ["UI/UX Design", "/services/ui-ux-design", FaPalette],
              [
                "SEO Optimization",
                "/services/seo-optimization",
                FaMagnifyingGlass,
              ],
            ].map(([n, h, I]) => {
              const Icon = I as typeof FaGlobe;
              return (
                <li key={n as string}>
                  <Link
                    href={h as string}
                    className={`group flex items-center justify-between gap-4 rounded-[16px] border border-[#CFE2FF] p-6 transition-all hover:border-[#007BFF] hover:bg-[#F5F9FF] ${ring}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className="text-[#007BFF]"
                        aria-hidden="true"
                      />
                      <span
                        className={`${pop.className} font-semibold text-[#0B1F3B]`}
                      >
                        {n as string}
                      </span>
                    </span>
                    <FaArrowRight
                      size={14}
                      className="text-[#0052CC] transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F5F9FF] py-20 md:py-28" aria-labelledby="fq">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <h2
            id="fq"
            className={`${pop.className} rv t2 font-extralight text-[#0B1F3B] lg:col-span-4`}
          >
            Website cost <b className="font-bold">questions</b>
          </h2>
          <div className="lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details
                key={q}
                className="group border-t border-[#CFE2FF] last:border-b"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-6 py-6 ${ring} [&::-webkit-details-marker]:hidden`}
                >
                  <span
                    className={`${pop.className} text-lg font-semibold text-[#0B1F3B] md:text-xl`}
                  >
                    {q}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#93C5FD] text-[#0052CC] transition group-open:rotate-45 group-open:bg-[#007BFF] group-open:text-white">
                    <FaPlus size={13} aria-hidden="true" />
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

      <div id="contact" className="[&>*:last-child]:mb-0">
        <ContactForm />
      </div>
    </main>
  );
}
