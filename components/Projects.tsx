import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Acc, Lines, img, pop, ring, wrap } from "./shared";

// Edit these cards as case studies get approved: [title, text, tags, stack, href]
const projects = [
  ["Hivenox", "A product website for an AI marketing platform, explaining its modular Workers clearly.", ["SaaS", "AI", "Website"], "Next.js, Tailwind CSS", "/projects"],
  ["AJAX Global", "A B2B outsourcing website with service pages and reusable components.", ["B2B", "Website"], "Next.js, Tailwind CSS", "/projects"],
  ["Al Dana Gaming", "A fast site for a gaming retailer and repair shop, with prices in PKR.", ["Retail", "Website"], "Next.js, Tailwind CSS", "/projects"],
  ["Skills Aura", "A conversion-focused landing page for a trading academy.", ["Education", "Landing page"], "Next.js, Tailwind CSS", "/projects"],
  ["Shah Zaman Groups", "A landing page for a group spanning General Trading, Live Stock and Construction.", ["Multi-brand", "Landing page"], "Next.js, Tailwind CSS", "/projects"],
] as const;

// Placeholder photos. Replace with real project screenshots.
const projectImgs = ["photo-1498050108023-c5249f4df085", "photo-1518770660439-4636190af475", "photo-1551288049-bebda4e38f71", "photo-1512941937669-90a1b58e7e9c", "photo-1556742049-0cfed4f6a45d"];

export default function Projects() {
  return (
    <section data-hs className="bg-white lg:h-[340vh]" aria-labelledby="prj">
      <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-6`}>
          <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Selected <b className="font-bold">projects</b></>, <>built to <Acc dark={false}>perform</Acc></>]} />
          <Link href="/projects" id="prj" data-magnetic className={`inline-flex items-center gap-2 rounded-full bg-[#0B1F3B] px-6 py-3 font-medium text-white transition hover:bg-[#007BFF] ${ring}`}>All projects <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div data-scroller className="mt-10 overflow-x-auto lg:overflow-visible">
          <div data-track className="flex w-max gap-6 px-6 pb-4 md:px-12 lg:pr-24">
            {projects.map(([t, d, tags, stack, href], i) => (
              <Link key={t} href={href} data-tilt data-cursor="view" className={`gb group block w-[82vw] shrink-0 overflow-hidden rounded-[4px] md:w-[46vw] lg:w-[30vw] ${ring}`}>
                <div className="relative h-[34vh] min-h-[220px] overflow-hidden bg-gradient-to-br from-[#0052CC] to-[#0B1F3B]">
                  <img src={img(projectImgs[i], 900)} alt={`${t} preview`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/60 to-transparent" />
                  <ul className="absolute left-4 top-4 flex flex-wrap gap-2">{tags.map((g) => <li key={g} className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#0052CC]">{g}</li>)}</ul>
                </div>
                <div className="p-6">
                  <h3 className={`${pop.className} flex items-start justify-between gap-3 text-xl font-semibold tracking-[-0.01em] text-[#0B1F3B]`}>{t}<ArrowUpRight size={20} className="mt-1 shrink-0 text-[#007BFF] transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></h3>
                  <p className="mt-2 font-light leading-relaxed text-[#475569]">{d}</p>
                  <p className="mt-4 border-t border-[#E5E7EB] pt-3 text-sm text-[#64748B]">Stack: <span className="font-medium text-[#1F2937]">{stack}</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
