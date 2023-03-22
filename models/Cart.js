const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    paid: Boolean,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Cart = mongoose.model('Product', cartSchema);

module.exports = Cart;