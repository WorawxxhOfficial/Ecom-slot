const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart');
const { verifyToken } = require('../middleware/auth');

// All cart routes are protected
router.use(verifyToken);

// Get user's cart
router.get('/', CartController.getCart);

// Add item to cart
router.post('/', CartController.addToCart);

// Update cart item quantity
router.put('/:id', CartController.updateCartItem);

// Remove item from cart
router.delete('/:id', CartController.removeFromCart);

// Clear cart
router.delete('/', CartController.clearCart);

module.exports = router; 