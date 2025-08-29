import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITodo extends Document {
	title: string;
	user: IUser;
	amount: number;
	unit: string;
	completed: boolean;
}

const todoSchema = new Schema<ITodo>(
	{
		title: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		amount: { type: Number, required: true },
		unit: { type: String, required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
