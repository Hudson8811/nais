$(window).on('load', function(){
	var filterItem = $('.filter__button');
	var filterActiveClass = 'filter__button--active';

	var articles = $('.articles-page__articles').isotope({
		itemSelector: '.articles-page__item',
		layoutMode: 'packery',
		packery: {
			gutter: 0,
		},
	});

	filterItem.on('click', function() {
		var filterValue = $(this).attr('data-filter');

		$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
		articles.isotope({ filter: filterValue });
	});
});