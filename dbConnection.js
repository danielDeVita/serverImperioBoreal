const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.CLUSTER
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Products',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
})

const upload = multer({storage:storage})

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/ImperioBoreal`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
        }
}


module.exports = {
    connect,
    upload: upload 
}
