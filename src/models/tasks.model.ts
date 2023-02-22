import mongoose, { Schema, Document, ObjectId, model } from "mongoose";

interface ITask extends Document {
	title: string;
	description: string;
	completed: boolean;
	createdAt: Date;
	user: ObjectId;
}

const TaskSchema = new Schema<ITask>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Task = model<ITask>("Task", TaskSchema);

export default Task;
