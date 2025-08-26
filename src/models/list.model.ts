import mongoose, { Schema, Document } from "mongoose";

export interface IList extends Document {
  name: string;
  completed: boolean;
}

const listSchema = new Schema<IList>(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const List = mongoose.model<IList>("List", listSchema);
