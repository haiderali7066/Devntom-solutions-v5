"use client";

import Link from "next/link";
import { Poppins, Roboto } from "next/font/google";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMedium, FaPinterestP, FaRedditAlien, FaStackOverflow, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { ArrowRight, ArrowUp, ArrowUpRight, Mail, Phone } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const cols = [
  ["Services", [
    ["Website Development", "/services/website-development"], ["Custom Software", "/services/custom-software-development"],
    ["Mobile Apps", "/services/mobile-app-development"], ["AI Automation", "/services/ai-automation"],
    ["Digital Marketing", "/services/digital-marketing"], ["UI/UX Design", "/services/ui-ux-design"], ["SEO", "/services/seo-optimization"],
  ]],
  ["Company", [["About us", "/about"], ["Projects", "/projects"], ["Industries", "/industries"], ["Blog", "/blog"], ["Contact", "/contact"]]],
] as const;

const offices = [
  ["Lahore, Pakistan", "+92 325 6036838", "tel:+923256036838"],
  ["Riyadh, Saudi Arabia", "+966 583 408034", "tel:+966583408034"],
  ["London, United Kingdom", "info@devntomsolutions.com", "mailto:info@devntomsolutions.com"],
] as const;

const socials = [
  [FaInstagram, "Instagram", "https://www.instagram.com/devntom.solutions"],
  [FaFacebookF, "Facebook", "https://www.facebook.com/share/18ANCC7uwH/"],
  [FaLinkedinIn, "LinkedIn", "https://www.linkedin.com/in/devntom-solutions-6b15293b5"],
  [FaXTwitter, "X", "https://x.com/DevntomS18433"],
  [FaPinterestP, "Pinterest", "https://www.pinterest.com/devntomsolutions"],
  [FaMedium, "Medium", "https://medium.com/@devntomsolutions"],
  [FaStackOverflow, "Stack Overflow", "https://stackoverflow.com/users/32455629/devntom-solutions"],
  [FaRedditAlien, "Reddit", "https://www.reddit.com/user/Civil_Woodpecker7536/"],
  [FaWhatsapp, "WhatsApp", "https://wa.me/923256036838"],
] as const;

const legal = [["Privacy Policy", "/privacy-policy"], ["Terms and Conditions", "/terms-and-conditions"], ["Cookie Policy", "/cookie-policy"]] as const;
const ln = "inline-block text-[15px] font-light text-[#B8C9DE] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]";

export default function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className={`${rob.className} relative isolate overflow-hidden bg-[#050E1F] text-white`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 90% 0%,rgba(0,123,255,.22),transparent 45%),radial-gradient(circle at 0% 100%,rgba(0,180,255,.12),transparent 40%)" }} />
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        {showCta && (
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-16 md:flex-row md:items-center md:py-20">
            <h2 className={`${pop.className} max-w-2xl text-[clamp(2rem,4.2vw,3.6rem)] font-extralight leading-[1.05] tracking-[-0.035em]`}>Have a project in <b className="font-bold">mind?</b></h2>
            <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 font-medium text-[#0B1F3B] transition-colors duration-300 hover:bg-[#007BFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050E1F]">
              Book a call <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#007BFF] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#007BFF]"><ArrowRight size={18} aria-hidden="true" /></span>
            </Link>
          </div>
        )}

        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Devntom Solutions home" className="inline-flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M4 4h12a12 12 0 0 1 0 24H4l6-8h6a4 4 0 0 0 0-8H4z" fill="#00B4FF" /></svg>
              <span className={`${pop.className} text-xl font-semibold tracking-[-0.02em]`}>Devntom<span className="ml-1 font-light text-[#93C5FD]">Solutions</span></span>
            </Link>
            <p className={`${pop.className} mt-5 text-lg font-light text-white`}>Where systems become strategy.</p>
            <p className="mt-3 max-w-sm text-[15px] font-light leading-relaxed text-[#B8C9DE]">We engineer websites, software, apps and AI automation that scale with your business.</p>
            <ul className="mt-6 space-y-2.5 text-[15px]">
              <li><a href="mailto:info@devntomsolutions.com" className={`${ln} inline-flex items-center gap-2.5`}><Mail size={16} className="text-[#38BDF8]" aria-hidden="true" />info@devntomsolutions.com</a></li>
              <li><a href="tel:+923256036838" className={`${ln} inline-flex items-center gap-2.5`}><Phone size={16} className="text-[#38BDF8]" aria-hidden="true" />+92 325 6036838</a></li>
            </ul>
          </div>

          {cols.map(([title, links]) => (
            <nav key={title} aria-label={title} className="md:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">{title}</h3>
              <ul className="mt-5 space-y-3">
                {links.map(([l, h]) => <li key={h}><Link href={h} className={`${ln} group`}>{l}<span className="ml-1 inline-block -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">→</span></Link></li>)}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Offices</h3>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {offices.map(([city, c, h]) => (
                <li key={city}>
                  <a href={h} className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]">
                    <span><span className={`${pop.className} block font-semibold`}>{city}</span><span className="text-sm font-light text-[#B8C9DE]">{c}</span></span>
                    <ArrowUpRight size={18} className="shrink-0 text-[#38BDF8] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 border-t border-white/10 py-8">
          {socials.map(([Ic, name, href]) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Devntom Solutions on ${name}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#B8C9DE] transition-colors duration-300 hover:border-[#00B4FF] hover:bg-[#007BFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]">
              <Ic size={17} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 py-7 text-sm text-[#93A8C4] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Devntom Solutions. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map(([l, h]) => <li key={h}><Link href={h} className="transition-colors hover:text-white">{l}</Link></li>)}
          </ul>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors duration-300 hover:border-[#00B4FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]">
            Back to top <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p aria-hidden="true" className={`${pop.className} pointer-events-none -mb-[2.5vw] select-none whitespace-nowrap text-center text-[19vw] font-bold leading-[.85] tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(147,197,253,.16)" }}>DEVNTOM</p>
    </footer>
  );
}