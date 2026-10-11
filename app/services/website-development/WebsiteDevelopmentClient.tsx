"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * /services/website-development
 *
 * One self-contained file: no imports from your own files, no Nav, no Footer
 * (both live in app/layout.tsx).
 *
 * The opening is a scroll-scrubbed WebGL scene (adapted from the Lycoris specimen):
 * a procedural cobalt chrome DNA helix: code as DNA, with glowing base pairs. Scroll is the timeline. Six frames,
 * and between each one the camera orbits, the helix shrinks, flies and turns while
 * the type morphs from one layout into the next. Below it sit the usual service-page
 * sections (what is included, process, related services, FAQ, contact form).
 *
 * Palette: cobalt, navy, white, black.
 * Before launch, search this file for "TESTIMONIALS" to see where to drop your component.
 */

import * as React from "react";
import Link from "next/link";
import { Poppins, Roboto, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Check, Code2, Gauge, LayoutDashboard, Plus, Search, ShieldCheck, Smartphone } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB"; // true cobalt: borders, buttons, accents on light backgrounds
const COBALT_HI = "#2F7BFF"; // lighter cobalt tint: the 3D object and glow on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const BLACK = "#02050B";
const WHITE = "#FFFFFF";

const SITE = "https://www.devntomsolutions.com";
const PATH = "/services/website-development";
const TITLE = "Website Development Services | DEVNTOM Solutions";
const DESC = "Fast, secure, responsive websites built with Next.js and React: company sites, e-commerce and web apps with SEO built in. DEVNTOM Solutions, Lahore, Riyadh and London.";

/* ------------------------------ CONTENT ------------------------------ */

const NAME = "Build";
const SPECS = ["Design to launch", "Next.js and React", "SEO built in", "Fast and secure", "CMS and lead forms"];
const TAGLINE = [{ text: "Websites" }, { text: "built to", small: true }, { text: "convert" }, { text: "every visit", small: true }];

// Hover or focus a type in frame 3 to read what it covers.
const TYPES: [string, string][] = [
  ["Company sites", "Clear, credible sites that explain what you do and earn enquiries."],
  ["E-commerce", "Fast stores with secure checkout and simple product management."],
  ["Web apps", "Dashboards, portals and tools that run in the browser."],
  ["Landing pages", "Focused pages built to lift conversions from campaigns."],
  ["CMS sites", "Edit your own content without calling a developer."],
  ["Portals", "Secure logins, accounts and member areas."],
  ["Redesigns", "A new look and faster code on top of what already works."],
  ["Performance", "Speed, accessibility and Core Web Vitals work on existing sites."],
];

const STATS = [["150+", "Projects delivered"], ["80+", "Clients worldwide"], ["98%", "Client satisfaction"]];

const included = [
  [Gauge, "Speed built in", "Optimised images, clean code and fast hosting so pages load quickly everywhere."],
  [Smartphone, "Responsive by default", "Every page designed and tested from small phones to wide desktops."],
  [Search, "SEO foundations", "Clean structure, metadata and structured data so search engines understand you."],
  [ShieldCheck, "Secure and reliable", "Hardened forms, safe dependencies and sensible hosting from day one."],
  [LayoutDashboard, "Easy to manage", "A CMS or admin panel so your team can update content without help."],
  [Code2, "Clean, scalable code", "Next.js, React and TypeScript, written to be easy to extend later."],
] as const;

const steps = [
  ["Discovery and strategy", "Goals, audience, pages and a plan we both sign off on."],
  ["UI/UX and wireframes", "Layouts and visual design you approve before any code."],
  ["Development", "Pages, components and integrations built and reviewed."],
  ["Testing and QA", "Devices, browsers, forms and speed checked before launch."],
  ["Launch", "Deployment, redirects and monitoring handled for you."],
  ["Support and growth", "Fixes, improvements and search growth after launch."],
] as const;

const related = [
  ["Digital Marketing", "/services/digital-marketing", "Campaigns that send the right visitors to your new site."],
  ["SEO", "/services/seo-optimization", "Technical and content SEO for steady organic growth."],
  ["UI/UX Design", "/services/ui-ux-design", "Interfaces people understand on the first visit."],
  ["Mobile Apps", "/services/mobile-app-development", "Native and cross-platform apps to go with your site."],
] as const;

const faqs = [
  ["What types of websites do you build?", "Company sites, e-commerce stores, landing pages, CMS-driven sites, portals and web apps. If it runs in a browser, we can build it."],
  ["Which technologies do you use?", "Mainly Next.js, React, TypeScript and Tailwind CSS, with a CMS or backend chosen to suit the project."],
  ["Will my website be fast and mobile friendly?", "Yes. Speed and responsive design are part of every build, and we test on real devices and browsers before launch."],
  ["Is SEO included?", "The technical foundations are: clean structure, metadata, structured data and speed. Ongoing content and ranking work is available as our SEO service."],
  ["Can I edit the content myself?", "Yes. We add a CMS or admin panel where it makes sense, so your team can update pages without a developer."],
  ["Can you redesign my existing website?", "Yes. We audit what you have, keep what works and rebuild what holds you back."],
  ["How long does a website take?", "It depends on scope. After a short discovery step we send a clear quote with deliverables and a timeline."],
  ["Do you support the site after launch?", "Yes. Support and growth is the last step of our process, covering fixes, improvements and monitoring."],
] as const;

const serviceOptions = ["Website Development", "Digital Marketing", "Custom Software", "Mobile Apps", "AI Automation", "UI/UX Design", "SEO", "Something else"];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Development",
    serviceType: "Website development",
    description: DESC,
    url: SITE + PATH,
    provider: { "@type": "Organization", name: "DEVNTOM Solutions", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: SITE + "/services" },
      { "@type": "ListItem", position: 3, name: "Website Development", item: SITE + PATH },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

/* ------------------------------ 3D: THE FUNNEL ------------------------------ */

type V3 = [number, number, number];
type Curve = {
  pts: V3[];
  /** 0 backbone ribbon, 1 base-pair rung (tube), 2 reserved */
  kind: 0 | 1 | 2;
  /** half-width of a ribbon, radius of a tube */
  w: number;
  /** half-thickness of a ribbon */
  t: number;
  /** ribbon width direction (used when `lats` is absent) */
  lat: V3;
  /** per-point ribbon width direction, so a ribbon can hug a wall */
  lats?: V3[];
  /** widen towards the end instead of tapering to a point */
  flare?: boolean;
  /** constant width, square ends: a hoop or panel strip */
  flat?: boolean;
  twist: number;
  bulb: boolean;
  phase: number;
  stagger: number;
  base: V3;
};

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: V3): V3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Where the camera looks: the middle of the helix. */
const HEART: V3 = [0, 0, 0];
/** Fit radius for the camera: the helix runs from -1.9 to 1.9 in height. */
const FIT_RADIUS = 2.15;
/** Radius of the helix seen from above, used to place the cover letters beside it. */
const TOP_R = 1.05;

const HELIX_R = 0.9;
const HELIX_H = 1.9;
const HELIX_TURNS = 3.2;

/**
 * Code as DNA. Two chrome backbone ribbons wind around each other and are built segment
 * by segment, bottom to top. Between them, 26 base pairs: two chrome rungs that meet in
 * the middle, each ending in a glowing bead on the backbone. The beads glow through a
 * soft additive halo drawn on a second canvas (see `glowPts`).
 */
