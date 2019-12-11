// ------------------------------- container-products -------------------------

class ServiceProducts {
	constructor(containerProducts, productsCatalog) {
		this.container = document.querySelector(containerProducts);
		this.productsCatalog = productsCatalog;
		this.create();
	}
	create() {
		let wrapper = document.createElement('slot');

		for(let key in this.productsCatalog) {

			let item = this.getElement({ tagName: 'div',	className: 'product-item', id: key, attribute: this.productsCatalog[key].type });
			let img =  this.getElement({ tagName: 'div', className: 'product-item__img', backgroundImage: `url(${this.productsCatalog[key].img})` });
			let name = this.getElement({ tagName: 'h3', className: 'product-item__name', innerText: this.productsCatalog[key].name });
			let price = this.getElement({ tagName: 'span', className: 'product-item__price', innerHTML: '$' + this.productsCatalog[key].price + '<sup>.00</sup>' });
			let btn = this.getElement({ tagName: 'button', className: 'product-item__btn btn', innerText: 'Купить' });

			item.addEventListener('click', function(event) {
				if(event.target.tagName == 'BUTTON') {
					let itemId = this.getAttribute('id');

					let myModal = document.querySelector('#myModal');
					myModal.style.display = 'flex';

					let modalProduct = new ModalProduct('.modal-content', itemId, productsCatalog);
				}
			});

			item.appendChild(img);
			item.appendChild(name);
			item.appendChild(price);
			item.appendChild(btn);

			wrapper.appendChild(item);
		}
		this.container.appendChild(wrapper);
	}
	getElement(options) {
		let element = document.createElement(options.tagName);

		if('className' in options) {
			element.setAttribute('class', options.className);
		}
		if('innerText' in options) {
			element.innerText = options.innerText;
		}
		if('innerHTML' in options) {
			element.innerHTML = options.innerHTML;
		}
		if('backgroundImage' in options) {
			element.style.backgroundImage = options.backgroundImage;
		}
		if('id' in options) {
			element.setAttribute('id', options.id);
		}
		if('attribute' in options) {
			element.setAttribute('device-type', options.attribute);
		}
		return element;
	}
	actions() {
		//
	}
}

let serviceProducts = new ServiceProducts('.container-products', productsCatalog)

// ----------------------- filter --------------------------------

let filterList = document.querySelectorAll('.products-filter-list input[type="checkbox"]');
for(let i = 0; i < filterList.length; i++) {
	filterList[i].addEventListener('change', filter);
}

let productList = document.querySelectorAll('.product-item');
let selectInp = [];

function filter() {
	let thisAttr = this.getAttribute('value');
	
	if(this.checked) {
		if(!selectInp.includes(thisAttr)) {
			selectInp.push(thisAttr);
		}
	}
	if(!this.checked) {
		if(selectInp.includes(thisAttr)) {
			let pos = selectInp.indexOf(thisAttr);
			selectInp.splice(pos, 1);
		}
	}
	selectCategory();
}

function selectCategory() {
	if(selectInp.length == 0) {
		for(let item of productList) {
			item.style.display = 'block';
		}
		return;
	} ;

	for(let item of productList) {
		item.style.display = 'none';
	};

	for(let item of productList) {
		for(let inp of selectInp) {
			if (inp == item.getAttribute('device-type')) {
				item.style.display = 'block';
			}
		}
	};
}
// ------------------------------------- modal ------------------------------
let myModal = document.querySelector('#myModal');
let modalContent = document.querySelector('.modal-content');


window.onclick = function(event) {
	if(event.target == myModal) {
		myModal.style.display = 'none';
		modalContent.innerHTML = '';
	}
}


