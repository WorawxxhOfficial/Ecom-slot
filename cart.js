console.clear();

// Constants
const SHIPPING_COST = 50; // ค่าจัดส่ง 50 บาท

// Function to clear all cookies
function clearAllCookies() {
    // Set cookie expiration to past date to ensure deletion
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    
    // Also set our specific cookies to empty
    document.cookie = 'items=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'counter=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    
    // Reset UI
    if (document.getElementById("badge")) {
        document.getElementById("badge").innerHTML = "0";
    }
    if (document.getElementById("totalItem")) {
        document.getElementById("totalItem").innerHTML = "Total Items: 0";
    }
}

// Initialize cart if not exists
if (!document.cookie || document.cookie.indexOf('items=') < 0) {
    clearAllCookies();
}

// Update badge counter
function updateBadgeCounter() {
    const counter = document.cookie.split(',')[1].split('=')[1];
    if (document.getElementById("badge")) {
        document.getElementById("badge").innerHTML = counter;
    }
}

updateBadgeCounter();

let cartContainer = document.getElementById('cartContainer');
let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// Function to refresh page with updated cart
function refreshPage() {
    // Clear existing content
    if (cartContainer) {
        cartContainer.innerHTML = '';
    }
    if (boxContainerDiv) {
        boxContainerDiv.innerHTML = '';
    }
    
    // Reset containers
    boxContainerDiv = document.createElement('div');
    boxContainerDiv.id = 'boxContainer';
    
    // Check if cart is empty
    const items = getCartItems();
    if (items.length === 0) {
        clearAllCookies();
        if (cartContainer) {
            cartContainer.innerHTML = '<h2>Your cart is empty</h2>';
        }
        return;
    }
    
    // Reload cart data
    loadCartData();
}

// Function to update cookie and UI
function updateCookie(items, counter) {
    try {
        // Ensure items is not undefined and counter is a number
        items = items ? items.trim() : "";
        counter = parseInt(counter) || 0;

        if (counter === 0 || items === "") {
            clearAllCookies();
        } else {
            // Set cookie with path and proper expiration
            const date = new Date();
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `items=${items}; ${expires}; path=/`;
            document.cookie = `counter=${counter}; ${expires}; path=/`;
        }
        
        // Update UI
        if (document.getElementById("badge")) {
            document.getElementById("badge").innerHTML = counter.toString();
        }
        if (document.getElementById("totalItem")) {
            document.getElementById("totalItem").innerHTML = 'Total Items: ' + counter.toString();
        }
    } catch (error) {
        console.error('Error updating cookie:', error);
        clearAllCookies();
    }
}

// Function to get current cart items
function getCartItems() {
    try {
        const cookieParts = document.cookie.split(',');
        const itemsPart = cookieParts[0];
        if (itemsPart && itemsPart.includes('=')) {
            const items = itemsPart.split('=')[1].trim();
            return items ? items.split(" ").filter(item => item !== "") : [];
        }
    } catch (error) {
        console.error('Error getting cart items:', error);
        clearAllCookies();
    }
    return [];
}

// Function to get current counter
function getCounter() {
    try {
        const items = getCartItems();
        return items.length;
    } catch (error) {
        console.error('Error getting counter:', error);
        clearAllCookies();
        return 0;
    }
}

// Function to remove item
function removeItem(index, itemId) {
    try {
        let items = getCartItems();
        
        // Remove all instances of this item
        items = items.filter(item => item !== itemId.toString());
        
        // Update cookie with new items and counter
        if (items.length === 0) {
            clearAllCookies();
        } else {
            updateCookie(items.join(" "), items.length);
        }
        
        // Refresh the page content
        refreshPage();
    } catch (error) {
        console.error('Error removing item:', error);
        clearAllCookies();
        refreshPage();
    }
}

