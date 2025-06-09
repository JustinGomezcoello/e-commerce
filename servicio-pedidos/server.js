const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order'); // Asegúrate de que la ruta al archivo del modelo es correcta

const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3003;  // Verifica que el puerto esté disponible

// Conexión a MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/mi-ecommerce', {
    authSource: "admin",
    dbName: "mi-ecommerce"
});

app.get('/', (req, res) => {
    res.send('Servicio de Pedidos activo y funcionando');
});

app.use(express.json());

// Obtener todos los pedidos
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un pedido específico
app.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products.product');
        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo pedido
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

// Actualizar pedido
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
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json({
            message: 'Pedido actualizado con éxito',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar pedido
app.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json({ message: 'Pedido eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
