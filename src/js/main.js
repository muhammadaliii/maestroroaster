/**
 * Main
 * Custom Scripts
 */

$(function() {
	// Document Ready

	jcf.setOptions('Select', {
		wrapNative: true
	});

	jcf.replaceAll();

	$(document).ready(function(){
		$(this).scrollTop(0);
	});

	setTimeout(function(){
		$('.progressive-image').progressiveImage();
	}, 400);

	setTimeout(function(){
		AOS.init({
			offset: 60,
			duration: 600,
			easing: 'linear',
		});
	}, 800);

	$(window).on('resize', function(){
		$('.progressive-image').progressiveImage();
		AOS.refresh();
	});
})

$(window).smartresize(function() {
	// Debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
});