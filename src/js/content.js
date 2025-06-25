// Function to check if token is expired
function isTokenExpired(token) {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch (error) {
        return true;
    }
}

// Function to check if user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
}

// Function to get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Function to update header
function updateHeader() {
    const userMenuContainer = document.querySelector('.right-menu');
    if (!userMenuContainer) return;

    const user = getCurrentUser();
    
    if (user && isUserLoggedIn()) {
        userMenuContainer.innerHTML = `
            <div class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cartCount">0</span>
            </div>
            <div class="user-menu">
                <i class="fas fa-user"></i>
                <span class="user-name">${user.name}</span>
                <div class="dropdown-menu">
                    <a href="/profile" class="menu-item">
                        <i class="fas fa-user-circle"></i>
                        <span>Profile</span>
                    </a>
                    <a href="/orders" class="menu-item">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Orders</span>
                    </a>
                    ${user.role === 'admin' ? `
                        <a href="/admin" class="menu-item">
                            <i class="fas fa-cog"></i>
                            <span>Admin Panel</span>
                        </a>
                    ` : ''}
                    <div class="menu-item logout" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        userMenuContainer.innerHTML = `
            <div class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cartCount">0</span>
            </div>
            <div class="guest-menu" onclick="window.location.href='/auth'">
                <i class="fas fa-user"></i>
                <span class="guest-text">Login</span>
            </div>
        `;
    }

    // Update cart count
    updateCartCount();
}

// Function to update cart count
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
                logout();
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

// Function to logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth';
}

// Function to load footer content
function loadFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Us</h3>
                <p>MALLY is your one-stop shop for fashion and electronics.</p>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: support@mally.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
            <div class="footer-section">
                <h3>Follow Us</h3>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 MALLY. All rights reserved.</p>
        </div>
    `;
}

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => window.location.href = `/product-detail?id=${product.id}`;
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">฿${product.price.toLocaleString()}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
    // Check auth status and update cart count every minute
    setInterval(() => {
        if (isTokenExpired(localStorage.getItem('token'))) {
            logout();
        } else {
            updateCartCount();
        }
    }, 60000);
    loadFooter();
}); 