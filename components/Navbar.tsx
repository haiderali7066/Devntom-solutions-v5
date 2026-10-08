"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { Poppins, Roboto } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  GraduationCap,
  Globe,
  HeartPulse,
  Info,
  Landmark,
  Mail,
  Megaphone,
  Menu,
  PenTool,
  Search,
  ShoppingCart,
  Smartphone,
  Truck,
  UtensilsCrossed,
  X,
  Briefcase,
  BookOpen,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const pop = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});
const rob = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

type Icon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
}>;
type Item = { icon: Icon; name: string; href: string; desc: string };
type Menu = {
  label: string;
  items: Item[];
  feature: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
    href: string;
  };
};

const MENUS: Record<string, Menu> = {
  services: {
    label: "Services",
    items: [
      {
        icon: Globe,
        name: "Website Development",
        href: "/services/website-development",
        desc: "Fast, SEO-ready sites on Next.js and React.",
      },
      {
        icon: Code2,
        name: "Custom Software",
        href: "/services/custom-software-development",
        desc: "Web apps, SaaS, CRM and ERP systems.",
      },
      {
        icon: Smartphone,
        name: "Mobile Apps",
        href: "/services/mobile-app-development",
        desc: "Native and cross-platform apps.",
      },
      {
        icon: Bot,
        name: "AI Automation",
        href: "/services/ai-automation",
        desc: "Workflows that remove repetitive work.",
      },
      {
        icon: Megaphone,
        name: "Digital Marketing",
        href: "/services/digital-marketing",
        desc: "Data-driven campaigns that convert.",
      },
      {
        icon: PenTool,
        name: "UI/UX Design",
        href: "/services/ui-ux-design",
        desc: "Interfaces people understand instantly.",
      },
      {
        icon: Search,
        name: "SEO",
        href: "/services/seo-optimization",
        desc: "Technical and content search growth.",
      },
    ],
    feature: {
      eyebrow: "Start here",
      title: "Not sure what you need?",
      text: "Tell us your goal. We will recommend the right mix of services and send a clear plan.",
      cta: "Book a free call",
      href: "/contact",
    },
  },
  industries: {
    label: "Industries",
    items: [
      {
        icon: HeartPulse,
        name: "Healthcare",
        href: "/industries#healthcare",
        desc: "Booking, patient portals and records.",
      },
      {
        icon: Landmark,
        name: "Fintech and finance",
        href: "/industries#fintech",
        desc: "Dashboards, payments and reporting.",
      },
      {
        icon: Truck,
        name: "Logistics",
        href: "/industries#logistics",
        desc: "Tracking, inventory and dispatch.",
      },
      {
        icon: ShoppingCart,
        name: "E-commerce and retail",
        href: "/industries#ecommerce",
        desc: "Stores, catalogues and checkout.",
      },
      {
        icon: GraduationCap,
        name: "Education",
        href: "/industries#education",
        desc: "Learning platforms and admin tools.",
      },
      {
        icon: UtensilsCrossed,
        name: "Restaurants and hospitality",
        href: "/industries#hospitality",
        desc: "Ordering, reservations, operations.",
      },
    ],
    feature: {
      eyebrow: "Your sector",
      title: "Built around how you work",
      text: "We learn your industry first, then engineer software that fits it.",
      cta: "Explore industries",
      href: "/industries",
    },
  },
  company: {
    label: "Company",
    items: [
      {
        icon: Info,
        name: "About us",
        href: "/about",
        desc: "Our mission, values and team.",
      },
      {
        icon: Briefcase,
        name: "Projects",
        href: "/projects",
        desc: "Selected work and case studies.",
      },
      {
        icon: BookOpen,
        name: "Blog",
        href: "/blog",
        desc: "Guides on websites, software and SEO.",
      },
      {
        icon: MapPin,
        name: "Offices",
        href: "/contact",
        desc: "Lahore, Riyadh and London.",
      },
      {
        icon: Mail,
        name: "Contact",
        href: "/contact",
        desc: "Talk to us about your project.",
      },
    ],
    feature: {
      eyebrow: "Global delivery",
      title: "Three offices, one team",
      text: "Local understanding in South Asia, the Middle East and Europe.",
      cta: "Meet the team",
      href: "/about",
    },
  },
};
const KEYS = Object.keys(MENUS);

