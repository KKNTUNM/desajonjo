(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});
			
	// Slideshow functions
		let slideIndex = 1;
		let slideInterval;

		function showSlides(n) {
			let i;
			let slides = document.getElementsByClassName("mySlides");
			let dots = document.getElementsByClassName("dot");
			
			// Jika tidak ada slides, keluar
			if (slides.length === 0) return;
			
			// Handle indeks slide
			if (n > slides.length) { slideIndex = 1; }
			if (n < 1) { slideIndex = slides.length; }
			
			// Sembunyikan semua slides
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";  
			}
			
			// Nonaktifkan semua dots
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
			}
			
			// Tampilkan slide aktif
			slides[slideIndex-1].style.display = "block";  
			if (dots.length > 0) {
				dots[slideIndex-1].className += " active";
			}
		}

		// Next/previous controls
		function plusSlides(n) {
			// Reset interval ketika pengguna mengklik manual
			clearInterval(slideInterval);
			showSlides(slideIndex += n);
			startSlideInterval();
		}

		// Thumbnail image controls
		function currentSlide(n) {
			clearInterval(slideInterval);
			showSlides(slideIndex = n);
			startSlideInterval();
		}

		function startSlideInterval() {
			// Hanya mulai interval jika slideshow ada
			if (document.getElementsByClassName("mySlides").length > 0) {
				clearInterval(slideInterval); // Clear existing interval
				slideInterval = setInterval(() => { plusSlides(1); }, 5000);
			}
		}

		// Inisialisasi slideshow
		function initSlideshow() {
			showSlides(slideIndex);
			startSlideInterval();
			
			// Setup event listeners untuk dots
			const dots = document.getElementsByClassName("dot");
			for (let i = 0; i < dots.length; i++) {
				dots[i].addEventListener('click', function() {
					currentSlide(i + 1);
				});
			}
		}

		// Swipe gesture untuk slideshow
		function initSwipe() {
			let startX = 0;
			let endX = 0;
			const slideshow = document.querySelector(".slideshow-container");

			if (slideshow) {
				// Touch events untuk perangkat mobile
				slideshow.addEventListener("touchstart", function(e) {
					startX = e.touches[0].clientX;
				});

				slideshow.addEventListener("touchend", function(e) {
					endX = e.changedTouches[0].clientX;
					handleSwipe();
				});

				// Mouse events untuk desktop (opsional)
				let mouseDown = false;
				
				slideshow.addEventListener("mousedown", function(e) {
					mouseDown = true;
					startX = e.clientX;
				});

				slideshow.addEventListener("mouseup", function(e) {
					if (mouseDown) {
						mouseDown = false;
						endX = e.clientX;
						handleSwipe();
					}
				});
				
				slideshow.addEventListener("mouseleave", function() {
					mouseDown = false;
				});

				function handleSwipe() {
					let diff = startX - endX;
					if (Math.abs(diff) > 50) { // minimal jarak swipe
						if (diff > 0) {
							plusSlides(1); // geser ke kanan → slide berikutnya
						} else {
							plusSlides(-1); // geser ke kiri → slide sebelumnya
						}
					}
				}
			}
		}

	// Inisialisasi peta dengan fokus ke Sulawesi Selatan
	function initMap() {
		// Periksa apakah Leaflet sudah dimuat
		if (typeof L === 'undefined') {
			console.error('Leaflet library not loaded');
			return;
		}
		
		// Periksa apakah elemen peta ada
		const mapElement = document.getElementById('map');
		if (!mapElement) return;
		
		var map = L.map('map').setView([-5.3241, 119.6897], 12);
		
		// Tambahkan tile layer (peta dasar)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		// Tambahkan marker untuk Desa Jonjo
		var desaJonjoMarker = L.marker([-5.3241, 119.6897]).addTo(map)
			.bindPopup(`
				<div style="text-align: center;">
					<h3 style="margin: 5px 0; color: #2c3e50;">Desa Jonjo</h3>
					<p style="margin: 5px 0;">Kecamatan Parigi, Kabupaten Gowa</p>
					<div style="margin: 10px 0; height: 2px; background: #f0f0f0;"></div>
					<p style="margin: 5px 0; font-size: 0.9rem;">Desa yang terletak di daerah pegunungan dengan pemandangan yang indah.</p>
				</div>
			`)
			.openPopup();
		
		// Tambahkan marker untuk Kecamatan Parigi
		var parigiMarker = L.marker([-5.3350, 119.7010]).addTo(map)
			.bindPopup(`
				<div style="text-align: center;">
					<h3 style="margin: 5px 0; color: #2c3e50;">Kecamatan Parigi</h3>
					<p style="margin: 5px 0;">Kabupaten Gowa, Sulawesi Selatan</p>
				</div>
			`);
		
		// Tambahkan marker untuk Kabupaten Gowa
		var gowaMarker = L.marker([-5.3167, 119.7500]).addTo(map)
			.bindPopup(`
				<div style="text-align: center;">
					<h3 style="margin: 5px 0; color: #2c3e50;">Kabupaten Gowa</h3>
					<p style="margin: 5px 0;">Sulawesi Selatan</p>
				</div>
			`);
		
		// Tambahkan marker untuk tempat menarik di sekitar Desa Jonjo
		var tempatMenarik = [
			{
				nama: "Pasar Tradisional",
				koordinat: [-5.3220, 119.6920],
				deskripsi: "Pasar tradisional dengan hasil bumi segar"
			},
			{
				nama: "Sungai Jonjo",
				koordinat: [-5.3280, 119.6850],
				deskripsi: "Sungai dengan air jernih dan pemandangan alam"
			},
			{
				nama: "Bukit Panorama",
				koordinat: [-5.3200, 119.6800],
				deskripsi: "Tempat melihat pemandangan desa dari ketinggian"
			}
		];
		
		// Tambahkan marker untuk setiap tempat menarik
		var markersGroup = L.featureGroup([desaJonjoMarker, parigiMarker, gowaMarker]);
		
		tempatMenarik.forEach(function(tempat) {
			var marker = L.marker(tempat.koordinat).addTo(map)
				.bindPopup(`
					<div style="text-align: center;">
						<h4 style="margin: 5px 0; color: #2c3e50;">${tempat.nama}</h4>
						<p style="margin: 5px 0; font-size: 0.9rem;">${tempat.deskripsi}</p>
					</div>
				`);
			markersGroup.addLayer(marker);
		});
		
		// Tambahkan circle untuk menunjukkan area Desa Jonjo
		var desaCircle = L.circle([-5.3241, 119.6897], {
			color: '#3498db',
			fillColor: '#3498db',
			fillOpacity: 0.2,
			radius: 1500
		}).addTo(map)
		.bindPopup('Area sekitar Desa Jonjo');
		
		markersGroup.addLayer(desaCircle);
		
		// Tambahkan legenda
		var legend = L.control({position: 'bottomright'});
		legend.onAdd = function(map) {
			var div = L.DomUtil.create('div', 'legend');
			div.innerHTML = `
				<h4>Keterangan</h4>
				<div><i style="background: #e74c3c"></i> Desa Jonjo</div>
				<div><i style="background: #2ecc71"></i> Kecamatan Parigi</div>
				<div><i style="background: #9b59b6"></i> Kabupaten Gowa</div>
				<div><i style="background: #f39c12"></i> Tempat Menarik</div>
				<div><i style="background: #3498db; border-radius: 0;"></i> Area Desa</div>
			`;
			return div;
		};
		legend.addTo(map);
		
		// Ekspor fungsi ke window object agar dapat diakses dari HTML
		window.focusOnDesaJonjo = function() {
			map.setView([-5.3241, 119.6897], 14);
			desaJonjoMarker.openPopup();
		};
		
		window.showParigi = function() {
			map.setView([-5.3350, 119.7010], 11);
			parigiMarker.openPopup();
		};
		
		window.showKabupatenGowa = function() {
			map.setView([-5.3167, 119.7500], 10);
			gowaMarker.openPopup();
		};
		
		window.showAllMarkers = function() {
			map.fitBounds(markersGroup.getBounds().pad(0.1));
		};
		
		// Secara otomatis menyesuaikan tampilan untuk semua marker
		setTimeout(showAllMarkers, 100);
	}

	// SECTION DATA DESA JONJO
	function initCharts() {
		// Periksa apakah Chart.js sudah dimuat
		if (typeof Chart === 'undefined') {
			console.error('Chart.js library not loaded');
			return;
		}
		
		// Piramida Penduduk
		const pyramidCanvas = document.getElementById('populationPyramid');
		if (pyramidCanvas) {
			const pyramidCtx = pyramidCanvas.getContext('2d');
			
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
		}

		// Distribusi Dusun
		const dusunCanvas = document.getElementById('dusunDistribution');
		if (dusunCanvas) {
			const dusunCtx = dusunCanvas.getContext('2d');
			
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
		}

		// Tingkat Pendidikan
		const educationCanvas = document.getElementById('educationChart');
		if (educationCanvas) {
			const educationCtx = educationCanvas.getContext('2d');
			
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
		}
	}

	// Inisialisasi semua komponen setelah DOM siap
	$(document).ready(function() {
		initSlideshow();
		initSwipe();
		initMap();
		initCharts();
	});

})(jQuery);
