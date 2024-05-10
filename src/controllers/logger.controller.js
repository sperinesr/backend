const LoggerRepository = require("../repositories/logger.repository.js");
const loggerRepository = new LoggerRepository();

class LoggerController {

    async createLog(req, res) {
        try {
            await loggerRepository.addLog(description);
            res.status(200).send("log creado");
        } catch (error) {
            res.status(500).send("Error en logger controller");
        }
    }

    async getAllLogs(req, res) {

        try {
            const logs = await loggerRepository.getLogs()

            res.json(logs);

        } catch (error) {
            res.status(500).send("Error en logger controller");
        }
    }
}

module.exports = LoggerController;