class ModalProduct {
	constructor(modalContent, itemId, productsCatalog) {
		this.modalContent = document.querySelector(modalContent)
		this.productsCatalog = productsCatalog;
		this.itemId = itemId;
		this.create();
	};
	create() {
		let modalHeader = document.createElement('div');
		modalHeader.setAttribute('class', 'modal-header');
		let modalBody = document.createElement('div');
		modalBody.setAttribute('class', 'modal-body');

		let name = this.getElement({ tagName: 'p', className: 'modal-header__name', innerText: this.productsCatalog[this.itemId].name});
		let closeBtn = this.getElement({ tagName: 'span', className: 'close', innerHTML: `&times`});

		closeBtn.addEventListener('click', function() {
			myModal.style.display = 'none';
			modalContent.innerHTML = '';
		})

		modalHeader.appendChild(name);
		modalHeader.appendChild(closeBtn);

		let img = this.getElement({ tagName: 'div', className: 'modal-body__img', backgroundImage: `url(${this.productsCatalog[this.itemId].img}` });
		let paramsContainer = this.getElement({ tagName: 'div', className: 'modal-body__params'});
		let paramsContainerSetting = this.getElement({ tagName: 'div', className: 'modal-body__setting'});

		let label = '';
		if(this.productsCatalog[this.itemId].memory) {
			label = this.getElement({ tagName: 'label', innerText: 'Память'});
			let memory = this.getElementParams({ tagName: 'select', attribute: 'memory', memory: this.productsCatalog[this.itemId].memory });
			label.appendChild(memory)
			paramsContainerSetting.appendChild(label);
		}
		if(this.productsCatalog[this.itemId].color) {
			label = this.getElement({ tagName: 'label', innerText: 'Цвет'});
			let color = this.getElementParams({ tagName: 'select', attribute: 'color', color: this.productsCatalog[this.itemId].color });
			label.appendChild(color)
			paramsContainerSetting.appendChild(label);
		}
		if(this.productsCatalog[this.itemId].quantity) {
			label = this.getElement({ tagName: 'label', innerText: 'Количество'});
			let quantity = this.getElementParams({ tagName: 'select', attribute: 'quantity', quantity: this.productsCatalog[this.itemId].quantity });
			label.appendChild(quantity)
			paramsContainerSetting.appendChild(label);
		}

		paramsContainer.appendChild(paramsContainerSetting)

		let price = this.getElement({ tagName: 'span', className: 'modal-body__price', innerHTML: '$' + this.productsCatalog[this.itemId].price + '<sup>.00</sup>' });
		let btn = this.getElement({ tagName: 'button', className: 'modal-body__btn btn', innerText: 'Купить' });
		let link = this.getElement({ tagName: 'a', className: 'modal-body__link', innerText: 'Посмотреть в магазине', href: `#` });

		paramsContainer.appendChild(price);
		paramsContainer.appendChild(btn);
		paramsContainer.appendChild(link);
		

		modalBody.appendChild(img);
		modalBody.appendChild(paramsContainer);

		this.modalContent.appendChild(modalHeader);
		this.modalContent.appendChild(modalBody);
	};
	getElement(options) {
		let element = document.createElement(options.tagName);

		if('className' in options) {
			element.setAttribute('class', options.className);
		}
		if('innerText' in options) {
			element.innerText = options.innerText;
		}
		if('innerHTML' in options) {
			element.innerHTML = options.innerHTML;
		}
		if('href' in options) {
			element.setAttribute('href', options.href);
		}
		if('backgroundImage' in options) {
			element.style.backgroundImage = options.backgroundImage;
		}

		return element;
	}
	getElementParams(options) {
		let element = document.createElement(options.tagName);

		if('attribute' in options) {
			element.setAttribute('name', options.attribute);
		}
		if('memory' in options) {
			let memoryArr = this.productsCatalog[this.itemId].memory;

			for(let i = 0;i<memoryArr.length;i++) {
				let option = document.createElement('option');
				option.innerText = memoryArr[i] + 'Gb';
				option.setAttribute('value', memoryArr[i])
				element.appendChild(option);
			}
		}
		if('color' in options) {
			let colorArr = this.productsCatalog[this.itemId].color;

			for(let i = 0;i<colorArr.length;i++) {
				let option = document.createElement('option');
				option.innerText = colorArr[i];
				option.setAttribute('value', colorArr[i])
				element.appendChild(option);
			}
		}
		if('quantity' in options) {
			let quantityNum = this.productsCatalog[this.itemId].quantity;

			for(let i = 1;i<quantityNum+1;i++) {
				let option = document.createElement('option');
				option.innerText = i;
				option.setAttribute('value', i)
				element.appendChild(option);
			}
		}
		return element;
	}
	action() {
		//
	}
}
