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

// Rutas
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
