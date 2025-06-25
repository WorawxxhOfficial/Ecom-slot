const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');
const { verifyToken, isAdmin } = require('../middleware/auth');

// All order routes are protected
router.use(verifyToken);

// Create new order
router.post('/', OrderController.createOrder);

// Get user's orders
router.get('/', OrderController.getUserOrders);

// Get order details
router.get('/:id', OrderController.getOrderDetails);

// Update order status (admin only)
router.put('/:id/status', isAdmin, OrderController.updateOrderStatus);

module.exports = router; 