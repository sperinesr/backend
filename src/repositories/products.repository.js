const ProductModel = require("../models/product.model.js")

class ProductRepository {

    async addProduct({ title, description, code, price, stock, category, thumbnail, owner }) {

        try {
            if (!title || !description || !code || !price || !stock || !category) {
                console.log("Todos los campos deben ingresarse")
                return
            }

            console.log(title, description, code, price, stock, category, thumbnail, owner)

            const exist = await ProductModel.findOne({ code: code })

            console.log(exist)

            if (exist !== null) {
                console.log("El codigo ya existe, ingresar uno diferente")
                return
            }

            const newProduct = new ProductModel({
                title: title,
                description: description,
                code: code,
                price: price,
                status: true,
                stock: stock,
                category: category,
                thumbnail: thumbnail || [],
                owner: owner
            })

            console.log(newProduct)

            await newProduct.save()

            return { products: newProduct }

        } catch (error) {
            throw new Error("Error al agregar producto en repository");
        }
    }

    async getProducts(limit, page, sort, query) {
        try {
            const skip = (page - 1) * limit;

            const sortOpt = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOpt.price = sort === 'asc' ? 1 : -1;
                }
            }

            let queryOpt = {};
            if (query) {
                queryOpt = { category: query };
            }

            const products = await ProductModel
                .find(queryOpt)
                .sort(sortOpt)
                .skip(skip)
                .limit(limit)

            const totalProducts = await ProductModel.countDocuments(queryOpt);

            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                products: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sortOpt}&query=${queryOpt}` : null,
                nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sortOpt}&query=${queryOpt}` : null,
            };

        } catch (error) {
            throw new Error("Error al obtener productos en repository");
        }
    }

    async getProducts2() {

        try {

            const products = await ProductModel.find()

            if (!products) {
                console.log("Productos no encontrados")
                return null
            }

            console.log("Productos encontrados")
            return products

        } catch (error) {
            console.log("Error al obtener productos")
            throw error
        }
    }

    async getProductById(id) {

        try {

            const product = await ProductModel.findById(id)

            if (!product) {
                console.log("Producto no encontrado")
                return null
            }

            console.log("Producto encontrado")
            return product

        } catch (error) {
            console.log("Error al obtener producto")
            throw error
        }
    }

    async updateProduct(id, prodductModified) {

        try {

            const productUpdated = await ProductModel.findByIdAndUpdate(id, prodductModified)

            if (!productUpdated) {
                console.log("Producto no encontrado")
                return null
            }

            console.log("Producto actualizado")
            return productUpdated

        } catch (error) {
            console.log("Error al actualizar producto")
            throw error
        }
    }

    async deleteProduct(id) {

        try {

            const product = await ProductModel.findByIdAndDelete(id)

            if (!product) {
                console.log("Producto no encontrado")
                return null
            }

            console.log("Producto eliminado")
            return product

        } catch (error) {
            console.log("Error al eliminar producto")
            throw error
        }
    }

}

module.exports = ProductRepository