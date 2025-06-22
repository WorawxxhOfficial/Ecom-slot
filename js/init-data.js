const db = require('./db.js');

// Categories data
const categories = [
    { name: "All Products", slug: "all", description: "All available products" },
    { name: "Men's Clothing", slug: "mens-clothing", description: "Clothing for men" },
    { name: "Women's Clothing", slug: "womens-clothing", description: "Clothing for women" },
    { name: "Shoes", slug: "shoes", description: "Footwear for men and women" },
    { name: "Accessories", slug: "accessories", description: "Fashion accessories" }
];

// Products data
const products = [
    // Men's Clothing
    {
        name: "Men Navy Blue Solid Sweatshirt",
        description: "Classic navy blue sweatshirt for casual wear",
        price: 2599.00,
        category: "mens-clothing",
        brand: "United Colors Of Benetton",
        image_url: "img/products/mens/navy-sweatshirt.jpg",
        available_sizes: JSON.stringify(["S", "M", "L", "XL"]),
        stock: 50
    },
    {
        name: "Men Black MAMGP T7 Sweat Sporty Jacket",
        description: "Black sporty jacket with modern design",
        price: 7999.00,
        category: "mens-clothing",
        brand: "Puma",
        image_url: "img/products/mens/black-jacket.jpg",
        available_sizes: JSON.stringify(["S", "M", "L", "XL"]),
        stock: 30
    },

    // Shoes
    {
        name: "Men Black Action Parkview Lifestyle Shoes",
        description: "Classic black formal shoes for men",
        price: 6999.00,
        category: "shoes",
        brand: "Hush Puppies",
        image_url: "img/products/shoes/black-shoes.jpg",
        available_sizes: JSON.stringify(["40", "41", "42", "43", "44"]),
        stock: 25
    },

    // Women's Clothing
    {
        name: "Women Black Solid Lightweight Leather Jacket",
        description: "Stylish black leather jacket for women",
        price: 9999.00,
        category: "womens-clothing",
        brand: "BARESKIN",
        image_url: "img/products/womens/leather-jacket.jpg",
        available_sizes: JSON.stringify(["XS", "S", "M", "L"]),
        stock: 20
    },
    {
        name: "Women Blue Solid Shirt Dress",
        description: "Elegant blue shirt dress for women",
        price: 5200.00,
        category: "womens-clothing",
        brand: "SASSAFRAS",
        image_url: "img/products/womens/blue-dress.jpg",
        available_sizes: JSON.stringify(["XS", "S", "M", "L"]),
        stock: 35
    },

    // Men's Clothing
    {
        name: "Classic Oxford Shirt",
        description: "Premium cotton oxford shirt in slim fit",
        price: 1290.00,
        category: "mens-clothing",
        brand: "Ralph Lauren",
        image_url: "img/products/mens/oxford-shirt.jpg",
        available_sizes: JSON.stringify(["S", "M", "L", "XL"]),
        stock: 50
    },
    {
        name: "Slim Fit Chinos",
        description: "Comfortable cotton chinos perfect for any occasion",
        price: 1590.00,
        category: "mens-clothing",
        brand: "Levi's",
        image_url: "img/products/mens/chinos.jpg",
        available_sizes: JSON.stringify(["30", "32", "34", "36"]),
        stock: 40
    },
    {
        name: "Denim Jacket",
        description: "Classic denim jacket with modern fit",
        price: 2290.00,
        category: "mens-clothing",
        brand: "Gap",
        image_url: "img/products/mens/denim-jacket.jpg",
        available_sizes: JSON.stringify(["S", "M", "L", "XL"]),
        stock: 30
    },
    {
        name: "Cotton T-Shirt",
        description: "Essential crew neck t-shirt",
        price: 590.00,
        category: "mens-clothing",
        brand: "Uniqlo",
        image_url: "img/products/mens/tshirt.jpg",
        available_sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
        stock: 100
    },
    {
        name: "Wool Blazer",
        description: "Sophisticated wool blend blazer",
        price: 4990.00,
        category: "mens-clothing",
        brand: "Zara",
        image_url: "img/products/mens/blazer.jpg",
        available_sizes: JSON.stringify(["48", "50", "52", "54"]),
        stock: 20
    },

    // Women's Clothing
    {
        name: "Floral Maxi Dress",
        description: "Elegant floral print maxi dress",
        price: 2490.00,
        category: "womens-clothing",
        brand: "H&M",
        image_url: "img/products/womens/maxi-dress.jpg",
        available_sizes: JSON.stringify(["XS", "S", "M", "L"]),
        stock: 35
    },
    {
        name: "High-Waist Jeans",
        description: "Stretchy high-waist skinny jeans",
        price: 1890.00,
        category: "womens-clothing",
        brand: "Topshop",
        image_url: "img/products/womens/jeans.jpg",
        available_sizes: JSON.stringify(["26", "28", "30", "32"]),
        stock: 45
    },
    {
        name: "Silk Blouse",
        description: "Luxurious silk blouse with bow detail",
        price: 2990.00,
        category: "womens-clothing",
        brand: "Massimo Dutti",
        image_url: "img/products/womens/blouse.jpg",
        available_sizes: JSON.stringify(["XS", "S", "M", "L"]),
        stock: 25
    },
    {
        name: "Knit Sweater",
        description: "Soft wool blend knit sweater",
        price: 1790.00,
        category: "womens-clothing",
        brand: "COS",
        image_url: "img/products/womens/sweater.jpg",
        available_sizes: JSON.stringify(["S", "M", "L"]),
        stock: 30
    },
    {
        name: "Pleated Skirt",
        description: "Midi length pleated skirt",
        price: 1590.00,
        category: "womens-clothing",
        brand: "Zara",
        image_url: "img/products/womens/skirt.jpg",
        available_sizes: JSON.stringify(["XS", "S", "M", "L"]),
        stock: 40
    },

    // Shoes
    {
        name: "Running Sneakers",
        description: "Lightweight running shoes with cushioning",
        price: 3590.00,
        category: "shoes",
        brand: "Nike",
        image_url: "img/products/shoes/sneakers.jpg",
        available_sizes: JSON.stringify(["38", "39", "40", "41", "42", "43"]),
        stock: 40
    },
    {
        name: "High Heel Pumps",
        description: "Classic leather pumps with 3-inch heel",
        price: 2990.00,
        category: "shoes",
        brand: "Nine West",
        image_url: "img/products/shoes/pumps.jpg",
        available_sizes: JSON.stringify(["35", "36", "37", "38", "39"]),
        stock: 25
    },
    {
        name: "Canvas Sneakers",
        description: "Casual canvas sneakers",
        price: 1590.00,
        category: "shoes",
        brand: "Converse",
        image_url: "img/products/shoes/canvas.jpg",
        available_sizes: JSON.stringify(["36", "37", "38", "39", "40", "41", "42"]),
        stock: 50
    },
    {
        name: "Leather Boots",
        description: "Premium leather ankle boots",
        price: 5990.00,
        category: "shoes",
        brand: "Timberland",
        image_url: "img/products/shoes/boots.jpg",
        available_sizes: JSON.stringify(["40", "41", "42", "43", "44"]),
        stock: 15
    },

    // Accessories
    {
        name: "Leather Wallet",
        description: "Genuine leather bifold wallet",
        price: 1290.00,
        category: "accessories",
        brand: "Fossil",
        image_url: "img/products/accessories/wallet.jpg",
        available_sizes: JSON.stringify(["ONE SIZE"]),
        stock: 40
    },
    {
        name: "Silk Scarf",
        description: "Luxurious silk scarf with print",
        price: 990.00,
        category: "accessories",
        brand: "Hermès",
        image_url: "img/products/accessories/scarf.jpg",
        available_sizes: JSON.stringify(["ONE SIZE"]),
        stock: 30
    },
    {
        name: "Leather Belt",
        description: "Classic leather belt with silver buckle",
        price: 890.00,
        category: "accessories",
        brand: "Calvin Klein",
        image_url: "img/products/accessories/belt.jpg",
        available_sizes: JSON.stringify(["85", "90", "95", "100"]),
        stock: 35
    },
    {
        name: "Sunglasses",
        description: "Polarized aviator sunglasses",
        price: 2990.00,
        category: "accessories",
        brand: "Ray-Ban",
        image_url: "img/products/accessories/sunglasses.jpg",
        available_sizes: JSON.stringify(["ONE SIZE"]),
        stock: 25
    },
    {
        name: "Leather Bag",
        description: "Premium leather tote bag",
        price: 4990.00,
        category: "accessories",
        brand: "Michael Kors",
        image_url: "img/products/accessories/bag.jpg",
        available_sizes: JSON.stringify(["ONE SIZE"]),
        stock: 20
    }
];

