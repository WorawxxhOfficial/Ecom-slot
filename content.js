// console.clear();

let contentTitle;

console.log(document.cookie);

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

function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("THB " + ob.price.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }));
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// Initialize database with categories and products
const categories = [
    { id: 1, name: 'เสื้อผ้าแฟชั่น', description: 'เสื้อผ้าแฟชั่นล่าสุด' },
    { id: 2, name: 'อุปกรณ์อิเล็กทรอนิกส์', description: 'อุปกรณ์อิเล็กทรอนิกส์ทันสมัย' },
    { id: 3, name: 'เครื่องสำอาง', description: 'เครื่องสำอางคุณภาพดี' },
    { id: 4, name: 'อาหารเสริม', description: 'อาหารเสริมเพื่อสุขภาพ' }
];

const products = [
    // เสื้อผ้าแฟชั่น
    {
        id: 1,
        name: 'เสื้อเชิ้ตลายสก็อต',
        description: 'เสื้อเชิ้ตลายสก็อตสไตล์เกาหลี',
        price: 590,
        category_id: 1,
        image_url: 'img/fashion/shirt1.jpg',
        stock: 50
    },
    {
        id: 2,
        name: 'กางเกงยีนส์ขายาว',
        description: 'กางเกงยีนส์ทรงกระบอก',
        price: 890,
        category_id: 1,
        image_url: 'img/fashion/jeans1.jpg',
        stock: 40
    },
    {
        id: 3,
        name: 'เดรสแขนกุด',
        description: 'เดรสแขนกุดสไตล์มินิมอล',
        price: 790,
        category_id: 1,
        image_url: 'img/fashion/dress1.jpg',
        stock: 30
    },
    {
        id: 4,
        name: 'เสื้อยืดพื้น',
        description: 'เสื้อยืดคอกลมผ้าคอตตอน',
        price: 290,
        category_id: 1,
        image_url: 'img/fashion/tshirt1.jpg',
        stock: 100
    },
    {
        id: 5,
        name: 'กระโปรงพลีท',
        description: 'กระโปรงพลีทยาวทรงเอ',
        price: 690,
        category_id: 1,
        image_url: 'img/fashion/skirt1.jpg',
        stock: 25
    },
    {
        id: 6,
        name: 'เสื้อคลุมคาร์ดิแกน',
        description: 'เสื้อคลุมไหมพรมถัก',
        price: 790,
        category_id: 1,
        image_url: 'img/fashion/cardigan1.jpg',
        stock: 35
    },

    // อุปกรณ์อิเล็กทรอนิกส์
    {
        id: 7,
        name: 'หูฟังไร้สาย',
        description: 'หูฟังบลูทูธ TWS พร้อมเคสชาร์จ',
        price: 1990,
        category_id: 2,
        image_url: 'img/electronics/earbuds1.jpg',
        stock: 30
    },
    {
        id: 8,
        name: 'สมาร์ทวอทช์',
        description: 'นาฬิกาอัจฉริยะวัดสุขภาพ',
        price: 2990,
        category_id: 2,
        image_url: 'img/electronics/smartwatch1.jpg',
        stock: 20
    },
    {
        id: 9,
        name: 'ลำโพงบลูทูธ',
        description: 'ลำโพงพกพากันน้ำ',
        price: 1490,
        category_id: 2,
        image_url: 'img/electronics/speaker1.jpg',
        stock: 25
    },
    {
        id: 10,
        name: 'แบตเตอรี่สำรอง',
        description: 'พาวเวอร์แบงค์ชาร์จเร็ว',
        price: 990,
        category_id: 2,
        image_url: 'img/electronics/powerbank1.jpg',
        stock: 40
    },
    {
        id: 11,
        name: 'กล้องเว็บแคม',
        description: 'กล้องเว็บแคม HD',
        price: 1290,
        category_id: 2,
        image_url: 'img/electronics/webcam1.jpg',
        stock: 15
    },
    {
        id: 12,
        name: 'เมาส์ไร้สาย',
        description: 'เมาส์เกมมิ่งไร้สาย',
        price: 890,
        category_id: 2,
        image_url: 'img/electronics/mouse1.jpg',
        stock: 45
    },

    // เครื่องสำอาง
    {
        id: 13,
        name: 'ครีมบำรุงผิวหน้า',
        description: 'ครีมบำรุงผิวหน้าสูตรเข้มข้น',
        price: 890,
        category_id: 3,
        image_url: 'img/cosmetics/cream1.jpg',
        stock: 30
    },
    {
        id: 14,
        name: 'เซรั่มวิตามินซี',
        description: 'เซรั่มบำรุงผิวหน้าขาวกระจ่างใส',
        price: 790,
        category_id: 3,
        image_url: 'img/cosmetics/serum1.jpg',
        stock: 25
    },
    {
        id: 15,
        name: 'มาสคาร่ากันน้ำ',
        description: 'มาสคาร่าขนตายาวเรียงเส้น',
        price: 390,
        category_id: 3,
        image_url: 'img/cosmetics/mascara1.jpg',
        stock: 40
    },
    {
        id: 16,
        name: 'ลิปสติกเนื้อแมท',
        description: 'ลิปสติกเนื้อแมทติดทนนาน',
        price: 290,
        category_id: 3,
        image_url: 'img/cosmetics/lipstick1.jpg',
        stock: 50
    },
    {
        id: 17,
        name: 'แป้งพัฟคุมมัน',
        description: 'แป้งพัฟควบคุมความมัน',
        price: 490,
        category_id: 3,
        image_url: 'img/cosmetics/powder1.jpg',
        stock: 35
    },
    {
        id: 18,
        name: 'อายแชโดว์พาเลท',
        description: 'อายแชโดว์พาเลท 12 สี',
        price: 590,
        category_id: 3,
        image_url: 'img/cosmetics/eyeshadow1.jpg',
        stock: 20
    },

    // อาหารเสริม
    {
        id: 19,
        name: 'วิตามินซี',
        description: 'วิตามินซีเสริมภูมิคุ้มกัน',
        price: 590,
        category_id: 4,
        image_url: 'img/supplements/vitaminc1.jpg',
        stock: 60
    },
    {
        id: 20,
        name: 'คอลลาเจน',
        description: 'คอลลาเจนเพื่อผิวสวย',
        price: 990,
        category_id: 4,
        image_url: 'img/supplements/collagen1.jpg',
        stock: 40
    },
    {
        id: 21,
        name: 'แคลเซียม',
        description: 'แคลเซียมเสริมกระดูก',
        price: 490,
        category_id: 4,
        image_url: 'img/supplements/calcium1.jpg',
        stock: 45
    },
    {
        id: 22,
        name: 'น้ำมันปลา',
        description: 'น้ำมันปลาโอเมก้า 3',
        price: 690,
        category_id: 4,
        image_url: 'img/supplements/fishoil1.jpg',
        stock: 50
    },
    {
        id: 23,
        name: 'มัลติวิตามิน',
        description: 'มัลติวิตามินรวม',
        price: 790,
        category_id: 4,
        image_url: 'img/supplements/multivitamin1.jpg',
        stock: 35
    },
    {
        id: 24,
        name: 'โปรตีน',
        description: 'เวย์โปรตีนเสริมกล้ามเนื้อ',
        price: 1290,
        category_id: 4,
        image_url: 'img/supplements/protein1.jpg',
        stock: 30
    }
];

