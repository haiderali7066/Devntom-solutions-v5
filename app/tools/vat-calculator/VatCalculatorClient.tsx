'use client';

import { useMemo, useState } from 'react';

type Props = {
  rate: number;
  currency: string;
  taxName: string;
  defaultAmount?: number;
};

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-sky-400';

export default function VatCalculatorClient({ rate, currency, taxName, defaultAmount = 1000 }: Props) {
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState(String(defaultAmount));
  const [rateInput, setRateInput] = useState(String(rate));

  const fmt = useMemo(() => new Intl.NumberFormat('en-US', { style: 'currency', currency }), [currency]);
  const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2;
  const round = (n: number) => {
    const f = 10 ** digits;
    return Math.round((n + Number.EPSILON) * f) / f;
  };

  const result = useMemo(() => {
    const a = parseFloat(amount.replace(/,/g, ''));
    const r = parseFloat(rateInput);
    if (!isFinite(a) || a < 0 || !isFinite(r) || r < 0) return null;
    if (mode === 'add') {
      const tax = round(a * (r / 100));
      return { net: a, tax, gross: round(a + tax) };
    }
    const net = round(a / (1 + r / 100));
    return { net, tax: round(a - net), gross: a };
  }, [amount, rateInput, mode, digits]); // eslint-disable-line react-hooks/exhaustive-deps

  const label = mode === 'add' ? `Amount excluding ${taxName}` : `Amount including ${taxName}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {([
          ['add', `Add ${taxName}`],
          ['remove', `Remove ${taxName}`],
        ] as const).map(([m, text]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              mode === m ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {text}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm text-slate-300">
            {label} ({currency})
            <input
              className={`${inputCls} mt-1`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              placeholder="1000"
            />
          </label>
          <label className="block text-sm text-slate-300">
            {taxName} rate (%)
            <input
              className={`${inputCls} mt-1`}
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              inputMode="decimal"
            />
          </label>
          {rateInput !== String(rate) && (
            <button onClick={() => setRateInput(String(rate))} className="text-sm font-semibold text-sky-400 hover:underline">
              Reset to standard rate ({rate}%)
            </button>
          )}
        </div>

        <div className="rounded-2xl bg-white/5 p-6" aria-live="polite">
          {result ? (
            <dl className="space-y-4">
              <div className="flex justify-between text-slate-300">
                <dt>Net amount (excl. {taxName})</dt>
                <dd className="font-bold text-white">{fmt.format(result.net)}</dd>
              </div>
              <div className="flex justify-between text-slate-300">
                <dt>
                  {taxName} ({rateInput}%)
                </dt>
                <dd className="font-bold text-sky-400">{fmt.format(result.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 text-lg">
                <dt className="font-bold text-white">Gross amount (incl. {taxName})</dt>
                <dd className="font-black text-white">{fmt.format(result.gross)}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-amber-300">Enter a valid amount and rate to see the result.</p>
          )}
        </div>
      </div>
    </div>
  );
}