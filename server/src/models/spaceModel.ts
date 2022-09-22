import { model, Schema, Types } from "mongoose";

interface ISpace {
    avatar: string;
    title: string;
    members: [string];
    creator: Types.ObjectId;
}

const spaceModel = new Schema<ISpace>({
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    members: { type: [String], required: true },
    creator: { type: Schema.Types.ObjectId, required: true }
})

export const Space = model<ISpace>('Space', spaceModel);
