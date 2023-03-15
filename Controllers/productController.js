const Product = require('../models/Product')

const getProducts = async() => {
    try {
        const products = await product.find()
        if(!products.lenght)
        throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error) {
        return error.message;
    }
}

module.exports = {getProducts}