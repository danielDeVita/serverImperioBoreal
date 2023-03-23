const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const categorySchema = new Schema ({
    category: {
        type: String,
        unique: true
    },
}, {
    versionKey: false
})

categorySchema.plugin(softDeletePlugin);

const Category = mongoose.model('Category', categorySchema)

module.exports = Category