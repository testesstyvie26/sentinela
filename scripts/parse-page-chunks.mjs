import fs from 'fs';
const h = fs.readFileSync(new URL('./pg.html', import.meta.url), 'utf8');
const re = /\/_next\/static\/chunks\/pages\/[^"']+\.js/g;
const found = [...h.matchAll(re)].map((m) => m[0]);
console.log([...new Set(found)].join('\n'));
