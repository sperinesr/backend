const express = require("express")
const router = express.Router()

// const ProductManager = require("../controllers/ProductManagerDB.js")
// const pManager = new ProductManager()

// router.get("/", async (req, res) => {
//    res.render("chat");
// })

router.get("/", (req, res) => {
   if (req.session.login) {
      return res.redirect("/api/products");
   }
   res.render("login");
});

// Ruta para el formulario de login
router.get("/login", (req, res) => {
   if (req.session.login) {
      return res.redirect("/api/products");
   }
   res.render("login");
});
// Ruta para el formulario de registro
router.get("/register", (req, res) => {
   if (req.session.login) {
      return res.redirect("/login");
   }
   res.render("register");
});

// Ruta para la vista de perfil
router.get("/api/products", (req, res) => {
   if (!req.session.login) {
      return res.redirect("/login");
   }
   res.render("home", { user: req.session.user });
});
// Ruta para logout
router.get("/logout", (req, res) => {
   if (req.session.login) {
      req.session.destroy()
      return res.redirect("/login");
   }
   res.render("login");
});

// realtimeproducts

// router.get("/realtimeproducts", async (req, res) => {
//     try {

//         res.render("realtimeproducts");

//     } catch (error) {

//         console.log("Error al mostrar productos en tiempo real", error);
//         res.status(500).json({ message: "Error del servidor" })

//     }
// })

module.exports = router
