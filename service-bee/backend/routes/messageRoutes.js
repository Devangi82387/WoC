import express from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const router = express.Router();

// Get all messages in a conversation
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/", async (req, res) => {
  try {
    const { conversationId, senderId, senderRole, text } = req.body;

    const message = await Message.create({ conversationId, senderId, senderRole, text });

    // Update lastMessage in conversation
    await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;