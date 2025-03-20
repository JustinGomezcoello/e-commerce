const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3002;

// Modelo de producto
const Product = require('./Product'); // Asegúrate de que la ruta al modelo es correcta

// Conexión a MongoDB
mongoose.connect('mongodb://mongoadmin:secretpassword@mongo:27017/mi-ecommerce', {
    authSource: "admin",
    dbName: "mi-ecommerce"
});

app.use(express.json());

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servicio de Productos corriendo en http://localhost:${PORT}`);
});

// Ruta base para confirmar funcionamiento del servicio
app.get('/', (req, res) => {
    res.send('Servicio de Productos activo y funcionando');
});

// Obtener todos los productos con posibilidad de filtrar por categoría, tamaño o color
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

// Crear un nuevo producto
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Obtener un producto por ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Producto no encontrado');
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un producto
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).send('Producto no encontrado');
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Eliminar un producto
app.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send('Producto no encontrado');
        res.send('Producto eliminado');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
