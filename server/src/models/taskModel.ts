import { Schema, model, Types } from "mongoose";

interface Itask {
    title: string;
    description: string;
    status: string;
    completionDate: string;
    adminId: Types.ObjectId;
    assignee: Types.ObjectId;
}

const taskSchema = new Schema<Itask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    completionDate: { type: String, required: true },
    adminId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    assignee: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
})

export const Task = model<Itask>('Task', taskSchema);
