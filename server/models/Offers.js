const mongoose = require("mongoose");

let offerSchema = mongoose.Schema({
  offerId: {
    type: String,
    required: true,
  },
  offerName: {
    type: String,
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
  display: {
    type: Boolean,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Offers", offerSchema);
