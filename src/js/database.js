// Mock database using localStorage
const DB = {
    // Initialize database
    init() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([
                // Men's Clothing
                {
                    id: 1,
                    name: "Essential Cotton T-Shirt",
                    brand: "MALLY Basic",
                    price: 590,
                    category: "Men Clothing",
                    image: "/assets/images/men/img1.png",
                    additionalImages: [
                        "/assets/images/men/img2.png",
                        "/assets/images/men/img3.png",
                        "/assets/images/men/img4.png"
                    ],
                    description: "Classic crew neck t-shirt made from 100% soft cotton. Perfect for everyday wear with a comfortable regular fit.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["S", "M", "L", "XL"]
                },
                {
                    id: 2,
                    name: "Slim Fit Denim Jeans",
                    brand: "MALLY Denim",
                    price: 1590,
                    category: "Men Clothing",
                    image: "/assets/images/men/img2.png",
                    description: "Modern slim fit jeans in classic blue wash. Made with premium stretch denim for maximum comfort.",
                    sizes: ["28", "30", "32", "34", "36"],
                    availableSizes: ["30", "32", "34"]
                },
                {
                    id: 3,
                    name: "Classic Oxford Shirt",
                    brand: "MALLY Formal",
                    price: 1290,
                    category: "Men Clothing",
                    image: "/assets/images/men/img3.png",
                    description: "Timeless Oxford shirt in crisp white cotton. Perfect for both formal and casual occasions.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["S", "M", "L", "XL"]
                },
                {
                    id: 4,
                    name: "Casual Bomber Jacket",
                    brand: "MALLY Outerwear",
                    price: 2490,
                    category: "Men Clothing",
                    image: "/assets/images/men/img4.png",
                    description: "Stylish bomber jacket with ribbed cuffs and hem. Perfect for layering in cooler weather.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["M", "L", "XL"]
                },
                {
                    id: 5,
                    name: "Polo Sport Shirt",
                    brand: "MALLY Sport",
                    price: 890,
                    category: "Men Clothing",
                    image: "/assets/images/men/img1.png",
                    description: "Classic polo shirt with moisture-wicking fabric. Perfect for sports and casual wear.",
                    sizes: ["S", "M", "L", "XL", "XXL"],
                    availableSizes: ["S", "M", "L", "XL"]
                },
                {
                    id: 6,
                    name: "Cargo Pants",
                    brand: "MALLY Casual",
                    price: 1790,
                    category: "Men Clothing",
                    image: "/assets/images/men/img2.png",
                    description: "Comfortable cargo pants with multiple pockets. Perfect for outdoor activities.",
                    sizes: ["28", "30", "32", "34", "36"],
                    availableSizes: ["30", "32", "34", "36"]
                },
                {
                    id: 7,
                    name: "Hooded Sweatshirt",
                    brand: "MALLY Basic",
                    price: 1290,
                    category: "Men Clothing",
                    image: "/assets/images/men/img3.png",
                    description: "Cozy hooded sweatshirt with kangaroo pocket. Perfect for casual layering.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 8,
                    name: "Formal Blazer",
                    brand: "MALLY Formal",
                    price: 3990,
                    category: "Men Clothing",
                    image: "/assets/images/men/img4.png",
                    description: "Sophisticated blazer in classic navy. Perfect for formal occasions.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["M", "L", "XL"]
                },
                // Women's Clothing
                {
                    id: 9,
                    name: "Floral Summer Dress",
                    brand: "MALLY Women",
                    price: 1590,
                    category: "Women Clothing",
                    image: "/assets/images/women/img1.png",
                    description: "Beautiful floral print dress perfect for summer days.",
                    sizes: ["XS", "S", "M", "L"],
                    availableSizes: ["XS", "S", "M", "L"]
                },
                {
                    id: 10,
                    name: "High-Waist Yoga Pants",
                    brand: "MALLY Active",
                    price: 1290,
                    category: "Women Clothing",
                    image: "/assets/images/women/img2.png",
                    description: "Comfortable high-waist yoga pants with moisture-wicking fabric.",
                    sizes: ["XS", "S", "M", "L", "XL"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 11,
                    name: "Silk Blouse",
                    brand: "MALLY Elegant",
                    price: 1890,
                    category: "Women Clothing",
                    image: "/assets/images/women/img3.png",
                    description: "Elegant silk blouse with delicate details. Perfect for office wear.",
                    sizes: ["XS", "S", "M", "L"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 12,
                    name: "Denim Skirt",
                    brand: "MALLY Denim",
                    price: 1190,
                    category: "Women Clothing",
                    image: "/assets/images/women/img4.png",
                    description: "Classic denim skirt with modern A-line cut.",
                    sizes: ["XS", "S", "M", "L"],
                    availableSizes: ["XS", "S", "M", "L"]
                },
                {
                    id: 13,
                    name: "Knit Sweater",
                    brand: "MALLY Knitwear",
                    price: 1690,
                    category: "Women Clothing",
                    image: "/assets/images/women/img1.png",
                    description: "Soft knit sweater in pastel colors. Perfect for layering.",
                    sizes: ["S", "M", "L", "XL"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 14,
                    name: "Wide Leg Pants",
                    brand: "MALLY Trendy",
                    price: 1890,
                    category: "Women Clothing",
                    image: "/assets/images/women/img2.png",
                    description: "Fashionable wide leg pants with high waist.",
                    sizes: ["XS", "S", "M", "L"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 15,
                    name: "Cropped Jacket",
                    brand: "MALLY Style",
                    price: 2290,
                    category: "Women Clothing",
                    image: "/assets/images/women/img3.png",
                    description: "Trendy cropped jacket with modern design.",
                    sizes: ["S", "M", "L"],
                    availableSizes: ["S", "M", "L"]
                },
                {
                    id: 16,
                    name: "Maxi Evening Dress",
                    brand: "MALLY Elegant",
                    price: 3990,
                    category: "Women Clothing",
                    image: "/assets/images/women/img4.png",
                    description: "Elegant maxi dress perfect for evening events.",
                    sizes: ["XS", "S", "M", "L"],
                    availableSizes: ["S", "M", "L"]
                },
                // Shoes
                {
                    id: 17,
                    name: "Classic Sneakers",
                    brand: "MALLY Footwear",
                    price: 2290,
                    category: "Shoes",
                    image: "/assets/images/shoes/img1.png",
                    description: "Classic white sneakers with comfortable fit.",
                    sizes: ["36", "37", "38", "39", "40", "41", "42"],
                    availableSizes: ["37", "38", "39", "40", "41"]
                },
                {
                    id: 18,
                    name: "Running Performance",
                    brand: "MALLY Sport",
                    price: 3490,
                    category: "Shoes",
                    image: "/assets/images/shoes/img2.png",
                    description: "Professional running shoes with advanced cushioning.",
                    sizes: ["38", "39", "40", "41", "42", "43", "44"],
                    availableSizes: ["39", "40", "41", "42", "43"]
                },
                {
                    id: 19,
                    name: "Leather Oxford",
                    brand: "MALLY Formal",
                    price: 4290,
                    category: "Shoes",
                    image: "/assets/images/shoes/img3.png",
                    description: "Classic leather Oxford shoes for formal occasions.",
                    sizes: ["38", "39", "40", "41", "42", "43"],
                    availableSizes: ["39", "40", "41", "42"]
                },
                {
                    id: 20,
                    name: "Casual Loafers",
                    brand: "MALLY Comfort",
                    price: 2790,
                    category: "Shoes",
                    image: "/assets/images/shoes/img4.png",
                    description: "Comfortable loafers perfect for everyday wear.",
                    sizes: ["38", "39", "40", "41", "42"],
                    availableSizes: ["39", "40", "41"]
                },
                {
                    id: 21,
                    name: "High-Top Canvas",
                    brand: "MALLY Street",
                    price: 1890,
                    category: "Shoes",
                    image: "/assets/images/shoes/img1.png",
                    description: "Stylish high-top canvas shoes for casual wear.",
                    sizes: ["36", "37", "38", "39", "40", "41"],
                    availableSizes: ["37", "38", "39", "40"]
                },
                {
                    id: 22,
                    name: "Hiking Boots",
                    brand: "MALLY Outdoor",
                    price: 3990,
                    category: "Shoes",
                    image: "/assets/images/shoes/img2.png",
                    description: "Durable hiking boots for outdoor adventures.",
                    sizes: ["38", "39", "40", "41", "42", "43"],
                    availableSizes: ["39", "40", "41", "42"]
                },
                {
                    id: 23,
                    name: "Ballet Flats",
                    brand: "MALLY Women",
                    price: 1690,
                    category: "Shoes",
                    image: "/assets/images/shoes/img3.png",
                    description: "Elegant ballet flats for comfortable style.",
                    sizes: ["35", "36", "37", "38", "39", "40"],
                    availableSizes: ["36", "37", "38", "39"]
                },
                {
                    id: 24,
                    name: "Sport Sandals",
                    brand: "MALLY Active",
                    price: 1490,
                    category: "Shoes",
                    image: "/assets/images/shoes/img4.png",
                    description: "Comfortable sport sandals for active lifestyle.",
                    sizes: ["36", "37", "38", "39", "40", "41", "42"],
                    availableSizes: ["37", "38", "39", "40", "41"]
                },
                // Electronics
                {
                    id: 25,
                    name: "Wireless Earbuds Pro",
                    brand: "MALLY Tech",
                    price: 4990,
                    category: "Electronics",
                    image: "/assets/images/electronics/img1.png",
                    description: "Premium wireless earbuds with active noise cancellation.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 26,
                    name: "Smart Watch Elite",
                    brand: "MALLY Tech",
                    price: 7990,
                    category: "Electronics",
                    image: "/assets/images/electronics/img1.png",
                    description: "Advanced smartwatch with health monitoring features.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 27,
                    name: "Bluetooth Speaker",
                    brand: "MALLY Audio",
                    price: 3490,
                    category: "Electronics",
                    image: "/assets/images/electronics/img2.png",
                    description: "Portable Bluetooth speaker with deep bass.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 28,
                    name: "Noise Cancelling Headphones",
                    brand: "MALLY Audio",
                    price: 5990,
                    category: "Electronics",
                    image: "/assets/images/electronics/img1.png",
                    description: "Over-ear headphones with premium sound quality.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 29,
                    name: "Fitness Tracker",
                    brand: "MALLY Tech",
                    price: 2990,
                    category: "Electronics",
                    image: "/assets/images/electronics/img2.png",
                    description: "Smart fitness tracker with heart rate monitoring.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 30,
                    name: "Portable Power Bank",
                    brand: "MALLY Tech",
                    price: 1490,
                    category: "Electronics",
                    image: "/assets/images/electronics/img3.png",
                    description: "High-capacity power bank with fast charging.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 31,
                    name: "Smart Home Camera",
                    brand: "MALLY Security",
                    price: 3990,
                    category: "Electronics",
                    image: "/assets/images/electronics/img4.png",
                    description: "HD security camera with night vision.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 32,
                    name: "Gaming Mouse",
                    brand: "MALLY Gaming",
                    price: 2490,
                    category: "Electronics",
                    image: "/assets/images/electronics/img1.png",
                    description: "High-precision gaming mouse with RGB lighting.",
                    sizes: null,
                    availableSizes: null
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
    getProducts(category = null) {
        const products = JSON.parse(localStorage.getItem('products'));
        if (!category || category === 'All') {
            return products;
        }
        return products.filter(p => p.category === category);
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