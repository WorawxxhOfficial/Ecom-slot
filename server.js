const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Create database connection
const db = new sqlite3.Database('ecommerce.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
        
        // Initialize database with sample data
        require('./js/init-data.js');
    }
});

// API endpoint to get all products
app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name, c.description as category_description 
        FROM products p 
        JOIN categories c ON p.category_id = c.id 
        ORDER BY p.name ASC
    `;
    
    db.all(query, [], (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Error fetching products' });
            return;
        }
        res.json(products);
    });
});

// API endpoint to get products by category
app.get('/api/products/category/:slug', (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name, c.description as category_description 
        FROM products p 
        JOIN categories c ON p.category_id = c.id 
        WHERE c.slug = ?
        ORDER BY p.name ASC
    `;
    
    db.all(query, [req.params.slug], (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Error fetching products' });
            return;
        }
        res.json(products);
    });
});

// API endpoint to get a single product
app.get('/api/products/:id', (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name, c.description as category_description 
        FROM products p 
        JOIN categories c ON p.category_id = c.id 
        WHERE p.id = ?
    `;
    
    db.get(query, [req.params.id], (err, product) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: 'Error fetching product' });
            return;
        }
        
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        res.json(product);
    });
});

// API endpoint to place an order
app.post('/api/orders', (req, res) => {
    const { 
        customer_name, 
        email, 
        phone, 
        address, 
        product_id, 
        size,
        quantity,
        total_amount 
    } = req.body;
    
    // Start a transaction
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        // Insert order
        db.run(
            `INSERT INTO orders (customer_name, email, phone, address, total_amount) 
             VALUES (?, ?, ?, ?, ?)`,
            [customer_name, email, phone, address, total_amount],
            function(err) {
                if (err) {
                    console.error('Error creating order:', err);
                    db.run('ROLLBACK');
                    res.status(500).json({ error: 'Error creating order' });
                    return;
                }
                
                const orderId = this.lastID;
                
                // Insert order item
                db.run(
                    `INSERT INTO order_items (order_id, product_id, size, quantity, price) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [orderId, product_id, size, quantity, total_amount / quantity],
                    (err) => {
                        if (err) {
                            console.error('Error creating order item:', err);
                            db.run('ROLLBACK');
                            res.status(500).json({ error: 'Error creating order' });
                            return;
                        }
                        
                        // Update product stock
                        db.run(
                            'UPDATE products SET stock = stock - ? WHERE id = ?',
                            [quantity, product_id],
                            (err) => {
                                if (err) {
                                    console.error('Error updating stock:', err);
                                    db.run('ROLLBACK');
                                    res.status(500).json({ error: 'Error updating stock' });
                                    return;
                                }
                                
                                db.run('COMMIT');
                                res.json({ 
                                    message: 'Order placed successfully',
                                    orderId 
                                });
                            }
                        );
                    }
                );
            }
        );
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 