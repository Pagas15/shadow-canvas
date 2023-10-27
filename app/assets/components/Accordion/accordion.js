
function accordion(params) {
	const DEFAULTS = {
		kay: null,
		btns: 'data-accardioun-btn',
		blocks: 'data-accardioun-window',
		wrapper: 'data-accardioun-wrapper',
		activeClass: 'active',
		one: true,
	};

	const objSet = {...DEFAULTS, ...params};
	
	const ollAccordions =  document.querySelectorAll(!objSet.key ? `[${objSet.wrapper}]` : `[${objSet.wrapper}="${objSet.key}"]`);

	if(ollAccordions){
		const closeCards = (array) => {
			array.forEach(cartItem => {
				cartItem.classList.remove(objSet.activeClass);
			})
		}
		const closeCard = (card) => {
			card.classList.remove(objSet.activeClass);
		}

		ollAccordions.forEach(acardion => {
			const kay = !objSet.key ? acardion.dataset.accardiounWrapper : objSet.key;
			const cardsList = acardion.querySelectorAll(`[${objSet.blocks}="${kay}"]`);

			cardsList.forEach(cartItem => {
				const btn = cartItem.querySelector(`[${objSet.btns}="${kay}"]`);
				btn.addEventListener('click', () => {
					if(cartItem.classList.contains(objSet.activeClass)){
						objSet.one ? closeCards(cardsList) : closeCard(cartItem);
					} else {
						objSet.one && closeCards(cardsList);
						cartItem.classList.add(objSet.activeClass);
					}
				})
			})

		})
	}
}
accordion() 