const tabs = (params) => {
	const DEFAULTS = {
		btns: 'data-tabs-btn',
		blocks:  'data-tabs-block',
		activeClass: 'active'
	};

	const objSet = {...DEFAULTS, ...params};

	
	const btns = document.querySelectorAll(`[${objSet.btns}]`),
				tabs = document.querySelectorAll(`[${objSet.blocks}]`);
	

	if (tabs && btns) {
		const libsTabs = {};
		tabs.forEach(tab => {
			libsTabs[tab.dataset.tabsBlock] = tab;
		})

		const clearOllTabs = () => {
			tabs.forEach(item => item.classList.remove(objSet.activeClass));
			btns.forEach(item => item.classList.remove(objSet.activeClass));
		}

		const switchTab = (identifier, btn) => {
			clearOllTabs();
			libsTabs[identifier].classList.add(objSet.activeClass);
			btn && btn.classList.add(objSet.activeClass);
		}

		btns.forEach(btn => {
			const identifier = btn.dataset.tabsBtn;
			btn.addEventListener('click', () => {
				switchTab(identifier, btn)
			})
		});
	}
}

tabs();