const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Get data from database.js
const productsData = require('../js/database').getProducts();
const usersData = require('../js/database').getUsers();
const cartData = require('../js/database').getCart();

async function migrateData() {
    try {
        // Migrate products
        for (const product of productsData) {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO products (
                        name, brand, price, category, image, description,
                        sizes, available_sizes, additional_images
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        product.name,
                        product.brand,
                        product.price,
                        product.category,
                        product.image,
                        product.description,
                        JSON.stringify(product.sizes),
                        JSON.stringify(product.availableSizes),
                        JSON.stringify(product.additionalImages)
                    ],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }
        console.log('Products migrated successfully');

        // Migrate users
        for (const user of usersData) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                    [user.name, user.email, hashedPassword],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }
        console.log('Users migrated successfully');

        // Migrate cart items
        for (const item of cartData) {
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO cart (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)',
                    [item.userId, item.productId, item.quantity, item.size],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }
        console.log('Cart items migrated successfully');

        console.log('All data migrated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

// Run migration
migrateData(); 