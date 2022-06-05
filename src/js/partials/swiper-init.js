$(window).on('load', function () {
	let clientsSlider = document.querySelectorAll('.__js_slider-clients');
	let articleSlider = document.querySelectorAll('.__js_slider-article');
	let certsSlider = document.querySelectorAll('.__js_slider-article-certs');
	let reviewsSlider = document.querySelectorAll('.__js_slider-reviews');
	let reviewsSlider2 = document.querySelectorAll('.__js_slider-reviews-2');
	let photosSlider = document.querySelectorAll('.__js_slider-photos');
	let partnersSlider = document.querySelectorAll('.__js_slider-partners');
	let projectsSlider = document.querySelectorAll('.__js_slider-projects');

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

	if (articleSlider.length > 0) {
		articleSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 1.16,
				spaceBetween: 32,
				navigation: {
					nextEl: '.article-single__nav .slider-nav__button--next',
					prevEl: '.article-single__nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.article-single__nav .slider-nav__pagi',
				}
			})
		});
	}

	if (certsSlider.length > 0) {
		certsSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 2,
				spaceBetween: 26,
				navigation: {
					nextEl: '.article-single__certs-nav .slider-nav__button--next',
					prevEl: '.article-single__certs-nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.article-single__certs-nav .slider-nav__pagi',
				},
				breakpoints: {
					767: {
						slidesPerView: 3
					},
					1080: {
						slidesPerView: 4
					}
				}
			})
		});
	}

	if (reviewsSlider.length > 0) {
		reviewsSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 1.16,
				spaceBetween: 32,
				navigation: {
					nextEl: '.project-single__nav .slider-nav__button--next',
					prevEl: '.project-single__nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.project-single__nav .slider-nav__pagi',
				}
			})
		});
	}

	if (reviewsSlider2.length > 0) {
		reviewsSlider2.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 1.16,
				spaceBetween: 32,
				navigation: {
					nextEl: '.weights-page__nav .slider-nav__button--next',
					prevEl: '.weights-page__nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.weights-page__nav .slider-nav__pagi',
				}
			})
		});
	}

	if (photosSlider.length > 0) {
		photosSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 1.16,
				spaceBetween: 32,
				navigation: {
					nextEl: '.project-single__pic-nav .slider-nav__button--next',
					prevEl: '.project-single__pic-nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.project-single__pic-nav .slider-nav__pagi',
				}
			})
		});
	}

	if (partnersSlider.length > 0) {
		partnersSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 2,
				spaceBetween: 24,
				navigation: {
					nextEl: '.partners__nav .slider-nav__button--next',
					prevEl: '.partners__nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.partners__nav .slider-nav__pagi',
				},
				breakpoints: {
					767: {
						slidesPerView: 3
					},
					1080: {
						slidesPerView: 4
					}
				}
			})
		});
	}

	if (projectsSlider.length > 0) {
		projectsSlider.forEach(elem => {
			new Swiper(elem, {
				slidesPerView: 2.3,
				spaceBetween: 16,
				navigation: {
					nextEl: '.weights-page__projects-nav .slider-nav__button--next',
					prevEl: '.weights-page__projects-nav .slider-nav__button--prev',
					disabledClass: 'slider-nav__button--disabled'
				},
				pagination: {
					...pagiOptions,
					el: '.weights-page__projects-nav .slider-nav__pagi',
				}
			})
		});
	}
})