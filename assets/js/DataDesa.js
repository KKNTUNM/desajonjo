document.addEventListener('DOMContentLoaded', function() {
    // Piramida Penduduk
    const pyramidCtx = document.getElementById('populationPyramid').getContext('2d');
    
    // Data untuk piramida penduduk
    const ageGroups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70+'];
    const malePopulation = [-180, -192, -205, -210, -208, -195, -182, -165, -150, -135, -120, -95, -75, -50, -40];
    const femalePopulation = [175, 188, 200, 205, 202, 190, 178, 160, 145, 130, 115, 90, 70, 45, 35];
    
    new Chart(pyramidCtx, {
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
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Distribusi Dusun
    const dusunCtx = document.getElementById('dusunDistribution').getContext('2d');
    
    new Chart(dusunCtx, {
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
            }
        }
    });

    // Tingkat Pendidikan
    const educationCtx = document.getElementById('educationChart').getContext('2d');
    
    new Chart(educationCtx, {
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
            }
        }
    });
});