import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VAT_COUNTRIES, getCountry } from '../vat-countries';
import VatCalculatorClient from '../VatCalculatorClient';

const BASE = 'https://www.devntomsolutions.com';

// Next.js 15: params is a Promise. On Next.js 14 use `{ params }: { params: { country: string } }` and drop the awaits.
type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return VAT_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) return {};
  const url = `${BASE}/tools/vat-calculator/${c.slug}`;
  const title = `${c.name} ${c.taxName} Calculator (${c.rate}%) – Add or Remove ${c.taxName} | DEVNTOM`;
  const description = `Free ${c.name} ${c.taxName} calculator. Add ${c.rate}% ${c.taxName} to a price or remove it from a ${c.taxName}-inclusive total in ${c.currency}. Instant results with the net, tax and gross amounts.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'DEVNTOM Solutions', type: 'website', images: [{ url: '/og-tools.png', width: 1200, height: 630, alt: `${c.name} ${c.taxName} calculator` }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-tools.png'] },
  };
}

export default async function Page({ params }: Props) {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();

  const url = `${BASE}/tools/vat-calculator/${c.slug}`;
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: c.currency });
  const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2;
  const round = (n: number) => Number(n.toFixed(digits));
  const r = c.rate / 100;
  const exNet = 1000;
  const exTax = round(exNet * r);
  const exGross = round(exNet + exTax);
  const rmGross = exGross;
  const rmNet = round(rmGross / (1 + r));
  const rmTax = round(rmGross - rmNet);
  const T = c.taxName;

  const faqs = [
    {
      q: `What is the ${T} rate in ${c.name}?`,
      a: `The standard ${T} rate in ${c.name} is ${c.rate}%. Some goods and services can be zero-rated, exempt or taxed at different rates, so always check the rules that apply to your supply with ${c.authority}.`,
    },
    {
      q: `How do I calculate ${T} in ${c.name}?`,
      a: `Multiply the price excluding ${T} by ${r} to get the ${T} amount, then add it to the price. For example, ${fmt.format(exNet)} + ${c.rate}% = ${fmt.format(exGross)}.`,
    },
    {
      q: `How do I remove ${T} from a price in ${c.name}?`,
      a: `Divide the ${T}-inclusive price by ${(1 + r).toFixed(2)}. For example, ${fmt.format(rmGross)} ÷ ${(1 + r).toFixed(2)} = ${fmt.format(rmNet)}, which means the ${T} portion is ${fmt.format(rmTax)}. Subtracting ${c.rate}% from the gross price gives the wrong answer.`,
    },
    ...(c.threshold
      ? [
          {
            q: `Who has to register for ${T} in ${c.name}?`,
            a: `Businesses whose taxable supplies exceed ${c.threshold}. Registration thresholds and voluntary registration rules change, so confirm the current figures with ${c.authority}.`,
          },
        ]
      : []),
    {
      q: 'Is this calculator official?',
      a: `No. It is a free convenience tool for quick estimates and is not tax or legal advice. For filing and compliance, rely on ${c.authority} or a qualified tax adviser.`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${c.name} ${T} Calculator`,
      url,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'DEVNTOM Solutions', url: BASE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE}/tools` },
        { '@type': 'ListItem', position: 3, name: 'VAT Calculator', item: `${BASE}/tools/vat-calculator` },
        { '@type': 'ListItem', position: 4, name: `${c.name} ${T} Calculator`, item: url },
      ],
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      <section className="bg-[#05070F] px-5 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-sky-400">Home</Link> /{' '}
            <Link href="/tools" className="hover:text-sky-400">Tools</Link> /{' '}
            <Link href="/tools/vat-calculator" className="hover:text-sky-400">VAT Calculator</Link> /{' '}
            <span className="text-slate-200">{c.name}</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-6xl">
            {c.name} <span className="text-sky-400">{T} Calculator</span> ({c.rate}%)
          </h1>
          {c.arabicTitle && (
            <p lang="ar" dir="rtl" className="mt-3 text-xl font-bold text-slate-300">
              {c.arabicTitle}
            </p>
          )}
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Add {c.rate}% {T} to a price or remove it from a {T}-inclusive total in {c.currency}. Instant,
            free, and calculated in your browser.
          </p>
          <div className="mt-10">
            <VatCalculatorClient rate={c.rate} currency={c.currency} taxName={T} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">{T} in {c.name}</h2>
        <p className="mt-4 leading-relaxed text-slate-600">{c.about}</p>
        <ul className="mt-6 space-y-3">
          {c.notes.map((n) => (
            <li key={n} className="rounded-2xl border border-slate-200 p-4 text-slate-700">{n}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-500">Administered by: {c.authority}</p>
      </section>

      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">How to calculate {T} in {c.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-black">Add {T}</h3>
              <p className="mt-2 font-mono text-sm text-blue-600">Gross = Net × {(1 + r).toFixed(2)}</p>
              <p className="mt-3 text-slate-600">
                {fmt.format(exNet)} net + {fmt.format(exTax)} {T} = <strong>{fmt.format(exGross)}</strong>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-xl font-black">Remove {T}</h3>
              <p className="mt-2 font-mono text-sm text-blue-600">Net = Gross ÷ {(1 + r).toFixed(2)}</p>
              <p className="mt-3 text-slate-600">
                {fmt.format(rmGross)} gross − {fmt.format(rmTax)} {T} = <strong>{fmt.format(rmNet)}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {c.slug === 'saudi-arabia' && (
        <section className="mx-auto max-w-4xl px-5 pt-16">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-xl font-black">Issuing Saudi invoices?</h2>
            <p className="mt-2 text-slate-700">
              Simplified tax invoices need a ZATCA QR code containing the seller, VAT number, timestamp, total
              and VAT amount.
            </p>
            <Link href="/tools/zatca-qr-code-generator" className="mt-4 inline-block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500">
              Open the ZATCA QR generator
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">{c.name} {T} calculator FAQs</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border border-slate-200 p-5">
              <summary className="cursor-pointer list-none font-bold">{f.q}</summary>
              <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-black tracking-tight">Other {T} calculators</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {VAT_COUNTRIES.filter((o) => o.slug !== c.slug).map((o) => (
              <Link key={o.slug} href={`/tools/vat-calculator/${o.slug}`} className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold hover:border-blue-600 hover:text-blue-600">
                {o.name} ({o.rate}%)
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05070F] px-5 py-20 text-center text-white">
        <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
          Need invoicing or tax logic built into your software?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          DEVNTOM Solutions builds custom billing, ERP and e-commerce platforms for businesses across the region.
        </p>
        <Link href="/contact" className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white hover:bg-blue-500">
          Talk to our team
        </Link>
      </section>
    </main>
  );
}
