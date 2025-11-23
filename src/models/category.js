import { Schema, model } from "mongoose"

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
			default:
				"https://res.cloudinary.com/dsbovd5fz/image/upload/v1762346739/Cover_eiuykj.png",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

export const Category = model("Category", categorySchema)
