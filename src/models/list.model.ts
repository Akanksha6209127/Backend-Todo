import { Schema, model, Document, Types } from "mongoose";
import { IGroup } from "./group.model";
import { IUserDoc } from "./user.model";
import { protect } from "../middlewares/protect.middleware";

export interface IList extends Document {
  name: string;
  groupId: Types.ObjectId; 
  user: Types.ObjectId;
  completed: boolean; // ✅ added
 
}

const listSchema = new Schema<IList>(
  {
    name: { type: String, required: true, trim: true },
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false }, //  add 
  },
  { timestamps: true }
);

export default model<IList>("List", listSchema);
