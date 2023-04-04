const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

router.post('/', async (req, res, next) => {
    const { products, totalAmount } = req.body
    let preference = {
        items: products.map((product) => {
            return ({
                title: product.title,
                unit_price: product.unit_price,
                quantity: Number(product.quantity),
                currency_id: 'ARS',
                picture_url: product.picture_url
            })
        }),
        back_urls: {
            success: 'http://localhost:5173/paymentStatus',
            pending: 'http://localhost:5173/paymentStatus',
            failure: 'http://localhost:5173/paymentStatus'
        }
    };
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            return res.send(response.body.init_point)
        })
        .catch(function (error) {
           return res.status(400).json(error.message);
        })
});

router.get('/payment-status', (req, res) => {
    const { payment_id } = req.query;
    mercadopago.payment
        .get(payment_id)
        .then((response) => {
            const { status } = response.body;
            if (status === 'approved') {
                return res.send({ message: 'Compra aprobada' });
            } else if (status === 'rejected') {
                return res.send({ message: 'Compra rechazada' });
            } else if (status === 'in_process') {
                return res.send({ message: 'Compra pendiente' });
            } else {
                return res.status(500).send({ message: null });
            }
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send({ message: null });
        });
});

router.get("/notification", async (req, res, next) => {
    res.send('notific')
})

module.exports = router