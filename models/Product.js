const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    descriptionName: String,
    category: String,
    price: Number,
    priceBusiness: Number,
    priceVAT: Number,
    priceVATBusiness: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

