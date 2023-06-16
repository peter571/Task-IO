import mongoose, { Schema, model } from "mongoose";

interface Chat {
  members: Schema.Types.ObjectId[];
  workspace_id: Schema.Types.ObjectId;
}

const chatModel = new Schema<Chat>(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    workspace_id: { type: Schema.Types.ObjectId, required: true, ref: 'Space' },
  },
  {
    timestamps: true,
  }
);

export const ChatModel = model<Chat>("Chat", chatModel)
