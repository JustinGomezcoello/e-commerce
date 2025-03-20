const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
