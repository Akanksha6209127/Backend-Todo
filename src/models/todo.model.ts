import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  unit: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    completed: { type: Boolean, default: false },

  },
  { timestamps: true }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
