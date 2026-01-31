import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus
} from "../controllers/booking.js";

const router = express.Router();

router.post("/", protect(["customer"]), createBooking);
router.get("/customer", protect(["customer"]), getCustomerBookings);


router.get("/provider", protect(["provider"]), getProviderBookings);
router.patch("/:id/status", protect(["provider"]), updateBookingStatus);

export default router;
