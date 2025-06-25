const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Create new user
            const user = await User.create({ name, email, password });

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Validate password
            const isValidPassword = await User.validatePassword(user, password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate token
            const token = jwt.sign(
                { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name,
                    is_admin: user.is_admin 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin
                }
            });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ error: 'Error fetching user profile' });
        }
    }
}

module.exports = AuthController; 