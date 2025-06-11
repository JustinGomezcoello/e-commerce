const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order'); // Ensure the path to the model is correct
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = 3003;

// Connect to MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/e-commerce', {
    authSource: "admin",
    dbName: "e-commerce"
});

// Base route to confirm service is running
app.get('/', (req, res) => {
    res.send('Order Service active and running');
});

// Get all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific order
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products.product');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new order
app.post('/orders', async (req, res) => {
    const { products, user, status } = req.body;
    if (!products || !user) {
        return res.status(400).json({ message: "User and products are required." });
    }
    try {
        const newOrder = new Order({ products, user, status });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an order
app.put('/orders/:id', async (req, res) => {
    try {
        const { products, status } = req.body;
        const updates = {};
        
        if (products) updates.products = products;
        if (status) updates.status = status;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        ).populate('user products.product');

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({
            message: 'Order updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an order
app.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/', orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service running at http://localhost:${PORT}`);
});
