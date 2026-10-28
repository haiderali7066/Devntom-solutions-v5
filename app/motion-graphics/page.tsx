"use client";

import { useEffect, useRef, useState } from "react";

/**
 * DEVNTOM Solutions: "Built to Outperform" (60s). Next.js App Router, zero dependencies.
 * Built from your script, with a fully synthesized SFX + music track (Web Audio API).
 * Logo = your sign.png traced to vector.
 *
 *  0-10s    PROBLEM  neon wireframe "Off-the-Shelf Software" is slammed by gears and progress bars,
 *                    glitches, stalls, breaks apart; red error lines pulse; Templates. Limits. Slowdowns.
 *  10-25s   SHIFT    light beam shatters the red lines; "Break Free."; chrome logo materializes on liquid glass;
 *                    code streams become floating 3D UI cards; "Built Custom."
 *  25-45s   SHOWCASE wireframes -> dashboard (Scalable.) / cloud nodes + live chart spike (Ultra-Fast.) /
 *                    micro-interactions, light-dark toggle, meters hit 100% (Flawless UI.)
 *  45-60s   CTA      components snap into a dashboard sphere, expand into the call to action; cursor clicks
 *                    "Start Your Project"
 *
 * Buttons: Sound (SFX + music), Voice (browser text-to-speech reads the voiceover; quality depends on the device),
 * CC (captions, on by default). Sound and Voice are off until clicked because browsers block autoplay audio.
 * Font: set --font-jakarta via next/font (Plus Jakarta Sans); falls back to Inter / system.
 */

