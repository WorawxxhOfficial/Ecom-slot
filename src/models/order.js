const db = require('../config/database');

class Order {
    static async create(userId, cartItems, totalAmount) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                db.run(
                    'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
                    [userId, totalAmount],
                    function(err) {
                        if (err) {
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }

                        const orderId = this.lastID;
                        let completed = 0;
                        let failed = false;

                        cartItems.forEach(item => {
                            db.run(
                                `INSERT INTO order_items (
                                    order_id, product_id, quantity, price, size
                                ) VALUES (?, ?, ?, ?, ?)`,
                                [orderId, item.product_id, item.quantity, item.price, item.size],
                                (err) => {
                                    if (err && !failed) {
                                        failed = true;
                                        db.run('ROLLBACK');
                                        reject(err);
                                        return;
                                    }

                                    completed++;
                                    if (completed === cartItems.length && !failed) {
                                        db.run('COMMIT');
                                        resolve({ orderId });
                                    }
                                }
                            );
                        });
                    }
                );
            });
        });
    }

    static async getByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT o.*, 
                    COUNT(oi.id) as item_count,
                    GROUP_CONCAT(p.name) as product_names
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE o.user_id = ?
                GROUP BY o.id
                ORDER BY o.created_at DESC`,
                [userId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async getOrderDetails(orderId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT o.*, oi.*, p.name, p.brand, p.image
                FROM orders o
                JOIN order_items oi ON o.id = oi.order_id
                JOIN products p ON oi.product_id = p.id
                WHERE o.id = ?`,
                [orderId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (rows.length === 0) {
                            resolve(null);
                            return;
                        }

                        const order = {
                            id: rows[0].id,
                            user_id: rows[0].user_id,
                            total_amount: rows[0].total_amount,
                            status: rows[0].status,
                            created_at: rows[0].created_at,
                            items: rows.map(row => ({
                                product_id: row.product_id,
                                name: row.name,
                                brand: row.brand,
                                image: row.image,
                                quantity: row.quantity,
                                price: row.price,
                                size: row.size
                            }))
                        };
                        resolve(order);
                    }
                }
            );
        });
    }

    static async updateStatus(orderId, status) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE orders SET status = ? WHERE id = ?',
                [status, orderId],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }
}

module.exports = Order; 