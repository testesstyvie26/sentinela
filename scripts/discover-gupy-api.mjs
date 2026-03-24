const base = 'https://portal.gupy.io';
const res = await fetch(`${base}/job-search/term=ciberseguranca`, {
  headers: { 'User-Agent': 'Mozilla/5.0' },
});
const h = await res.text();
const scripts = [...h.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]);
console.log('scripts', scripts.length, scripts.slice(0, 5));
const toFetch = scripts.filter((s) => s.includes('chunk') || s.includes('main-app') || s.includes('page')).slice(0, 15);
for (const src of toFetch) {
  const url = src.startsWith('http') ? src : base + src;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const t = await r.text();
  const hits = t.match(/https?:\\?\/\\?\/[a-zA-Z0-9._/-]+(?:vacanc|job-search|public-jobs)[a-zA-Z0-9._/?=-]*/g);
  if (hits) console.log(url.split('/').pop(), [...new Set(hits)].slice(0, 5));
}
