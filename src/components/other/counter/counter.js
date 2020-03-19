var counters = document.querySelectorAll('[data-yam-counter]');
/**
 * Получаем данные с атрибута data-yam-counter
 * если есть обьэкт window.arrCounter получаем данные из него
 * [min,max,count]
 **/

// function
class Counter {
	constructor(element){
		this.element = element,
		this.minimum = '',
		this.maximum = '',
		this.iterator = ''
	}
	addData() {
		let parameter = this.element.getAttribute('data-yam-counter').slice(1, -1).split(',');
		// console.log(Number(parameter[0]), Number(parameter[1]), Number(parameter[2]));
		this.minimum = window.arrCounter ? arrCounter[0] : Number(parameter[0]);
		this.maximum = window.arrCounter ? arrCounter[1] : Number(parameter[1]);
		this.iterator = window.arrCounter ? arrCounter[2] : Number(parameter[2]);
		//если есть window.arrCounter перезаписуем data-yam-counter
		if(window.arrCounter) {this.element.setAttribute('data-yam-counter', `[${window.arrCounter}]`)}
	}
	plus(e) {
		let count = Number($(e.currentTarget).siblings('.counter')[0].value);
		if(window.arrCounter) this.addData();
		if(count == this.maximum)return;
		if((count + this.iterator) >= this.maximum){
			$(e.currentTarget).siblings('.counter').val(count + this.iterator);
			$(e.currentTarget).siblings('.counter').trigger('change');
			$(e.currentTarget).siblings('.error-message').fadeIn();
			return;
		}
		$(e.currentTarget).siblings('.counter').val(count + this.iterator);
		$(e.currentTarget).siblings('.counter').trigger('change');
	}
	minus(e) {
		let count = Number($(e.currentTarget).siblings('.counter')[0].value);
		if(window.arrCounter) this.addData();
		if(count <= this.minimum){return;}
		$(e.currentTarget).siblings('.counter').val(count - this.iterator);
		$(e.currentTarget).siblings('.error-message').fadeOut();
		$(e.currentTarget).siblings('.counter').trigger('change');
	}
	enterHand(e){
		if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) {
			if(e.currentTarget.value > this.maximum) {
				$(e.currentTarget).val(this.maximum);
				$(e.currentTarget).siblings('.error-message').fadeIn();
			}
			if(e.currentTarget.value < this.minimum) {
				$(e.currentTarget).val(this.minimum);
			}
		}
	}
	start() {
		this.addData();
		$(this.element).find('.minus').on('click', this.minus.bind(this));
		$(this.element).find('.plus').on('click', this.plus.bind(this));
		$(this.element).find('.counter').on('keyup', this.enterHand.bind(this));
	}
}
if(counters.length) {
	// counters
	$(counters).each(function (number, element) {
		let counter = new Counter(element);
		counter.start(element)
	})
}