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
import { Poppins, Roboto, Roboto_Mono, Playwrite_CA } from "next/font/google";
import { ArrowRight, ArrowUpRight, Check, Code2, Gauge, LayoutDashboard, Plus, Search, ShieldCheck, Smartphone } from "lucide-react";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const pw = Playwrite_CA({ weight: "400", display: "swap" });

/* ------------------------------ BRAND ------------------------------ */

const COBALT = "#0047AB"; // true cobalt: borders, buttons, accents on light backgrounds
const COBALT_HI = "#2F7BFF"; // lighter cobalt tint: the 3D object and glow on dark
const COBALT_TEXT = "#6EA1FF"; // small text on dark (passes contrast on navy and black)
const NAVY = "#0B1F3B";
const NAVY_DEEP = "#071A33";
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



/* ------------------------------ THE BUILD: A LINE TO A WEBSITE ------------------------------ */

/**
 * A pinned, scroll-driven walkthrough of how a site gets made: a line, a grid, a layout,
 * a typeface, a colour, a line of code, a button, a launch. Scroll sets one CSS variable,
 * --p (0 to 1), on the stage. Every element reads it through ramp() and fades, draws or
 * slides on its own interval, so the animation is plain CSS maths with no per-element JS.
 */

const mono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const INK = "#0B1F3B";
const BODY = "#3B4A63";
const GUIDE = "rgba(11,31,59,.55)";

/** CSS 0..1 ramp of --p between a and b */
const ramp = (a: number, b: number) => `clamp(0, calc((var(--p) - ${a}) / ${(b - a).toFixed(4)}), 1)`;
/** CSS 1..0 ramp */
const away = (a: number, b: number) => `calc(1 - ${ramp(a, b)})`;
/** visible between two ramps */
const between = (a: number, b: number, c: number, d: number) => `calc(${ramp(a, b)} * ${away(c, d)})`;

const BUILD_STEPS = [
  ["A line.", "Every website starts as a measurement: a size, a frame, a line."],
  ["A grid.", "Columns, gaps and a surface. The scaffolding everything lines up with later."],
  ["A layout.", "Lines become surfaces: navigation, headline, image, button. Order first, ornament later."],
  ["A typeface.", "Type is attitude. Size, weight and line breaks are tuned to every single line."],
  ["A colour.", "Navy, cobalt, black and white. A small palette, used with discipline."],
  ["A line of code.", "What we design, we also build. Clean, readable, no page builder."],
  ["A button.", "States, motion and focus: the details people feel without noticing."],
  ["A launch.", "Tested, deployed and monitored. Your site goes live, ready to grow."],
] as const;

type Seg = [string, "p" | "t" | "a" | "s" | "x"];
const CODE_A: Seg[][] = [
  [["<", "p"], ["Button", "t"], [" href", "a"], ["=", "p"], ['"/contact"', "s"], [">", "p"]],
  [["  Start a project", "x"]],
  [["</", "p"], ["Button", "t"], [">", "p"]],
  [],
  [[".btn", "t"], [" {", "p"]],
  [["  height", "a"], [": ", "p"], ["52px", "s"], [";", "p"]],
  [["  background", "a"], [": ", "p"], ["#0047AB", "s"], [";", "p"]],
  [["  border-radius", "a"], [": ", "p"], ["999px", "s"], [";", "p"]],
  [["}", "p"]],
];
const CODE_B: Seg[][] = [
  [],
  [[".btn:hover", "t"], [" {", "p"]],
  [["  background", "a"], [": ", "p"], ["#0B1F3B", "s"], [";", "p"]],
  [["}", "p"]],
];
const lineLen = (l: Seg[]) => l.reduce((n, s) => n + s[0].length, 0) + 1;
const LEN_A = CODE_A.reduce((n, l) => n + lineLen(l), 0);
const LEN_B = CODE_B.reduce((n, l) => n + lineLen(l), 0);
const codeColor: Record<Seg[1], string> = { p: "#7F93B5", t: "#6EA1FF", a: "#9DB8E8", s: "#FFFFFF", x: "#DCE7FB" };

function CodeLines({ lines, chars, start }: { lines: Seg[][]; chars: number; start: number }) {
  let left = chars;
  return (
    <>
      {lines.map((l, i) => {
        const shown: React.ReactNode[] = [];
        let used = 0;
        for (let k = 0; k < l.length && left > 0; k++) {
          const t = l[k][0].slice(0, left);
          shown.push(<span key={k} style={{ color: codeColor[l[k][1]] }}>{t}</span>);
          left -= t.length;
          used += t.length;
        }
        const full = used === l.reduce((n, s) => n + s[0].length, 0);
        if (full && left > 0) left -= 1;
        const visible = used > 0 || left > 0 || l.length === 0;
        return (
          <div key={i} className="flex" style={{ opacity: visible ? 1 : 0, minHeight: 24 }}>
            <span className="w-8 shrink-0 select-none text-right text-[#5F7396]">{start + i + 1}</span>
            <span className="ml-4 whitespace-pre">{shown}</span>
          </div>
        );
      })}
    </>
  );
}

