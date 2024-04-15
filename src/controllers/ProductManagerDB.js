// const ProductModel = require("../models/products.js")

// class ProductManager {

//     async addProduct({ title, description, code, price, stock, category, thumbnail }) {

//         try {
//             if (!title || !description || !code || !price || !stock || !category) {
//                 console.log("Todos los campos deben ingresarse")
//                 return
//             }

//             const existe = await ProductModel.findOne({ code: code })

//             if (existe) {
//                 console.log("El codigo ya existe, ingresar uno diferente")
//                 return
//             }

//             const newProduct = new ProductModel({
//                 title: title,
//                 description: description,
//                 code: code,
//                 price: price,
//                 status : true,
//                 stock: stock,
//                 category: category,
//                 thumbnail: thumbnail || []
//             })

//             await newProduct.save()

//         } catch (error) {
//             console.log("Error al agregar el producto")
//             throw error
//         }
//     }

//     async getProducts() {

//         try {
//             const products = await ProductModel.find()
//             return products

//         } catch (error) {
//             console.log("Error al obtener productos")
//             throw error
//         }
//     }

//     async getProductById(id) {

//         try {

//             const product = await ProductModel.findById(id)

//             if (!product) {
//                 console.log("Producto no encontrado")
//                 return null
//             }

//             console.log("Producto encontrado")
//             return product

//         } catch (error) {
//             console.log("Error al obtener producto")
//             throw error
//         }
//     }

//     async updateProduct(id, prodductModified) {

//         try {

//             const productUpdated = await ProductModel.findByIdAndUpdate(id, prodductModified)

//             if (!productUpdated) {
//                 console.log("Producto no encontrado")
//                 return null
//             }

//             console.log("Producto actualizado")
//             return productUpdated

//         } catch (error) {
//             console.log("Error al actualizar producto")
//             throw error
//         }
//     }

//     async deleteProduct(id) {

//         try {

//             const product = await ProductModel.findByIdAndDelete(id)

//             if (!product) {
//                 console.log("Producto no encontrado")
//                 return null
//             }

//             console.log("Producto eliminado")
//             return
//             //return product

//         } catch (error) {
//             console.log("Error al eliminar producto")
//             throw error
//         }
//     }
// }

// module.exports = ProductManager