const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

router.get('/', async (req, res, next) => {

    let preference = {
        back_urls: {
            success: "http://localhost:3001/mp/ok",
            pending: "",
            failure: ""
        },
        items: [
            {
                title: "nombreProducto",
                unit_price: 1000,
                quantity: 1,
                curreny_id: "ARS"
            },
        ],
        notification_url: ""
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            res.send(`<a href="${response.body.init_point}">PAGAR</a>`)
        })
        .catch(function (error) {
            console.log(error);
        });

})

router.get('/ok', async(req, res, next)=>{
    res.send('ok')
})

module.exports = router