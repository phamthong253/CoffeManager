const products = [
	{
		id: 1,
		name: 'Black Coffee',
		cost: 20,
		img: './img/cafedenda.jpg',
	},
	{
		id: 2,
		name: 'Milk Coffee',
		cost: 25,
		img: './img/cafesuada.jpg',
	},
	{
		id: 3,
		name: 'Expresso',
		cost: 30,
		img: './img/expresso.jpg',
	},
	{
		id: 4,
		name: 'Capuchino',
		cost: 35,
		img: './img/capuchino.jpg',
	},
	{
		id: 5,
		name: 'Latte',
		cost: 35,
		img: './img/latte.jpg',
	},
	{
		id: 6,
		name: 'Mocha',
		cost: 35,
		img: './img/mocha.jpg',
	},
	{
		id: 7,
		name: 'Soda Quýt',
		cost: 35,
		img: './img/sodaquyt.jpg',
	},
	{
		id: 8,
		name: 'Soda Kiwi',
		cost: 35,
		img: './img/sodakiwi.jpg',
	},
	{
		id: 9,
		name: 'Soda Cherry',
		cost: 35,
		img: './img/sodacherry.jpg',
	},
]

// tạo dữ liệu trong localStorage, tạo object gán class và thuộc tính  cho các element 
const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getItem = (key) => JSON.parse(localStorage.getItem(key));
const createElement = (element, attr = {}) => {
	const { classList, src, innerText } = attr;
	const el = document.createElement(element);
	if (classList && typeof classList === 'object' && 'length' in classList) {
		el.classList.add(...classList);
	}

	if (src && typeof src === 'string') {
		el.src = src;
	}

	if (innerText && typeof innerText === 'string') {
		el.innerText = innerText;
	}

	return el;
}

// tạo các element cho product và gán biến tương ứng cho mỗi element 
const populateData = (container) => {
	for (const product of products) {
		const productContainer = createElement('div', { classList: ['product-item'] });
		const infoContainer = createElement('div', { classList: ['info'] });
		const title = createElement('h1', { innerText: product.name });
		const price = createElement('span', { innerText: product.cost.toString() + `,000đ` });
		const thumbnail = createElement('img', { src: product.img });
		const addBtn = createElement('button', { innerText: 'Thêm' });

// bắt sự kiện click vào nút Thêm, khi đó sẽ gán các element con vào element cha 
		addBtn.addEventListener('click', () => onAddBtnClicked(product))

		infoContainer.appendChild(title);
		infoContainer.appendChild(price);

		productContainer.appendChild(thumbnail);
		productContainer.appendChild(infoContainer);
		productContainer.appendChild(addBtn);

		container.appendChild(productContainer);
	}
	// tạo function khi click nút Thêm sẽ đẩy id của product vào localStorage
}
const onAddBtnClicked = (product) => {
	const cart = getItem('cart') ?? [];

	cart.push(product.id);

	setItem('cart', cart)
	updateCartUI();
};
// khi nhấn nút tăng thêm '+' cũng sẽ thêm id vào localStorage
const onPlusBtnClicked = (product) => {
	const cart = getItem('cart') ?? [];

	cart.push(product.id);

	setItem('cart', cart)
	updateCartUI();
}
// nhấn nút trừ '-' thì sẽ trừ id ra khỏi localStorage
const onMinusBtnClicked = (product) => {
	const cart = getItem('cart') ?? [];

	cart.splice(cart.indexOf(product.id), 1);

	setItem('cart', cart)
	updateCartUI();
}
// nhấn nút xóa 'x' thì sẽ lọc ra các value của localStorage khác với id của product thì xóa nó đi
const onRemoveBtnClicked = (product) => {
	const cart = getItem('cart') ?? [];

	setItem('cart', cart.filter((id) => product.id !== id));
	updateCartUI();
}
// nhấn nút 'hủy đơn' thì sẽ xóa phần key trong localStorage
const onCancelBtnClicked = () => {
	localStorage.removeItem('cart');
	updateCartUI();
}
// tạo function có cấu trúc dữ liệu là Map và gán cho nó key là id của product, 
// value là kiểu dữ liệu của product
const getProductMap = () => {
	const map = new Map();

	for (const product of products) {
		map.set(product.id, product);
	}

	return map;
}
// tạo biến cart là lấy key 'cart' trong localStorage và cho nó là mảng rỗngrỗng
const updateCartUI = () => {
	const productMap = getProductMap();
	const cart = getItem('cart') ?? [];
	const buckets = new Map();
	
	for (const { id } of products) {
		buckets.set(id, []);
		console.log(buckets)
	}

	for (const id of cart) {
		buckets.get(id).push(id);
	}

	const productsContainer = document.querySelector(".products");
	let total = 0;

	productsContainer.innerHTML = '';

// lặp qua biến buckets câu lệnh continue là để bỏ qua nnếu độ dài bucket == 0 
// và tiếp tục lặp tiếp  

	for (const [id, bucket] of buckets) {
		if (bucket.length === 0) {
			continue;
		}

		const product = productMap.get(id);
		const itemEl = renderBillItemUI(product, bucket);

		productsContainer.appendChild(itemEl);

		total += product.cost * bucket.length;
	}

	if (total > 0) {
		renderTotalUI(total).forEach(el => productsContainer.appendChild(el));
	}
}

