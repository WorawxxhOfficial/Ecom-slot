const db = require('../config/database');

class Product {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(this.parseProduct));
                }
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row ? this.parseProduct(row) : null);
                }
            });
        });
    }

    static async getByCategory(category) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM products WHERE category = ?',
                [category],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.map(this.parseProduct));
                    }
                }
            );
        });
    }

    static async search(query) {
        return new Promise((resolve, reject) => {
            const searchTerm = `%${query}%`;
            db.all(
                `SELECT * FROM products 
                WHERE name LIKE ? 
                OR description LIKE ? 
                OR brand LIKE ?`,
                [searchTerm, searchTerm, searchTerm],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.map(this.parseProduct));
                    }
                }
            );
        });
    }

    static async create(productData) {
        const {
            name,
            brand,
            price,
            category,
            image,
            description,
            sizes,
            availableSizes,
            additionalImages
        } = productData;

        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO products (
                    name, brand, price, category, image, description,
                    sizes, available_sizes, additional_images
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    name,
                    brand,
                    price,
                    category,
                    image,
                    description,
                    JSON.stringify(sizes),
                    JSON.stringify(availableSizes),
                    JSON.stringify(additionalImages)
                ],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID,
                            ...productData
                        });
                    }
                }
            );
        });
    }

    static async update(id, productData) {
        const {
            name,
            brand,
            price,
            category,
            image,
            description,
            sizes,
            availableSizes,
            additionalImages
        } = productData;

        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE products SET
                    name = ?,
                    brand = ?,
                    price = ?,
                    category = ?,
                    image = ?,
                    description = ?,
                    sizes = ?,
                    available_sizes = ?,
                    additional_images = ?
                WHERE id = ?`,
                [
                    name,
                    brand,
                    price,
                    category,
                    image,
                    description,
                    JSON.stringify(sizes),
                    JSON.stringify(availableSizes),
                    JSON.stringify(additionalImages),
                    id
                ],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id,
                            ...productData
                        });
                    }
                }
            );
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    static parseProduct(row) {
        if (!row) return null;
        return {
            ...row,
            sizes: row.sizes ? JSON.parse(row.sizes) : null,
            available_sizes: row.available_sizes ? JSON.parse(row.available_sizes) : null,
            additional_images: row.additional_images ? JSON.parse(row.additional_images) : null
        };
    }
}

module.exports = Product; 