import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { FaArrowRight, FaClock, FaMagnifyingGlass } from "react-icons/fa6";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";

const pop = Poppins({ subsets: ["latin"], weight: ["200", "400", "600", "700"], display: "swap" });
const SITE = "https://www.devntomsolutions.com";
const PER_PAGE = 9;


export const metadata: Metadata = {
  title: "Blog: Website, App, SEO and Marketing Insights",
  description: "Practical guides on website development, mobile apps, SEO, UI/UX design, digital marketing and AI automation from the team at Devntom Solutions.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: `${SITE}/blog`, title: "Blog | Devntom Solutions", description: "Guides and insights on websites, apps, SEO and marketing.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Devntom Solutions blog" }] },
};

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const fmt = (d?: Date | null) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

type SP = { q?: string; category?: string; page?: string };

export default async function BlogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 80);
  const category = (sp.category ?? "").trim().slice(0, 60);
  const page = Math.max(1, Math.min(500, parseInt(sp.page ?? "1", 10) || 1));

  await connectDB();
  const filter: Record<string, unknown> = { status: "published" };
  if (category) filter.category = category;
  if (q) { const rx = new RegExp(escapeRegex(q), "i"); filter.$or = [{ title: rx }, { excerpt: rx }, { tags: rx }]; }

  const [posts, total, categories] = await Promise.all([
    Post.find(filter).sort({ publishedAt: -1 }).skip((page - 1) * PER_PAGE).limit(PER_PAGE).select("title slug excerpt coverImage category publishedAt readingTime").lean(),
    Post.countDocuments(filter),
    Post.distinct("category", { status: "published" }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const filtered = !!(q || category);
  const featured = !filtered && page === 1 ? posts[0] : undefined;
  const rest = featured ? posts.slice(1) : posts;

  const href = (over: Partial<SP>) => {
    const p = new URLSearchParams();
    const m = { q, category, page: String(page), ...over };
    for (const [k, v] of Object.entries(m)) if (v && !(k === "page" && v === "1")) p.set(k, v);
    const s = p.toString();
    return s ? `/blog?${s}` : "/blog";
  };

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Blog", "@id": `${SITE}/blog#blog`, url: `${SITE}/blog`, name: "Devntom Solutions Blog", publisher: { "@id": `${SITE}/#organization` }, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.publishedAt?.toISOString() })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` }] },
    ],
  };

  const Card = ({ p, big }: { p: (typeof posts)[number]; big?: boolean }) => (
    <article className={`group overflow-hidden rounded-[20px] border border-[#CFE2FF] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-[#007BFF] hover:shadow-[0_24px_60px_rgba(0,123,255,.15)] ${big ? "md:grid md:grid-cols-2" : ""}`}>
      <Link href={`/blog/${p.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4FF]">
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#0B1F3B] ${big ? "aspect-[16/10] md:h-full" : "aspect-[16/10]"}`}>
          {p.coverImage?.url && <Image src={p.coverImage.url} alt={p.coverImage.alt || ""} fill sizes={big ? "(min-width:768px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-105" />}
        </div>
      </Link>
      <div className={`p-6 ${big ? "md:flex md:flex-col md:justify-center md:p-10" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B]"><span className="rounded-full bg-[#E6F0FF] px-3 py-1 font-medium text-[#0052CC]">{p.category}</span><span>{fmt(p.publishedAt)}</span><span className="inline-flex items-center gap-1"><FaClock size={10} aria-hidden="true" />{p.readingTime} min read</span></p>
        <h2 className={`${pop.className} mt-4 font-semibold leading-snug tracking-[-0.02em] text-[#0B1F3B] ${big ? "text-2xl md:text-4xl" : "text-xl"}`}><Link href={`/blog/${p.slug}`} className="hover:text-[#007BFF]">{p.title}</Link></h2>
        <p className={`mt-3 leading-relaxed text-[#475569] ${big ? "" : "line-clamp-3 text-sm"}`}>{p.excerpt}</p>
        <Link href={`/blog/${p.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0052CC]">Read article <FaArrowRight size={12} className="transition group-hover:translate-x-1" aria-hidden="true" /></Link>
      </div>
    </article>
  );

  return (
    <main id="main" className="bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="relative isolate overflow-hidden bg-[#050E1F] px-6 pb-20 pt-32 text-white md:px-12 md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 70% at 80% 20%,rgba(0,123,255,.4),transparent 70%),#050E1F" }} />
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="text-sm text-[#93C5FD]"><Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Blog</span></nav>
          <h1 className={`${pop.className} mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,4.8rem)] font-extralight leading-[1.04] tracking-[-0.04em]`}>Insights on <b className="font-bold">websites, apps and growth</b></h1>
          <p className="mt-5 max-w-xl text-lg font-light text-[#CFE2FF]">Practical guides from the team at Devntom Solutions.</p>
          <form action="/blog" role="search" className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-white/20 bg-white/[.07] p-1.5 backdrop-blur">
            <FaMagnifyingGlass className="ml-4 shrink-0 text-[#93C5FD]" aria-hidden="true" />
            <input name="q" defaultValue={q} maxLength={80} placeholder="Search articles" aria-label="Search articles" className="w-full bg-transparent px-2 py-3 text-white outline-none placeholder:text-white/50" />
            {category && <input type="hidden" name="category" value={category} />}
            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0B1F3B] transition hover:bg-[#007BFF] hover:text-white">Search</button>
          </form>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          {categories.length > 0 && (
            <nav aria-label="Categories" className="flex flex-wrap gap-2">
              {[["", "All"], ...categories.sort().map((c) => [c, c])].map(([c, l]) => <Link key={c || "all"} href={href({ category: c, page: "1" })} aria-current={category === c ? "page" : undefined} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${category === c ? "border-[#007BFF] bg-[#007BFF] text-white" : "border-[#CFE2FF] text-[#0B1F3B] hover:border-[#007BFF]"}`}>{l}</Link>)}
            </nav>
          )}

          {posts.length === 0 ? (
            <div className="mt-12 rounded-[20px] border-2 border-dashed border-[#CFE2FF] p-14 text-center"><p className={`${pop.className} text-2xl font-semibold text-[#0B1F3B]`}>{filtered ? "No articles match your search" : "Articles are coming soon"}</p>{filtered && <Link href="/blog" className="mt-4 inline-block text-[#0052CC] underline">Clear filters</Link>}</div>
          ) : (
            <div className="mt-10 space-y-6">
              {featured && <Card p={featured} big />}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <Card key={String(p._id)} p={p} />)}</div>
            </div>
          )}

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-3 text-sm">
              {page > 1 && <Link href={href({ page: String(page - 1) })} rel="prev" className="rounded-full border border-[#CFE2FF] px-5 py-2.5 font-medium hover:border-[#007BFF]">Previous</Link>}
              <span className="text-[#64748B]">Page {page} of {pages}</span>
              {page < pages && <Link href={href({ page: String(page + 1) })} rel="next" className="rounded-full border border-[#CFE2FF] px-5 py-2.5 font-medium hover:border-[#007BFF]">Next</Link>}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
