// const CartModel = require("../models/carts.js")

// class CartManager {

//     async addCart() {
//         try {
//             const newCart = new CartModel({ products: [] })
//             await newCart.save()
//             return newCart
//         } catch (error) {
//             console.log("Error al crear nuevo carrito")
//             throw error
//         }
//     }

//     async getCartById(id) {
//         try {
//             const cart = await CartModel.findById(id)

//             if (!cart) {
//                 console.log("Carrito no encontrado")
//                 return null
//             }

//             return cart

//         } catch (error) {
//             console.log("Error al mostrar carrito")
//             throw error
//         }
//     }

//     async addProductToCart(cid, pid, quantity = 1) {
//         try {
//             const cart = await CartModel.findById(cid)

//             if (!cart) {
//                 throw new Error("El carrito no existe");
//             }

//             const existeP = cart.products.findIndex(item => item.product.toJSON() === pid)

//             if (existeP !== -1 && existeP != undefined) {
//                 cart.products[existeP].quantity += quantity;
//             } else {
//                 cart.products.push({ product: pid, quantity })
//             }

//             // marcar propiedad products como modificada
//             cart.markModified("products")

//             await cart.save()

//             return cart

//         } catch (error) {
//             console.log("Error al agregar producto al carrito")
//             throw error
//         }
//     }

//     async eliminarProductoDelCarrito(cartId, productId) {
//         try {
//             const cart = await CartModel.findById(cartId);

//             if (!cart) {
//                 throw new Error('Carrito no encontrado');
//             }

//             //cart.products = cart.products.filter(item => item.product.toString() !== productId);
//             cart.products = cart.products.filter(item => item.product._id.toString() !== productId);

//             await cart.save();
//             return cart;
//         } catch (error) {
//             console.error('Error al eliminar el producto del carrito en el gestor', error);
//             throw error;
//         }
//     }


//     async actualizarCarrito(cartId, updatedProducts) {
//         try {
//             const cart = await CartModel.findById(cartId);

//             if (!cart) {
//                 throw new Error('Carrito no encontrado');
//             }

//             cart.products = updatedProducts;

//             cart.markModified('products');

//             await cart.save();

//             return cart;
//         } catch (error) {
//             console.error('Error al actualizar el carrito en el gestor', error);
//             throw error;
//         }
//     }

//     async actualizarCantidadDeProducto(cartId, productId, newQuantity) {
//         try {
//             const cart = await CartModel.findById(cartId);

//             if (!cart) {
//                 throw new Error('Carrito no encontrado');
//             }

//             const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

//             if (productIndex !== -1) {
//                 cart.products[productIndex].quantity = newQuantity;


//                 cart.markModified('products');

//                 await cart.save();
//                 return cart;
//             } else {
//                 throw new Error('Producto no encontrado en el carrito');
//             }
//         } catch (error) {
//             console.error('Error al actualizar la cantidad del producto en el carrito', error);
//             throw error;
//         }
//     }

//     async vaciarCarrito(cartId) {
//         try {
//             const cart = await CartModel.findByIdAndUpdate(
//                 cartId,
//                 { products: [] },
//                 { new: true }
//             );

//             if (!cart) {
//                 throw new Error('Carrito no encontrado');
//             }

//             return cart;
//         } catch (error) {
//             console.error('Error al vaciar el carrito en el gestor', error);
//             throw error;
//         }
//     }

// }


// module.exports = CartManager;