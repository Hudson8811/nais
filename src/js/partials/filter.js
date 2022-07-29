$(function () {
	var filterActiveClass = 'filter__button--active';
	/*
		if($('.articles-page__articles').length>0){
			var articlesFilter = $('.articles-page__articles').isotope({
				itemSelector: '.articles-page__item',
				layoutMode: 'packery',
				packery: {
					gutter: 0,
				},
			});
		}

		$('.articles-page__filter .filter__button').on('click', function() {
			var filterValue = $(this).attr('data-filter');
			$(this).addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);
			articlesFilter.isotope({ filter: filterValue });
		});


		if($('.projects-page__projects').length>0){
			var projectsFilter = $('.projects-page__projects').isotope({
				itemSelector: '.projects-page__item',
				layoutMode: 'packery',
				packery: {
					gutter: 16,
				},
			});
		}


		$('.projects-page__filter .filter__button').on('click', function() {
			var filterValue = $(this).attr('data-filter');
			$(this).addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);
			projectsFilter.isotope({ filter: filterValue });
		});
	*/



	let allowTruck = true;
	$('.weights-page__tabs-dynamic .filter__button').off().on('click', function () {
		if (allowTruck) {
			allowTruck = false;
			var control = $(this);
			control.addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);

			let index = $(this).parent().index();
			let prevTruck = $('.js-img-move.active');
			let nextTruck = $('.js-img-move').eq(index);

			prevTruck.removeClass('active').addClass('out');
			setTimeout(function () {
				prevTruck.removeClass('visible')
			}, 250);
			setTimeout(function () {
				prevTruck.removeClass('out')
			}, 700);
			setTimeout(function () {
				nextTruck.addClass('active visible');
			}, 200);

			setTimeout(function () {
				allowTruck = true;
			}, 1000);
		}
	});

	$(window).on('resize', function () {
		let windowWidth = $(window).width();

		$('.filter').each(function () {
			if (windowWidth > 1079) {
				let container = $(this).closest('.container');
				let leftContainer = container.offset().left;
				let widthContainer = container.innerWidth();
				if ($(this).parents('.container--border').length > 0) {
					$(this).css('width', widthContainer);
				} else {
					$(this).css('width', windowWidth - leftContainer);
				}
			} else {
				$(this).css('width', "");
			}
		});


	});

	/*ВЫНЕС в additional.js
	//вынести в header
	var imagesPath='./images/';


	var filterScrollerHtml={
		start : '<div class="filter-scroller"><div class="slider-nav__nav"><button class="button slider-nav__button slider-nav__button--prev slider-nav__button--disabled js-fs-btn js-fs-btn--prev" tabindex="-1" aria-label="Previous slide" aria-controls="swiper-wrapper-b43b07bc7ca6f8d2" ><svg width="13" height="20"><use xlink:href="'+imagesPath+'sprite.svg#chevron-left"></use></svg></button><div class="slider-nav__pagi js-fs-dots-wrap swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">',
		dot : '<span class="slider-nav__pagi-item js-fs-dot " tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true"></span>',
		end : '</div><button class="button slider-nav__button slider-nav__button--next js-fs-btn js-fs-btn--next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-b43b07bc7ca6f8d2" > <svg width="13" height="20"><use xlink:href="'+imagesPath+'sprite.svg#chevron-right"></use></svg></button></div></div>'
	};
	var filterScrollerActiveClass='slider-nav__pagi-item-active';


	$('.filter').each(function () {
		var filter = $(this),
			inner = filter.find('.filter__inner'),
			items = filter.find('.filter__item'),
			itemsCount = items.length,
			itemsLengths = [],
			itemsLeftOffsets = [],
			blockW = filter.innerWidth(),
			innerW = inner.outerWidth(),
			currentPart=1;
			partsCount=Math.ceil(innerW/(blockW));
			if(partsCount===2 && blockW+70>=innerW){
				//нейтрализуем ситуации, при которых пространство для скролла мизерно
				partsCount=1;
			}

		var	partWidth=innerW/partsCount;








		if(partsCount<2){
			return;
		}

		filter.before(filterScrollerHtml.start+filterScrollerHtml.dot.repeat(partsCount)+filterScrollerHtml.end);
		var buttons=filter.prev();

		buttons.find('.js-fs-dot:first').addClass(filterScrollerActiveClass);



		function fs_actualizeBtns(){

			if(currentPart===1){
				buttons.find('.js-fs-btn--prev').addClass('slider-nav__button--disabled fs-disabled').siblings('.js-fs-btn').removeClass('slider-nav__button--disabled fs-disabled');
			}
			else if(currentPart===partsCount){
				buttons.find('.js-fs-btn--next').addClass('slider-nav__button--disabled fs-disabled').siblings('.js-fs-btn').removeClass('slider-nav__button--disabled fs-disabled');
			}
			else{
				buttons.find('.js-fs-btn').removeClass('slider-nav__button--disabled fs-disabled');
			}

			buttons.find('.js-fs-dot').eq(currentPart-1).addClass(filterScrollerActiveClass).siblings().removeClass(filterScrollerActiveClass);
		}


		function fs_onScroll(){
			var scrollLeft=filter.scrollLeft();
			if(scrollLeft<=30){
				currentPart=1;
			}
			else if(scrollLeft+blockW+60>=innerW){
				currentPart=partsCount;
			}
			else{
				console.log((scrollLeft+60)+' | '+partWidth);
				console.log((scrollLeft+60)/partWidth);
				currentPart=Math.ceil((scrollLeft+60)/partWidth)
			}

			fs_actualizeBtns();
		}


		buttons.find('.js-fs-btn--prev, .js-fs-btn--next').on('click', function(){
			if($(this).hasClass('js-fs-btn--prev')){
				if(currentPart>1){
					--currentPart;
				}
				else{
					return;
				}
			}
			else{
				if(currentPart<partsCount){
					++currentPart;
				}
				else{
					return;
				}
			}

			filter.off('scroll');
			filter.animate({
				scrollLeft: (currentPart-1)*partWidth
			}, 300,function(){
				filter.on('scroll', fs_onScroll);
				fs_actualizeBtns();
			});

			//! !!!!!!!!!!!!!!!
		});

		filter.on('scroll', fs_onScroll);

		$(window).on('resize', function () {
			blockW = filter.innerWidth(),
			innerW = inner.outerWidth(),
			partsCount=Math.ceil(innerW/(blockW));
			if(partsCount===2 && blockW+70>=innerW){
				//нейтрализуем ситуации, при которых пространство для скролла мизерно
				partsCount=1;
			}
			partWidth=innerW/partsCount;
			buttons.find('.js-fs-dots-wrap').html(filterScrollerHtml.dot.repeat(partsCount));
			fs_actualizeBtns();
		});

	});
*/



});