(function() {
            Chart.defaults.color = '#94a3b8';
            Chart.defaults.borderColor = '#1e293b';
            Chart.defaults.font.family = "'Space Grotesk', sans-serif";
            var ctx = document.getElementById('chart-salarios');
            if (!ctx) return;
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Analista de Vuln.', 'Analista SOC', 'Pentester', 'Eng. Seg. Cloud', 'DevSecOps', 'Analista Seg. Info', 'Arquiteto Seg.', 'DFIR / Forense', 'DPO', 'Threat Intel', 'AppSec', 'Coord./Gerente'],
                    datasets: [
                        { label: 'Junior', data: [8500, 8500, 14000, 10600, 16300, 8500, null, 9400, null, 9400, 10500, null], backgroundColor: 'rgba(0, 255, 136, 0.6)', borderColor: '#00ff88', borderWidth: 1, borderRadius: 4 },
                        { label: 'Pleno', data: [11700, 11700, 16100, 15500, 21100, 11700, 18800, 13600, 12500, 13600, 15700, null], backgroundColor: 'rgba(34, 211, 238, 0.6)', borderColor: '#22d3ee', borderWidth: 1, borderRadius: 4 },
                        { label: 'Senior', data: [15400, 15400, 19100, 20000, 27400, 15400, 27200, 18800, 18800, 17800, 21900, 21900], backgroundColor: 'rgba(167, 139, 250, 0.6)', borderColor: '#a78bfa', borderWidth: 1, borderRadius: 4 },
                        { label: 'Especialista', data: [21700, 21700, 24000, 25900, 33400, 21700, 33400, 25100, 25100, 23000, 29300, 30300], backgroundColor: 'rgba(251, 191, 36, 0.6)', borderColor: '#fbbf24', borderWidth: 1, borderRadius: 4 },
                        { label: 'Executivo', data: [30200, 30200, 32400, 38900, 43900, 30200, 47000, 36600, 33400, 31400, 39700, 38700], backgroundColor: 'rgba(244, 114, 182, 0.6)', borderColor: '#f472b6', borderWidth: 1, borderRadius: 4 }
                    ]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { left: 140, right: 20 }
                    },
                    scales: {
                        y: {
                            grid: { display: false },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 0,
                                padding: 6,
                                font: { size: 12 }
                            }
                        },
                        x: {
                            min: 0,
                            max: 50000,
                            grid: { color: '#1e293b' },
                            ticks: {
                                callback: function(v) { return 'R$ ' + (v/1000) + 'k'; },
                                maxTicksLimit: 10
                            }
                        },
                    },
                    plugins: {
                        legend: { position: 'top', labels: { usePointStyle: true, padding: 12, boxWidth: 12 } },
                        tooltip: {
                            callbacks: {
                                title: function(items) {
                                    var full = ['Analista de Vulnerabilidades', 'Analista SOC', 'Pentester', 'Eng. Segurança Cloud', 'DevSecOps', 'Analista de Segurança da Informação', 'Arquiteto de Segurança', 'Analista DFIR / Forense', 'DPO', 'Analista de Threat Intelligence', 'Engenheiro de Segurança de Aplicações', 'Coordenador / Gerente de Segurança'];
                                    return full[items[0].dataIndex] || items[0].label;
                                },
                                label: function(ctx) { if (ctx.raw == null) return null; return ctx.dataset.label + ': R$ ' + ctx.raw.toLocaleString('pt-BR') + '/mês'; }
                            }
                        }
                    }
                }
            });
        })();
        (function() {
            var ctx = document.getElementById('chart-tendencia');
            if (!ctx) return;
            var years = ['2023', '2024', '2025', '2026', '2027', '2028'];
            var colors = ['#00ff88', '#22d3ee', '#a78bfa', '#fbbf24', '#f472b6'];
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'DevSecOps', data: [82, 92, 98, 105, 112, 119], borderColor: '#00ff88', backgroundColor: 'rgba(0,255,136,0.1)', tension: 0.3, fill: true },
                        { label: 'Eng. Seg. Cloud', data: [75, 88, 96, 104, 110, 117], borderColor: '#22d3ee', backgroundColor: 'rgba(34,211,238,0.08)', tension: 0.3, fill: true },
                        { label: 'Analista SOC', data: [85, 90, 95, 100, 105, 112], borderColor: '#a78bfa', backgroundColor: 'rgba(167,139,250,0.08)', tension: 0.3, fill: true },
                        { label: 'Pentester', data: [78, 86, 93, 98, 103, 109], borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)', tension: 0.3, fill: true },
                        { label: 'Analista de Vuln.', data: [80, 88, 96, 102, 108, 115], borderColor: '#f472b6', backgroundColor: 'rgba(244,114,182,0.08)', tension: 0.3, fill: true },
                        { label: 'Analista Seg. da Info', data: [82, 88, 94, 100, 106, 113], borderColor: '#34d399', backgroundColor: 'rgba(52,211,153,0.08)', tension: 0.3, fill: true },
                        { label: 'Arquiteto Seg.', data: [74, 82, 90, 98, 106, 114], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.08)', tension: 0.3, fill: true },
                        { label: 'DFIR / AppSec', data: [80, 88, 95, 102, 109, 116], borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.08)', tension: 0.3, fill: true }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } }
                    },
                    scales: {
                        x: {
                            grid: { color: '#1e293b' },
                            ticks: { font: { size: 11 } }
                        },
                        y: {
                            min: 60,
                            max: 120,
                            grid: { color: '#1e293b' },
                            ticks: {
                                callback: function(v) { return v; },
                                font: { size: 11 }
                            }
                        }
                    }
                }
            });
        })();

