import auth from './auth.js';

class Cart {
    constructor() {
        this.items = [];
        this.loadCart();
    }

    async loadCart() {
        if (!auth.isAuthenticated()) {
            this.items = [];
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                headers: auth.getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Failed to load cart');
            }

            this.items = await response.json();
            this.updateUI();
        } catch (error) {
            console.error('Load cart error:', error);
            this.items = [];
        }
    }

    async addItem(productId, quantity = 1) {
        if (!auth.isAuthenticated()) {
            window.location.href = '/auth';
            return;
        }

        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify({ productId, quantity })
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            this.items = await response.json();
            this.updateUI();
        } catch (error) {
            console.error('Add to cart error:', error);
        }
    }

    updateUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
        }

        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            this.renderCartItems(cartItems);
        }
    }

    renderCartItems(container) {
        if (!this.items.length) {
            container.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        // Fetch product details for items in cart
        this.fetchProductDetails().then(products => {
            const html = this.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return '';
                
                return `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart-item-details">
                            <h3>${product.name}</h3>
                            <p>Price: $${product.price}</p>
                            <p>Quantity: ${item.quantity}</p>
                            <button onclick="cart.removeItem('${item.productId}')">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = html;
        });
    }

    async fetchProductDetails() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch products error:', error);
            return [];
        }
    }

    async removeItem(productId) {
        if (!auth.isAuthenticated()) {
            window.location.href = '/auth';
            return;
        }

        try {
            const response = await fetch('/api/cart/remove', {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify({ productId })
            });

            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }

            this.items = await response.json();
            this.updateUI();
        } catch (error) {
            console.error('Remove from cart error:', error);
        }
    }
}

const cart = new Cart();
export default cart;

console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}


let cartContainer = document.getElementById('cartContainer')

let boxContainerDiv = document.createElement('div')
boxContainerDiv.id = 'boxContainer'

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div')
    boxDiv.id = 'box'
    boxContainerDiv.appendChild(boxDiv)

    let boxImg = document.createElement('img')
    boxImg.src = ob.preview
    boxDiv.appendChild(boxImg)

    let boxh3 = document.createElement('h3')
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter)
    // let h3Text = document.createTextNode(ob.name)
    boxh3.appendChild(h3Text)
    boxDiv.appendChild(boxh3)

    let boxh4 = document.createElement('h4')
    let h4Text = document.createTextNode('Amount: Rs' + ob.price)
    boxh4.appendChild(h4Text)
    boxDiv.appendChild(boxh4)

    // console.log(boxContainerDiv);

    buttonLink.appendChild(buttonText)
    cartContainer.appendChild(boxContainerDiv)
    cartContainer.appendChild(totalContainerDiv)
    // let cartMain = document.createElement('div')
    // cartmain.id = 'cartMainContainer'
    // cartMain.appendChild(totalContainerDiv)

    return cartContainer
}

let totalContainerDiv = document.createElement('div')
totalContainerDiv.id = 'totalContainer'

let totalDiv = document.createElement('div')
totalDiv.id = 'total'
totalContainerDiv.appendChild(totalDiv)

let totalh2 = document.createElement('h2')
let h2Text = document.createTextNode('Total Amount')
totalh2.appendChild(h2Text)
totalDiv.appendChild(totalh2)

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4')
    // let totalh4Text = document.createTextNode(amount)
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount)
    totalh4Text.id = 'toth4'
    totalh4.appendChild(totalh4Text)
    totalDiv.appendChild(totalh4)
    totalDiv.appendChild(buttonDiv)
    console.log(totalh4);
}


let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
totalDiv.appendChild(buttonDiv)

let buttonTag = document.createElement('button')
buttonDiv.appendChild(buttonTag)

let buttonLink = document.createElement('a')
buttonLink.href = '/orderPlaced.html?'
buttonTag.appendChild(buttonLink)

buttonText = document.createTextNode('Place Order')
buttonTag.onclick = function()
{
    console.log("clicked")
}  
//dynamicCartSection()
// console.log(dynamicCartSection());

// BACKEND CALL
let httpRequest = new XMLHttpRequest()
let totalAmount = 0
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            // console.log('call successful');
            contentTitle = JSON.parse(this.responseText)

            let counter = Number(document.cookie.split(',')[1].split('=')[1])
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + counter)

            let item = document.cookie.split(',')[0].split('=')[1].split(" ")
            console.log(counter)
            console.log(item)

            let i;
            let totalAmount = 0
            for(i=0; i<counter; i++)
            {
                let itemCounter = 1
                for(let j = i+1; j<counter; j++)
                {   
                    if(Number(item[j]) == Number(item[i]))
                    {
                        itemCounter +=1;
                    }
                }
                totalAmount += Number(contentTitle[item[i]-1].price) * itemCounter
                dynamicCartSection(contentTitle[item[i]-1],itemCounter)
                i += (itemCounter-1)
            }
            amountUpdate(totalAmount)
        }
    }
        else
        {
            console.log('call failed!');
        }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true)
httpRequest.send()

// Function to check if token is expired
function isTokenExpired(token) {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expirationTime;
    } catch (error) {
        return true;
    }
}

// Function to check if user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
}

// Function to add item to cart
async function addToCart(productId) {
    if (!isUserLoggedIn()) {
        alert('กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า');
        window.location.href = '/auth';
        return;
    }

    try {
        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId })
        });

        if (!response.ok) {
            const error = await response.json();
            if (error.error === 'Token expired') {
                alert('Session หมดอายุ กรุณาเข้าสู่ระบบใหม่');
                window.location.href = '/auth';
                return;
            }
            throw new Error(error.error || 'Failed to add item to cart');
        }

        const result = await response.json();
        alert('เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว');
        updateCartCount();
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า');
    }
}

// Function to update cart count in header
async function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (!cartCountElement) return;

    if (!isUserLoggedIn()) {
        cartCountElement.textContent = '0';
        return;
    }

    try {
        const response = await fetch('/api/cart/count', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            if (error.error === 'Token expired') {
                cartCountElement.textContent = '0';
                return;
            }
            throw new Error('Failed to get cart count');
        }

        const data = await response.json();
        cartCountElement.textContent = data.count;
    } catch (error) {
        console.error('Error updating cart count:', error);
        cartCountElement.textContent = '0';
    }
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    // Update cart count every minute
    setInterval(updateCartCount, 60000);
});




