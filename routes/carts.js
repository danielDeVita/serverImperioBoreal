const express = require('express');
const router = express.Router();
const { addProductToCart, addNewOrder } = require("../Controllers/addProductToCart");

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

module.exports = router;