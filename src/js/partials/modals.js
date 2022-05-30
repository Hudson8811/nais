window.addEventListener('load', () => {

	$('.js-open-modal').on('click', function () {
		$.fancybox.open({
			src: $(this).attr('href'),
			type: 'inline',
			opts: {
				//speed: 600,
				//transitionDuration: 700,
				autoFocus: false,
				backFocus: false,
				buttons: ['close'],
				smallBtn: false,
				toolbar: true,
				btnTpl: {
					close: '<button data-fancybox-close class="custom-fancybox-close custom-fancybox-close--outer" title="{{CLOSE}}">' +
						'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.0623 7.06066C19.6481 6.47487 19.6481 5.52513 19.0623 4.93934C18.4765 4.35355 17.5268 4.35355 16.941 4.93934L12.0016 9.87868L7.31066 5.18771C6.72488 4.60192 5.77513 4.60192 5.18934 5.18771C4.60355 5.77349 4.60355 6.72324 5.18934 7.30903L9.88031 12L5.18934 16.691C4.60355 17.2768 4.60355 18.2265 5.18934 18.8123C5.77513 19.3981 6.72487 19.3981 7.31066 18.8123L12.0016 14.1213L16.941 19.0607C17.5268 19.6464 18.4765 19.6464 19.0623 19.0607C19.6481 18.4749 19.6481 17.5251 19.0623 16.9393L14.123 12L19.0623 7.06066Z" fill="#467C3F"/></svg>' +
						"</button>"

				},
				baseClass: 'fancybox-default-modal fancybox-default-modal--non-hide-toolbar',
				touch: false,

				afterShow: function (instance, slide) {

				}
			}


		});
	});


	$('.js-simple-select').each(function(index ){
		var placeholder=$(this).attr('data-placeholder');
		if(placeholder.length>0){
			$(this).addClass('simple-select--placeholder-selected');
		}

		$(this).select2({
			language: 'ru',
			theme: 'custom-theme',
			minimumResultsForSearch: Infinity,
			width: '100%',
			dropdownParent: $(this).siblings('.simple-select-items-wrapper')
		}).on('select2:open', function (e) {
			$(this).siblings('.simple-select-items-wrapper').addClass('simple-select-items-wrapper--show');
		}).on('select2:closing', function (e) {
			if($(this).attr('data-close-anvaliable')!=='1'){
				e.preventDefault();
				var $this=$(this);
				$(this).attr('data-close-anvaliable','1');
				$(this).siblings('.simple-select-items-wrapper').removeClass('simple-select-items-wrapper--show');
				setTimeout(function(){
					$this.select2('close');
				},550);
			}
			else{
				$(this).attr('data-close-anvaliable','2');
			}
			//$(this).select2('close');

		}).on('select2:select', function (e) {
			$(this).removeClass('simple-select--placeholder-selected');
		});
	});
});
