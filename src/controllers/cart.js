const Cart = require('../models/cart');
const Product = require('../models/product');

class CartController {
    static async getCart(req, res) {
        try {
            const cartItems = await Cart.getByUserId(req.user.id);
            const total = await Cart.getCartTotal(req.user.id);

            res.json({
                items: cartItems,
                total
            });
        } catch (error) {
            console.error('Get cart error:', error);
            res.status(500).json({ error: 'Error fetching cart' });
        }
    }

    static async addToCart(req, res) {
        try {
            const { productId, quantity = 1, size = null } = req.body;

            // Validate product exists
            const product = await Product.getById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Validate size if product has sizes
            if (product.sizes && size) {
                const availableSizes = JSON.parse(product.available_sizes || '[]');
                if (!availableSizes.includes(size)) {
                    return res.status(400).json({ error: 'Selected size not available' });
                }
            }

            // Add to cart
            const cartItem = await Cart.addItem(req.user.id, productId, quantity, size);
            const updatedCart = await Cart.getByUserId(req.user.id);
            const total = await Cart.getCartTotal(req.user.id);

            res.json({
                message: 'Item added to cart',
                cartItem,
                cart: updatedCart,
                total
            });
        } catch (error) {
            console.error('Add to cart error:', error);
            res.status(500).json({ error: 'Error adding item to cart' });
        }
    }

    static async updateCartItem(req, res) {
        try {
            const { quantity } = req.body;
            const cartItemId = req.params.id;

            if (quantity < 1) {
                return res.status(400).json({ error: 'Quantity must be at least 1' });
            }

            await Cart.updateQuantity(cartItemId, quantity);
            const updatedCart = await Cart.getByUserId(req.user.id);
            const total = await Cart.getCartTotal(req.user.id);

            res.json({
                message: 'Cart item updated',
                cart: updatedCart,
                total
            });
        } catch (error) {
            console.error('Update cart item error:', error);
            res.status(500).json({ error: 'Error updating cart item' });
        }
    }

    static async removeFromCart(req, res) {
        try {
            const cartItemId = req.params.id;
            await Cart.removeItem(cartItemId);
            
            const updatedCart = await Cart.getByUserId(req.user.id);
            const total = await Cart.getCartTotal(req.user.id);

            res.json({
                message: 'Item removed from cart',
                cart: updatedCart,
                total
            });
        } catch (error) {
            console.error('Remove from cart error:', error);
            res.status(500).json({ error: 'Error removing item from cart' });
        }
    }

    static async clearCart(req, res) {
        try {
            await Cart.clearCart(req.user.id);
            res.json({
                message: 'Cart cleared',
                cart: [],
                total: 0
            });
        } catch (error) {
            console.error('Clear cart error:', error);
            res.status(500).json({ error: 'Error clearing cart' });
        }
    }
}

module.exports = CartController; 