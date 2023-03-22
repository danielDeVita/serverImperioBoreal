const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        
    },
    password: {
        type: String,    
    },
});


userSchema.plugin(softDeletePlugin);

const User = mongoose.model('User', userSchema);

module.exports = User