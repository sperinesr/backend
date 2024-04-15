const ProductRepository = require("../repositories/products.repository.js");
const productRepository = new ProductRepository();

class ProductController {


    async createProduct(req, res) {
        const newProduct = req.body;
        try {
            await productRepository.addProduct(newProduct);
            res.status(200).send("producto creado");
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }

    async getAllProducts(req, res) {

        let limit = Number(req.query.limit) || 10
        let page = Number(req.query.page) || 1
        let sort = String(req.query.sort) || undefined
        let query

        if (sort == "asc" || sort == 1) {
            sort = 1
        } else if (sort == "desc" || sort == -1) {
            sort = -1
        } else {
            sort = undefined
        }

        if ((req.query.query !== undefined && req.query.query !== null && req.query.query != "{}")) {
            query = JSON.parse(req.query.query);
        } else {
            query = "{}"
        }

        console.log(`limit: ${limit} page: ${page} sort: ${sort} query: ${query} `)

        try {
            const products = await productRepository.getProducts()
            // .paginate(
            //     query,
            //     {
            //         // limit, paginacion y sort
            //         limit: limit,
            //         page: page,
            //         sort: sort !== undefined ? { price: sort } : undefined
            //     }
            // )

            // RECUPERAMOS EL DOCS

            // const productsFinal = products.docs.map(product => {
            //     const { id, ...rest } = product.toObject()
            //     return rest
            // })

            const newArrayProducts = products.map(producto => {
                return {
                    id: producto._id,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    stock: producto.stock,
                    thumbnail: producto.thumbnail,
                }
            })

            // SESION

            if (!req.session.login) {
                return res.redirect("/login")
            }

            const final = {
                user: req.session.user,
                payload: newArrayProducts,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                totalPages: products.totalPages,
                prevLink: products.prevLink,
                nextLink: products.nextLink,
                limit: limit,
                sort: sort,
                query: query,
            }

            console.log(final)

            res.render("home", final)


        } catch (error) {
            res.status(500).json("Error del servidor en controller");
        }
    }

    async getProduct(req, res) {

        const id = req.params.id;

        try {
            const product = await productRepository.getProductById(id)

            const prod = ({
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
                thumbnail: product.thumbnail
            })
            res.render("home", { payload: { prod }, user: req.session.user })
        } catch (error) {
            res.status(500).json("Error del servidor en controller");
        }
    }

    async updateProduct(req, res) {
        const id = req.body;
        const product = req.body;

        try {
            const updatedProduct = await productRepository.updateProduct(id, product)
            res.status(200).send("producto: " + updatedProduct.title + " actualizado");

        } catch (error) {
            console.log("Error del servidor")
        }
    }

    async deleteProduct(req, res) {

        const id = req.body;

        try {
            const deleted = await productRepository.deleteProduct(id);
            res.status(200).send("producto: " + deleted.title + " eliminado");
        } catch (error) {
            res.status(500).json("Error del servidor");
        }
    }
}

module.exports = ProductController;