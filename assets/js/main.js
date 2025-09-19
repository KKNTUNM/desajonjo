

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
	// Slideshow
		let slideIndex = 1;
		showSlides(slideIndex);

		// Next/previous controls
			function plusSlides(n) {
			showSlides(slideIndex += n);
			}

		// Thumbnail image controls
			function currentSlide(n) {
			showSlides(slideIndex = n);
			}

			function showSlides(n) {
				let i;
				let slides = document.getElementsByClassName("mySlides");
				let dots = document.getElementsByClassName("dot");
				if (slides.length === 0) return; // kalau tidak ada slide, keluar

				if (n > slides.length) {slideIndex = 1}    
				if (n < 1) {slideIndex = slides.length}

				for (i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";  
				}

				for (i = 0; i < dots.length; i++) {
					dots[i].className = dots[i].className.replace(" active", "");
				}

				slides[slideIndex-1].style.display = "block";  
				dots[slideIndex-1].className += " active";
			}

		// Auto slide every 5s
			setInterval(() => { plusSlides(1); }, 5000);
	// Swipe gesture untuk slideshow
	let startX = 0;
	let endX = 0;
	const slideshow = document.querySelector(".slideshow-container");

	if (slideshow) {
		slideshow.addEventListener("touchstart", function(e) {
			startX = e.touches[0].clientX;
		});

		slideshow.addEventListener("touchend", function(e) {
			endX = e.changedTouches[0].clientX;
			handleSwipe();
		});

		slideshow.addEventListener("mousedown", function(e) {
			startX = e.clientX;
		});

		slideshow.addEventListener("mouseup", function(e) {
			endX = e.clientX;
			handleSwipe();
		});
	}

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
	
// Inisialisasi peta dengan fokus ke Sulawesi Selatan
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
        
    // Fungsi untuk fokus ke Desa Jonjo
        function focusOnDesaJonjo() {
            map.setView([-5.3241, 119.6897], 14);
            desaJonjoMarker.openPopup();
        }
        
    // Fungsi untuk menunjukkan Kecamatan Parigi
        function showParigi() {
            map.setView([-5.3350, 119.7010], 11);
            parigiMarker.openPopup();
        }
        
    // Fungsi untuk menunjukkan Kabupaten Gowa
        function showKabupatenGowa() {
            map.setView([-5.3167, 119.7500], 10);
            gowaMarker.openPopup();
        }
        
    // Fungsi untuk menunjukkan semua marker
        function showAllMarkers() {
            map.fitBounds(markersGroup.getBounds().pad(0.1));
        }
        
    // Secara otomatis menyesuaikan tampilan untuk semua marker saat halaman dimuat
        window.onload = function() {
            setTimeout(showAllMarkers, 100);
        };


})(jQuery);