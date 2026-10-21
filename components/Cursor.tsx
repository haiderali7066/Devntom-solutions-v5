"use client";

import { useEffect, useRef, useState } from "react";

type CursorProps = {
  /** Hide the system cursor too (only on fine pointers). Default: keep it. */
  hideNative?: boolean;
  /** Cursor colour over light backgrounds. */
  onLight?: string;
  /** Cursor colour over dark or brand-coloured backgrounds. */
  onDark?: string;
};

/**
 * Site-wide custom cursor. Mount once in app/layout.tsx.
 *  - Small dot that follows the pointer with easing.
 *  - Grows into a ring over links and buttons.
 *  - Grows into a labelled disc over [data-cursor] elements
 *    (label from data-cursor-label, default "View").
 *  - Reads the background under the pointer: light colour on dark/blue,
 *    brand colour on light.
 *  - Hidden over form fields and [data-nocursor] areas.
 *  - Off on touch devices and for prefers-reduced-motion.
 */
export default function Cursor({ hideNative = false, onLight = "#007BFF", onDark = "#FFFFFF" }: CursorProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!on) return;
    const w = wrap.current!, d = dot.current!, l = label.current!;

    // 0 = black, 1 = white. Walks up the tree to the first visible background.
    const lum = (start: HTMLElement | null): number => {
      let el = start;
      while (el) {
        const c = getComputedStyle(el);
        const nums = (s: string) => (s.match(/[\d.]+/g) ?? []).map(Number);
        let m = nums(c.backgroundColor);
        if (m.length >= 3 && (m.length < 4 || m[3] > 0.5)) return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255;
        const g = c.backgroundImage.match(/rgba?\([^)]+\)/);
        if (g) { m = nums(g[0]); if (m.length >= 3) return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255; }
        el = el.parentElement;
      }
      return 1;
    };

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, seen = false, pressed = false;
    let lastT: HTMLElement | null = null, col = onLight, txt = "#FFFFFF";
    let size = 14, ring = false, hide = false;

    const apply = () => {
      d.style.width = d.style.height = `${size}px`;
      d.style.background = ring ? "transparent" : col;
      d.style.border = ring ? `2px solid ${col}` : "0";
      d.style.transform = `translate(-50%,-50%) scale(${pressed ? 0.8 : 1})`;
      l.style.color = txt;
    };

    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; cx = x; cy = y; }
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      hide = !!t.closest("input,textarea,select,[contenteditable='true'],[data-nocursor]");
      w.style.opacity = hide ? "0" : "1";
      if (t !== lastT) {
        lastT = t;
        const light = lum(t) > 0.6;
        col = light ? onLight : onDark;
        txt = light ? "#FFFFFF" : "#0B1F3B";
      }
      const tag = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a,button,summary,label,[role='button'],[role='tab']");
      ring = !!link && !tag;
      size = tag ? 88 : link ? 56 : 14;
      l.textContent = tag ? tag.dataset.cursorLabel || "View" : "";
      l.style.opacity = tag ? "1" : "0";
      apply();
    };
    const down = () => { pressed = true; apply(); };
    const up = () => { pressed = false; apply(); };
    const leave = () => { w.style.opacity = "0"; };
    const enter = () => { if (!hide) w.style.opacity = "1"; };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      w.style.transform = `translate3d(${cx}px,${cy}px,0)`;
    };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(loop); };

    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    document.addEventListener("visibilitychange", vis);
    apply();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [on, onLight, onDark]);

  if (!on) return null;
  return (
    <>
      {hideNative && (
        <style>{`@media (pointer:fine){html,body,a,button,summary,label,[role=button],[role=tab]{cursor:none!important}input,textarea,select,[contenteditable=true],[data-nocursor],[data-nocursor] *{cursor:auto!important}}`}</style>
      )}
      <div ref={wrap} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-300">
        <span
          ref={dot}
          className="absolute left-0 top-0 box-border flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,transform] duration-300 ease-out"
          style={{ width: 14, height: 14, transform: "translate(-50%,-50%)" }}
        >
          <span ref={label} className="text-xs font-semibold opacity-0 transition-opacity duration-200" />
        </span>
      </div>
    </>
  );
}
