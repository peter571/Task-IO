import { model, Schema, Types } from "mongoose";

interface ISpace {
  name: string;
  members: string[];
  admin: Types.ObjectId;
}

const spaceModel = new Schema<ISpace>({
  name: { type: String, required: true },
  members: {
    type: [String],
  },
  admin: { type: Schema.Types.ObjectId, required: true },
});

export const Space = model<ISpace>("Space", spaceModel);
