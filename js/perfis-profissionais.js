(function() {
            var banner = document.getElementById('cookie-consent');
            var btn = document.getElementById('btn-aceitar-cookies');
            if (localStorage.getItem('sentinela-cookies-aceitos') === '1') { if (banner) banner.classList.add('hidden'); }
            if (btn) btn.addEventListener('click', function() { localStorage.setItem('sentinela-cookies-aceitos', '1'); if (banner) banner.classList.add('hidden'); });
        })();
