import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;
const JWT_SECRET = 'your-secret-key';

// Data file paths
const USERS_FILE = join(__dirname, 'data', 'users.json');
const PRODUCTS_FILE = join(__dirname, 'data', 'products.json');
const CARTS_FILE = join(__dirname, 'data', 'carts.json');
const ORDERS_FILE = join(__dirname, 'data', 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(join(__dirname, 'data'))) {
    fs.mkdirSync(join(__dirname, 'data'));
}

// Initialize empty JSON files if they don't exist
[USERS_FILE, PRODUCTS_FILE, CARTS_FILE, ORDERS_FILE].forEach(file => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '[]');
    }
});

// Helper functions
function readJsonFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        return [];
    }
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/js', express.static(join(__dirname, 'src/js')));
app.use('/assets', express.static(join(__dirname, 'assets')));
app.use('/pages', express.static(join(__dirname, 'src/pages')));
app.use(express.static(join(__dirname, 'src')));

// HTML routes
const sendHtml = (path) => (req, res) => {
    res.sendFile(join(__dirname, 'src', 'pages', path));
};

app.get('/', sendHtml('index.html'));
app.get('/index.html', sendHtml('index.html'));
app.get('/auth', sendHtml('auth.html'));
app.get('/auth.html', sendHtml('auth.html'));
app.get('/cart', sendHtml('cart.html'));
app.get('/cart.html', sendHtml('cart.html'));
app.get('/admin', sendHtml('admin.html'));
app.get('/admin.html', sendHtml('admin.html'));
app.get('/product-detail', sendHtml('product-detail.html'));
app.get('/product-detail.html', sendHtml('product-detail.html'));

// API routes
app.post('/api/auth/verify', (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ valid: true, user: decoded });
    });
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = readJsonFile(USERS_FILE);
        const user = users.find(u => u.email === email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Cart routes
app.get('/api/cart', authenticateToken, (req, res) => {
    try {
        const carts = readJsonFile(CARTS_FILE);
        const userCart = carts.find(cart => cart.userId === req.user.id) || { userId: req.user.id, items: [] };
        res.json(userCart.items);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/cart/add', authenticateToken, (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const carts = readJsonFile(CARTS_FILE);
        let userCart = carts.find(cart => cart.userId === req.user.id);

        if (!userCart) {
            userCart = { userId: req.user.id, items: [] };
            carts.push(userCart);
        }

        const existingItem = userCart.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            userCart.items.push({ productId, quantity: quantity || 1 });
        }

        writeJsonFile(CARTS_FILE, carts);
        res.json(userCart.items);
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Products route
app.get('/api/products', (req, res) => {
    try {
        const products = readJsonFile(PRODUCTS_FILE);
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Catch-all route for HTML pages
app.get('*', (req, res) => {
    const htmlPath = join(__dirname, 'src', 'pages', req.path + '.html');
    if (fs.existsSync(htmlPath)) {
        res.sendFile(htmlPath);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 