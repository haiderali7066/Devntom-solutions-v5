import type { Metadata } from 'next';
import Link from 'next/link';
import { VAT_COUNTRIES } from './vat-countries';

export const metadata: Metadata = {
  title: 'VAT Calculator – Saudi Arabia, UAE, Pakistan, Bahrain, Oman & Australia | DEVNTOM',
  description:
    'Free VAT, GST and sales tax calculators for Saudi Arabia (15%), UAE (5%), Pakistan (18%), Bahrain (10%), Oman (5%) and Australia (10%). Add or remove tax in seconds.',
  alternates: { canonical: 'https://www.devntomsolutions.com/tools/vat-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://www.devntomsolutions.com/tools/vat-calculator',
    siteName: 'DEVNTOM Solutions',
    title: 'VAT, GST & Sales Tax Calculators | DEVNTOM Solutions',
    description: 'Free VAT and sales tax calculators for six countries. Add or remove tax in seconds.',
    images: [{ url: '/og-tools.png', width: 1200, height: 630, alt: 'Tax calculators by Devntom Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAT, GST & Sales Tax Calculators | DEVNTOM Solutions',
    description: 'Free VAT and sales tax calculators for six countries. Add or remove tax in seconds.',
    images: ['/og-tools.png'],
  },
};

export default function Page() {
  return (
    <main className="bg-[#05070F] px-5 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black tracking-[-0.03em] sm:text-6xl">
          VAT, GST &amp; <span className="text-sky-400">Sales Tax Calculators</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Choose your country to add or remove tax at the correct standard rate.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VAT_COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              href={`/tools/vat-calculator/${c.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-sky-400"
            >
              <p className="text-3xl font-black text-sky-400">{c.rate}%</p>
              <h2 className="mt-2 text-xl font-bold">{c.name} {c.taxName} Calculator</h2>
              <p className="mt-1 text-sm text-slate-400">{c.currency} · {c.authority}</p>
              <p className="mt-4 text-sm font-semibold text-blue-400 group-hover:underline">Open calculator →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
