const express = require('express');
const router = express.Router();
const { addProductToCart } = require("../Controllers/addProductToCart");

router.post("/", async (req, res) => {
    const cart = await addProductToCart(req.body)
    return res.status(201).json(cart);
})

module.exports = router;