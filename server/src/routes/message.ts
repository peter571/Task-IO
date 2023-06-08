import express from "express";
import authenticateToken from "../middleware/auth";
import { Message } from "../models/messageModel";
import { teamMessage } from "../models/teamMessageModel";
import { User } from "../models/authModel";

const router = express.Router();

// Add new message
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to save message" });
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
    res.status(500).json({ message: "Failed to save message" });
  }
});

// Get conversations
router.get("/:workspace/:from/:to", authenticateToken, async (req, res) => {
  const { from, to, workspace } = req.params;

  try {
    const messages = await Message.find(
      {
        $or: [
          { sender: from, receiver: to },
          { sender: to, receiver: from },
        ],
        workspace_id: workspace,
      },
      { __v: 0 }
    ).sort({ updatedAt: 1 });

    const senderDetails = await User.findOne(
      { _id: from },
      { _id: 0, password: 0 }
    );
    const receiverDetails = await User.findOne(
      { _id: to },
      { _id: 0, password: 0 }
    );

    const enrichedMessages = messages.map((message: any) => ({
      ...message.toObject(),
      sender: senderDetails,
      receiver: receiverDetails,
      fromSelf: message.sender === from,
    }));

    res.status(200).json(enrichedMessages);
  } catch (error) {
    res.status(500).json({ message: `Failed to load messages` });
  }
});

//Get all conversations
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
