const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    paid: {
        type: String,
        enum: ["Unpaid", "InProcess", "Paid"],
        default: "Unpaid"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order