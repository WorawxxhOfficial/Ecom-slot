console.clear()

let id = location.search.split('?')[1]
console.log(id)

// Initialize cart badge
function updateCartBadge() {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
        const badge = document.getElementById("badge");
        if (badge) {
            badge.innerHTML = totalQuantity || '0';
        }
    } catch (error) {
        console.error('Error updating cart badge:', error);
        const badge = document.getElementById("badge");
        if (badge) {
            badge.innerHTML = '0';
        }
    }
}

// Add item to cart
function addToCart(productId) {
    try {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Find if item already exists
        const existingItem = cartItems.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                productId: productId,
                quantity: 1
            });
        }
        
        // Save updated cart
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update badge
        updateCartBadge();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Update cart badge on page load
updateCartBadge();

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('THB ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    let buttonText = document.createTextNode('Add to Cart')
    buttonTag.appendChild(buttonText)

    // Add to cart click handler
    buttonTag.onclick = function() {
        addToCart(ob.id);
    }

    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}



// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'http://localhost:3000/api/products/'+id, true)
httpRequest.send()  

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// DOM Elements
const productImage = document.getElementById('productImage');
const productTitle = document.getElementById('productTitle');
const productBrand = document.getElementById('productBrand');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const sizeOptions = document.getElementById('sizeOptions');
const stockCount = document.getElementById('stockCount');
const quantityInput = document.getElementById('quantity');
const categoryName = document.getElementById('categoryName');
const productName = document.getElementById('productName');

// Modal Elements
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const closeModal = document.querySelector('.modal .close');
const summaryProductName = document.getElementById('summaryProductName');
const summarySize = document.getElementById('summarySize');
const summaryQuantity = document.getElementById('summaryQuantity');
const summaryTotal = document.getElementById('summaryTotal');

let selectedSize = '';
let currentProduct = null;

// Load product details
async function loadProductDetails() {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        
        const product = await response.json();
        currentProduct = product;
        
        // Update breadcrumb
        categoryName.textContent = product.category_name;
        productName.textContent = product.name;
        
        // Update product details
        productImage.src = product.image_url;
        productImage.alt = product.name;
        productTitle.textContent = product.name;
        productBrand.textContent = product.brand;
        productPrice.textContent = product.price.toLocaleString('en-US');
        productDescription.textContent = product.description;
        stockCount.textContent = product.stock;
        
        // Load sizes
        const sizes = JSON.parse(product.available_sizes);
        sizeOptions.innerHTML = sizes.map(size => `
            <button class="size-btn" data-size="${size}">${size}</button>
        `).join('');
        
        // Add event listeners to size buttons
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
            });
        });
        
    } catch (error) {
        console.error('Error loading product:', error);
        mainContainer.innerHTML = '<div class="error">Error loading product details</div>';
    }
}

// Quantity controls
document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateOrderSummary();
    }
});

document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
        updateOrderSummary();
    }
});

quantityInput.addEventListener('change', () => {
    const value = parseInt(quantityInput.value);
    if (value < 1) quantityInput.value = 1;
    if (value > 10) quantityInput.value = 10;
    updateOrderSummary();
});

// Add to Cart button
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    if (!selectedSize) {
        showMessage('Please select a size', 'error');
        return;
    }
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart with same size
    const existingItem = cart.find(item => 
        item.id === currentProduct.id && item.size === selectedSize
    );
    
    if (existingItem) {
        existingItem.quantity += parseInt(quantityInput.value);
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image_url: currentProduct.image_url,
            size: selectedSize,
            quantity: parseInt(quantityInput.value)
        });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    showMessage('Added to cart successfully');
});

// Buy Now button
document.querySelector('.buy-now-btn').addEventListener('click', () => {
    if (!selectedSize) {
        showMessage('Please select a size', 'error');
        return;
    }
    
    // Update order summary
    updateOrderSummary();
    
    // Show modal
    orderModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    orderModal.style.display = 'none';
});

