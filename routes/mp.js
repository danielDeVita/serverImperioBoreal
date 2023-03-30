const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

router.post('/', async (req, res, next) => {

    let preference = {
        back_urls: {
            success: "http://localhost:3001/feedback",
            pending: "http://localhost:3001/feedback",
            failure: "http://localhost:3001/feedback"
        },
        items: req.body.products.map((item) => ({
            title: item.descriptionName,
            unit_price: item.price,
            quantity: item.quantity,
            currency_id: 'ARS'
        })),
        auto_return:"approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            res.json({
                id: response.body.id
            })
        })
        .catch(function (error) {
            console.log(error);
        });

})

router.get('/feedback', async(req, res, next)=>{
    res.json({
        Payment: res.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    })
})

module.exports = router