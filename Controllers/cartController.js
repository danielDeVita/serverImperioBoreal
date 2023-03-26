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
};

const getAllCarts = async () => {
    try {
        const carts = await Cart.find().populate('user')
        if (!carts.length)
            throw new Error("No se encontraron carritos en la base de datos")
        return carts
    } catch (error) {
        return error.message;
    }
};

const getCartByUser = async (user) => {
    try {
        const cartsByUser = await Cart.find({ user: user })
        if (!cartsByUser.length) throw new Error('No hay carritos asociados a ese usuario');
        return cartsByUser;
    } catch (error) {
        return error.message;
    }
};

module.exports = { addProductToCart, addNewOrder, getAllCarts, getCartByUser }