
$(document).ready(function () {
	$('.js-header__theme-switcher').on('click',function(){
		if($(this).hasClass('active')){
			$(this).siblings('.js-header__theme-switcher').trigger('click');
		}
		else{
			var alter=$(this).siblings('.js-header__theme-switcher');
			var alterName=$(this).siblings('.js-header__theme-switcher').attr('data-class');
			var name=$(this).attr('data-class');
			$(this).addClass('active');
			alter.removeClass('active');
			$('body').removeClass(alterName).addClass(name);
			localStorage.setItem('colorThemeName', name);
			globalColorThemeName=name;

			$('body').trigger('switchColorTheme');

			if(homepageMapObject!==-1){
				homepageMapObject.setOptions({styles: mapStyles[name]});

				clearMarkers();
				setTimeout(function(){
					initMarkers();
				}, 500);
			}
		}
	});
	if (localStorage.hasOwnProperty('colorThemeName')) {
		let colorThemeName = localStorage.getItem('colorThemeName');
		if(colorThemeName && colorThemeName.length>0){
			$('body').addClass(colorThemeName);
			$('.js-header__theme-switcher[data-class="'+colorThemeName+'"]').addClass('active').siblings('.js-header__theme-switcher').removeClass('active');
			globalColorThemeName=colorThemeName;
		}
	}
});