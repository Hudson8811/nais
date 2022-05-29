$(window).on('load', function(){
	var employeesVideo = $('.employees__video-preview');

	function openPopup(elem, options) {
		console.log(1);
		elem.fancybox({
			...options,
			touch: false,
			scrolling: 'no',
			beforeShow: function(){
				$("body").css({'overflow-y':'hidden'});
			},
			afterClose: function(){
				$("body").css({'overflow-y':'visible'});
			}
		});
	}

	if (employeesVideo) {
		openPopup(employeesVideo, {
			type: 'iframe'
		});
	}
});