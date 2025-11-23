import { Schema, model } from "mongoose"

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: false,
			trim: true,
			default: "",
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		city: {
			type: String,
			required: false,
			trim: true,
			default: "",
		},
		postalOffice: {
			type: Number,
			required: false,
			trim: true,
			default: 1,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
			default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
		},
		avatar_id: {
			type: String,
			required: false,
			default: "",
		},
		role: {
			type: String,
			required: false,
			enum: ["user", "admin"],
			default: "user",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

userSchema.methods.toJSON = function () {
	const object = this.toObject()
	delete object.password
	return object
}

export const User = model("User", userSchema)
