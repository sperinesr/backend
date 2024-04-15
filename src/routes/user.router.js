const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");

// hasheo de contraseña
// const { createHash } = require("../utils/hashbcrypt.js");

// passport
const passport = require("passport")

router.post("/", passport.authenticate("login", { failureRedirect: "/login" }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error" })
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        cart: req.user.cart
    }
    req.session.login = true;
    res.redirect("/api/products")
})

// router.get("/failedregister", (req, res) => {
//     res.send({ error: "registrofallido" })
// })

module.exports = router; 