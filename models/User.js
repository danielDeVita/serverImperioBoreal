const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,   
    },
    password: {
        type: String,    
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

userSchema.plugin(softDeletePlugin);

const User = mongoose.model('User', userSchema);

module.exports = User