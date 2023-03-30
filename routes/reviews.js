const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {getAllReviews, createReview, getReviewsByProduct, updateReview, deleteReview, getReviewsByUser} = require('../Controllers/reviewController')

router.get('/', async (req, res, next) => {
    try {
        const allReviews = await getAllReviews();
        if(allReviews.error) throw new Error(allReviews.error)
        const serializedReviews = allReviews.map((item) => {
        return ({
            _id: item._id,
            // si queremos que sea user en lugar de userId hay que vaciar la DB para que no devuelva null
            userId: {
                _id:item.userId._id,
                email: item.userId.email,
                isAdmin: item.userId.isAdmin,
                isDeleted: item.userId.isDeleted   
            },
            product: item.product ?
                {
                _id: item.product._id,
                descriptionName: item.product.descriptionName
                } :  'El producto ya no existe',
            rating: item.product ?  item.rating : 'El producto ya no existe',
            comment: item.product ? item.comment : 'El producto ya no existe',
            createdAt: item.createdAt
            }
        )})
        return res.status(200).json(serializedReviews)
        } catch (error) {
        console.log(error.message)
        return res.status(404).send(error.message)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const { userId, productId, rating, comment } = req.body
        if(!userId || !productId || !rating) throw new Error('Se necesita mas información para crear la reseña')
        const savedReview = await createReview(userId, productId, rating, comment)
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
            const serializedReviews = foundReviews.map((item) => {
                return ({
                    _id: item._id,
                    // si queremos que sea user en lugar de userId hay que vaciar la DB para que no devuelva null
                    userId: {
                        _id:item.userId._id,
                        email: item.userId.email,
                        isAdmin: item.userId.isAdmin,
                        isDeleted: item.userId.isDeleted   
                    },
                    product: item.product ?
                        {
                        _id: item.product._id,
                        descriptionName: item.product.descriptionName
                        } :  'El producto ya no existe',
                    rating: item.product ?  item.rating : 'El producto ya no existe',
                    comment: item.product ? item.comment : 'El producto ya no existe',
                    createdAt: item.createdAt
                    }
                )})
            return res.status(200).json(serializedReviews)
        }
       return res.status(400).send('Ingrese un id válido')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.put('/:reviewId', async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const { userId, product, rating, comment } = req.body
        const isValid = mongoose.isValidObjectId(reviewId)
        if(isValid) {
        const updatedReview = await updateReview(reviewId, userId, product, rating, comment);
        if(updatedReview.error) throw new Error(updatedReview.error)
        return res.status(200).json(updatedReview)
        }
        return res.status(400).send('Ingrese un id válido')
    } catch (error) {
        return res.status(400).send(error.message)
    }
}) 

router.delete ('/:reviewId', async (req, res, next) => {
    try {
        const { reviewId } = req.params
        const isValid = mongoose.isValidObjectId(reviewId)
        if(isValid) {
            const deletedReview = await deleteReview(reviewId)
            if(deletedReview.error) throw new Error (deletedReview.error)
            return res.status(200).json(deletedReview)
         }
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

router.get('/user/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const isValid = mongoose.isValidObjectId(userId)
        if(isValid) {
        const foundReviews = await getReviewsByUser(userId)
        if(foundReviews.error) throw new Error (foundReviews.error)
        return res.status(200).json(foundReviews)
        }
        return res.status(400).send('Ingrese un id válido')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})

module.exports = router;