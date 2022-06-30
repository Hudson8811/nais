

var globalTest = [];

var pattern_path_timers;
$(document).ready(function () {
	if (window.matchMedia('(min-width: 1080px)').matches) {

		var xMousePos = 0;
		var yMousePos = 0;
		var prevXMousePos = 0;
		var prevYMousePos = 0;
		var lastScrolledLeft = 0;
		var lastScrolledTop = 0;
		var mouseMoveDirectionBottom = false;//false=top, true=bottom


		$("body").on('mousemove mouseover', function (event) {
			if (typeof (event.pageX) !== 'undefined' && prevXMousePos !== event.pageX && prevYMousePos !== event.pageY) {
				mouseMoveDirectionBottom = yMousePos < event.pageY;
				xMousePos = event.pageX;
				yMousePos = event.pageY;
			}
		});


		var patterns_blocks = $('.pattern');
		var patterns_top_offsets_Y = [];

		patterns_blocks.each(function (index) {
			$(this).attr('data-idx', index);
			patterns_top_offsets_Y[index] = $(this).offset().top;
		});

		var pattern_block = $('.pattern'),
			pattern_inner_block = pattern_block.find('.pattern__inner'),
			pattern_svg = pattern_inner_block.find('svg'),
			pxPatternWidth = vw(7.4305555556),
			pxFirstSvgMt = vw(7),
			modified_path_h = pxPatternWidth * 0.13333,
			modified_path_margin_h = pxPatternWidth * 0.15238,
			patterns_offset_left = $('body').width() - pxPatternWidth,
			pattern_svg_h = pattern_svg.first().height() - pxPatternWidth,
			paths_in_one_svg = 16,
			one_path_h = pattern_svg_h / paths_in_one_svg;



		var pattern_path_timers = [];

		//mouseover
		$("body").on('mouseenter mouseover', '.pattern svg path', function (e) {
			trigger_pattern_pathV2($(this));
		});



		function trigger_pattern_pathV2(path) {
			if (path.length > 0 && !path.hasClass('pattern-path-hovered')) {
				var svg = path.closest('svg');

				var key = path.closest('.pattern').attr('data-idx') + "_" + path.index() + "_" + svg.index();
				//console.log(key);
				if (key in pattern_path_timers && typeof (pattern_path_timers[key]) !== 'undefined') {
					clearTimeout(pattern_path_timers[key]);
					pattern_path_timers[key] = undefined;
				}
				path.addClass('pattern-path-hovered');

				pattern_path_timers[key] = setTimeout(function () {
					path.removeClass('pattern-path-hovered');
				}, 400);
			}
		}

		function refresh_pattern() {
			var pattern = $('.pattern'),
				inner = pattern.find('.pattern__inner'),
				svg = inner.find('svg:first');

			if (window.matchMedia('(min-width: 1080px)').matches) {
				while (inner.height() < pattern.height() + window.innerHeight) {
					svg.clone().appendTo(inner);
				}
			}
			pattern_svg = pattern_inner_block.find('svg');
		}






		refresh_pattern();
		$(window).on('resize', function (e) {
			refresh_pattern();
			pattern_svg_h = pattern_svg.first().height();
			one_path_h = pattern_svg_h / paths_in_one_svg;
			pxPatternWidth = vw(7.4305555556);
			pxFirstSvgMt = vw(7);
			modified_path_h = pxPatternWidth * 0.13333;
			modified_path_margin_h = pxPatternWidth * 0.15238;
			patterns_offset_left = window.innerWidth - pxPatternWidth;
			pattern_svg_h = pattern_svg.first().height() - pxPatternWidth;
			one_path_h = pattern_svg_h / paths_in_one_svg;

			patterns_blocks.each(function (index) {
				patterns_top_offsets_Y[index] = $(this).offset();
			});



		});

		var prevPatternMouseover = [0, 0];
		$("body").on('mouseenter mouseover mousemove', '.pattern svg', function (e) {

			var svg = $(this),
				pattern = svg.closest('.pattern'),
				pattern_idx = parseInt(pattern.attr('data-idx'));

			if (!pattern.length > 0) {
				return;
			}

			var xMouseInPattern = (xMousePos - patterns_offset_left) + 1;//+1 - небольшая корректировка для срабатывания неизбежного в левом крае
			var yMouseInPattern = (yMousePos - patterns_top_offsets_Y[pattern_idx]) + 1;


			if (xMouseInPattern >= 0 && yMouseInPattern >= 0 && prevPatternMouseover[0] !== xMouseInPattern && prevPatternMouseover[1] !== yMouseInPattern) {
				prevPatternMouseover[0] = xMouseInPattern;
				prevPatternMouseover[1] = yMouseInPattern;
			}
			else {
				return;
			}

			var xReversed = pxPatternWidth - xMouseInPattern;
			var modifiedYOfPattern = Math.ceil(yMouseInPattern - xReversed);

			var target_path_number = Math.floor((modifiedYOfPattern + pxFirstSvgMt) / (modified_path_h + modified_path_margin_h));//номер(счёт с 0) элемента path. Нумерация сквозная в пределах .pattern


			var patternPaths = pattern.find('path');
			var patternPathsCount = patternPaths.length;

			if (mouseMoveDirectionBottom) {
				var prev1 = patternPaths.eq(target_path_number - 1);
				var prev2 = patternPaths.eq(target_path_number - 2);
				var prev3 = patternPaths.eq(target_path_number - 3);
				var prev4 = patternPaths.eq(target_path_number - 4);
				var prev5 = patternPaths.eq(target_path_number - 5);
				var prev6 = patternPaths.eq(target_path_number - 6);
				var prev1Fire = prev1.hasClass('pattern-path-hovered');
				var prev2Fire = prev2.hasClass('pattern-path-hovered');
				var prev3Fire = prev3.hasClass('pattern-path-hovered');
				var prev4Fire = prev4.hasClass('pattern-path-hovered');
				var prev5Fire = prev5.hasClass('pattern-path-hovered');
				var prev6Fire = prev6.hasClass('pattern-path-hovered');
				if (prev6Fire) {
					if (!prev5Fire) {
						trigger_pattern_pathV2(prev5);
					}
				}
				if (prev6Fire || prev5Fire) {
					if (!prev4Fire) {
						trigger_pattern_pathV2(prev4);
					}
				}
				if (prev6Fire || prev5Fire || prev4Fire) {
					if (!prev3Fire) {
						trigger_pattern_pathV2(prev3);
					}
				}
				if (prev6Fire || prev5Fire || prev4Fire || prev3Fire) {
					if (!prev2Fire) {
						trigger_pattern_pathV2(prev2);
					}
				}
				if (prev6Fire || prev5Fire || prev4Fire || prev3Fire || prev2Fire) {
					if (!prev1Fire) {
						trigger_pattern_pathV2(prev1);
					}
				}

			} else {
				var next1 = patternPaths.eq(target_path_number + 1);
				var next2 = patternPaths.eq(target_path_number + 2);
				var next3 = patternPaths.eq(target_path_number + 3);
				var next4 = patternPaths.eq(target_path_number + 4);
				var next5 = patternPaths.eq(target_path_number + 5);
				var next6 = patternPaths.eq(target_path_number + 6);
				var next1Fire = next1.hasClass('pattern-path-hovered');
				var next2Fire = next2.hasClass('pattern-path-hovered');
				var next3Fire = next3.hasClass('pattern-path-hovered');
				var next4Fire = next4.hasClass('pattern-path-hovered');
				var next5Fire = next5.hasClass('pattern-path-hovered');
				var next6Fire = next6.hasClass('pattern-path-hovered');



				if (next6Fire) {
					if (!next5Fire) {
						trigger_pattern_pathV2(next5);
					}
				}
				if (next6Fire || next5Fire) {
					if (!next4Fire) {
						trigger_pattern_pathV2(next4);
					}
				}
				if (next6Fire || next5Fire || next4Fire) {
					if (!next3Fire) {
						trigger_pattern_pathV2(next3);
					}
				}
				if (next6Fire || next5Fire || next4Fire || next3Fire) {
					if (!next2Fire) {
						trigger_pattern_pathV2(next2);
					}
				}
				if (next6Fire || next5Fire || next4Fire || next3Fire || next2Fire) {
					if (!next1Fire) {
						trigger_pattern_pathV2(next1);
					}
				}
			}

			trigger_pattern_pathV2(patternPaths.eq(target_path_number));
			//console.log('new-fire');

		});

		var prevElement = '';
		var scrollTimerPattern;
		var lastScrollTop = 0;

		function getPatternIdxByYPos(mouseY) {

			for (i = patterns_top_offsets_Y.length - 1; i >= 0; --i) {
				if (mouseY >= patterns_top_offsets_Y[i]) {
					return i;
				}
			}
			return -1;

		}

		$(window).on('scroll', function (e) {
			if (window.matchMedia('(min-width: 1080px)').matches) {
				if (lastScrolledTop != $(document).scrollTop()) {
					yMousePos -= lastScrolledTop;
					lastScrolledTop = $(document).scrollTop();
					yMousePos += lastScrolledTop;
				}
				if (xMousePos - patterns_offset_left >= 0) {
					var pattern_idx = getPatternIdxByYPos(yMousePos);
					var pattern = $('.pattern[data-idx="' + pattern_idx + '"]');



					if (!pattern.length > 0) {
						return;
					}

					var xMouseInPattern = (xMousePos - patterns_offset_left) + 1;//+1 - небольшая корректировка для срабатывания неизбежного в левом крае
					var yMouseInPattern = (yMousePos - patterns_top_offsets_Y[pattern_idx]) + 1;


					if (xMouseInPattern >= 0 && yMouseInPattern >= 0) {
						prevPatternMouseover[0] = xMouseInPattern;
						prevPatternMouseover[1] = yMouseInPattern;
					}
					else {
						return;
					}

					var xReversed = pxPatternWidth - xMouseInPattern;
					var modifiedYOfPattern = Math.ceil(yMouseInPattern - xReversed);

					var target_path_number = Math.floor((modifiedYOfPattern + pxFirstSvgMt) / (modified_path_h + modified_path_margin_h));//номер(счёт с 0) элемента path. Нумерация сквозная в пределах .pattern

					var patternPaths = pattern.find('path');
					var patternPathsCount = patternPaths.length;

					trigger_pattern_pathV2(patternPaths.eq(target_path_number));



					var st = window.pageYOffset || document.documentElement.scrollTop;
					if (st > lastScrollTop) {
						var prev1 = patternPaths.eq(target_path_number - 1);
						var prev2 = patternPaths.eq(target_path_number - 2);
						var prev3 = patternPaths.eq(target_path_number - 3);
						var prev4 = patternPaths.eq(target_path_number - 4);
						var prev1Fire = prev1.hasClass('pattern-path-hovered');
						var prev2Fire = prev2.hasClass('pattern-path-hovered');
						var prev3Fire = prev3.hasClass('pattern-path-hovered');
						var prev4Fire = prev4.hasClass('pattern-path-hovered');
						if (prev4Fire) {
							if (!prev3Fire) {
								trigger_pattern_pathV2(prev3);
							}
						}
						if (prev4Fire || prev3Fire) {
							if (!prev2Fire) {
								trigger_pattern_pathV2(prev2);
							}
						}
						if (prev4Fire || prev3Fire || prev2Fire) {
							if (!prev1Fire) {
								trigger_pattern_pathV2(prev1);
							}
						}

					} else {
						var next1 = patternPaths.eq(target_path_number + 1);
						var next2 = patternPaths.eq(target_path_number + 2);
						var next3 = patternPaths.eq(target_path_number + 3);
						var next4 = patternPaths.eq(target_path_number + 4);
						var next1Fire = next1.hasClass('pattern-path-hovered');
						var next2Fire = next2.hasClass('pattern-path-hovered');
						var next3Fire = next3.hasClass('pattern-path-hovered');
						var next4Fire = next4.hasClass('pattern-path-hovered');


						if (next4Fire) {
							if (!next3Fire) {
								trigger_pattern_pathV2(next3);
							}
						}
						if (next4Fire || next3Fire) {
							if (!next2Fire) {
								trigger_pattern_pathV2(next2);
							}
						}
						if (next4Fire || next3Fire || next2Fire) {
							if (!next1Fire) {
								trigger_pattern_pathV2(next1);
							}
						}

					}
					lastScrollTop = st <= 0 ? 0 : st;


				}

			}

		});
	}
});