const Order = require('../models/order');
const Cart = require('../models/cart');

class OrderController {
    static async createOrder(req, res) {
        try {
            const userId = req.user.id;

            // Get cart items
            const cartItems = await Cart.getByUserId(userId);
            if (cartItems.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }

            // Calculate total
            const total = await Cart.getCartTotal(userId);

            // Create order
            const order = await Order.create(userId, cartItems, total);

            // Clear cart
            await Cart.clearCart(userId);

            res.status(201).json({
                message: 'Order created successfully',
                order
            });
        } catch (error) {
            console.error('Create order error:', error);
            res.status(500).json({ error: 'Error creating order' });
        }
    }

    static async getUserOrders(req, res) {
        try {
            const orders = await Order.getByUserId(req.user.id);
            res.json({ orders });
        } catch (error) {
            console.error('Get user orders error:', error);
            res.status(500).json({ error: 'Error fetching orders' });
        }
    }

    static async getOrderDetails(req, res) {
        try {
            const orderId = req.params.id;
            const order = await Order.getOrderDetails(orderId);

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // Check if the order belongs to the user or if user is admin
            if (order.user_id !== req.user.id && !req.user.is_admin) {
                return res.status(403).json({ error: 'Access denied' });
            }

            res.json({ order });
        } catch (error) {
            console.error('Get order details error:', error);
            res.status(500).json({ error: 'Error fetching order details' });
        }
    }

    static async updateOrderStatus(req, res) {
        try {
            const orderId = req.params.id;
            const { status } = req.body;

            // Validate status
            const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: 'Invalid status' });
            }

            // Check if order exists
            const order = await Order.getOrderDetails(orderId);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // Only admin can update order status
            if (!req.user.is_admin) {
                return res.status(403).json({ error: 'Access denied' });
            }

            await Order.updateStatus(orderId, status);

            res.json({
                message: 'Order status updated successfully',
                orderId,
                status
            });
        } catch (error) {
            console.error('Update order status error:', error);
            res.status(500).json({ error: 'Error updating order status' });
        }
    }
}

module.exports = OrderController; 