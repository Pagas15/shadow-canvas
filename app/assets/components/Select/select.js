const selectInp = (params) => {
	const DEFAULTS = {
		wrapper: 'data-select-wrapper',
		mainBtn: 'data-select-btn',
		mainBtnContent: 'data-select-cnt',
		input: 'data-select-input',
		variantsList: 'data-select-list',
		variantBtn: 'data-select-variant',
		variantContent: 'data-select-cont',
		activeClass: 'active'
	};
	
	const objSet = {...DEFAULTS, ...params};

	const selectInput = document.querySelectorAll(`[${objSet.wrapper}]`);

	if(selectInput){
		selectInput.forEach(itemSelect => {
			const mainBtn = itemSelect.querySelector(`[${objSet.mainBtn}]`);
			const mainBtnContent = itemSelect.querySelector(`[${objSet.mainBtnContent}]`);
			const input = itemSelect.querySelector(`[${objSet.input}]`);
			const variantsList = itemSelect.querySelector(`[${objSet.variantsList}]`);
			const variantBtn = variantsList.querySelectorAll(`[${objSet.variantBtn}]`);

			const closeSelect = () => {
				itemSelect.classList.remove(objSet.activeClass);
				window.removeEventListener('click', windowClosest)
			}

			const windowClosest = event => {
				if(!(event.target.closest(`[${objSet.wrapper}]`))){
					closeSelect();
				}
			}
			const openSelect = () => {
				itemSelect.classList.add(objSet.activeClass);
				window.addEventListener('click', windowClosest)
			}

			const openClose = () => {
				itemSelect.classList.contains(objSet.activeClass) ? closeSelect() :openSelect();
			}

			const selectVariant = (kay, content) => {
				input.value = kay;
				mainBtnContent.innerHTML = content;
				closeSelect();
			}

			mainBtn.addEventListener('click', e => {
				e.preventDefault();
				openClose();
			})

			variantBtn.forEach(btn => {
				const variantBtn = btn.dataset.selectVariant;
				const variantBtnCnt = btn.querySelector(`[${objSet.variantContent}]`).innerHTML;
				btn.addEventListener('click', e => {
					e.preventDefault();
					selectVariant(variantBtn, variantBtnCnt);
				})
			})

		})
	}
}

selectInp();