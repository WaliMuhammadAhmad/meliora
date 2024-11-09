const Product = require('../models/productSchema');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            detail,
            subDetail,
            description,
            price,
            sizes, 
            frontImage,
            backImage,
            stockQuantity,
            usageTitle,
            steps
        } = req.body;

        const newProduct = new Product({
            name,
            detail,
            subDetail,
            description,
            price,
            sizes,
            frontImage,
            backImage,
            stockQuantity,
            usageTitle,
            steps
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    try {
        const {
            name,
            detail,
            subDetail,
            description,
            price,
            sizes,
            frontImage,
            backImage,
            stockQuantity,
            usageTitle,
            steps
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                detail,
                subDetail,
                description,
                price,
                sizes,
                frontImage,
                backImage,
                stockQuantity,
                usageTitle,
                steps
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product usage by ID
exports.getProductUsage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ usageTitle: product.usageTitle, steps: product.steps });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by name
exports.getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.name });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}