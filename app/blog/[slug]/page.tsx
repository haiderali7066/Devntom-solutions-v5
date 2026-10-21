import type { Metadata } from "next";
import { cache } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { FaArrowRight, FaClock, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { sanitizeHtml } from "@/lib/sanitize";
import { toSlug } from "@/lib/validate";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "400", "600", "700"], display: "swap" });
const SITE = "https://www.devntomsolutions.com";
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Cached per post. Admin saves call revalidatePath, so edits appear immediately.
export const revalidate = 3600;

const getPost = cache(async (slug: string) => {
  if (!SLUG.test(slug) || slug.length > 120) return null;
  await connectDB();
  return Post.findOne({ slug, status: "published" }).lean();
});

const fmt = (d?: Date | null) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "");

/** Adds ids to h2 and h3 headings and returns a table of contents. */
function withToc(html: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_m, lvl: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const base = toSlug(text) || "section";
    let id = base, n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    toc.push({ id, text, level: Number(lvl) });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return { title: "Article not found", robots: { index: false } };
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.excerpt;
  const image = p.coverImage?.url || "/og.png";
  return {
    title,
    description,
    keywords: p.tags,
    authors: [{ name: p.author }],
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", url: `${SITE}/blog/${p.slug}`, title, description, publishedTime: p.publishedAt?.toISOString(), modifiedTime: p.updatedAt?.toISOString(), authors: [p.author], tags: p.tags, images: [{ url: image, alt: p.coverImage?.alt || p.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const { html, toc } = withToc(sanitizeHtml(p.content));
  const url = `${SITE}/blog/${p.slug}`;

  let related = await Post.find({ status: "published", category: p.category, _id: { $ne: p._id } }).sort({ publishedAt: -1 }).limit(3).select("title slug excerpt coverImage category publishedAt readingTime").lean();
  if (related.length < 3) {
    const more = await Post.find({ status: "published", _id: { $nin: [p._id, ...related.map((r) => r._id)] } }).sort({ publishedAt: -1 }).limit(3 - related.length).select("title slug excerpt coverImage category publishedAt readingTime").lean();
    related = [...related, ...more];
  }

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#article`, headline: p.title, description: p.seoDescription || p.excerpt,
        image: p.coverImage?.url ? [p.coverImage.url] : undefined, datePublished: p.publishedAt?.toISOString(), dateModified: p.updatedAt?.toISOString(),
        author: { "@type": "Organization", name: p.author, url: SITE }, publisher: { "@id": `${SITE}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": url }, articleSection: p.category, keywords: p.tags?.join(", "), inLanguage: "en",
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` }, { "@type": "ListItem", position: 3, name: p.title, item: url }] },
    ],
  };

  const enc = encodeURIComponent;
  const share = [
    [FaXTwitter, "Share on X", `https://twitter.com/intent/tweet?text=${enc(p.title)}&url=${enc(url)}`],
    [FaLinkedinIn, "Share on LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    [FaWhatsapp, "Share on WhatsApp", `https://wa.me/?text=${enc(`${p.title} ${url}`)}`],
  ] as const;

  return (
    <main id="main" className="bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <style>{`.post{font-size:1.075rem;line-height:1.85;color:#334155}.post h2{font-family:inherit;font-size:1.9rem;font-weight:700;color:#0B1F3B;margin:2.6rem 0 .8rem;letter-spacing:-.02em;scroll-margin-top:7rem}.post h3{font-size:1.4rem;font-weight:600;color:#0B1F3B;margin:2rem 0 .6rem;scroll-margin-top:7rem}.post h4{font-size:1.15rem;font-weight:600;color:#0B1F3B;margin:1.6rem 0 .5rem}.post p{margin:1rem 0}.post ul{list-style:disc;padding-left:1.5rem;margin:1rem 0}.post ol{list-style:decimal;padding-left:1.5rem;margin:1rem 0}.post li{margin:.35rem 0}.post a{color:#0052CC;text-decoration:underline;text-underline-offset:3px}.post a:hover{color:#007BFF}.post blockquote{border-left:4px solid #007BFF;background:#F5F9FF;padding:1rem 1.25rem;margin:1.6rem 0;border-radius:0 12px 12px 0;color:#0B1F3B}.post code{background:#EAF2FF;padding:.1rem .4rem;border-radius:5px;font-size:.9em}.post pre{background:#0B1F3B;color:#E6F0FF;padding:1.1rem;border-radius:12px;overflow:auto;margin:1.5rem 0}.post img{max-width:100%;height:auto;border-radius:14px;margin:1.6rem 0}.post hr{border:0;border-top:1px solid #CFE2FF;margin:2.4rem 0}`}</style>

      <article>
        <header className="relative isolate overflow-hidden bg-[#050E1F] px-6 pb-16 pt-32 text-white md:px-12 md:pt-40">
          <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 70% at 85% 20%,rgba(0,123,255,.4),transparent 70%),#050E1F" }} />
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-sm text-[#93C5FD]"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/blog" className="hover:text-white">Blog</Link> / <span className="text-white">{p.category}</span></nav>
            <p className="mt-6"><Link href={`/blog?category=${enc(p.category)}`} className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-[#CFE2FF] transition hover:bg-white hover:text-[#0B1F3B]">{p.category}</Link></p>
            <h1 className={`${pop.className} mt-5 text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.1] tracking-[-0.03em]`}>{p.title}</h1>
            <p className="mt-5 text-lg font-light leading-relaxed text-[#CFE2FF]">{p.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#93C5FD]"><span>By {p.author}</span><time dateTime={p.publishedAt?.toISOString()}>{fmt(p.publishedAt)}</time><span className="inline-flex items-center gap-1.5"><FaClock size={11} aria-hidden="true" />{p.readingTime} min read</span></p>
          </div>
        </header>

        {p.coverImage?.url && (
          <div className="mx-auto -mt-8 max-w-5xl px-6 md:px-12"><div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#CFE2FF] bg-[#0B1F3B] shadow-[0_30px_80px_rgba(0,30,90,.25)]"><Image src={p.coverImage.url} alt={p.coverImage.alt || p.title} fill priority sizes="(min-width:1024px) 960px, 100vw" className="object-cover" /></div></div>
        )}

        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:px-12 lg:grid-cols-12">
          <aside className="lg:col-span-3 lg:order-2">
            <div className="space-y-8 lg:sticky lg:top-28">
              {toc.length > 1 && (
                <nav aria-label="Table of contents"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0052CC]">On this page</p><ul className="mt-4 space-y-2.5 border-l border-[#CFE2FF] text-sm">{toc.map((t) => <li key={t.id} className={t.level === 3 ? "pl-7" : "pl-4"}><a href={`#${t.id}`} className="text-[#475569] transition hover:text-[#007BFF]">{t.text}</a></li>)}</ul></nav>
              )}
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0052CC]">Share</p><ul className="mt-4 flex gap-2">{share.map(([I, l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CFE2FF] text-[#0B1F3B] transition hover:border-[#007BFF] hover:bg-[#007BFF] hover:text-white"><I size={15} aria-hidden="true" /></a></li>)}</ul></div>
            </div>
          </aside>

          <div className="lg:col-span-9 lg:order-1">
            <div className="post" dangerouslySetInnerHTML={{ __html: html }} />
            {p.tags?.length > 0 && <ul className="mt-10 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border border-[#CFE2FF] px-3.5 py-1 text-xs text-[#475569]">#{t}</li>)}</ul>}

            <aside className="relative mt-14 overflow-hidden rounded-[22px] p-8 text-white md:p-10" style={{ background: "linear-gradient(135deg,#0B1F3B,#0A3F9E 70%,#007BFF)" }}>
              <h2 className={`${pop.className} text-2xl font-semibold tracking-[-0.02em] md:text-3xl`}>Want results like this for your business?</h2>
              <p className="mt-2 max-w-md text-[#CFE2FF]">Talk to Devntom Solutions about websites, apps, SEO and marketing.</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#00B4FF] hover:text-white">Book a call <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007BFF] text-white"><FaArrowRight size={12} aria-hidden="true" /></span></Link>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-[#F5F9FF] px-6 py-16 md:px-12 md:py-20" aria-labelledby="rel">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="rel" className={`${pop.className} text-3xl font-extralight tracking-[-0.03em] text-[#0B1F3B]`}>Keep <b className="font-bold">reading</b></h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={String(r._id)}>
                  <Link href={`/blog/${r.slug}`} className="group block h-full overflow-hidden rounded-[18px] border border-[#CFE2FF] bg-white transition-all hover:-translate-y-1 hover:border-[#007BFF]">
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-[#0052CC] to-[#0B1F3B]">{r.coverImage?.url && <Image src={r.coverImage.url} alt={r.coverImage.alt || ""} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />}</div>
                    <div className="p-5"><p className="text-xs text-[#0052CC]">{r.category} · {r.readingTime} min read</p><h3 className={`${pop.className} mt-2 text-lg font-semibold leading-snug text-[#0B1F3B]`}>{r.title}</h3></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
