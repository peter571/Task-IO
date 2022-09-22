import express from "express";
import authenticateToken from "../middleware/auth";
import { Message } from "../models/messageModel";

const router = express.Router();

// Add new message
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: "Failed to save message" });
  }
});

// Get conversations
router.get("/", authenticateToken, async (req, res) => {
  const { from, to } = req.body;

  try {
    const msgs = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = msgs.map((msg: any) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.text,
      };
    });
    res.status(201).json(projectedMessages);
  } catch (error) {
    res.status(409).json({ message: `Failed to load messages` });
  }
});

export default router;
