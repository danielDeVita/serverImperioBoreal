const Order = require('../models/Order')

const getAllOrders = async () => {
    try {
        const allOrders = await Order.find()
        .populate('user')
        .populate(
            {
            path: 'cart',
                populate: {
                    path: 'products',
                    populate: {
                        path: 'product',
                        model: 'Product'
                    }     
                }
        }
        )
        if(!allOrders) throw new Error('No se encontraron ordenes en la base de datos')
        return allOrders
    } catch (error) {
        return error.message  
    }
}

const getOrderByUserId = async (userId) => {
    try {
        const userOrders = await Order.find({user: userId})
            .populate({
                path: 'cart',
                populate: {
                    path: 'products',
                    populate: {
                        path: 'product',
                        model: 'Product'
                    }     
                }
            })
            .populate('user');
            if (!userOrders) throw new Error('No se encontraron ordenes de este usuario')
            return userOrders
    } catch (error) {
        return error.message
    }
} 

const setOrderStatus = async (orderId, newStatus) => {
    try {
        const foundOrder = Order.findByIdAndUpdate(orderId, {status: newStatus}, { new: true })
        return foundOrder
    } catch (error) {
        return error.message
    }
}

const deleteOrder = async (orderId) => {
    try {
        const orderToDelete = await Order.findByIdAndUpdate(orderId, {isDeleted: true}, {new: true})
        return orderToDelete
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getAllOrders,
    getOrderByUserId,
    setOrderStatus,
    deleteOrder
}