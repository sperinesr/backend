// importamos los modulos
const passport = require("passport")
const local = require("passport-local")
// importamos los modelos
const Usermodel = require("../models/user.model.js")
// importamos el hasheo
const { createHash, isValidPassword } = require("../utils/hashbcrypt.js")
// estrategia con github
const gitHubStrategy = require("passport-github2");
// cartManager
const cartManager = require("../controllers/cart.controller.js")
const cManager = new cartManager()

// definimos la estrategia
const LocalStrategy = local.Strategy

// funcion inicializadora
const initializePassport = () => {
    // creamos estrategia register
    passport.use("register", new LocalStrategy({
        // decimos que queremos acceder al objeto request
        passReqToCallback: true,
        // definimos el username
        usernameField: "email"
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body

        try {
            // verificamos si existe registro de ese email
            let user = await Usermodel.findOne({ email })
            // si existe es false
            if (user) return done(null, false)
            // si no existe se crea un cart y registro nuevo
            const cart = await cManager.addCart()

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                role: "user",
                password: createHash(password),
                cart: cart.id
            }

            let result = await Usermodel.create(newUser)
            // si todo sale bien enviamos el done con el result
            return done(null, result)

        } catch (error) {
            return done(error)
        }
    }))
    // creamos estrategia login
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            // verificar si existe usuario con ese email
            const user = await Usermodel.findOne({ email })

            if (!user) {
                console.log("usuario no existe")
                return done(null, false)
            }
            // si existe verifico la contaseña
            if (!isValidPassword(password, user)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await Usermodel.findById({ _id: id })
        return done(null, user)
    })

    // estrategia con github
    passport.use("github", new gitHubStrategy({
        clientID: "Iv1.f3ed2342d8655fac",
        clientSecret: "39f3aa41583b01800e1a7fb0fbea463898e4d361",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        // opcional, si quieres ver como llegar al perfil del usuario usar
        console.log(profile)
        try {
            let user = await Usermodel.findOne({ email: profile._json.email })

            if (!user) {
                // si no hay usuario lo creamos
                let newUser = {
                    first_name: profile._json.email,
                    last_name: "secret",
                    age: 22,
                    email: profile._json.email,
                    rol: "user",
                    password: "secret"
                }
                // ya con el nuevo usuario, lo guardo en mongodb
                let result = await Usermodel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error);
        }
    }))
}




module.exports = initializePassport