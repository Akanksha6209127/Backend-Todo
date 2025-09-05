


import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
export interface IUserDoc extends IUser, Document {
  matchPassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default model<IUserDoc>("User", userSchema);
