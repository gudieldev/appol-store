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
			console.log(product_data);
			let variantsSelect = document.querySelector('.modal-product-variants');
			variantsSelect.innerHTML = '';

			variants.forEach( ( variant, index ) => {
				variantsSelect.options[variantsSelect.options.length] = new Option(variant.name, variant.id);
			});
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