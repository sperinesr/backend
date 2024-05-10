const LoggerModel = require("../models/logger.model.js")

class LoggerRepository {

    async addLog(description) {

        try {
            if (!description) {
                return null
            }

            const newLog = new LoggerModel({
                description: description,
            })

            await newLog.save()

            return newLog

        } catch (error) {
            throw new Error("Error al agregar log en repository");
        }
    }

    async getLogs() {
        try {

            const logs = await LoggerModel.find()

            return logs

        } catch (error) {
            throw new Error("Error al obtener logs en repository");
        }
    }
}

module.exports = LoggerRepository