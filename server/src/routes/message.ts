import express from "express";
import authenticateToken from "../middleware/auth";
import { Message } from "../models/messageModel";
import { teamMessage } from "../models/teamMessageModel";
import { User } from "../models/authModel";

const router = express.Router();

// Add new message
router.post("/new-message", authenticateToken, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//New Team message
router.post("/team-message", authenticateToken, async (req, res) => {
  try {
    const newMessage = new teamMessage(req.body);
    await newMessage.save().then(() => {
      res.status(201).json(newMessage);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get messages
router.get("/:chat_id", authenticateToken, async (req, res) => {
  const { chat_id } = req.params;

  try {
    const messages = await Message.find(
      {
        chat_id: chat_id
      },
      { __v: 0 }
    ).sort({ updatedAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get team conversations
router.get(
  "/get-team-messages/:teamId",
  authenticateToken,
  async (req, res) => {
    const { teamId } = req.params;
    try {
      const messages = await teamMessage
        .find({ workspace_id: teamId })
        .populate("id");
      if (messages.length === 0) return res.status(200).json(messages);

      return res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: `Failed to load messages` });
    }
  }
);

export default router;
