"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Bricolage_Grotesque } from "next/font/google";

const font = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });

// "--x:22;--y:8" -> style object (CSS custom properties + camelCased props)
const st = (s: string) =>
  Object.fromEntries(
    s.split(";").filter(Boolean).map((p) => {
      const i = p.indexOf(":");
      const k = p.slice(0, i).trim();
      return [k.startsWith("--") ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), p.slice(i + 1).trim()];
    })
  ) as CSSProperties;

const css = `
.dp-wrap{max-width:70rem;margin:0 auto;padding:1rem}
.dp-frame:fullscreen{display:grid;place-items:center;background:#000}
.dp-frame:fullscreen .dp-stage{width:min(100vw,calc(100vh*16/9));border-radius:0;border:0}
.dp-ctl{display:flex;gap:.6rem;margin-top:.8rem}
.dp-ctl button{font:inherit;font-weight:600;color:#0b0f1a;background:#fff;border:1px solid rgba(128,128,128,.35);border-radius:999px;padding:.55rem 1.2rem;cursor:pointer}
.dp-ctl button:focus-visible{outline:2px solid #1f6bff;outline-offset:2px}
@media(prefers-reduced-motion:reduce){
.dp-bg i,.dp-dot{animation:none}
.dp-play .dp-sc{animation:none;opacity:0}
.dp-play .dp-s7{opacity:1}
.dp-play .dp-s7 *{animation:none!important;opacity:1;transform:none}}
.dp-stage{--e:cubic-bezier(.16,1,.3,1);--bl:#1f6bff;--navy:#091426;--logo:url("data:image/png;base64,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");
position:relative;container-type:inline-size;aspect-ratio:16/9;width:100%;overflow:hidden;border-radius:1rem;border:1px solid rgba(128,128,128,.28);background:#fbfbfd;color:#0b0f1a;font-weight:700}
.dp-bl{color:var(--bl)}
.dp-p{position:absolute;left:calc(var(--x)*1cqw);top:calc(var(--y)*1cqw);width:calc(var(--w)*1cqw);height:calc(var(--h)*1cqw)}
.dp-mk{background:var(--logo) center/contain no-repeat;aspect-ratio:256/210}
.dp-bg i{position:absolute;border-radius:50%;filter:blur(5cqw);animation:drift 11s ease-in-out infinite alternate}
.dp-bg i:nth-child(1){left:-8cqw;top:-10cqw;width:40cqw;height:40cqw;background:rgba(31,107,255,.16)}
.dp-bg i:nth-child(2){right:-10cqw;bottom:-12cqw;width:44cqw;height:44cqw;background:rgba(90,162,255,.2);animation-delay:-4s}
.dp-bg i:nth-child(3){left:40cqw;top:30cqw;width:24cqw;height:24cqw;background:rgba(120,90,255,.1);animation-delay:-7s}
.dp-dot{position:absolute;left:calc(var(--x)*1cqw);bottom:-2cqw;width:.8cqw;height:.8cqw;border-radius:50%;background:var(--bl);opacity:0;animation:rise2 var(--v,9s) linear var(--w,0s) infinite}
.dp-sc{position:absolute;inset:0;opacity:0}
.dp-k{position:absolute;left:0;right:0;top:calc(var(--y,7)*1cqw);text-align:center;font-size:calc(var(--s,5.4)*1cqw);letter-spacing:-.03em;line-height:1.05;opacity:0}
.dp-k.m{font-weight:500;color:#5b657f}
.dp-t{position:absolute;left:6cqw;top:calc(var(--y)*1cqw);font-size:3.8cqw;letter-spacing:-.03em;line-height:1.1;opacity:0}
.dp-w{position:absolute;border-radius:1cqw;background:#fff;border:.15cqw solid #e2e7f1;box-shadow:0 2cqw 4.5cqw -1.5cqw rgba(25,45,100,.22);opacity:0}
.dp-w::before{content:"";position:absolute;left:0;right:0;top:0;height:2.2cqw;background:#f1f4fa;border-radius:1cqw 1cqw 0 0}
.dp-b{position:absolute;border:.15cqw dashed #c4cde3;border-radius:.6cqw;overflow:hidden}
.dp-b::after{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#1f6bff,#5aa2ff);transform:scaleX(0);transform-origin:left}
.dp-b.dp-g::after{background:#e3e8f3}
.dp-chip{position:absolute;left:calc(var(--x)*1cqw);top:calc(var(--y)*1cqw);display:flex;align-items:center;gap:.8cqw;padding:.7cqw 1.6cqw .7cqw .8cqw;border-radius:999px;background:#fff;border:.12cqw solid #e4e8f0;
box-shadow:0 .6cqw 1.6cqw rgba(20,30,60,.1);font-size:1.9cqw;font-weight:500;white-space:nowrap;transform:rotate(var(--r,0deg));opacity:0}
.dp-chip i{display:grid;place-items:center;width:2.6cqw;height:2.6cqw;border-radius:.7cqw;background:var(--c,#1f6bff);color:#fff;font-style:normal;font-size:1.4cqw;font-weight:700}
.dp-sb{display:flex;align-items:center;gap:1.2cqw;padding:0 2.4cqw;border-radius:999px;background:#fff;border:.15cqw solid #e2e7f1;box-shadow:0 1.2cqw 3cqw -.6cqw rgba(25,45,100,.2);font-size:2.4cqw;font-weight:500;opacity:0}
.dp-mg{position:relative;flex:none;width:2.4cqw;height:2.4cqw;border:.4cqw solid var(--bl);border-radius:50%}
.dp-mg::after{content:"";position:absolute;left:1.8cqw;top:1.9cqw;width:1.2cqw;height:.4cqw;background:var(--bl);transform:rotate(45deg);border-radius:.2cqw}
.dp-ty{display:inline-block;overflow:hidden;white-space:nowrap;width:0;border-right:.25cqw solid var(--bl)}
.dp-res{position:absolute;display:flex;align-items:center;gap:1.4cqw;padding:0 2cqw;border-radius:1.2cqw;background:#fff;border:.15cqw solid #e6eaf3;box-shadow:0 .8cqw 2cqw -.8cqw rgba(25,45,100,.16);opacity:0}
.dp-res i{flex:none;width:3.4cqw;height:3.4cqw;border-radius:50%;background:#dfe5f1}
.dp-res s{flex:1;height:1cqw;border-radius:.5cqw;background:#e6ebf4;text-decoration:none}
.dp-res s+s{flex:.5}
.dp-res.dp-me{background:var(--bl);border-color:var(--bl);color:#fff;font-size:2.2cqw;box-shadow:0 1.6cqw 4cqw -.6cqw rgba(31,107,255,.6);z-index:3}
.dp-res.dp-me i{background:rgba(255,255,255,.28)}
.dp-ring{position:absolute;left:50%;top:50%;width:8cqw;height:8cqw;margin:-4cqw;border:.4cqw solid var(--bl);border-radius:50%;opacity:0}
.dp-cur{position:absolute;left:0;top:0;width:3.2cqw;opacity:0;z-index:5;filter:drop-shadow(0 .3cqw .5cqw rgba(0,0,0,.3))}
.dp-bar{position:absolute;border-radius:.6cqw .6cqw 0 0;background:linear-gradient(180deg,#8ab8ff,#1f6bff);transform:scaleY(0);transform-origin:bottom}
.dp-card{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6cqw;border-radius:1.4cqw;background:#fff;border:.15cqw solid #e2e7f1;box-shadow:0 1.4cqw 3cqw -1cqw rgba(25,45,100,.2);font-size:2.3cqw;opacity:0}
.dp-card b{display:grid;place-items:center;width:5cqw;height:5cqw;border-radius:1.4cqw;background:var(--bl);color:#fff;font-size:3cqw}
.dp-nv{background:var(--navy);color:#fff}
.dp-nv .dp-row{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:2.4cqw;top:-6cqw}
.dp-nv .dp-mk{width:13cqw}
.dp-wm{font-size:8.4cqw;letter-spacing:-.04em;line-height:1}
.dp-so{display:block;margin-top:1.2cqw;font-size:2.2cqw;font-weight:500;letter-spacing:.42em;color:#dbe4ff}
.dp-tag{position:absolute;left:0;right:0;top:36cqw;text-align:center;font-size:2.8cqw;font-weight:500;color:#b9c6ee;opacity:0}
.dp-pill{position:absolute;left:50%;top:43cqw;margin-left:-17cqw;width:34cqw;padding:1.2cqw 0;border-radius:999px;text-align:center;font-size:2.2cqw;color:#fff;background:var(--bl);box-shadow:0 1.4cqw 4cqw -.6cqw rgba(31,107,255,.8);opacity:0}
.dp-pg{position:absolute;left:0;bottom:0;width:100%;height:.5cqw;background:var(--bl);transform:scaleX(0);transform-origin:left;z-index:9}

/* timeline 37s: 0-6 search, 6-12 stand out, 12-18 who we are, 18-22 sites, 22-26 results, 26-32 impact, 32-37 close */
.dp-s1{--t:0s;--L:6s}.dp-s2{--t:6s;--L:6s}.dp-s3{--t:12s;--L:6s}.dp-s4{--t:18s;--L:4s}.dp-s5{--t:22s;--L:4s}.dp-s6{--t:26s;--L:6s}.dp-s7{--t:32s;--L:5s}
.dp-play .dp-sc{animation:sc var(--L) linear var(--t) both}
.dp-play .dp-s7{animation:sce var(--L) linear var(--t) both}
.dp-play .dp-k,.dp-play .dp-t{animation:word var(--l,6s) var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-t{animation:upn .8s var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-up{animation:up .8s var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-res.dp-me{animation:up .8s var(--e) calc(var(--t) + var(--d)) both,rise 1.1s cubic-bezier(.65,0,.2,1) calc(var(--t) + 3.4s) both}
.dp-play .dp-w,.dp-play .dp-sb,.dp-play .dp-res,.dp-play .dp-card,.dp-play .dp-tag,.dp-play .dp-pill{animation:up .8s var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-chip{animation:pop .7s var(--e) calc(var(--t) + var(--d)) both,floaty 3s ease-in-out calc(var(--t) + var(--d) + .8s) infinite alternate}
.dp-play .dp-b::after{animation:fx .8s var(--e) calc(var(--t) + var(--d)) forwards}
.dp-play .dp-bar{animation:gy 1s var(--e) calc(var(--t) + var(--d)) forwards}
.dp-play .dp-ty{animation:type var(--l) steps(30) calc(var(--t) + var(--d)) forwards,blink .6s step-end calc(var(--t) + var(--d)) infinite}
.dp-play .dp-ring{animation:ripple 2.4s ease-out calc(var(--t) + var(--d)) var(--n,1) both}
.dp-play .dp-cur{animation:cur 2s var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-pop2{animation:pop2 .8s var(--e) calc(var(--t) + var(--d)) both}
.dp-play .dp-sk::after{animation:fx .5s ease-out calc(var(--t) + var(--d)) forwards}
.dp-play .dp-spin{animation:spin 14s linear infinite}
.dp-play .dp-ln{animation:draw 2s ease-out calc(var(--t) + var(--d)) forwards}
.dp-play .dp-pg{animation:fx 37s linear forwards}
.dp-up{opacity:0}
.dp-sk{position:relative;display:inline-block}
.dp-sk::after{content:"";position:absolute;left:-.5cqw;right:-.5cqw;top:55%;height:.7cqw;background:#ef4444;border-radius:.4cqw;transform:scaleX(0);transform-origin:left}
.dp-ln{fill:none;stroke:var(--bl);stroke-width:1.1;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1}
.dp-spin{position:absolute;border:.25cqw dashed rgba(31,107,255,.35);border-radius:50%}

@keyframes sc{0%{opacity:0}3%{opacity:1}97%{opacity:1}100%{opacity:0}}
@keyframes sce{0%{opacity:0}4%,100%{opacity:1}}
@keyframes word{0%{opacity:0;transform:translateY(1.8cqw) scale(.97)}10%{opacity:1;transform:none}88%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-1.2cqw)}}
@keyframes upn{from{opacity:0;transform:translateY(2cqw)}to{opacity:1;transform:none}}
@keyframes up{from{opacity:0;transform:translateY(2.4cqw) scale(.97)}to{opacity:1;transform:none}}
@keyframes pop{from{opacity:0;transform:translateY(-4cqw) rotate(calc(var(--r,0deg)*3)) scale(.85)}to{opacity:1;transform:rotate(var(--r,0deg))}}
@keyframes pop2{from{opacity:0;transform:scale(.2) rotate(-40deg)}to{opacity:1;transform:none}}
@keyframes floaty{from{opacity:1;transform:rotate(var(--r,0deg)) translateY(0)}to{opacity:1;transform:rotate(var(--r,0deg)) translateY(-1cqw)}}
@keyframes fx{to{transform:scaleX(1)}}
@keyframes gy{to{transform:scaleY(1)}}
@keyframes type{to{width:var(--tw,33cqw)}}
@keyframes blink{50%{border-color:transparent}}
@keyframes rise{to{transform:translateY(-27cqw)}}
@keyframes ripple{0%{opacity:.7;transform:scale(.5)}100%{opacity:0;transform:scale(var(--g,7))}}
@keyframes cur{0%{opacity:0;transform:translate(70cqw,6cqw)}20%{opacity:1}70%{opacity:1;transform:translate(52cqw,19cqw)}85%{transform:translate(52cqw,19.6cqw) scale(.85)}100%{opacity:1;transform:translate(52cqw,19cqw)}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes drift{to{transform:translate(6cqw,5cqw) scale(1.12)}}
@keyframes rise2{0%{opacity:0;transform:translateY(0)}10%{opacity:.4}90%{opacity:.25}100%{opacity:0;transform:translateY(-62cqw)}}

`;

