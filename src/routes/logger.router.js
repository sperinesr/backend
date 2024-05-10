const express = require("express");
const router = express.Router();

// Test LOGGER
router.get("/loggertest", (req, res) => {
    req.logger.error("Esto es un error!")
    req.logger.warning("Esto es un warning!")
    req.logger.info("Esto es una informacion")

    res.send("Logs generados")
})


module.exports = router;