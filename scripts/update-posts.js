#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'posts.json');
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
d.lastUpdated = new Date().toISOString();
d.posts.sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
fs.writeFileSync(p, JSON.stringify(d, null, 2), 'utf8');
console.log('Atualizado:', d.lastUpdated);
