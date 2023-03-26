const express = require('express');
const router = express.Router();
const { addProductToCart, addNewOrder, getAllCarts, getCartByUser } = require("../Controllers/cartController");

router.post("/", async (req, res) => {
    try {
        const newCart = await addProductToCart(req.body)
        if (newCart.error) throw new Error(newCart.error);
        if (newCart) {
            const newOrder = await addNewOrder(newCart)
            if (newOrder.error) throw new Error(newOrder.error);
            return newOrder
        }
        return res.status(201).json({ newCart, newOrder });
    } catch (error) {
        return res.status(400).send(error);
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