const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = 8080;
require("./database.js");

// importamos middleware logger
const addlogger = require("../src/utils/logger.js")

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");

const mockRouter = require("./routes/mocking.router.js")

const loggerRouter = require("./routes/logger.router.js")

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// usamos logger
app.use(addlogger)

//Passport 
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter, mockRouter, loggerRouter);


// Desafio 8 clase 39
// import swaggerJSDoc from 'swagger-jsdoc'
// import swaggerUiExpress from 'swagger-ui-express';

const SwaggerJSDoc = require("swagger-jsdoc")
const swaggerJSDoc = SwaggerJSDoc

const SwaggerUiExpress = require("swagger-ui-express")
const swaggerUiExpress = SwaggerUiExpress

// 3) creamos objeto de configuracion: swaggerOptions, tambien creamos las carpetas src/docs...
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la app E-commerce",
            description: "App web dedicada compras y gestion de productos a vender"
        }
    },
    apis: ["./src/docs/**/*.yaml"] //trucazo para leer todos los archivo a la vez de manera recursiva
}

// 4) conectamos swagger a nuestro servidor de express
const specs = swaggerJSDoc(swaggerOptions)

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))




const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

///Websockets: 
const SocketManager = require("./sockets/socketmanager.js");
new SocketManager(httpServer);



