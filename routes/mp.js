const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

router.post('/', async (req, res, next) => {
    const { products } = req.body
    let preference = {
        items: products.map((product) => {
            return ({
                title: product.description,
                unit_price: product.transaction_amount,
                quantity: Number(product.quantity),
            })
        }),
        back_urls: {
            success: 'http://localhost:5173/paymentStatus',
            pending: 'https://www.google.com',
            failure: 'https://www.google.com'
        }
    };
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.send(response.body.init_point)
        })
        .catch(function (error) {
            console.log(error);
            res.status(400).json(error.message);
        })
});

router.get('/payment-status', (req, res) => {
    const { payment_id } = req.query;
    console.log(payment_id)
    mercadopago.payment
        .get(payment_id)
        .then((response) => {
            const { status } = response.body;
            if (status === 'approved') {
                return res.send({ message: 'Payment approved' });
            } else if (status === 'rejected') {
                return res.send({ message: 'Payment rejected' });
            } else if (status === 'pending') {
                return res.send({ message: 'Payment is being processed' });
            } else {
                return res.status(500).send({ error: 'Unknown payment status' });
            }
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' });
        });
});


// Handle successful payment
router.get('/success', (req, res) => {
    const { product } = req.query;
    return res.json({ message: `Thank you for your purchase! You have successfully bought ${product}.` });
});

// Handle failed payment
router.get('/failure', (req, res) => {
    const { product } = req.query;
    return res.status(400).json({ message: 'Payment failed. Please try again later.' });
});

// Handle pending payment
router.get('/pending', (req, res) => {
    const { product } = req.query;
    return res.json({ message: 'Your payment is being processed.' });
});

//NOTIFICATION URL, ACA MERCADO PAGO POSTEA DATA DE LA COMPRA (STATUS Y COSAS ASI)
router.post('/notification', (req, res) => {
    const { body } = req;
    // Process the notification
    console.log(body);
    res.status(200).end();
});


module.exports = router

/* 

import React, { useEffect, useState } from 'react';

const PaymentStatus = ({ location }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('payment_id');

    fetch(`/payment-status?payment_id=${paymentId}`)
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch((error) => console.error(error));
  }, [location.search]);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{status}</p>
    </div>
  );
};

export default PaymentStatus;

*/