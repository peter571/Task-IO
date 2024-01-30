import { Schema, model } from "mongoose";

type StringOrNull = string | null

interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  verified: boolean
  passwordResetToken: StringOrNull
  passwordResetAt: StringOrNull
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: false },
  verified: { type: Boolean, required: false, default: false},
  passwordResetAt: { type: String, required: false },
  passwordResetToken: { type: String, required: false}
});

export const User = model<IUser>("User", userSchema);
