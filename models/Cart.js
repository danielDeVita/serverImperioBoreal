const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    paid: {
        type: Boolean,
        default: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;