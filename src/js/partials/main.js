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
			duration: 1.6,
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
			const tl = gsap.timeline();
			let hover = tl
				.fromTo($('.first-screen__animate'), 0.8, {x: -185, y: -95}, {x: 0, y: 0, ease: 'power1.out'})
				.fromTo($('.first-screen__animate'), 0.6, {x: 0, y: 0}, {x: -20, y: -10, ease: 'none'}, 0.8);

			hover.pause();

			firstAnimation.on('mouseenter', function () {
				var that = $(this);
				var counter = that.find('.first-screen__counter');
				var digit = that.find('.js-digit');

				hover.play();

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

				hover.reverse();

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
		if (window.matchMedia('(min-width: 1080px)').matches) {
			products.mousemove(function (e) {
				var text = $(this).find('.products-item__bg-text span');
				var posX = -e.offsetX * 100 / $(this).innerWidth();
				var offset = posX * (text.innerWidth() - $(this).innerWidth()) / 100 - 17;

				console.log(e.offsetX);

				text.css('left', offset + 'px');
			});

			products.mouseleave(function () {
				$(this).find('.products-item__bg-text span').css('left', '-17px');
			});
		}
	}

	/**
	 * Смещение блоков сверху вниз
	 */
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
})