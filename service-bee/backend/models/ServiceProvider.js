const mongoose = require("mongoose");

const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true
  },
  city: {
    type: String
  },
  budget: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("ServiceProvider", ServiceProviderSchema);
