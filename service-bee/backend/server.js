import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import http from "http";
import { Server } from "socket.io";

import customerRoutes from "./routes/customer.js";
import providerRoutes from "./routes/provider.js";
import bookingRoutes from "./routes/booking.js";
import categoryRoutes from "./routes/category.js";
import ratingRoutes from "./routes/rating.js";
import adminRoutes from "./routes/admin.js";

import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Routes
app.use("/customer", customerRoutes);
app.use("/provider", providerRoutes);
app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
app.use("/ratings", ratingRoutes);
app.use("/admin", adminRoutes);

app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);

app.use(errorMiddleware);

// ================= SOCKET.IO SETUP =================

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} joined room ${conversationId}`);
  });

  socket.on("sendMessage", (message) => {
    io.to(message.conversationId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});
