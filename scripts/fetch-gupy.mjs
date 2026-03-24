import fs from 'fs';
const url = process.argv[2] || 'https://portal.gupy.io/job-search/term=ciberseguranca';
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Sentinela/1.0)' } });
const h = await res.text();
const m = h.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (!m) {
  console.error('No __NEXT_DATA__', h.length);
  process.exit(1);
}
const j = JSON.parse(m[1]);
const pp = j.props?.pageProps || {};
console.log('pageProps keys:', Object.keys(pp));
// explore
function walk(o, depth = 0) {
  if (depth > 4 || !o) return;
  if (Array.isArray(o) && o.length && typeof o[0] === 'object' && o[0].name) {
    console.log('sample job-like:', JSON.stringify(o[0]).slice(0, 400));
  }
  if (typeof o !== 'object') return;
  for (const k of Object.keys(o)) {
    if (k.toLowerCase().includes('job') || k.toLowerCase().includes('vacanc') || k.toLowerCase().includes('search')) {
      const v = o[k];
      if (Array.isArray(v) && v.length) console.log(k, 'array len', v.length, 'first keys', v[0] && Object.keys(v[0]));
      else if (v && typeof v === 'object') console.log(k, 'obj keys', Object.keys(v));
    }
  }
}
walk(pp);

// find API URLs in page HTML
const apis = new Set();
for (const m of h.matchAll(/https?:\/\/[a-zA-Z0-9._/-]+/g)) {
  const u = m[0];
  if (u.includes('api') && u.includes('gupy')) apis.add(u);
}
console.log('gupy api-like urls in html:', [...apis].slice(0, 20));