const box = (x: number, y: number, w: number, h: number): React.CSSProperties => ({ position: "absolute", left: x, top: y, width: w, height: h });
const outline = `1.5px solid rgba(11,31,59,.78)`;

function BuildStage() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = React.useState(false);
  const [view, setView] = React.useState({ step: 0, pct: 0, a: 0, b: 0 });

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // fit the 1080 x 675 canvas to the stage
  React.useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const fit = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const top = W < 768 ? 120 : 108;
      const bottom = W < 768 ? 190 : 170;
      const k = Math.max(0.2, Math.min((W - (W < 768 ? 28 : 120)) / 1080, (H - top - bottom) / 745));
      canvas.style.transform = `translate(${((W - 1080 * k) / 2).toFixed(1)}px, ${(top + 32 * k).toFixed(1)}px) scale(${k.toFixed(4)})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (reduced) {
      stage.style.setProperty("--p", "1");
      setView({ step: 7, pct: 100, a: LEN_A, b: LEN_B });
      return;
    }
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let prog = -1;
    const r01 = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const r = root.getBoundingClientRect();
      const p = progressFrom(r.top, r.height, stage.clientHeight);
      prog = prog < 0 ? p : prog + (p - prog) * (1 - Math.exp(-dt * 10));
      stage.style.setProperty("--p", prog.toFixed(4));
      const next = {
        step: Math.min(BUILD_STEPS.length - 1, Math.floor(prog * BUILD_STEPS.length)),
        pct: Math.round(prog * 100),
        a: Math.floor(r01(prog, 0.635, 0.74) * LEN_A),
        b: Math.floor(r01(prog, 0.78, 0.84) * LEN_B),
      };
      setView((v) => (v.step === next.step && v.pct === next.pct && v.a === next.a && v.b === next.b ? v : next));
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
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  const [title, text] = BUILD_STEPS[view.step];
  const colW = (972 - 11 * 16) / 12;
  const pad = String(view.pct).padStart(3, "0");
  const swatches: [string, string][] = [[BLACK, "#02050B"], [NAVY, "#0B1F3B"], [COBALT, "#0047AB"], [WHITE, "#FFFFFF"]];

  return (
    <section ref={rootRef} className="relative w-full" style={{ height: reduced ? "auto" : "calc(100svh * 7.5)", background: "#F4F8FE" }} aria-label="How a website gets built, step by step">
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden select-none"
        style={{ height: "100svh", ["--p" as string]: reduced ? 1 : 0, backgroundColor: "#F4F8FE", backgroundImage: "radial-gradient(rgba(11,31,59,.16) 1px, transparent 1px)", backgroundSize: "22px 22px", color: INK } as React.CSSProperties}
      >
        {/* HUD */}
        <div className={`${mono.className} absolute left-5 top-24 text-[11px] leading-[1.6] md:left-8 md:top-28`}>
          <div className="text-[#5B6B84]">The build</div>
          <div>From a line to a website.</div>
        </div>
        <div className={`${mono.className} absolute right-5 top-24 text-right md:right-8 md:top-28`}>
          <div className="text-[11px] text-[#5B6B84]">Build progress</div>
          <div className={`${pop.className} text-[clamp(2.6rem,6vw,5.5rem)] font-extralight leading-none tracking-[-0.04em] text-[#0B1F3B]/15`} aria-hidden="true">
            {pad}<span className="text-[0.4em]">%</span>
          </div>
        </div>

        {/* the canvas: a 1080 x 675 browser, scaled to fit */}
        <div ref={canvasRef} className="absolute left-0 top-0" style={{ width: 1080, height: 675, transformOrigin: "0 0" }} aria-hidden="true">
          {/* dashed centre guide and the width measure */}
          <div style={{ ...box(540, -70, 0, 815), borderLeft: `1px dashed ${GUIDE}`, opacity: between(0.03, 0.08, 0.3, 0.38) }} />
          <div className={mono.className} style={{ ...box(0, -34, 1080, 20), opacity: between(0.02, 0.07, 0.3, 0.38), fontSize: 12, color: COBALT, textAlign: "center" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 1, background: COBALT, transformOrigin: "0 50%", transform: `scaleX(${ramp(0.02, 0.09)})` }} />
            <div style={{ position: "absolute", left: 0, top: 0, height: 9, width: 1, background: COBALT }} />
            <div style={{ position: "absolute", right: 0, top: 0, height: 9, width: 1, background: COBALT }} />
            <span style={{ position: "relative", top: -14, background: "#F4F8FE", padding: "0 8px" }}>1080 × 675</span>
          </div>

          {/* the frame draws itself */}
          <div style={{ ...box(0, 0, 1080, 675), borderRadius: 14, background: WHITE, opacity: ramp(0.06, 0.12), boxShadow: "0 40px 120px rgba(0,71,171,.12)" }} />
          <svg style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 675, overflow: "visible" }}>
            <rect x={0.75} y={0.75} width={1078.5} height={673.5} rx={14} fill="none" stroke={INK} strokeOpacity={0.8} strokeWidth={1.5} pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${ramp(0, 0.075)})` }} />
            <line x1={0} y1={40} x2={1080} y2={40} stroke={INK} strokeOpacity={0.8} strokeWidth={1.5} pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: `calc(1 - ${ramp(0.05, 0.1)})` }} />
          </svg>
          {[0, 1, 2].map((i) => <span key={i} style={{ position: "absolute", left: 20 + i * 18, top: 15, width: 10, height: 10, borderRadius: 99, background: i === 2 ? COBALT_HI : "#B9C6DC", opacity: ramp(0.08, 0.11) }} />)}
          <div className={mono.className} style={{ position: "absolute", right: 22, top: 10, fontSize: 12, color: COBALT, opacity: ramp(0.9, 0.94), display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: COBALT_HI, boxShadow: `0 0 10px ${COBALT_HI}` }} /> Live
          </div>

          {/* a grid */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ ...box(54 + i * (colW + 16), 40, colW, 635), background: "rgba(0,71,171,.07)", transformOrigin: "50% 0", transform: `scaleY(${ramp(0.13 + i * 0.004, 0.19 + i * 0.004)})`, opacity: away(0.38, 0.45) }} />
          ))}
          {[150, 300, 560].map((y, i) => (
            <div key={y} style={{ ...box(-340, y, 1760, 1), background: i === 1 ? COBALT : GUIDE, opacity: between(0.14 + i * 0.01, 0.2 + i * 0.01, 0.27, 0.33), transformOrigin: "0 50%", transform: `scaleX(${ramp(0.14 + i * 0.01, 0.21 + i * 0.01)})` }} />
          ))}
          <div style={{ ...box(82, 362, 236, 236), border: `1.5px solid ${COBALT}`, borderRadius: 999, opacity: between(0.17, 0.21, 0.25, 0.3), transform: `scale(${ramp(0.17, 0.22)})` }}>
            <span style={{ position: "absolute", left: 111, top: 111, width: 12, height: 12, borderRadius: 99, background: COBALT }} />
            <span className={mono.className} style={{ position: "absolute", left: 244, top: 112, fontSize: 12, color: COBALT }}>r 118</span>
          </div>

          {/* a layout: logo, nav, headline, paragraph, buttons, image */}
          <div style={{ ...box(54, 78, 120, 34), border: outline, borderRadius: 4, opacity: between(0.25, 0.3, 0.38, 0.43) }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...box(636 + i * 104, 80, 94, 32), border: outline, borderRadius: 99, opacity: ramp(0.26 + i * 0.01, 0.31 + i * 0.01), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: INK }}>
              <span style={{ opacity: ramp(0.4, 0.45) }}>{["Work", "Services", "About"][i]}</span>
            </div>
          ))}
          <div style={{ ...box(54, 186, 540, 160), border: outline, borderRadius: 6, opacity: between(0.27, 0.32, 0.38, 0.43) }}>
            <span style={{ ...box(10, 12, 230, 44), background: "rgba(11,31,59,.14)" }} />
            <span style={{ ...box(10, 70, 430, 60), background: "rgba(11,31,59,.14)" }} />
          </div>
          <div style={{ ...box(54, 392, 440, 72), border: outline, borderRadius: 6, opacity: between(0.29, 0.34, 0.43, 0.48) }}>
            <span style={{ ...box(8, 14, 400, 10), background: "rgba(11,31,59,.14)" }} />
            <span style={{ ...box(8, 36, 300, 10), background: "rgba(11,31,59,.14)" }} />
          </div>
          <div style={{ ...box(626, 140, 400, 450), border: outline, borderRadius: 8, opacity: ramp(0.3, 0.35) }}>
            <svg width={400} height={450} style={{ position: "absolute", inset: 0, opacity: away(0.5, 0.56) }}>
              <line x1={0} y1={0} x2={400} y2={450} stroke={INK} strokeOpacity={0.6} />
              <line x1={400} y1={0} x2={0} y2={450} stroke={INK} strokeOpacity={0.6} />
            </svg>
          </div>

          {/* a typeface */}
          <div className={pop.className} style={{ ...box(54, 78, 160, 34), display: "flex", alignItems: "center", fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", opacity: ramp(0.4, 0.45) }}>
            d<span style={{ color: COBALT, opacity: ramp(0.52, 0.56) }}>.</span><span style={{ color: INK, opacity: away(0.52, 0.56), position: "absolute", left: 117 }}>.</span>
          </div>
          <div className={pop.className} style={{ ...box(54, 188, 560, 140), fontSize: 64, lineHeight: "70px", letterSpacing: "-0.04em", fontWeight: 200 }}>
            {["Websites built", "to perform."].map((t, i) => (
              <div key={t} style={{ overflow: "hidden", height: 70 }}>
                <div style={{ transform: `translateY(calc((1 - ${ramp(0.38 + i * 0.015, 0.44 + i * 0.015)}) * 110%))`, position: "relative" }}>
                  {i === 1 ? (
                    <>
                      to <b style={{ fontWeight: 700, position: "relative" }}>perform.<b style={{ position: "absolute", left: 0, top: 0, fontWeight: 700, color: COBALT, opacity: ramp(0.52, 0.57) }}>perform.</b></b>
                    </>
                  ) : t}
                </div>
              </div>
            ))}
          </div>
          <div className={mono.className} style={{ ...box(54, 356, 540, 20), fontSize: 12, color: COBALT, textAlign: "center", opacity: between(0.3, 0.35, 0.74, 0.8) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: COBALT }} />
            <span style={{ position: "relative", top: 6, background: WHITE, padding: "0 6px" }}>540</span>
          </div>
          <p style={{ ...box(54, 396, 430, 70), margin: 0, fontSize: 18, lineHeight: "28px", color: BODY, fontWeight: 300, opacity: ramp(0.44, 0.49) }}>
            Fast, secure, responsive websites built with Next.js and React, from first sketch to launch.
          </p>

          {/* buttons: outline, then fill, then hover */}
          <div style={{ ...box(54, 480, 196, 52), border: outline, borderRadius: 99, opacity: ramp(0.31, 0.36), overflow: "hidden" }}>
            <span style={{ ...box(0, 0, 196, 52), background: COBALT, opacity: ramp(0.5, 0.55) }} />
            <span style={{ ...box(0, 0, 196, 52), background: NAVY, opacity: ramp(0.8, 0.84) }} />
            <span className={rob.className} style={{ position: "absolute", left: 24, top: 0, height: 52, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500, color: INK, opacity: calcMix(0.46, 0.5, 0.5, 0.55) }}>Start a project</span>
            <span className={rob.className} style={{ position: "absolute", left: 24, top: 0, height: 52, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500, color: WHITE, opacity: ramp(0.5, 0.55) }}>Start a project</span>
            <span style={{ position: "absolute", right: 7, top: 7, width: 38, height: 38, borderRadius: 99, background: WHITE, opacity: ramp(0.51, 0.56), display: "flex", alignItems: "center", justifyContent: "center", color: COBALT, transform: `translateX(calc(${ramp(0.82, 0.86)} * -4px))` }}>
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </div>
          <div style={{ ...box(54, 480, 196, 52), borderRadius: 99, border: `2px solid ${COBALT}`, opacity: `calc(${ramp(0.85, 0.88)} * (1 - ${ramp(0.85, 0.88)}) * 4)`, transform: `scale(calc(1 + ${ramp(0.85, 0.9)} * 0.3))` }} />
          <div className={rob.className} style={{ ...box(264, 480, 170, 52), border: outline, borderRadius: 99, opacity: ramp(0.32, 0.37), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 500, color: INK }}>
            <span style={{ opacity: ramp(0.46, 0.5) }}>See our work</span>
          </div>
          {/* button height measure */}
          <div className={mono.className} style={{ ...box(22, 480, 28, 52), opacity: between(0.31, 0.36, 0.86, 0.9), fontSize: 12, color: COBALT }}>
            <span style={{ position: "absolute", left: 18, top: 0, width: 1, height: 52, background: COBALT }} />
            <span style={{ position: "absolute", left: 13, top: 0, width: 11, height: 1, background: COBALT }} />
            <span style={{ position: "absolute", left: 13, bottom: 0, width: 11, height: 1, background: COBALT }} />
            <span style={{ position: "absolute", left: -6, top: 18 }}>52</span>
          </div>
          {/* image height measure */}
          <div className={mono.className} style={{ ...box(1040, 140, 40, 450), opacity: between(0.31, 0.36, 0.5, 0.56), fontSize: 12, color: COBALT }}>
            <span style={{ position: "absolute", left: 6, top: 0, width: 1, height: 450, background: COBALT }} />
            <span style={{ position: "absolute", left: 14, top: 215 }}>450</span>
          </div>

          {/* a colour: the image fills, the palette appears */}
          <div style={{ ...box(626, 140, 400, 450), borderRadius: 8, overflow: "hidden", opacity: ramp(0.52, 0.6), background: `linear-gradient(140deg, ${NAVY} 0%, ${COBALT} 100%)` }}>
            <div style={{ ...box(36, 40, 328, 190), borderRadius: 10, background: "rgba(255,255,255,.96)", transform: `translateY(calc((1 - ${ramp(0.56, 0.62)}) * 30px))`, opacity: ramp(0.56, 0.62), padding: 18 }}>
              <span style={{ display: "block", height: 10, width: 120, borderRadius: 9, background: "#CFE0FA" }} />
              <span style={{ display: "block", height: 8, width: 200, borderRadius: 9, background: "#E3ECFB", marginTop: 10 }} />
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90, marginTop: 22 }}>
                {[40, 62, 48, 80, 66, 90].map((h, i) => <span key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? COBALT : "#9DBDF2", borderRadius: "4px 4px 0 0" }} />)}
              </div>
            </div>
            <div style={{ ...box(36, 256, 154, 150), borderRadius: 10, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)" }} />
            <div style={{ ...box(210, 256, 154, 150), borderRadius: 10, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.3)" }} />
          </div>
          <div className={mono.className} style={{ ...box(54, 704, 480, 34), display: "flex", gap: 22, fontSize: 12, color: BODY, opacity: between(0.52, 0.57, 0.62, 0.67) }}>
            {swatches.map(([c, h]) => (
              <span key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: c, border: "1px solid rgba(11,31,59,.25)" }} />
                {h}
              </span>
            ))}
          </div>

          {/* a line of code */}
          <div className={mono.className} style={{ ...box(596, 150, 470, 340), borderRadius: 10, background: "#071223", boxShadow: "0 30px 80px rgba(2,5,11,.35)", opacity: between(0.62, 0.67, 0.88, 0.93), transform: `translateX(calc((1 - ${ramp(0.62, 0.67)}) * 40px))`, color: "#DCE7FB", fontSize: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,.1)", fontSize: 11, letterSpacing: "0.12em", color: "#9DB8E8" }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: COBALT_HI }} /> BUTTON.TSX
            </div>
            <div style={{ padding: "18px 18px 0", lineHeight: "24px" }}>
              <CodeLines lines={CODE_A} chars={view.a} start={0} />
              <CodeLines lines={CODE_B} chars={view.a >= LEN_A - 1 ? view.b : 0} start={CODE_A.length} />
            </div>
          </div>

          {/* a button: the pointer arrives, hovers and clicks */}
          <svg width={26} height={26} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0, opacity: between(0.74, 0.77, 0.9, 0.94), transform: `translate(calc(880px + ${ramp(0.74, 0.8)} * -740px), calc(300px + ${ramp(0.74, 0.8)} * 210px)) scale(calc(1 - ${ramp(0.84, 0.86)} * 0.15 + ${ramp(0.86, 0.88)} * 0.15))`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))" }}>
            <path d="M5 3l14 8-6.2 1.6L9.5 19 5 3z" fill={INK} stroke={WHITE} strokeWidth={1.4} strokeLinejoin="round" />
          </svg>

          {/* a launch */}
          <a href="#contact-form" className={`${rob.className} group inline-flex items-center gap-3 rounded-full bg-[#0047AB] text-white transition hover:bg-[#0B1F3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] focus-visible:ring-offset-2`} style={{ position: "absolute", right: 0, top: 698, height: 52, padding: "0 28px", fontSize: 16, fontWeight: 500, opacity: ramp(0.92, 0.97), pointerEvents: "auto" }}>
            Start your website <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        {/* step caption */}
        <div className="pointer-events-none absolute bottom-6 left-5 max-w-[min(30rem,70vw)] md:bottom-8 md:left-8">
          <div className={`${mono.className} flex items-center gap-3 text-[11px]`}>
            <span className="text-[#0047AB]">{String(view.step + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-[#0B1F3B]/40" />
            <span className="text-[#5B6B84]">{String(BUILD_STEPS.length).padStart(2, "0")}</span>
          </div>
          <div key={view.step} style={{ animation: "bsin .5s cubic-bezier(.16,1,.3,1) both" }}>
            <p className={`${pop.className} mt-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.04em]`}>{title}</p>
            <p className="mt-3 text-[0.95rem] font-light leading-relaxed text-[#3B4A63]">{text}</p>
          </div>
        </div>
        <a href="#types" className={`${mono.className} absolute bottom-6 right-5 flex items-center gap-2 rounded-[3px] text-[11px] text-[#0B1F3B] hover:text-[#0047AB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7BFF] md:bottom-8 md:right-8`}>
          Skip the build <ArrowRight size={13} className="rotate-90" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/** opacity that is 1 until a..b ramps the element out, then 0: a text that fades before its twin fades in */
function calcMix(inA: number, inB: number, outA: number, outB: number) {
  return `calc(${ramp(inA, inB)} * ${away(outA, outB)})`;
}

/* ------------------------------ TYPES OF WEBSITES ------------------------------ */

const WF = { fill: "#E3ECFB", stroke: "#8FB0E8", accent: COBALT };
function R({ x, y, w, h, i = 0, a = false, r = 3 }: { x: number; y: number; w: number; h: number; i?: number; a?: boolean; r?: number }) {
  return <rect className="wf-pop" x={x} y={y} width={w} height={h} rx={r} fill={a ? WF.accent : WF.fill} stroke={a ? WF.accent : WF.stroke} strokeWidth={1} style={{ ["--i" as string]: i } as React.CSSProperties} />;
}

const wireframes: React.ReactNode[] = [
  // company
  <>
    <R x={16} y={14} w={60} h={12} /><R x={240} y={16} w={40} h={8} i={1} /><R x={290} y={16} w={40} h={8} i={1} /><R x={340} y={14} w={44} h={12} a i={1} />
    <R x={16} y={52} w={190} h={22} i={2} /><R x={16} y={82} w={150} h={22} i={3} /><R x={16} y={118} w={100} h={26} a i={4} /><R x={230} y={46} w={154} h={110} i={3} />
    <R x={16} y={176} w={112} h={60} i={5} /><R x={144} y={176} w={112} h={60} i={6} /><R x={272} y={176} w={112} h={60} i={7} />
  </>,
  // e-commerce
  <>
    <R x={16} y={12} w={60} h={12} /><R x={330} y={12} w={54} h={12} a i={1} />
    {[0, 1, 2].map((c) => [0, 1].map((rw) => {
      const x = 16 + c * 128;
      const y = 40 + rw * 100;
      const i = 2 + c + rw * 3;
      return <g key={`${c}${rw}`}><R x={x} y={y} w={112} h={62} i={i} /><R x={x} y={y + 68} w={80} h={8} i={i} /><R x={x} y={y + 82} w={40} h={8} a i={i} /></g>;
    }))}
  </>,
  // landing
  <>
    <R x={150} y={14} w={100} h={10} />
    <R x={80} y={48} w={240} h={22} i={1} /><R x={110} y={78} w={180} h={22} i={2} /><R x={160} y={116} w={80} h={24} a i={3} />
    {[0, 1, 2, 3].map((k) => <R key={k} x={40 + k * 84} y={162} w={64} h={14} i={4 + k} />)}
    <R x={100} y={194} w={200} h={42} i={8} />
  </>,
  // web app
  <>
    <R x={10} y={10} w={70} h={230} /><R x={92} y={10} w={298} h={24} i={1} />
    <R x={92} y={46} w={92} h={44} i={2} /><R x={194} y={46} w={92} h={44} i={3} /><R x={296} y={46} w={94} h={44} a i={4} />
    <R x={92} y={102} w={180} h={84} i={5} /><R x={284} y={102} w={106} h={84} i={6} />
    <R x={92} y={198} w={298} h={12} i={7} /><R x={92} y={218} w={298} h={12} i={8} />
  </>,
  // cms
  <>
    <R x={16} y={12} w={60} h={12} /><R x={330} y={12} w={54} h={12} a i={1} />
    <R x={16} y={44} w={230} h={120} i={2} /><R x={16} y={174} w={160} h={12} i={3} /><R x={16} y={194} w={200} h={8} i={4} />
    {[0, 1, 2].map((k) => <g key={k}><R x={262} y={44 + k * 54} w={40} h={38} i={3 + k} /><R x={310} y={48 + k * 54} w={74} h={8} i={3 + k} /><R x={310} y={64 + k * 54} w={50} h={8} i={3 + k} /></g>)}
  </>,
  // redesign
  <>
    <R x={14} y={20} w={170} h={210} r={6} />
    <R x={22} y={30} w={60} h={16} i={1} /><R x={100} y={50} w={70} h={30} i={1} /><R x={26} y={96} w={120} h={14} i={2} /><R x={60} y={124} w={110} h={40} i={2} /><R x={20} y={176} w={90} h={28} i={3} />
    <path className="wf-pop" d="M194 125h12m-5-5 5 5-5 5" fill="none" stroke={COBALT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ ["--i" as string]: 4 } as React.CSSProperties} />
    <R x={216} y={20} w={170} h={210} r={6} i={4} />
    <R x={226} y={30} w={50} h={10} i={5} /><R x={226} y={56} w={150} h={18} i={5} /><R x={226} y={82} w={110} h={18} i={6} /><R x={226} y={112} w={50} h={20} a i={6} /><R x={226} y={148} w={150} h={70} i={7} />
  </>,
];

const siteTypes = [
  { name: "Company websites", text: "Clear, credible sites that explain what you do and earn enquiries.", best: "Agencies, clinics, firms and consultancies", has: ["Service pages", "Lead forms", "Blog and case studies"] },
  { name: "E-commerce stores", text: "Fast stores with secure checkout and simple product management.", best: "Retail and direct-to-consumer brands", has: ["Catalogue and search", "Secure payments", "Order and stock tools"] },
  { name: "Landing pages", text: "Focused pages built to lift conversions from your campaigns.", best: "Ads, product launches and events", has: ["Test-ready layouts", "Fast load times", "Tracking set up"] },
  { name: "Web apps and portals", text: "Dashboards, logins and tools that run in the browser.", best: "SaaS products and member areas", has: ["Accounts and roles", "Dashboards", "API integrations"] },
  { name: "CMS and blogs", text: "Edit your own content without calling a developer.", best: "Publishers and content marketing teams", has: ["Editor-friendly CMS", "SEO fields", "Scheduled posts"] },
  { name: "Redesigns", text: "A new look and faster code on top of what already works.", best: "Sites that look dated or load slowly", has: ["Audit first", "Content migration", "Redirects that protect SEO"] },
] as const;

function TypesSection() {
  const [sel, setSel] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = siteTypes.length;
    let t = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") t = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") t = (i - 1 + n) % n;
    else if (e.key === "Home") t = 0;
    else if (e.key === "End") t = n - 1;
    else return;
    e.preventDefault();
    setSel(t);
    refs.current[t]?.focus();
  };
  const s = siteTypes[sel];
  return (
    <section id="types" className="bg-white py-24 md:py-36" aria-label="Types of websites we build">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Every kind of <b className="font-bold">website</b>,</>, <>built <Acc dark={false}>properly</Acc></>]} />
          <p className="rv max-w-sm font-light leading-relaxed text-[#3B4A63]">Choose a type to see the structure we start from. Every one is fast, responsive and ready for search.</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div role="tablist" aria-label="Types of websites" aria-orientation="vertical" className="rv lg:col-span-5">
            {siteTypes.map((t, i) => (
              <button
                key={t.name}
                ref={(el) => { refs.current[i] = el; }}
                role="tab"
                id={`type-${i}`}
                aria-selected={sel === i}
                aria-controls="type-panel"
                tabIndex={sel === i ? 0 : -1}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group flex w-full items-center justify-between gap-6 border-t border-[#CBD8EE] py-5 text-left transition last:border-b ${ring}`}
              >
                <span className="flex items-baseline gap-5">
                  <span className="text-xs text-[#5B6B84]">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`${pop.className} text-2xl tracking-[-0.03em] transition md:text-3xl ${sel === i ? "font-semibold text-[#0047AB]" : "font-extralight text-[#0B1F3B] group-hover:text-[#0047AB]"}`}>{t.name}</span>
                </span>
                <ArrowUpRight size={22} className={`shrink-0 transition ${sel === i ? "text-[#0047AB]" : "text-[#8FB0E8] group-hover:text-[#0047AB]"}`} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div role="tabpanel" id="type-panel" aria-labelledby={`type-${sel}`} className="lg:col-span-7">
            <div className="overflow-hidden rounded-[6px] border border-[#CBD8EE] bg-[#F4F8FE]" aria-hidden="true">
              <div className="flex items-center gap-2 border-b border-[#CBD8EE] bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B9C6DC]" /><span className="h-2.5 w-2.5 rounded-full bg-[#B9C6DC]" /><span className="h-2.5 w-2.5 rounded-full bg-[#2F7BFF]" />
                <span className="ml-3 rounded-full bg-[#F4F8FE] px-4 py-1 text-xs text-[#5B6B84]">{s.name.toLowerCase().replace(/ /g, "-")}.com</span>
              </div>
              <svg key={sel} viewBox="0 0 400 250" className="block w-full bg-white p-3 md:p-6">{wireframes[sel]}</svg>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className={`${pop.className} text-xl font-semibold tracking-[-0.01em]`}>{s.name}</h3>
                <p className="mt-3 font-light leading-relaxed text-[#3B4A63]">{s.text}</p>
                <p className="mt-4 text-sm text-[#5B6B84]">Best for: <span className="text-[#0B1F3B]">{s.best}</span></p>
              </div>
              <ul className="space-y-3">
                {s.has.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0047AB] text-white"><Check size={12} strokeWidth={3} aria-hidden="true" /></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SELECTED WORK ------------------------------ */

// REPLACE: put your real projects here (name, kind, tags, href, cover), or drop your
// existing <Projects /> component into this section instead and delete WorkSection.
const work = [
  { name: "Client project 01", kind: "Company website", tags: ["Next.js", "SEO"], href: "/projects", from: NAVY, to: COBALT },
  { name: "Client project 02", kind: "E-commerce store", tags: ["Shopify", "Payments"], href: "/projects", from: BLACK, to: "#123C7C" },
  { name: "Client project 03", kind: "Web application", tags: ["React", "API"], href: "/projects", from: "#0A2A5C", to: COBALT_HI },
  { name: "Client project 04", kind: "Landing page", tags: ["Conversion", "Speed"], href: "/projects", from: NAVY_DEEP, to: "#1E5BC6" },
] as const;

function WorkCover({ from, to, i }: { from: string; to: string; i: number }) {
  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden" style={{ background: `linear-gradient(140deg, ${from} 0%, ${to} 100%)` }}>
      <div className="absolute left-[10%] top-[14%] w-[80%] rounded-[8px] bg-white/95 p-4 shadow-[0_30px_80px_rgba(2,5,11,.35)] transition duration-700 group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#B9C6DC]" /><span className="h-2 w-2 rounded-full bg-[#B9C6DC]" /><span className="h-2 w-2 rounded-full bg-[#2F7BFF]" /></div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <span className="col-span-2 block h-3 rounded-full bg-[#CFE0FA]" />
          <span className="block h-3 rounded-full bg-[#0047AB]" />
          <span className="col-span-2 row-span-3 block rounded bg-[#E3ECFB]" style={{ height: 70 + (i % 2) * 20 }} />
          <span className="block h-8 rounded bg-[#E3ECFB]" />
          <span className="block h-8 rounded bg-[#E3ECFB]" />
          <span className="block h-8 rounded bg-[#CFE0FA]" />
        </div>
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-32" aria-label="Selected work" style={{ background: `linear-gradient(180deg, ${BLACK} 0%, ${NAVY} 100%)` }}>
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="t2 max-w-3xl" lines={[<>Selected <b className="font-bold">work</b></>]} />
          <Link href="/projects" className={`group inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium transition hover:border-white ${ringDark}`}>
            View all projects <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 md:grid-cols-12">
          {work.map((w, i) => (
            <li key={w.name} className={`rv ${i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-6"}`} style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
              <Link href={w.href} className={`group block ${ringDark}`}>
                <div className={`overflow-hidden rounded-[4px] ${i < 2 ? "aspect-[4/3] md:aspect-auto md:h-[440px]" : "aspect-[16/10]"}`}>
                  <div className="h-full w-full transition duration-700 group-hover:scale-[1.04]"><WorkCover from={w.from} to={w.to} i={i} /></div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className={`${pop.className} text-2xl font-extralight tracking-[-0.03em]`}>{w.name}</h3>
                    <p className="mt-1 text-sm text-white/70">{w.kind}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {w.tags.map((t) => <li key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/80">{t}</li>)}
                    </ul>
                  </div>
                  <ArrowUpRight size={26} className="mt-1 shrink-0 text-[#6EA1FF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
@keyframes bsin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes wfpop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.wf-pop{animation:wfpop .5s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i,0) * 55ms)}
@media (prefers-reduced-motion:reduce){.ln>span,.rv{transform:none!important;opacity:1!important;transition:none!important}.spn{display:none}.chk{opacity:1;transform:none;transition:none}.wf-pop{animation:none}}
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
      {/* <WebsiteScene /> */}

      {/* 1b. THE BUILD: a line to a website */}
      <BuildStage />

      {/* 1c. TYPES OF WEBSITES */}
      <TypesSection />

      {/* 1d. SELECTED WORK */}
      <WorkSection />

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