// Function to create category section
function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'category-section';
    
    const heading = document.createElement('h2');
    heading.textContent = category.name;
    section.appendChild(heading);
    
    const productGrid = document.createElement('div');
    productGrid.className = 'product-grid';
    section.appendChild(productGrid);
    
    return { section, productGrid };
}

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const link = document.createElement('a');
    link.href = `productDetails.html?id=${product.id}`;
    
    const img = document.createElement('img');
    img.src = product.image_url;
    img.alt = product.name;
    link.appendChild(img);
    
    const details = document.createElement('div');
    details.className = 'product-details';
    
    const name = document.createElement('h3');
    name.textContent = product.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `฿${product.price.toLocaleString('th-TH')}`;
    
    const addToCart = document.createElement('button');
    addToCart.className = 'add-to-cart';
    addToCart.textContent = 'เพิ่มลงตะกร้า';
    addToCart.onclick = (e) => {
        e.preventDefault();
        addProductToCart(product);
    };
    
    details.appendChild(name);
    details.appendChild(price);
    details.appendChild(addToCart);
    link.appendChild(details);
    card.appendChild(link);
    
    return card;
}

// Function to add product to cart
function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show success message
    showMessage('เพิ่มสินค้าลงตะกร้าแล้ว');
}

// Function to show message
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Initialize page
async function initializePage() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = ''; // Clear existing content
    
    try {
        // Get categories and products from database
        const categoriesResult = await DB.getCategories();
        const categories = Array.from(categoriesResult.rows);
        
        for (const category of categories) {
            const { section, productGrid } = createCategorySection(category);
            
            // Get products for this category
            const productsResult = await DB.getProducts(category.id);
            const products = Array.from(productsResult.rows);
            
            products.forEach(product => {
                const productCard = createProductCard(product);
                productGrid.appendChild(productCard);
            });
            
            mainContainer.appendChild(section);
        }
    } catch (error) {
        console.error('Error initializing page:', error);
        mainContainer.innerHTML = '<h2>เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง</h2>';
    }
}