const buildCurves = (_unused: number, seed: number) => {
  const r = rng(seed);
  const curves: Curve[] = [];
  const angleAt = (y: number) => HELIX_TURNS * Math.PI * 2 * ((y + HELIX_H) / (2 * HELIX_H));
  const onStrand = (y: number, phase: number, rad: number): V3 => {
    const a = angleAt(y) + phase;
    return [Math.cos(a) * rad, y, Math.sin(a) * rad];
  };

  // backbones, in eight segments each so the helix can build upward
  const SEG = 8;
  for (const phase of [0, Math.PI]) {
    for (let sgm = 0; sgm < SEG; sgm++) {
      const y0 = -HELIX_H + (2 * HELIX_H * sgm) / SEG;
      const y1 = -HELIX_H + (2 * HELIX_H * (sgm + 1)) / SEG;
      const pts: V3[] = [];
      // a small overlap tucks each segment's end cap inside its neighbour
      const a0 = sgm === 0 ? y0 : y0 - 0.05;
      const a1 = sgm === SEG - 1 ? y1 : y1 + 0.05;
      for (let k = 0; k <= 14; k++) pts.push(onStrand(a0 + ((a1 - a0) * k) / 14, phase, HELIX_R));
      const mid = pts[7];
      curves.push({
        pts, kind: 0, w: 0.05, t: 0.03, lat: [0, 1, 0], flat: true, twist: 0, bulb: false,
        phase: r() * 6.28, stagger: (sgm / SEG) * 0.6 + (phase ? 0.03 : 0), base: mid,
      });
    }
  }

  // base pairs
  const PAIRS = 26;
  for (let i = 0; i < PAIRS; i++) {
    const y = -HELIX_H + 0.08 + ((2 * HELIX_H - 0.16) * i) / (PAIRS - 1);
    for (const phase of [0, Math.PI]) {
      const outer = onStrand(y, phase, HELIX_R * 0.98);
      const inner = onStrand(y, phase, 0.04);
      const pts: V3[] = [];
      // from the middle out, so the bead sits on the backbone
      for (let k = 0; k <= 10; k++) {
        const s = k / 10;
        pts.push([inner[0] + (outer[0] - inner[0]) * s, y, inner[2] + (outer[2] - inner[2]) * s]);
      }
      curves.push({
        pts, kind: 1, w: 0.016, t: 0, lat: [0, 1, 0], twist: 0, bulb: true,
        phase: r() * 6.28, stagger: 0.1 + (i / PAIRS) * 0.6, base: pts[0],
      });
    }
  }
  return { curves, radius: FIT_RADIUS };
};

/** Interleaved vertex layout: pos 3, normal 3, aux 4 (s, phase, kind, stagger), base 3. */
const STRIDE = 13;

