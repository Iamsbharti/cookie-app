const mongoose = require("mongoose");
const Images = require("./Images");
let productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Images" }],
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  addedQuantity: {
    type: Number,
    default: 1,
  },
  purchaseCount: {
    type: Number,
    default: 0,
  },
  seller: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
  },
});
module.exports = mongoose.model("Product", productSchema);
