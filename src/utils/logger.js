const winston = require("winston")

const loggerModel = require("../models/logger.model.js")

// personalizando niveles
const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colores: {
        fatal: "red",
        error: "yellow",
        warning: "blue",
        info: "green",
        http: "magenta",
        debug: "white"
    }
}

// creamos nuevo logger con los niveles y colores que configuramos
const logger = winston.createLogger({
    // niveles
    levels: niveles.nivel,
    // transportes
    transports: [
        // transporte por consola
        new winston.transports.Console({
            level: "http",
            format: winston.format.combine(
                winston.format.colorize({ colors: niveles.colores }),
                winston.format.simple()
            )
        }),
        // transporte para archivo, solo guardara warnings y error
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple()
        })
    ]
})

// creamos nuestro propio middleware
const addLogger = async (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`)
    const logs = new loggerModel({description: `${req.method} en ${req.url} -${new Date().toLocaleTimeString()}`})
    await logs.save()
    next()
}

// exportamos
module.exports = addLogger