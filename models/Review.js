const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,   
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString()
    },
})

reviewSchema.plugin(softDeletePlugin);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;