/**
 * Navbar
 */

function stickyHeader() {
	var lastScroll = 300;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		
		if(st < 32) {
			$('body').removeClass('on-scroll');
		} else {
			$('body').addClass('on-scroll');
		}

		lastScroll = st;
	});
}

// function stickyClass() {
// 	$(window).scroll(function(event){
// 		var scroll = $(window).scrollTop();
		
// 		$('.portofolio-content').toggleClass('fixed',
// 			scroll >= $('.portofolio-content').offset().top - 54
// 		);
// 	});
// }

$(function() {
	$(document).ready(function () {
		stickyHeader();

		// if ($('.portofolio-content').length > 0) {
		// 	stickyClass();
		// }
	});

	$(".toggle-down").click(function(){
		$(this).toggleClass("toggleDrawer").siblings(".menu").toggleClass("show").parents(".header-fix").toggleClass("show-menu");
	});
})
