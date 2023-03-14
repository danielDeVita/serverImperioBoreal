const mongoose = require('mongoose');
require('dotenv').config()

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;


module.exports = async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.a9jnlqj.mongodb.net/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'ImperioBoreal',
        });
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
