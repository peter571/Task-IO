import { Request, Response } from "express";
import { ChatModel } from "../models/chatModel";

export async function createNewChat(req: Request, res: Response) {
  const { userone, usertwo, workspace_id } = req.body;

  try {
    // Check if chat pair exists and return it
    const chat = await ChatModel.findOne(
      { members: { $all: [userone, usertwo] }, workspace_id: workspace_id },
      { __v: 0 }
    );
    if (chat) return res.status(200).json(chat);

    // Create new chat and save
    const newChat = await ChatModel.create({
      members: [userone, usertwo],
      workspace_id: workspace_id,
    });
    res.status(201).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getUserChats(req: Request, res: Response) {
  const { workspaceId, userId } = req.params;

  try {
    const userChats = await ChatModel.find(
      { members: { $in: [userId] }, workspace_id: workspaceId },
      { __v: 0 }
    ).populate("members", {
      __v: 0,
      password: 0,
    });

    // Filter out the user's ID from the members array
    const filteredChats = userChats.map((chat) => {
      const filteredMembers = chat.members.filter(
        (member: any) => member._id.toString() !== userId
      );
      return { ...chat.toObject(), members: filteredMembers };
    });

    res.status(200).json(filteredChats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
