import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Acc, Lines, img, pop, ring, wrap } from "./shared";

const industries = [
  ["Healthcare", "Booking, patient portals and records.", "photo-1576091160399-112ba8d25d1d"],
  ["Fintech and finance", "Dashboards, payments and reporting.", "photo-1554224155-6726b3ff858f"],
  ["Logistics", "Tracking, inventory and dispatch.", "photo-1586528116311-ad8dd3c8310d"],
  ["E-commerce and retail", "Stores, catalogues and checkout flows.", "photo-1556742049-0cfed4f6a45d"],
  ["Education", "Learning platforms and admin tools.", "photo-1503676260728-1c00da094a0b"],
  ["Restaurants and hospitality", "Ordering, reservations and operations.", "photo-1517248135467-4c7edcad34c4"],
] as const;

export default function Industries() {
  return (
    <section className="bg-[#F5F9FF] py-24 md:py-36" aria-labelledby="ind">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Lines className="max-w-3xl t2 text-[#0B1F3B]" lines={[<>Software for <b className="font-bold">every</b></>, <>kind of <Acc dark={false}>industry</Acc></>]} />
          <Link href="/industries" id="ind" data-magnetic className={`inline-flex items-center gap-2 rounded-full border border-[#0B1F3B] px-6 py-3 font-medium text-[#0B1F3B] transition hover:bg-[#0B1F3B] hover:text-white ${ring}`}>Explore industries <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(([n, d, id], i) => (
            <Link key={n} href="/industries" data-tilt data-cursor="view" className={`rv group relative block h-80 overflow-hidden rounded-[4px] bg-gradient-to-br from-[#0052CC] to-[#0B1F3B] ${ring}`} style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <img src={img(id, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050E1F] via-[#050E1F]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className={`${pop.className} text-2xl font-semibold tracking-[-0.01em]`}>{n}</h3>
                <p className="mt-1 font-light text-[#CFE2FF]">{d}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
