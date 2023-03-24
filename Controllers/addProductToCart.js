const Cart = require('../models/Cart');
const Order = require('../models/Cart');

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

const addNewOrder = async (cart) => {
    try {
        const newOrder = new Order(cart)
        await newOrder.save(newOrder)
        return newOrder
    } catch (error) {
        return error.message;
    }
}

module.exports = { addProductToCart, addNewOrder }