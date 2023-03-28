const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const productSchema = new Schema({
    descriptionName: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id: String,
        secure_url: String
    },
    stock: Number,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }]
});

productSchema.plugin(softDeletePlugin);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;