// Function to update quantity
function updateQuantity(index, itemId, change) {
    try {
        let items = getCartItems();
        
        if (change === 1) {
            // Add item
            items.push(itemId.toString());
        } else if (change === -1) {
            // Remove one instance of the item
            const itemIndex = items.lastIndexOf(itemId.toString());
            if (itemIndex !== -1) {
                items.splice(itemIndex, 1);
            }
        }
        
        // Update cookie with new items and counter
        if (items.length === 0) {
            clearAllCookies();
        } else {
            updateCookie(items.join(" "), items.length);
        }
        
        // Refresh the page content
        refreshPage();
    } catch (error) {
        console.error('Error updating quantity:', error);
        clearAllCookies();
        refreshPage();
    }
}

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter, index) {
    try {
        let boxDiv = document.createElement('div');
        boxDiv.id = 'box';
        boxContainerDiv.appendChild(boxDiv);

        let boxImg = document.createElement('img');
        boxImg.src = ob.preview;
        boxDiv.appendChild(boxImg);

        let boxh3 = document.createElement('h3');
        let h3Text = document.createTextNode(ob.name);
        boxh3.appendChild(h3Text);
        boxDiv.appendChild(boxh3);

        let boxh4 = document.createElement('h4');
        let h4Text = document.createTextNode('Amount: THB ' + ob.price.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
        boxh4.appendChild(h4Text);
        boxDiv.appendChild(boxh4);

        // Add quantity controls
        let quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity-controls';
        
        let decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'quantity-btn';
        decreaseBtn.innerHTML = '-';
        decreaseBtn.onclick = () => updateQuantity(index, ob.id, -1);
        
        let quantitySpan = document.createElement('span');
        quantitySpan.innerHTML = itemCounter.toString();
        
        let increaseBtn = document.createElement('button');
        increaseBtn.className = 'quantity-btn';
        increaseBtn.innerHTML = '+';
        increaseBtn.onclick = () => updateQuantity(index, ob.id, 1);
        
        let removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = 'Remove';
        removeBtn.onclick = () => removeItem(index, ob.id);
        
        quantityDiv.appendChild(decreaseBtn);
        quantityDiv.appendChild(quantitySpan);
        quantityDiv.appendChild(increaseBtn);
        quantityDiv.appendChild(removeBtn);
        
        boxDiv.appendChild(quantityDiv);

        if (buttonLink && buttonText) {
            buttonLink.appendChild(buttonText);
        }
        if (cartContainer) {
            cartContainer.appendChild(boxContainerDiv);
            if (totalContainerDiv) {
                cartContainer.appendChild(totalContainerDiv);
            }
        }

        return cartContainer;
    } catch (error) {
        console.error('Error creating cart section:', error);
    }
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    try {
        // Clear existing total amount if any
        const existingTotal = totalDiv.querySelector('h4');
        if (existingTotal) {
            existingTotal.remove();
        }
        
        let totalh4 = document.createElement('h4');
        let totalh4Text = document.createTextNode('Amount: THB ' + amount.toLocaleString('th-TH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
        totalh4.appendChild(totalh4Text);
        totalDiv.appendChild(totalh4);
        
        if (buttonDiv) {
            totalDiv.appendChild(buttonDiv);
        }
    } catch (error) {
        console.error('Error updating amount:', error);
    }
}

let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
buttonLink.href = '/orderPlaced.html?';
buttonTag.appendChild(buttonLink);

let buttonText = document.createTextNode('Place Order');
buttonTag.onclick = function() {
    // Clear cart when order is placed
    clearAllCookies();
    // Redirect to order placed page
    window.location.href = '/orderPlaced.html';
};

// Function to load cart data
function loadCartData() {
    const items = getCartItems();
    if (items.length === 0) {
        clearAllCookies();
        cartContainer.innerHTML = '<h2>Your cart is empty</h2>';
        amountUpdate(0);
        return;
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status == 200) {
                try {
                    const contentTitle = JSON.parse(this.responseText);
                    const counter = items.length;
                    
                    // Update total items display
                    if (document.getElementById("totalItem")) {
                        document.getElementById("totalItem").innerHTML = 'Total Items: ' + counter;
                    }
                    
                    if (items.length > 0) {
                        let totalAmount = 0;
                        const itemCounts = {};
                        
                        // Count occurrences of each item
                        items.forEach(item => {
                            if (item && item.trim() !== '') {
                                itemCounts[item] = (itemCounts[item] || 0) + 1;
                            }
                        });
                        
                        // Display each unique item with its count
                        Object.keys(itemCounts).forEach((itemId, index) => {
                            const itemIndex = parseInt(itemId) - 1;
                            if (itemIndex >= 0 && itemIndex < contentTitle.length) {
                                const itemData = contentTitle[itemIndex];
                                const count = itemCounts[itemId];
                                totalAmount += Number(itemData.price) * count;
                                dynamicCartSection(itemData, count, index);
                            }
                        });
                        
                        if (totalAmount > 0) {
                            amountUpdate(totalAmount);
                        } else {
                            clearAllCookies();
                            cartContainer.innerHTML = '<h2>Your cart is empty</h2>';
                            amountUpdate(0);
                        }
                    } else {
                        clearAllCookies();
                        cartContainer.innerHTML = '<h2>Your cart is empty</h2>';
                        amountUpdate(0);
                    }
                } catch (error) {
                    console.error('Error processing cart data:', error);
                    clearAllCookies();
                    cartContainer.innerHTML = '<h2>Error loading cart</h2>';
                }
            }
        }
    };

    httpRequest.open('GET', 'http://localhost:3000/api/products', true);
    httpRequest.send();
}

// Initial load
loadCartData();

// Cart management
class Cart {
    constructor() {
        this.items = this.getStoredItems();
        this.loadProducts();
    }

    // Get items from localStorage
    getStoredItems() {
        try {
            const stored = localStorage.getItem('cartItems');
            const items = stored ? JSON.parse(stored) : [];
            // Validate items structure
            return Array.isArray(items) ? items.filter(item => 
                item && 
                typeof item === 'object' && 
                item.productId && 
                typeof item.quantity === 'number' && 
                item.quantity > 0
            ) : [];
        } catch (error) {
            console.error('Error loading cart items:', error);
            return [];
        }
    }

    // Save items to localStorage
    saveItems() {
        try {
            // Filter out invalid items before saving
            const validItems = this.items.filter(item => 
                item && 
                typeof item === 'object' && 
                item.productId && 
                typeof item.quantity === 'number' && 
                item.quantity > 0
            );
            localStorage.setItem('cartItems', JSON.stringify(validItems));
            this.updateUI();
        } catch (error) {
            console.error('Error saving cart items:', error);
        }
    }

    // Update UI elements
    updateUI() {
        try {
            const quantity = this.getTotalQuantity();
            
            // Update cart badge
            const badge = document.getElementById('badge');
            if (badge) {
                badge.textContent = quantity > 0 ? quantity.toString() : '0';
            }

            // Update total items text
            const totalItem = document.getElementById('totalItem');
            if (totalItem) {
                totalItem.textContent = `Total Items: ${quantity > 0 ? quantity : 0}`;
            }
        } catch (error) {
            console.error('Error updating UI:', error);
        }
    }

    // Get total quantity of all items
    getTotalQuantity() {
        try {
            return this.items.reduce((total, item) => {
                const quantity = parseInt(item.quantity) || 0;
                return total + quantity;
            }, 0);
        } catch (error) {
            console.error('Error calculating total quantity:', error);
            return 0;
        }
    }

    // Add item to cart
    addItem(productId) {
        try {
            if (!productId) return;
            
            const existingItem = this.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity = (parseInt(existingItem.quantity) || 0) + 1;
            } else {
                this.items.push({ productId, quantity: 1 });
            }
            this.saveItems();
            this.renderCart();
        } catch (error) {
            console.error('Error adding item:', error);
        }
    }

    // Remove item from cart
    removeItem(productId) {
        try {
            if (!productId) return;
            
            this.items = this.items.filter(item => item.productId !== productId);
            this.saveItems();
            this.renderCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    // Update item quantity
    updateQuantity(productId, change) {
        try {
            if (!productId) return;
            
            const item = this.items.find(item => item.productId === productId);
            if (item) {
                const newQuantity = (parseInt(item.quantity) || 0) + change;
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                    this.saveItems();
                    this.renderCart();
                }
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    // Clear cart
    clearCart() {
        try {
            this.items = [];
            localStorage.removeItem('cartItems');
            this.updateUI();
            this.renderCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    // Load products from API
    loadProducts() {
        fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => {
                this.products = products;
                this.updateUI();
                this.renderCart();
            })
            .catch(error => {
                console.error('Error loading products:', error);
                const cartContainer = document.getElementById('cartContainer');
                if (cartContainer) {
                    cartContainer.innerHTML = '<h2>Error loading cart</h2>';
                }
            });
    }

    // Calculate total amount
    calculateTotal() {
        try {
            if (!this.products || !Array.isArray(this.products)) return 0;
            
            return this.items.reduce((total, item) => {
                const product = this.products.find(p => p.id === item.productId);
                const quantity = parseInt(item.quantity) || 0;
                const price = product ? parseFloat(product.price) || 0 : 0;
                return total + (price * quantity);
            }, 0);
        } catch (error) {
            console.error('Error calculating total:', error);
            return 0;
        }
    }

    // Render cart items
    renderCart() {
        try {
            const cartContainer = document.getElementById('cartContainer');
            if (!cartContainer || !this.products) return;

            // Clear existing content
            cartContainer.innerHTML = '';

            if (this.items.length === 0) {
                cartContainer.innerHTML = '<h2>Your cart is empty</h2>';
                this.renderTotal(0);
                return;
            }

            // Create container for cart items
            const itemsContainer = document.createElement('div');
            itemsContainer.id = 'boxContainer';

            // Render each item
            this.items.forEach(item => {
                const product = this.products.find(p => p.id === item.productId);
                if (!product) return;

                const itemBox = this.createItemBox(product, item);
                itemsContainer.appendChild(itemBox);
            });

            cartContainer.appendChild(itemsContainer);
            this.renderTotal(this.calculateTotal());
        } catch (error) {
            console.error('Error rendering cart:', error);
        }
    }

    // Create item box element
    createItemBox(product, item) {
        try {
            const box = document.createElement('div');
            box.className = 'cart-item';
            box.innerHTML = `
                <div class="item-image">
                    <img src="${product.preview}" alt="${product.name}">
                </div>
                <div class="item-details">
                    <h3>${product.name}</h3>
                    <h4>Amount: THB ${parseFloat(product.price).toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</h4>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${parseInt(item.quantity) || 0}</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-btn">Remove</button>
                    </div>
                </div>
            `;

            // Add event listeners
            const minusBtn = box.querySelector('.minus');
            const plusBtn = box.querySelector('.plus');
            const removeBtn = box.querySelector('.remove-btn');

            minusBtn.addEventListener('click', () => this.updateQuantity(product.id, -1));
            plusBtn.addEventListener('click', () => this.updateQuantity(product.id, 1));
            removeBtn.addEventListener('click', () => this.removeItem(product.id));

            return box;
        } catch (error) {
            console.error('Error creating item box:', error);
            return document.createElement('div');
        }
    }

    // Render total section
    renderTotal(total) {
        try {
            const totalContainer = document.createElement('div');
            totalContainer.id = 'totalContainer';
            totalContainer.innerHTML = `
                <div id="total">
                    <h2>Total Amount</h2>
                    <h4>Amount: THB ${parseFloat(total).toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</h4>
                    <div id="button">
                        <button id="placeOrder">Place Order</button>
                    </div>
                </div>
            `;

            const cartContainer = document.getElementById('cartContainer');
            if (cartContainer) {
                cartContainer.appendChild(totalContainer);
            }

            // Add place order event listener
            const placeOrderBtn = totalContainer.querySelector('#placeOrder');
            if (placeOrderBtn) {
                placeOrderBtn.addEventListener('click', () => {
                    this.clearCart();
                    window.location.href = '/orderPlaced.html';
                });
            }
        } catch (error) {
            console.error('Error rendering total:', error);
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});

// Initialize cart
function initializeCart() {
    const cartContainer = document.getElementById('cartContainer');
    const emptyCart = document.getElementById('emptyCart');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        cartContainer.appendChild(createCartItemElement(item));
    });
    
    updateCartSummary();
}

// Create cart item element
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}">
        <div class="item-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">฿${item.price.toLocaleString('th-TH')}</span>
        </div>
        <div class="quantity-controls">
            <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="remove-btn" onclick="removeItem(${item.id})">ลบ</button>
        </div>
    `;
    
    return cartItem;
}

// Update item quantity
function updateQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity < 1) {
        removeItem(itemId);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showMessage('อัพเดทจำนวนสินค้าแล้ว');
}

// Remove item from cart
function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showMessage('ลบสินค้าออกจากตะกร้าแล้ว');
}

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        document.getElementById('cartContainer').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
    } else {
        document.getElementById('cartContainer').style.display = 'block';
        document.getElementById('emptyCart').style.display = 'none';
        
        // Update quantities
        cart.forEach(item => {
            const itemElement = document.querySelector(`.cart-item[data-id="${item.id}"]`);
            if (itemElement) {
                itemElement.querySelector('.quantity').textContent = item.quantity;
            }
        });
    }
    
    updateCartSummary();
    updateCartBadge();
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `฿${subtotal.toLocaleString('th-TH')}`;
    document.getElementById('shipping').textContent = `฿${shipping.toLocaleString('th-TH')}`;
    document.getElementById('total').textContent = `฿${total.toLocaleString('th-TH')}`;
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
}

// Show message
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Handle checkout
document.getElementById('checkoutBtn').addEventListener('click', async function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_COST;
    
    try {
        const orderId = await DB.createOrder(user.id, cart, total);
        
        if (orderId) {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Show success message and redirect
            showMessage('สั่งซื้อสำเร็จ กำลังนำคุณไปยังหน้ายืนยันการสั่งซื้อ...');
            
            setTimeout(() => {
                window.location.href = `orderPlaced.html?id=${orderId}`;
            }, 2000);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        showMessage('เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองใหม่อีกครั้ง');
    }
});

// Initialize cart when page loads
window.addEventListener('load', initializeCart);




