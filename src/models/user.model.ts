import mongoose, { Schema, Document, model, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
	name: string;
	password: string;
	email: string;
	createdAt: Date;
}

interface UserModel extends Model<IUser> {
	checkPassword(userPassword: any, storedPassword: any): Promise<IUser[]>;
}

const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 10,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.statics.checkPassword = async function (userPassword, realPass) {
	const compareResult = await bcrypt.compare(userPassword, realPass);
	return compareResult;
};

const User = model<IUser, UserModel>("User", UserSchema);

export default User;
