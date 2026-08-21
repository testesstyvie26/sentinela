(function() {
            var form = document.getElementById('form-projeto');
            if (!form) return;
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                var btn = form.querySelector('.btn-inscrever-projeto');
                var prev = form.querySelector('.form-success-msg');
                if (prev) prev.remove();
                var ak = form.querySelector('input[name="access_key"]').value;
                if (!ak || ak === 'REPLACE_WITH_YOUR_ACCESS_KEY') {
                    alert('Configure a chave de acesso: vá em web3forms.com, crie uma chave com contato@vulcandefense.com.br e substitua REPLACE_WITH_YOUR_ACCESS_KEY no código.');
                    return;
                }
                btn.disabled = true;
                btn.textContent = 'Enviando…';
                try {
                    var fd = new FormData(form);
                    var obj = Object.fromEntries(fd.entries());
                    var res = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify(obj)
                    });
                    var data = await res.json();
                    if (data.success) {
                        var msg = document.createElement('p');
                        msg.className = 'form-success-msg';
                            msg.textContent = 'Projeto inscrito! Em breve entraremos em contato.';
                        form.appendChild(msg);
                        form.reset();
                    } else {
                        alert(data.message || 'Erro ao enviar. Tente novamente.');
                    }
                } catch (err) {
                    alert('Erro de conexão. Tente novamente.');
                }
                btn.disabled = false;
                btn.textContent = 'Inscrever meu projeto';
            });
        })();

(function() {
            var banner = document.getElementById('cookie-consent');
            var btn = document.getElementById('btn-aceitar-cookies');
            if (localStorage.getItem('sentinela-cookies-aceitos') === '1') { if (banner) banner.classList.add('hidden'); }
            if (btn) btn.addEventListener('click', function() {
                localStorage.setItem('sentinela-cookies-aceitos', '1');
                if (banner) banner.classList.add('hidden');
            });
        })();
