$(document).ready(function () {
	var firstAnimation = $('.first-screen__dynamic');
	var firstTabs = $('.first-screen__type-item');
	var products = $('.products-item');
	var preloader = $('.preloader');
	var preloaderItems = $('.preloader__progress svg > g');

	/**
	 * Прелоадер
	 */
	setTimeout(function () {
		preloader.fadeOut(300);
	}, 700);

	preloaderItems.each(function (index) {
		var that = $(this);

		setTimeout(function () {
			that.fadeIn(100);
		}, 100 * (index + 1));
	});

	/**
	 * Появление первого блока после загрузки страницы
	 */
	firstAnimation.first().fadeIn(500);

	setTimeout(function () {
		firstAnimation.removeClass('start');
	}, 500);

	/**
	 * Табы первого блока
	 */
	firstTabs.click(function () {
		firstTabs.removeClass('active');
		$(this).addClass('active');
		firstAnimation.hide().eq($(this).index()).fadeIn(300);
	});

	/**
	 * Анимация первого блока
	 */
	function numberWithCommas(n) {
		return n.replace('.', ',');
	}

	function animCounter(el, start, end, withCommas) {
		var value = {
			val: end
		}

		gsap.from(value, {
			duration: 1,
			ease: 'circ.out',
			val: start,
			roundProps: 'val',
			onUpdate: function () {
				if (withCommas) {
					el.text(numberWithCommas(value.val.toFixed(2)));
				} else {
					el.text(value.val);
				}
			}
		});
	}

	if (firstAnimation && firstAnimation.length > 0) {
		if (window.matchMedia('(min-width: 1080px)').matches) {
			const tl = gsap.timeline({paused: true});
			const tl2 = gsap.timeline({paused: true});
			const tlStart = gsap.timeline();

			setTimeout(function () {
				tlStart.fromTo($('.js-move-1'), 0.8, {x: -450, y: -170}, {x: -185, y: -95, ease: 'power1.out'});
				tlStart.fromTo($('.js-move-2'), 0.8, {x: -450, y: -170}, {x: -128, y: -71, ease: 'power1.out'});
			}, 500);

			let hover1 = tl
				.fromTo($('.js-move-1'), 0.5, {x: -185, y: -95}, {x: 0, y: 0, ease: 'power1.out'})
				.fromTo($('.js-move-1'), 0.3, {x: 0, y: 0}, {x: -20, y: -10, ease: 'none'}, 0.5);

			let hover2 = tl2
				.fromTo($('.js-move-2'), 0.5, {x: -128, y: -71}, {x: 0, y: 0, ease: 'power1.out'})
				.fromTo($('.js-move-2'), 0.3, {x: 0, y: 0}, {x: -20, y: -10, ease: 'none'}, 0.5);

			firstAnimation.on('mouseenter', function () {
				var that = $(this);
				var counter = that.find('.first-screen__counter');
				var digit = that.find('.js-digit');

				hover1.play();
				hover2.play();

				counter.addClass('active');

				if (digit.hasClass('val24')) {
					animCounter(digit, 0, 24, true);
				} else {
					animCounter(digit, 0, 90, true);
				}
			});

			firstAnimation.on('mouseleave', function () {
				var that = $(this);
				var counter = that.find('.first-screen__counter');
				var digit = that.find('.js-digit');

				hover1.reverse();
				hover2.reverse();

				counter.removeClass('active');

				if (digit.hasClass('val24')) {
					animCounter(digit, 24, 0, true);
				} else {
					animCounter(digit, 90, 0, true);
				}
			});
		}
	}

	/**
	 * Выравнивание подменю
	 */
	var submenuLinks = $('.menu__inner');

	submenuLinks.each(function () {
		const parent = $(this).parent();
		const posY = parent.offset().top + parent.height();

		$(this).css('top', posY);
	});

	/**
	 * Сдвиг текста в зависимости от положения курсора
	 */
	if (products && products.length > 0) {
		var rect = $('body')[0].getBoundingClientRect();
		var mouse = {
			x: 0,
			y: 0,
			moved: false
		};

		if (window.matchMedia('(min-width: 1080px)').matches) {
			gsap.ticker.add(function() {
				if (mouse.moved && window.matchMedia('(min-width: 1080px)')) {
					parallaxIt('.products-item__bg-text--1 span', 12);
					parallaxIt('.products-item__bg-text--2 span', 22);
					parallaxIt('.products-item__bg-text--3 span', 65);
				}

				if (mouse.moved && window.matchMedia('(min-width: 1440px)').matches) {
					parallaxIt('.products-item__bg-text--1 span', 10);
					parallaxIt('.products-item__bg-text--2 span', 20);
					parallaxIt('.products-item__bg-text--3 span', 64);
				}

				if (mouse.moved && window.matchMedia('(min-width: 1900px)').matches) {
					parallaxIt('.products-item__bg-text--1 span', 5);
					parallaxIt('.products-item__bg-text--2 span', 15);
					parallaxIt('.products-item__bg-text--3 span', 58);
				}
				mouse.moved = false;
			});
		}

		function parallaxIt(target, coef) {
			gsap.to(target, 0.3, {
				x: (mouse.x - rect.width / 2) / rect.width * 150 * coef,
				y: (mouse.y - rect.height / 5) / rect.height * 150
			});
		}

		$(window).mousemove(function (e) {
			mouse.moved = true;
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY + rect.top;
		});
	}

	/**
	 * Анимированный счетчик
	 */
	if ($('.first-screen__wrapper--bottom') && $('.first-screen__wrapper--bottom').length > 0) {
		if (window.matchMedia('(min-width: 1080px)').matches) {
			var playOnce = false;

			$(window).scroll(function () {
				var scroll = $(this).scrollTop();
				var winH = $(this).innerHeight();
				var elH = $('.first-screen__wrapper--bottom').outerHeight();
				var elOffset = $('.first-screen__wrapper--bottom').offset().top - 350;
				var centerScroll = (winH - elH) / 2 + scroll;

				if (playOnce) return;

				if (centerScroll >= elOffset && centerScroll <= elH + elOffset) {
					$('.js-prop').each(function (index, elem) {
						switch (index) {
							case 0:
								animCounter($(this), 0, 23);
								break;
							case 1:
								animCounter($(this), 0, 59);
								break;
							case 2:
								animCounter($(this), 0, 3);
								break;
							case 3:
								animCounter($(this), 0, 5);
								break;
							case 4:
								animCounter($(this), 0, 98);
								break;
						}
					});

					playOnce = true;
				}
			});
		}
	}

	/**
	 * Адаптивная таблица
	 */
	$.each($('tbody tr'), function () {
		var title = $(this).parent('tbody').siblings('thead').find('th');
		$.each($(this).find('td'), function (index) {
			$(this).attr('aria-label', title.eq(index).text());
		});
	});
})