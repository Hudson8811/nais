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
	var isAnimating = false;

	if (firstAnimation && firstAnimation.length > 0) {
		if (window.matchMedia('(min-width: 1080px)').matches) {
			firstAnimation.hover(
				function () {
					var that = $(this);
					var img = that.find('.first-screen__animate');
					var counter = that.find('.first-screen__counter');
					var digit = that.find('.js-digit');

					img.removeClass('moved-out');
					img.addClass('moved-in');
					counter.addClass('active');
					digit.easy_number_animate({
						start_value: 0,
						end_value: digit.hasClass('val24') ? 24 : 9,
						duration: 1000
					});
				},
				function () {
					var that = $(this);
					var img = that.find('.first-screen__animate');
					var counter = that.find('.first-screen__counter');
					var digit = that.find('.js-digit');

					img.removeClass('moved-in');
					img.addClass('moved-out');
					counter.removeClass('active');
					digit.easy_number_animate({
						start_value: digit.hasClass('val24') ? 24 : 9,
						end_value: 0,
						duration: 1000
					});
				}
			);
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
				var offset = posX * (text.innerWidth() - $(this).innerWidth()) / 100 - ($(this).innerWidth() / 1440) * 100;

				text.css('left', offset + 'px');
			});

			products.mouseleave(function () {
				$(this).find('.products-item__bg-text span').css('left', '-17px');
			});
		}
	}
})