const D = 60;
const C = { bg: "#070D1B", blue: "#0580FF", sky: "#4DA3FF", text: "#FFFFFF", mute: "#8FA0BF", red: "#FF3B4E", panel: "#101C33" };
const D_OUT = "M274 267 H705 C908 267 1073 438 1073 648 C1073 853 919 1020 728 1020 H159 L433 551 Z";
const D_IN = "M543 433 H680 C792 433 883 528 883 645 C883 763 792 858 680 858 H447 L628 555 Z";
const D_ALL = `${D_OUT} ${D_IN}`;
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const prog = (t, s, d) => clamp((t - s) / d);
const ease = (x) => 1 - Math.pow(1 - x, 4);
const out3 = (x) => 1 - Math.pow(1 - x, 3);
const inOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const back = (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);
const lerp = (a, b, p) => a + (b - a) * p;
const cq = (n) => `${n}cqw`;
const fill = (extra) => ({ position: "absolute", inset: 0, ...extra });
const rnd = (s) => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixc = (a, b, p) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], p))).join(",")})`; };
const money = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const win = (t, s, e, f = 0.3) => {
  const a = out3(prog(t, s, f)), b = out3(prog(t, e - f, f));
  return { o: a * (1 - b), sc: lerp(0.92, 1, a) * lerp(1, 1.12, b), on: t > s - 0.01 && t < e };
};
const glass = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
  border: "1px solid rgba(255,255,255,0.16)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

/* ---------------- voiceover / captions ---------------- */
const VO = [
  [0.8, 4.0, "Still running your business on off-the-shelf software?"],
  [4.2, 9.6, "Slow interfaces, rigid templates, and features you don’t even need..."],
  [10.7, 12.4, "Break free."],
  [12.6, 21, "At DEVNTOM Solutions, we engineer custom software tailored specifically to your exact workflow."],
  [25.4, 35.2, "From high-performing web platforms and custom business portals to intelligent integrations and sleek digital experiences."],
  [36.0, 44.6, "Built with cutting-edge tech for unmatched speed, scalability, and impact."],
  [50.3, 53.0, "Stop adapting to software. Build software that adapts to you."],
  [55.0, 59.0, "Let’s turn your vision into code."],
];

/* ---------------- SFX + music timeline ---------------- */
const EV = [];
const ev = (t, k, ...a) => EV.push([t, k, ...a]);
// Scene 1: dull bass hum, mechanical clanks, glitching, error beeps, crash, text hits
ev(0.1, "drone", 10.8, 55, 0.14);
[1.8, 2.7, 3.6].forEach((a, i) => ev(a, "clank", 1 + i * 0.12));
[3.2, 3.5, 3.8, 4.1, 6.0, 7.3, 8.6].forEach((a) => ev(a, "alarm"));
ev(4.4, "glitch"); ev(4.7, "glitch"); ev(5.0, "crash");
[5.4, 6.7, 8.0].forEach((a) => ev(a, "thump"));
ev(9.4, "glitch");
// Scene 2: laser sweep, shatter, beat drop, swooshes
ev(10.0, "laser"); ev(10.25, "shatter"); ev(11.5, "drop"); ev(11.6, "swoosh", 1.0);
ev(12.7, "ding", 1318); ev(14.4, "swoosh", 0.8); ev(15.5, "swoosh", 0.7);
for (let i = 0; i < 5; i++) ev(15.65 + i * 0.12, "click");
ev(14.9, "thump");
// Scene 3: rapid UI clicks, risers, chart spike
ev(24.6, "swoosh", 0.7);
for (let i = 0; i < 7; i++) ev(25.45 + i * 0.22, "click");
ev(28.0, "swoosh", 1.0); ev(30.9, "click"); ev(31.6, "swoosh", 0.6);
for (let i = 0; i < 8; i++) ev(32.4 + i * 0.2, "tick");
ev(33.0, "riser", 2.0); ev(35.0, "thump"); ev(35.02, "ding", 1760);
[38.5, 39.0, 39.5, 40.0].forEach((a) => ev(a, "click"));
ev(40.9, "click"); ev(41.0, "thump"); ev(41.9, "click"); ev(42.0, "thump");
[43.4, 43.8, 44.2].forEach((a, i) => ev(a, "ding", 1046 * Math.pow(1.26, i)));
ev(43.0, "riser", 1.6); ev(44.5, "chime");
// Scene 4: components snap together, expand, text hits, click, echo tail
ev(45.0, "swoosh", 1.0);
for (let i = 0; i < 14; i++) ev(46.2 + i * 0.1, "snap");
ev(46.4, "drone", 3, 110, 0.07);
ev(48.8, "swoosh", 1.2); ev(48.8, "thump"); ev(50.3, "thump"); ev(51.8, "thump");
ev(56.1, "click"); ev(56.3, "chord"); ev(56.8, "fadeMusic"); ev(57.4, "ding", 1318);
// Music: beat drops at 11.5, 120 bpm, Am - F - C - G
const ROOT = [55, 43.65, 65.41, 49];
const CH = [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]];
for (let bar = 0; 11.5 + bar * 2 < 56.8; bar++) {
  const b0 = 11.5 + bar * 2, ci = bar % 4;
  for (let k = 0; k < 4; k++) {
    ev(b0 + k * 0.5, "kick"); ev(b0 + k * 0.5 + 0.25, "hat");
    ev(b0 + k * 0.5, "bass", ROOT[ci], 0.38);
    ev(b0 + k * 0.5 + 0.25, "bass", ROOT[ci] * (k % 2 ? 2 : 1), 0.18);
  }
  if (b0 >= 25 && b0 < 45) {
    ev(b0 + 0.5, "snare"); ev(b0 + 1.5, "snare");
    for (let k = 0; k < 16; k++) ev(+(b0 + k * 0.125).toFixed(3), "arp", CH[ci][k % 3] * (k % 8 >= 4 ? 4 : 2));
  } else if (b0 >= 15.5) {
    for (let k = 0; k < 8; k++) ev(b0 + k * 0.25, "arp", CH[ci][k % 3] * 2);
  }
}

function makeAudio() {
  const ac = new (window.AudioContext || window.webkitAudioContext)();
  const comp = ac.createDynamicsCompressor();
  comp.connect(ac.destination);
  const master = ac.createGain(); master.gain.value = 0.75; master.connect(comp);
  const music = ac.createGain(); music.gain.value = 0.7; music.connect(master);
  const fx = ac.createGain(); fx.connect(master);
  const echoIn = ac.createGain(), delay = ac.createDelay(1), fb = ac.createGain(), elp = ac.createBiquadFilter();
  delay.delayTime.value = 0.375; fb.gain.value = 0.45; elp.type = "lowpass"; elp.frequency.value = 3200;
  echoIn.connect(delay); delay.connect(elp); elp.connect(fb); fb.connect(delay); elp.connect(master);
  const bassLP = ac.createBiquadFilter(); bassLP.type = "lowpass"; bassLP.frequency.value = 520; bassLP.connect(music);
  const arpLP = ac.createBiquadFilter(); arpLP.type = "lowpass"; arpLP.frequency.value = 2800; arpLP.connect(music);
  const nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const nd = nb.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  const tail = (g, send) => { if (send) { const s = ac.createGain(); s.gain.value = send; g.connect(s); s.connect(echoIn); } };
  const osc = (type, f0, f1, w, dur, pk, a = 0.004, dest = fx, send = 0) => {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, w);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, w + a + dur);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.exponentialRampToValueAtTime(pk, w + a);
    g.gain.exponentialRampToValueAtTime(0.0001, w + a + dur);
    o.connect(g); g.connect(dest); tail(g, send);
    o.start(w); o.stop(w + a + dur + 0.05);
  };
  const noise = (w, dur, type, f0, f1, pk, a = 0.004, dest = fx, send = 0, Q = 1) => {
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = nb; s.loop = true; f.type = type; f.Q.value = Q;
    f.frequency.setValueAtTime(f0, w); f.frequency.exponentialRampToValueAtTime(f1, w + dur);
    g.gain.setValueAtTime(0.0001, w);
    g.gain.exponentialRampToValueAtTime(pk, w + Math.min(a, dur * 0.9));
    g.gain.exponentialRampToValueAtTime(0.0001, w + dur);
    s.connect(f); f.connect(g); g.connect(dest); tail(g, send);
    s.start(w); s.stop(w + dur + 0.05);
  };
  const resetBuses = () => { music.gain.cancelScheduledValues(ac.currentTime); music.gain.setValueAtTime(0.7, ac.currentTime); };

  return {
    ac, resetBuses,
    drone: (w, dur, f, pk) => {
      const o = ac.createOscillator(), g = ac.createGain(), l = ac.createOscillator(), lg = ac.createGain();
      o.type = "sine"; o.frequency.value = f; l.frequency.value = 5; lg.gain.value = pk * 0.35;
      l.connect(lg); lg.connect(g.gain);
      g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(pk, w + Math.min(1, dur / 3));
      g.gain.setValueAtTime(pk, w + dur - 0.9); g.gain.exponentialRampToValueAtTime(0.0001, w + dur);
      o.connect(g); g.connect(fx); o.start(w); l.start(w); o.stop(w + dur + 0.05); l.stop(w + dur + 0.05);
    },
    clank: (w, k = 1) => {
      noise(w, 0.14, "bandpass", 2400, 1800, 0.5, 0.002, fx, 0, 3);
      [310, 523, 811, 1190].forEach((f, i) => osc("sine", f * k, f * k * 0.97, w, 0.4, 0.14 - i * 0.02));
      osc("sine", 95, 45, w, 0.25, 0.9);
    },
    glitch: (w) => {
      for (let i = 0; i < 8; i++) {
        const f = 200 + Math.random() * 2000;
        osc("square", f, f, w + i * 0.045, 0.03, 0.07);
        noise(w + i * 0.045, 0.03, "highpass", 3000, 6000, 0.12);
      }
    },
    alarm: (w) => { osc("square", 880, 880, w, 0.1, 0.05); osc("square", 660, 660, w + 0.14, 0.1, 0.05); },
    crash: (w) => { noise(w, 0.8, "lowpass", 4000, 200, 0.7, 0.005); osc("sine", 90, 28, w, 0.8, 0.9); },
    thump: (w) => osc("sine", 110, 40, w, 0.3, 0.85),
    laser: (w) => { osc("sawtooth", 6000, 160, w, 0.9, 0.16, 0.01); osc("square", 3000, 90, w, 0.9, 0.07, 0.01); noise(w, 0.9, "highpass", 3000, 9000, 0.1); },
    shatter: (w) => {
      noise(w, 0.6, "highpass", 4000, 9000, 0.4, 0.003);
      for (let i = 0; i < 8; i++) osc("sine", 2000 + Math.random() * 5000, 2000 + Math.random() * 5000, w + Math.random() * 0.3, 0.2, 0.05);
    },
    drop: (w) => { osc("sine", 75, 32, w, 1.6, 1.0, 0.01); noise(w, 0.8, "lowpass", 3000, 150, 0.5, 0.01); },
    swoosh: (w, dur = 0.7) => noise(w, dur, "bandpass", 400, 7000, 0.28, dur * 0.45, fx, 0.1, 1.1),
    kick: (w) => osc("sine", 160, 42, w, 0.22, 0.95, 0.004, music),
    hat: (w) => noise(w, 0.05, "highpass", 7000, 9000, 0.14, 0.003, music),
    snare: (w) => { noise(w, 0.14, "bandpass", 1800, 1500, 0.32, 0.002, music, 0.15); osc("sine", 190, 150, w, 0.08, 0.1, 0.002, music); },
    bass: (w, f, dur) => { osc("sawtooth", f, f, w, dur, 0.2, 0.01, bassLP); osc("sine", f, f, w, dur, 0.3, 0.01, music); },
    arp: (w, f) => osc("square", f, f, w, 0.11, 0.05, 0.005, arpLP, 0.18),
    click: (w) => { osc("square", 2800, 1800, w, 0.025, 0.09); noise(w, 0.02, "highpass", 5000, 8000, 0.1); },
    tick: (w) => osc("square", 1900, 1500, w, 0.04, 0.06),
    snap: (w) => { osc("square", 1500, 900, w, 0.04, 0.08); osc("sine", 300, 150, w, 0.08, 0.25); },
    riser: (w, dur = 2) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = "sawtooth"; o.frequency.setValueAtTime(120, w); o.frequency.exponentialRampToValueAtTime(3000, w + dur);
      g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(0.13, w + dur * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, w + dur + 0.05);
      o.connect(g); g.connect(fx); o.start(w); o.stop(w + dur + 0.1);
      noise(w, dur, "bandpass", 300, 9000, 0.22, dur * 0.9);
    },
    ding: (w, f = 1318) => { osc("sine", f, f, w, 1.2, 0.2, 0.004, fx, 0.45); osc("sine", f * 1.5, f * 1.5, w, 0.9, 0.09, 0.004, fx, 0.45); },
    chime: (w) => [1318, 1760, 2637].forEach((f, i) => osc("sine", f, f, w + i * 0.09, 1.4, 0.15 - i * 0.03, 0.004, fx, 0.4)),
    chord: (w) => [220, 277.18, 329.63, 440].forEach((f) => osc("triangle", f, f, w, 3.2, 0.08, 0.3, fx, 0.6)),
    fadeMusic: (w) => { music.gain.cancelScheduledValues(w); music.gain.setValueAtTime(0.7, w); music.gain.linearRampToValueAtTime(0.0001, w + 1.8); },
  };
}

/* camera: fast punch-in zooms on key beats */
const punch = (t, at, amt, k) => (t >= at ? amt * Math.exp(-(t - at) * k) : 0);
const camScale = (t) =>
  1 + 0.012 * Math.sin(t * 0.4) + punch(t, 10.0, 0.12, 5) + punch(t, 11.5, 0.1, 6) + punch(t, 25.0, -0.05, 5) +
  punch(t, 32.0, 0.06, 5) + punch(t, 38.0, 0.05, 5) + punch(t, 45.0, 0.06, 5) + punch(t, 48.8, -0.06, 4) + punch(t, 56.1, 0.03, 8);

/* ======================= MAIN ======================= */

export default function DevntomBuiltToOutperform() {
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [voice, setVoice] = useState(false);
  const [cc, setCc] = useState(true);
  const [tw, setTw] = useState(0);
  const [sw, setSw] = useState(0);
  const tRef = useRef(0);
  const pausedRef = useRef(false);
  const soundRef = useRef(false);
  const voiceRef = useRef(false);
  const audioRef = useRef(null);
  const schedRef = useRef(-1);
  const rowRef = useRef(null);
  const stageRef = useRef(null);

  const speak = (txt, dur) => {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(txt);
    u.rate = clamp(txt.split(" ").length / 2.6 / dur, 0.85, 1.4);
    u.pitch = 0.95;
    s.speak(u);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pausedRef.current = true; setPaused(true); tRef.current = 57; setT(57);
    }
  }, []);

  useEffect(() => {
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) {
        const prev = tRef.current;
        let nt = prev + dt, wrapped = false;
        if (nt >= D) { nt %= D; wrapped = true; }
        tRef.current = nt;
        setT(nt);
        const au = audioRef.current;
        if (au && soundRef.current) {
          if (wrapped) { au.resetBuses(); schedRef.current = -1; }
          const hor = nt + 0.12;
          EV.forEach(([at, k, ...a]) => {
            if (at > schedRef.current && at <= hor) au[k]?.(au.ac.currentTime + Math.max(0.005, at - nt), ...a);
          });
          schedRef.current = hor;
        } else schedRef.current = nt;
        if (voiceRef.current) {
          VO.forEach(([s, e, txt]) => { if (wrapped ? s <= nt : s > prev && s <= nt) speak(txt, e - s); });
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const m = () => {
      if (rowRef.current) setTw(rowRef.current.offsetWidth);
      if (stageRef.current) setSw(stageRef.current.offsetWidth);
    };
    m();
    document.fonts?.ready.then(m);
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const jump = (nt) => {
    tRef.current = nt; setT(nt); schedRef.current = nt;
    audioRef.current?.resetBuses();
    window.speechSynthesis?.cancel();
  };
  const togglePause = () => {
    pausedRef.current = !pausedRef.current; setPaused(pausedRef.current);
    const s = window.speechSynthesis;
    if (s) (pausedRef.current ? s.pause() : s.resume());
    if (audioRef.current) (pausedRef.current ? audioRef.current.ac.suspend() : soundRef.current && audioRef.current.ac.resume());
  };
  const replay = () => { jump(0); pausedRef.current = false; setPaused(false); schedRef.current = -1; audioRef.current && soundRef.current && audioRef.current.ac.resume(); };
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); jump(clamp((e.clientX - r.left) / r.width) * (D - 0.01)); };
  const toggleSound = async () => {
    if (!audioRef.current) audioRef.current = makeAudio();
    const au = audioRef.current;
    soundRef.current = !soundRef.current;
    setSound(soundRef.current);
    schedRef.current = tRef.current;
    if (soundRef.current) await au.ac.resume(); else await au.ac.suspend();
  };
  const toggleVoice = () => {
    voiceRef.current = !voiceRef.current; setVoice(voiceRef.current);
    if (!voiceRef.current) window.speechSynthesis?.cancel();
  };

  const vis = out3(prog(t, 0, 0.5)) * clamp((D - t) / 0.8);
  const cap = VO.find(([s, e]) => t >= s && t < e);
  const capO = cap ? Math.min(out3(prog(t, cap[0], 0.3)), clamp((cap[1] - t) / 0.25)) : 0;
  const sc = camScale(t);

  return (
    <section className="wrap">
      <div className="stage" ref={stageRef} role="img" aria-label="DEVNTOM Solutions motion video: Built to Outperform">
        <div style={fill({ opacity: vis, transform: `scale(${sc})` })}>
          <div style={fill({ backgroundImage: "linear-gradient(rgba(77,163,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(77,163,255,0.05) 1px, transparent 1px)", backgroundSize: "6cqw 6cqw", backgroundPosition: `${-t * 0.8}cqw ${t * 0.4}cqw`, opacity: 0.7 })} />
          <Problem t={t} />
          <RedLines t={t} />
          <Beam t={t} />
          <Shift t={t} />
          <Showcase t={t} />
          <Finale t={t} />
          <Lockup t={t} tw={tw} sw={sw} rowRef={rowRef} />
        </div>
        {cc && cap && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: cq(1.3), textAlign: "center", fontSize: cq(1.75), fontWeight: 500, opacity: capO, color: "rgba(255,255,255,0.9)", textShadow: "0 0.2cqw 1cqw #000, 0 0 2cqw #000" }}>
            <span style={{ display: "inline-block", maxWidth: cq(74), lineHeight: 1.35 }}>{cap[2]}</span>
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={replay}>Replay</button>
        <button onClick={togglePause}>{paused ? "Play" : "Pause"}</button>
        <button onClick={toggleSound} aria-pressed={sound}>Sound {sound ? "on" : "off"}</button>
        <button onClick={toggleVoice} aria-pressed={voice}>Voice {voice ? "on" : "off"}</button>
        <button onClick={() => setCc(!cc)} aria-pressed={cc}>CC</button>
        <div className="bar" onClick={seek} role="progressbar" aria-valuemin={0} aria-valuemax={D} aria-valuenow={Math.round(t)}>
          <span style={{ width: `${(t / D) * 100}%` }} />
        </div>
        <span className="time">{Math.floor(t)}s / {D}s</span>
      </div>

      <style jsx>{`
        .wrap { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden; color: ${C.text};
          background: radial-gradient(60% 80% at 88% 0%, rgba(5,128,255,0.22), transparent 60%),
                      radial-gradient(50% 60% at 0% 100%, rgba(5,128,255,0.12), transparent 60%), ${C.bg};
          font-family: var(--font-jakarta), "Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }
        .stage { position: relative; width: min(1440px, 100vw, calc((100vh - 100px) * 16 / 9)); aspect-ratio: 16 / 9; container-type: inline-size; overflow: hidden; }
        .controls { position: absolute; left: 20px; right: 20px; bottom: 16px; display: flex; align-items: center; gap: 8px; z-index: 6; flex-wrap: wrap; }
        .controls button { background: rgba(255,255,255,0.08); color: ${C.text}; border: 1px solid rgba(255,255,255,0.2); padding: 6px 13px; border-radius: 999px; font-size: 13px; cursor: pointer; }
        .controls button[aria-pressed="true"] { border-color: ${C.blue}; color: ${C.sky}; }
        .controls button:focus-visible { outline: 2px solid ${C.sky}; outline-offset: 2px; }
        .bar { flex: 1; min-width: 120px; height: 8px; border-radius: 8px; background: rgba(255,255,255,0.15); overflow: hidden; cursor: pointer; }
        .bar span { display: block; height: 100%; background: ${C.blue}; }
        .time { font-size: 12px; opacity: 0.6; font-variant-numeric: tabular-nums; min-width: 64px; text-align: right; }
      `}</style>
    </section>
  );
}

/* ======================= SHARED ======================= */

const Rise = ({ p, children, style }) => (
  <div style={{ overflow: "hidden", paddingBottom: "0.12em", ...style }}>
    <div style={{ transform: `translateY(${(1 - p) * 115}%)` }}>{children}</div>
  </div>
);
const Bx = ({ w, h, c = "rgba(255,255,255,0.16)", r = 0.4, s }) => <i style={{ display: "block", width: cq(w), height: cq(h), borderRadius: cq(r), background: c, ...s }} />;

function Cursor({ x, y, press = 0, o = 1 }) {
  return (
    <svg viewBox="0 0 24 24" style={{ position: "absolute", left: cq(x), top: cq(y), width: cq(2.8), height: cq(2.8), opacity: o, transform: `scale(${1 - 0.15 * press})`, transformOrigin: "4px 2px", filter: "drop-shadow(0 0.2cqw 0.5cqw rgba(0,0,0,0.6))", zIndex: 9, pointerEvents: "none" }}>
      <path d="M4 2 L4 19 L8.6 14.8 L11.8 22 L14.6 20.8 L11.5 13.8 L17.8 13.8 Z" fill="#fff" stroke={C.bg} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function Giant({ t, s, e, text, size = 15 }) {
  const w = win(t, s, e, 0.4);
  if (!w.on) return null;
  return (
    <div style={fill({ display: "grid", placeItems: "center", opacity: w.o, pointerEvents: "none" })}>
      <div style={{ display: "flex", fontSize: cq(size), fontWeight: 800, letterSpacing: "-0.04em", color: "rgba(5,128,255,0.10)", WebkitTextStroke: `${cq(0.1)} rgba(255,255,255,0.3)`, transform: `translateX(${cq(Math.sin(t * 0.5) * 1)})` }}>
        {text.split("").map((ch, i) => {
          const p = out3(prog(t, s + i * 0.04, 0.7));
          return <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: p, transform: `translateX(${cq((i % 2 ? 1 : -1) * (1 - p) * 6)}) rotate(${(1 - p) * (i % 2 ? 6 : -6)}deg)` }}>{ch}</span>;
        })}
      </div>
    </div>
  );
}

/* ======================= SCENE 1: PROBLEM (0-10.2s) ======================= */

const SEGS = [[0, 0, 40, 0], [40, 0, 40, 22], [40, 22, 0, 22], [0, 22, 0, 0], [0, 5, 40, 5], [10, 5, 10, 22], [20, 5, 20, 22], [30, 5, 30, 22]];
const SHARD = SEGS.map((_, i) => ({ a: rnd(i * 3 + 1) * 6.283, sp: 14 + rnd(i * 3 + 2) * 26, rot: (rnd(i * 3 + 3) - 0.5) * 500 }));
const GEAR = (() => {
  const teeth = 12, step = (Math.PI * 2) / teeth, pts = [];
  const P = (r, a) => `${(Math.cos(a) * r).toFixed(3)} ${(Math.sin(a) * r).toFixed(3)}`;
  for (let i = 0; i < teeth; i++) { const a = i * step; pts.push(P(0.78, a), P(1, a + step * 0.12), P(1, a + step * 0.4), P(0.78, a + step * 0.52)); }
  return "M" + pts.join(" L") + " Z";
})();

function BoxLines({ t, color, dx, dy, op }) {
  const dtb = t - 5.0;
  return (
    <g opacity={op} transform={`translate(${30 + dx} ${13 + dy})`} style={{ filter: `drop-shadow(0 0 ${cq(0.7)} ${color})` }}>
      {SEGS.map(([x1, y1, x2, y2], i) => {
        const d = ease(prog(t, 0.3 + i * 0.07, 0.7));
        let tr = "", o = 1;
        if (dtb > 0) {
          const s = SHARD[i];
          tr = `translate(${Math.cos(s.a) * s.sp * dtb * 0.9} ${Math.sin(s.a) * s.sp * dtb * 0.9 + 22 * dtb * dtb}) rotate(${s.rot * dtb} ${(x1 + x2) / 2} ${(y1 + y2) / 2})`;
          o = 1 - prog(dtb, 0.7, 1.1);
        }
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.22" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - d} transform={tr} opacity={o} />;
      })}
    </g>
  );
}

function Gear({ x, y, r, rot, o }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${r})`} opacity={o} style={{ filter: `drop-shadow(0 0 ${cq(0.5)} ${C.red})` }}>
      <path d={GEAR} fill="#232B3F" stroke={C.red} strokeWidth={0.25 / r} strokeLinejoin="round" />
      <circle r="0.36" fill={C.bg} stroke={C.red} strokeWidth={0.2 / r} />
      {[0, 60, 120].map((a) => <line key={a} x1="-0.7" y1="0" x2="0.7" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth={0.2 / r} transform={`rotate(${a})`} />)}
    </g>
  );
}

