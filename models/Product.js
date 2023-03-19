const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const productSchema = new Schema({
    descriptionName: String,
    category: String,
    price: Number,
    priceBusiness: Number,
    priceVAT: Number,
    priceVATBusiness: Number,
    productImg: String
});

productSchema.plugin(softDeletePlugin);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