// Update order summary
function updateOrderSummary() {
    if (!currentProduct) return;
    
    const quantity = parseInt(quantityInput.value);
    const total = currentProduct.price * quantity;
    
    summaryProductName.textContent = currentProduct.name;
    summarySize.textContent = selectedSize || 'Not selected';
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = `$${total.toLocaleString('en-US')}`;
}

// Handle order form submission
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!selectedSize) {
        showMessage('Please select a size', 'error');
        return;
    }
    
    const orderData = {
        customer_name: document.getElementById('customerName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        product_id: currentProduct.id,
        size: selectedSize,
        quantity: parseInt(quantityInput.value),
        total_amount: currentProduct.price * parseInt(quantityInput.value)
    };
    
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error('Error placing order');
        }
        
        // Order successful
        orderModal.style.display = 'none';
        showMessage('Order placed successfully');
        
        // Clear form
        orderForm.reset();
        
    } catch (error) {
        console.error('Error placing order:', error);
        showMessage('Error placing order', 'error');
    }
});

// Show message function
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Load product details when page loads
loadProductDetails();

// Create product details element
function createProductDetails(product, category) {
    const productDetails = document.createElement('div');
    productDetails.className = 'product-container';
    
    productDetails.innerHTML = `
        <div class="product-image">
            <img src="${product.image_url}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="category">${category.name}</div>
            <div class="description">${product.description}</div>
            <div class="price">฿${product.price.toLocaleString('th-TH')}</div>
            <div class="stock-info">สินค้าคงเหลือ: ${product.stock} ชิ้น</div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="updateQuantity(-1)">-</button>
                <span class="quantity">1</span>
                <button class="quantity-btn plus" onclick="updateQuantity(1)">+</button>
            </div>
            <button class="add-to-cart" onclick="addToCart()">เพิ่มลงตะกร้า</button>
        </div>
    `;
    
    return productDetails;
}

// Create related product card
function createRelatedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <a href="contentDetails.html?id=${product.id}">
            <img src="${product.image_url}" alt="${product.name}">
            <div class="details">
                <h3>${product.name}</h3>
                <div class="price">฿${product.price.toLocaleString('th-TH')}</div>
            </div>
        </a>
    `;
    
    return card;
}

// Update quantity
function updateQuantity(change) {
    const quantityElement = document.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    const stock = parseInt(document.querySelector('.stock-info').textContent.match(/\d+/)[0]);
    
    quantity += change;
    
    if (quantity < 1) quantity = 1;
    if (quantity > stock) quantity = stock;
    
    quantityElement.textContent = quantity;
}

// Add to cart
async function addToCart() {
    const productId = getProductId();
    const quantity = parseInt(document.querySelector('.quantity').textContent);
    
    try {
        const productResult = await DB.getProduct(productId);
        const product = productResult.rows[0];
        
        if (!product) {
            showMessage('ไม่พบสินค้า');
            return;
        }
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        showMessage('เพิ่มสินค้าลงตะกร้าแล้ว');
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        showMessage('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
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

// Initialize page
async function initializePage() {
    const productId = getProductId();
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        // Get product details
        const productResult = await DB.getProduct(productId);
        const product = productResult.rows[0];
        
        if (!product) {
            window.location.href = 'index.html';
            return;
        }
        
        // Get category
        const categoryResult = await DB.getCategory(product.category_id);
        const category = categoryResult.rows[0];
        
        // Update product details
        const productDetails = document.getElementById('productDetails');
        productDetails.innerHTML = '';
        productDetails.appendChild(createProductDetails(product, category));
        
        // Get related products
        const relatedResult = await DB.getProducts(product.category_id);
        const relatedProducts = Array.from(relatedResult.rows)
            .filter(p => p.id !== product.id)
            .slice(0, 4);
        
        // Add related products
        const relatedProductsContainer = document.getElementById('relatedProducts');
        relatedProducts.forEach(product => {
            relatedProductsContainer.appendChild(createRelatedProductCard(product));
        });
        
    } catch (error) {
        console.error('Error loading product:', error);
        window.location.href = 'index.html';
    }
}

// Initialize when page loads
window.addEventListener('load', initializePage);  
