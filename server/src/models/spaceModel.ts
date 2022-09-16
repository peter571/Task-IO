import { model, Schema } from "mongoose";

interface ISpace {
    avatar: string;
    title: string;
    members: [String];
}

const spaceModel = new Schema<ISpace>({
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    members: { type: Array, required: true }
})

export const Space = model<ISpace>('Space', spaceModel);
