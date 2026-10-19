// app/tools/redirect-map-generator/redirect-engine.ts
// Pure logic (no React): parse a redirect list, clean it, and build config for each platform.

export type Format = 'nextjs' | 'vercel' | 'nginx' | 'apache' | 'netlify';

export const FORMAT_ORDER: Format[] = ['nextjs', 'vercel', 'nginx', 'apache', 'netlify'];

export const FORMATS: Record<Format, { label: string; filename: string; hint: string }> = {
  nextjs: {
    label: 'Next.js',
    filename: 'next.config.redirects.js',
    hint: 'Merge the redirects() function into your existing next.config.js, then restart the server.',
  },
  vercel: {
    label: 'Vercel',
    filename: 'vercel.json',
    hint: 'Save as vercel.json in your project root (merge the redirects array if you already have one).',
  },
  nginx: {
    label: 'Nginx',
    filename: 'redirects.nginx.conf',
    hint: 'Put the map blocks in your http {} context and the if lines in your server {} block. Then run nginx -t and reload.',
  },
  apache: {
    label: 'Apache',
    filename: '.htaccess',
    hint: 'Add to the .htaccess file in your site root. Needs mod_alias and mod_rewrite.',
  },
  netlify: {
    label: 'Netlify / Cloudflare Pages',
    filename: '_redirects',
    hint: 'Save as _redirects in your publish directory.',
  },
};

export const SAMPLE = `old,new,status
/about-us.html,/about
/blog/2019/seo-tips/,/blog/seo-tips
https://example.com/services.php,https://example.com/services
/shop?id=42,/products/blue-widget
/shop/old-widget,/products/widget
/products/widget,/shop/widget
/temp-sale,/sale,302
/loop-a,/loop-b
/loop-b,/loop-a
/about-us.html,/about-company
/home,/home`;

export type Row = {
  key: string; // path (+ ?query) used for matching
  path: string;
  query: string;
  dest: string;
  status: number;
};

export type Stats = {
  input: number;
  output: number;
  duplicates: number;
  selfRedirects: number;
  chains: number;
  loops: number;
  invalid: number;
};

export type Analysis = { rows: Row[]; stats: Stats; issues: string[] };

export type Options = {
  defaultStatus: number;
  flatten: boolean;
  trimSlash: boolean;
  domain: string;
};

/* ------------------------------ parsing ------------------------------ */

function splitDelimited(line: string, d: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else quoted = false;
      } else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === d) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

export function parseTable(text: string): string[][] {
  const lines = text
    .replace(/\r/g, '')
    .split('\n')
    .filter((l) => l.trim() !== '' && !l.trim().startsWith('#'));
  if (!lines.length) return [];
  const first = lines[0];
  const delim = first.includes('\t') ? '\t' : first.includes(',') ? ',' : first.includes(';') ? ';' : null;
  return lines.map((l) => (delim ? splitDelimited(l, delim) : l.trim().split(/\s+/)));
}

function isHeader(cells: string[]) {
  return /^(old|source|from|legacy|origin)/i.test(cells[0] ?? '') && /^(new|dest|target|to|redirect)/i.test(cells[1] ?? '');
}

const normHost = (h: string) => h.toLowerCase().replace(/^www\./, '');

type Parsed = { host: string; path: string; query: string; abs: string };

function parseUrl(raw: string): Parsed | null {
  let s = raw.trim();
  if (!s) return null;
  if (/^(https?:)?\/\//i.test(s)) {
    try {
      const u = new URL(s.startsWith('//') ? `https:${s}` : s);
      return {
        host: normHost(u.host),
        path: u.pathname || '/',
        query: u.search.replace(/^\?/, ''),
        abs: `${u.protocol}//${u.host}${u.pathname}${u.search}`,
      };
    } catch {
      return null;
    }
  }
  s = s.split('#')[0]; // servers never receive fragments
  const qi = s.indexOf('?');
  let path = qi >= 0 ? s.slice(0, qi) : s;
  const query = qi >= 0 ? s.slice(qi + 1) : '';
  if (!path.startsWith('/')) path = `/${path}`;
  return { host: '', path, query, abs: '' };
}

