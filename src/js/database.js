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
                    image: "/assets/images/men/men 1.jpg",
                    additionalImages: [
                        "/assets/images/men/men 1.1.jpg",
                        "/assets/images/men/men 1.2.jpg"
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
                    image: "/assets/images/men/men 2.jpg",
                    additionalImages: [
                        "/assets/images/men/men 2.1.jpg",
                        "/assets/images/men/men 2.2.jpg",
                        "/assets/images/men/men 2.3.jpg"
                    ],
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
                    image: "/assets/images/men/men 3.jpg",
                    additionalImages: [
                        "/assets/images/men/men 3.1.jpg",
                        "/assets/images/men/men 3.2.jpg",
                        "/assets/images/men/men 3.3.jpg"
                    ],
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
                    image: "/assets/images/men/men 4.jpg",
                    additionalImages: [
                        "/assets/images/men/men 4.1.jpg",
                        "/assets/images/men/men 4.2.jpg",
                        "/assets/images/men/men 4.3.jpg"
                    ],
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
                    image: "/assets/images/men/men 5.jpg",
                    additionalImages: [
                        "/assets/images/men/men 5.1.jpg",
                        "/assets/images/men/men 5.2.jpg"
                    ],
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
                    image: "/assets/images/men/men-6.jpg",
                    additionalImages: [
                        "/assets/images/men/men-6.1.jpg",
                        "/assets/images/men/men-6.2.jpg"
                    ],
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
                    image: "/assets/images/men/men-7.jpg",
                    additionalImages: [
                        "/assets/images/men/men-7.1.jpg",
                        "/assets/images/men/men-7.2.jpg"
                    ],
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
                    image: "/assets/images/men/men-8.jpg",
                    additionalImages: [
                        "/assets/images/men/men-8.1.jpg",
                        "/assets/images/men/men-8.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 1.jpg",
                    additionalImages: [
                        "/assets/images/women/women 1.1.jpg",
                        "/assets/images/women/women 1.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 2.jpg",
                    additionalImages: [
                        "/assets/images/women/women 2.1.jpg",
                        "/assets/images/women/women 2.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 3.jpg",
                    additionalImages: [
                        "/assets/images/women/women 3.1.jpg",
                        "/assets/images/women/women 3.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 4.jpg",
                    additionalImages: [
                        "/assets/images/women/women 4.1.jpg",
                        "/assets/images/women/women 4.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 5.jpg",
                    additionalImages: [
                        "/assets/images/women/women 5.1.jpg",
                        "/assets/images/women/women 5.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 6.jpg",
                    additionalImages: [
                        "/assets/images/women/women 6.1.jpg",
                        "/assets/images/women/women 6.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 7.jpg",
                    additionalImages: [
                        "/assets/images/women/women 7.1.jpg",
                        "/assets/images/women/women 7.2.jpg"
                    ],
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
                    image: "/assets/images/women/women 8.jpg",
                    additionalImages: [
                        "/assets/images/women/women 8.1.jpg",
                        "/assets/images/women/women 8.2.jpg"
                    ],
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
                    name: "Efiedir Neobuds Pro 3",
                    brand: "Efiedir",
                    price: 4990,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics1/1.1.jpeg",
                    additionalImages: [
                        "/assets/images/electronics/electronics1/1.2.jpeg",
                       "/assets/images/electronics/electronics1/1.3.jpeg",
                       "/assets/images/electronics/electronics1/1.4.jpeg"
                    ],
                    description: "The Edifier NeoBuds Pro 3 combine cutting-edge technology with sophisticated aesthetics. Enjoy breathtaking Hi-Res audio fidelity and customizable active noise cancellation, all housed in an ergonomically designed earbud for ultimate comfort. Stay connected with clear voice calls and power through your day with extended battery life.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 26,
                    name: "Edifier X2s ",
                    brand: "Edifier",
                    price: 7990,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics2/1.1.jpg",
                    additionalImages: [
                        "/assets/images/electronics/electronics2/1.2.jpg",
                       "/assets/images/electronics/electronics2/1.3.jpg"
                    ],
                    description: "The Edifier X2s earbuds deliver versatile performance for every part of your day. Immerse yourself in games with ultra-low 60ms latency in gaming mode, ensuring perfectly synchronized audio. Benefit from AI Environmental Noise Cancellation for incredibly clear phone calls, and enjoy your favorite tunes with dynamic, high-quality sound produced by 13mm drivers. These lightweight and comfortable earbuds also feature Bluetooth 5.3 for reliable connection and an IP54 rating for dust and splash resistance, making them ideal for an active lifestyle.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 27,
                    name: "Spigen Rugged Armor Pro Apple Watch 45 ",
                    brand: "Apple Watch",
                    price: 3490,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics3/1.1.jpg",
                    additionalImages: [
                        "/assets/images/electronics/electronics3/1.2.jpg",
                       "/assets/images/electronics/electronics3/1.3.jpg"
                    ],
                    description: "Give your Apple Watch the ultimate defense with the Spigen Rugged Armor Pro. This integrated case and band for 45mm Apple Watch models (Series 7/8/9, also fits 44mm SE/6/5/4) offers superior shock absorption and screen protection with raised edges. Its signature carbon fiber accents and matte finish provide a rugged yet sophisticated aesthetic. Easy to install and remove, it ensures full functionality while keeping your valuable device safe from daily wear and tear.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 28,
                    name: "UNIQ Monos 2-IN-1 Watch Strap ",
                    brand: "Apple Watch ",
                    price: 5990,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics4/1.1.png",
                    additionalImages: [
                        "/assets/images/electronics/electronics4/1.2.png",
                       "/assets/images/electronics/electronics4/1.3.png"
                    ],
                    description: "Unleash versatility with the UNIQ Monos 2-IN-1 Watch Strap. This innovative design gives you two distinct styles in a single band, perfect for adapting to any outfit or activity. Built with comfortable, premium materials for all-day wear and a secure fit, it's the only strap you'll need.",
                    sizes:  ["1", "2", "3", "4"],
                    availableSizes: [ "2", "3"]
                },
                {
                    id: 29,
                    name: "Azio Retro Compact Mechanical Keyboard EN Keycap ",
                    brand: "Azio",
                    price: 2990,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics5/1.1.jpg",
                    additionalImages: [
                        "/assets/images/electronics/electronics5/1.2.jpg",
                       "/assets/images/electronics/electronics5/1.3.jpg",
                       "/assets/images/electronics/electronics5/1.4.jpg"
                    ],
                    description: "Step back in time with the Azio Retro Compact Mechanical Keyboard, featuring a classic typewriter-inspired design beautifully blended with modern functionality. This compact keyboard boasts tactile and clicky mechanical switches (Azio Typelit by Kailh), providing a deeply satisfying typing experience that harks back to vintage machines. The round, center-lit English keycaps illuminate your workspace, while premium materials like genuine leather or real wood surfaces and a durable aluminum alloy frame ensure both a luxurious feel and lasting quality. With Bluetooth and USB hybrid connectivity, it's compatible with both Mac and PC, making it a versatile and stylish centerpiece for any desk.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 30,
                    name: "Keychron Q3 Knob TH Blue frame - Gateron Blue Switch Type B",
                    brand: "Keychron",
                    price: 1490,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics6/1.1.png",
                    additionalImages: [
                        "/assets/images/electronics/electronics6/1.2.png",
                       "/assets/images/electronics/electronics6/1.3.png",
                       "/assets/images/electronics/electronics6/1.4.png"
                    ],
                    description: "The Keychron Q3 Knob TH Blue Frame is a meticulously crafted, fully customizable mechanical keyboard designed to deliver a premium typing experience for both work and play. This specific model combines a striking aesthetic with highly satisfying tactile and auditory feedback, tailored for discerning users.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 31,
                    name: "Logitech MX Master 3s Mouse ",
                    brand: "Logitech",
                    price: 3990,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics7/1.1.png",
                    additionalImages: [
                        "/assets/images/electronics/electronics7/1.2.png",
                       "/assets/images/electronics/electronics7/1.3.png",
                       "/assets/images/electronics/electronics7/1.4.png"
                    ],
                    description: "Customizable Buttons with Logitech Options+: Personalize your workflow with seven customizable buttons, including the main clicks, forward/back buttons, thumb wheel, scroll mode shift button, and gesture button. Use the powerful Logitech Options+ software (available for Windows and macOS) to assign application-specific functions, create macros, and optimize the mouse to your unique needs.",
                    sizes: null,
                    availableSizes: null
                },
                {
                    id: 32,
                    name: "Satechi M1 Bluetooth Wireless Mouse ",
                    brand: "Satechi",
                    price: 2490,
                    category: "Electronics",
                    image: "/assets/images/electronics/electronics8/1.1.png",
                    additionalImages: [
                        "/assets/images/electronics/electronics8/1.2.png",
                       "/assets/images/electronics/electronics8/1.3.png",
                       "/assets/images/electronics/electronics8/1.4.png"
                    ],
                    description: "Elevate your workspace with the Satechi M1 Bluetooth Wireless Mouse, a perfect blend of modern aesthetics and effortless functionality. Crafted with a brushed aluminum finish and an ergonomic, curved design, it fits comfortably in your hand while complementing your contemporary desktop setup, especially Apple devices. Featuring Bluetooth 5.0 (or 4.0 depending on production batch) connectivity, it offers a reliable and stable wireless connection up to 32 feet (10 meters) away, freeing your workspace from clutter. The optical sensors provide precise tracking and fast scrolling, while the convenient USB-C rechargeable port eliminates the need for disposable batteries, ensuring you're always ready to work.",
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
        // Generate ID for new product
        const maxId = Math.max(...products.map(p => p.id), 0);
        product.id = maxId + 1;

        // Generate additional images based on the main image path
        if (!product.additionalImages) {
            const baseImagePath = product.image.substring(0, product.image.lastIndexOf('/') + 1);
            const imageNumber = product.image.substring(product.image.lastIndexOf('img') + 3, product.image.lastIndexOf('.'));
            const imageExt = product.image.substring(product.image.lastIndexOf('.'));
            
            product.additionalImages = [
                `${baseImagePath}img${(parseInt(imageNumber) % 4) + 1}${imageExt}`,
                `${baseImagePath}img${((parseInt(imageNumber) + 1) % 4) + 1}${imageExt}`,
                `${baseImagePath}img${((parseInt(imageNumber) + 2) % 4) + 1}${imageExt}`
            ];
        }

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return product;
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