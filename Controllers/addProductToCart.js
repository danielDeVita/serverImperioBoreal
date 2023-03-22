const Cart = require('../models/Cart');

const addProductToCart = async (cart) => {
    try {
        if (!cart.user || !cart.products) throw new Error("Falta información sobre la compra");
        const newCart = new Cart(cart)
        await newCart.save(newCart)
        return newCart
    } catch (error) {
        return error.message;
    }
};

module.exports = { addProductToCart }