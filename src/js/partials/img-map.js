function jsImgMapUpdate(){
	$('.js-img-map__inner').each(function(){
		var inner=$(this);
		var innerW=inner.width();
		var innerL=inner.offset().left;
		var bodyW=$('body').width();
		//var imgMap=$(this).closest('.js-img-map');
		//console.log(innerL);
		//200(max-w)+11(отступ от центра точки)=211
		//211+4(погрешность)=215
		var maxW=215;
		var items=inner.find('.img-map-point');
	//	if(bodyW-(innerW+innerL)<=maxW){
		if(window.matchMedia("(min-width: 601px)").matches){
			items.each(function(){
				$(this).removeClass('img-map-point--centred');
				if(bodyW-maxW<=$(this).offset().left){//если крайняя левая точка настолько справа, что это всё не влезет, то
					$(this).addClass('img-map-point--left');
				}
				else{
					$(this).removeClass('img-map-point--left');
				}

			});
			items.each(function(){
				if(bodyW-maxW<=$(this).offset().left){//если крайняя левая точка настолько справа, что это всё не влезет, то
					$(this).addClass('img-map-point--left');
				}
				else{
					$(this).removeClass('img-map-point--left');
				}

			});
		}
		else{
			items.each(function(){
				if($(this).offset().left<=100){
					//в левой части экрана точка
						$(this).removeClass('img-map-point--centred').removeClass('img-map-point--left');
				}
				else{
					if(bodyW-100>$(this).offset().left){
						//в центральной части экрана точка
						$(this).removeClass('img-map-point--left').addClass('img-map-point--centred');
					}
					else{
						//в правой части экрана точка
						$(this).removeClass('img-map-point--centred').addClass('img-map-point--left');

					}
				}

			});

		}


	//	}
	});
}

$(window).on('load', function() {
	jsImgMapUpdate();

	$(window).on('resize', function() {
		jsImgMapUpdate();
	});
	//t r  <150
	//t 100% - left%<150px{left: auto; right: 0;}
});