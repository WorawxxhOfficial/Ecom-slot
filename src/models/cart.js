const db = require('../config/database');

class Cart {
    static async getByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT c.*, p.name, p.brand, p.price, p.image 
                FROM cart c
                JOIN products p ON c.product_id = p.id
                WHERE c.user_id = ?`,
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

    static async addItem(userId, productId, quantity, size = null) {
        return new Promise((resolve, reject) => {
            // First check if item already exists in cart
            db.get(
                'SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND size = ?',
                [userId, productId, size],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (row) {
                        // Update quantity if item exists
                        db.run(
                            'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
                            [quantity, row.id],
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({ id: row.id });
                                }
                            }
                        );
                    } else {
                        // Insert new item if it doesn't exist
                        db.run(
                            'INSERT INTO cart (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)',
                            [userId, productId, quantity, size],
                            function(err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({ id: this.lastID });
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    static async updateQuantity(cartId, quantity) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE cart SET quantity = ? WHERE id = ?',
                [quantity, cartId],
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

    static async removeItem(cartId) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM cart WHERE id = ?',
                [cartId],
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

    static async clearCart(userId) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM cart WHERE user_id = ?',
                [userId],
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

    static async getCartTotal(userId) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT SUM(c.quantity * p.price) as total
                FROM cart c
                JOIN products p ON c.product_id = p.id
                WHERE c.user_id = ?`,
                [userId],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row.total || 0);
                    }
                }
            );
        });
    }
}

module.exports = Cart; 