import { Schema, model, Types } from "mongoose";

interface FileType {
  name: string
  type: string
  file_url: string
}

interface IMessage {
  content: string;
  receiver: Types.ObjectId;
  sender: Types.ObjectId;
  workspace_id: Types.ObjectId;
  chat_id: Types.ObjectId;
  files: FileType[]
}

const msgModel = new Schema<IMessage>(
  {
    chat_id: { type: Schema.Types.ObjectId, required: true, ref: 'ChatModel', index: true},
    content: { type: String },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    sender: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    workspace_id: { type: Schema.Types.ObjectId, required: true, ref: "Space" },
    files: [{ type: Object }]
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>("Message", msgModel);