// Initialize database with sample data
async function initializeDatabase() {
    const db = DB.init();
    
    // Add categories
    for (const category of categories) {
        await db.transaction(tx => {
            tx.executeSql(
                'INSERT OR IGNORE INTO categories (id, name, description) VALUES (?, ?, ?)',
                [category.id, category.name, category.description]
            );
        });
    }
    
    // Add products
    for (const product of products) {
        await db.transaction(tx => {
            tx.executeSql(
                'INSERT OR IGNORE INTO products (id, name, description, price, category_id, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [product.id, product.name, product.description, product.price, product.category_id, product.image_url, product.stock]
            );
        });
    }
}

// Initialize everything when page loads
window.addEventListener('load', async () => {
    await initializeDatabase();
    await initializePage();
});

// Initialize database connection
const db = require('./js/db.js');

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const categoryLinks = document.querySelectorAll('.category-nav a');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close');
const quantityInput = document.getElementById('quantity');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const buyNowBtn = document.querySelector('.buy-now-btn');

// Current category
let currentCategory = 'all';
let selectedProduct = null;

// Event listeners for category navigation
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;
        
        // Update active state
        categoryLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        // Load products for selected category
        currentCategory = category;
        loadProducts();
    });
});

// Function to load products
async function loadProducts() {
    productsGrid.innerHTML = '<div class="loading">Loading products...</div>';
    
    try {
        const url = currentCategory === 'all' 
            ? '/api/products'
            : `/api/products/category/${currentCategory}`;
            
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error loading products');
        }
        
        const products = await response.json();
        
        if (products.length === 0) {
            productsGrid.innerHTML = '<div class="no-products">No products found</div>';
            return;
        }
        
        // Render products
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <a href="contentDetails.html?id=${product.id}">
                    <div class="product-image">
                        <img src="${product.image_url}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="brand">${product.brand}</h3>
                        <h2 class="name">${product.name}</h2>
                        <p class="price">$${product.price.toLocaleString('en-US')}</p>
                        <div class="stock-info">
                            <span>${product.stock} in stock</span>
                        </div>
                    </div>
                </a>
                <button class="quick-add" data-product-id="${product.id}">
                    Quick Add
                </button>
            </div>
        `).join('');
        
        // Add event listeners to quick add buttons
        document.querySelectorAll('.quick-add').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.productId;
                const product = products.find(p => p.id === parseInt(productId));
                
                if (product) {
                    // Get available sizes
                    const sizes = JSON.parse(product.available_sizes);
                    const defaultSize = sizes[0];
                    
                    // Add to cart with default size and quantity 1
                    addToCart(product, defaultSize, 1);
                }
            });
        });
        
    } catch (error) {
        console.error('Error:', error);
        productsGrid.innerHTML = '<div class="error">Error loading products</div>';
    }
}

// Function to add product to cart
function addToCart(product, size, quantity) {
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart with same size
    const existingItem = cart.find(item => 
        item.id === product.id && item.size === size
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            size: size,
            quantity: quantity
        });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    showMessage('Added to cart successfully');
}

// Function to open product modal
async function openProductModal(productId) {
    try {
        const query = `
            SELECT p.*, c.name as category_name, c.description as category_description 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `;

        db.get(query, [productId], (err, product) => {
            if (err) {
                console.error('Error loading product:', err);
                showMessage('Error loading product details', 'error');
                return;
            }

            selectedProduct = product;

            // Update modal content
            document.getElementById('modalProductImage').src = product.image_url;
            document.getElementById('modalProductImage').alt = product.name;
            document.getElementById('modalProductName').textContent = product.name;
            document.getElementById('modalProductBrand').textContent = product.description;
            document.getElementById('modalProductPrice').textContent = product.price.toLocaleString();
            document.getElementById('modalProductDescription').textContent = product.description;

            // Reset quantity
            quantityInput.value = 1;

            // Show modal
            modal.style.display = 'block';
        });
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error loading product details', 'error');
    }
}

// Quantity controls
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (btn.classList.contains('minus') && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        } else if (btn.classList.contains('plus') && currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
});

// Buy now functionality
buyNowBtn.addEventListener('click', () => {
    if (!selectedProduct) return;

    const quantity = parseInt(quantityInput.value);
    const orderItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image_url: selectedProduct.image_url,
        quantity: quantity
    };

    localStorage.setItem('buyNow', JSON.stringify(orderItem));
    window.location.href = 'checkout.html';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
