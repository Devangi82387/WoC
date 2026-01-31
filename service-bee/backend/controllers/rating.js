import Rating from "../models/Rating.js";
import Booking from "../models/Booking.js";
import ServiceProvider from "../models/ServiceProvider.js";

const updateAverageRating = async (providerId) => {
  const stats = await Rating.aggregate([
    { $match: { serviceProvider: providerId } },
    {
      $group: {
        _id: "$serviceProvider",
        avgRating: { $avg: "$rating" }
      }
    }
  ]);

  await ServiceProvider.findByIdAndUpdate(providerId, {
    averageRating: stats.length ? stats[0].avgRating : 0
  });
};

export const createRating = async (req, res) => {
  try {
    const { booking: bookingId, rating } = req.body;

    const bookingDoc = await Booking.findById(bookingId);
    if (!bookingDoc) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (bookingDoc.status !== "completed") {
      return res.status(400).json({
        message: "Rating allowed only after service completion"
      });
    }

    if (bookingDoc.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to rate this booking" });
    }

    const alreadyRated = await Rating.findOne({ booking: bookingId });
    if (alreadyRated) {
      return res.status(400).json({ message: "Rating already submitted" });
    }

    const newRating = await Rating.create({
      booking: bookingId,
      customer: req.user.id,                 
      serviceProvider: bookingDoc.serviceProvider,
      rating
    });

    await updateAverageRating(bookingDoc.serviceProvider);

    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
