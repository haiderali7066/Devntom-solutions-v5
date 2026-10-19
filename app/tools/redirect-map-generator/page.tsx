import type { Metadata } from 'next';
import Link from 'next/link';
import RedirectMapClient from './RedirectMapClient';

const BASE = 'https://www.devntomsolutions.com';
const URL = `${BASE}/tools/redirect-map-generator`;

export const metadata: Metadata = {
  title: 'Redirect Map Generator – CSV to Next.js, Nginx & Apache Redirects | DEVNTOM',
  description:
    'Free redirect map generator. Paste or upload a CSV of old and new URLs and get Next.js, Vercel, Nginx, Apache and Netlify redirect rules. Flattens chains, removes loops and duplicates. Runs in your browser.',
  keywords: [
    'redirect map generator',
    'CSV to redirects',
    'Next.js redirects generator',
    'htaccess redirect generator',
    'nginx redirect map',
    '301 redirect generator',
    'site migration redirects',
    'bulk 301 redirects',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'Redirect Map Generator – CSV to Next.js, Nginx & Apache',
    description:
      'Turn a CSV of old and new URLs into ready-to-use redirect config. Checks for chains, loops and duplicates.',
    url: URL,
    siteName: 'DEVNTOM Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redirect Map Generator – Bulk 301 Redirects from CSV',
    description: 'Generate Next.js, Vercel, Nginx, Apache and Netlify redirects from a CSV in your browser.',
  },
};

const steps = [
  'List your old URLs and where each one should go, one per line, as a CSV, tab-separated or pasted text. Paths and full URLs both work.',
  'Pick your default status code. Use 301 or 308 for permanent moves and 302 or 307 for temporary ones. A third column overrides it for a single row.',
  'Leave "Flatten redirect chains" on so visitors and crawlers reach the final page in one hop.',
  'Choose your platform: Next.js, Vercel, Nginx, Apache or Netlify / Cloudflare Pages.',
  'Review the report, then copy or download the file and deploy it.',
];

const formats = [
  { f: 'Next.js', file: 'next.config.js', where: 'Merge the redirects() function into your Next.js config and restart.' },
  { f: 'Vercel', file: 'vercel.json', where: 'Project root. Merge the redirects array if the file exists.' },
  { f: 'Nginx', file: 'redirects.conf', where: 'map blocks in the http context, if lines in the server block.' },
  { f: 'Apache', file: '.htaccess', where: 'Site root. Uses RedirectMatch, plus RewriteRule for query strings.' },
  { f: 'Netlify / Cloudflare Pages', file: '_redirects', where: 'Publish directory.' },
];

const codes = [
  { code: '301', type: 'Permanent', use: 'The page moved for good. The standard choice for migrations and URL changes.' },
  { code: '308', type: 'Permanent', use: 'Same as 301, but guarantees the request method (such as POST) is preserved. Next.js uses 308 for permanent: true.' },
  { code: '302', type: 'Temporary', use: 'A short-term move, such as a sale page or maintenance. The old URL stays the main one.' },
  { code: '307', type: 'Temporary', use: 'Same as 302, but preserves the request method.' },
];

const csvExample = `old,new,status
/about-us.html,/about
/blog/2019/seo-tips/,/blog/seo-tips
https://example.com/services.php,https://example.com/services
/shop?id=42,/products/blue-widget
/temp-sale,/sale,302`;

const faqs = [
  {
    q: 'What is a redirect map?',
    a: 'A redirect map is a list that pairs each old URL with the new URL that should replace it. You build one when you migrate a site, change your URL structure, merge pages or switch domains, so visitors and search engines land on the right page instead of a 404.',
  },
  {
    q: 'How do I bulk create 301 redirects from a CSV?',
    a: 'Put the old URL in the first column and the new URL in the second, paste or upload the file into the tool, choose your platform and download the generated rules. Add a third column with a status code if some rows need something other than your default.',
  },
  {
    q: 'What is a redirect chain and why should I avoid it?',
    a: 'A chain is when one redirect leads to another, for example /a to /b to /c. Each extra hop adds latency and gives crawlers more work. Flattening the chain makes /a go straight to /c. The tool does this for you when the option is on.',
  },
  {
    q: 'What is a redirect loop?',
    a: 'A loop happens when redirects point back at each other, such as /a to /b and /b to /a. Browsers show an error and the page never loads. The tool detects loops and removes the rows involved so they never reach your config.',
  },
  {
    q: 'Does the tool handle URLs with query strings?',
    a: 'Yes. A source such as /shop?id=42 is converted into a rule that matches the query. Next.js and Vercel use a has condition, Apache uses a RewriteCond on the query string, Nginx matches on the request URI, and Netlify uses a parameter match.',
  },
  {
    q: 'Why are #fragments removed from my URLs?',
    a: 'Browsers never send the part after # to the server, so a server redirect cannot match on it. The tool drops fragments from relative URLs so your rules stay valid.',
  },
  {
    q: 'Is my URL list uploaded anywhere?',
    a: 'No. The list is parsed and converted entirely in your browser, so nothing is sent to or stored on a server.',
  },
  {
    q: 'How long should I keep redirects in place?',
    a: 'Google advises keeping redirects for at least a year after a site move, and longer if the old URLs still receive links or traffic. Removing them early can bring back 404s for anyone still using the old addresses.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Redirect Map Generator',
    url: URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Free online tool that turns a CSV of old and new URLs into Next.js, Vercel, Nginx, Apache and Netlify redirect rules.',
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
      { '@type': 'ListItem', position: 3, name: 'Redirect Map Generator', item: URL },
    ],
  },
];

