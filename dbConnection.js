const mongoose = require('mongoose');
require('dotenv').config();
// const {DB_USER, DB_PASSWORD} = process.env

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;


module.exports = async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cz5g7a7.mongodb.net/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
