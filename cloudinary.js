const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

async function uploadImage(filepath) {
    return await cloudinary.uploader.upload(filepath, {
        folder: "imperioBoreal"
    })
};

async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId)
};

module.exports = { uploadImage, deleteImage }