"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Poppins, Roboto } from "next/font/google";
import { Check, ChevronDown, Cookie } from "lucide-react";

/* Cookie consent popup. Appears once at the bottom of the site, remembers the choice
   (localStorage + a first-party cookie) and stays away until you bump VERSION.

   Add once in app/layout.tsx, inside <body>:   <CookieConsent />

   Gate analytics on the choice:
     import { getConsent } from "@/components/CookieConsent";
     if (getConsent()?.analytics) { ...load analytics... }
     window.addEventListener("devntom:consent", (e) => { const c = (e as CustomEvent).detail; ... });

   "Cookie settings" link for the footer (re-opens the panel):
     import { openCookieSettings } from "@/components/CookieConsent";
     <button onClick={openCookieSettings}>Cookie settings</button>
*/

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });

const VERSION = 1; // bump to ask everyone again after you change the cookies you use
const KEY = "devntom-consent-v" + VERSION;
const OPEN_EVENT = "devntom:open-cookie-settings";
const CHANGE_EVENT = "devntom:consent";

export type Consent = { necessary: true; preferences: boolean; analytics: boolean; marketing: boolean; ts: number };

export const getConsent = (): Consent | null => {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

const save = (c: Consent) => {
  try { window.localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* storage blocked: the cookie below still records it */ }
  const code = "p" + +c.preferences + "a" + +c.analytics + "m" + +c.marketing;
  document.cookie = "devntom_consent=" + code + "; Max-Age=31536000; Path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: c }));
};

type Prefs = { preferences: boolean; analytics: boolean; marketing: boolean };
const ROWS: { key: keyof Prefs | "necessary"; title: string; text: string }[] = [
  { key: "necessary", title: "Strictly necessary", text: "Keep the site secure and working, and remember this choice. Always on." },
  { key: "preferences", title: "Preferences", text: "Remember settings to give you a smoother experience." },
  { key: "analytics", title: "Analytics", text: "Show us how pages are used so we can make the site faster and clearer." },
  { key: "marketing", title: "Marketing", text: "Help us measure campaigns and show relevant content on other platforms." },
];

function Switch({ on, locked, onChange, label }: { on: boolean; locked?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={locked}
      onClick={() => onChange?.(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050E1F] motion-reduce:transition-none ${on ? "bg-[#0A5CFF]" : "bg-white/20"} ${locked ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 motion-reduce:transition-none ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);   // in the DOM
  const [shown, setShown] = useState(false); // slid into view
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ preferences: false, analytics: false, marketing: false });
  const firstRun = useRef(true);
  const panel = useRef<HTMLDivElement | null>(null);

  const reveal = () => { setOpen(true); requestAnimationFrame(() => requestAnimationFrame(() => setShown(true))); };
  const hide = () => { setShown(false); window.setTimeout(() => { setOpen(false); setCustom(false); }, 450); };

  useEffect(() => {
    const saved = getConsent();
    let t: number | undefined;
    if (saved) setPrefs({ preferences: saved.preferences, analytics: saved.analytics, marketing: saved.marketing });
    else t = window.setTimeout(reveal, 900); // a short beat so it never fights the first paint
    const onOpen = () => {
      const c = getConsent();
      if (c) setPrefs({ preferences: c.preferences, analytics: c.analytics, marketing: c.marketing });
      firstRun.current = false;
      setCustom(true);
      reveal();
      window.setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 520);
    };
    const onStorage = (e: StorageEvent) => { if (e.key === KEY && e.newValue) hide(); }; // decided in another tab
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener("storage", onStorage);
    return () => { if (t) window.clearTimeout(t); window.removeEventListener(OPEN_EVENT, onOpen); window.removeEventListener("storage", onStorage); };
  }, []);

  // Esc closes the panel only when the visitor has already made a choice before
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && getConsent()) hide(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const decide = (p: Prefs) => { save({ necessary: true, ...p, ts: Date.now() }); setPrefs(p); hide(); };

  if (!open) return null;

  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050E1F] motion-reduce:transition-none";
  const link = "font-medium text-white underline decoration-[#3B82F6] underline-offset-4 transition hover:text-[#93C5FD]";

  return (
    <div
      ref={panel}
      role="region"
      aria-label="Cookie consent"
      className={`${rob.className} fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-[940px] transition-all duration-500 ease-out motion-reduce:transition-none sm:inset-x-6 sm:bottom-6 ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div data-lenis-prevent className="relative max-h-[86svh] overflow-y-auto overscroll-contain rounded-[14px] border border-white/10 bg-[#050E1F]/95 p-5 text-white shadow-[0_30px_100px_rgba(0,20,80,.55)] backdrop-blur-xl md:p-6">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[14px] bg-gradient-to-r from-[#0A5CFF] via-[#00B4FF] to-transparent" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#0A5CFF]/25 blur-[80px]" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="flex min-w-0 flex-1 gap-4">
            <span className="mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[.05] text-[#7DB0FF] sm:flex"><Cookie size={20} aria-hidden="true" /></span>
            <div>
              <h2 className={`${pop.className} text-lg font-semibold tracking-[-0.01em]`}>We value your privacy</h2>
              <p className="mt-1.5 text-[14px] font-light leading-relaxed text-[#B8C9DE]">
                We use essential cookies to run this site and, only with your permission, cookies that help us understand and improve it. Read our{" "}
                <Link href="/cookie-policy" className={link}>Cookie Policy</Link> and <Link href="/privacy-policy" className={link}>Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap md:shrink-0 md:flex-col lg:flex-row">
            <button type="button" onClick={() => decide({ preferences: true, analytics: true, marketing: true })} className={`${btn} bg-white text-[#0B1F3B] hover:bg-[#0A5CFF] hover:text-white`}>Accept all</button>
            <button type="button" onClick={() => decide({ preferences: false, analytics: false, marketing: false })} className={`${btn} border border-white/30 hover:bg-white hover:text-[#0B1F3B]`}>Reject non-essential</button>
            <button type="button" onClick={() => setCustom((v) => !v)} aria-expanded={custom} aria-controls="cookie-custom" className={`${btn} px-3 text-[#93C5FD] hover:text-white`}>
              Customise<ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${custom ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <div id="cookie-custom" className={`relative grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none ${custom ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className={`overflow-hidden ${custom ? "" : "invisible"}`}>
            <ul className="mt-5 divide-y divide-white/10 border-t border-white/10">
              {ROWS.map((r) => (
                <li key={r.key} className="flex items-center justify-between gap-6 py-4">
                  <div className="min-w-0">
                    <p className={`${pop.className} text-[15px] font-semibold`}>{r.title}</p>
                    <p className="mt-0.5 text-[13px] font-light leading-relaxed text-[#9FB1C7]">{r.text}</p>
                  </div>
                  {r.key === "necessary"
                    ? <Switch on locked label={r.title + " cookies, always on"} />
                    : <Switch on={prefs[r.key]} onChange={(v) => setPrefs((p) => ({ ...p, [r.key]: v }))} label={r.title + " cookies"} />}
                </li>
              ))}
            </ul>
            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => decide(prefs)} className={`${btn} bg-[#0A5CFF] text-white hover:bg-white hover:text-[#0B1F3B]`}><Check size={16} aria-hidden="true" />Save my choices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