(function() {
            var GUPY_SEARCH_BASE = 'https://portal.gupy.io/job-search/term=seguran%C3%A7a%20da%20informa%C3%A7%C3%A3o';
            var statusEl = document.getElementById('gupy-si-status');
            var tiersEl = document.getElementById('gupy-si-tiers');
            var countEl = document.getElementById('gupy-si-count');
            if (!statusEl || !tiersEl) return;

            function stripOneImage(s) {
                if (!s.startsWith('![')) return s;
                var m = s.match(/^!\[[^\]]*\]\([^)]*\)/);
                if (!m) return s;
                return s.slice(m[0].length).trim();
            }

            function stripLeadingNoise(s) {
                s = s.replace(/^\*\s+/, '').trim();
                var prev;
                do {
                    prev = s;
                    if (s.startsWith('[![')) s = s.slice(1).trim();
                    s = stripOneImage(s);
                } while (s !== prev);
                return s;
            }

            function companyFromJobUrl(url) {
                try {
                    var h = new URL(url).hostname.split('.')[0];
                    if (!h || h === 'www') return null;
                    return h.charAt(0).toUpperCase() + h.slice(1);
                } catch (e) { return null; }
            }

            function parseJobLine(line) {
                var urlMatch = line.match(/\]\((https:\/\/[a-z0-9.-]+\.gupy\.io\/job\/[^)]+)\)\s*$/);
                if (!urlMatch) return null;
                var url = urlMatch[1];
                var closeIdx = line.lastIndexOf('](' + url + ')');
                if (closeIdx < 0) return null;
                var before = line.slice(0, closeIdx);
                var inner = stripLeadingNoise(before);
                var parts = inner.split(' ### ');
                if (parts.length < 2) return null;
                var company = parts[0].replace(/\s+/g, ' ').trim();
                if (/^quem\s+somos$/i.test(company)) {
                    var sub = companyFromJobUrl(url);
                    if (sub) company = sub;
                }
                var rest = parts.slice(1).join(' ### ');
                var title = rest.split(' Published on:')[0].split(' * * *')[0].replace(/\s+/g, ' ').trim();
                return { company: company || '—', title: title || 'Vaga', url: url };
            }

            function classifySeniority(title) {
                var t = (title || '').toLowerCase();
                t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (/\b(gerente|coordenador|coordenadora|diretor|diretora|superintendente|vice-?presidente|\bvp\b|head\b|chief\b|ciso\b|lideranca|lider\b|lead\b)\b/.test(t)) return 'lideranca';
                if (/\b(especialista|arquiteto|arquiteta)\b/.test(t)) return 'especialista';
                if (/\b(senior|pleno\/senior|sr\.|\bsr\b|\biii\b|nivel\s+iii)\b/.test(t)) return 'senior';
                if (/\b(pleno|nivel\s+ii|\bii\b|mid\b)\b/.test(t)) return 'pleno';
                if (/\b(junior|estagio|estagiario|trainee|aprendiz|jnr\b|nivel\s+i\b|\bi\b)\b/.test(t)) return 'junior';
                return 'outros';
            }

            var tierOrder = [
                { id: 'lideranca', label: 'Liderança', className: 'tier-lideranca' },
                { id: 'especialista', label: 'Especialista / Arquiteto', className: 'tier-especialista' },
                { id: 'senior', label: 'Sênior / Sr.', className: 'tier-senior' },
                { id: 'pleno', label: 'Pleno', className: 'tier-pleno' },
                { id: 'junior', label: 'Júnior / Estágio', className: 'tier-junior' },
                { id: 'outros', label: 'Não classificado', className: 'tier-outros' }
            ];

            function render(jobs) {
                var byTier = {};
                tierOrder.forEach(function(t) { byTier[t.id] = []; });
                jobs.forEach(function(j) {
                    var k = classifySeniority(j.title);
                    if (!byTier[k]) k = 'outros';
                    byTier[k].push(j);
                });
                if (countEl) countEl.textContent = jobs.length ? '· ' + jobs.length + ' vagas' : '';
                var html = '';
                tierOrder.forEach(function(t) {
                    var list = byTier[t.id];
                    if (!list.length) return;
                    html += '<div class="gupy-tier ' + t.className + '"><h4>' + t.label + ' (' + list.length + ')</h4>';
                    list.forEach(function(j) {
                        var href = safeGupyJobHref(j.url);
                        var hrefAttr = href ? href.replace(/"/g, '&quot;') : '#';
                        html += '<div class="gupy-vaga"><a href="' + hrefAttr + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(j.title) + '</a>';
                        html += '<div class="emp">' + escapeHtml(j.company) + '</div></div>';
                    });
                    html += '</div>';
                });
                tiersEl.innerHTML = html || '<p class="gupy-status">Nenhuma vaga encontrada no formato esperado.</p>';
            }

            function escapeHtml(s) {
                var d = document.createElement('div');
                d.textContent = s;
                return d.innerHTML;
            }

            function safeGupyJobHref(u) {
                try {
                    var url = new URL(u);
                    if (url.protocol !== 'https:') return '';
                    var h = url.hostname.toLowerCase();
                    if (!h.endsWith('.gupy.io')) return '';
                    return url.href;
                } catch (e) {
                    return '';
                }
            }

            function parseTextToJobs(text) {
                var lines = text.split(/\r?\n/);
                var out = [];
                var seen = {};
                lines.forEach(function(line) {
                    var j = parseJobLine(line);
                    if (j && !seen[j.url]) { seen[j.url] = true; out.push(j); }
                });
                return out;
            }

            function jinaUrlForPage(page) {
                return 'https://r.jina.ai/' + encodeURIComponent(GUPY_SEARCH_BASE + '?page=' + page);
            }

            function fetchText(url) {
                return fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' }).then(function(res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.text();
                });
            }

            function fetchViaCodetabs(url) {
                return fetch('https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url), {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit'
                }).then(function(res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.text();
                });
            }

            function fetchJinaMarkdown(url) {
                return fetchText(url).catch(function() {
                    return fetchViaCodetabs(url);
                });
            }

            function delay(ms) {
                return new Promise(function(resolve) { setTimeout(resolve, ms); });
            }

            statusEl.textContent = 'Carregando vagas no Portal Gupy…';
            (async function() {
                var seen = {};
                var jobs = [];
                var page = 1;
                var maxPages = 250;
                try {
                    while (page <= maxPages) {
                        statusEl.textContent = 'Carregando vagas (página ' + page + ')…';
                        var text = await fetchJinaMarkdown(jinaUrlForPage(page));
                        var pageJobs = parseTextToJobs(text);
                        if (pageJobs.length === 0) break;
                        pageJobs.forEach(function(j) {
                            if (!seen[j.url]) { seen[j.url] = true; jobs.push(j); }
                        });
                        page += 1;
                        await delay(350);
                    }
                    statusEl.textContent = '';
                    statusEl.classList.remove('error');
                    if (!jobs.length) {
                        statusEl.textContent = 'Não foi possível extrair a lista (formato do portal alterado ou bloqueio de rede). Use o link do Portal Gupy acima.';
                        statusEl.classList.add('error');
                    }
                    render(jobs);
                } catch (_err) {
                    statusEl.innerHTML = 'Não foi possível carregar as vagas (rede ou bloqueio). ' +
                        'Se estiver abrindo o HTML pelo disco (<code>file://</code>), sirva a pasta com um servidor local (ex.: <code>npx serve</code>) ou use a página publicada. ' +
                        'Sempre é possível abrir a <a href="https://portal.gupy.io/job-search/term=seguran%C3%A7a%20da%20informa%C3%A7%C3%A3o" target="_blank" rel="noopener noreferrer">busca no Portal Gupy</a>.';
                    statusEl.classList.add('error');
                    if (countEl) countEl.textContent = '';
                    tiersEl.innerHTML = '';
                }
            })();
        })();

