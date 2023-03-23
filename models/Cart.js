const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    paid: {
        type: Boolean,
        default: false
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalAmount: Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;