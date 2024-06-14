// los archivos van en src/uploads
// firestore es una alternativa y hay mas servicios para eso

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder;

        switch (file.fieldname) {
            case "profiles":
                destinationFolder = "./src/iploads/profiles"
                break;
            case "products":
                destinationFolder = "./src/iploads/products"
                break;
            case "documents":
                destinationFolder = "./src/iploads/documents"
                break;

            default:
                break;
        }
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload