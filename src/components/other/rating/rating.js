const rating = () => {
	$('[data-yam-rating=true] label svg').on('click', function (e) {
		let parent = this.closest('[data-yam-rating]');
		$(parent).find('label').each(function () {
			$(this).removeClass('active');
		});
		$($(this).parent()).addClass('active');
	});
};
rating();
//$('body').on('ajaxResponse', function() {
//	rating();
//});
