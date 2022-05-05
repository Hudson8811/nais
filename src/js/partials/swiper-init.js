$(window).on('load', function () {
	let clientsSlider = document.querySelectorAll('.__js_slider-clients');

	const pagiOptions = {
		type: 'bullets',
		bulletClass: 'slider-nav__pagi-item',
		bulletActiveClass: 'slider-nav__pagi-item-active',
		clickable: true
	};

	if (clientsSlider.length > 0) {
		clientsSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 1,
				spaceBetween: 0,
				navigation: {
					nextEl: '.clients__nav .slider-nav__button--next',
					prevEl: '.clients__nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.clients__nav .slider-nav__pagi',
				},
				breakpoints: {
					1080: {
						slidesPerView: 2.3,
						grid: {
							rows: 2
						}
					}
				}
			})
		});
	}
})