const css = `
@keyframes mi{from{opacity:0;transform:translateY(10px)}}
.mi{animation:mi .5s cubic-bezier(.16,1,.3,1) both}
@media (prefers-reduced-motion:reduce){.mi{animation:none}}
`;

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mob, setMob] = useState(false);
  const [mobSec, setMobSec] = useState<string | null>("services");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const head = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    setMob(false);
  }, []);
  const enter = (k: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(k), 90);
  };
  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 160);
  };

  useEffect(close, [path, close]);

  useEffect(() => {
    let last = scrollY;
    const f = () => {
      const y = scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 160);
      last = y;
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    const down = (e: PointerEvent) => {
      if (head.current && !head.current.contains(e.target as Node))
        setOpen(null);
    };
    addEventListener("keydown", key);
    addEventListener("pointerdown", down);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("pointerdown", down);
    };
  }, [close]);

  useEffect(() => {
    document.documentElement.style.overflow = mob ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mob]);

  const menu = open ? MENUS[open] : null;
  const active = (href: string) =>
    path === href || (href !== "/" && path.startsWith(href));
  const link = `rounded-full px-4 py-2 text-[15px] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]`;

  return (
    <>
      <style>{css}</style>
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[54] bg-black/50 backdrop-blur-[2px] transition-opacity"
          onClick={() => setOpen(null)}
        />
      )}
      <header
        ref={head}
        onMouseLeave={leave}
        className={`${rob.className} fixed inset-x-0 top-0 z-[55] border-b text-white transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open && !mob ? "-translate-y-full" : "translate-y-0"} ${scrolled || open ? "border-white/10 bg-[#050E1F]/90 backdrop-blur-xl" : "border-transparent bg-[#050E1F]/40 backdrop-blur-md"}`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 md:px-12"
        >
         <Link
  href="/"
  aria-label="Devntom Solutions home"
  className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
  onClick={close}
>
  {/* Logo */}
  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center">
    <img
      src="/sign.png"
      alt=""
      width={30}
      height={30}
      className="h-[30px] w-[30px] object-contain"
    />
  </div>

  {/* Keep name exactly as it is */}
  <span
    className={`${pop.className} text-lg font-semibold tracking-[-0.02em]`}
  >
    Devntom
    <span className="ml-1 font-light text-[#93C5FD]">
      Solutions
    </span>
  </span>
</Link>
          <ul className="hidden items-center gap-1 text-white/80 lg:flex">
            {KEYS.map((k) => (
              <li key={k} onMouseEnter={() => enter(k)}>
                <button
                  type="button"
                  aria-expanded={open === k}
                  aria-controls={`mega-${k}`}
                  onClick={() => setOpen(open === k ? null : k)}
                  className={`${link} inline-flex items-center gap-1.5 ${open === k ? "bg-white/10 text-white" : ""}`}
                >
                  {MENUS[k].label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${open === k ? "rotate-180" : ""}`}
                    aria-hidden={true}
                  />
                </button>
              </li>
            ))}
            {[
              ["Projects", "/projects"],
              ["Blog", "/blog"],
            ].map(([l, h]) => (
              <li key={h} onMouseEnter={() => setOpen(null)}>
                <Link
                  href={h}
                  aria-current={active(h) ? "page" : undefined}
                  className={`${link} ${active(h) ? "text-white" : ""}`}
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 text-sm font-medium text-[#0B1F3B] transition-colors duration-300 hover:bg-[#007BFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050E1F] sm:inline-flex"
            >
              Book a call{" "}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden={true}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMob(!mob)}
              aria-expanded={mob}
              aria-controls="mobile-menu"
              aria-label={mob ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] lg:hidden"
            >
              {mob ? (
                <X size={20} aria-hidden={true} />
              ) : (
                <Menu size={20} aria-hidden={true} />
              )}
            </button>
          </div>
        </nav>

        {/* MEGA PANEL (desktop) */}
        {menu && open && (
          <div
            id={`mega-${open}`}
            key={open}
            className="hidden border-t border-white/10 lg:block"
            onMouseEnter={() => clearTimeout(timer.current)}
          >
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 gap-10 px-6 py-10 md:px-12">
              <ul
                className={`col-span-8 grid gap-x-4 gap-y-1 ${menu.items.length > 5 ? "grid-cols-2" : "grid-cols-2"}`}
              >
                {menu.items.map((it, i) => (
                  <li
                    key={it.name}
                    className="mi"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <Link
                      href={it.href}
                      onClick={close}
                      className="group flex gap-4 rounded-[6px] p-4 transition-colors hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-[#00B4FF]/20 bg-[#007BFF]/10 text-[#38BDF8] transition-colors duration-300 group-hover:border-[#00B4FF]/50 group-hover:bg-[#007BFF]/25">
                        <it.icon
                          size={21}
                          strokeWidth={1.7}
                          aria-hidden={true}
                        />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`${pop.className} flex items-center gap-1.5 font-semibold`}
                        >
                          {it.name}
                          <ArrowUpRight
                            size={15}
                            className="-translate-x-1 text-[#38BDF8] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden={true}
                          />
                        </span>
                        <span className="mt-1 block text-sm font-light leading-relaxed text-[#B8C9DE]">
                          {it.desc}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="mi relative col-span-4 overflow-hidden rounded-[10px] border border-[#00B4FF]/25 p-8"
                style={{
                  background: "linear-gradient(145deg,#0A3F9E,#006BFF)",
                  animationDelay: "120ms",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00B4FF]/35 blur-[80px]"
                />
                <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {menu.feature.eyebrow}
                </p>
                <h3
                  className={`${pop.className} relative mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em]`}
                >
                  {menu.feature.title}
                </h3>
                <p className="relative mt-3 text-sm font-light leading-relaxed text-white/75">
                  {menu.feature.text}
                </p>
                <Link
                  href={menu.feature.href}
                  onClick={close}
                  className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white py-2.5 pl-5 pr-2.5 text-sm font-medium text-[#0B1F3B] transition-colors hover:bg-[#050E1F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {menu.feature.cta}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007BFF] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight size={14} aria-hidden={true} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`${rob.className} fixed inset-0 z-[53] overflow-y-auto bg-[#050E1F] px-6 pb-10 pt-24 text-white transition-[opacity,visibility] duration-500 lg:hidden ${mob ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {KEYS.map((k) => (
            <li key={k}>
              <button
                type="button"
                aria-expanded={mobSec === k}
                onClick={() => setMobSec(mobSec === k ? null : k)}
                className={`${pop.className} flex w-full items-center justify-between py-5 text-xl font-semibold`}
              >
                {MENUS[k].label}
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${mobSec === k ? "rotate-180" : ""}`}
                  aria-hidden={true}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ${mobSec === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <ul className="overflow-hidden">
                  {MENUS[k].items.map((it) => (
                    <li key={it.name}>
                      <Link
                        href={it.href}
                        onClick={close}
                        tabIndex={mobSec === k ? 0 : -1}
                        className="flex items-center gap-3 py-3 text-[#CFE2FF]"
                      >
                        <it.icon
                          size={18}
                          className="text-[#38BDF8]"
                          aria-hidden={true}
                        />
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          {[
            ["Projects", "/projects"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
          ].map(([l, h]) => (
            <li key={h}>
              <Link
                href={h}
                onClick={close}
                className={`${pop.className} block py-5 text-xl font-semibold`}
              >
                {l}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          onClick={close}
          className="mt-8 flex items-center justify-center gap-2 rounded-[4px] bg-white py-4 font-medium text-[#0B1F3B]"
        >
          Book a call <ArrowUpRight size={18} aria-hidden={true} />
        </Link>
        <p className="mt-6 text-center text-sm text-[#93C5FD]">
          info@devntomsolutions.com
        </p>
      </div>
    </>
  );
}
