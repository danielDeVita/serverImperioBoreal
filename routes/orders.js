const express = require('express');
const router = express.Router();
const {getAllOrders, getOrderByUserId, setOrderStatus, deleteOrder} = require("../Controllers/orderController");
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product')

router.get('/', async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        if(allOrders.error) throw new Error(allOrders.error)
        const serializedOrders = allOrders.map((item) => (
        {
            orderId: item._id,
            user: {
                _id: item.user._id,
                email: item.user.email,
            },
            status: item.status,
            cart: {
                products: item.cart.products.map( ({product, quantity}) => (
                    {
                        image: product.image.secure_url,
                        descriptionName: product.descriptionName,
                        price: product.price,
                        quantity
                    }
                    )),
                totalAmount: item.cart.totalAmount    
            }
        }
        ))
        return res.status(200).json(serializedOrders)
    } catch (error) {
      return res.status(404).send(error.message)
    }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        const isValid = mongoose.isValidObjectId(userId)
        if(isValid) {
        const userOrders = await getOrderByUserId(userId)
        if(userOrders.error) throw new Error(userOrders.error)
        const serializedOrders = userOrders.map((item) => (
            {
                orderId: item._id,
                user: {
                    _id: item.user._id,
                    email: item.user.email,
                },
                status: item.status,
                cart: {
                    products: item.cart.products.map( ({product, quantity}) => (
                        {
                            image: product.image.secure_url,
                            descriptionName: product.descriptionName,
                            price: product.price,
                            quantity
                        }
                        )),
                    totalAmount: item.cart.totalAmount    
                }
            }
            ))
        return res.status(200).json(serializedOrders)
        }
        throw new Error('Ingrese un id válido')
    } catch (error) {
      return  res.status(404).send(error.message)
    }
})

router.put('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { putStatus } = req.body;
        if (putStatus === 'Paid') {
            const order = await Order.find({ _id: orderId }).populate('cart').select('cart')
            const { cart } = order[0] 
            cart.products.map(async (el) => {
                const product = await Product.findById(el.product)
                const stock = product.stock - el.quantity
                await Product.findByIdAndUpdate(el.product, { stock }, { new: true })
            })
        }
        const isValid = mongoose.isValidObjectId(orderId)
        if(isValid) {
        await setOrderStatus(orderId, putStatus)
        if(setOrderStatus.error) throw new Error(setOrderStatus.error)
        return res.status(200).json('Estado de orden de compra actualizada')
        }
    } catch (error) {
        console.log(error.message)
        res.status(404).send(error.message)
    }
})

router.delete('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params; 
        const isValid = mongoose.isValidObjectId(orderId)
        if(isValid) {
        const orderToDelete = await deleteOrder(orderId)
        return res.status(200).json(orderToDelete)
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router