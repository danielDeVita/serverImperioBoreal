const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: String,
    password: String,
    email: String,
    isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User