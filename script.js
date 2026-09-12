document.addEventListener("DOMContentLoaded", () => {
    //console.log("Script loaded and running...")
    const productList =  document.getElementById("product-list");
    const cartItems =  document.getElementById("cart-items");
    const emptyCart =  document.getElementById("empty-cart");
    const cartTotal =  document.getElementById("cart-total");
    const totalPrice =  document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    
    const products = [
        { id: 1, name: "Denim Jeans", price: 50.99 },
        { id: 2, name: "T-shirt", price: 30.99 },
        { id: 3, name: "Shoes", price: 42.99 },
        { id: 4, name: "Water-Bottle", price: 12.69 },
        { id: 5, name: "Bagpack", price: 38.99 },
    ];

    //load cart from localStorage and remove invalid data
    let cart = JSON.parse(localStorage.getItem('items')) || [];
    cart = cart.filter(item => item && item.price !== undefined);
    renderCart();

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>`;
        productList.appendChild(productDiv);
    })

    productList.addEventListener('click',(e) => {
        if(e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCart();
        renderCart();
    }


    function renderCart() {
        cartItems.innerText = '';
        let total_price = 0;
        if(cart.length > 0) {
            emptyCart.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            cart.forEach((item,index) => { 
                total_price += item.price;
                const cartItem =  document.createElement('div');
                cartItem.classList.add('product');
                cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-id="${item.id}">Remove</button>`;
                cartItems.appendChild(cartItem);
               

                cartItem.querySelector('button').addEventListener('click',(e) => {
                    e.stopPropagation();
                    const cartId = parseInt(e.target.getAttribute('data-id'));
                    //console.log(cartId);
                    cart = cart.filter((c,i) => cart[i].id !== cartId );
                    saveCart();
                    renderCart();
                });
            }); 
            totalPrice.textContent = `
            $${total_price.toFixed(2)}`;
        }
        // else if(cart.length === 0) {
        //     emptyCart.classList.remove('hidden');
        //     cartTotal.classList.add('hidden');
        //     totalPrice.textContent = `
        //         $${total_price.toFixed(2)}`
        //}
        else {
            emptyCart.classList.remove('hidden');
            //cartTotal.classList.add('hidden');
           totalPrice.textContent = `
                $${total_price.toFixed(2)}`
        }


    }


    checkoutButton.addEventListener('click', () => {
        cart.length = 0;
        alert("Checkout successful");
        saveCart();
        renderCart();  
    });

    function saveCart() {
        localStorage.setItem("items",JSON.stringify(cart));
    }
});