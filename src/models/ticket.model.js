const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now, required: true },
    amount: { type: Number, required: true },
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

})

ticketSchema.pre('findOne', function (next) {
    this.populate('purchaser', '_id first_name last_name');
    next();
});

const TicketModel = mongoose.model("tickets", ticketSchema)


module.exports = TicketModel