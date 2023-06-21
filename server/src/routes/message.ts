import express from "express";
import authenticateToken from "../middleware/auth";
import { Message } from "../models/messageModel";
import { teamMessage } from "../models/teamMessageModel";
import mongoose from "mongoose";

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
        chat_id: chat_id,
      },
      { __v: 0 }
    ).sort({ createdAt: 1 });

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

//Delete messaage
router.delete(
  "/delete-message/:chatId/:messageId",
  authenticateToken,
  async (req, res) => {
    const { chatId, messageId } = req.params;

    try {
      await Message.findByIdAndRemove(messageId);
      res.status(200).json();
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//Update message
router.patch(
  "/edit-message/:chatId/:messageId",
  authenticateToken,
  async (req, res) => {
    const { chatId, messageId } = req.params;
    const { content } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(messageId))
        return res.status(404).json();

      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { content: content },
        { new: true }
      );
      res.status(201).json(updatedMessage);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

export default router;
