/* TASK 1: THE SCRIPT FOUNDATION & DATA STRUCTURE*/
class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const products = [
    new Product(1, "Wireless Max", 299, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"),
    new Product(2, "Smart Watch Ultra", 399, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"),
    new Product(3, "Sonic Buds", 149, "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"),
    new Product(4, "Vision Glass", 899, "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400"),
    new Product(5, "Bass Cannon", 199, "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400"),
    new Product(6, "Quest Tracker", 49, "https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?w=400"),
    new Product(7, "Studio Mic", 250, "https://images.unsplash.com/photo-1558403194-611308249627?w=400"),
    new Product(8, "Titan Pro Watch", 599, "https://images.unsplash.com/photo-1508685096489-7aac291ba597?w=400"),
    new Product(9, "Legacy Pods", 129, "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"),
    new Product(10, "Eco Band", 29, "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=400")
];
let cart = JSON.parse(localStorage.getItem('techstore_cart')) || [];

/* TASK 2: DYNAMIC PRODUCT RENDERING (products.html)*/
function renderProducts() {
    const grid = document.querySelector('.product-grid');
    if (!grid) return;
    grid.innerHTML = ""; 

    products.forEach(p => {
        const article = document.createElement('article');
        
        const img = document.createElement('img');
        img.src = p.image;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = "product-info";

        const h3 = document.createElement('h3');
        h3.textContent = p.name;

        const pricePara = document.createElement('p');
        pricePara.className = "price";
        pricePara.textContent = `$${p.price}`;

        const btn = document.createElement('button');
        btn.className = "shimmer-btn add-to-cart";
        btn.textContent = "Add to Cart";
        // Linking: Store product ID in data-id attribute
        btn.setAttribute('data-id', p.id);

        // Appending
        infoDiv.appendChild(h3);
        infoDiv.appendChild(pricePara);
        article.appendChild(img);
        article.appendChild(infoDiv);
        article.appendChild(btn);
        grid.appendChild(article);
    });
}

/* TASK 3: EVENT HANDLING & THE CART (Event Delegation)*/
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(prod => prod.id === id);
        
        if (product) {
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            localStorage.setItem('techstore_cart', JSON.stringify(cart));
            
            // TASK 6: INTERACTIVE FEEDBACK
            // Instruction: Add .fade-in class and remove after timeout
            const card = e.target.closest('article');
            card.classList.add('fade-in');
            setTimeout(() => card.classList.remove('fade-in'), 500);

            // CUSTOM REDIRECT: Go to cart page after adding
            setTimeout(() => { window.location.href = 'cart.html'; }, 400);
        }
    }
});

/* TASK 3.3: RENDERING THE CART (cart.html) */
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    container.innerHTML = cart.length === 0 ? "<p>Your bag is empty.</p>" : "";
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" width="80" style="border-radius: 10px;">
            <div style="flex:1">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <input type="number" value="${item.quantity}" min="0" class="qty-change" data-index="${index}">
        `;
        container.appendChild(div);
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

/* TASK 3.4: QUANTITY ADJUSTMENT*/
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('qty-change')) {
        const idx = e.target.dataset.index;
        const val = parseInt(e.target.value);
        if (val <= 0) {
            cart.splice(idx, 1);
        } else {
            cart[idx].quantity = val;
        }
        localStorage.setItem('techstore_cart', JSON.stringify(cart));
        renderCart();
    }
});

/*TASK 4: FORM VALIDATION (checkout.html)*/
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.querySelector('input[placeholder="Full Name"]');
        if (nameInput.value.trim() === "") {
            nameInput.classList.add('error');
        } else {
            alert("Order Successful!");
            cart = [];
            localStorage.removeItem('techstore_cart');
            window.location.href = 'account.html';
        }
    });
}

/*TASK 5: USER ACCOUNT (account.html)*/
function loadUser() {
    const greeting = document.getElementById('user-greeting');
    if (greeting) {
        const currentUser = { name: "Stephanie" };
        greeting.textContent = `Welcome back, ${currentUser.name}!`;
    }
}

// Initialization
window.onload = () => {
    renderProducts();
    renderCart();
    loadUser();
};