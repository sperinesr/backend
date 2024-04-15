const express = require("express");
const router = express.Router();

const productManager = require("../controllers/product.controller.js");
const pManager = new productManager();

// rutas
router.get("/", pManager.getAllProducts);
router.get("/:id", pManager.getProduct);
router.post("/", pManager.createProduct);
router.put("/", pManager.updateProduct);
router.delete("/", pManager.deleteProduct);




// req.params & query.params
// router.get("/", async (req, res) => {

//     let limit = Number(req.query.limit) || 10
//     let page = Number(req.query.page) || 1
//     let sort = String(req.query.sort) || undefined
//     let query

//     if (sort == "asc" || sort == 1) {
//         sort = 1
//     } else if (sort == "desc" || sort == -1) {
//         sort = -1
//     } else {
//         sort = undefined
//     }

//     if ((req.query.query !== undefined && req.query.query !== null && req.query.query != {})) {
//         query = JSON.parse(req.query.query);
//     } else {
//         query = {}
//     }

//     try {

//         const products = await productModel.paginate(
//             query,
//             {
//                 // limit, paginacion y sort
//                 limit: limit,
//                 page: page,
//                 sort: sort !== undefined ? { price: sort } : sort
//             }
//         )

//         // RECUPERAMOS EL DOCS

//         const productsFinal = products.docs.map(product => {
//             const { id, ...rest } = product.toObject()
//             return rest
//         })

//         const newArrayProducts = productsFinal.map(producto => {

//             return {
//                 id: producto._id,
//                 title: producto.title,
//                 description: producto.description,
//                 price: producto.price,
//                 stock: producto.stock,
//                 thumbnail: producto.thumbnail,
//             }


//         })

//         if (!req.session.login) {
//             return res.redirect("/login")
//         }

//         const final = {
//             user: req.session.user,
//             payload: newArrayProducts,
//             hasPrevPage: products.hasPrevPage,
//             hasNextPage: products.hasNextPage,
//             prevPage: products.prevPage,
//             nextPage: products.nextPage,
//             page: products.page,
//             totalPages: products.totalPages,
//             prevLink: products.prevLink,
//             nextLink: products.nextLink,
//             limit: limit,
//             sort: sort,
//             query: query,
//         }

//         res.render("home", final)

//     } catch (error) {
//         console.log("Error al obtener productos! ", error)
//         res.status(500).json({ error: "Error interno del servidor" })
//     }
// })

// router.get("/:id", async (req, res) => {
//     // debe tener el mismo nombre de variable indicado en la ruta
//     // el valor siempre se recupera como tipo string, es mejor transformarlo

//     let id = req.params.id

//     try {

//         const product = await productModel.findById(id)

//         const prod = ({
//             id: product._id,
//             title: product.title,
//             description: product.description,
//             price: product.price,
//             stock: product.stock,
//             thumbnail: product.thumbnail
//         })

//         if (product) {
//             res.render("home", { payload: { prod }, user: req.session.user })
//         } else {
//             res.render("home", "No existe el producto con codigo: " + id)
//         }
//     } catch (error) {
//         console.log("Error al obtener producto! ", error)
//         res.status(500).json({ error: "Error interno del servidor" })
//     }
// })

// router.post("/", async (req, res) => {
//     let title = req.body;
//     let description = req.body;
//     let code = req.body;
//     let price = req.body;
//     let stock = req.body;
//     let category = req.body;
//     let thumbnail = req.body;

//     try {
//         await pManager.addProduct(title, description, code, price, stock, category, thumbnail);
//         res.status(201).json({ message: "Producto agregado exitosamente" })
//     } catch (error) {
//         console.log("Error al agregar producto", error);
//         res.status(500).json({ message: "Error del servidor" })
//     }
// })

// router.put("/:pid", async (req, res) => {
//     let id = req.params.pid;
//     let prod = req.body
//     // let param = req.body;
//     // let value = req.body;

//     try {
//         await pManager.updateProduct(id, prod)
//         res.json({ message: "Producto actualizado correctamente" })
//     } catch (error) {
//         console.log("Error al actualizar producto", error);
//         res.status(500).json({ message: "Error del servidor" })
//     }
// })

// router.delete("/:pid", async (req, res) => {
//     let id = req.params.pid;

//     try {
//         await pManager.deleteProduct(id)
//         res.json({ message: "Producto eliminado correctamente" })
//     } catch (error) {
//         console.log("Error al eliminar producto", error);
//         res.status(500).json({ message: "Error del servidor" })
//     }
// })

module.exports = router