const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controller.js");
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);
router.post("/logout", userController.logout.bind(userController));
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);

// integradora 3
router.post("/requestpasswordreset", userController.requestPasswordReset)
router.post("/passwordreset", userController.resetPassword)
router.get("/premium/:uid", userController.cambiarRolPremium)

// integradora 4
const UserRepository = require("../repositories/user.repository.js")
const userRepository = new UserRepository()
// con multer para los archivos y lo importamos
const upload = require("../middleware/multer.js")

router.post("/:uid/documents", upload.fields([{ name: "documents" }, { name: "products" }, { name: "profiles" }]), async (req, res) => {
    const { uid } = req.params
    const uploadedDocuments = req.files

    try {
        const user = await userRepository.findById(uid)

        if (!user) {
            return res.status(404).send("Usuario no encontrado")
        }

        // verificamos si se suben los docs y se actualiza el usuario

        if (uploadedDocuments.documents) {
            user.document = user.documents.concat(uploadedDocuments.documents.map
                (doc => ({
                    name: doc.originalname,
                    reference: doc.path

                })))
        }

        if (uploadedDocuments.products) {
            user.document = user.documents.concat(uploadedDocuments.products.map
                (doc => ({
                    name: doc.originalname,
                    reference: doc.path

                })))
        }

        if (uploadedDocuments.profiles) {
            user.document = user.documents.concat(uploadedDocuments.profiles.map
                (doc => ({
                    name: doc.originalname,
                    reference: doc.path

                })))
        }

        // guardamos los cambios
        await user.save()

        res.status(200).send("Archivos subidos")

    } catch (error) {
        res.status(500).send("Error en router")
    }
})

module.exports = router;