export default function Page() {
  return (
    <main className="bg-white text-slate-900">
      {jsonLd.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      {/* HERO + TOOL */}
      <section className="bg-[#05070F] px-5 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-sky-400">Home</Link> /{' '}
            <Link href="/tools" className="hover:text-sky-400">Tools</Link> /{' '}
            <span className="text-slate-200">Redirect Map Generator</span>
          </nav>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-6xl">
            Redirect Map Generator: <span className="text-sky-400">CSV to Next.js, Nginx &amp; Apache</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Turn a list of old and new URLs into ready-to-deploy redirect rules. The tool flattens chains,
            removes loops and duplicates, and runs entirely in your browser.
          </p>
          <div className="mt-10">
            <RedirectMapClient />
          </div>
        </div>
      </section>

      {/* WHAT / WHY */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">What is a redirect map?</h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          A redirect map pairs every old URL on your website with the new URL that replaces it. If you are
          redesigning a site, moving to a new framework, changing your URL structure or switching domains,
          the map is what keeps your visitors, backlinks and search rankings from ending up on a 404 page.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          Writing the rules by hand for a few hundred pages is slow and easy to get wrong. A single typo can
          create a loop, and chains build up quietly when old redirects meet new ones. This tool takes the
          spreadsheet you already have and produces clean config for the platform you use.
        </p>
      </section>

      {/* HOW TO */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">How to generate bulk 301 redirects from a CSV</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white">
                  {i + 1}
                </span>
                <span className="text-slate-700">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CSV FORMAT */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">Redirect CSV format</h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Use two columns, old URL then new URL, with an optional third column for the status code. The tool
          accepts comma, semicolon or tab separators, skips a header row, ignores lines starting with{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">#</code>, and accepts either paths or
          full URLs.
        </p>
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-[#05070F] p-5 text-sm text-slate-200">{csvExample}</pre>
      </section>

      {/* FORMATS */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">Supported output formats</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Where it goes</th>
                </tr>
              </thead>
              <tbody>
                {formats.map((r) => (
                  <tr key={r.f} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold">{r.f}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.file}</td>
                    <td className="px-4 py-3 text-slate-600">{r.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STATUS CODES */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">301 vs 302 vs 307 vs 308 redirects</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">When to use it</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.code} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-black text-blue-600">{c.code}</td>
                  <td className="px-4 py-3 font-semibold">{c.type}</td>
                  <td className="px-4 py-3 text-slate-600">{c.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CHECKS */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">What the tool checks for you</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[
              ['Duplicate sources', 'If the same old URL appears twice, the first entry is kept and the rest are reported.'],
              ['Self-redirects', 'A URL that redirects to itself is removed before it can cause an endless request.'],
              ['Redirect chains', 'A to B to C becomes A to C, so every visitor and crawler needs only one hop.'],
              ['Redirect loops', 'Rows that point back at each other are detected and removed from the output.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-black">{t}</h3>
                <p className="mt-2 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIGRATION CHECKLIST */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl font-black tracking-tight">Site migration redirect checklist</h2>
        <ul className="mt-6 space-y-3">
          {[
            'Crawl the old site first and export every URL that gets traffic or backlinks. These are the ones that must not break.',
            'Redirect each old page to the most relevant new page. Sending everything to the homepage is treated like a soft 404.',
            'Update internal links, canonical tags and your XML sitemap to the new URLs so they no longer depend on redirects.',
            'Test a sample of old URLs after launch, and crawl the old URL list again to catch any that still return 404.',
            'Keep the redirects live for at least a year, and watch Search Console for new crawl errors.',
          ].map((t) => (
            <li key={t} className="rounded-2xl border border-slate-200 p-4 text-slate-700">{t}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight">Redirect map generator FAQs</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-bold">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#05070F] px-5 py-20 text-center text-white">
        <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
          Planning a website migration or redesign?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          DEVNTOM Solutions handles the whole move: URL mapping, redirects, performance and SEO, so you keep
          your rankings.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white transition hover:bg-blue-500">
            Talk to our team
          </Link>
          <Link href="/services/website-development" className="rounded-full border border-white/20 px-8 py-3.5 font-bold text-white transition hover:border-sky-400">
            Website development
          </Link>
        </div>
      </section>
    </main>
  );
}
