const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/:id', ProductController.getProductById);

// Protected admin routes
router.post('/', verifyToken, isAdmin, ProductController.createProduct);
router.put('/:id', verifyToken, isAdmin, ProductController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, ProductController.deleteProduct);

module.exports = router; 