const { trusted } = require("mongoose");
const ProductRepository = require("../repositories/products.repository.js");
const productRepository = new ProductRepository();

class ProductController {

    async createProduct(req, res) {
        const newProduct = req.body;
        try {
            const product = await productRepository.addProduct(newProduct);

            // res.status(200).send("producto creado");
            res.send({ products: product })
        } catch (error) {
            res.status(500).send("Error en product controller");
        }
    }

    async getAllProducts(req, res) {

        try {
            let { limit = 10, page = 1, sort, query } = req.query;

            const products = await productRepository.getProducts(limit, page, sort, query)

            res.send(products)

        } catch (error) {
            res.status(500).send("Error en product controller");
        }
    }

    async getProduct(req, res) {

        const id = req.params.pid;

        try {
            const product = await productRepository.getProductById(id)

            if (!product) {
                return res.json({
                    error: "No se encontro el producto"
                });
            }

            res.json(product);

        } catch (error) {
            res.status(500).send("Error en product controller");
        }
    }

    async updateProduct(req, res) {
        const id = req.params.pid;
        const product = req.body;

        try {
            const updatedProduct = await productRepository.updateProduct(id, product)

            res.json("producto: " + updatedProduct.title + " actualizado");

        } catch (error) {
            res.status(500).send("Error en product controller");
        }
    }

    async deleteProduct(req, res) {

        const id = req.params.pid;

        try {
            const product = await productRepository.deleteProduct(id);

            res.status(200).send(product);

        } catch (error) {
            res.status(500).send("Error en product controller");
        }
    }
}

module.exports = ProductController;