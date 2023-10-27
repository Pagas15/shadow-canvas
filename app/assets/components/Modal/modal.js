const modal = () => {
	const modal = document.querySelector('[data-modal-wrapper]');
	if(modal){
		const modalOpens = document.querySelectorAll('[data-modal-btn-open]');
		const modalClose = document.querySelectorAll('[data-modal-btn-close]');
		const modalItems = modal.querySelectorAll('[data-modal-window]');

		const obgListItems = {}
		modalItems.forEach(item => {
			obgListItems[item.dataset.modalWindow] = item;
		})

		let nowOpenModal = null;

		const closeOllModal = () => {
			for(let key in obgListItems) {
				obgListItems[key].classList.remove('active')
			}
		}
		const closeModal = () => {
			modal.classList.remove('active')
			nowOpenModal = null;
			closeOllModal();
		}

		const openModal = (identefier) => {
			if(nowOpenModal === null){
				nowOpenModal = identefier;
				obgListItems[identefier].classList.add('active');
				modal.classList.add('active')
			} else if (nowOpenModal !== identefier) {
				closeOllModal();
				nowOpenModal = identefier;
				obgListItems[identefier].classList.add('active');
			} else if (nowOpenModal === identefier) {
				closeModal()
			}
		}

		modalOpens.forEach(btn => {
			const identefier = btn.dataset.modalBtnOpen;
			btn.addEventListener('click', () => {
				openModal(identefier)
			})
		})

		modalClose.forEach(btn => {
			btn.addEventListener('click', closeModal);
		});

		modal.addEventListener('click',(e) => {
			(e.target === modal) && closeModal();
		})
	};

};

modal()