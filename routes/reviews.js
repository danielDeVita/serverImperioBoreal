const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const mongoose = require('mongoose')
const {getAllReviews, createReview, getReviewsByProduct} = require('../Controllers/reviewController')

router.get('/', async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();
        if(allReviews.error) throw new Error(allReviews.error)
        return res.status(200).json(allReviews)
        } catch (error) {
        console.log(error.message)
        return res.status(404).send(error.message)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, product, rating, comment } = req.body
        if(!userId || !product || !rating) throw new Error('Se necesita mas información para crear la reseña')
        const savedReview = await createReview(userId, product, rating, comment)
        if(savedReview.error) throw new Error(savedReview.error)
        return res.status(201).json(savedReview)
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const isValid = mongoose.isValidObjectId(productId)
        if(isValid) {
            const foundReviews = await getReviewsByProduct(productId)
            if(foundReviews.error) throw new Error(foundReviews.error)
           return res.status(200).json(foundReviews);
        }
       return res.status(400).send('Ingrese un id válido')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

// router.put('/:productId', async (req, res, next) => {
    // WIP WIP
// }) 




module.exports = router;