import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import customerRoutes from "./routes/customer.js";
import providerRoutes from "./routes/provider.js";
import bookingRoutes from "./routes/booking.js";
import categoryRoutes from "./routes/category.js";
import ratingRoutes from "./routes/rating.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
app.use("/ratings", ratingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
