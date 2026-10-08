import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Acc, Lines, img, pop, ring, wrap } from "./shared";

const posts = [
  ["Pricing", "How much does website development cost in Pakistan?", "What drives the price of a business website and how to budget for it.", "/blog/website-development-cost-pakistan"],
  ["Comparison", "Custom website vs template website: which is better?", "When a template is enough and when custom development pays off.", "/blog/custom-vs-template-website"],
  ["Guide", "How to choose a website development company", "Questions to ask, proof to look for and red flags to avoid.", "/blog/how-to-choose-website-development-company"],
];

// Placeholder photos. Replace with real article covers.
const postImgs = ["photo-1460925895917-afdab827c52f", "photo-1531297484001-80022131f5a1", "photo-1519389950473-47ba0277781c"];

export default function BlogInsights() {
  return (
    <section className="bg-white py-24 md:py-36" aria-labelledby="blog">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Ideas for <b className="font-bold">better</b></>, <>websites and <Acc dark={false}>software</Acc></>]} />
          <Link href="/blog" id="blog" className={`rv inline-flex items-center gap-2 rounded-full border border-[#0B1F3B] px-6 py-3 font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}>Read the blog <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="mt-14 grid border-t border-[#0B1F3B] md:grid-cols-3">
          {posts.map(([tag, t, d, href], i) => (
            <Link key={t} href={href} className={`rv group flex flex-col justify-between gap-12 py-8 transition hover:bg-[#F5F9FF] md:px-8 ${i ? "md:border-l md:border-[#CFE2FF]" : "md:pl-0"} ${ring}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div>
                <div className="mb-6 overflow-hidden rounded-[3px]"><img src={img(postImgs[i], 800)} alt={t} loading="lazy" className="h-48 w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                <span className="rounded-full bg-[#E6F0FF] px-3 py-1 text-xs font-medium text-[#0052CC]">{tag}</span>
                <h3 className={`${pop.className} mt-6 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#0B1F3B]`}>{t}</h3>
                <p className="mt-3 font-light leading-relaxed text-[#475569]">{d}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-medium text-[#0052CC]">Read article <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
