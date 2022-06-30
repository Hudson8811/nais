
$(document).ready(function () {
	var firstAnimation = $('.first-screen__dynamic');
	var firstAnimationHovArea = $('.first-screen__dynamic-hov-area');
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
			duration: 0.6,
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
			const tl = gsap.timeline({ paused: true });
			const tl2 = gsap.timeline({ paused: true });
			const tlStart = gsap.timeline();

			setTimeout(function () {
				tlStart.fromTo($('.js-move-1'), 0.6, { x: -450, y: -170 }, { x: -185, y: -95, ease: 'power1.out' });
				tlStart.fromTo($('.js-move-2'), 0.6, { x: -450, y: -170 }, { x: -95, y: -60, ease: 'power1.out' });
			}, 500);

			let hover1 = tl
				.fromTo($('.js-move-1'), 0.6, { x: -185, y: -95 }, { x: 0, y: 0, ease: 'power1.out' });

			let hover2 = tl2
				.fromTo($('.js-move-2'), 0.6, { x: -95, y: -60 }, { x: 0, y: 0, ease: 'power1.out' });
			//firstAnimation
			firstAnimationHovArea.on('mouseenter', function () {
				var that = $(this).parent();
				//var that = $(this);
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

			firstAnimationHovArea.on('mouseleave', function () {
				var that = $(this).parent();
				//var that = $(this);
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
		} else {
			var digit = firstAnimation.find('.js-digit');
			digit.each(function () {
				if ($(this).hasClass('val24')) {
					animCounter($(this), 0, 24, true);
				} else {
					animCounter($(this), 0, 90, true);
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
		var mouse = { x: 0, y: 0, moved: false };

		var lastHovId=0;
		var lastHovItem=$('.js-products-item').first();
		/*var mouseMovementX=[80,-150,80];
		var mouseMovementY=[140,-90,140];*/

		var mouseMovementX=[56,-105,56];
		var mouseMovementY=[98,-60,98];


		if ($(window).width() > 1079) {
			$('.js-products-item').on('mouseover', function () {
				$(this).addClass('js-products-item--hovered');
				//mouseMovement[parseInt($(this).attr('data-idx'))]=120;
				lastHovId=parseInt($(this).attr('data-idx'));
				lastHovItem=$(this);
				/*mouseMovementX=[100,140,100];
				mouseMovementY=[140,100,140];
				mouseMovementX[lastHovId]=150;
				mouseMovementY[lastHovId]=150;*/

			});
			$('.js-products-item').on('mouseout', function () {
				$(this).removeClass('js-products-item--hovered');
			});


			gsap.ticker.add(function () {
				if (mouse.moved) {
					if ($('.products-item__bg-text--1 span').length > 0) {
						parallaxIt(".products-item__bg-text--1 span", mouseMovementX[0], mouseMovementY[0]);
					}
					if ($('.products-item__bg-text--2 span').length > 0) {
						parallaxIt(".products-item__bg-text--2 span", mouseMovementX[1], mouseMovementY[1]);
					}
					if ($('.products-item__bg-text--3 span').length > 0) {
						parallaxIt(".products-item__bg-text--3 span", mouseMovementX[2], mouseMovementY[2]);
					}
				}
				mouse.moved = false;
			});
		}

		function parallaxIt(target, movementX, movementY) {
			TweenMax.to(target, 1.2, {
				x: (mouse.x - rect.width / 7) / rect.width * movementX * -1,
				y: (mouse.y - rect.height / 6) / rect.height * movementY * -1,
				ease:  Elastic.easeOut
			});
		}

		$("body").mousemove(function (e) {
			mouse.moved = true;
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY + rect.top;
		});

		$(window).on('resize scroll', function () {
			rect = $('body')[0].getBoundingClientRect();
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




	var simpleBarOptions = {
		autoHide: false
	};

	$('.js-table-scrollbar').each(function () {
		new SimpleBar($(this)[0], simpleBarOptions);
	});



	$("body").on('mouseover mouseleave', '.table-hover-x td, .js-hov-table td', function (e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$(this).closest('table').find("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$(this).closest('table').find("colgroup").eq($(this).index()).removeClass("hover");
		}
	});






	$('.js-start-iframe').on('click', function(){
		var link=$(this).attr('data-iframe-link');
		if($(this).find('iframe').length<1){
			$(this).append('<iframe src="'+link+'?autoplay=1" allow="autoplay"></iframe>');
		}
	});
});


function vw(v) {
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return w / 100 * v;
}


