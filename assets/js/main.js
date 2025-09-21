

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

// Jika URL memiliki hash, scroll ke section tersebut
if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Data GeoJSON untuk batas wilayah Desa Jonjo
        const geoJsonData = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "coordinates": [[[119.76356427431284,-5.290578458123846],[119.76359665589175,-5.290664234574464],[119.76394585895319,-5.290775141985989],[119.76408159260859,-5.291158126001817],[119.76435982517455,-5.291839822214767],[119.7649248290752,-5.293747364777499],[119.7649631496133,-5.2938993069841604],[119.76549800460202,-5.294454310175259],[119.7664714839249,-5.294745596702603],[119.76721653471616,-5.294706041199355],[119.7674965361688,-5.294902160731251],[119.76762269273948,-5.295399987654532],[119.76780422592586,-5.295815104165541],[119.76817668361416,-5.295852730841208],[119.7686721500516,-5.2958750470574],[119.7694170654283,-5.296088094520215],[119.77002718715681,-5.29696714621587],[119.77023266975831,-5.297255581871784],[119.77060885795146,-5.2984977736609835],[119.77051326694959,-5.298835258608003],[119.77041767594774,-5.299172743555022],[119.7700186083384,-5.299769913571799],[119.76961954072905,-5.300537059404881],[119.76983615541586,-5.301415055402121],[119.77141841483581,-5.303218470196825],[119.7726742416447,-5.304203265406656],[119.77352457170639,-5.304545773026099],[119.77437490176807,-5.305063387604832],[119.775664882126,-5.30556349127837],[119.77879829297494,-5.305235690873399],[119.78166636327387,-5.304318830930844],[119.78455124439435,-5.303676537528228],[119.78615234665273,-5.303542055349794],[119.79040048764608,-5.302600963247597],[119.79286394416081,-5.302109123917576],[119.79396967811999,-5.302058648300307],[119.79485472000141,-5.3014546613265985],[119.79487746536793,-5.3008722054539525],[119.7949079756887,-5.300353048745489],[119.79503438091507,-5.300096475406018],[119.79560642218257,-5.298828453772041],[119.79579488382825,-5.29873012405208],[119.80005464505092,-5.296026571029814],[119.80104844417502,-5.295872570456137],[119.8183817682114,-5.295718572849772],[119.8195589661061,-5.295774301645603],[119.82046885070648,-5.296029659608022],[119.82099447245282,-5.296967082250064],[119.82152009419917,-5.297904504892106],[119.8225051606648,-5.298509212400947],[119.82324428616226,-5.298959831493663],[119.82364927004487,-5.298878108621439],[119.82412509619553,-5.2997793465795855],[119.82474293253318,-5.300198149172667],[119.82560318436458,-5.300274465182602],[119.82586623947284,-5.299580654401996],[119.82632977955092,-5.299153014218846],[119.82679741498715,-5.299112880722799],[119.82726505042339,-5.299405460679203],[119.82760746416591,-5.299260626228191],[119.82784549935971,-5.298556053125956],[119.8280835345535,-5.298317279255624],[119.82840510514984,-5.298261497630102],[119.82865984742588,-5.298471887130367],[119.82893560897753,-5.299132149785422],[119.82918193261195,-5.29860004746368],[119.82911177961122,-5.297910382993322],[119.82890316808457,-5.297634319817789],[119.8289400242561,-5.297200940761712],[119.82891889276284,-5.296925165245476],[119.82913511874384,-5.2968857335726085],[119.82897147361253,-5.296609835039091],[119.82904294441636,-5.296395566183616],[119.82935177269457,-5.296141906652176],[119.82909911850905,-5.295831541046658],[119.82910808466715,-5.295368372737668],[119.82948297693379,-5.294787032318842],[119.82975943212034,-5.294663772886638],[119.82979852983115,-5.294363254902192],[119.82945069108567,-5.293984365561462],[119.82953330174944,-5.293717327108004],[119.82979166076603,-5.293406538967523],[119.82978113374074,-5.292828712373584],[119.83002370221678,-5.292548053813784],[119.82999902795348,-5.292228344437039],[119.83005101889496,-5.29209994212111],[119.83012707276364,-5.291919998606964],[119.83006257375871,-5.291714608949607],[119.83005048589852,-5.29160393199944],[119.82988077987622,-5.291257835384254],[119.82977779507263,-5.291201275495101],[119.829638254955,-5.29106915367286],[119.8295905514355,-5.290845586560735],[119.82954871574229,-5.290745182557953],[119.82943989347339,-5.2903351283547515],[119.82909984232595,-5.289925074151551],[119.82889083678133,-5.289816422023822],[119.82872387285201,-5.289603113482425],[119.82849504902885,-5.28926022152778],[119.82826276578314,-5.288207325380345],[119.82786632052387,-5.287481355719418],[119.82723759201888,-5.285702489911055],[119.82695058810228,-5.2848403004817275],[119.82655414284218,-5.284468503424543],[119.8264726210572,-5.283343493120393],[119.82639765974464,-5.282774178135588],[119.82648686044917,-5.282041398409094],[119.82693886521561,-5.281175210030136],[119.82772903472338,-5.2799914925035285],[119.82862864557475,-5.279516125183431],[119.82942977423636,-5.277808181940465],[119.82173662020031,-5.280180411702492],[119.82023167522522,-5.28004488183741],[119.81847028494938,-5.280413563187818],[119.81686346420202,-5.280790715735545],[119.8128623019107,-5.280511199789391],[119.80978051936734,-5.280745915543179],[119.80881413086476,-5.28098063136758],[119.80798172895167,-5.281248144504126],[119.80689518498133,-5.281609642772896],[119.80517308632741,-5.282651161718088],[119.80374145334501,-5.282656681428657],[119.80216285143456,-5.282310423934587],[119.80122371200505,-5.282155945429663],[119.80058424952409,-5.2821506690924735],[119.79908040458737,-5.2821582012701676],[119.79792542552454,-5.281632250161301],[119.79594574573898,-5.281792596017919],[119.79361472230444,-5.282193464920724],[119.79145937069572,-5.283545490140657],[119.78954556784265,-5.284963112248583],[119.78514491072839,-5.285697430631789],[119.78113951521894,-5.286169361767905],[119.77875908408342,-5.28576666858673],[119.77712968895494,-5.285915171582584],[119.77635890934661,-5.285442783035751],[119.77580771951936,-5.2849703944889175],[119.77384808278026,-5.284466337797312],[119.7722613166741,-5.284095195508916],[119.7717346294111,-5.283953427617593],[119.7712518601052,-5.283636734390542],[119.77083410374726,-5.283786084469062],[119.77051543067776,-5.283773296834206],[119.77002108578452,-5.283847971876622],[119.76960582942354,-5.283940956377886],[119.76924323839845,-5.283960522738932],[119.76886484777285,-5.283848985236902],[119.76850752328082,-5.283800377587276],[119.76845168986634,-5.28504631089263],[119.76691069398649,-5.286313220485487],[119.76646822652086,-5.286648242445965],[119.76557283716895,-5.287675489079817],[119.76520936770646,-5.287842699363407],[119.76498550070679,-5.288104604574922],[119.76478239993712,-5.288241248205091],[119.76475811043073,-5.288709181320648],[119.76432541839543,-5.289549314974342],[119.76388507492003,-5.290038379348099],[119.76356427431284,-5.290578458123846]]],
                    "type": "Polygon"
                }
            }]
        };

        // Data contoh untuk lokasi penting (ganti dengan data sebenarnya)
        const lokasiPenting = [
			{
                "id": "kantor_desa",
                "nama": "Kantor Desa Jonjo",
                "koordinat": [-5.288500832209802, 119.81318559730045],
                "kategori": "kantor_desa"
			},
			{
                "id": "pasar_desa",
                "nama": "Pasar Desa Jonjo",
                "koordinat": [-5.289056836918357, 119.81312154907695],
                "kategori": "pasar_desa"
			},
			{	//Masjid Bukit Parigi
                "id": "masjid_1",
                "nama": "Masjid Nurul Hikmah",
                "koordinat": [-5.284560313193487, 119.80890361271692],
                "kategori": "masjid"
            },
			{
                "id": "masjid_2",
                "nama": "Masjid Nurul Taqwa",
                "koordinat": [-5.2862512963889445, 119.81159763209791],
                "kategori": "masjid"
            },
			{
                "id": "masjid_3",
                "nama": "Masjid Nurul Taqwa",
                "koordinat": [-5.284681487786266, 119.8162718315728],
                "kategori": "masjid"
            },
			{
			    "id": "masjid_4",
                "nama": "Masjid An-Nur",
                "koordinat": [-5.286917430887858, 119.80657058259206],
                "kategori": "masjid"
			},
			{ 	//Masjid Jonjo
			    "id": "masjid_5",
                "nama": "Masjid Nurul Ichsan",
                "koordinat": [-5.2912466359824855, 119.81345156569341],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_6",
                "nama": "Masjid Muh Aras",
                "koordinat": [-5.2908312704344915, 119.81068297252722],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_7",
                "nama": "Masjid Daulu",
                "koordinat": [-5.29111915295435, 119.8182265623867],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_8",
                "nama": "Masjid Nurul Taufiq",
                "koordinat": [-5.291409758642696, 119.8064673943759],
                "kategori": "masjid"
			},
			{ 	//Masjid Baliti
			    "id": "masjid_9",
                "nama": "Masjid Nur Rahmat Baliti",
                "koordinat": [-5.295563562431378, 119.82252144636777],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_9",
                "nama": "Masjid Nurul Iman",
                "koordinat": [-5.298640271364472, 119.8252787572373],
                "kategori": "masjid"
			},
			{ 	//Masjid Laloasa
			    "id": "masjid_10",
                "nama": "Masjid Syahrul Mubarak",
                "koordinat": [-5.288232011935308, 119.7965229548577],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_9",
                "nama": "Masjid Nurul Jihad",
                "koordinat": [-5.290232839577409, 119.79495039394499],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_10",
                "nama": "Masjid Baiturrahman",
                "koordinat": [-5.288896639501993, 119.77489739411958],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_11",
                "nama": "Masjid",
                "koordinat": [-5.289133382022093, 119.78000091407894],
                "kategori": "masjid"
			},
			{ 
			    "id": "masjid_12",
                "nama": "Masjid Nurul Taqwa",
                "koordinat": [-5.288776453953442, 119.78398520740294],
                "kategori": "masjid"
			},
			{ 	
			    "id": "masjid_13",
                "nama": "Masjid Miftahul Khair",
                "koordinat": [	-5.289725304749779, 119.78788104762371],
                "kategori": "masjid"
			},
            {
                "id": "sekolah_1",
                "nama": "SD Negeri Jonjo 1",
                "koordinat": [-5.291352719504665, 119.81331097793093],
                "kategori": "sekolah"
            },
            {
                "id": "sekolah_2",
                "nama": "SD Inpres Parigi",
                "koordinat": [-5.297123907655422, 119.82442746626371],
                "kategori": "sekolah"
            },
            {
                "id": "sekolah_3",
                "nama": "SD Inpres Laloasa",
                "koordinat": [-5.290515134959894, 119.79139516441757],
                "kategori": "sekolah"
            },
            {
                "id": "posyandu_1",
                "nama": "Posyandu Mekar 1",
                "koordinat": [-5.292217868408347, 119.81328123310645],
                "kategori": "posyandu"
            },
			{
                "id": "posyandu_2",
                "nama": "Posyandu Mekar 4",
                "koordinat": [-5.291592326729654, 119.79883545917227],
                "kategori": "posyandu"
            },
			{
                "id": "posyandu_3",
                "nama": "Posyandu Mekar 3",
                "koordinat": [-5.297416005492208, 119.82339739759844],
                "kategori": "posyandu"
            },
			{
                "id": "posyandu_4",
                "nama": "Posyandu Mekar 5",
                "koordinat": [-5.289031369943952, 119.78507342780762],
                "kategori": "posyandu"
            },
			{
                "id": "posyandu_5",
                "nama": "Posyandu Mekar 2",
                "koordinat": [-5.285035637424098, 119.81653864553047],
                "kategori": "posyandu"
            },
			{
                "id": "posyandu_6",
                "nama": "Posyandu Pembantu",
                "koordinat": [-5.288824622644094, 119.81329132546927],
                "kategori": "posyandu"
            },
            {
                "id": "lapangan",
                "nama": "Lapangan Desa Jonjo",
                "koordinat": [-5.291610266219622, 119.81375039953264],
                "kategori": "lapangan"
            }
        ];			

        // Inisialisasi peta
        function initMap() {
            // Koordinat pusat Desa Jonjo
            const center = [-5.29, 119.82];
            
            // Inisialisasi peta Leaflet
            const map = L.map('map').setView(center, 14);
            
            // Tambahkan tile layer (peta dasar)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Tambahkan batas wilayah desa dari GeoJSON
            L.geoJSON(geoJsonData, {
                style: {
                    color: '#3498db',
                    weight: 3,
                    opacity: 0.8,
                    fillColor: '#3498db',
                    fillOpacity: 0.2
                }
            }).addTo(map).bindPopup('Batas Wilayah Desa Jonjo');
            
            // Tambahkan marker untuk setiap lokasi penting
            Object.values(lokasiPenting).forEach(lokasi => {
                // Tentukan ikon berdasarkan kategori
                let iconColor;
                switch(lokasi.kategori) {
                    case 'kantor_desa':
                        iconColor = '#e74c3c';
                        break;
                    case 'pasar_desa':
                        iconColor = '#3498db';
                        break;
                    case 'masjid':
                        iconColor = '#84ec64ff';
                        break;
                    case 'sekolah':
                        iconColor = '#f39c12';
                        break;
                    case 'posyandu':
                        iconColor = '#9b59b6';
                        break;
                    case 'lapangan':
                        iconColor = '#43a413ff';
                        break;
                    default:
                        iconColor = '#95a5a6';
                }
                
                // Buat ikon kustom
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: ${iconColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                });
                
                // Tambahkan marker ke peta
                const marker = L.marker(lokasi.koordinat, {icon: customIcon}).addTo(map);
                marker.bindPopup(`<strong>${lokasi.nama}</strong><br>${lokasi.kategori.replace('_', ' ').toUpperCase()}`);
            });
            
            // Tambahkan skala peta
            L.control.scale({metric: true, imperial: false}).addTo(map);
            
            // Kontrol zoom in
            document.getElementById('zoom-in').addEventListener('click', () => {
                map.zoomIn();
            });
            
            // Kontrol zoom out
            document.getElementById('zoom-out').addEventListener('click', () => {
                map.zoomOut();
            });
            
            // Kontrol reset view
            document.getElementById('reset-view').addEventListener('click', () => {
                map.setView(center, 14);
            });
        }

    // Inisialisasi peta setelah halaman dimuat
    document.addEventListener('DOMContentLoaded', initMap);
        // Fungsi untuk menginisialisasi chart
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

        // Jalankan fungsi inisialisasi ketika halaman selesai dimuat
        document.addEventListener('DOMContentLoaded', initCharts);


})(jQuery);