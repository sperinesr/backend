const CartModel = require("../models/cart.model.js")

// control de errores
const { generarInfoError } = require("../services/errors/info.js")
const { EErrors } = require("../services/errors/enums.js")
const CustomError = require("../services/errors/custom-error.js")

class CartRepository {

    async addCart() {
        try {
            const newCart = new CartModel({ products: [] })
            await newCart.save()
            return newCart
        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

    async getCartById(idc) {
        try {
            const cart = await CartModel.findById(idc)

            if (!cart) {
                console.log("Carrito no encontrado")
                return null
            }

            return cart

        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

    async addProductToCart(cid, pid) {

        try {
            const cart = await this.getCartById(cid)

            const existeP = cart.products.findIndex(item => item.product._id.toString() === pid)

            if (!cart) {
                throw CustomError.crearError({
                    nombre: "agregar producto al carro",
                    causa: generarInfoError(cart),
                    mensaje: "Error al intentar agregar productos al carrito ",
                    codigo: EErrors.TIPO_INVALIDO
                })
            };

            if (existeP !== -1) {
                cart.products[existeP].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 })
            }

            // marcar propiedad products como modificada
            cart.markModified("products")

            await cart.save()

            return cart


        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

    async deleteCartProduct(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }


    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await this.getCartById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return cart;

        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

    async updateQuantityProduct(cartId, productId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId)

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;


                cart.markModified('products');

                await cart.save();
                return cart;

            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

    async cleanCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            );

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart;
        } catch (error) {
            throw new Error("Error en cart repository");
        }
    }

}

module.exports = CartRepository