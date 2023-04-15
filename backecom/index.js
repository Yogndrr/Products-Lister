const express = require("express")
const cors = require("cors")
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")

const app = express()

app.use(express.json())
app.use(cors())

// Register a user
app.post("/register", async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result.password = undefined
    res.send(result)
})

// Login user
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        user ?
            res.send(user)
            :
            res.send({ result: "user not found bro" })
    }
    else {
        res.send({ result: "user not found bro" })
    }
})

// Get User details
app.get("/user-details/:id", async (req, res) => {
    let results = await User.findById(req.params.id)
    res.send(results)
})

// Now update the user profile after gathering details
app.put("/user-details/:id", async (req, res) => {
    let result = await User.findByIdAndUpdate(req.params.id, req.body,
        { new: true })
    res.send(result)
})

// Add product details
app.post("/add-product", async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

// Find all the products
app.get("/products", async (req, res) => {
    let products = await Product.find()
    products.length > 0 ?
        res.send(products)
        :
        res.send({ result: "No products found" })
})

// Delete the selected product
app.delete("/product/:id", async (req, res) => {
    let result = await Product.findByIdAndDelete(req.params.id)
    res.send(result)
})

// Get details of the product
app.get("/product/:id", async (req, res) => {
    let result = await Product.findById(req.params.id)
    res.send(result)
})

// Now update the product after gathering its details
app.put("/product/:id", async (req, res) => {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(result)
})

// Search a product by name
app.get("/search/:key", async (req, res) => {
    try {
        const key = req.params.key;

        // Following code makes search case insensitive means kehi lai search han manne ho

        const Key = new RegExp(key, "i");
        const results = await Product.find({
            $or: [
                { name: { $regex: Key } },
                { category: { $regex: Key } },
                { brand: { $regex: Key } },
                { price: { $regex: Key } }
            ]
        })

        // Following search is case sensitive

        // const results = await Product.find({
        //     "$or": [
        //         { name: { $regex: key } },
        //         { category: { $regex: key } },
        //         { brand: { $regex: key } },
        //         { price: { $regex: key } }
        //     ]
        // })

        results.length > 0
            ? res.send(results)
            : res.send({ result: "No records found" })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

app.listen(5000)