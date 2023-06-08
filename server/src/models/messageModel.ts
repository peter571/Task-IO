import { Schema, model, Types } from "mongoose";

interface IMessage {
  content: string;
  receiver: Types.ObjectId;
  sender: Types.ObjectId;
  workspace_id: Types.ObjectId;
}

const msgModel = new Schema<IMessage>(
  {
    content: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    sender: { type: Schema.Types.ObjectId, required: true },
    workspace_id: { type: Schema.Types.ObjectId, required: true}
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>("Message", msgModel);
