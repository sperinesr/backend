// const express = require("express");
// const router = express.Router();
// const UserModel = require("../models/user.model.js");
// // importamos la comparacion de password hasheado
// const passport = require("passport")

// //pasport register
// router.post("/register", passport.authenticate("register"), async (req, res) => {
//     if (!req.user) return res.status(401).send({ message: "Credenciales invalidas" });

//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         age: req.user.age,
//         email: req.user.email,
//         role: req.user.role,
//         cart: req.user.cart
//     }

//     req.session.login = true;

//     res.redirect("/login");
// })

// //pasport login
// router.post("/api/users/login", passport.authenticate("login", { failureRedirect: "/login" }), async (req, res) => {
//     if (!req.user) return res.status(400).send({ status: "error" })
//     req.session.user = {
//         first_name: req.user.first_name,
//         last_name: req.user.last_name,
//         email: req.user.email,
//         age: req.user.age,
//         role: req.user.role,
//         cart: req.user.cart
//     }
//     req.session.login = true;
//     res.redirect("/api/products")
// })


// //Logout

// router.get("/logout", (req, res) => {
//     if (req.session.login) {
//         req.session.destroy()
//     }
//     res.redirect("/login")
// })

// // version para github
// // se pone el nombre de la estrategia "github" como se configuro
// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {

// })
// // se pone el nombre de la estrategia "github" como se configuro
// router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
//     // la estrategia retornara el usuario entonces lo agregamos a la sesion
//     req.session.user = req.user;
//     req.session.login = true;
//     res.redirect("/api/products")
// })



// module.exports = router;