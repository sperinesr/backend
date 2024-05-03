const express = require("express")
const generarProductos = require("../mocking/mock.js")
const router = express.Router()

router.get("/mokingproducts", (req, res) => {
    // generar array
    const products = []

    for (let i = 0; i < 100; i++) {
        products.push(generarProductos())
    }

    res.json(products)
    // res.render("products", { products: products })
})

module.exports = router