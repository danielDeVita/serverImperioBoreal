const express = require('express');
const router = express.Router();
const Review = require('../models/Review')

router.get('/', async (req, res, next) => {
    try {
        const allReviews = await Review.find()
        .populate('user')
        .populate('product')

        } catch (error) {
        console.log(error.message)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { userId, product, rating, comment } = req.body
        const newReview = await Review.create({
            userId,
            product,
            rating,
            comment,
        })


    } catch (error) {
        
    }
})


module.exports = router;