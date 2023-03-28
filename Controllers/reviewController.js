const Review = require('../models/Review')

const getAllReviews = async () => {
    try {
        const allReviews = await Review.find()
        .populate('product')
        .populate('userId')
        if(!allReviews) throw new Error('No se encontraron reviews en la base de datos')
        return allReviews
    } catch (error) {
        return error.message
    }
}

const createReview = async (userId, product, rating, comment) => {
    try {
        const newReview = await Review.create({
            userId,
            product,
            rating,
            comment,
        })
        const savedReview = await newReview.save()
        return savedReview   
    } catch (error) {
        return error.message
    }
}

const getReviewsByProduct = async (product) => {
    try {
        const foundReviews = await Review.find({
            product: product
        })
        .populate('userId')
        .populate('product')
        if(!foundReviews.length) throw new Error('No se encontraron reviews de este producto.')
        return foundReviews
    } catch (error) {
        return error.message
    }
} 



module.exports = {
    getAllReviews,
    createReview,
    getReviewsByProduct
}