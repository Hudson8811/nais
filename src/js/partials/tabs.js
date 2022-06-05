$(window).on('load', function(){
	var contactsTabs = $('.contacts__tabs button');
	var contactsContent = $('.contacts__content-item');
	var softwareTabs = $('.software__tabs button');
	var softwareContent = $('.software__content-item');
	var productTabs = $('.product__tabs button');
	var productContent = $('.product__content-item');
	var weightsTabs = $('.weights-page__tabs button');
	var weightsContent = $('.weights-page__about-content');

	function setTabs(tabs, content) {
		tabs.click(function () {
			if (!$(this).hasClass('active')) {
				tabs.removeClass('active');
				$(this).addClass('active');
				content.hide().eq($(this).index()).fadeIn(300);
			}
		});
	}

	setTabs(contactsTabs, contactsContent);
	setTabs(softwareTabs, softwareContent);
	setTabs(productTabs, productContent);
	setTabs(weightsTabs, weightsContent);
});