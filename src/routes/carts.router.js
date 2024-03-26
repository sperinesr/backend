const express = require("express");
const router = express.Router();

const cartManager = require("../controllers/CartManagerDB.js")
const cManager = new cartManager()

router.post("/", async (req, res) => {
    try {
        await cManager.addCart();
        res.status(201).json({ message: "Carrito agregado exitosamente" })
    } catch (error) {
        console.log("Error al agregar carrito", error);
        res.status(500).json({ message: "Error del servidor" })
    }
})

router.get("/:id", async (req, res) => {
    // debe tener el mismo nombre de variable indicado en la ruta
    // el valor siempre se recupera como tipo string, es mejor transformarlo

    let id = req.params.id

    try {

        const cart = await cManager.getCartById(id)

        if (cart) {
            res.send(cart)
        } else {
            res.send("No existe el carrito con id: " + id)
        }
    } catch (error) {
        res.send("No se encontraron registros")
    }
})

// agregamos productos al carrito

router.post("/:cid/products/:pid", async (req, res) => {

    let cid = req.params.cid
    let pid = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const updatedCart = await cManager.addProductToCart(cid, pid, quantity);

        if (updatedCart) {
            res.status(400).send({ message: "Producto agregado" });
        } else {
            res.status(400).send({ message: "Producto No se agrego" });
        }

    } catch (error) {
        console.log("Error al agregar el producto", error);
        res.status(500).json({ message: "Error del servidor" })
    }
})

// Eliminamos producto del carrito: 

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cManager.eliminarProductoDelCarrito(cartId, productId);

        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// Actualizamos productos del carrito: 

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedProducts = req.body;
    // Debes enviar un arreglo de productos en el cuerpo de la solicitud

    try {
        const updatedCart = await cManager.actualizarCarrito(cartId, updatedProducts);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al actualizar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});


// Actualizamos las cantidades de productos

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;

        const updatedCart = await cManager.actualizarCantidadDeProducto(cartId, productId, newQuantity);

        res.json({
            status: 'success',
            message: 'Cantidad del producto actualizada correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

// Vaciamos el carrito: 

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await cManager.vaciarCarrito(cartId);

        res.json({
            status: 'success',
            message: 'Todos los productos del carrito fueron eliminados correctamente',
            updatedCart,
        });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor',
        });
    }
});

module.exports = router;