// DESAFIO COMPLEMENTARIO 2 - CLASE 24

// express
const express = require("express")
const app = express()
const PUERTO = 8080
// handlebars
const exhb = require("express-handlebars")
// passport
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
// session
const session = require("express-session");

// mongostore
// const MongoStore = require("connect-mongo");

// routes
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");

require("../src/database.js")

//Express-handlebars
app.engine("handlebars", exhb.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}))

//Passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

// routing
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter)
app.use("/", viewsRouter)
app.use("/api/users", userRouter);
app.use("/", sessionRouter);




// iniciador del servidor pero para el SOCKET
const httpServer = app.listen(PUERTO, () => {
    console.log("escuchando...")
})

httpServer

//////////////////////////////////////////////
// multer
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./src/models/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, "products.json")
//     }
// })

// app.use(multer({ storage }).single("products"))
//////////////////////////////////////////////

//////////////////////////////////////////////
// SOCKET.IO
// const socket = require("socket.io")

// CHAT
// const MessageModel = require("./models/message.js");
// const io = new socket.Server(httpServer);

// io.on("connection", (socket) => {
//     console.log("Nuevo usuario conectado");

//     socket.on("message", async data => {

//         //Guardo el mensaje en MongoDB:
//         await MessageModel.create(data);

//         //Obtengo los mensajes de MongoDB y se los paso al cliente:
//         const messages = await MessageModel.find();
//         console.log(messages);
//         io.sockets.emit("message", messages);

//     })
// })

// obtener array de productos para actualizar constantemente
// const productManager = require("./controllers/ProductManagerDB.js")
// const pManager = new productManager()

// -configurar server socket.io
// const io = socket(httpServer)

// -iniciar conexion
// io.on("connection", async (socket) => {
//     console.log("Un ciente se ha conectado con nosotros")

//     // enviar array de productos al cliente que se conecto
//     socket.emit("products", await pManager.getProducts())

//     // recibimos el evento eliminarProducto desde el cliente
//     socket.on("eliminarProducto", async (id) => {
//         await pManager.deleteProduct(id)

//         // enviamos la lista actualizada al cliente
//         io.sockets.emit("products", await pManager.getProducts())
//     })

//     //recibir evento agregarProducto del cliente
//     socket.on("agregarProducto", async (product) => {
//         console.log(product)
//         await pManager.addProduct(product)

//         // enviar lista actualizada al cliente
//         io.sockets.emit("products", await pManager.getProducts())
//     })
// })
//////////////////////////////////////////////