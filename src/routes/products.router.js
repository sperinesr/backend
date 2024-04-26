const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller.js");
const productController = new ProductController();

// obtener
router.get("/", productController.getAllProducts);
// obtener
router.get("/:pid", productController.getProduct);
// crear
router.post("/", productController.createProduct);
// actualizar
router.put("/", productController.updateProduct);
// eliminar
router.delete("/:pid", productController.deleteProduct);

module.exports = router