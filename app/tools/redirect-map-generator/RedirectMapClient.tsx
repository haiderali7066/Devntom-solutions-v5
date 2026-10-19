'use client';

import { useMemo, useState } from 'react';
import { FORMATS, FORMAT_ORDER, SAMPLE, analyze, build, toCsv, type Format } from './redirect-engine';

const field =
  'rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-400';

function download(name: string, text: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Stat({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div className="rounded-xl bg-white/5 px-4 py-3">
      <p className={`text-2xl font-black ${warn && value > 0 ? 'text-amber-300' : 'text-white'}`}>{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

export default function RedirectMapClient() {
  const [text, setText] = useState('');
  const [format, setFormat] = useState<Format>('nextjs');
  const [status, setStatus] = useState(301);
  const [flatten, setFlatten] = useState(true);
  const [trimSlash, setTrimSlash] = useState(true);
  const [domain, setDomain] = useState('');
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(
    () => analyze(text, { defaultStatus: status, flatten, trimSlash, domain }),
    [text, status, flatten, trimSlash, domain]
  );
  const output = useMemo(() => build(format, analysis.rows), [format, analysis.rows]);
  const { stats, issues } = analysis;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onFile = async (file?: File) => {
    if (file) setText(await file.text());
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* INPUT */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="redirect-input" className="text-sm font-semibold text-slate-200">
              Paste your redirect list (old URL, new URL, optional status)
            </label>
            <div className="flex gap-3 text-sm font-semibold text-sky-400">
              <button onClick={() => setText(SAMPLE)} className="hover:underline">
                Load sample
              </button>
              <label className="cursor-pointer hover:underline">
                Upload CSV
                <input type="file" accept=".csv,.tsv,.txt" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </label>
              {text && (
                <button onClick={() => setText('')} className="text-slate-400 hover:underline">
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            id="redirect-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            placeholder={'/old-page,/new-page\nhttps://example.com/old.html,https://example.com/new\n/shop?id=42,/products/blue-widget'}
            className={`${field} h-64 w-full resize-y font-mono text-xs`}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Default status code
              <select value={status} onChange={(e) => setStatus(Number(e.target.value))} className={`${field} mt-1 w-full`}>
                {[301, 308, 302, 307].map((s) => (
                  <option key={s} value={s} className="bg-[#0b1020]">
                    {s} {s === 301 || s === 308 ? '(permanent)' : '(temporary)'}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-300">
              Your domain (optional)
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className={`${field} mt-1 w-full`}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} className="h-4 w-4 accent-blue-600" />
              Flatten redirect chains
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={trimSlash} onChange={(e) => setTrimSlash(e.target.checked)} className="h-4 w-4 accent-blue-600" />
              Ignore trailing slashes
            </label>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Output format">
            {FORMAT_ORDER.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={format === f}
                onClick={() => setFormat(f)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  format === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {FORMATS[f].label}
              </button>
            ))}
          </div>

          {output ? (
            <>
              <pre className="max-h-80 overflow-auto rounded-xl bg-black/40 p-4 text-xs leading-relaxed text-slate-200">{output}</pre>
              <p className="text-xs text-slate-400">{FORMATS[format].hint}</p>
              {analysis.rows.length > 1000 && (format === 'nextjs' || format === 'vercel') && (
                <p className="text-xs text-amber-300">
                  Very large redirect lists can slow builds and hit platform limits. Consider middleware or your host&apos;s bulk redirects.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <button onClick={copy} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-500">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => download(FORMATS[format].filename, output)}
                  className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20"
                >
                  Download {FORMATS[format].filename}
                </button>
                <button
                  onClick={() => download('redirect-map-clean.csv', toCsv(analysis.rows), 'text/csv')}
                  className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20"
                >
                  Download cleaned CSV
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white/5 p-6 text-center text-sm text-slate-400">
              Paste or upload your list to generate redirects. Each line needs an old URL and a new URL.
            </div>
          )}
        </div>
      </div>

      {/* REPORT */}
      {stats.input > 0 && (
        <div className="mt-8" aria-live="polite">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <Stat label="Rows read" value={stats.input} />
            <Stat label="Redirects out" value={stats.output} />
            <Stat label="Duplicates removed" value={stats.duplicates} warn />
            <Stat label="Self-redirects removed" value={stats.selfRedirects} warn />
            <Stat label={flatten ? 'Chains flattened' : 'Chains found'} value={stats.chains} warn />
            <Stat label="Loops removed" value={stats.loops} warn />
            <Stat label="Invalid rows" value={stats.invalid} warn />
          </div>
          {issues.length > 0 && (
            <ul className="mt-4 space-y-1 rounded-xl bg-white/5 p-4 text-xs text-amber-200">
              {issues.map((i, n) => (
                <li key={n}>{i}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
