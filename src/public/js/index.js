const socket = io();

const listProducts = document.getElementById('listProductsInRealTime');

socket.on('printProducts', (products) => {
    listProducts.innerHTML = 
        products.map((product) => {
            return `<li>${product.name} - ${product.price}</li>`;
        }).join('')
    ;
});