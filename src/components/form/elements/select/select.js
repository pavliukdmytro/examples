class Select {
	constructor(select) {
		this.select = select;
		this.hiddenInput = select.querySelector('.select-hidden');
		this.autputArea = select.querySelector('.select-view');
		this.selectList = select.querySelector('.select-list');
		this.anotherClick = this.anotherClick.bind(this);
		this.selectListHandler = this.selectListHandler.bind(this);
		this.autputAreaHandler = this.autputAreaHandler.bind(this);
	}
	init() {
		let selected = $(this.select).find('.select-list li[data-selected]');
		let selectedValue =  $(selected).text();
		if(selected.length && typeof selectedValue === 'string') {
			this.hiddenInput.value = selectedValue;
			$(this.autputArea).find('span').text(selectedValue);
		};
	};
	autputAreaHandler() {
		$(this.selectList).slideToggle();
		if(!$(this.select).hasClass('open')) {
			$(this.select).addClass('open');
			window.addEventListener('click', this.anotherClick, true);
			setTimeout(() => {
				$(this.selectList).scrollTop(1);
				$(this.selectList).scrollTop(0);
			}, 300);
			return;
		}
		$(this.select).removeClass('open');
		window.removeEventListener('click', this.anotherClick, true);
	}
	selectListHandler(e) {
		let dataText = $(e.target).text();
		if(dataText !== undefined) {
			this.hiddenInput.value = $(e.target).attr('data-value');
			$(this.autputArea).find('span').text(dataText);
			$(this.hiddenInput).trigger('change');
			$(this.select).removeClass('open');
			$(this.selectList).slideUp();
		}
	};
	anotherClick(e) {
		if($(e.target).closest(this.select).length === 0) {
			$(this.select).removeClass('open');
			$(this.selectList).slideUp();
			window.removeEventListener('click', this.anotherClick, true);
		}
	}
	start() {
		this.init();
		$(this.selectList).on('click', this.selectListHandler);
		$(this.autputArea).on('click', this.autputAreaHandler);
		 new PerfectScrollbar($(this.selectList).find('ul')[0]);
		$(this.select).addClass('init');
	}
}

if($('.select').length) {
	$('.select:not(.init)').each(function (i, el) {
		let select = new Select(el);
		select.start();
	});
	//$('body').on('ajaxResponse', function () {
	//	$('.select:not(.init)').each(function (i, el) {
	//		let select = new Select(el);
	//		select.start();
	//	});
	//})
}
