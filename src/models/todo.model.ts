


import { Schema, model, Document, Types } from "mongoose";


export interface ITodo extends Document {
  title: string;
  amount: number;
  unit: string;
  completed: boolean;
  listId?: Types.ObjectId;
  groupId?: Types.ObjectId;
  user: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    listId: { type: Schema.Types.ObjectId, ref: "List" },
    groupId: { type: Schema.Types.ObjectId, ref: "Group" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


todoSchema.pre("save", function (next) {
  if (!this.listId && !this.groupId) {
    return next(new Error("Either listId or groupId is required"));
  }
  next();
});

export default model<ITodo>("Todo", todoSchema);
