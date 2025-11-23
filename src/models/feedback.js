import { Schema, model } from "mongoose"

const feedbackSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rate: {
			type: Number,
			required: true,
		},
		goodId: {
			type: Schema.Types.ObjectId,
			ref: "Good",
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const Feedback = model("Feedback", feedbackSchema)