export default function PromoVideo() {
  const [run, setRun] = useState(0); // changing the key restarts every CSS animation
  const frame = useRef<HTMLDivElement>(null);

  return (
    <section className={`dp-wrap ${font.className}`}>
      <style>{css}</style>
      <div ref={frame} className="dp-frame">
        <div
          key={run}
          className="dp-stage dp-play"
          role="img"
          aria-label="Animated promo for Devntom Solutions: help your next customer find a standout website, built modern, fast and tailored to your goals. Visit devntomsolutions.com"
        >
      <div className="dp-bg" aria-hidden="true"><i></i><i></i><i></i>
      <b className="dp-dot" style={st("--x:8;--v:9s")}></b><b className="dp-dot" style={st("--x:22;--v:12s;--w:2s")}></b><b className="dp-dot" style={st("--x:35;--v:10s;--w:5s")}></b><b className="dp-dot" style={st("--x:49;--v:13s;--w:1s")}></b>
      <b className="dp-dot" style={st("--x:63;--v:9s;--w:4s")}></b><b className="dp-dot" style={st("--x:77;--v:11s;--w:7s")}></b><b className="dp-dot" style={st("--x:90;--v:12s;--w:3s")}></b></div>
      
      {/* 0-6s: Your next customer could be searching for your business right now. */}
      <section className="dp-sc dp-s1">
        <div className="dp-k" style={st("--d:0s;--l:1.7s")}>Your next customer</div>
        <div className="dp-k" style={st("--d:1.6s;--l:1.6s")}>could be searching for</div>
        <div className="dp-k dp-bl" style={st("--d:3.1s;--l:1.5s")}>your business</div>
        <div className="dp-k" style={st("--d:4.5s;--l:1.5s;--s:6.4")}>right now.</div>
        <div className="dp-sb dp-p" style={st("--x:22;--y:22;--w:56;--h:8;--d:.6s")}><span className="dp-mg"></span><span className="dp-ty" style={st("--d:1.2s;--l:1.9s;--tw:34cqw")}>best website developer near me</span></div>
        <div className="dp-res dp-p" style={st("--x:24;--y:33;--w:52;--h:5.6;--d:3.3s")}><i></i><s></s><s></s></div>
        <div className="dp-res dp-p" style={st("--x:24;--y:40.4;--w:52;--h:5.6;--d:3.6s")}><i></i><s></s><s></s></div>
        <div className="dp-res dp-p" style={st("--x:24;--y:47.8;--w:52;--h:5.6;--d:3.9s")}><i></i><s></s><s></s></div>
      </section>
      
      {/* 6-12s: will they find a business that stands out? */}
      <section className="dp-sc dp-s2">
        <div className="dp-k" style={st("--d:0s;--l:1.6s")}>The question is,</div>
        <div className="dp-k" style={st("--d:1.5s;--l:2s")}>will they find a business</div>
        <div className="dp-k dp-bl" style={st("--d:3.4s;--l:2.6s")}>that stands out?</div>
        <div className="dp-res dp-p" style={st("--x:24;--y:20;--w:52;--h:6.2;--d:.4s")}><i></i><s></s><s></s></div>
        <div className="dp-res dp-p" style={st("--x:24;--y:28;--w:52;--h:6.2;--d:.6s")}><i></i><s></s><s></s></div>
        <div className="dp-res dp-p" style={st("--x:24;--y:36;--w:52;--h:6.2;--d:.8s")}><i></i><s></s><s></s></div>
        <div className="dp-res dp-me dp-p" style={st("--x:24;--y:47;--w:52;--h:6.2;--d:1s")}><i></i>Your business</div>
        <div className="dp-ring" style={st("left:50%;top:41%;--d:4.6s;--n:2;--g:9")}></div>
        <svg className="dp-cur" viewBox="0 0 24 24" style={st("--d:3.8s")}><path d="M3 2l17 8-7.5 2L9 20z" fill="#0b0f1a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </section>
      
      {/* 12-18s: At Devntom Solutions, we build modern, high-performance websites tailored to your business goals. */}
      <section className="dp-sc dp-s3">
        <div className="dp-mk dp-p dp-pop2" style={st("--x:6;--y:6;--w:7;--h:5.7;--d:.1s")}></div>
        <div className="dp-t" style={st("--y:13;--d:.4s")}>At <span className="dp-bl">Devntom Solutions,</span></div>
        <div className="dp-t" style={st("--y:19;--d:1.2s")}>we build modern,</div>
        <div className="dp-t" style={st("--y:25;--d:2.1s")}>high-performance websites</div>
        <div className="dp-t" style={st("--y:31;--d:3s")}>tailored to your</div>
        <div className="dp-t dp-bl" style={st("--y:37;--d:3.4s")}>business goals.</div>
        <div className="dp-spin dp-p" style={st("--x:56;--y:8;--w:40;--h:40")}></div>
        <div className="dp-w dp-p" style={st("--x:58;--y:15;--w:36;--h:27;--d:.6s")}>
          <div className="dp-b dp-p dp-g" style={st("--x:2;--y:3.4;--w:32;--h:2.2;--d:1.2s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:7;--w:32;--h:7;--d:1.5s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:16;--w:9.6;--h:6;--d:1.9s")}></div>
          <div className="dp-b dp-p" style={st("--x:12.7;--y:16;--w:9.6;--h:6;--d:2.1s")}></div>
          <div className="dp-b dp-p" style={st("--x:23.4;--y:16;--w:9.6;--h:6;--d:2.3s")}></div>
        </div>
        <div className="dp-chip" style={st("--x:55;--y:9;--r:-5deg;--d:2.4s")}><i>M</i>Modern</div>
        <div className="dp-chip" style={st("--x:73;--y:41;--r:4deg;--c:#16a34a;--d:2.8s")}><i>F</i>High-performance</div>
        <div className="dp-chip" style={st("--x:58;--y:47;--r:-3deg;--c:#8b5cf6;--d:3.2s")}><i>T</i>Tailored to you</div>
      </section>
      
      {/* 18-22s: professional business websites to powerful e-commerce stores */}
      <section className="dp-sc dp-s4">
        <div className="dp-k" style={st("--d:0s;--l:2s;--y:6")}>From professional business websites</div>
        <div className="dp-k dp-bl" style={st("--d:2s;--l:2s;--y:6")}>to powerful e-commerce stores</div>
        <div className="dp-w dp-p" style={st("--x:7;--y:18;--w:40;--h:30;--d:.3s")}>
          <div className="dp-b dp-p dp-g" style={st("--x:2;--y:3.6;--w:36;--h:2.2;--d:.7s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:7.4;--w:36;--h:8;--d:.9s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:17.4;--w:11;--h:7;--d:1.2s")}></div>
          <div className="dp-b dp-p" style={st("--x:14.5;--y:17.4;--w:11;--h:7;--d:1.4s")}></div>
          <div className="dp-b dp-p" style={st("--x:27;--y:17.4;--w:11;--h:7;--d:1.6s")}></div>
        </div>
        <div className="dp-w dp-p" style={st("--x:53;--y:18;--w:40;--h:30;--d:.6s")}>
          <div className="dp-b dp-p dp-g" style={st("--x:2;--y:3.6;--w:28;--h:2.2;--d:1.1s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:7.6;--w:11;--h:10;--d:1.4s")}></div>
          <div className="dp-b dp-p" style={st("--x:14.5;--y:7.6;--w:11;--h:10;--d:1.6s")}></div>
          <div className="dp-b dp-p" style={st("--x:27;--y:7.6;--w:11;--h:10;--d:1.8s")}></div>
          <div className="dp-b dp-p dp-g" style={st("--x:2;--y:19;--w:8;--h:1.6;--d:2s")}></div>
          <div className="dp-b dp-p dp-g" style={st("--x:14.5;--y:19;--w:8;--h:1.6;--d:2.1s")}></div>
          <div className="dp-b dp-p dp-g" style={st("--x:27;--y:19;--w:8;--h:1.6;--d:2.2s")}></div>
          <div className="dp-b dp-p" style={st("--x:2;--y:23;--w:14;--h:4;--d:2.4s")}></div>
        </div>
        <div className="dp-chip" style={st("--x:78;--y:14;--r:5deg;--c:#16a34a;--d:2.7s")}><i>+1</i>New order</div>
      </section>
      
      {/* 22-26s: we turn your ideas into websites that build trust, attract customers, and help your business grow */}
      <section className="dp-sc dp-s5">
        <div className="dp-k" style={st("--d:0s;--l:1.7s;--y:5;--s:4.6")}>we turn your ideas into websites</div>
        <div className="dp-k" style={st("--d:1.6s;--l:2.4s;--y:5;--s:4.6")}>that build trust, attract customers,<br />and help your business grow.</div>
        <div className="dp-card dp-p" style={st("--x:8;--y:20;--w:26;--h:13;--d:.9s")}><b>✓</b>Build trust</div>
        <div className="dp-card dp-p" style={st("--x:37;--y:20;--w:26;--h:13;--d:1.5s")}><b>+</b>Attract customers</div>
        <div className="dp-card dp-p" style={st("--x:66;--y:20;--w:26;--h:13;--d:2.1s")}><b>↑</b>Grow your business</div>
        <div className="dp-bar dp-p" style={st("--x:12;--y:48;--w:5;--h:4;--d:1.2s")}></div><div className="dp-bar dp-p" style={st("--x:22;--y:46;--w:5;--h:6;--d:1.4s")}></div>
        <div className="dp-bar dp-p" style={st("--x:32;--y:45;--w:5;--h:7;--d:1.6s")}></div><div className="dp-bar dp-p" style={st("--x:42;--y:43;--w:5;--h:9;--d:1.8s")}></div>
        <div className="dp-bar dp-p" style={st("--x:52;--y:41;--w:5;--h:11;--d:2s")}></div><div className="dp-bar dp-p" style={st("--x:62;--y:38;--w:5;--h:14;--d:2.2s")}></div>
        <div className="dp-bar dp-p" style={st("--x:72;--y:36;--w:5;--h:16;--d:2.4s")}></div><div className="dp-bar dp-p" style={st("--x:82;--y:33;--w:5;--h:19;--d:2.6s")}></div>
        <svg className="dp-p" viewBox="0 0 100 24" style={st("--x:9;--y:29;--w:82;--h:20")} preserveAspectRatio="none"><path className="dp-ln" pathLength="1" style={st("--d:1.4s")} d="M3 21 L15 19 L27 20 L39 15 L51 14 L63 9 L75 7 L96 2"/></svg>
      </section>
      
      {/* 26-32s: deserves more than just an online presence */}
      <section className="dp-sc dp-s6">
        <div className="dp-k" style={st("--d:0s;--l:1.6s;--y:22")}>Your business deserves</div>
        <div className="dp-k" style={st("--d:1.5s;--l:1.5s;--y:22")}>more than just an</div>
        <div className="dp-k" style={st("--d:2.9s;--l:1.5s;--y:22")}><span className="dp-sk" style={st("--d:3.3s")}>online presence.</span></div>
        <div className="dp-k" style={st("--d:4.2s;--l:1.8s;--y:15;--s:4.6")}>It deserves a website</div>
        <div className="dp-k dp-bl" style={st("--d:4.5s;--l:1.5s;--y:23;--s:8.4")}>that makes an impact.</div>
        <div className="dp-ring" style={st("--d:4.6s;--g:10")}></div><div className="dp-ring" style={st("--d:4.85s;--g:14")}></div><div className="dp-ring" style={st("--d:5.1s;--g:18")}></div>
      </section>
      
      {/* 32-37s: Close */}
      <section className="dp-sc dp-s7 dp-nv">
        <div className="dp-ring" style={st("left:33.3cqw;top:22.1cqw;--d:.2s;--n:3;--g:8;border-color:#3d86ff")}></div>
        <div className="dp-row">
          <div className="dp-mk dp-pop2" style={st("--d:.1s")}></div>
          <div><div className="dp-wm dp-up" style={st("--d:.4s")}>Devntom</div><span className="dp-so dp-up" style={st("--d:.7s")}>SOLUTIONS</span></div>
        </div>
        <div className="dp-tag" style={st("--d:1.2s")}>Where Systems Become Strategy</div>
        <div className="dp-pill" style={st("--d:1.8s")}>Visit devntomsolutions.com</div>
      </section>
      
      <div className="dp-pg"></div>
        </div>
      </div>
      <div className="dp-ctl">
        <button type="button" onClick={() => setRun((r) => r + 1)}>Replay</button>
        <button type="button" onClick={() => frame.current?.requestFullscreen?.()}>Full screen</button>
      </div>
    </section>
  );
}