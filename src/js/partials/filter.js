$(window).on('load', function(){
	var filterItem = $('.filter__button');
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

	filterItem.on('click', function() {
		var filterValue = $(this).attr('data-filter');

		$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
		articlesFilter.isotope({ filter: filterValue });
		projectsFilter.isotope({ filter: filterValue });
	});
});