Chart.defaults.color = '#94a3b8';
        Chart.defaults.borderColor = '#1e293b';
        Chart.defaults.font.family = "'Space Grotesk', sans-serif";

        var accent = '#00ff88';
        var palette = {
            categories: ['#00ff88', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#3b82f6'],
            ranges: ['#00ff88', '#06b6d4', '#f59e0b', '#ec4899'],
            maturity: ['#00ff88', '#06b6d4', '#f59e0b', '#ec4899']
        };

        new Chart(document.getElementById('chart-categories'), {
            type: 'doughnut',
            data: {
                labels: ['SIEM / Monitoramento', 'IDS / Rede', 'Pentest / Red Team', 'Forense / IR', 'Vulnerabilidades', 'Malware / Senhas'],
                datasets: [{
                    data: [5, 4, 5, 5, 3, 3],
                    backgroundColor: palette.categories,
                    borderWidth: 2,
                    borderColor: '#0a0e17'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });

        new Chart(document.getElementById('chart-category-avg'), {
            type: 'bar',
            data: {
                labels: ['IDS/Rede', 'Pentest', 'SIEM', 'Malware', 'Vuln', 'Forense'],
                datasets: [{
                    label: 'Adoção de mercado (%)',
                    data: [92, 87, 85, 93, 88, 84],
                    backgroundColor: ['#00ff88', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#3b82f6'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { max: 100, grid: { color: '#1e293b' } },
                    y: { grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });

        var barColors = ['#00ff88','#06b6d4','#8b5cf6','#f59e0b','#ec4899','#3b82f6','#00ff88','#06b6d4','#8b5cf6','#f59e0b','#ec4899','#3b82f6','#00ff88','#06b6d4','#8b5cf6'];
        new Chart(document.getElementById('chart-top-tools'), {
            type: 'bar',
            data: {
                labels: ['Wireshark', 'Nmap', 'Suricata', 'Metasploit', 'Volatility', 'OWASP ZAP', 'Wazuh', 'Hashcat', 'Ghidra', 'Graylog', 'Snort', 'Trivy', 'MISP', 'John', 'Zeek'],
                datasets: [{
                    label: 'Adoção de mercado (%)',
                    data: [98, 98, 92, 97, 92, 95, 95, 95, 95, 90, 90, 90, 90, 90, 88],
                    backgroundColor: barColors,
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: { max: 100, grid: { color: '#1e293b' } },
                    y: { grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });

        new Chart(document.getElementById('chart-ranges'), {
            type: 'doughnut',
            data: {
                labels: ['90–100% (Alta)', '80–89% (Média-alta)', '70–79% (Média)', '60–69% (Em crescimento)'],
                datasets: [{
                    data: [14, 9, 4, 1],
                    backgroundColor: palette.ranges,
                    borderWidth: 2,
                    borderColor: '#0a0e17'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });

        new Chart(document.getElementById('chart-maturity'), {
            type: 'polarArea',
            data: {
                labels: ['Muito alta (≥90%)', 'Alta (80-89%)', 'Média (70-79%)', 'Em adoção de mercado (<70%)'],
                datasets: [{
                    data: [14, 9, 4, 1],
                    backgroundColor: ['rgba(0, 255, 136, 0.7)', 'rgba(6, 182, 212, 0.7)', 'rgba(245, 158, 11, 0.7)', 'rgba(236, 72, 153, 0.7)'],
                    borderWidth: 2,
                    borderColor: ['#00ff88', '#06b6d4', '#f59e0b', '#ec4899']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });

(function() {
            var banner = document.getElementById('cookie-consent');
            var btn = document.getElementById('btn-aceitar-cookies');
            if (localStorage.getItem('sentinela-cookies-aceitos') === '1') { if (banner) banner.classList.add('hidden'); }
            if (btn) btn.addEventListener('click', function() { localStorage.setItem('sentinela-cookies-aceitos', '1'); if (banner) banner.classList.add('hidden'); });
        })();
