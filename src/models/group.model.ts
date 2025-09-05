import { Schema, model, Document, Types } from "mongoose";

export interface IGroup extends Document {
  title: string;
  type: "todo" | "list";
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  
}

const groupSchema = new Schema<IGroup>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["todo", "list"], required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
  },
  { timestamps: true }
);

export default model<IGroup>("Group", groupSchema);