// Function to initialize database with sample data
function initializeData() {
    // Clear existing data
    db.run('DELETE FROM products', [], (err) => {
        if (err) {
            console.error('Error clearing products:', err);
            return;
        }
        
        db.run('DELETE FROM categories', [], (err) => {
            if (err) {
                console.error('Error clearing categories:', err);
                return;
            }
            
            // Insert categories
            categories.forEach(category => {
                db.run(
                    'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
                    [category.name, category.slug, category.description],
                    function(err) {
                        if (err) {
                            console.error('Error inserting category:', err);
                            return;
                        }
                        
                        // Get the category ID
                        const categoryId = this.lastID;
                        
                        // Insert products for this category
                        products
                            .filter(product => product.category === category.slug)
                            .forEach(product => {
                                db.run(
                                    'INSERT INTO products (name, description, price, category_id, brand, image_url, available_sizes, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                                    [
                                        product.name,
                                        product.description,
                                        product.price,
                                        categoryId,
                                        product.brand,
                                        product.image_url,
                                        product.available_sizes,
                                        product.stock
                                    ],
                                    (err) => {
                                        if (err) {
                                            console.error('Error inserting product:', err);
                                        }
                                    }
                                );
                            });
                    }
                );
            });
        });
    });
}

// Initialize the database when this module is required
initializeData(); 