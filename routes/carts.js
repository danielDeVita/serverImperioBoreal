const express = require('express');
const router = express.Router();
const { addProductToCart, addNewOrder, getAllCarts, getCartByUser } = require("../Controllers/cartController");

router.post("/", async (req, res) => {
    try {
        const { user, products, totalAmount } = req.body
        const newCart = await addProductToCart({ user, products, totalAmount }) 
        const newOrder = await addNewOrder(newCart)
        return res.status(201).json(newOrder._id);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const carts = await getAllCarts()
        if (carts.error) throw new Error(carts.error);
        res.status(200).json(carts)
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const cartsByUser = await getCartByUser(req.params.userId)
        if (cartsByUser.error) throw new Error(cartsByUser.error);
        res.status(200).json(cartsByUser)
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;