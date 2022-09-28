import { Schema, model, Types } from "mongoose";

interface IMessage {
  text: string;
  users: Array<string>;
  sender: Types.ObjectId;
  senderAvatar: string;
}

const msgModel = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    users: { type: [String], required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    senderAvatar: { type: String }
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>("message", msgModel);
