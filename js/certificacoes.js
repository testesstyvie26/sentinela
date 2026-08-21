(function() {
            const nicheTabs = document.querySelectorAll('.niche-tab');
            const orgTabs = document.querySelectorAll('.org-tab');
            const certItems = document.querySelectorAll('.cert-item');
            const certCategories = document.querySelectorAll('.cert-category[data-category]');
            const emptyState = document.getElementById('empty-state');
            const diagramNodes = document.querySelectorAll('.diagram-node[data-niche]');

            let selectedNiche = 'todos';
            let selectedOrg = 'todos';

            const orgValues = ['microsoft', 'aws', 'gcp', 'exin', 'eccouncil', 'comptia', 'giac', 'isc2', 'isaca'];

            function updateFilter() {
                nicheTabs.forEach(t => {
                    t.classList.toggle('active', t.dataset.niche === selectedNiche);
                });
                orgTabs.forEach(t => {
                    t.classList.toggle('active', t.dataset.niche === selectedOrg);
                });

                const isNicheAll = selectedNiche === 'todos';
                const isOrgAll = selectedOrg === 'todos';
                let visibleCount = 0;

                certItems.forEach(item => {
                    const niches = (item.dataset.niches || '').split(' ').map(n => n.trim()).filter(Boolean);
                    const matchNiche = isNicheAll || niches.includes(selectedNiche);
                    const matchOrg = isOrgAll || (orgValues.includes(selectedOrg) && niches.includes(selectedOrg));
                    const match = matchNiche && matchOrg;
                    item.classList.toggle('visible', match);
                    if (match) visibleCount++;
                });

                certCategories.forEach(cat => {
                    const items = cat.querySelectorAll('.cert-item');
                    const hasVisible = Array.from(items).some(i => i.classList.contains('visible'));
                    cat.classList.toggle('hidden', !hasVisible);
                });

                emptyState.classList.toggle('hidden', visibleCount > 0);

                // Atualizar destaque no diagrama (apenas para nichos de área, não org)
                diagramNodes.forEach(n => {
                    const isAreaNiche = !orgValues.includes(n.dataset.niche);
                    n.classList.toggle('highlight', isAreaNiche && n.dataset.niche === selectedNiche);
                });
            }

            nicheTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    selectedNiche = tab.dataset.niche;
                    updateFilter();
                });
            });

            orgTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    selectedOrg = tab.dataset.niche;
                    updateFilter();
                });
            });

            // Clique no diagrama filtra a lista (apenas nichos de área)
            diagramNodes.forEach(node => {
                node.addEventListener('click', () => {
                    if (!orgValues.includes(node.dataset.niche)) {
                        selectedNiche = node.dataset.niche;
                        updateFilter();
                    }
                });
            });

            // Hover no diagrama: destacar nós relacionados + tooltip com descrição
            var diagramTooltip = document.getElementById('diagram-tooltip');
            var tooltipHideTimer = null;
            diagramNodes.forEach(node => {
                node.addEventListener('mouseenter', function(e) {
                    const niche = this.dataset.niche;
                    diagramNodes.forEach(n => n.classList.toggle('dim', niche !== 'todos' && n.dataset.niche !== niche && n.dataset.niche !== 'todos'));
                    if (diagramTooltip && this.dataset.tooltip) {
                        clearTimeout(tooltipHideTimer);
                        diagramTooltip.textContent = this.dataset.tooltip;
                        diagramTooltip.classList.add('visible');
                        var x = e.clientX + 12, y = e.clientY + 12;
                        if (x + 290 > window.innerWidth) x = e.clientX - 290;
                        if (y + 120 > window.innerHeight) y = e.clientY - 100;
                        diagramTooltip.style.left = x + 'px';
                        diagramTooltip.style.top = y + 'px';
                    }
                });
                node.addEventListener('mousemove', function(e) {
                    if (diagramTooltip && this.dataset.tooltip) {
                        var x = e.clientX + 12, y = e.clientY + 12;
                        if (x + 290 > window.innerWidth) x = e.clientX - 290;
                        if (y + 120 > window.innerHeight) y = e.clientY - 100;
                        diagramTooltip.style.left = x + 'px';
                        diagramTooltip.style.top = y + 'px';
                    }
                });
                node.addEventListener('mouseleave', function() {
                    diagramNodes.forEach(n => n.classList.remove('dim'));
                    if (diagramTooltip) {
                        tooltipHideTimer = setTimeout(function() {
                            diagramTooltip.classList.remove('visible');
                        }, 100);
                    }
                });
            });
            if (diagramTooltip) {
                diagramTooltip.addEventListener('mouseenter', function() { clearTimeout(tooltipHideTimer); });
                diagramTooltip.addEventListener('mouseleave', function() { diagramTooltip.classList.remove('visible'); });
            }

            updateFilter();

            // Zoom e pan do diagrama
            (function() {
                var container = document.querySelector('.diagram-zoom-container');
                var inner = document.getElementById('diagram-zoom-inner');
                var btnIn = document.getElementById('diagram-zoom-in');
                var btnOut = document.getElementById('diagram-zoom-out');
                var btnReset = document.getElementById('diagram-zoom-reset');
                var scale = 1;
                var minScale = 0.6;
                var maxScale = 1.8;
                var step = 0.2;
                var panX = 0, panY = 0;

                function applyTransform() {
                    if (inner) {
                        inner.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + scale + ')';
                    }
                    if (btnOut) btnOut.disabled = scale <= minScale;
                    if (btnIn) btnIn.disabled = scale >= maxScale;
                }

                if (btnIn) btnIn.addEventListener('click', function() {
                    if (scale < maxScale) { scale = Math.min(maxScale, scale + step); applyTransform(); }
                });
                if (btnOut) btnOut.addEventListener('click', function() {
                    if (scale > minScale) { scale = Math.max(minScale, scale - step); applyTransform(); }
                });
                if (btnReset) btnReset.addEventListener('click', function() {
                    scale = 1; panX = 0; panY = 0; applyTransform();
                });
                applyTransform();

                // Arrastar para mover (pan por translate)
                if (container && inner) {
                    var isPanning = false, startX, startY, startPanX, startPanY;
                    container.addEventListener('mousedown', function(e) {
                        if (e.target.closest('.diagram-node') || e.target.closest('.diagram-zoom-controls')) return;
                        isPanning = true;
                        container.classList.add('panning');
                        startX = e.clientX;
                        startY = e.clientY;
                        startPanX = panX;
                        startPanY = panY;
                    });
                    document.addEventListener('mousemove', function(e) {
                        if (!isPanning) return;
                        panX = startPanX + (e.clientX - startX);
                        panY = startPanY + (e.clientY - startY);
                        applyTransform();
                    });
                    document.addEventListener('mouseup', function() {
                        isPanning = false;
                        container.classList.remove('panning');
                    });
                    container.addEventListener('touchstart', function(e) {
                        if (e.target.closest('.diagram-node') || e.target.closest('.diagram-zoom-controls')) return;
                        if (e.touches.length === 1) {
                            isPanning = true;
                            startX = e.touches[0].clientX;
                            startY = e.touches[0].clientY;
                            startPanX = panX;
                            startPanY = panY;
                        }
                    }, { passive: true });
                    container.addEventListener('touchmove', function(e) {
                        if (!isPanning || e.touches.length !== 1) return;
                        e.preventDefault();
                        panX = startPanX + (e.touches[0].clientX - startX);
                        panY = startPanY + (e.touches[0].clientY - startY);
                        applyTransform();
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                        startPanX = panX;
                        startPanY = panY;
                    }, { passive: false });
                    container.addEventListener('touchend', function() { isPanning = false; });
                }
            })();

            // Botão tela cheia
            (function() {
                var btn = document.getElementById('diagram-fullscreen');
                var el = document.getElementById('diagram-fullscreen-container');
                if (!btn || !el) return;
                function updateIcon() {
                    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                    btn.textContent = isFs ? '⊟' : '⛶';
                    btn.classList.toggle('is-fullscreen', isFs);
                    btn.setAttribute('aria-label', isFs ? 'Sair da tela cheia' : 'Tela cheia');
                    btn.setAttribute('title', isFs ? 'Sair da tela cheia (Esc)' : 'Tela cheia');
                }
                btn.addEventListener('click', function() {
                    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                    if (isFs) {
                        (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen).call(document);
                    } else {
                        var req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                        if (req) req.call(el);
                    }
                });
                document.addEventListener('fullscreenchange', updateIcon);
                document.addEventListener('webkitfullscreenchange', updateIcon);
                document.addEventListener('mozfullscreenchange', updateIcon);
                document.addEventListener('MSFullscreenChange', updateIcon);
            })();
        })();

(function() {
            var banner = document.getElementById('cookie-consent');
            var btn = document.getElementById('btn-aceitar-cookies');
            if (localStorage.getItem('sentinela-cookies-aceitos') === '1') { if (banner) banner.classList.add('hidden'); }
            if (btn) btn.addEventListener('click', function() { localStorage.setItem('sentinela-cookies-aceitos', '1'); if (banner) banner.classList.add('hidden'); });
        })();
