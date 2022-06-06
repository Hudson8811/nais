$(window).on('load', function(){
	var filterActiveClass = 'filter__button--active';

	var articlesFilter = $('.articles-page__articles').isotope({
		itemSelector: '.articles-page__item',
		layoutMode: 'packery',
		packery: {
			gutter: 0,
		},
	});

	var projectsFilter = $('.projects-page__projects').isotope({
		itemSelector: '.projects-page__item',
		layoutMode: 'packery',
		packery: {
			gutter: 16,
		},
	});

	$('.articles-page__filter .filter__button').on('click', function() {
		var filterValue = $(this).attr('data-filter');
		$(this).addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);
		articlesFilter.isotope({ filter: filterValue });
	});


	$('.projects-page__filter .filter__button').on('click', function() {
		var filterValue = $(this).attr('data-filter');
		$(this).addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);
		projectsFilter.isotope({ filter: filterValue });
	});




	$('.weights-page__tabs-dynamic .filter__button').on('click', function() {
		$(this).addClass(filterActiveClass).parent().siblings().find('.filter__button').removeClass(filterActiveClass);
		let index = $(this).parent().index();
		$('.js-img-move').eq(index).addClass('active').siblings().removeClass('active');
	});
});