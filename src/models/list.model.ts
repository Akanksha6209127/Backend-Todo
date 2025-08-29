import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IList extends Document {
	name: string;
	user: IUser;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const listSchema = new Schema<IList>(
	{
		name: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const List = model<IList>("List", listSchema);
