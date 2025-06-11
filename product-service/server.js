const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
app.use(cors());
const PORT = 3002;

// Product model
const Product = require('./Product'); // Ensure the path to the model is correct

// Connect to MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/e-commerce', {
    authSource: "admin",
    dbName: "e-commerce"
});

app.use(express.json());

// Start server
app.listen(PORT, () => {
    console.log(`Product Service running at http://localhost:${PORT}`);
});

// Base route to confirm service is running
app.get('/', (req, res) => {
    res.send('Product Service active and running');
});

// Get all products with optional filtering by category, size, or color
app.get('/products', async (req, res) => {
    const { category, color, size } = req.query;
    let query = {};
    if (category) query.category = category;
    if (color) query.colors = { $in: [color] };
    if (size) query.sizes = { $in: [size] };

    try {
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create a new product
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a product
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).send('Product not found');
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send('Product not found');
        res.send('Product deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.use('/', productRoutes);
