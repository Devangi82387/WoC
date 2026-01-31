import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
    default: 3
  }
});

export default mongoose.model("Rating", RatingSchema);
