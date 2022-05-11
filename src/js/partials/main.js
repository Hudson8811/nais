$(document).ready(function () {
	var firstAnimation = $('.first-screen__animate');
	var counter = $('.first-screen__counter');
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
	firstAnimation.parent().fadeIn(500);

	setTimeout(function () {
		firstAnimation.removeClass('start');
	}, 500);

	/**
	 * Анимация первого блока
	 */
	if (firstAnimation && firstAnimation.length > 0) {
		if (window.matchMedia('(min-width: 1080px)').matches) {
			firstAnimation.hover(
				function () {
					$(this).removeClass('moved-out');
					$(this).addClass('moved-in');
					counter.addClass('active');
					$('.js-digit').easy_number_animate({
						start_value: 0,
						end_value: 9,
						duration: 1000
					});
				},
				function () {
					$(this).removeClass('moved-in');
					$(this).addClass('moved-out');
					counter.removeClass('active');
					$('.js-digit').easy_number_animate({
						start_value: 9,
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
				var posX = -e.offsetX * 100 / $(this).innerWidth();
				var offset = posX * $(this).find('.products-item__bg-text span').innerWidth() / 100;

				$(this).find('.products-item__bg-text span').css('left', offset + 'px');
			});

			products.mouseleave(function () {
				$(this).find('.products-item__bg-text span').css('left', '-17px');
			});
		}
	}
})