$(function(){
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
	$('.weights-page__tabs-dynamic .filter__button').off().on('click', function() {
		if (allowTruck){
			allowTruck = false;
			var control=$(this);
			control.addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);

			let index = $(this).parent().index();
			let prevTruck = $('.js-img-move.active');
			let nextTruck = $('.js-img-move').eq(index);

			prevTruck.removeClass('active').addClass('out');
			setTimeout(function (){
				prevTruck.removeClass('visible')
			},250);
			setTimeout(function (){
				prevTruck.removeClass('out')
			},700);
			setTimeout(function (){
				nextTruck.addClass('active visible');
			},200);

			setTimeout(function (){
				allowTruck = true;
			},1000);
		}
	});












	$(window).on('resize',function (){
		let windowWidth = $(window).width();

		$('.filter').each(function (){
			if (windowWidth > 1079){
				let container = $(this).closest('.container');
				let leftContainer = container.offset().left;
				let widthContainer = container.innerWidth();
				if ($(this).parents('.container--border').length > 0){
					$(this).css('width',widthContainer);
				} else {
					$(this).css('width',windowWidth-leftContainer);
				}
			} else {
				$(this).css('width',"");
			}
		});


	});
});