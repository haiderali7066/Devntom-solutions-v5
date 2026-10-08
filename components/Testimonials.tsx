"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Lines, pop } from "./shared";

// SAMPLE TEXT: replace with real, approved client testimonials before launch
// [quote, name, role and company, service tag]
const quotes = [
  ["They treated our platform as a business system, not a task list. Delivery was predictable and communication was clear.", "Client name", "Role, Company", "Custom software"],
  ["Our new website loads fast and our enquiries went up within weeks of launch.", "Client name", "Role, Company", "Website"],
  ["The AI automation removed hours of manual reporting every week. The team explained every step.", "Client name", "Role, Company", "AI automation"],
  ["From design to deployment, one team handled everything. No hand-offs, no surprises.", "Client name", "Role, Company", "End-to-end build"],
  ["They understood our market and built exactly what we needed, on schedule.", "Client name", "Role, Company", "Web platform"],
] as const;

export default function Testimonials() {
  const wrap = "mx-auto w-full max-w-[1400px] px-6 md:px-12";
  const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
  const GAP = 20; // must match gap-5 on the track

  const view = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLLIElement>(null);
  const startPt = useRef<{ x: number; y: number } | null>(null);
  const dx = useRef(0);
  const moved = useRef(false);

  const [idx, setIdx] = useState(0);
  const [per, setPer] = useState(1);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);

  const max = Math.max(0, quotes.length - per);

  // measure card width + how many cards fit
  useEffect(() => {
    const measure = () => {
      const v = view.current, c = first.current;
      if (!v || !c) return;
      const s = c.offsetWidth + GAP;
      setStep(s);
      setPer(Math.max(1, Math.round((v.clientWidth + GAP) / s)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (view.current) ro.observe(view.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => { setIdx((i) => Math.min(i, max)); }, [max]);

  // buttons loop around: last -> first, first -> last
  const go = (dir: number) => setIdx((i) => { const n = i + dir; return n > max ? 0 : n < 0 ? max : n; });

  // autoplay (restarts after every move, pauses on hover/focus/drag)
  useEffect(() => {
    if (paused || dragging || max === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIdx((i) => (i >= max ? 0 : i + 1)), 5200);
    return () => window.clearTimeout(id);
  }, [paused, dragging, idx, max]);

  // swipe / drag
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startPt.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    dx.current = 0;
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = startPt.current;
    if (!s) return;
    const x = e.clientX - s.x;
    if (!moved.current) {
      if (Math.abs(x) < 8) return;
      if (Math.abs(e.clientY - s.y) > Math.abs(x)) { startPt.current = null; return; }
      moved.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    // resistance at the ends
    const atEdge = (idx === 0 && x > 0) || (idx === max && x < 0);
    dx.current = atEdge ? x * 0.3 : x;
    setDrag(dx.current);
  };
  const onUp = () => {
    if (!startPt.current) return;
    startPt.current = null;
    if (!moved.current) return;
    const d = dx.current;
    moved.current = false;
    dx.current = 0;
    setDragging(false);
    setDrag(0);
    if (d < -50) setIdx((i) => Math.min(max, i + 1));
    else if (d > 50) setIdx((i) => Math.max(0, i - 1));
  };

  const arrow = (dir: 1 | -1, size: string) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={dir === 1 ? "Next testimonial" : "Previous testimonial"}
      className={`group flex ${size} items-center justify-center rounded-full border border-[#D9E3EF] bg-white text-[#071A33] shadow-sm transition duration-300 hover:border-[#006BFF] hover:bg-[#006BFF] hover:text-white active:scale-95 ${ring}`}
    >
      <ArrowRight size={18} aria-hidden="true" className={`transition-transform duration-300 ${dir === 1 ? "group-hover:translate-x-0.5" : "rotate-180 group-hover:-translate-x-0.5"}`} />
    </button>
  );

  return (
    <section
      aria-labelledby="tst"
      className="relative overflow-hidden bg-white py-20 md:py-28"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#006BFF]/[0.06] blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#00B4FF]/[0.05] blur-[120px]" />

      <div className={`${wrap} relative`}>
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#006BFF]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#006BFF]">Client stories</span>
            </div>
            <Lines className="t2 text-[#071A33]" lines={[<>What our <b className="font-bold">clients</b> say</>]} />
            <p id="tst" className="rv mt-5 max-w-md font-light leading-relaxed text-[#475569]">Real feedback from teams we have built websites, software and automation for.</p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            {arrow(-1, "h-12 w-12")}
            {arrow(1, "h-12 w-12")}
          </div>
        </div>

        {/* VIEWPORT */}
        <div
          ref={view}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="-my-6 cursor-grab touch-pan-y overflow-hidden py-6 active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <ul
            aria-live={paused ? "polite" : "off"}
            className={`flex gap-5 will-change-transform ${dragging ? "" : "tcar"}`}
            style={{ transform: `translate3d(${-idx * step + drag}px,0,0)` }}
          >
            {quotes.map(([q, n, r, tag], i) => (
              <li
                key={q}
                ref={i === 0 ? first : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${quotes.length}`}
                className="w-[88%] shrink-0 sm:w-[70%] md:w-[47%] lg:w-[32%]"
              >
                <figure className="group relative flex h-full min-h-[340px] select-none flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#071A33] p-7 text-white shadow-[0_18px_55px_rgba(7,26,51,0.16)] transition-transform duration-500 hover:-translate-y-1 md:p-8">
                  <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#006BFF]/25 blur-[85px]" />
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#00B4FF]/10 blur-[80px]" />
                  <div aria-hidden="true" className="pointer-events-none absolute -left-[60%] top-0 h-full w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                  <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-[#006BFF] via-[#00B4FF] to-transparent" />

                  {/* top row: stars + tag */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={14} aria-hidden="true" className="fill-[#FBBF24] text-[#FBBF24]" />)}
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9FD0FF]">{tag}</span>
                  </div>

                  <span aria-hidden="true" className="pointer-events-none absolute right-6 top-14 select-none font-serif text-[110px] leading-none text-[#00B4FF]/[0.09]">“</span>

                  <blockquote className="relative z-10 mt-8 flex-1 text-[15px] font-light leading-[1.8] text-white/90 md:text-[16px]">“{q}”</blockquote>

                  <figcaption className="relative z-10 mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className={`${pop.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#006BFF] to-[#00B4FF] text-sm font-bold text-white shadow-[0_0_25px_rgba(0,107,255,0.3)]`}>{n[0]}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-white">{n}</span>
                      <span className="mt-1 block truncate text-xs text-[#9FB1C7]">{r}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTROLS: mobile buttons + dots + counter */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: max + 1 }, (_, d) => (
              <button
                key={d}
                type="button"
                onClick={() => setIdx(d)}
                aria-label={`Go to testimonial ${d + 1}`}
                aria-current={d === idx}
                className={`h-2 rounded-full transition-all duration-500 ${d === idx ? "w-8 bg-[#006BFF]" : "w-2 bg-[#CBD8E8] hover:bg-[#93C5FD]"} ${ring}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="font-mono text-xs tracking-[0.15em] text-[#94A3B8]">
              {String(idx + 1).padStart(2, "0")} / {String(max + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-2 sm:hidden">
              {arrow(-1, "h-10 w-10")}
              {arrow(1, "h-10 w-10")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
