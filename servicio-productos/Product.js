const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    sizes: [{ type: String }],  // Ejemplo: XS, S, M, L, XL
    colors: [{ type: String }],
    category: { type: String, required: true },  // Ejemplo: Men, Women, Children
    images: [{ type: String }], // URLs a imágenes del producto
});

const Product = model('Product', productSchema);
module.exports = Product;
