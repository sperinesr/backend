const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller.js")
const cartController = new CartController()

// crear
router.post("/", cartController.newCart)
// obtener
router.get("/:cid", cartController.getCart)
//comprar
router.post("/:cid", cartController.finalizarCompra)
// actualizar
router.put('/:cid', cartController.updateCartProduct);
// limpiar
router.delete('/:cid', cartController.cleanCart);
// agregar
router.post("/:cid/products/:pid", cartController.addProductsToCart)
// actualizar cantidad
router.put('/:cid/products/:pid', cartController.updateQuantity);
// eliminar
router.delete('/:cid/products/:pid', cartController.deleteCartProduct);





module.exports = router;