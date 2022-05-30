$(window).on('load', function(){
	var parent = $('.software');
	var tar = parent.find('.software__image');

	$.getJSON('js/data/tooltip.json', function (data) {
		var coords = data.coords;

		coords.forEach(function (elem, index) {
			var top = elem.top;
			var left = elem.left;
			var markers = $('<div class="software__marker" data-index="' + index + '"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.32" cx="7" cy="7" r="7" fill="white"/><circle cx="7.00101" cy="6.9999" r="4.0303" fill="#F2802C"/></svg></div>');
			var markerContent = $('<div class="software__tooltip-content"></div>');
			var tlMarker = gsap.timeline({paused: true});

			markers.css({
				'top': top+'%',
				'left': left+'%'
			}).appendTo(tar);

			markers.each(function () {
				var that = $(this);

				markerContent.appendTo(that);
			});

			markers.hover(
				function () {
					var that = $(this);

					tlMarker
						.to(that.find('svg'), 0.3, {scale: 1.6})
						.to(markerContent, 0.3, {opacity: 1}, 0.1);
					tlMarker.play();
				},
				function () {
					tlMarker.reverse();
				}
			);
		});
	});

	$.getJSON('js/data/tooltip.json', function (data) {
		var content = data.content;
		var markers = $('.software__marker');

		markers.each(function (index) {
			var that = $(this);
			var markerContent = that.find('.software__tooltip-content');
			var curContent = content[index];
			var markerY = that.attr('style').split(';')[0].match(/-?\d+(?:\.\d+)?/g).toString();
			var markerX = that.attr('style').split(';')[1].match(/-?\d+(?:\.\d+)?/g).toString();

			markerContent.text(curContent);
			markerContent.css({
				'top': 'calc(' + markerY + '% - ' + markerContent.outerHeight() + 'px - 10px)',
				'left': ($(window).width() - (that.offset().left + that.find('.software__tooltip-content').outerWidth() + 25)) < 0
					? 'calc(' + markerX + '% - ' + markerContent.outerWidth() + 'px - 26px)'
					: 'calc(' + markerX + '% + 10px)'
			});
		});
	});
});