const WORDS = [["Templates.", 5.4], ["Limits.", 6.7], ["Slowdowns.", 8.0]];

function Problem({ t }) {
  if (t > 11.2) return null;
  const bx = lerp(-10, 112, prog(t, 10.0, 0.95));
  const dmg = clamp((t - 1.6) / 3.4);
  const col = mixc("#4DA3FF", "#FF3B4E", dmg);
  const shake = [1.8, 2.7, 3.6].reduce((a, s) => a + (t > s ? Math.exp(-(t - s) * 8) : 0), 0) * 0.9;
  const glitch = (t > 4.4 && t < 5.0) || (t > 9.4 && t < 9.7);
  const rg = Math.floor(t * 30);
  const gx = glitch ? (rnd(rg) - 0.5) * 3.2 : Math.sin(t * 70) * shake;
  const gy = glitch ? (rnd(rg + 9) - 0.5) * 1.2 : Math.cos(t * 63) * shake * 0.6;
  const flick = t > 4.4 && t < 5.0 ? 0.35 + 0.65 * rnd(rg + 3) : 1;
  const dtb = t - 5.0;
  const fall = dtb > 0 ? { y: 40 * dtb * dtb, o: 1 - prog(dtb, 0.5, 1.0) } : { y: 0, o: 1 };
  const gl = (a, k) => { const kk = (t - a) * 2.5; return k * 18 * (Math.floor(Math.max(0, kk)) + ease(Math.max(0, kk) % 1)); };
  const gxL = lerp(-14, 24, back(prog(t, 1.5, 0.4))), gxR = lerp(114, 76, back(prog(t, 2.4, 0.4)));
  const label = "Off-the-Shelf Software";
  const typed = label.slice(0, Math.floor(prog(t, 0.8, 0.8) * label.length));
  const shown = t > 4.4 && t < 5.0 ? typed.split("").map((c, i) => (rnd(i + rg) > 0.6 ? "#%&@"[i % 4] : c)).join("") : typed;
  const wi = WORDS.reduce((a, w, i) => (t >= w[1] ? i : a), -1);
  const [word, ws] = wi >= 0 ? WORDS[wi] : ["", 0];
  const wl = t - ws, pop = ease(prog(wl, 0, 0.22)), split = (1 - pop) * 10;
  const intense = prog(t, 9.3, 0.7);

  return (
    <div style={fill({ clipPath: `inset(0 0 0 ${clamp(bx, 0, 100)}%)` })}>
      <div style={fill({ background: "radial-gradient(70% 80% at 50% 100%, rgba(255,59,78,0.22), transparent 70%)", opacity: ease(prog(t, 3.0, 1.5)) })} />
      {[1.8, 2.7, 3.6].map((s) => t > s && t < s + 0.3 && <div key={s} style={fill({ background: C.red, opacity: 0.12 * Math.exp(-(t - s) * 14) })} />)}
      <svg viewBox="0 0 100 56.25" preserveAspectRatio="none" style={fill({ width: "100%", height: "100%" })}>
        {glitch && <BoxLines t={t} color="#FF3B4E" dx={gx + 0.6} dy={gy} op={0.7} />}
        {glitch && <BoxLines t={t} color="#18D8FF" dx={gx - 0.6} dy={gy} op={0.7} />}
        <BoxLines t={t} color={col} dx={gx} dy={gy} op={flick} />
        {t > 1.4 && <Gear x={gxL - 6 * (dtb > 0 ? dtb : 0)} y={24 + fall.y} r={7.5} rot={gl(1.8, 1)} o={fall.o} />}
        {t > 2.3 && <Gear x={gxR + 6 * (dtb > 0 ? dtb : 0)} y={21 + fall.y} r={6} rot={gl(2.7, -1)} o={fall.o} />}
        {[0, 1, 2].map((i) => {
          const s = prog(t, 3.3 + i * 0.1, 0.35), tgt = [0.34, 0.62, 0.18][i];
          const w = 40 * tgt * (0.5 + 0.5 * ease(prog(t, 3.6, 1.5)));
          return (
            <g key={i} transform={`translate(30 ${39.5 + i * 3.5 + (1 - back(s)) * 25 + fall.y})`} opacity={s > 0 ? fall.o : 0}>
              <rect width="40" height="1.5" rx="0.4" fill="rgba(255,255,255,0.1)" />
              <rect width={w} height="1.5" rx="0.4" fill={C.red} />
              <text x="0" y="-0.5" fontSize="1.15" fill={C.mute} fontFamily={MONO}>Loading… {Math.round(tgt * 100)}%</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: cq(31.2 + gx), top: cq(13.9 + gy + fall.y * 0.6), fontFamily: MONO, fontSize: cq(1.7), color: col, opacity: fall.o * flick }}>{shown}</div>
      <div style={fill({ display: "grid", placeItems: "center" })}>
        {wi >= 0 && t < 10.2 && (
          <div style={{ fontSize: cq(12.5), fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, whiteSpace: "nowrap", transform: `translateX(${Math.sin(wl * 120) * (1 - pop) * 18 + Math.sin(t * 90) * intense * 12}px) scale(${1 + (1 - pop) * 0.35})`, textShadow: `${split + intense * 6}px 0 ${C.red}, ${-split - intense * 6}px 0 ${C.sky}` }}>{word}</div>
        )}
      </div>
    </div>
  );
}

const RL = [[9, "ERR_TIMEOUT"], [20, "LAG +4.2s"], [33, "FEATURE LOCKED"], [47, "TEMPLATE_ONLY"]];
function RedLines({ t }) {
  if (t < 3.2 || t > 11.6) return null;
  const bx = lerp(-10, 112, prog(t, 10.0, 0.95));
  return (
    <svg viewBox="0 0 100 56.25" preserveAspectRatio="none" style={fill({ width: "100%", height: "100%", pointerEvents: "none" })}>
      {RL.map(([y, label], li) => {
        const sweep = ease(prog(t, 3.2 + li * 0.3, 0.6)) * 100;
        const pulse = 0.55 + 0.45 * Math.sin(t * 8 + li);
        return (
          <g key={li}>
            {Array.from({ length: 16 }, (_, si) => {
              const x0 = si * 6.25, x1 = Math.min(x0 + 6.25, sweep);
              if (x1 <= x0) return null;
              const sx = x0 + 3.1, tb = 10.0 + ((sx + 10) / 122) * 0.95, d = t - tb;
              let tr = "", o = 1;
              if (d > 0) { tr = `translate(${(rnd(si * 7 + li) - 0.5) * d * 16} ${55 * d * d}) rotate(${(rnd(si + li * 3) - 0.5) * 260 * d} ${sx} ${y})`; o = 1 - prog(d, 0, 0.8); }
              return (
                <g key={si} transform={tr} opacity={o}>
                  <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.red} strokeWidth="0.6" opacity={0.15 * pulse} />
                  <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.red} strokeWidth="0.16" opacity={pulse} />
                </g>
              );
            })}
            {t < 10.0 && <line x1={((t * 55 + li * 37) % 130) - 15} y1={y} x2={((t * 55 + li * 37) % 130) - 7} y2={y} stroke="#fff" strokeWidth="0.2" opacity="0.8" />}
            {bx < 4 && <text x="1.2" y={y - 0.8} fontSize="1.2" fill={C.red} fontFamily={MONO} opacity={pulse}>{label}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function Beam({ t }) {
  if (t < 9.9 || t > 11.6) return null;
  const bx = lerp(-10, 112, prog(t, 10.0, 0.95));
  const fade = (1 - prog(t, 10.9, 0.6)) * clamp((t - 9.9) / 0.1);
  return (
    <>
      <div style={fill({ background: "linear-gradient(90deg, rgba(120,190,255,0.25), transparent)", clipPath: `inset(0 ${clamp(100 - bx, 0, 100)}% 0 0)`, opacity: fade, pointerEvents: "none" })} />
      <div style={{ position: "absolute", top: cq(-10), height: cq(80), left: cq(bx - 4), width: cq(8), transform: "skewX(-16deg)", opacity: fade, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(140,196,255,0.55) 35%, #fff 50%, rgba(140,196,255,0.55) 65%, transparent)", boxShadow: `0 0 ${cq(6)} ${cq(1)} rgba(77,163,255,0.8)` }} />
    </>
  );
}

/* ======================= LOCKUP (global, keyframed) ======================= */

function Lockup({ t, tw, sw, rowRef }) {
  const fs = 9;
  const W = fs * 1.55 + fs * 0.38 + (sw ? (tw / sw) * 100 : 33);
  let x = 50, y = 30, s = 1.15, o = 0;
  const small = { x: 4.5 + (W * 0.38) / 2, y: 5.6, s: 0.38 };
  if (t >= 11.5 && t < 45) {
    o = out3(prog(t, 11.5, 0.8));
    const m = inOut(prog(t, 14.4, 1.1));
    x = lerp(50, small.x, m); y = lerp(30, small.y, m); s = lerp(1.15, small.s, m);
  } else if (t >= 45 && t < 46) { x = small.x; y = small.y; s = small.s; o = 1 - prog(t, 45, 0.8); }
  else if (t >= 49.8) { x = 50; y = 8; s = 0.55; o = out3(prog(t, 49.8, 0.8)); }
  const glide = inOut(prog(t, 13.2, 0.9)), sol = out3(prog(t, 14.0, 0.8));
  return (
    <div style={fill({ display: "flex", alignItems: "center", justifyContent: "center", transform: `translate(${cq(x - 50)}, ${cq(y - 28.125)}) scale(${s})`, opacity: o, pointerEvents: "none", zIndex: 5 })}>
      <ChromeMark t={t} size={fs * 1.55} />
      <div style={{ width: tw * glide, marginLeft: cq(fs * 0.38 * glide), overflow: "hidden", flex: "none", padding: `${cq(1.5)} 0`, boxSizing: "content-box", marginTop: cq(-1.5), marginBottom: cq(-1.5) }}>
        <div style={{ width: "max-content" }}>
          <div ref={rowRef} style={{ display: "flex", fontSize: cq(fs), fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, width: "max-content" }}>
            {"Devntom".split("").map((l, i) => {
              const p = out3(prog(t, 13.3 + i * 0.06, 0.6));
              return <span key={i} style={{ display: "inline-block", opacity: p, filter: `blur(${(1 - p) * 8}px)`, transform: `translateY(${(1 - p) * 0.28}em)` }}>{l}</span>;
            })}
          </div>
          <div style={{ marginTop: cq(fs * 0.1), fontSize: cq(fs * 0.27), fontWeight: 500, letterSpacing: `${0.08 + 0.3 * sol}em`, opacity: sol, whiteSpace: "nowrap" }}>SOLUTIONS</div>
        </div>
      </div>
    </div>
  );
}

function ChromeMark({ t, size }) {
  const p = out3(prog(t, 11.5, 0.6));
  const wipe = inOut(prog(t, 11.6, 1.5));
  const e2 = wipe * 1.45, e1 = Math.max(0, e2 - 0.45);
  const shift = 320 * Math.sin((t - 11.5) * 0.9);
  const chromeO = 1 - 0.65 * inOut(prog(t, 15, 1));
  const glow = wipe * (0.85 + 0.15 * Math.sin(t * 1.6));
  return (
    <svg viewBox="150 255 935 780" style={{ width: cq(size), height: cq((size * 780) / 935), overflow: "visible", display: "block", flex: "none", opacity: p, filter: `blur(${(1 - p) * 10}px) drop-shadow(0 0 ${cq(0.5 + 1.8 * glow)} rgba(5,128,255,${0.15 + 0.4 * glow}))` }}>
      <defs>
        <linearGradient id="cmG" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stopColor="#2E98FF" /><stop offset="1" stopColor="#0570F0" /></linearGradient>
        <linearGradient id="cmC" gradientUnits="userSpaceOnUse" x1="150" y1="255" x2="1085" y2="1035" gradientTransform={`translate(${shift} 0)`} spreadMethod="reflect">
          <stop offset="0" stopColor="#fff" /><stop offset="0.2" stopColor="#9FD0FF" /><stop offset="0.4" stopColor="#0580FF" /><stop offset="0.55" stopColor="#06306E" /><stop offset="0.72" stopColor="#3A8DFF" /><stop offset="0.88" stopColor="#D6EBFF" /><stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient id="cmW" gradientUnits="userSpaceOnUse" x1="150" y1="500" x2="1085" y2="668">
          <stop offset="0" stopColor="#fff" /><stop offset={clamp(e1)} stopColor="#fff" /><stop offset={clamp(e2)} stopColor="#000" /><stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="cmH" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.5" /><stop offset="0.5" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <mask id="cmM" maskUnits="userSpaceOnUse" x="100" y="200" width="1050" height="880"><rect x="100" y="200" width="1050" height="880" fill="url(#cmW)" /></mask>
      </defs>
      <g mask="url(#cmM)">
        <path d={D_ALL} fillRule="evenodd" fill="url(#cmG)" />
        <path d={D_ALL} fillRule="evenodd" fill="url(#cmC)" opacity={chromeO} />
        <path d={D_ALL} fillRule="evenodd" fill="url(#cmH)" />
      </g>
    </svg>
  );
}

/* ======================= SCENE 2: THE SHIFT (10.4-25.5s) ======================= */

const GL = "01<>/{}#_=+*;()";
const CARDS = [
  { x: 48, y: 13, w: 24, h: 15, z: 30, k: "chart" }, { x: 74, y: 10, w: 20, h: 11, z: 60, k: "kpi" },
  { x: 76, y: 24, w: 18, h: 15, z: 10, k: "flow" }, { x: 50, y: 31, w: 22, h: 15, z: 50, k: "tasks" }, { x: 74, y: 41, w: 20, h: 9, z: -20, k: "chips" },
];

function CardBody({ k, t, c }) {
  const L = (txt) => <div style={{ fontSize: cq(1.2), color: C.mute, marginBottom: cq(0.5) }}>{txt}</div>;
  if (k === "chart") {
    const pts = Array.from({ length: 14 }, (_, i) => `${(i / 13) * 100},${38 - 10 * Math.sin(i * 0.7 + t * 1.5) - i * 1.4}`).join(" ");
    return (<div style={{ padding: cq(1.2) }}>{L("Analytics")}<svg viewBox="0 0 100 45" style={{ width: "100%", height: cq(c.h - 5) }}><polyline points={pts} fill="none" stroke={C.sky} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>);
  }
  if (k === "kpi") {
    const v = 48200 * ease(prog(t, 15.8, 1.5));
    return (<div style={{ padding: cq(1.2) }}>{L("Revenue")}<div style={{ fontSize: cq(3.4), fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>${money(v)}</div><span style={{ fontSize: cq(1.2), padding: `${cq(0.2)} ${cq(0.8)}`, borderRadius: 99, background: "rgba(5,128,255,0.3)", color: C.sky }}>+12.4%</span></div>);
  }
  if (k === "flow") {
    const q = (t * 0.6) % 1;
    return (
      <svg viewBox="0 0 100 80" style={{ width: "100%", height: "100%" }}>
        <path d="M18 40 L50 18 L82 40 L50 62 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {[[18, 40], [50, 18], [82, 40], [50, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={i === Math.floor(q * 4) ? C.sky : C.blue} />)}
        <circle cx={lerp(18, 50, q)} cy={lerp(40, 18, q)} r="2.2" fill="#fff" />
      </svg>
    );
  }
  if (k === "tasks") {
    return (
      <div style={{ padding: cq(1.2) }}>{L("Workflow")}
        {[17.0, 18.0, 19.0].map((s, i) => {
          const d = out3(prog(t, s, 0.4));
          return (<div key={i} style={{ display: "flex", alignItems: "center", gap: cq(1), marginBottom: cq(1) }}>
            <i style={{ width: cq(1.7), height: cq(1.7), borderRadius: "50%", border: `0.15cqw solid ${C.sky}`, background: `rgba(5,128,255,${d})` }} /><Bx w={10 + i * 2} h={0.8} /></div>);
        })}
      </div>
    );
  }
  return (
    <div style={{ padding: cq(1.2), display: "flex", gap: cq(1), alignItems: "center", height: "100%" }}>
      {["API", "CRM", "ERP"].map((n, i) => {
        const on = Math.floor(t * 1.4) % 3 === i;
        return <span key={n} style={{ padding: `${cq(0.6)} ${cq(1.4)}`, borderRadius: 99, fontSize: cq(1.4), fontWeight: 700, border: `1px solid ${on ? C.sky : "rgba(255,255,255,0.2)"}`, background: on ? "rgba(5,128,255,0.35)" : "transparent", boxShadow: on ? `0 0 ${cq(1.2)} ${C.blue}` : "none" }}>{n}</span>;
      })}
    </div>
  );
}

function Shift({ t }) {
  const w = win(t, 10.4, 25.6, 0.5);
  if (t < 10.4 || t > 25.7) return null;
  const ex = inOut(prog(t, 24.4, 0.8));
  const bf = win(t, 10.6, 13.3, 0.4);
  const disc = out3(prog(t, 11.3, 0.9)) * (1 - out3(prog(t, 13.4, 0.8)));
  const sa = ease(prog(t, 13.6, 0.8)) * (1 - ease(prog(t, 15.4, 0.4)));
  const bc = 15.0;
  return (
    <div style={fill({ transform: `scale(${1 + 0.25 * ex})`, opacity: 1 - ex })}>
      {bf.on && (
        <div style={{ position: "absolute", left: 0, right: 0, top: cq(6), display: "flex", justifyContent: "center", gap: cq(2), fontSize: cq(10), fontWeight: 800, letterSpacing: "-0.04em", opacity: bf.o, filter: `blur(${(1 - bf.o) * 6}px)` }}>
          <Rise p={ease(prog(t, 10.6, 0.5))}>Break</Rise><Rise p={ease(prog(t, 10.8, 0.5))} style={{ color: C.sky }}>Free.</Rise>
        </div>
      )}
      {disc > 0.01 && (
        <div style={{ position: "absolute", left: cq(50 - 15), top: cq(30 - 15), width: cq(30), height: cq(30), opacity: disc, transform: `scale(${0.85 + 0.15 * disc})`,
          borderRadius: `${50 + 6 * Math.sin(t * 1.3)}% ${50 - 6 * Math.sin(t * 1.3)}% ${50 + 5 * Math.cos(t * 1.1)}% ${50 - 5 * Math.cos(t * 1.1)}%`,
          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.3), rgba(255,255,255,0.05) 40%, rgba(5,128,255,0.2) 70%)",
          border: "1px solid rgba(255,255,255,0.28)", backdropFilter: "blur(6px)", boxShadow: `inset 0 0 ${cq(3)} rgba(255,255,255,0.18), 0 0 ${cq(8)} rgba(5,128,255,0.45)` }} />
      )}
      {sa > 0.01 && Array.from({ length: 7 }, (_, k) => Array.from({ length: 16 }, (_, i) => {
        const s = (i / 16 + t * 0.35 + k * 0.13) % 1;
        const ch = GL[Math.floor(rnd(i * 3 + k * 17 + Math.floor(t * 12)) * GL.length)];
        return <span key={`${k}-${i}`} style={{ position: "absolute", left: cq(4 + s * 92), top: cq(14 + k * 5.2 + Math.sin(s * 7 + t * 2.4 + k) * 3), fontFamily: MONO, fontSize: cq(1.7), color: k % 2 ? C.sky : "#8CC4FF", opacity: sa * Math.min(1, s / 0.1) * (0.3 + 0.7 * s) }}>{ch}</span>;
      }))}

      <div style={{ position: "absolute", left: cq(5), top: cq(15) }}>
        <Rise p={ease(prog(t, 14.8, 0.6))} style={{ fontSize: cq(10), fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1 }}>Built</Rise>
        <Rise p={ease(prog(t, 14.95, 0.6))} style={{ fontSize: cq(10), fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, color: C.sky }}>Custom.</Rise>
        <div style={{ marginTop: cq(1.6), fontSize: cq(2.1), color: C.mute, maxWidth: cq(34), opacity: out3(prog(t, 16.0, 0.6)) }}>Software engineered around your exact workflow.</div>
        {["Fits your workflow", "Plugs into your tools", "Scales as you grow"].map((s, i) => {
          const p = out3(prog(t, 19 + i * 0.6, 0.5));
          return (<div key={s} style={{ display: "flex", alignItems: "center", gap: cq(1), marginTop: cq(1.3), fontSize: cq(2), opacity: p, transform: `translateX(${cq((1 - p) * -3)})` }}>
            <svg viewBox="0 0 20 20" style={{ width: cq(2.2), height: cq(2.2) }}><circle cx="10" cy="10" r="9" fill={C.blue} /><path d="M5.5 10.5 L8.8 13.6 L14.5 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{s}</div>);
        })}
      </div>

      <div style={fill({ perspective: "1400px" })}>
        <div style={fill({ transformStyle: "preserve-3d", transform: "rotateY(-16deg) rotateX(7deg)", transformOrigin: "70% 50%" })}>
          {CARDS.map((c, i) => {
            const p = out3(prog(t, bc + 0.6 + i * 0.12, 0.7));
            if (p <= 0) return null;
            return (
              <div key={i} style={{ ...glass, position: "absolute", left: cq(c.x), top: cq(c.y), width: cq(c.w), height: cq(c.h), borderRadius: cq(1.4), overflow: "hidden", opacity: p,
                transform: `translateZ(${c.z}px) translateY(${cq(Math.sin(t * 1.2 + i * 1.3) * 0.5)}) scale(${0.7 + 0.3 * p})`, filter: `blur(${(1 - p) * 8}px)`, boxShadow: `0 ${cq(1.5)} ${cq(4)} rgba(0,0,0,0.4)` }}>
                <CardBody k={c.k} t={t} c={c} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ======================= SCENE 3: SHOWCASE (24.9-45.3s) ======================= */

function Blk({ x, y, w, h, t, i, from, fillP, label, children }) {
  const s = out3(prog(t, 25.4 + i * 0.22, 0.7));
  return (
    <div style={{ position: "absolute", left: cq(x + from[0] * (1 - s)), top: cq(y + from[1] * (1 - s)), width: cq(w), height: cq(h), opacity: s, borderRadius: cq(1), overflow: "hidden",
      border: `${cq(0.15)} ${fillP > 0.5 ? "solid" : "dashed"} ${fillP > 0.5 ? "rgba(255,255,255,0.14)" : C.sky}`, background: `rgba(255,255,255,${0.06 * fillP})`, boxShadow: fillP < 0.5 ? `0 0 ${cq(1)} rgba(77,163,255,0.25)` : "none" }}>
      {fillP < 0.6 && <span style={{ position: "absolute", left: cq(0.8), top: cq(0.6), fontFamily: MONO, fontSize: cq(1.05), color: C.sky, opacity: (1 - fillP / 0.6) * 0.85 }}>{label}</span>}
      <div style={{ position: "absolute", inset: 0, opacity: fillP }}>{children}</div>
    </div>
  );
}

function Dashboard({ t }) {
  const fp = inOut(prog(t, 28.0, 1.5));
  const ds = inOut(prog(t, 31.0, 0.7));
  const tab = out3(prog(t, 30.9, 0.35));
  const cnt = (v) => v * ease(prog(t, 28.4, 1.6));
  const bars = Array.from({ length: 14 }, (_, j) => lerp(0.35 + 0.4 * Math.abs(Math.sin(j * 1.7)), 0.3 + 0.6 * (j / 13) + 0.1 * Math.sin(j), ds));
  const cx = t < 30.7 ? lerp(88, 63.5, inOut(prog(t, 29.6, 1.1))) : lerp(63.5, 30, inOut(prog(t, 31.2, 0.8)));
  const cy = t < 30.7 ? lerp(52, 11.6, inOut(prog(t, 29.6, 1.1))) : lerp(11.6, 33, inOut(prog(t, 31.2, 0.8)));
  const press = t > 30.85 && t < 31.05 ? 1 : 0;
  return (
    <div style={fill()}>
      <div style={{ ...glass, position: "absolute", left: cq(12), top: cq(9), width: cq(76), height: cq(38), borderRadius: cq(1.6), boxShadow: `0 ${cq(2)} ${cq(6)} rgba(0,0,0,0.5)` }}>
        <Blk t={t} i={0} x={0} y={0} w={10} h={38} from={[-10, 0]} fillP={fp} label="Sidebar">
          <div style={{ padding: cq(1.4) }}><div style={{ width: cq(2.4), height: cq(2.4), borderRadius: cq(0.6), background: C.blue, marginBottom: cq(2) }} />{[0, 1, 2, 3, 4].map((i) => <Bx key={i} w={6} h={1} c={i === 1 ? C.sky : "rgba(255,255,255,0.18)"} s={{ marginBottom: cq(1.6) }} />)}</div>
        </Blk>
        <Blk t={t} i={1} x={10.8} y={0.8} w={64.4} h={4.6} from={[0, -6]} fillP={fp} label="Topbar">
          <div style={{ position: "relative", height: "100%" }}>
            <Bx w={12} h={1.8} r={1} s={{ position: "absolute", left: cq(1), top: cq(1.4) }} />
            {["Overview", "Reports", "Team"].map((n, i) => <span key={n} style={{ position: "absolute", left: cq(30 + i * 11), top: cq(1.3), fontSize: cq(1.5), color: (i === 0 && tab < 0.5) || (i === 1 && tab >= 0.5) ? "#fff" : C.mute }}>{n}</span>)}
            <i style={{ position: "absolute", left: cq(lerp(30, 41, tab)), bottom: 0, width: cq(7), height: cq(0.3), background: C.sky, borderRadius: 9 }} />
            <i style={{ position: "absolute", right: cq(1), top: cq(1.1), width: cq(2.4), height: cq(2.4), borderRadius: "50%", background: "linear-gradient(135deg,#4DA3FF,#6A5CFF)" }} />
          </div>
        </Blk>
        {[["Users", 12400, ""], ["Revenue", 84, "k"], ["Uptime", 98.6, "%"]].map(([n, v, u], i) => (
          <Blk key={n} t={t} i={2 + i} x={11 + i * 21.4} y={6.8} w={19.8} h={8.5} from={[0, 8]} fillP={fp} label="KPI">
            <div style={{ padding: cq(1.2) }}><div style={{ fontSize: cq(1.2), color: C.mute }}>{n}</div>
              <div style={{ fontSize: cq(3), fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{n === "Revenue" ? "$" : ""}{u === "%" ? cnt(v).toFixed(1) : money(cnt(v))}{u}</div></div>
          </Blk>
        ))}
        <Blk t={t} i={5} x={11} y={16.6} w={38.4} h={20} from={[-8, 6]} fillP={fp} label="Chart">
          <div style={{ display: "flex", alignItems: "flex-end", gap: cq(0.7), height: "100%", padding: cq(1.6) }}>
            {bars.map((b, j) => <i key={j} style={{ flex: 1, height: cq(b * 14 * ease(prog(t, 28.6 + j * 0.03, 0.8))), borderRadius: cq(0.3), background: j > 9 ? C.sky : "rgba(5,128,255,0.6)" }} />)}
          </div>
        </Blk>
        <Blk t={t} i={6} x={50.4} y={16.6} w={24.8} h={20} from={[8, 6]} fillP={fp} label="List">
          <div style={{ padding: cq(1.2) }}>{[0, 1, 2, 3].map((i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: cq(0.8), marginBottom: cq(1.3) }}><i style={{ width: cq(2), height: cq(2), borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} /><Bx w={9 - i} h={0.8} /><span style={{ marginLeft: "auto", fontSize: cq(1), padding: `${cq(0.1)} ${cq(0.6)}`, borderRadius: 99, background: i % 2 ? "rgba(255,255,255,0.1)" : "rgba(5,128,255,0.35)" }}>{i % 2 ? "Idle" : "Live"}</span></div>)}</div>
        </Blk>
      </div>
      {t > 29.5 && t < 32.4 && <Cursor x={cx} y={cy} press={press} o={out3(prog(t, 29.5, 0.3))} />}
      {t > 30.9 && t < 31.5 && <i style={{ position: "absolute", left: cq(63.5 - 2), top: cq(11.6 - 2), width: cq(4), height: cq(4), borderRadius: "50%", border: `0.2cqw solid ${C.sky}`, transform: `scale(${prog(t, 30.9, 0.5) * 1.6})`, opacity: 1 - prog(t, 30.9, 0.5) }} />}
    </div>
  );
}

function Network({ t }) {
  const nodes = Array.from({ length: 8 }, (_, i) => ({ x: 26 + Math.cos((i * Math.PI) / 4) * 16, y: 28 + Math.sin((i * Math.PI) / 4) * 11 }));
  const count = Math.round(lerp(8, 128, ease(prog(t, 32.6, 2.2))));
  return (
    <div style={{ ...glass, position: "absolute", left: cq(5), top: cq(8), width: cq(42), height: cq(40), borderRadius: cq(1.6) }}>
      <svg viewBox="0 0 42 40" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {nodes.map((n, i) => {
          const nx = n.x - 5, ny = n.y - 8, d = ease(prog(t, 32.4 + i * 0.2, 0.5));
          const nxt = nodes[(i + 1) % 8], cr = ease(prog(t, 34.0 + i * 0.1, 0.5));
          const q = (t * 0.9 + i * 0.37) % 1, arrive = q > 0.88 ? (q - 0.88) / 0.12 : 0;
          return (
            <g key={i}>
              <line x1="21" y1="20" x2={lerp(21, nx, d)} y2={lerp(20, ny, d)} stroke={C.sky} strokeWidth="0.2" opacity="0.7" />
              <line x1={nx} y1={ny} x2={lerp(nx, nxt.x - 5, cr)} y2={lerp(ny, nxt.y - 8, cr)} stroke="rgba(255,255,255,0.25)" strokeWidth="0.15" />
              {d > 0.95 && <circle cx={lerp(21, nx, q)} cy={lerp(20, ny, q)} r="0.5" fill="#fff" />}
              {d > 0.3 && <circle cx={nx} cy={ny} r={1.1 + arrive * 0.6} fill={arrive > 0 ? "#fff" : C.blue} opacity={d} />}
            </g>
          );
        })}
        <circle cx="21" cy="20" r="3.6" fill={C.blue} stroke="#fff" strokeWidth="0.25" />
        <path d="M18.8 21.6 Q17.6 21.6 17.6 20.3 Q17.6 19 18.9 18.9 Q19.2 17.2 21 17.2 Q22.8 17.2 23.1 18.9 Q24.4 19 24.4 20.3 Q24.4 21.6 23.2 21.6 Z" fill="#fff" />
      </svg>
      <div style={{ position: "absolute", left: cq(1.6), bottom: cq(1.4) }}>
        <div style={{ fontSize: cq(1.2), color: C.mute }}>Nodes online</div>
        <div style={{ fontSize: cq(3.4), fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{count}</div>
      </div>
    </div>
  );
}

function LiveChart({ t }) {
  const val = (ts) => 0.28 + 0.05 * Math.sin(ts * 7) + 0.03 * Math.sin(ts * 17) + 0.6 * ease(prog(ts, 35.0, 0.5)) * (1 - 0.2 * prog(ts, 35.8, 1.0));
  const pts = Array.from({ length: 48 }, (_, j) => [(j / 47) * 100, 50 - val(t - (47 - j) * 0.06) * 46]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const peak = pts[47], dt = t - 35.35;
  const rps = lerp(1240, 98600, ease(prog(t, 35.0, 0.9)));
  return (
    <div style={{ ...glass, position: "absolute", left: cq(52), top: cq(8), width: cq(43), height: cq(40), borderRadius: cq(1.6) }}>
      <div style={{ display: "flex", alignItems: "center", gap: cq(0.8), padding: `${cq(1.6)} ${cq(1.8)} 0`, fontSize: cq(1.5), color: C.mute }}>
        <i style={{ width: cq(0.9), height: cq(0.9), borderRadius: "50%", background: "#3DDC97", boxShadow: "0 0 1cqw #3DDC97", opacity: 0.6 + 0.4 * Math.sin(t * 6) }} />Live traffic
      </div>
      <svg viewBox="0 0 100 50" style={{ position: "absolute", left: cq(1.8), top: cq(6), width: cq(39.4), height: cq(21), overflow: "visible" }}>
        <defs><linearGradient id="lcA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity="0.5" /><stop offset="1" stopColor={C.blue} stopOpacity="0" /></linearGradient></defs>
        <polygon points={`0,50 ${line} 100,50`} fill="url(#lcA)" />
        <polyline points={line} fill="none" stroke={C.sky} strokeWidth="0.9" strokeLinejoin="round" />
        <circle cx={peak[0]} cy={peak[1]} r="1.4" fill="#fff" />
        {dt > 0 && dt < 1.0 && Array.from({ length: 18 }, (_, i) => {
          const a = (i / 18) * 6.283 + rnd(i) * 0.5, v = 8 + rnd(i + 9) * 22, r = v * ease(dt);
          return <circle key={i} cx={peak[0] + Math.cos(a) * r} cy={peak[1] + Math.sin(a) * r} r={0.9 * (1 - dt)} fill={i % 2 ? "#fff" : C.sky} opacity={1 - dt} />;
        })}
      </svg>
      {t > 35.5 && <div style={{ position: "absolute", right: cq(2), top: cq(3.6), padding: `${cq(0.4)} ${cq(1.2)}`, borderRadius: 99, background: C.blue, fontSize: cq(1.3), fontWeight: 700, opacity: out3(prog(t, 35.5, 0.4)) }}>New peak</div>}
      <div style={{ position: "absolute", left: cq(1.8), right: cq(1.8), bottom: cq(1.6), display: "flex", justifyContent: "space-between" }}>
        <div><div style={{ fontSize: cq(1.2), color: C.mute }}>Requests / sec</div><div style={{ fontSize: cq(3.6), fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{money(rps)}</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: cq(1.2), color: C.mute }}>Latency</div><div style={{ fontSize: cq(3.6), fontWeight: 800 }}>42<span style={{ fontSize: cq(1.6), color: C.mute }}> ms</span></div></div>
      </div>
    </div>
  );
}

function Micro({ t }) {
  const A = win(t, 38.0, 40.6), B = win(t, 40.5, 42.9), M = win(t, 42.8, 45.1);
  const idxF = [1, 2, 3].reduce((a, k) => a + ease(prog(t, 38.25 + k * 0.5, 0.25)), 0);
  const tabs = ["Overview", "Analytics", "Reports", "Settings"];
  const glowBtn = Math.floor(Math.max(0, t - 38.4) / 0.7) % 3;
  const L = inOut(prog(t, 41.0, 0.4)) - inOut(prog(t, 42.0, 0.4));
  const cardBg = mixc("#101C33", "#F4F7FB", L), cardTx = mixc("#FFFFFF", "#0A1325", L);
  const meters = [["Page load", 43.0], ["API response", 43.4], ["Build", 43.8]];
  const ring = ease(prog(t, 43.0, 1.5));
  const R = 42, Lc = 2 * Math.PI * R;
  const macro = lerp(1.35, 1.15, prog(t, 38.0, 7));
  return (
    <div style={fill({ transform: `scale(${macro})` })}>
      {A.on && (
        <div style={fill({ display: "grid", placeItems: "center", opacity: A.o, transform: `scale(${A.sc})` })}>
          <div>
            <div style={{ position: "relative", display: "flex", width: cq(60), padding: cq(0.8), borderRadius: 99, ...glass }}>
              <i style={{ position: "absolute", top: cq(0.8), left: cq(0.8 + idxF * 14.8), width: cq(14.8), height: cq(5.6), borderRadius: 99, background: `linear-gradient(135deg, ${C.sky}, ${C.blue})`, boxShadow: `0 0 ${cq(3)} ${C.blue}` }} />
              {tabs.map((n, i) => <span key={n} style={{ position: "relative", width: cq(14.8), textAlign: "center", fontSize: cq(2.2), fontWeight: 600, lineHeight: 1, padding: `${cq(1.7)} 0`, color: Math.abs(idxF - i) < 0.5 ? "#fff" : C.mute }}>{n}</span>)}
            </div>
            <div style={{ display: "flex", gap: cq(2), justifyContent: "center", marginTop: cq(4) }}>
              {["Get started", "Docs", "Pricing"].map((n, i) => (
                <span key={n} style={{ padding: `${cq(1.3)} ${cq(3)}`, borderRadius: cq(1.2), fontSize: cq(2), fontWeight: 700, background: i === glowBtn ? C.blue : "rgba(255,255,255,0.08)", border: `1px solid ${i === glowBtn ? C.sky : "rgba(255,255,255,0.18)"}`, boxShadow: i === glowBtn ? `0 0 ${cq(4)} rgba(5,128,255,0.8)` : "none", transform: `scale(${i === glowBtn ? 1.06 : 1})`, transition: "all .25s" }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {B.on && (
        <div style={fill({ display: "flex", alignItems: "center", justifyContent: "center", gap: cq(8), opacity: B.o, transform: `scale(${B.sc})` })}>
          <div style={{ position: "relative", width: cq(20), height: cq(10), borderRadius: 99, background: mixc("#1B2B4B", "#4DA3FF", L), boxShadow: `0 0 ${cq(3)} rgba(77,163,255,${0.3 + 0.4 * L})` }}>
            <i style={{ position: "absolute", top: cq(1), left: cq(1 + 10 * L), width: cq(8), height: cq(8), borderRadius: "50%", background: "#fff", boxShadow: "0 0.3cqw 1cqw rgba(0,0,0,0.4)" }} />
            <span style={{ position: "absolute", left: cq(2.6), top: cq(2.6), fontSize: cq(3.4), opacity: 1 - L }}>&#9790;</span>
            <span style={{ position: "absolute", right: cq(2.4), top: cq(2.4), fontSize: cq(3.6), opacity: L, color: "#fff" }}>&#9788;</span>
          </div>
          <div style={{ width: cq(26), padding: cq(2.2), borderRadius: cq(1.6), background: cardBg, color: cardTx, border: "1px solid rgba(128,150,190,0.4)", boxShadow: `0 ${cq(1.5)} ${cq(4)} rgba(0,0,0,0.35)` }}>
            <div style={{ fontSize: cq(2.2), fontWeight: 800 }}>Dashboard</div>
            {[0.8, 0.6, 0.7].map((w, i) => <i key={i} style={{ display: "block", height: cq(0.9), width: `${w * 100}%`, borderRadius: 9, background: mixc("#FFFFFF", "#0A1325", L), opacity: 0.18, marginTop: cq(1.2) }} />)}
            <span style={{ display: "inline-block", marginTop: cq(2), padding: `${cq(0.8)} ${cq(2)}`, borderRadius: 99, background: C.blue, color: "#fff", fontSize: cq(1.5), fontWeight: 700 }}>Continue</span>
          </div>
        </div>
      )}
      {M.on && (
        <div style={fill({ display: "flex", alignItems: "center", justifyContent: "center", gap: cq(7), opacity: M.o, transform: `scale(${M.sc})` })}>
          <div style={{ width: cq(30) }}>
            {meters.map(([n, s]) => {
              const f = ease(prog(t, s, 0.5));
              return (<div key={n} style={{ marginBottom: cq(2.4) }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: cq(1.7), marginBottom: cq(0.6) }}><span>{n}</span><span style={{ color: C.sky, fontVariantNumeric: "tabular-nums" }}>{Math.round(f * 100)}%</span></div>
                <div style={{ height: cq(1.1), borderRadius: 9, background: "rgba(255,255,255,0.12)" }}><div style={{ height: "100%", width: `${f * 100}%`, borderRadius: 9, background: `linear-gradient(90deg, ${C.blue}, ${C.sky})`, boxShadow: f >= 1 ? `0 0 ${cq(2)} ${C.blue}` : "none" }} /></div>
              </div>);
            })}
          </div>
          <div style={{ position: "relative", width: cq(20), height: cq(20), filter: `drop-shadow(0 0 ${cq(ring * 2)} rgba(5,128,255,0.8))` }}>
            <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
              <circle cx="50" cy="50" r={R} fill="none" stroke={C.sky} strokeWidth="8" strokeLinecap="round" strokeDasharray={Lc} strokeDashoffset={Lc * (1 - ring)} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: cq(6.4), fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{Math.round(ring * 100)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Showcase({ t }) {
  if (t < 24.8 || t > 45.4) return null;
  const a = win(t, 24.9, 32.3, 0.5), b = win(t, 31.8, 38.3, 0.5), c = win(t, 37.8, 45.4, 0.5);
  return (
    <div style={fill()}>
      <Giant t={t} s={25.2} e={32.3} text="Scalable." />
      <Giant t={t} s={32.2} e={38.3} text="Ultra-Fast." size={14} />
      <Giant t={t} s={38.2} e={45.4} text="Flawless UI." size={12.5} />
      {a.on && <div style={fill({ opacity: a.o, transform: `scale(${a.sc})` })}><Dashboard t={t} /></div>}
      {b.on && <div style={fill({ opacity: b.o, transform: `scale(${b.sc})` })}><Network t={t} /><LiveChart t={t} /></div>}
      {c.on && <div style={fill({ opacity: c.o })}><Micro t={t} /></div>}
    </div>
  );
}

/* ======================= SCENE 4: FINALE (45-60s) ======================= */

const TILES = Array.from({ length: 14 }, (_, i) => {
  const y = 1 - (i / 13) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
  return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, sx: rnd(i * 2 + 5) * 130 - 15, sy: rnd(i * 2 + 6) * 80 - 12, k: i % 6 };
});

function TileFace({ k, t }) {
  const q = (t * 1.5) % 1;
  if (k === 0) return <div style={{ display: "flex", alignItems: "flex-end", gap: cq(0.3), height: "100%", padding: cq(0.6) }}>{[0.5, 0.8, 0.6, 1].map((h, i) => <i key={i} style={{ flex: 1, height: `${h * (0.7 + 0.3 * Math.sin(t * 2 + i)) * 100}%`, background: C.sky, borderRadius: 2 }} />)}</div>;
  if (k === 1) return <svg viewBox="0 0 40 40" style={{ width: "100%", height: "100%" }}><circle cx="20" cy="20" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" /><circle cx="20" cy="20" r="12" fill="none" stroke={C.sky} strokeWidth="4" strokeDasharray={`${50 + 20 * Math.sin(t)} 100`} transform="rotate(-90 20 20)" /></svg>;
  if (k === 2) return <div style={{ display: "grid", placeItems: "center", height: "100%" }}><div style={{ position: "relative", width: cq(3.6), height: cq(1.8), borderRadius: 99, background: q > 0.5 ? C.blue : "rgba(255,255,255,0.2)" }}><i style={{ position: "absolute", top: cq(0.2), left: q > 0.5 ? cq(2) : cq(0.2), width: cq(1.4), height: cq(1.4), borderRadius: "50%", background: "#fff" }} /></div></div>;
  if (k === 3) return <svg viewBox="0 0 40 24" style={{ width: "100%", height: "100%" }}><polyline points="2,20 10,12 18,16 28,6 38,9" fill="none" stroke={C.sky} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (k === 4) return <svg viewBox="0 0 40 24" style={{ width: "100%", height: "100%" }}><line x1="8" y1="12" x2="20" y2="6" stroke="rgba(255,255,255,0.3)" /><line x1="20" y1="6" x2="32" y2="14" stroke="rgba(255,255,255,0.3)" />{[[8, 12], [20, 6], [32, 14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={C.sky} />)}</svg>;
  return <div style={{ display: "grid", placeItems: "center", height: "100%", fontFamily: MONO, fontSize: cq(1.7), color: C.sky }}>{"</>"}</div>;
}

function Finale({ t }) {
  if (t < 44.8) return null;
  const R = 17, cx = 50, cy = 26.5, spin = (t - 45) * 0.8;
  const ex = inOut(prog(t, 48.8, 1.3));
  const core = out3(prog(t, 46.4, 0.9)) * (1 - ex);
  const ringQ = prog(t, 48.9, 1.0);
  const ctaT = t - 50;
  const click = t > 56.1 && t < 56.3 ? 1 : 0;
  const cur = t < 55.9 ? { x: lerp(82, 49, inOut(prog(t, 54.6, 1.3))), y: lerp(56, 44.5, inOut(prog(t, 54.6, 1.3))) } : { x: 49, y: 44.5 };
  const btn = back(prog(t, 53.8, 0.5)), glow = 0.5 + 0.5 * Math.sin(t * 4);
  return (
    <div style={fill({ opacity: out3(prog(t, 44.8, 0.4)) })}>
      {core > 0.01 && (
        <div style={{ position: "absolute", left: cq(cx - R * 1.05), top: cq(cy - R * 1.05), width: cq(R * 2.1), height: cq(R * 2.1), borderRadius: "50%", opacity: core, transform: `scale(${1 + ex * 5})`,
          background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3), rgba(5,128,255,0.22) 40%, rgba(5,20,60,0.55) 75%)", border: "1px solid rgba(255,255,255,0.22)", boxShadow: `inset 0 0 ${cq(4)} rgba(77,163,255,0.4), 0 0 ${cq(10)} rgba(5,128,255,0.5)` }} />
      )}
      {ringQ > 0 && ringQ < 1 && <i style={{ position: "absolute", left: cq(cx), top: cq(cy), width: cq(ringQ * 110), height: cq(ringQ * 110), marginLeft: cq(-ringQ * 55), marginTop: cq(-ringQ * 55), borderRadius: "50%", border: `0.2cqw solid ${C.sky}`, opacity: (1 - ringQ) * 0.6 }} />}
      {t < 50.2 && TILES.map((tl, i) => {
        const q = back(prog(t, 45 + i * 0.1, 1.2)), qa = prog(t, 45 + i * 0.1, 1.2);
        const ca = Math.cos(spin), sa = Math.sin(spin);
        const x2 = tl.x * ca + tl.z * sa, z2 = -tl.x * sa + tl.z * ca;
        const pr = 1 / (1 - z2 * 0.25), rad = R * (1 + ex * 5);
        const tx = cx + x2 * rad * pr, ty = cy + tl.y * rad * pr;
        const px = lerp(tl.sx, tx, q), py = lerp(tl.sy, ty, q);
        const sc = (0.55 + 0.45 * (z2 + 1) / 2) * lerp(0.5, 1, qa) * (1 + ex * 1.5);
        return (
          <div key={i} style={{ ...glass, position: "absolute", left: cq(px - 3.5), top: cq(py - 2.5), width: cq(7), height: cq(5), borderRadius: cq(0.8), overflow: "hidden", zIndex: Math.round((z2 + 1) * 10),
            opacity: (0.35 + 0.65 * (z2 + 1) / 2) * clamp(qa * 3) * (1 - ex), transform: `scale(${sc}) rotate(${(1 - qa) * 180}deg)` }}>
            <TileFace k={tl.k} t={t} />
          </div>
        );
      })}

      {t >= 50 && (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: cq(14.5), textAlign: "center", fontSize: cq(6.4), fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.05 }}>
            <Rise p={ease(prog(ctaT, 0.3, 0.6))}>Stop Adapting to Software.</Rise>
            <Rise p={ease(prog(ctaT, 1.8, 0.6))} style={{ color: C.sky }}>Make Software Adapt to You.</Rise>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: cq(33), textAlign: "center", fontSize: cq(1.9), color: C.mute, opacity: out3(prog(ctaT, 3.2, 0.7)), transform: `translateY(${cq((1 - out3(prog(ctaT, 3.2, 0.7))) * 1.5)})` }}>
            <b style={{ color: "#fff" }}>DEVNTOM Solutions</b> &nbsp;|&nbsp; Custom Software &amp; Web Development
          </div>
          <div style={{ position: "absolute", left: cq(50 - 12.5), top: cq(41.7), width: cq(25), height: cq(5.6), borderRadius: 99, display: "grid", placeItems: "center", fontSize: cq(2.2), fontWeight: 700, background: `linear-gradient(135deg, ${C.sky}, ${C.blue})`, opacity: clamp(btn * 3),
            transform: `scale(${clamp(btn, 0, 1.06) * (1 - 0.05 * click)})`, boxShadow: `0 0 ${cq(1.5 + 3.5 * glow)} rgba(5,128,255,0.75)` }}>Start Your Project</div>
          {t > 56.1 && t < 56.9 && <i style={{ position: "absolute", left: cq(49), top: cq(44.5), width: cq(prog(t, 56.1, 0.8) * 28), height: cq(prog(t, 56.1, 0.8) * 28), marginLeft: cq(-prog(t, 56.1, 0.8) * 14), marginTop: cq(-prog(t, 56.1, 0.8) * 14), borderRadius: "50%", border: `0.2cqw solid ${C.sky}`, opacity: 1 - prog(t, 56.1, 0.8) }} />}
          <div style={{ position: "absolute", left: 0, right: 0, top: cq(48.9), textAlign: "center", fontSize: cq(1.9), letterSpacing: "0.04em", color: C.sky, opacity: out3(prog(ctaT, 4.2, 0.7)) }}>www.devntom.com</div>
          {t > 54.5 && t < 58.2 && <Cursor x={cur.x} y={cur.y} press={click} o={out3(prog(t, 54.5, 0.3)) * (1 - prog(t, 57.4, 0.6))} />}
        </>
      )}
    </div>
  );
}