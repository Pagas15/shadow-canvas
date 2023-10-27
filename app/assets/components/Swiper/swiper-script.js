const swiper = new Swiper('.swiper', {

	loop: true,
	slidesPerView: 'auto',
	centeredSlides: true,
	// effect: "fade",
  
	// If we need pagination
	// pagination: {
	// 	el: '.swiper-pagination',
	// },

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
});