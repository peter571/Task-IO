import { model, Schema, Types, ObjectId } from "mongoose";

interface ISpace {
  name: string;
  members: string[];
  admin: Types.ObjectId;
}

const spaceModel = new Schema<ISpace>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],

  admin: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export const Space = model<ISpace>("Space", spaceModel);
