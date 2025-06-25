const Product = require('../models/product');

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await Product.getAll();
            res.json({ products });
        } catch (error) {
            console.error('Get all products error:', error);
            res.status(500).json({ error: 'Error fetching products' });
        }
    }

    static async getProductById(req, res) {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ product });
        } catch (error) {
            console.error('Get product by ID error:', error);
            res.status(500).json({ error: 'Error fetching product' });
        }
    }

    static async getProductsByCategory(req, res) {
        try {
            const products = await Product.getByCategory(req.params.category);
            res.json({ products });
        } catch (error) {
            console.error('Get products by category error:', error);
            res.status(500).json({ error: 'Error fetching products' });
        }
    }

    static async searchProducts(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'Search query is required' });
            }

            const products = await Product.search(query);
            res.json({ products });
        } catch (error) {
            console.error('Search products error:', error);
            res.status(500).json({ error: 'Error searching products' });
        }
    }

    static async createProduct(req, res) {
        try {
            const {
                name,
                brand,
                price,
                category,
                image,
                description,
                sizes,
                availableSizes,
                additionalImages
            } = req.body;

            // Basic validation
            if (!name || !brand || !price || !category || !image) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const product = await Product.create({
                name,
                brand,
                price,
                category,
                image,
                description,
                sizes,
                availableSizes,
                additionalImages
            });

            res.status(201).json({
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            console.error('Create product error:', error);
            res.status(500).json({ error: 'Error creating product' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const {
                name,
                brand,
                price,
                category,
                image,
                description,
                sizes,
                availableSizes,
                additionalImages
            } = req.body;

            // Check if product exists
            const existingProduct = await Product.getById(productId);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Basic validation
            if (!name || !brand || !price || !category || !image) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const product = await Product.update(productId, {
                name,
                brand,
                price,
                category,
                image,
                description,
                sizes,
                availableSizes,
                additionalImages
            });

            res.json({
                message: 'Product updated successfully',
                product
            });
        } catch (error) {
            console.error('Update product error:', error);
            res.status(500).json({ error: 'Error updating product' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = req.params.id;

            // Check if product exists
            const existingProduct = await Product.getById(productId);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            await Product.delete(productId);

            res.json({
                message: 'Product deleted successfully'
            });
        } catch (error) {
            console.error('Delete product error:', error);
            res.status(500).json({ error: 'Error deleting product' });
        }
    }
}

module.exports = ProductController; 