import fs from 'fs';
const t = fs.readFileSync(new URL('./gupy-main.js', import.meta.url), 'utf8');
const re = /["'](https?:\/\/[^"']+)["']/g;
const set = new Set();
let m;
while ((m = re.exec(t))) {
  const u = m[1];
  if (u.includes('gupy') && (u.includes('api') || u.includes('job') || u.includes('vacanc')))
    set.add(u);
}
console.log([...set].join('\n'));
