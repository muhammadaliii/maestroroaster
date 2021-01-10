
function stickyClass() {
	$(window).scroll(function(event){
		var scroll = $(window).scrollTop();
		
		// $('.scroll-to-top').toggleClass('hiding',
		// 	scroll >= $('footer').offset().top - 20
		// );

		$('.scroll-to-top').toggleClass('showing',
			scroll >= $('#main').offset().top + 250
		);
	});
}


$(function() {
	$(document).ready(function () {
		if ($('.scroll-to-top').length > 0) {
			stickyClass();
		}
	});
})
