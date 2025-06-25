const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function createAdmin(email, password, name) {
    console.log('Starting admin creation process...');
    console.log(`Email: ${email}, Name: ${name}`);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // First check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            console.error('Error checking user:', err);
            process.exit(1);
        }

        console.log('Existing user check result:', user);

        if (user) {
            // Update existing user to admin
            console.log('Updating existing user to admin...');
            db.run('UPDATE users SET is_admin = 1 WHERE email = ?', [email], (err) => {
                if (err) {
                    console.error('Error updating user to admin:', err);
                    process.exit(1);
                }
                console.log(`User ${email} has been updated to admin status`);
                process.exit(0);
            });
        } else {
            // Create new admin user
            console.log('Creating new admin user...');
            db.run(
                'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, 1)',
                [name, email, hashedPassword],
                function(err) {
                    if (err) {
                        console.error('Error creating admin user:', err);
                        process.exit(1);
                    }
                    console.log(`New admin user created with email: ${email}`);
                    console.log('User ID:', this.lastID);
                    process.exit(0);
                }
            );
        }
    });
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Usage: node create-admin.js <email> <password> [name]');
    process.exit(1);
}

const [email, password, name = 'Admin User'] = args;
createAdmin(email, password, name); 