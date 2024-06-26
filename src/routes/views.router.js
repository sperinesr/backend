const express = require("express");
const router = express.Router();
const ViewsController = require("../controllers/view.controller.js");
const viewsController = new ViewsController();
const checkUserRole = require("../middleware/checkrole.js");
const passport = require("passport");

router.get("/products", checkUserRole(['user']), passport.authenticate('jwt', { session: false }), viewsController.renderProducts);
router.get("/products/:pid", checkUserRole(['user']), passport.authenticate('jwt', { session: false }), viewsController.renderProduct);

router.get("/carts/:cid", viewsController.renderCart);
router.get("/login", viewsController.renderLogin);
router.get("/register", viewsController.renderRegister);
router.get("/realtimeproducts", checkUserRole(['admin', 'premium']), viewsController.renderRealTimeProducts);
router.get("/chat", checkUserRole(['user','premium']), viewsController.renderChat);
router.get("/", viewsController.renderHome);
// logger
router.get("/loggertest", viewsController.renderLoggerTest);

// integradora 3
router.get("/passwordreset", viewsController.renderPasswordReset);
router.get("/password", viewsController.renderChangePassword);
router.get("/sendconfirmation", viewsController.renderConfirmation);

module.exports = router;