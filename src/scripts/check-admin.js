const db = require('../config/database');

// Query to check admin users
db.all('SELECT id, email, name, is_admin FROM users WHERE is_admin = 1', [], (err, rows) => {
    if (err) {
        console.error('Error checking admin users:', err);
        process.exit(1);
    }
    
    console.log('Admin users in database:');
    console.log(rows);
    
    // Also check specific email
    db.get('SELECT id, email, name, is_admin FROM users WHERE email = ?', ['admin@mally.com'], (err, user) => {
        if (err) {
            console.error('Error checking specific user:', err);
            process.exit(1);
        }
        
        console.log('\nChecking specific user admin@mally.com:');
        console.log(user);
        process.exit(0);
    });
}); 