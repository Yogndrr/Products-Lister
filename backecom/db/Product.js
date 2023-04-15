const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    brand: String,
    category: String,
    userId: String
})

module.exports = mongoose.model("product", productSchema)