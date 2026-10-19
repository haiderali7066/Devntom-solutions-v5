'use client';

import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';

const enc = new TextEncoder();
const dec = new TextDecoder('utf-8');

function tlv(tag: number, value: string): number[] {
  const bytes = enc.encode(value);
  return [tag, bytes.length, ...bytes];
}

function toBase64(bytes: number[] | Uint8Array): string {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function fromBase64(b64: string): Uint8Array {
  const bin = atob(b64.trim());
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

const TAG_NAMES: Record<number, string> = {
  1: 'Seller name',
  2: 'VAT registration number',
  3: 'Invoice timestamp',
  4: 'Invoice total (with VAT)',
  5: 'VAT amount',
  6: 'Invoice hash (Phase 2)',
  7: 'Digital signature (Phase 2)',
  8: 'Public key (Phase 2)',
  9: 'Certificate stamp signature (Phase 2)',
};

function decodeTlv(b64: string) {
  const bytes = fromBase64(b64);
  const rows: { tag: number; name: string; value: string }[] = [];
  let i = 0;
  while (i < bytes.length) {
    const tag = bytes[i];
    const len = bytes[i + 1];
    if (len === undefined || i + 2 + len > bytes.length) throw new Error('Malformed TLV data');
    const slice = bytes.slice(i + 2, i + 2 + len);
    const value = tag <= 5 ? dec.decode(slice) : toBase64(slice);
    rows.push({ tag, name: TAG_NAMES[tag] ?? `Tag ${tag}`, value });
    i += 2 + len;
  }
  if (!rows.length) throw new Error('No data found');
  return rows;
}

const money = /^\d+(\.\d{1,2})?$/;

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-sky-400';

export default function ZatcaQrClient() {
  const [tab, setTab] = useState<'generate' | 'decode'>('generate');

  const [seller, setSeller] = useState('');
  const [vat, setVat] = useState('');
  const [ts, setTs] = useState('');
  const [total, setTotal] = useState('');
  const [vatAmt, setVatAmt] = useState('');
  const [png, setPng] = useState('');
  const [copied, setCopied] = useState(false);

  const [input, setInput] = useState('');

  useEffect(() => {
    const d = new Date();
    d.setMilliseconds(0);
    setTs(d.toISOString().slice(0, 19));
  }, []);

  const { base64, errors } = useMemo(() => {
    const errors: string[] = [];
    if (!seller.trim()) errors.push('Seller name is required.');
    if (!/^3\d{13}3$/.test(vat)) errors.push('VAT number must be 15 digits, starting and ending with 3.');
    if (!ts) errors.push('Timestamp is required.');
    if (!money.test(total)) errors.push('Invoice total must be a number, e.g. 1150.00.');
    if (!money.test(vatAmt)) errors.push('VAT amount must be a number, e.g. 150.00.');
    if (money.test(total) && money.test(vatAmt) && Number(vatAmt) > Number(total))
      errors.push('VAT amount cannot be greater than the invoice total.');
    if (enc.encode(seller).length > 255) errors.push('Seller name is too long (max 255 bytes).');
    if (errors.length) return { base64: '', errors };

    const timestamp = `${ts.length === 16 ? ts + ':00' : ts}Z`;
    const bytes = [
      ...tlv(1, seller.trim()),
      ...tlv(2, vat),
      ...tlv(3, timestamp),
      ...tlv(4, Number(total).toFixed(2)),
      ...tlv(5, Number(vatAmt).toFixed(2)),
    ];
    return { base64: toBase64(bytes), errors };
  }, [seller, vat, ts, total, vatAmt]);

  useEffect(() => {
    if (!base64) {
      setPng('');
      return;
    }
    QRCode.toDataURL(base64, { width: 360, margin: 2, errorCorrectionLevel: 'M' })
      .then(setPng)
      .catch(() => setPng(''));
  }, [base64]);

  const decoded = useMemo(() => {
    if (!input.trim()) return { rows: [], error: '' };
    try {
      return { rows: decodeTlv(input), error: '' };
    } catch {
      return { rows: [], error: 'Could not decode. Paste a valid Base64 ZATCA QR string.' };
    }
  }, [input]);

  const downloadSvg = async () => {
    const svg = await QRCode.toString(base64, { type: 'svg', margin: 2, errorCorrectionLevel: 'M' });
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zatca-qr.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const loadSample = () => {
    setSeller('Bobs Records');
    setVat('310122393500003');
    setTs('2022-04-25T15:30:00');
    setTotal('1000.00');
    setVatAmt('150.00');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
      <div className="mb-6 flex gap-2">
        {(['generate', 'decode'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              tab === t ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {t === 'generate' ? 'Generate QR' : 'Decode QR'}
          </button>
        ))}
      </div>

      {tab === 'generate' ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Seller name
              <input className={`${inputCls} mt-1`} value={seller} onChange={(e) => setSeller(e.target.value)} placeholder="Company name (Arabic or English)" />
            </label>
            <label className="block text-sm text-slate-300">
              VAT registration number
              <input className={`${inputCls} mt-1`} value={vat} onChange={(e) => setVat(e.target.value.replace(/\D/g, '').slice(0, 15))} placeholder="3XXXXXXXXXXXXX3" inputMode="numeric" />
            </label>
            <label className="block text-sm text-slate-300">
              Invoice date and time
              <input type="datetime-local" step={1} className={`${inputCls} mt-1`} value={ts} onChange={(e) => setTs(e.target.value)} />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-sm text-slate-300">
                Total (with VAT)
                <input className={`${inputCls} mt-1`} value={total} onChange={(e) => setTotal(e.target.value)} placeholder="1150.00" inputMode="decimal" />
              </label>
              <label className="block text-sm text-slate-300">
                VAT amount
                <input className={`${inputCls} mt-1`} value={vatAmt} onChange={(e) => setVatAmt(e.target.value)} placeholder="150.00" inputMode="decimal" />
              </label>
            </div>
            <button onClick={loadSample} className="text-sm font-semibold text-sky-400 hover:underline">
              Fill with sample data
            </button>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6">
            {png ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={png} alt="Generated ZATCA e-invoice QR code" className="h-64 w-64 rounded-xl bg-white p-2" />
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a href={png} download="zatca-qr.png" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-500">
                    Download PNG
                  </a>
                  <button onClick={downloadSvg} className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20">
                    Download SVG
                  </button>
                  <button onClick={copy} className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20">
                    {copied ? 'Copied!' : 'Copy Base64'}
                  </button>
                </div>
                <p className="mt-4 w-full break-all rounded-xl bg-black/30 p-3 font-mono text-xs text-slate-400">{base64}</p>
              </>
            ) : (
              <ul className="space-y-2 text-sm text-amber-300" aria-live="polite">
                {errors.length ? errors.map((e) => <li key={e}>• {e}</li>) : <li>Fill in the fields to generate your QR code.</li>}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block text-sm text-slate-300">
            Paste the Base64 string from a ZATCA QR code
            <textarea className={`${inputCls} mt-1 min-h-[120px] font-mono text-xs`} value={input} onChange={(e) => setInput(e.target.value)} placeholder="AQxCb2JzIFJlY29yZHMCDzMxMDEyMjM5MzUwMDAwMw..." />
          </label>
          {decoded.error && <p className="text-sm text-amber-300">{decoded.error}</p>}
          {decoded.rows.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[420px] text-left text-sm text-slate-200">
                <thead className="bg-white/5 text-slate-400">
                  <tr><th className="px-4 py-2">Tag</th><th className="px-4 py-2">Field</th><th className="px-4 py-2">Value</th></tr>
                </thead>
                <tbody>
                  {decoded.rows.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="px-4 py-2 font-bold text-sky-400">{r.tag}</td>
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="break-all px-4 py-2 font-mono text-xs">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}