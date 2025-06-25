const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID,
                            name,
                            email
                        });
                    }
                }
            );
        });
    }

    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT id, name, email, is_admin FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    }

    static async validatePassword(user, password) {
        return bcrypt.compare(password, user.password);
    }
}

module.exports = User; 