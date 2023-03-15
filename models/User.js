const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const userSchema = new Schema({
    first_name: String,
    password: String,
    email: String,
    isAdmin: Boolean,
});

userSchema.plugin(softDeletePlugin);

const User = mongoose.model('User', userSchema);

module.exports = User