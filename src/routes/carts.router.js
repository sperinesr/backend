const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller.js")
const cartController = new CartController()

// crear
router.post("/", cartController.newCart)
// obtener
router.get("/:id", cartController.getCart)
// agregar
router.post("/:cid/products/:pid", cartController.addProductsToCart)
// eliminar
router.delete('/:cid/products/:pid', cartController.deleteCartProduct);
// actualizar
router.put('/:cid', cartController.updateCartProduct);
// actualizar cantidad
router.put('/:cid/products/:pid', cartController.updateQuantity);
// limpiar
router.delete('/:cid', cartController.cleanCart);

module.exports = router;