const isExternal = (d: string) => /^https?:\/\//i.test(d);
const stripQuery = (d: string) => d.split('?')[0];

/* ----------------------------- analysis ----------------------------- */

export function analyze(text: string, o: Options): Analysis {
  const stats: Stats = { input: 0, output: 0, duplicates: 0, selfRedirects: 0, chains: 0, loops: 0, invalid: 0 };
  const issues: string[] = [];
  const note = (m: string) => {
    if (issues.length < 10) issues.push(m);
  };

  let data = parseTable(text);
  if (data.length && isHeader(data[0])) data = data.slice(1);

  const site = o.domain ? normHost(o.domain.replace(/^https?:\/\//i, '').split('/')[0]) : '';
  const trim = (p: string) => (o.trimSlash && p.length > 1 ? p.replace(/\/+$/, '') || '/' : p);
  const normDest = (d: string) => {
    if (isExternal(d)) return d;
    const [p, ...q] = d.split('?');
    return q.length ? `${trim(p)}?${q.join('?')}` : trim(p);
  };

  const map = new Map<string, Row>();

  data.forEach((cells, idx) => {
    const n = idx + 1;
    stats.input++;
    const src = cells[0] ? parseUrl(cells[0]) : null;
    const dst = cells[1] ? parseUrl(cells[1]) : null;
    if (!src || !dst) {
      stats.invalid++;
      note(`Row ${n}: needs both an old and a new URL.`);
      return;
    }
    const path = trim(src.path);
    const query = src.query;
    const ref = src.host || site;
    const external = !!dst.host && dst.host !== ref;
    const dest = external ? dst.abs : dst.path + (dst.query ? `?${dst.query}` : '');
    const status = /^30[1278]$/.test(cells[2] ?? '') ? Number(cells[2]) : o.defaultStatus;
    const key = query ? `${path}?${query}` : path;

    if (key === normDest(dest)) {
      stats.selfRedirects++;
      note(`Row ${n}: ${key} redirects to itself and was removed.`);
      return;
    }
    if (map.has(key)) {
      stats.duplicates++;
      note(`Row ${n}: duplicate source ${key}. The first entry was kept.`);
      return;
    }
    map.set(key, { key, path, query, dest, status });
  });

  const out: Row[] = [];
  map.forEach((row) => {
    let dest = row.dest;
    const seen = new Set<string>([row.key]);
    let hops = 0;
    let loop = false;
    while (!isExternal(dest)) {
      const nd = normDest(dest);
      const next = map.get(nd) ?? map.get(stripQuery(nd));
      if (!next) break;
      if (seen.has(next.key)) {
        loop = true;
        break;
      }
      seen.add(next.key);
      dest = next.dest;
      hops++;
      if (hops > 25) {
        loop = true;
        break;
      }
    }
    if (loop) {
      stats.loops++;
      note(`Redirect loop involving ${row.key}. It was removed.`);
      return;
    }
    if (hops > 0) {
      stats.chains++;
      note(`${row.key} chains through ${hops} other redirect${hops > 1 ? 's' : ''}${o.flatten ? ' and now points straight to ' + dest : ''}.`);
      out.push(o.flatten ? { ...row, dest } : row);
      return;
    }
    out.push(row);
  });

  stats.output = out.length;
  return { rows: out, stats, issues };
}

/* ------------------------------ builders ------------------------------ */

type Route = {
  source: string;
  destination: string;
  statusCode: number;
  has?: { type: 'query'; key: string; value?: string }[];
};

const escapeP2R = (s: string) => s.replace(/[:()*+?{}]/g, '\\$&');
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const safeDecode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
const quote = (s: string) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
// Apache keeps regex backslashes as-is inside double quotes, so only escape the quote character
const apacheQuote = (s: string) => `"${s.replace(/"/g, '\\"')}"`;

function nextRoutes(rows: Row[]): Route[] {
  return rows.map((r) => {
    const route: Route = { source: escapeP2R(r.path), destination: r.dest, statusCode: r.status };
    if (r.query) {
      route.has = Array.from(new URLSearchParams(r.query).entries()).map(([key, value]) =>
        value ? { type: 'query' as const, key, value } : { type: 'query' as const, key }
      );
    }
    return route;
  });
}

function nextjs(rows: Row[]) {
  const body = JSON.stringify(nextRoutes(rows), null, 2).replace(/^/gm, '    ').trimStart();
  return `// ${rows.length} redirects. Merge into your next.config.js and restart the dev server.

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return ${body};
  },
};

module.exports = nextConfig;
`;
}

function vercel(rows: Row[]) {
  return JSON.stringify({ redirects: nextRoutes(rows) }, null, 2) + '\n';
}

function nginx(rows: Row[]) {
  const groups = new Map<string, Row[]>();
  rows.forEach((r) => {
    const k = `${r.query ? 'q' : 'p'}_${r.status}`;
    const g = groups.get(k);
    if (g) g.push(r);
    else groups.set(k, [r]);
  });

  const maps: string[] = [];
  const ifs: string[] = [];
  Array.from(groups.keys())
    .sort((a, b) => b.localeCompare(a)) // query-specific maps first
    .forEach((k) => {
      const list = groups.get(k) as Row[];
      const [kind, status] = k.split('_');
      const v = `$redir_${k}`;
      const src = kind === 'q' ? '$request_uri' : '$uri';
      const lines = list.map((r) => `    ${quote(kind === 'q' ? r.key : safeDecode(r.path))} ${quote(r.dest)};`);
      maps.push(`map ${src} ${v} {\n    default "";\n${lines.join('\n')}\n}`);
      ifs.push(`if (${v}) { return ${status} ${v}; }`);
    });

  const big = rows.length > 500 ? 'map_hash_max_size 8192;\nmap_hash_bucket_size 128;\n\n' : '';
  return `# ${rows.length} redirects

# 1) Put this in the http { } context (for example /etc/nginx/conf.d/redirects.conf)
${big}${maps.join('\n\n')}

# 2) Put this inside your server { } block
${ifs.join('\n')}
`;
}

function apache(rows: Row[]) {
  const plain = rows.filter((r) => !r.query);
  const withQuery = rows.filter((r) => r.query);
  const out: string[] = [`# ${rows.length} redirects`];

  plain.forEach((r) => {
    const pattern = r.path === '/' ? '^/$' : `^${escapeRe(safeDecode(r.path))}/?$`;
    out.push(`RedirectMatch ${r.status} ${apacheQuote(pattern)} ${apacheQuote(r.dest)}`);
  });

  if (withQuery.length) {
    out.push('', 'RewriteEngine On');
    withQuery.forEach((r) => {
      const pattern = `^${escapeRe(safeDecode(r.path).replace(/^\//, ''))}/?$`;
      out.push(`RewriteCond %{QUERY_STRING} ^${escapeRe(r.query)}$`);
      out.push(`RewriteRule ${pattern} ${r.dest}${r.dest.includes('?') ? '' : '?'} [R=${r.status},L]`);
    });
  }
  return out.join('\n') + '\n';
}

function netlify(rows: Row[]) {
  const lines = rows.map(
    (r) => `${r.path}${r.query ? ' ' + r.query.split('&').join(' ') : ''}  ${r.dest}  ${r.status}`
  );
  return `# ${rows.length} redirects\n${lines.join('\n')}\n`;
}

export function build(format: Format, rows: Row[]): string {
  if (!rows.length) return '';
  switch (format) {
    case 'nextjs':
      return nextjs(rows);
    case 'vercel':
      return vercel(rows);
    case 'nginx':
      return nginx(rows);
    case 'apache':
      return apache(rows);
    case 'netlify':
      return netlify(rows);
  }
}

export function toCsv(rows: Row[]): string {
  const cell = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
  return ['old,new,status', ...rows.map((r) => `${cell(r.key)},${cell(r.dest)},${r.status}`)].join('\n') + '\n';
}
