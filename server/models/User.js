const mongoose = require("mongoose");
const Product = require("./Product");
const Orders = require("./Orders");
let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  passwordRecoverCode: {
    type: String,
  },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      addedQuantity: Number,
    },
  ],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  address: {
    type: Array,
  },
  type: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
