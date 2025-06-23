// Mock database using localStorage
const DB = {
    // Initialize database
    init() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([
                // Men's Clothing
                {
                    id: 1,
                    name: 'Men Navy Blue Solid Sweatshirt',
                    price: 2599,
                    category: 'Men Clothing',
                    brand: 'United Colors of Benetton',
                    image: '../../assets/images/men-sweatshirt.png',
                    description: 'Classic navy blue sweatshirt perfect for casual wear',
                    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                    availableSizes: ['M', 'L', 'XL']
                },
                {
                    id: 2,
                    name: 'Men Black MAMGP T7 Sweat Sporty Jacket',
                    price: 7999,
                    category: 'Men Clothing',
                    brand: 'Puma',
                    image: '../../assets/images/men-jacket.png',
                    description: 'Black sporty jacket with modern design',
                    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                    availableSizes: ['S', 'M', 'L']
                },
                // Women's Clothing
                {
                    id: 3,
                    name: 'Women Black Solid Lightweight Leather Jacket',
                    price: 9999,
                    category: 'Women Clothing',
                    brand: 'BARESKIN',
                    image: '../../assets/images/women-jacket.png',
                    description: 'Stylish black leather jacket for women',
                    sizes: ['S', 'M', 'L', 'XL'],
                    availableSizes: ['S', 'M', 'L']
                },
                {
                    id: 4,
                    name: 'Women Blue Solid Shirt Dress',
                    price: 5200,
                    category: 'Women Clothing',
                    brand: 'SASSAFRAS',
                    image: '../../assets/images/women-dress.png',
                    description: 'Beautiful blue shirt dress for casual occasions',
                    sizes: ['S', 'M', 'L', 'XL'],
                    availableSizes: ['S', 'M', 'L', 'XL']
                },
                // Shoes
                {
                    id: 5,
                    name: 'Men Black Action Parkview Lifestyle Shoes',
                    price: 6999,
                    category: 'Shoes',
                    brand: 'Hush Puppies',
                    image: '../../assets/images/men-shoes.png',
                    description: 'Comfortable black lifestyle shoes',
                    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
                    availableSizes: ['US 8', 'US 9', 'US 10']
                },
                // Electronics
                {
                    id: 6,
                    name: 'Unisex Silver-Toned Series 3 Smart Watch',
                    price: 31999,
                    category: 'Electronics',
                    brand: 'Apple',
                    image: '../../assets/images/smartwatch.png',
                    description: 'Advanced smartwatch with health monitoring features',
                    sizes: null
                },
                {
                    id: 7,
                    name: 'White 2nd Gen AirPods With Charging Case',
                    price: 14999,
                    category: 'Electronics',
                    brand: 'Apple',
                    image: '../../assets/images/airpods.png',
                    description: 'Premium wireless earbuds with charging case',
                    sizes: null
                }
            ]));
        }

        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }

        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    },

    // Product management methods
    addProduct(product) {
        const products = this.getProducts();
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { ...product, id: newId };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        return newProduct;
    },

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...updatedProduct, id };
            localStorage.setItem('products', JSON.stringify(products));
            return true;
        }
        return false;
    },

    deleteProduct(id) {
        const products = this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        if (filteredProducts.length < products.length) {
            localStorage.setItem('products', JSON.stringify(filteredProducts));
            return true;
        }
        return false;
    },

    // User methods
    getUsers() {
        return JSON.parse(localStorage.getItem('users'));
    },

    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },

    login(email, password) {
        const users = this.getUsers();
        return users.find(user => user.email === email && user.password === password);
    },

    // Product methods
    getProducts() {
        return JSON.parse(localStorage.getItem('products'));
    },

    getCategories() {
        const products = this.getProducts();
        return [...new Set(products.map(p => p.category))];
    },

    getProductsByCategory(category) {
        const products = this.getProducts();
        return products.filter(product => product.category === category);
    },

    searchProducts(query) {
        const products = this.getProducts();
        return products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        );
    },

    // Cart methods
    getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    },

    addToCart(productId, size = null) {
        const cart = this.getCart();
        const existingItem = cart.find(item => 
            item.productId === productId && item.size === size
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ productId, size, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    },

    updateCartItemQuantity(productId, size, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => 
            item.productId === productId && item.size === size
        );
        
        if (item) {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    },

    removeFromCart(productId, size = null) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => 
            !(item.productId === productId && item.size === size)
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    },

    clearCart() {
        localStorage.setItem('cart', JSON.stringify([]));
    },

    // Format currency
    formatPrice(price) {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(price);
    }
};

// Initialize database on load
DB.init(); 