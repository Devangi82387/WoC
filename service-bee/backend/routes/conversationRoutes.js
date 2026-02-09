import express from "express";
import Conversation from "../models/Conversation.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Get or create conversation by bookingId
router.get("/:bookingId", async (req, res) => {
  try {
    // 1️⃣ Try to find an existing conversation
    let conversation = await Conversation.findOne({ bookingId: req.params.bookingId })
      .populate("providerId", "name")
      .populate("customerId", "firstName lastName")
      .populate("adminId", "name")
      .populate({
        path: "lastMessage",
        populate: { path: "senderId", select: "name" },
      });

    // 2️⃣ If conversation doesn't exist, create it
    if (!conversation) {
      // ✅ Correctly fetch the booking using its real schema fields
      const booking = await Booking.findById(req.params.bookingId)
        .populate("serviceProvider") // not providerId
        .populate("customer");       // not customerId

      if (!booking) return res.status(404).json({ message: "Booking not found" });

      // ✅ Create the conversation with correct references
      conversation = await Conversation.create({
        bookingId: booking._id,
        providerId: booking.serviceProvider._id,
        customerId: booking.customer._id,
        adminId: null,
      });

      // 3️⃣ Populate the newly created conversation
      conversation = await Conversation.findById(conversation._id)
        .populate("providerId", "name")
        .populate("customerId", "firstName lastName")
        .populate("adminId", "name")
        .populate({
          path: "lastMessage",
          populate: { path: "senderId", select: "name" },
        });
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Create conversation
router.post("/", async (req, res) => {
  try {
    const { bookingId, providerId, customerId, adminId = null } = req.body;
    let existing = await Conversation.findOne({ bookingId });
    if (existing) return res.status(400).json({ message: "Conversation already exists" });

    const conversation = await Conversation.create({ bookingId, providerId, customerId, adminId });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;