const renderBillItemUI = (product, bucket) => {
	const productContainer = createElement('div', { classList: ['product'] });
	const deleteBtn = createElement('i', { classList: ['btn-remove', 'ti-close'] });
	const thumbnail = createElement('img', { src: product.img });
	const title = createElement('span', { innerText: product.name });
	const price = createElement('div', { classList: ['price'], innerText: product.cost.toString() + `,000đ` });
	const quantity = createElement('div', { classList: ['quantity'] });
	const plusBtn = createElement('span', { classList: ['btn-plus'] });
	const iconPlus = createElement('i', { classList: ['ti-plus'] });
	const iconMinus = createElement('i', { classList: ['ti-minus'] });
	const minusBtn = createElement('span', { classList: ['btn-minus'] });
	const num = createElement('span', { classList: ['curItems'], innerText: bucket.length.toString() });

	deleteBtn.addEventListener('click', () => onRemoveBtnClicked(product));

	plusBtn.appendChild(iconPlus);
	minusBtn.appendChild(iconMinus);

	plusBtn.addEventListener('click', () => onPlusBtnClicked(product));
	minusBtn.addEventListener('click', () => onMinusBtnClicked(product));

	quantity.appendChild(plusBtn);
	quantity.appendChild(num);
	quantity.appendChild(minusBtn);

	productContainer.appendChild(deleteBtn);
	productContainer.appendChild(thumbnail);
	productContainer.appendChild(title);
	productContainer.appendChild(price);
	productContainer.appendChild(quantity);

	return productContainer;
}

const renderTotalUI = (total) => {
	const totalContainer = createElement('div', { classList: ['totalContainer'] });
	const title = createElement('h4', { classList: ['totalTitle'], innerText: 'Tổng cộng đơn hàng:' });
	const bill = createElement('h4', { classList: ['totalBill'], innerText: total.toString() + `,000đ`});
	const btnContainer = createElement('div', { classList: ['billButton'] });
	const removeBtn = createElement('button', { classList: ['removeBill'], innerText: 'Hủy đơn' });
	const payBtn = createElement('button', { classList: ['payBill'], innerText: 'Thanh toán' });

	removeBtn.addEventListener('click', onCancelBtnClicked);
	payBtn.addEventListener('click', () => {
		window.location.href = 'invoice.pdf'
	})
	totalContainer.appendChild(title);
	totalContainer.appendChild(bill);

	btnContainer.appendChild(removeBtn);
	btnContainer.appendChild(payBtn);

	return [totalContainer, btnContainer];
}

document.addEventListener('DOMContentLoaded', () => {
	localStorage.clear();
	populateData(document.querySelector('.item-wrapper'));
})