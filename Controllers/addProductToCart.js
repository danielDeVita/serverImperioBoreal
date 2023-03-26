const Cart = require('../models/Cart');
const Order = require('../models/Order');

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
        const newOrder = await Order.create({
            user: cart.user,
            cart: cart._id,
        })
        const savedOrder = await newOrder.save()
        return savedOrder
    } catch (error) {
        return error.message;
    }
}

module.exports = { addProductToCart, addNewOrder }