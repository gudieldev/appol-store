let productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
let productButtons = document.querySelectorAll('.modal-product-btn');

productButtons.forEach(button => {
	button.addEventListener('click', () => {
		let url = '/products/' + button.getAttribute('data-product-handle') + '.js?currency=GTQ';
		fetch( url )
		.then( response => response.json() )
		.then( (product_data) => {
			document.querySelector('.modal-product-featured-image').src = product_data.featured_image;
			document.querySelector('.modal-product-details h3').innerText = product_data.title;
			document.querySelector('.modal-product-details h5 strong').innerText = button.getAttribute('data-product-price');
			document.querySelector('.modal-product-details p').innerHTML = product_data.description;

			let variants = product_data.variants;
			let variantsSelect = document.querySelector('.modal-products-select');
			variantsSelect.innerHTML = '';
			variants.forEach( (variant, index) => {
				variantsSelect.options[variantsSelect.options.length] = new Option(variant.name, variant.id);
			} );

			productModal.show();
		})
	});
});

let createdProductModal = document.getElementById('productModal');
createdProductModal.addEventListener('hidden.bs.modal', () => {
	document.querySelector('.modal-product-featured-image').src = '';
	document.querySelector('.modal-product-details h3').innerText = '';
	document.querySelector('.modal-product-details h5 strong').innerText = '';
	document.querySelector('.modal-product-details p').innerHTML = '';
});

// Add to Cart
let addToCartForm = document.querySelector('#addToCartForm');
	if ( addToCartForm != null ) {
	// do something
	addToCartForm.addEventListener('submit', (event) => {
		event.preventDefault();
		let formData = {
			'items': [
				{
					'id': document.querySelector('.modal-products-select').value,
					'quantity': document.querySelector('.modal-product-quantity').value
				}
			]
		}

		fetch('/cart/add.js', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
		.then( (response) => {
			return response.json();
		})
		.then( (cart_data) => {
			updateCart();
		})
		.catch( (error) => {
			console.error('Error ' + error);
		});
	});
}

// Update Cart
function updateCart() {
	fetch('/cart.js')
	.then( (response) => {
		return response.json();
	} )
	.then( (cart_data) => {
		console.log(cart_data);
		document.querySelector('.badge-cart-items').innerText = cart_data.items.length;
	});
}

document.addEventListener('DOMContentLoaded', function () {
	updateCart();
});