const buildMesh = (curves: Curve[]) => {
  const v: number[] = [];
  const idx: number[] = [];
  let count = 0;
  const push = (p: V3, n: V3, s: number, c: Curve) => {
    v.push(p[0], p[1], p[2], n[0], n[1], n[2], s, c.phase, c.kind, c.stagger, c.base[0], c.base[1], c.base[2]);
    return count++;
  };
  const tangent = (pts: V3[], i: number) => norm(sub(pts[Math.min(i + 1, pts.length - 1)], pts[Math.max(i - 1, 0)]));

  for (const c of curves) {
    const n = c.pts.length;
    if (c.kind === 0) {
      // A flat band with real thickness: four faces, hard-edged, so the chrome
      // picks up a bright line along each rim like a pressed strip of metal.
      const rings: number[][] = [];
      let first: V3[] = [];
      let last: V3[] = [];
      let T0: V3 = [0, 1, 0];
      let T1: V3 = [0, 1, 0];
      for (let i = 0; i < n; i++) {
        const s = i / (n - 1);
        const T = tangent(c.pts, i);
        const lat = c.lats ? c.lats[i] : c.lat;
        let N = norm(cross(T, lat));
        let W = cross(N, T);
        const a = c.twist * Math.sin(Math.PI * s);
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        const W2 = add(mul(W, ca), mul(N, sa));
        N = sub(mul(N, ca), mul(W, sa));
        W = W2;
        const hw = c.flat
          ? c.w
          : c.flare
          ? c.w * (0.3 + 1.0 * s) * (1 + 0.08 * Math.sin(s * 34 + c.phase))
          : c.w * (0.42 + 0.58 * Math.pow(Math.sin(Math.PI * Math.min(1, 0.12 + s * 0.9)), 0.6)) * (1 + 0.1 * Math.sin(s * 34 + c.phase));
        const p = c.pts[i];
        const k0 = add(add(p, mul(W, hw)), mul(N, c.t));
        const k1 = add(sub(p, mul(W, hw)), mul(N, c.t));
        const k2 = sub(sub(p, mul(W, hw)), mul(N, c.t));
        const k3 = sub(add(p, mul(W, hw)), mul(N, c.t));
        const mW = mul(W, -1);
        const mN = mul(N, -1);
        rings.push([
          push(k0, N, s, c), push(k1, N, s, c),
          push(k1, mW, s, c), push(k2, mW, s, c),
          push(k2, mN, s, c), push(k3, mN, s, c),
          push(k3, W, s, c), push(k0, W, s, c),
        ]);
        if (i === 0) { first = [k0, k1, k2, k3]; T0 = T; }
        if (i === n - 1) { last = [k0, k1, k2, k3]; T1 = T; }
      }
      for (let i = 0; i < n - 1; i++) {
        const a = rings[i];
        const b = rings[i + 1];
        for (let f = 0; f < 4; f++) {
          const x = f * 2;
          idx.push(a[x], a[x + 1], b[x], a[x + 1], b[x + 1], b[x]);
        }
      }
      const cap = (q: V3[], nrm: V3, s: number) => {
        const o = q.map((p) => push(p, nrm, s, c));
        idx.push(o[0], o[1], o[2], o[0], o[2], o[3]);
      };
      cap(first, mul(T0, -1), 0);
      cap(last, T1, 1);
    } else {
      // Round tube on a parallel-transport frame, so it never corkscrews.
      const seg = c.kind === 2 ? 10 : 6;
      let N = norm(cross(tangent(c.pts, 0), c.kind === 2 ? [0, 0, 1] : c.lat));
      const rings: number[] = [];
      for (let i = 0; i < n; i++) {
        const s = i / (n - 1);
        const T = tangent(c.pts, i);
        N = norm(sub(N, mul(T, dot(N, T))));
        const B = cross(T, N);
        let rad = c.w * (c.kind === 1 ? 1 - 0.35 * s : 1);
        if (c.bulb && s > 0.9) rad = c.w * (0.65 + 2.1 * Math.sin(((s - 0.9) / 0.1) * Math.PI * 0.92));
        if (c.kind === 1 && i === n - 1) rad *= 0.3;
        rings.push(count);
        for (let k = 0; k <= seg; k++) {
          const a = (k / seg) * Math.PI * 2;
          const nr = add(mul(N, Math.cos(a)), mul(B, Math.sin(a)));
          push(add(c.pts[i], mul(nr, rad)), nr, s, c);
        }
      }
      for (let i = 0; i < n - 1; i++) {
        for (let k = 0; k < seg; k++) {
          const a = rings[i] + k;
          const b = rings[i + 1] + k;
          idx.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
  }
  return { data: new Float32Array(v), index: new Uint16Array(idx), vertices: count };
};

/* ------------------------------ 3D: SCROLL TIMELINE ------------------------------ */

const clamp01 = (x: number) => (x <= 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** 0 while the root's top sits at the stage's top, 1 when its bottom does. */
const progressFrom = (top: number, height: number, viewport: number) => {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp01(-top / travel);
};

/** Scroll progress to a continuous frame coordinate in 0..n-1. Each frame holds for `hold` of its slot. */
const sceneCoord = (p: number, n: number, hold: number) => {
  if (n <= 1) return 0;
  const t = clamp01(p) * (n - 1);
  const i = Math.min(Math.floor(t), n - 2);
  const h = hold / 2;
  return i + easeInOut(clamp01((t - i - h) / (1 - 2 * h)));
};

/** How present one element of frame `scene` is at `coord`. `delay` staggers it, mirrored on the way out. */
const reveal = (coord: number, scene: number, delay: number) => {
  const d = coord - scene;
  const lag = d < 0 ? delay : 1 - delay;
  return clamp01((0.6 - Math.abs(d) - lag * 0.2) / 0.25);
};

type Key = {
  /** turn of the funnel about its axis, radians */
  spin: number;
  /** camera elevation, degrees; +90 looks straight down into the helix */
  el: number;
  /** helix radius as a fraction of the stage's short side */
  size: number;
  /** where the heart lands, in clip space (-1..1, +y up) */
  ox: number;
  oy: number;
  /** how much of the pipeline is drawn */
  stem: number;
};

const KEYS: Key[] = [
  { spin: 0.5, el: 26, size: 0.82, ox: 0, oy: 0.28, stem: 1 },
  { spin: 1.4, el: 88, size: 0.95, ox: 0, oy: 0, stem: 0 },
  { spin: 2.4, el: 20, size: 0.27, ox: 0, oy: 0.4, stem: 0.3 },
  { spin: 3.7, el: -26, size: 0.86, ox: 0, oy: -0.3, stem: 0.06 },
  { spin: 4.6, el: 22, size: 1.0, ox: 0.66, oy: 0.2, stem: 1 },
  { spin: 5.0, el: -74, size: 0.86, ox: 0, oy: 1.02, stem: 0.04 },
];
// Portrait stages move the funnel rather than squeezing the type.
const KEYS_TALL: Partial<Key>[] = [
  { size: 0.9, oy: 0.36 },
  { size: 0.8 },
  { size: 0.34, oy: 0.44 },
  { size: 0.95, oy: -0.2 },
  { size: 0.86, ox: 0.5, oy: 0.46 },
  { size: 0.96, oy: 1.0 },
];
const SCENES = KEYS.length;
const HOLD = 0.34;
const NAV = ["Cover", "Helix", "Types", "Stages", "Promise", "Contact"];

const keyAt = (coord: number, tall: boolean): Key => {
  const i = Math.max(0, Math.min(SCENES - 1, Math.floor(coord)));
  const j = Math.min(SCENES - 1, i + 1);
  const f = coord - i;
  const a = { ...KEYS[i], ...(tall ? KEYS_TALL[i] : {}) };
  const b = { ...KEYS[j], ...(tall ? KEYS_TALL[j] : {}) };
  const l = (x: number, y: number) => x + (y - x) * f;
  return { spin: l(a.spin, b.spin), el: l(a.el, b.el), size: l(a.size, b.size), ox: l(a.ox, b.ox), oy: l(a.oy, b.oy), stem: l(a.stem, b.stem) };
};

type M4 = Float32Array;
const perspective = (fovy: number, aspect: number, near: number, far: number): M4 => {
  const f = 1 / Math.tan(fovy / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
};
const lookAt = (eye: V3, at: V3): M4 => {
  const z = norm(sub(eye, at));
  const x = norm(cross([0, 1, 0], z));
  const y = cross(z, x);
  const m = new Float32Array(16);
  m[0] = x[0]; m[4] = x[1]; m[8] = x[2];
  m[1] = y[0]; m[5] = y[1]; m[9] = y[2];
  m[2] = z[0]; m[6] = z[1]; m[10] = z[2];
  m[12] = -dot(x, eye); m[13] = -dot(y, eye); m[14] = -dot(z, eye); m[15] = 1;
  return m;
};
const multiply = (a: M4, b: M4): M4 => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
};
const rotY = (t: number): M4 => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};
const rotX = (t: number): M4 => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};

const hexToLinear = (hex: string): V3 => {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return [0.05, 0.2, 1];
  const ch = (x: number) => Math.pow(x / 255, 2.2);
  return [ch((n >> 16) & 255), ch((n >> 8) & 255), ch(n & 255)];
};

const VERT = `
attribute vec3 a_pos;
attribute vec3 a_nrm;
attribute vec4 a_aux;
attribute vec3 a_base;
uniform mat4 u_vp;
uniform mat4 u_model;
uniform vec2 u_offset;
uniform float u_time;
uniform float u_bloom;
uniform float u_sway;
uniform float u_stem;
varying vec3 v_n;
varying vec3 v_w;
varying float v_s;
varying float v_k;
void main() {
  vec3 p = a_pos;
  float k = a_aux.z;
  if (k < 1.5) {
    float g = clamp(u_bloom * 1.6 - a_aux.w * 0.6, 0.0, 1.0);
    g = 1.0 - pow(1.0 - g, 3.0);
    p = a_base + (p - a_base) * g;
    float amp = (k < 0.5 ? 0.0 : 0.05) * u_sway * a_aux.x * a_aux.x;
    p += amp * vec3(sin(u_time * 0.9 + a_aux.y), 0.5 * sin(u_time * 1.3 + a_aux.y * 1.7), cos(u_time * 0.7 + a_aux.y * 1.3));
  } else if (p.y < 0.0) {
    p.y *= u_stem;
  }
  vec4 w = u_model * vec4(p, 1.0);
  v_w = w.xyz;
  v_n = (u_model * vec4(a_nrm, 0.0)).xyz;
  v_s = a_aux.x;
  v_k = a_aux.z;
  gl_Position = u_vp * w;
  gl_Position.xy += u_offset * gl_Position.w;
}
`;

// Cobalt chrome: almost no diffuse, everything is the reflection of a dark studio
// with one overhead softbox, a tall side strip and a back rim, tinted cobalt and
// running to icy white only where the highlight is hottest.
const FRAG = `
precision highp float;
uniform vec3 u_eye;
uniform vec3 u_tint;
uniform vec3 u_hot;
uniform float u_alpha;
varying vec3 v_n;
varying vec3 v_w;
varying float v_s;
varying float v_k;
float studio(vec3 r) {
  float key = pow(max(dot(r, normalize(vec3(-0.45, 0.85, 0.35))), 0.0), 14.0) * 2.6;
  float strip = smoothstep(0.55, 0.8, r.x) * smoothstep(-0.7, 0.3, r.y) * 1.4;
  float rim = smoothstep(0.55, 0.95, -r.z) * smoothstep(-0.2, 0.5, r.y) * 0.9;
  float hz = exp(-abs(r.y - 0.05) * 7.0) * 0.4;
  return key + strip + rim + hz;
}
void main() {
  vec3 n = normalize(v_n);
  vec3 v = normalize(u_eye - v_w);
  if (dot(n, v) < 0.0) n = -n;
  vec3 r = reflect(-v, n);
  float e = studio(r);
  float fr = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  float dif = max(dot(n, normalize(vec3(-0.3, 0.8, 0.6))), 0.0);
  vec3 col = u_tint * (0.04 + 0.22 * dif);
  col += u_tint * e * 1.15;
  col += u_hot * pow(e, 3.0) * 0.3;
  col += u_tint * fr * 1.1;
  col *= 0.8 + 0.2 * smoothstep(0.0, 0.25, v_s);
  if (v_k > 0.5 && v_k < 1.5) col += u_hot * smoothstep(0.86, 0.97, v_s) * 1.4;
  col = col / (1.0 + col);
  col = pow(col, vec3(1.0 / 2.2));
  gl_FragColor = vec4(col * u_alpha, u_alpha);
}
`;

/* ------------------------------ SCENE STYLES ------------------------------ */

const DISPLAY = pop.style.fontFamily;
const SANS = rob.style.fontFamily;

const SCENE_CSS =
  ".wd-stage{container-type:size;container-name:wd}" +
  ".wd-char{display:inline-block;animation:wd-in 1.3s cubic-bezier(.2,.8,.2,1) both}" +
  "@keyframes wd-in{from{opacity:0;transform:translateY(0.35em) rotate(4deg);filter:blur(10px)}to{opacity:1;transform:none;filter:blur(0)}}" +
  ".wd-ch{display:block;width:100%;background:none;border:0;padding:0;color:inherit;font:inherit;text-align:inherit;cursor:pointer;transition:color .25s,transform .35s cubic-bezier(.2,.8,.2,1)}" +
  ".wd-ch:hover,.wd-ch:focus-visible,.wd-ch[aria-pressed=true]{color:var(--wd-hi);transform:translateX(0.18em)}" +
  ".wd-r .wd-ch:hover,.wd-r .wd-ch:focus-visible,.wd-r .wd-ch[aria-pressed=true]{transform:translateX(-0.18em)}" +
  ".wd-ch:focus-visible{outline:2px solid var(--wd-hi);outline-offset:4px}" +
  ".wd-nav{display:flex;flex-direction:column;gap:18px;align-items:flex-end;padding:14px 12px;border-radius:999px;background:rgba(5,14,31,.55);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px)}" +
  ".wd-rail,.wd-rail-fill{position:absolute;right:16px;top:24px;bottom:24px;width:1px;background:rgba(255,255,255,.18)}" +
  ".wd-rail-fill{background:var(--wd-hi);transform-origin:top;transform:scaleY(var(--wp,0))}" +
  ".wd-nav button{position:relative;display:flex;align-items:center;gap:10px;background:none;border:0;padding:0;cursor:pointer;color:rgba(255,255,255,.55);font:inherit;transition:color .3s}" +
  ".wd-nav button:hover,.wd-nav button[aria-current=step]{color:#fff}" +
  ".wd-lab{max-width:0;overflow:hidden;white-space:nowrap;opacity:0;transition:max-width .45s cubic-bezier(.2,.8,.2,1),opacity .3s}" +
  ".wd-nav button:hover .wd-lab,.wd-nav button:focus-visible .wd-lab,.wd-nav button[aria-current=step] .wd-lab{max-width:90px;opacity:1}" +
  ".wd-num{font-variant-numeric:tabular-nums;opacity:.7}" +
  ".wd-dot{position:relative;z-index:1;width:7px;height:7px;border-radius:50%;border:1px solid currentColor;background:#05080f;transition:background-color .3s,box-shadow .3s,border-color .3s}" +
  ".wd-nav button[aria-current=step] .wd-dot{background:var(--wd-hi);border-color:var(--wd-hi);box-shadow:0 0 0 4px rgba(47,123,255,.25),0 0 14px var(--wd-hi)}" +
  ".wd-nav button:focus-visible{outline:2px solid var(--wd-hi);outline-offset:4px;border-radius:6px}" +
  ".wd-cue{display:block;width:1px;height:34px;background:linear-gradient(var(--wd-hi),transparent);transform-origin:top;animation:wd-cue 1.9s ease-in-out infinite}" +
  "@keyframes wd-cue{0%{transform:scaleY(0);opacity:1}55%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:0}}" +
  "@container wd (orientation: portrait){.wd-bloom{left:7cqw!important;top:auto!important;bottom:13cqh}" +
  ".wd-fin{flex-direction:column!important;gap:4cqh!important;top:44cqh!important}" +
  ".wd-spec{grid-template-columns:1fr 1fr!important}.wd-spec-mid{display:none!important}}" +
  "@container wd (max-width: 720px){.wd-hide-sm{display:none!important}}" +
  "@container wd (max-width: 1020px){.wd-hide-md{display:none!important}}" +
  "@media (prefers-reduced-motion: reduce){.wd-char{animation:none}.wd-cue{animation:none}.wd-ch{transition:none}}";

type Fx = "rise" | "clip" | "line" | "fade" | "draw";

/** Everything that belongs to one frame registers itself through this. */
const sc = (scene: number, fx: Fx = "rise", delay = 0) => ({ "data-sc": scene, "data-fx": fx, "data-d": delay });

/** The five rising bars from the Devntom logo, drawn as the studio mark. */
function Mark({ color, accent }: { color: string; accent: string }) {
  const bars = [10, 18, 26, 16, 22];
  return (
    <svg width="30" height="32" viewBox="0 0 26 28" aria-hidden style={{ flex: "none" }}>
      {bars.map((h, i) => (
        <rect key={i} x={i * 5.6} y={28 - h} width="3.6" height={h} rx="1.2" fill={i === 2 ? accent : color} />
      ))}
    </svg>
  );
}

/* ------------------------------ SCENE ------------------------------ */

function WebsiteScene() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const glowCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const glowRef = React.useRef<HTMLDivElement | null>(null);
  const wordRef = React.useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [inspect, setInspect] = React.useState<number | null>(null);

  const letters = Array.from(NAME);
  const firstIdx = 0;
  const lastIdx = letters.length - 1;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const look = React.useRef({ reduced });
  look.current = { reduced };

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const gcv = glowCanvasRef.current;
    const glow = glowRef.current;
    const word = wordRef.current;
    if (!root || !stage || !canvas || !gcv || !glow || !word) return;

    const { curves, radius } = buildCurves(6, 7);
    const mesh = buildMesh(curves);
    const gctx = gcv.getContext("2d");
    // the glowing beads: the free end of every rung
    const glowPts = curves.filter((c) => c.kind === 1 && c.bulb).map((c) => ({ p: c.pts[c.pts.length - 1], b: c.base, st: c.stagger }));

    // ---- GL, with a 2D fallback -------------------------------------------
    let gl: WebGLRenderingContext | null = null;
    let ctx2d: CanvasRenderingContext2D | null = null;
    let prog: WebGLProgram | null = null;
    let vbo: WebGLBuffer | null = null;
    let ibo: WebGLBuffer | null = null;
    const loc: Record<string, WebGLUniformLocation | null> = {};

    const initGL = () => {
      gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true }) as WebGLRenderingContext | null;
      if (!gl) return false;
      const compile = (type: number, src: string) => {
        const sh = gl!.createShader(type)!;
        gl!.shaderSource(sh, src);
        gl!.compileShader(sh);
        return gl!.getShaderParameter(sh, gl!.COMPILE_STATUS) ? sh : null;
      };
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return false;
      prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
      gl.useProgram(prog);
      vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, mesh.data, gl.STATIC_DRAW);
      ibo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.index, gl.STATIC_DRAW);
      const attr = (n: string, size: number, off: number) => {
        const a = gl!.getAttribLocation(prog!, n);
        if (a < 0) return;
        gl!.enableVertexAttribArray(a);
        gl!.vertexAttribPointer(a, size, gl!.FLOAT, false, STRIDE * 4, off * 4);
      };
      attr("a_pos", 3, 0);
      attr("a_nrm", 3, 3);
      attr("a_aux", 4, 6);
      attr("a_base", 3, 10);
      for (const n of ["u_vp", "u_model", "u_offset", "u_time", "u_bloom", "u_sway", "u_stem", "u_eye", "u_tint", "u_hot", "u_alpha"]) loc[n] = gl.getUniformLocation(prog, n);
      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(0, 0, 0, 0);
      return true;
    };
    if (!initGL()) {
      gl = null;
      ctx2d = canvas.getContext("2d");
    }
    const onLost = (e: Event) => {
      e.preventDefault();
      gl = null;
    };
    const onRestored = () => {
      if (!initGL()) gl = null;
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    // ---- measuring ---------------------------------------------------------
    let W = 1;
    let H = 1;
    let dpr = 1;
    const chars = Array.from(word.querySelectorAll<HTMLElement>("[data-ch]"));
    let nat: { x: number; y: number; w: number }[] = [];
    const measure = () => {
      const sr = stage.getBoundingClientRect();
      W = Math.max(1, sr.width);
      H = Math.max(1, sr.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(W * dpr);
      const ch = Math.round(H * dpr);
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      if (gcv.width !== cw || gcv.height !== ch) {
        gcv.width = cw;
        gcv.height = ch;
      }
      const saved = chars.map((c) => c.style.transform);
      chars.forEach((c) => (c.style.transform = "none"));
      nat = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2 - sr.left, y: r.top + r.height / 2 - sr.top, w: r.width };
      });
      chars.forEach((c, i) => (c.style.transform = saved[i]));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    measure();
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    const onFonts = () => measure();
    fonts?.addEventListener?.("loadingdone", onFonts);
    fonts?.ready.then(onFonts);

    // ---- frame elements -----------------------------------------------------
    const items = Array.from(stage.querySelectorAll<HTMLElement>("[data-sc]")).map((el) => ({
      el,
      scene: Number(el.dataset.sc),
      fx: el.dataset.fx as Fx,
      delay: Number(el.dataset.d) || 0,
      last: -1,
    }));

    // ---- input ----------------------------------------------------------------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let spin = 0;
    let spinVel = 0;
    let drag: { id: number; x: number } | null = null;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (drag && drag.id === e.pointerId) {
        spinVel += (e.clientX - drag.x) * 0.0022;
        drag.x = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const t = e.target as HTMLElement;
      if (t.closest("a,button")) return;
      drag = { id: e.pointerId, x: e.clientX };
      stage.style.cursor = "grabbing";
    };
    const onUp = () => {
      drag = null;
      stage.style.cursor = "";
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // ---- loop -------------------------------------------------------------------
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    const born = last;
    let time = 0;
    let prog01 = -1;
    let shownScene = -1;
    const tint = hexToLinear(COBALT_HI);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const L = look.current;
      const moving = !L.reduced;
      if (moving) time += dt;

      const r = root.getBoundingClientRect();
      const p = progressFrom(r.top, r.height, H);
      prog01 = prog01 < 0 || L.reduced ? p : prog01 + (p - prog01) * (1 - Math.exp(-dt * 9));
      const coord = sceneCoord(prog01, SCENES, HOLD);
      stage.style.setProperty("--wp", prog01.toFixed(4));
      const scene = Math.round(coord);
      if (scene !== shownScene) {
        shownScene = scene;
        setActive(scene);
      }

      // camera
      const tall = H > W * 1.05;
      const k = keyAt(coord, tall);
      pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 4));
      pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 4));
      if (moving) {
        spin += spinVel + dt * 0.1;
        spinVel *= Math.exp(-dt * 3);
      } else {
        spin += spinVel;
        spinVel = 0;
      }
      const px = moving ? pointer.x : 0;
      const py = moving ? pointer.y : 0;
      const fov = (30 * Math.PI) / 180;
      const minDim = Math.min(W, H);
      const dist = (radius * H) / (k.size * minDim * Math.tan(fov / 2));
      const el = Math.max(-88, Math.min(88, k.el + py * 9)) * (Math.PI / 180);
      const eye: V3 = [HEART[0], HEART[1] + Math.sin(el) * dist, HEART[2] + Math.cos(el) * dist];
      const proj = perspective(fov, W / H, Math.max(0.05, dist - 6), dist + 8);
      const vp = multiply(proj, lookAt(eye, HEART));
      const model = multiply(rotY(k.spin + spin + px * 0.35), rotX(py * 0.05));
      const bloom = L.reduced ? 1 : clamp01((now - born) / 2600);

      // the cobalt haze behind the helix tracks where its heart lands
      const gx = (0.5 + k.ox / 2) * W;
      const gy = (0.5 - k.oy / 2) * H;
      const gr = k.size * minDim * 1.25;
      glow.style.transform = "translate(" + (gx - gr).toFixed(1) + "px," + (gy - gr).toFixed(1) + "px)";
      glow.style.width = glow.style.height = (gr * 2).toFixed(1) + "px";

      if (gl && prog) {
        const g = gl;
        g.viewport(0, 0, canvas.width, canvas.height);
        g.clear(g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
        g.uniformMatrix4fv(loc.u_vp, false, vp);
        g.uniformMatrix4fv(loc.u_model, false, model);
        g.uniform2f(loc.u_offset, k.ox, k.oy);
        g.uniform1f(loc.u_time, time);
        g.uniform1f(loc.u_bloom, bloom);
        g.uniform1f(loc.u_sway, moving ? 1 : 0);
        g.uniform1f(loc.u_stem, k.stem);
        g.uniform3f(loc.u_eye, eye[0], eye[1], eye[2]);
        g.uniform3f(loc.u_tint, tint[0] * 2.2, tint[1] * 2.2, tint[2] * 2.2);
        g.uniform3f(loc.u_hot, 0.6, 0.8, 1.0);
        g.uniform1f(loc.u_alpha, 1);
        g.drawElements(g.TRIANGLES, mesh.index.length, g.UNSIGNED_SHORT, 0);
      } else if (ctx2d) {
        // No WebGL: the same curves, projected and stroked.
        const c = ctx2d;
        const mvp = multiply(vp, model);
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.clearRect(0, 0, W, H);
        c.lineCap = "round";
        c.strokeStyle = COBALT_HI;
        c.shadowColor = COBALT_HI;
        c.shadowBlur = 12;
        for (const cv of curves) {
          c.beginPath();
          cv.pts.forEach((q, i) => {
            const y = cv.kind === 2 && q[1] < 0 ? q[1] * k.stem : q[1];
            const cx = mvp[0] * q[0] + mvp[4] * y + mvp[8] * q[2] + mvp[12];
            const cy = mvp[1] * q[0] + mvp[5] * y + mvp[9] * q[2] + mvp[13];
            const cw = mvp[3] * q[0] + mvp[7] * y + mvp[11] * q[2] + mvp[15];
            const sx = ((cx / cw + k.ox) * 0.5 + 0.5) * W;
            const sy = (0.5 - (cy / cw + k.oy) * 0.5) * H;
            if (i === 0) c.moveTo(sx, sy);
            else c.lineTo(sx, sy);
          });
          c.lineWidth = cv.kind === 0 ? (minDim * k.size) / 40 : cv.kind === 1 ? 1.2 : 3;
          c.stroke();
        }
      }

      // ---- the glow: a soft additive halo on each bead -----------------------
      if (gctx) {
        gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gctx.clearRect(0, 0, W, H);
        gctx.globalCompositeOperation = "lighter";
        const mv = multiply(vp, model);
        const unit = (minDim * k.size * 0.5) / FIT_RADIUS;
        glowPts.forEach((q, i) => {
          let g = clamp01(bloom * 1.6 - q.st * 0.6);
          g = 1 - Math.pow(1 - g, 3);
          if (g <= 0.03) return;
          const x = q.b[0] + (q.p[0] - q.b[0]) * g;
          const y = q.b[1] + (q.p[1] - q.b[1]) * g;
          const z = q.b[2] + (q.p[2] - q.b[2]) * g;
          const cw = mv[3] * x + mv[7] * y + mv[11] * z + mv[15];
          if (cw <= 0.01) return;
          const cx = mv[0] * x + mv[4] * y + mv[8] * z + mv[12];
          const cy = mv[1] * x + mv[5] * y + mv[9] * z + mv[13];
          const sx = ((cx / cw + k.ox) * 0.5 + 0.5) * W;
          const sy = (0.5 - (cy / cw + k.oy) * 0.5) * H;
          const pulse = moving ? 0.84 + 0.16 * Math.sin(time * 1.8 + i * 1.7) : 1;
          const rad = Math.max(2, unit * 0.17 * (dist / cw) * pulse * g);
          const far = clamp01((cw - (dist - FIT_RADIUS)) / (2 * FIT_RADIUS));
          gctx.globalAlpha = (1 - 0.6 * far) * g;
          const gr = gctx.createRadialGradient(sx, sy, 0, sx, sy, rad);
          gr.addColorStop(0, "rgba(240,247,255,0.95)");
          gr.addColorStop(0.12, "rgba(150,195,255,0.6)");
          gr.addColorStop(0.4, "rgba(47,123,255,0.2)");
          gr.addColorStop(1, "rgba(47,123,255,0)");
          gctx.fillStyle = gr;
          gctx.beginPath();
          gctx.arc(sx, sy, rad, 0, Math.PI * 2);
          gctx.fill();
        });
        gctx.globalAlpha = 1;
        gctx.globalCompositeOperation = "source-over";
      }

      // ---- the type ---------------------------------------------------------
      const still = L.reduced;
      for (const it of items) {
        const v = reveal(coord, it.scene, it.delay);
        const q = Math.round(v * 500) / 500;
        if (q === it.last) continue;
        it.last = q;
        const s = it.el.style;
        const dir = coord < it.scene ? 1 : -1;
        s.visibility = q <= 0 ? "hidden" : "";
        if (it.fx === "draw") {
          s.setProperty("--v", String(q));
          s.opacity = String(Math.min(1, q * 3));
          continue;
        }
        if (it.fx === "line") {
          s.transform = "scaleX(" + q + ")";
          s.opacity = String(Math.min(1, q * 2));
          continue;
        }
        s.opacity = String(q);
        if (still || it.fx === "fade") continue;
        if (it.fx === "clip") {
          const hid = ((1 - q) * 100).toFixed(1);
          s.clipPath = dir > 0 ? "inset(0 0 " + hid + "% 0)" : "inset(" + hid + "% 0 0 0)";
          s.transform = "translateY(" + ((1 - q) * 0.4 * dir).toFixed(3) + "em)";
        } else {
          s.transform = "translateY(" + ((1 - q) * 34 * dir).toFixed(1) + "px)";
          s.filter = q > 0.995 ? "" : "blur(" + ((1 - q) * 8).toFixed(1) + "px)";
        }
      }

      // The cover word morphs into the helix view: its first and last letters slide
      // out to flank the mouth, the rest fall into it.
      const m = easeInOut(clamp01(coord));
      const out = clamp01(coord - 1);
      const r1 = keyAt(1, tall).size * minDim * 0.5 * (TOP_R / FIT_RADIUS);
      const cy1 = (0.5 - keyAt(1, tall).oy / 2) * H;
      chars.forEach((c, i) => {
        const n0 = nat[i];
        if (!n0) return;
        const flank = i === firstIdx || i === lastIdx;
        if (flank && firstIdx !== lastIdx) {
          const side = i === firstIdx ? -1 : 1;
          const lw = n0.w;
          const tx = W / 2 + side * (r1 + lw * 0.55 + minDim * 0.02);
          const dx = (tx - n0.x) * m;
          const dy = (cy1 - n0.y) * m - out * 60;
          const o = coord < 1 ? 1 : 1 - smoothstep(0.1, 0.45, out);
          c.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
          c.style.opacity = String(o);
          c.style.filter = still || out < 0.05 ? "" : "blur(" + (out * 14).toFixed(1) + "px)";
        } else {
          const dx = (W / 2 - n0.x) * m * 0.75;
          const dy = (cy1 - n0.y) * m;
          const o = 1 - smoothstep(0.0, 0.4, m);
          c.style.transform = still ? "" : "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px) scale(" + (1 - m * 0.7).toFixed(3) + ")";
          c.style.opacity = String(o);
          c.style.filter = still || m < 0.02 ? "" : "blur(" + (m * 12).toFixed(1) + "px)";
        }
        c.style.visibility = coord > 1.6 ? "hidden" : "";
      });
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      fonts?.removeEventListener?.("loadingdone", onFonts);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      const g = gl as WebGLRenderingContext | null;
      if (g) {
        g.deleteBuffer(vbo);
        g.deleteBuffer(ibo);
        g.deleteProgram(prog);
      }
    };
  }, [firstIdx, lastIdx]);

  const jump = (i: number) => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const r = root.getBoundingClientRect();
    const travel = r.height - stage.clientHeight;
    const delta = (i / (SCENES - 1)) * travel + r.top;
    window.scrollBy({ top: delta, behavior: reduced ? "auto" : "smooth" });
  };

  const display: React.CSSProperties = { fontFamily: DISPLAY, fontWeight: 300 };
  const sans: React.CSSProperties = { fontFamily: SANS };
  const hidden: React.CSSProperties = { opacity: 0 };
  const dotted = "Lahore·Riyadh·London".split("·");

  const typeList = (items: [string, string][], offset: number, side: "l" | "r") => (
    <div className={"relative flex flex-col gap-[1.6cqh] " + (side === "r" ? "wd-r items-end text-right" : "")}>
      {items.map(([n], i) => {
        const id = offset + i;
        return (
          <div key={n} {...sc(2, "clip", 0.1 + i * 0.12)} style={{ ...hidden, width: "100%" }}>
            <button
              type="button"
              className="wd-ch"
              aria-pressed={inspect === id}
              onPointerEnter={() => setInspect(id)}
              onPointerLeave={() => setInspect(null)}
              onFocus={() => setInspect(id)}
              onBlur={() => setInspect(null)}
              onClick={() => setInspect((v) => (v === id ? null : id))}
              style={{ fontSize: "min(4.6cqw, 6cqh)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              {n}
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{ height: "calc(100svh * " + (1 + (SCENES - 1) * 1.2).toFixed(3) + ")", background: BLACK }}
      aria-label="Website development, explained in six frames"
    >
      <style>{SCENE_CSS}</style>
      <div
        ref={stageRef}
        className="wd-stage sticky top-0 w-full overflow-hidden select-none"
        style={{ height: "100svh", color: WHITE, background: BLACK, textShadow: "0 2px 28px rgba(2,5,11,.6)", ["--wd-hi" as string]: COBALT_TEXT } as React.CSSProperties}
      >
        {/* navy bleed at the edges */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 45%, " + NAVY + " 100%)" }} />
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 rounded-full"
          style={{ background: "radial-gradient(closest-side, " + COBALT + "66, " + COBALT + "1f 45%, transparent 100%)", willChange: "transform" }}
        />
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block" style={{ width: "100%", height: "100%", maxWidth: "none" }} />
        <canvas ref={glowCanvasRef} aria-hidden className="pointer-events-none absolute inset-0 block" style={{ width: "100%", height: "100%", maxWidth: "none" }} />

        {/* ================================ 0 · cover ================================ */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute flex items-start justify-between gap-6" style={{ left: "5cqw", right: "5cqw", top: "max(5cqh, 96px)" }}>
            <div {...sc(0, "clip", 0)} style={{ ...display, ...hidden, fontSize: "clamp(20px, 3.3cqw, 46px)", lineHeight: 0.92, letterSpacing: "-0.02em", textTransform: "uppercase" }}>
              Website
              <br />
              Development
            </div>
            <p {...sc(0, "rise", 0.2)} className="wd-hide-md" style={{ ...sans, ...hidden, maxWidth: "25cqw", fontSize: "clamp(11px, 1cqw, 14px)", lineHeight: 1.5, margin: 0, fontWeight: 300, color: "#DCE7FB" }}>
              Stunning, responsive, high-performance websites optimised for speed, security and scalability, from company sites to e-commerce.
            </p>
            <ul {...sc(0, "rise", 0.35)} className="wd-hide-md" style={{ ...sans, ...hidden, listStyle: "none", margin: 0, padding: 0, fontSize: "clamp(11px, 1cqw, 14px)", lineHeight: 1.6, fontWeight: 300, color: "#DCE7FB" }}>
              {SPECS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div {...sc(0, "clip", 0.5)} className="wd-hide-sm" style={{ ...display, ...hidden, fontSize: "clamp(18px, 2.6cqw, 38px)", lineHeight: 0.95, textAlign: "right", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Fast
              <br />
              Secure
              <br />
              Scalable
            </div>
          </div>

          <div ref={wordRef} aria-hidden className="absolute whitespace-nowrap" style={{ ...display, fontWeight: 200, left: "50%", top: "61%", transform: "translate(-50%, -50%)", fontSize: "min(21cqw, 33cqh)", lineHeight: 1 }}>
            <span {...sc(0, "rise", 0.6)} style={{ ...hidden, ...sans, position: "absolute", right: "0.04em", bottom: "84%", fontSize: "0.12em", letterSpacing: "0.3em", textTransform: "uppercase", color: COBALT_TEXT }}>
              Service
            </span>
            <div style={{ margin: 0, font: "inherit", letterSpacing: "-0.05em" }}>
              {letters.map((c, i) => (
                <span key={i} data-ch className="inline-block" style={{ willChange: "transform" }}>
                  <span className="wd-char" style={{ animationDelay: 0.15 + i * 0.07 + "s" }}>
                    {c}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div {...sc(0, "fade", 0.8)} aria-hidden className="absolute flex flex-col items-center gap-2" style={{ ...sans, ...hidden, left: "50%", bottom: "4cqh", transform: "translateX(-50%)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Scroll
            <span className="wd-cue" />
          </div>

          <div className="absolute flex items-end justify-between gap-6" style={{ left: "5cqw", right: "5cqw", bottom: "5cqh" }}>
            <div {...sc(0, "rise", 0.3)} className="flex items-center gap-3" style={hidden}>
              <Mark color={WHITE} accent={COBALT_HI} />
              <span style={{ ...sans, fontSize: 9, lineHeight: 1.3, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid " + WHITE + "80", paddingBottom: 6, paddingRight: "6cqw" }}>
                Website development by
                <br />
                Devntom Solutions
              </span>
            </div>
            <div {...sc(0, "rise", 0.5)} className="wd-hide-sm flex gap-5" style={{ ...sans, ...hidden, color: COBALT_TEXT, fontSize: 8, lineHeight: 1.3, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <span>Service<br />Website development</span>
              <span>Approach<br />Performance first</span>
              <span>Offices<br />Lahore, Riyadh, London</span>
              <span>Process<br />Six phases</span>
            </div>
          </div>
        </div>

        {/* ================================ 1 · helix ================================ */}
        <div className="pointer-events-none absolute inset-0">
          <div {...sc(1, "fade", 0.5)} className="absolute" style={{ ...display, ...hidden, left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(10px, 1.1cqw, 14px)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {NAME}
          </div>
          <div {...sc(1, "rise", 0.7)} className="absolute" style={{ ...sans, ...hidden, left: "5cqw", bottom: "5cqh", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            <span style={{ color: COBALT_TEXT }}>02</span> — The helix, from above
          </div>
          <p {...sc(1, "rise", 0.85)} className="wd-hide-sm absolute" style={{ ...sans, ...hidden, right: "5cqw", bottom: "5cqh", margin: 0, maxWidth: "24cqw", fontSize: 11, lineHeight: 1.5, textAlign: "right", fontWeight: 300, color: "#DCE7FB" }}>
            Clean code at the core of every site.
          </p>
        </div>

        {/* ============================== 2 · types ============================== */}
        <div className="pointer-events-none absolute inset-0" style={display}>
          <div className="wd-spec pointer-events-auto absolute grid items-center" style={{ left: "6cqw", right: "6cqw", top: "max(12cqh, 100px)", bottom: "20cqh", gridTemplateColumns: "1fr min(30cqw, 34cqh) 1fr", columnGap: "2cqw" }}>
            {typeList(TYPES.slice(0, 4), 0, "l")}
            <div className="wd-spec-mid relative h-full text-center">
              <div {...sc(2, "rise", 0.35)} className="absolute w-full" style={{ ...hidden, top: "58%", fontSize: "min(2.2cqw, 3cqh)", lineHeight: 1, letterSpacing: "0.2em", textTransform: "uppercase", color: COBALT_TEXT }}>
                {NAME} types
              </div>
              <div {...sc(2, "rise", 0.45)} className="absolute w-full" style={{ ...hidden, top: "68%", lineHeight: 1.1 }} aria-live="polite">
                {inspect === null ? (
                  <div style={{ ...sans, fontSize: 9, letterSpacing: "0.25em", opacity: 0.7 }}>HOVER OR TAP A TYPE</div>
                ) : (
                  <>
                    <div style={{ fontSize: "min(3.6cqw, 5cqh)", color: COBALT_TEXT, letterSpacing: "-0.03em" }}>{TYPES[inspect][0]}</div>
                    <div style={{ ...sans, fontSize: "clamp(11px, 1.05cqw, 14px)", lineHeight: 1.5, fontWeight: 300, color: "#DCE7FB", marginTop: "1.2cqh" }}>{TYPES[inspect][1]}</div>
                  </>
                )}
              </div>
            </div>
            {typeList(TYPES.slice(4), 4, "r")}
          </div>
          <div {...sc(2, "line", 0.5)} className="absolute" style={{ ...hidden, left: "6cqw", right: "6cqw", bottom: "15.5cqh", height: 1, background: WHITE + "40", transformOrigin: "left" }} />
          <div {...sc(2, "rise", 0.6)} className="absolute text-center" style={{ ...sans, ...hidden, left: "6cqw", right: "6cqw", bottom: "8cqh", fontSize: "clamp(11px, 1.3cqw, 17px)", letterSpacing: "0.04em", fontWeight: 300, color: "#DCE7FB" }}>
            Design, code and content, built as one system and ready to grow.
          </div>
        </div>

        {/* ================================ 3 · stages ================================ */}
        <div className="pointer-events-none absolute inset-0" style={display}>
          <div className="absolute text-center" style={{ left: "50%", top: "max(13cqh, 104px)", transform: "translateX(-50%)", fontSize: "min(16cqw, 12.5cqh)", lineHeight: 0.92, textTransform: "uppercase", whiteSpace: "nowrap", letterSpacing: "-0.04em" }}>
            <span {...sc(3, "fade", 0.3)} style={{ ...hidden, ...sans, position: "absolute", right: "100%", top: "0.35em", fontSize: "0.1em", marginRight: "1.2em", textTransform: "none", letterSpacing: "0.04em" }}>{NAME}</span>
            <span {...sc(3, "fade", 0.4)} style={{ ...hidden, ...sans, position: "absolute", left: "100%", top: "0.35em", fontSize: "0.1em", marginLeft: "1.2em", textTransform: "none", letterSpacing: "0.04em" }}>Process</span>
            <div {...sc(3, "clip", 0)} style={hidden}>Design</div>
            <div {...sc(3, "clip", 0.15)} style={hidden}>Develop</div>
            <div {...sc(3, "clip", 0.3)} style={hidden}>Launch</div>
          </div>
          <div className="absolute flex justify-center" style={{ left: 0, right: 0, bottom: "5cqh" }}>
            <div {...sc(3, "rise", 0.6)} style={{ ...sans, ...hidden, fontSize: 9, letterSpacing: "0.9em", textTransform: "uppercase", whiteSpace: "nowrap", paddingLeft: "0.9em" }}>Devntom Solutions</div>
          </div>
        </div>

        {/* ================================ 4 · promise ================================ */}
        <div className="pointer-events-none absolute inset-0" style={display}>
          <div className="wd-bloom absolute" style={{ left: "9cqw", top: "34cqh", fontSize: "min(9.5cqw, 13cqh)", lineHeight: 0.84, letterSpacing: "-0.04em" }}>
            {TAGLINE.map((t, i) => (
              <div
                key={i}
                {...sc(4, "clip", i * 0.14)}
                style={{
                  ...hidden,
                  fontSize: t.small ? "0.4em" : undefined,
                  lineHeight: t.small ? 1.1 : undefined,
                  marginLeft: t.small ? (i < 2 ? "5.2em" : "4.2em") : i > 1 ? "0.45em" : 0,
                  marginTop: t.small ? "-0.1em" : 0,
                  marginBottom: t.small ? "0.25em" : 0,
                  letterSpacing: t.small ? "0" : undefined,
                }}
              >
                {t.text}
              </div>
            ))}
            <div {...sc(4, "rise", 0.7)} style={{ ...sans, ...hidden, fontSize: 9, letterSpacing: "0.25em", marginTop: "3cqh", opacity: 0.8, textTransform: "uppercase" }}>
              Performance first, polish second
            </div>
          </div>
        </div>

        {/* ================================ 5 · contact ================================ */}
        <div className="pointer-events-none absolute inset-0" style={display}>
          <div className="wd-fin absolute flex items-center justify-around" style={{ left: "4cqw", right: "4cqw", top: "50cqh" }}>
            <div className="pointer-events-auto relative text-center">
              <div {...sc(5, "fade", 0.1)} style={{ ...sans, ...hidden, fontSize: "clamp(10px, 1cqw, 13px)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.2cqh", color: COBALT_TEXT }}>
                Ready when you are
              </div>
              <a
                href="#contact-form"
                {...sc(5, "clip", 0)}
                className="relative block"
                style={{ ...hidden, color: "inherit", textDecoration: "none", fontSize: "min(10cqw, 13cqh)", lineHeight: 1, letterSpacing: "-0.04em", whiteSpace: "nowrap" }}
              >
                Let&apos;s build
                <svg
                  {...sc(5, "draw", 0.2)}
                  aria-hidden
                  viewBox="0 0 100 100"
                  style={{ ...hidden, position: "absolute", left: "calc(100% + 0.65em)", top: "50%", width: "0.95em", height: "0.95em", transform: "translate(-50%,-48%)", overflow: "visible", pointerEvents: "none" }}
                >
                  <circle cx="50" cy="50" r="48" fill="none" stroke={COBALT_HI} strokeWidth="1.1" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: "calc(1 - var(--v, 0))" } as React.CSSProperties} />
                  <circle cx="50" cy="50" r="30" fill="none" stroke={COBALT_HI} strokeWidth="1.1" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: "calc(1 - var(--v, 0))" } as React.CSSProperties} />
                  <path d="M0 50H100M50 0V100" fill="none" stroke={COBALT_HI} strokeWidth="1.1" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: "calc(1 - var(--v, 0))" } as React.CSSProperties} />
                </svg>
              </a>
              <div {...sc(5, "rise", 0.4)} className="flex justify-center gap-[3cqw]" style={{ ...hidden, marginTop: "3.4cqh" }}>
                {STATS.map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "min(3.2cqw, 4.4cqh)", letterSpacing: "-0.03em" }}>{n}</div>
                    <div style={{ ...sans, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div {...sc(5, "fade", 0.6)} style={{ ...sans, ...hidden, fontSize: 9, marginTop: "1.4cqh", opacity: 0.6 }}>
                Company-wide figures, updated quarterly
              </div>
            </div>
            <div className="pointer-events-auto relative">
              <div {...sc(5, "fade", 0.3)} style={{ ...sans, ...hidden, fontSize: "clamp(10px, 1cqw, 13px)", letterSpacing: "0.2em", textTransform: "uppercase", color: COBALT_TEXT }}>Offices</div>
              <div {...sc(5, "clip", 0.35)} style={{ ...hidden, fontSize: "min(6cqw, 9cqh)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
                {dotted.map((part, i) => (
                  <div key={part}>
                    {part}
                    {i < dotted.length - 1 && <span style={{ color: COBALT_HI }}></span>}
                  </div>
                ))}
              </div>
              <div {...sc(5, "fade", 0.5)} style={{ ...sans, ...hidden, fontSize: "clamp(10px, 1cqw, 13px)", opacity: 0.75 }}>Serving clients worldwide</div>
            </div>
          </div>

          <div {...sc(5, "rise", 0.75)} className="pointer-events-auto absolute flex items-center justify-between gap-4" style={{ ...sans, ...hidden, left: "5cqw", right: "5cqw", bottom: "4.5cqh", fontSize: "clamp(10px, 1.4cqw, 18px)", letterSpacing: "0.04em", color: WHITE }}>
            <a href="mailto:info@devntomsolutions.com" style={{ color: "inherit", textDecoration: "none", whiteSpace: "nowrap" }}>INFO@DEVNTOMSOLUTIONS.COM</a>
            <Mark color={COBALT_HI} accent={WHITE} />
            <a href="https://wa.me/923256036838" style={{ color: "inherit", textDecoration: "none", whiteSpace: "nowrap" }}>WHATSAPP +92 325 6036838</a>
          </div>
        </div>

        {/* ================================== nav ================================== */}
        <nav aria-label="Sections" className="wd-nav wd-hide-sm absolute" style={{ ...sans, right: "2.2cqw", top: "50%", transform: "translateY(-50%)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          <span aria-hidden className="wd-rail" />
          <span aria-hidden className="wd-rail-fill" />
          {NAV.map((n, i) => (
            <button key={n} type="button" onClick={() => jump(i)} aria-current={active === i ? "step" : undefined}>
              <span className="wd-lab">{n}</span>
              <span className="wd-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="wd-dot" />
            </button>
          ))}
        </nav>

        {/* thin progress line along the bottom edge, visible on every screen size */}
        <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full" style={{ background: "linear-gradient(90deg," + COBALT + "," + COBALT_HI + ")", transformOrigin: "left", transform: "scaleX(var(--wp, 0))" }} />

        {/* grain, static */}
        <svg aria-hidden className="pointer-events-none absolute inset-0" width="100%" height="100%" style={{ opacity: 0.09, mixBlendMode: "screen" }}>
          <filter id="wd-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wd-grain)" />
        </svg>
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
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}}
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

export default function WebsiteDevelopmentPage() {
  const main = React.useRef<HTMLElement>(null);
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  // Reveal-on-scroll for the sections below the scene.
  React.useEffect(() => {
    const el = main.current!;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    el.querySelectorAll("[data-r],.rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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
    <main ref={main} id="main" className={`${rob.className} overflow-x-clip bg-white text-[#0B1F3B]`}>
      {/* Page metadata. React 19 / Next 15 move these into <head>. */}
      <title>{TITLE}</title>
      <meta name="description" content={DESC} />
      <link rel="canonical" href={SITE + PATH} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESC} />
      <meta property="og:url" content={SITE + PATH} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />)}
      <style>{PAGE_CSS}</style>

      <h1 className="sr-only">Website Development Services by DEVNTOM Solutions</h1>

      {/* 1. SCROLL-SCRUBBED SCENE */}
      <WebsiteScene />

      {/* 2. WHAT IS INCLUDED */}
      <section className="bg-white py-24 md:py-36" aria-label="What is included">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Lines className="max-w-3xl t2" lines={[<>Built <b className="font-bold">fast</b>,</>, <>built to <Acc dark={false}>last</Acc></>]} />
            <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Every site we build is fast, secure and ready to grow with your business.</p>
          </div>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map(([Icon, t, d], i) => (
              <li key={t} className="rv group rounded-[4px] border border-[#CBD8EE] p-8 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE]" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#E3ECFB] text-[#0047AB] transition-colors duration-300 group-hover:bg-[#0047AB] group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                <h3 className={`${pop.className} mt-8 text-xl font-semibold tracking-[-0.01em]`}>{t}</h3>
                <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. PROCESS */}
      <section className="relative overflow-hidden bg-[#0B1F3B] py-24 text-white md:py-32" aria-label="How we build websites">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(circle at 88% 12%,rgba(0,71,171,.55),transparent 50%)" }} />
        <div className={`${wrap} relative`}>
          <div className="mx-auto max-w-2xl text-center">
            <Lines className="t2" lines={[<>From first call to <Acc>launch day</Acc></>]} />
            <p className="rv mt-5 font-light text-white/70">Six phases, one delivery process. Every project follows it, and every phase feeds the next.</p>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="rv bg-[#0B1F3B] p-8 md:p-10" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <div className="flex items-center gap-4">
                  <span className="relative block h-7 w-7 shrink-0" style={{ "--d": `${0.6 + i * 0.5}s` } as React.CSSProperties}>
                    <span className="spn absolute inset-0 animate-spin rounded-full border-2 border-[#2F7BFF]/30 border-t-[#6EA1FF]" />
                    <span className="chk absolute inset-0 flex items-center justify-center rounded-full bg-[#2F7BFF] text-white"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>
                  </span>
                  <span className="text-sm text-[#6EA1FF]">Phase {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={`${pop.className} mt-6 text-2xl font-extralight tracking-[-0.03em]`}>{t}</h3>
                <p className="mt-3 font-light leading-relaxed text-white/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS: drop your existing <Testimonials /> component here and import it at the top of this file. */}

      {/* 4. RELATED SERVICES */}
      <section className="bg-white py-24 md:py-32" aria-label="Related services">
        <div className={wrap}>
          <Lines className="max-w-3xl t2" lines={[<>Works best <b className="font-bold">with</b></>]} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(([n, href, d], i) => (
              <li key={n} className="rv" style={{ transitionDelay: `${i * 90}ms` }}>
                <Link href={href} className={`group flex h-full flex-col justify-between gap-10 rounded-[4px] border border-[#CBD8EE] p-6 transition-colors duration-300 hover:border-[#0047AB] hover:bg-[#F4F8FE] ${ring}`}>
                  <ArrowUpRight size={26} className="text-[#0047AB] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  <div>
                    <h3 className={`${pop.className} text-lg font-semibold tracking-[-0.01em]`}>{n}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-[#3B4A63]">{d}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="bg-[#F4F8FE] py-24 md:py-36" aria-label="Frequently asked questions">
        <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Lines className="t2" lines={[<>Questions,</>, <><b className="font-bold">answered</b></>]} />
              <p className="rv mt-6 max-w-xs font-light leading-relaxed text-[#3B4A63]">Can&apos;t find what you need? Write to <a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] font-medium text-[#0047AB] underline underline-offset-4 ${ring}`}>info@devntomsolutions.com</a>.</p>
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

      {/* 6. CONTACT FORM */}
      <section id="contact-form" className="relative isolate overflow-hidden py-24 text-white md:py-32" aria-label="Start your website project" style={{ background: `linear-gradient(120deg,${BLACK} 0%,${NAVY} 45%,${COBALT} 100%)` }}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px,transparent 1px)", backgroundSize: "22px 22px", WebkitMaskImage: "linear-gradient(to right,transparent 20%,#000)", maskImage: "linear-gradient(to right,transparent 20%,#000)" }} />
        <div aria-hidden="true" className={`${pop.className} pointer-events-none absolute -bottom-[4vw] left-0 -z-10 w-full select-none whitespace-nowrap text-center text-[18vw] font-bold leading-none tracking-[-0.05em] text-transparent`} style={{ WebkitTextStroke: "1px rgba(255,255,255,.16)" }}>Let&apos;s build</div>
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <Lines className="t1" lines={["Let's build", <><Acc>your</Acc> <b className="font-bold">website.</b></>]} />
            <p className="rv mt-8 max-w-md text-lg font-light leading-relaxed text-[#DCE7FB]">Tell us what you want to achieve. We reply with a plan, a timeline and a quote.</p>
            <ul className="rv mt-8 space-y-2 font-medium">
              <li><a href="mailto:info@devntomsolutions.com" className={`rounded-[3px] underline decoration-[#6EA1FF] underline-offset-4 hover:text-[#6EA1FF] ${ring} focus-visible:ring-offset-[#0B1F3B]`}>info@devntomsolutions.com</a></li>
              <li><a href="https://wa.me/923256036838" className={`rounded-[3px] underline decoration-[#6EA1FF] underline-offset-4 hover:text-[#6EA1FF] ${ring} focus-visible:ring-offset-[#0B1F3B]`}>WhatsApp +92 325 6036838</a></li>
            </ul>
          </div>
          <form onSubmit={submit} className="rv rounded-[4px] bg-white p-7 text-[#0B1F3B] shadow-[0_30px_100px_rgba(0,71,171,.45)] md:p-9 lg:col-span-6" style={{ transitionDelay: "120ms" }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={label}>Full name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label>
              <label className={label}>Email<input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" /></label>
            </div>
            <label className={`${label} mt-5 block`}>What do you need?
              <select name="service" required defaultValue="Website Development" className={field}>
                {serviceOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className={`${label} mt-5 block`}>Project details<textarea name="message" required rows={4} className={field} placeholder="Goals, audience, budget, timeline" /></label>
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button disabled={state === "sending"} className={`group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0047AB] px-8 py-4 font-medium text-white transition hover:bg-[#0B1F3B] disabled:opacity-60 ${ring}`}>
              {state === "sending" ? "Sending…" : "Send message"} <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p role="status" className={`mt-4 text-sm ${state === "error" ? "text-[#B91C1C]" : "text-[#0B1F3B]"}`}>
              {state === "sent" && "Thank you. We received your message and will reply soon."}
              {state === "error" && "Something went wrong. Please email info@devntomsolutions.com instead."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}