require('nouislider/distribute/nouislider.css');
const noUiSlider = require('nouislider');
if(document.querySelectorAll('.range-slider')) {
	
	//import(/* webpackChunkName: "nouislider" */'nouislider')
		//.then((response) => {
		//	let noUiSlider = response.default;
			let rangePriceSlider = document.querySelectorAll('.range-price-slider');
			class RangeSlider {
				constructor(slider) {
					this.slider = slider;
					this.min = +slider.dataset.min;
					this.max = +slider.dataset.max;
					this.inputFrom = this.slider.previousElementSibling.querySelector('.range-price-from');
					this.inputTo = this.slider.previousElementSibling.querySelector('.range-price-to');
					this.subscribers = [];
					this.range = undefined;
					this.triggerInput = null;
				}
				triggerChangeInput() {
					let change = new Event('change');
					clearTimeout(this.triggerInput);
					this.triggerInput = setTimeout( () => {
						this.inputFrom.dispatchEvent(change);
						this.inputTo.dispatchEvent(change);
					},500);
				}
				updateInputs() {
					this.inputFrom.value = this.min;
					this.inputTo.value = this.max;
				};
				updateRange(){
					this.range.set([this.min, this.max])
				};
				changeRange(values) {
					const [min, max] = values;
					this.min = +min;
					this.max = +max;
					this.updateInputs();
					this.triggerChangeInput();
				};
				changeInputs(e) {
					if(e.target.classList.contains('range-price-from')) {
						this.min = +e.target.value.replace(/\./g, '');
					} else {
						this.max = +e.target.value.replace(/\./g, '');
					}
					this.updateRange();
					this.triggerChangeInput();
				};
				start() {
					if(this.slider !== null) {
						this.range = noUiSlider.create(this.slider, {
							start: [+this.slider.dataset.currentMin, +this.slider.dataset.currentMax],
							range: {
								'min': [this.min],
								'max': [this.max]
							},
							connect: true,
							step: 1
						});
						this.range.on('change', this.changeRange.bind(this));
						this.inputFrom.addEventListener('input', this.changeInputs.bind(this));
						this.inputTo.addEventListener('input', this.changeInputs.bind(this));
					}
				}
			}
			$(rangePriceSlider).each(function (i, el) {
				let rangeSlider = new RangeSlider(el);
				rangeSlider.start();
			});
		//})
}
