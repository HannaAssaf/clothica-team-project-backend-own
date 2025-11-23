import { Schema, model } from "mongoose"

const orderSchema = new Schema({
	products: [
		{
			id: {
				type: Schema.Types.ObjectId,
				ref: "Good",
				required: true,
			},
			amount: {
				type: Number,
				required: true,
				min: 1,
			},
			size: {
				type: String,
				enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
				required: true,
			},
			color: {
				type: String,
				enum: ["white", "black", "grey", "blue", "green", "red", "pastel"],
				required: true,
			},
		},
	],
	sum: {
		type: Number,
		required: true,
		min: 1,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: false,
	},
	date: {
		type: String,
		required: true,
	},
	orderNum: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: false,
		default: "",
	},
	status: {
		type: String,
		enum: ["processing", "packing", "success", "declined"],
		required: false,
		default: "processing",
	},
	userData: {
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		postalOffice: {
			type: Number,
			required: true,
			trim: true,
		},
	},
})

export const Order = model("Order", orderSchema)
