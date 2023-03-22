const express = require('express');
const router = express.Router();
const { addProductToCart } = require("../Controllers/addProductToCart");

router.post("/", async (req, res) => {
    try {
        const newCart = await addProductToCart(req.body) //de donde sacamos user (req.params.id?) y producs??
        if (newCart.error) throw new Error(cart.error);
        return res.status(201).json(newCart);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;