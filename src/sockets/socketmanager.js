const socket = require("socket.io");
const ProductRepository = require("../repositories/products.repository.js");
const productRepository = new ProductRepository();
const MessageModel = require("../models/message.model.js");

const UserRepository = require("../repositories/user.repository.js")
const userRepository = new UserRepository()

const EmailManager = require("../services/email.js")
const emailManager = new EmailManager()

class SocketManager {
    constructor(httpServer) {
        this.io = socket(httpServer);
        this.initSocketEvents();
    }

    async initSocketEvents() {
        this.io.on("connection", async (socket) => {
            console.log("Un cliente se conectó");

            socket.emit("productos", await productRepository.getProducts());

            socket.on("eliminarProducto", async (id) => {

                const product = await productRepository.deleteProduct(id);

                const user = await userRepository.findById(product.owner)

                if (user.role === "premium") {
                    emailManager.enviarCorreoProducto(user.email, user.first_name, product.title)
                }

                this.emitUpdatedProducts(socket);
            });

            socket.on("agregarProducto", async (producto) => {
                await productRepository.addProduct(producto);
                this.emitUpdatedProducts(socket);
            });

            socket.on("message", async (data) => {
                await MessageModel.create(data);
                const messages = await MessageModel.find();
                socket.emit("message", messages);
            });
        });
    }

    async emitUpdatedProducts(socket) {
        socket.emit("productos", await productRepository.getProducts());
    }
}

module.exports = SocketManager;
