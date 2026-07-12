document.addEventListener('DOMContentLoaded', function () {
  const chartCanvas = document.getElementById('adminChart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = {
      grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,81,50,0.06)',
      text: isDark ? 'rgba(255,255,255,0.6)' : '#6C757D'
    };
    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [{
          label: 'Penjualan',
          data: [12, 19, 15, 22, 28, 24, 30, 26, 32, 38, 35, 42],
          borderColor: '#0F5132',
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
            g.addColorStop(0, 'rgba(15,81,50,0.2)');
            g.addColorStop(1, 'rgba(15,81,50,0)');
            return g;
          },
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0F5132',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Poppins', size: 11 } }
          },
          y: {
            grid: { color: colors.grid },
            ticks: { color: colors.text, font: { family: 'Poppins', size: 11 } },
            beginAtZero: true
          }
        },
        interaction: { intersect: false, mode: 'index' }
      }
    });
  }
});
