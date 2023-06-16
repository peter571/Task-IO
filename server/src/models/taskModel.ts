import { Schema, model, Types } from "mongoose";

interface Itask {
  title: string;
  description: string;
  status: string;
  completion_date: string;
  adminId: Types.ObjectId;
  assignee: Types.ObjectId;
  workspace_id: Types.ObjectId;
}

const taskSchema = new Schema<Itask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  completion_date: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  assignee: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  workspace_id: { type: Schema.Types.ObjectId, required: true, ref: "Space" },
});

export const Task = model<Itask>("Task", taskSchema);
