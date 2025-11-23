import { Schema, model } from "mongoose"

const subscriptionSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
})

export const Subscription = model("Subscription", subscriptionSchema)
