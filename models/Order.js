const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["InProcess", "Cancelled", "Paid"],
        default: "InProcess"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})
orderSchema.pre('find', function() {
    this.where({ isDeleted: false});
  });
  
// El plugin no funciona con orderSchema
// orderSchema.plugin(softDeletePlugin);

const Order = mongoose.model('Order', orderSchema)

module.exports = Order