(function() {
            var banner = document.getElementById('cookie-consent');
            var btn = document.getElementById('btn-aceitar-cookies');
            if (localStorage.getItem('sentinela-cookies-aceitos') === '1') { if (banner) banner.classList.add('hidden'); }
            if (btn) btn.addEventListener('click', function() { localStorage.setItem('sentinela-cookies-aceitos', '1'); if (banner) banner.classList.add('hidden'); });
        })();

(function() {
            var navAnchors = document.querySelector('.nav-anchors');
            var btnTop = document.getElementById('btn-topo');
            if (!navAnchors) return;
            var links = navAnchors.querySelectorAll('a[href^="#"]');
            var sections = [];
            for (var i = 0; i < links.length; i++) {
                var href = links[i].getAttribute('href');
                if (!href || href.charAt(0) !== '#') continue;
                var el = document.getElementById(href.slice(1));
                if (el) sections.push({ id: href.slice(1), el: el });
            }
            var threshold = 130;
            function onScroll() {
                var y = window.scrollY || document.documentElement.scrollTop;
                if (btnTop) {
                    if (y > 400) btnTop.classList.add('visible');
                    else btnTop.classList.remove('visible');
                }
                var active = null;
                for (var j = sections.length - 1; j >= 0; j--) {
                    if (sections[j].el.getBoundingClientRect().top <= threshold) {
                        active = sections[j].id;
                        break;
                    }
                }
                if (!active && sections.length) active = sections[0].id;
                for (var k = 0; k < links.length; k++) {
                    var a = links[k];
                    var h = a.getAttribute('href');
                    if (!h || h.indexOf('#') !== 0) continue;
                    if (h === '#' + active) {
                        a.classList.add('active');
                        a.setAttribute('aria-current', 'location');
                    } else {
                        a.classList.remove('active');
                        a.removeAttribute('aria-current');
                    }
                }
            }
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
            if (btnTop) {
                btnTop.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        })();

(function() {
            function initCertMenuPager(cfg) {
                var ul = document.getElementById(cfg.menuId);
                var numsEl = document.getElementById(cfg.numsId);
                var prevBtn = document.getElementById(cfg.prevId);
                var nextBtn = document.getElementById(cfg.nextId);
                if (!ul || !numsEl || !prevBtn || !nextBtn) return;
                var items = ul.querySelectorAll('li');
                var pageSize = cfg.pageSize || 8;
                var current = 0;
                var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
                var numBtns = [];
                var pager = document.getElementById(cfg.pagerId);
                if (totalPages <= 1 && pager) pager.style.display = 'none';

                function render() {
                    var start = current * pageSize;
                    for (var i = 0; i < items.length; i++) {
                        items[i].hidden = i < start || i >= start + pageSize;
                    }
                    prevBtn.disabled = current <= 0;
                    nextBtn.disabled = current >= totalPages - 1;
                    for (var p = 0; p < numBtns.length; p++) {
                        var on = p === current;
                        numBtns[p].classList.toggle('is-active', on);
                        numBtns[p].setAttribute('aria-current', on ? 'true' : 'false');
                    }
                }

                for (var p = 0; p < totalPages; p++) {
                    (function(page) {
                        var b = document.createElement('button');
                        b.type = 'button';
                        b.className = 'list-pager-num' + (page === 0 ? ' is-active' : '');
                        b.textContent = String(page + 1);
                        b.setAttribute('aria-label', 'Ir para página ' + (page + 1));
                        b.setAttribute('aria-current', page === 0 ? 'true' : 'false');
                        b.addEventListener('click', function() {
                            current = page;
                            render();
                        });
                        numsEl.appendChild(b);
                        numBtns.push(b);
                    })(p);
                }

                prevBtn.addEventListener('click', function() {
                    if (current > 0) { current--; render(); }
                });
                nextBtn.addEventListener('click', function() {
                    if (current < totalPages - 1) { current++; render(); }
                });
                render();
            }

            initCertMenuPager({
                menuId: 'empresas-menu',
                pagerId: 'empresas-pager',
                prevId: 'empresas-prev',
                nextId: 'empresas-next',
                numsId: 'empresas-page-nums',
                pageSize: 8
            });
            initCertMenuPager({
                menuId: 'portais-menu',
                pagerId: 'portais-pager',
                prevId: 'portais-prev',
                nextId: 'portais-next',
                numsId: 'portais-page-nums',
                pageSize: 8
            });
        })();
