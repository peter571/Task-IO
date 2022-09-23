import { model, Schema, Types } from "mongoose";

interface Member {
  userId: string;
  avatar: string;
  email: string;
  name: string;
}

interface ISpace {
  avatar: string;
  title: string;
  members: [Member];
  creator: Types.ObjectId;
}

const spaceModel = new Schema<ISpace>({
  avatar: { type: String, required: true },
  title: { type: String, required: true },
  members: {
    type: [{ userId: String, avatar: String, email: String, name: String }],
  },
  creator: { type: Schema.Types.ObjectId, required: true },
});

export const Space = model<ISpace>("Space", spaceModel);
