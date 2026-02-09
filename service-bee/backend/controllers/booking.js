import Booking from "../models/Booking.js";
import ServiceProvider from "../models/ServiceProvider.js";

export const createBooking = async (req, res) => {
  try {
    const { providerId, description, address } = req.body;

    // Get logged-in customer
    const customerId = req.user.id;

    // Fetch provider & category from DB
    const provider = await ServiceProvider
      .findById(providerId)
      .populate("category");

    if (!provider) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    const booking = await Booking.create({
      customer: customerId,
      serviceProvider: provider._id,
      category: provider.category._id,
      description,
      address,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate("serviceProvider", "name city description averageRating")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ serviceProvider: req.user.id })
      .populate("customer", "firstName lastName mobileNo")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.serviceProvider.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking status updated",
      booking
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const allBooking = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "firstName lastName email")
      .populate("serviceProvider", "name email")
      .populate("category", "name");

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};