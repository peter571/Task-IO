import { Request, Response } from "express";
import { Message } from "@models/messageModel";
import { teamMessage } from "@models/teamMessageModel";
import mongoose from "mongoose";

export const addNewMessage = async (req: Request, res: Response) => {
  try {
    const newMessage = await new Message(req.body).save();
    
    // Populate and send response
    const msg = await (
      await newMessage.populate("sender", { __v: 0, password: 0 })
    ).populate("receiver", { __v: 0, password: 0 });

    res.status(201).json(msg);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { chat_id } = req.params;

  try {
    const messages = await Message.find(
      {
        chat_id: chat_id,
      },
      { __v: 0 }
    )
      .sort({ createdAt: 1 })
      .populate("receiver", { __v: 0, password: 0 })
      .populate("sender", { __v: 0, password: 0 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;

  try {
    await Message.findByIdAndRemove(messageId);
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;
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
};

export const addTeamMessage = async (req: Request, res: Response) => {
  try {
    const newMessage = new teamMessage(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTeamMessages = async (req: Request, res: Response) => {
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
};
