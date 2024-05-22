const mongoose = require("mongoose")
// paginacion
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: [String] },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
})

productSchema.pre('findOne', function (next) {
  this.populate('owner', '_id role');
  next();
});

// paginacion
productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("products", productSchema)

module.exports = ProductModel