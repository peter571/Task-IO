import { Schema, Types, model } from "mongoose";

interface ITeamMessage {
  content: string;
  workspace_id: Types.ObjectId;
  sender: Types.ObjectId;
}

const msgModel = new Schema<ITeamMessage>(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    workspace_id: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'Space' },
  },
  {
    timestamps: true,
  }
);

export const teamMessage = model<ITeamMessage>("TeamMessage", msgModel);
