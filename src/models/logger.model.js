const mongoose = require("mongoose")

const loggerSchema = new mongoose.Schema({
    description: { type: String, required: true },
})

const LoggerModel = mongoose.model("logs", loggerSchema)

module.exports = LoggerModel