const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
let orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      addedQuantity: Number,
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  invoice: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  dueDeliveryDate: {
    type: Date,
  },
  deliveryStatus: {
    type: Number,
  },
  address: {
    type: Array,
  },
  dues: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Orders", orderSchema);
