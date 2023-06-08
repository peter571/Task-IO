import { Schema, Types, model } from "mongoose";

interface ITeamMessage {
  content: string;
  workspace_id: Types.ObjectId;
  sender: Types.ObjectId;
}

const msgModel = new Schema<ITeamMessage>(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    workspace_id: { type: Schema.Types.ObjectId, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const teamMessage = model<ITeamMessage>("TeamMessage", msgModel);
