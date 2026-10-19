import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Poppins, Roboto } from "next/font/google";
import { ArrowRight, ArrowUpRight, ChevronLeft, Mail } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { fmtDate, getAllPosts, getPost, getRelated, readingMins, slugify, wordCount, type Block, type Category } from "../posts";

/* /blog/[slug]: ONE server file. Metadata, Article structured data, design, contents list, share links
   and reading-progress bar (pure CSS) all live here. Needs ../posts.ts (the same one as before). */

const pop = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700"], display: "swap" });
const rob = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const BASE = "https://www.devntomsolutions.com";
const OG_FALLBACK = "/og-blog.png"; // PLACEHOLDER: add a 1200x630 image at /public/og-blog.png

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found | DEVNTOM Solutions", robots: { index: false } };
  const url = `${BASE}/blog/${post.slug}`;
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const image = post.cover ?? OG_FALLBACK;
  return {
    metadataBase: new URL(BASE), title, description, keywords: post.tags, authors: [{ name: post.author.name }],
    alternates: { canonical: `/blog/${post.slug}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: { type: "article", url, siteName: "DEVNTOM Solutions", title, description, publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: [post.author.name], section: post.category, tags: post.tags, images: [{ url: image, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: "summary_large_image", site: "@DevntomS18433", title, description, images: [image] },
  };
}

/* ---- generated cover (pure SVG, one motif per category) ---- */
const PALETTE: Record<Category, [string, string]> = {
  "Web Development": ["#0A5CFF", "#0B1F3B"], "AI Automation": ["#00A3FF", "#0B1F3B"], "Digital Marketing": ["#2F6BFF", "#050E1F"], "Business Growth": ["#0052CC", "#0B1F3B"],
};
function CoverArt({ category, slug }: { category: Category; slug: string }) {
  const [a, b] = PALETTE[category] ?? PALETTE["Web Development"];
  const id = "ca-" + slug.replace(/[^a-z0-9]/gi, "");
  return (
    <svg viewBox="0 0 600 375" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={id + "g"} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <radialGradient id={id + "r"} cx=".85" cy=".1" r=".7"><stop offset="0" stopColor="#7DB0FF" stopOpacity=".55" /><stop offset="1" stopColor="#7DB0FF" stopOpacity="0" /></radialGradient>
        <pattern id={id + "p"} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#fff" strokeOpacity=".07" /></pattern>
      </defs>
      <rect width="600" height="375" fill={`url(#${id}g)`} /><rect width="600" height="375" fill={`url(#${id}p)`} /><rect width="600" height="375" fill={`url(#${id}r)`} />
      {category === "Web Development" && (
        <g>
          <rect x="130" y="70" width="340" height="235" rx="12" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".4" /><path d="M130 100H470" stroke="#fff" strokeOpacity=".3" />
          {[148, 164, 180].map((x) => <circle key={x} cx={x} cy="85" r="4" fill="#fff" fillOpacity=".5" />)}
          <rect x="156" y="124" width="140" height="14" rx="4" fill="#fff" fillOpacity=".85" /><rect x="156" y="148" width="100" height="8" rx="4" fill="#fff" fillOpacity=".4" /><rect x="156" y="176" width="84" height="26" rx="13" fill="#fff" /><rect x="320" y="120" width="124" height="96" rx="8" fill="#7DB0FF" fillOpacity=".5" />
          {[0, 1, 2].map((i) => <rect key={i} x={156 + i * 98} y="236" width="86" height="46" rx="6" fill="#fff" fillOpacity=".14" />)}
        </g>
      )}
      {category === "AI Automation" && (
        <g stroke="#fff" strokeOpacity=".45" fill="none">
          <path d="M120 190L260 110M120 190L260 260M260 110L400 190M260 260L400 190M400 190L490 120M400 190L490 270M260 110L260 260" />
          {[[120, 190, 14], [260, 110, 11], [260, 260, 11], [400, 190, 16], [490, 120, 9], [490, 270, 9]].map(([x, y, r]) => <circle key={x + "" + y} cx={x} cy={y} r={r} fill="#fff" fillOpacity=".9" stroke="none" />)}
          <circle cx="400" cy="190" r="34" strokeOpacity=".6" /><circle cx="400" cy="190" r="56" strokeOpacity=".25" />
        </g>
      )}
      {category === "Digital Marketing" && (
        <g>
          {[70, 110, 90, 150, 130, 200].map((h, i) => <rect key={i} x={120 + i * 52} y={300 - h} width="32" height={h} rx="4" fill="#fff" fillOpacity={0.25 + i * 0.1} />)}
          <path d="M120 250L212 205 290 220 380 150 470 100" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /><circle cx="470" cy="100" r="9" fill="#fff" /><circle cx="470" cy="100" r="22" fill="none" stroke="#fff" strokeOpacity=".5" />
        </g>
      )}
      {category === "Business Growth" && (
        <g fill="none" stroke="#fff">
          {[40, 80, 120, 160].map((r, i) => <circle key={r} cx="300" cy="200" r={r} strokeOpacity={0.5 - i * 0.1} />)}
          <path d="M170 290L260 220 320 250 430 120" strokeWidth="3" strokeLinecap="round" /><path d="M395 118H432V155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="300" cy="200" r="8" fill="#fff" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/* ---- tiny inline renderer: **bold**, `code`, [text](link) ---- */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<strong key={k++} className="font-semibold text-[#0B1F3B]">{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) out.push(<code key={k++} className="rounded bg-[#EEF4FF] px-1.5 py-0.5 font-mono text-[0.88em] text-[#0B3FA8]">{tok.slice(1, -1)}</code>);
    else {
      const [, label, href] = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)!;
      out.push(<a key={k++} href={href} className="font-medium text-[#0052CC] underline decoration-[#93C5FD] underline-offset-4 transition hover:text-[#007BFF]" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        switch (b.t) {
          case "p": return <p key={i}>{inline(b.text)}</p>;
          case "h2": return <h2 key={i} id={slugify(b.text)} className={`${pop.className} scroll-mt-28 !mt-14 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-[#0B1F3B] md:text-[2rem]`}>{b.text}</h2>;
          case "h3": return <h3 key={i} className={`${pop.className} !mt-9 text-xl font-semibold tracking-[-0.015em] text-[#0B1F3B]`}>{b.text}</h3>;
          case "ul": return <ul key={i} className="space-y-3">{b.items.map((it, j) => <li key={j} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-[6px] before:w-[6px] before:rounded-full before:bg-[#0A5CFF]">{inline(it)}</li>)}</ul>;
          case "ol": return <ol key={i} className="space-y-3">{b.items.map((it, j) => <li key={j} className="relative pl-10"><span className="absolute left-0 top-[0.2em] flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F0FF] font-mono text-xs font-medium text-[#0052CC]">{j + 1}</span>{inline(it)}</li>)}</ol>;
          case "quote": return <blockquote key={i} className="!my-10 border-l-[3px] border-[#0A5CFF] pl-6"><p className={`${pop.className} text-2xl font-light leading-snug tracking-[-0.02em] text-[#0B1F3B]`}>{b.text}</p>{b.cite && <footer className="mt-3 text-sm text-[#64748B]">{b.cite}</footer>}</blockquote>;
          case "callout": return <aside key={i} className="!my-8 rounded-[6px] border border-[#CFE2FF] bg-[#F5F9FF] p-6"><p className={`${pop.className} text-base font-semibold text-[#0B1F3B]`}>{b.title}</p><p className="mt-2 text-[16px] leading-relaxed text-[#1F3350]">{inline(b.text)}</p></aside>;
          case "code": return <figure key={i} className="!my-8 overflow-hidden rounded-[8px] border border-[#0B1F3B] bg-[#08111F]"><figcaption className="border-b border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9FB1C7]">{b.lang}</figcaption><pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.75] text-[#DCE6F5]"><code>{b.code}</code></pre></figure>;
        }
      })}
    </>
  );
}

/* reading-progress bar: CSS scroll-driven animation (shown only in browsers that support it) */
const css =
  ".bp{display:none}" +
  "@supports (animation-timeline: scroll()){.bp{display:block;position:fixed;left:0;right:0;top:0;height:3px;z-index:56;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#00B4FF,#0A5CFF);animation:bp linear both;animation-timeline:scroll(root)}@keyframes bp{to{transform:scaleX(1)}}}" +
  "@media (prefers-reduced-motion:reduce){.bp{display:none!important}}";

const shareBtn = "flex h-10 w-10 items-center justify-center rounded-full border border-[#CFE2FF] bg-white text-[#0B1F3B] transition duration-300 hover:border-[#0A5CFF] hover:bg-[#0A5CFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2";
function Share({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Share this article">
      <a className={shareBtn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><FaLinkedinIn size={16} aria-hidden="true" /></a>
      <a className={shareBtn} href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><FaXTwitter size={16} aria-hidden="true" /></a>
      <a className={shareBtn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><FaWhatsapp size={17} aria-hidden="true" /></a>
      <a className={shareBtn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email"><Mail size={17} aria-hidden="true" /></a>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelated(post, 3);
  const url = `${BASE}/blog/${post.slug}`;
  const toc = post.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2").map((b) => ({ id: slugify(b.text), title: b.text }));
  const mins = readingMins(post);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BlogPosting", "@id": `${url}#article`, mainEntityOfPage: { "@type": "WebPage", "@id": url }, url, headline: post.title, description: post.excerpt, inLanguage: "en", articleSection: post.category, keywords: post.tags.join(", "), wordCount: wordCount(post), datePublished: post.date, dateModified: post.updated ?? post.date, image: [`${BASE}${post.cover ?? OG_FALLBACK}`], author: { "@type": "Organization", name: post.author.name, url: BASE }, publisher: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "DEVNTOM Solutions", url: BASE } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: url }] },
    ],
  };

  return (
    <main id="main" className={`${rob.className} bg-white text-[#1F2937]`}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <div aria-hidden="true" className="bp" />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#030A17] px-6 pb-40 pt-36 text-white md:px-12 md:pb-48 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -left-[10%] -top-[30%] h-[640px] w-[640px] rounded-full bg-[#0052CC]/40 blur-[140px]" />
          <div className="absolute -right-[8%] top-[10%] h-[460px] w-[460px] rounded-full bg-[#00B4FF]/20 blur-[130px]" />
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.12) 1px,transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 0%,#000 20%,transparent 75%)" }} />
        </div>
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/55">
            <Link href="/" className="transition hover:text-white">Home</Link><span aria-hidden="true">/</span>
            <Link href="/blog" className="transition hover:text-white">Blog</Link><span aria-hidden="true">/</span>
            <span className="text-white/85">{post.category}</span>
          </nav>
          <span className="mt-8 inline-flex rounded-full border border-[#3B82F6]/40 bg-white/[.05] px-4 py-1.5 text-sm text-[#CFE2FF]">{post.category}</span>
          <h1 className={`${pop.className} mt-6 text-[clamp(2.1rem,5vw,4.2rem)] font-light leading-[1.06] tracking-[-0.035em]`}>{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/70">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#CFE2FF]">
            <span className="flex items-center gap-3">
              <span className={`${pop.className} flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0A5CFF] to-[#00B4FF] text-sm font-semibold text-white`}>D</span>
              <span><span className="block font-medium text-white">{post.author.name}</span><span className="text-xs text-white/55">{post.author.role}</span></span>
            </span>
            <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 sm:block" />
            <span><time dateTime={post.date}>{fmtDate(post.date)}</time>{post.updated && <span className="text-white/55"> · Updated {fmtDate(post.updated)}</span>}</span>
            <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 sm:block" />
            <span>{mins} min read</span>
          </div>
        </div>
      </section>

      {/* COVER (overlaps the hero) */}
      <div className="relative -mt-28 px-6 md:-mt-36 md:px-12">
        <div className="mx-auto aspect-[16/8] max-w-[1100px] overflow-hidden rounded-[14px] border border-white/10 bg-[#0B1F3B] shadow-[0_40px_120px_rgba(7,26,51,.3)]">
          {post.cover ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={post.cover} alt={post.title} className="h-full w-full object-cover" /> : <CoverArt category={post.category} slug={post.slug} />}
        </div>
      </div>

      {/* BODY */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <nav aria-label="On this page">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">On this page</p>
                <ol className="mt-4 space-y-1 border-l border-[#E2ECF9]">
                  {toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-[#475569] transition hover:border-[#0A5CFF] hover:text-[#0A5CFF]">{t.title}</a></li>)}
                </ol>
              </nav>
              <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">Share</p><Share url={url} title={post.title} /></div>
            </div>
          </aside>

          <div className="min-w-0">
            <details className="mb-10 rounded-[6px] border border-[#DCE8F7] bg-[#F5F9FF] p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-medium text-[#0B1F3B]">On this page</summary>
              <ol className="mt-3 space-y-2 text-sm">{toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-[#0052CC]">{t.title}</a></li>)}</ol>
            </details>

            <article className="max-w-[720px] space-y-5 text-[17px] leading-[1.85] text-[#374151]"><Blocks body={post.body} /></article>

            <div className="mt-12 flex max-w-[720px] flex-wrap gap-2 border-t border-[#E2ECF9] pt-8">
              {post.tags.map((t) => <span key={t} className="rounded-full border border-[#CFE2FF] bg-[#F5F9FF] px-3.5 py-1.5 text-sm text-[#0B3FA8]">{t}</span>)}
            </div>
            <div className="mt-8 max-w-[720px] lg:hidden"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94A3B8]">Share</p><Share url={url} title={post.title} /></div>

            <div className="mt-12 flex max-w-[720px] items-center gap-5 rounded-[12px] border border-[#DCE8F7] bg-[#F5F9FF] p-6">
              <span className={`${pop.className} flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0A5CFF] to-[#00B4FF] text-xl font-semibold text-white`}>D</span>
              <div>
                <p className={`${pop.className} text-lg font-semibold text-[#0B1F3B]`}>{post.author.name}</p>
                <p className="mt-1 text-[15px] font-light leading-relaxed text-[#475569]">We design and engineer websites, software and automation for businesses in Pakistan, Saudi Arabia, the UK and beyond.</p>
              </div>
            </div>
            <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#0052CC] transition hover:text-[#007BFF]"><ChevronLeft size={16} aria-hidden="true" />All articles</Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-[#F5F9FF] px-6 py-20 md:px-12 md:py-28" aria-labelledby="related">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="related" className={`${pop.className} text-[clamp(1.9rem,3.6vw,3rem)] font-extralight tracking-[-0.03em] text-[#0B1F3B]`}>Keep <b className="font-bold">reading</b></h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-[#DCE8F7] bg-white transition duration-500 hover:-translate-y-1.5 hover:border-[#0A5CFF]/50 hover:shadow-[0_24px_70px_rgba(10,92,255,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]">
                    <div className="aspect-[16/9] overflow-hidden bg-[#0B1F3B]"><div className="h-full w-full transition-transform duration-700 group-hover:scale-105"><CoverArt category={p.category} slug={p.slug} /></div></div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs text-[#64748B]">{p.category} · {readingMins(p)} min read</p>
                      <h3 className={`${pop.className} mt-2 text-lg font-semibold leading-snug tracking-[-0.015em] text-[#0B1F3B] group-hover:text-[#0052CC]`}>{p.title}</h3>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-[#0052CC]">Read article <ArrowUpRight size={15} aria-hidden="true" /></span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#050E1F] px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`${pop.className} text-[clamp(2rem,4.5vw,4rem)] font-extralight leading-[1.02] tracking-[-0.035em]`}>Ready to <b className="font-bold">build</b> yours?</p>
            <p className="mt-4 max-w-md font-light text-[#B8C9DE]">Tell us about your project. We reply with a plan, a timeline and a quote.</p>
          </div>
          <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#0A5CFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050E1F]">Start a project <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}