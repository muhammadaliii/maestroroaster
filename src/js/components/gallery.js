(function($){

	$('.certificates').lightGallery({
		thumbnail: true,
		animateThumb: true,
		showThumbByDefault: false,
		exThumbImage: 'data-exthumbimage',
		selector: '.selector',
		download: false,
	});

	$('.thumbnail-gallery .content-photos').lightGallery({
		thumbnail: true,
		animateThumb: true,
		showThumbByDefault: false,
		exThumbImage: 'data-exthumbimage',
		selector: '.selector',
		download: false,
	});

	$('.thumbnail-gallery .content-videos').lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		exThumbImage: 'data-exthumbimage',
		selector: '.selector',
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		loadVimeoThumbnail: true,
		vimeoThumbSize: 'thumbnail_medium',
		download: false,
	});

	$('.knowledge-content .thumbnail-gallery').lightGallery({
		thumbnail: true,
		animateThumb: false,
		showThumbByDefault: false,
		exThumbImage: 'data-exthumbimage',
		selector: '.selector',
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		loadVimeoThumbnail: true,
		vimeoThumbSize: 'thumbnail_medium',
		download: false,
	});

	$('.slider-mode.one .slider-area').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		lazyLoad: 'onDemand',
		centerMode: true,
		centerPadding: '20px',
		arrows: true,
		dots: false,
		infinite: true,
		prevArrow: '<span class="button-arrow prev-arrow"></span>',
		nextArrow: '<span class="button-arrow next-arrow"></span>',
		asNavFor: '.slider-mode.one .slider-nav',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '80px',
				}
			}
		]
	});

	$('.slider-mode.one .slider-nav').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-mode.one .slider-area',
		dots: false,
		arrows: false,
		infinite: true,
		focusOnSelect: false
	});

	$('.slider-mode.two .slider-area').slick({
		slidesToShow: 7,
		slidesToScroll: 1,
		infinite: false,
		autoplay: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		lazyLoad: 'onDemand',
		arrows: true,
		dots: true,
		prevArrow: '<span class="button-arrow prev-arrow"></span>',
		nextArrow: '<span class="button-arrow next-arrow"></span>',
		responsive: [
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			}
		]
	});

})(jQuery);