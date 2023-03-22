const Cart = require('../models/Cart');

const addProductToCart = async (products) => {
    const cart = new Cart(products)
    await cart.save(cart)
    return cart
}

module.exports = { addProductToCart }