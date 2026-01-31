import mongoose from "mongoose";

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

export default mongoose.model("ServiceProvider", ServiceProviderSchema);
