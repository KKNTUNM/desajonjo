// Data Desa Charts - Enhanced with accessibility and error handling

// Function to initialize all charts
function initDataDesaCharts() {
    try {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js library not loaded');
        }
        
        // Initialize all charts
        initPopulationPyramid();
        initDusunDistribution();
        initEducationChart();
        
        // Add resize event listener for responsiveness
        window.addEventListener('resize', debounce(function() {
            resizeCharts();
        }, 250));
        
        console.log('Data Desa charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
        displayChartError(error.message);
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Initialize Population Pyramid Chart
function initPopulationPyramid() {
    const ctx = document.getElementById('populationPyramid');
    if (!ctx) return;
    
    const ageGroups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70+'];
    const malePopulation = [-180, -192, -205, -210, -208, -195, -182, -165, -150, -135, -120, -95, -75, -50, -40];
    const femalePopulation = [175, 188, 200, 205, 202, 190, 178, 160, 145, 130, 115, 90, 70, 45, 35];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: [
                {
                    label: 'Laki-laki',
                    data: malePopulation,
                    backgroundColor: 'rgba(78, 115, 223, 0.7)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Perempuan',
                    data: femalePopulation,
                    backgroundColor: 'rgba(220, 118, 139, 0.7)',
                    borderColor: 'rgba(220, 118, 139, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Jumlah Penduduk'
                    },
                    ticks: {
                        callback: function(value) {
                            return Math.abs(value);
                        }
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Kelompok Umur'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Piramida Penduduk Desa Jonjo'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += Math.abs(context.raw);
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize Dusun Distribution Chart
function initDusunDistribution() {
    const ctx = document.getElementById('dusunDistribution');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dusun Krajan', 'Dusun Sumber', 'Dusun Krajan Barat', 'Dusun Krajan Timur'],
            datasets: [{
                data: [1250, 980, 872, 740],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.8)',
                    'rgba(28, 200, 138, 0.8)',
                    'rgba(54, 185, 204, 0.8)',
                    'rgba(246, 194, 62, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 115, 223, 1)',
                    'rgba(28, 200, 138, 1)',
                    'rgba(54, 185, 204, 1)',
                    'rgba(246, 194, 62, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} jiwa (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Initialize Education Chart
function initEducationChart() {
    const ctx = document.getElementById('educationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tidak/Belum Sekolah', 'Tamat SD/Sederajat', 'SLTP/Sederajat', 'SLTA/Sederajat', 'Diploma I/II', 'Diploma III/S.Muda', 'Diploma IV/Strata I', 'Strata II', 'Strata III'],
            datasets: [{
                label: 'Jumlah Penduduk',
                data: [320, 850, 980, 1120, 180, 250, 110, 25, 7],
                backgroundColor: 'rgba(78, 115, 223, 0.7)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Penduduk'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tingkat Pendidikan'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Jumlah: ${context.raw} orang`;
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Resize all charts on window resize
function resizeCharts() {
    const charts = [
        Chart.getChart('populationPyramid'),
        Chart.getChart('dusunDistribution'),
        Chart.getChart('educationChart')
    ];
    
    charts.forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}

// Display error message if charts fail to load
function displayChartError(message) {
    const containers = document.querySelectorAll('.datadesa-chart-container');
    containers.forEach(container => {
        container.innerHTML = `
            <div class="chart-error">
                <p>Gagal memuat grafik: ${message}</p>
                <p>Silakan refresh halaman atau coba lagi nanti.</p>
            </div>
        `;
    });
}

// Initialize Pekerjaan Chart
function initPekerjaanChart() {
    const ctx = document.getElementById('pekerjaanChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pertanian', 'Perdagangan', 'Buruh', 'PNS', 'Wiraswasta', 'Lainnya'],
            datasets: [{
                data: [1345, 692, 576, 461, 384, 384],
                backgroundColor: [
                    'rgba(78, 115, 223, 0.8)',
                    'rgba(28, 200, 138, 0.8)',
                    'rgba(54, 185, 204, 0.8)',
                    'rgba(246, 194, 62, 0.8)',
                    'rgba(231, 74, 59, 0.8)',
                    'rgba(111, 66, 193, 0.8)'
                ],
                borderColor: [
                    'rgba(78, 115, 223, 1)',
                    'rgba(28, 200, 138, 1)',
                    'rgba(54, 185, 204, 1)',
                    'rgba(246, 194, 62, 1)',
                    'rgba(231, 74, 59, 1)',
                    'rgba(111, 66, 193, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} orang (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update the initDataDesaCharts function to include pekerjaan chart
function initDataDesaCharts() {
    try {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js library not loaded');
        }
        
        // Initialize all charts
        initPopulationPyramid();
        initDusunDistribution();
        initEducationChart();
        initPekerjaanChart(); // Add this line
        
        // Add resize event listener for responsiveness
        window.addEventListener('resize', debounce(function() {
            resizeCharts();
        }, 250));
        
        // Animate progress bars
        animateProgressBars();
        
        console.log('Data Desa charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
        displayChartError(error.message);
    }
}

// Add pekerjaan chart to resize function
function resizeCharts() {
    const charts = [
        Chart.getChart('populationPyramid'),
        Chart.getChart('dusunDistribution'),
        Chart.getChart('educationChart'),
        Chart.getChart('pekerjaanChart') // Add this line
    ];
    
    charts.forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.pekerjaan-top-progress');
    progressBars.forEach(bar => {
        // Reset width to 0 for animation
        const width = bar.style.width;
        bar.style.width = '0';
        
        // Animate to full width after a short delay
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize charts when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDataDesaCharts);
} else {
    initDataDesaCharts();
}

// Export functions for potential external use
window.DataDesaCharts = {
    init: initDataDesaCharts,
    resize: resizeCharts
};