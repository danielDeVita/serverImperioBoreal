const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const cartSchema = new Schema({
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

cartSchema.plugin(softDeletePlugin);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;