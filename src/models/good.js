import { Schema, model } from "mongoose"

const goodSchema = new Schema(
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
		category: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
		prevDescription: {
			type: String,
			required: true,
		},
		colors: {
			type: [String],
			enum: ["white", "black", "grey", "blue", "green", "red", "pastel"],
			required: true,
		},
		sizes: {
			type: [String],
			enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
			required: true,
		},
		gender: {
			type: String,
			enum: ["men", "women", "unisex"],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			value: {
				type: Number,
				required: true,
				min: 0,
			},
			currency: {
				type: String,
				enum: ["грн"],
				default: "грн",
			},
		},
		feedbacks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Feedback",
			},
		],
		characteristics: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

goodSchema.virtual("stars").get(function () {
	if (!this.feedbacks.length) return 0

	if (typeof this.feedbacks[0] === "object" && this.feedbacks[0].rate) {
		const sum = this.feedbacks.reduce((acc, feedback) => acc + feedback.rate, 0)
		return sum / this.feedbacks.length
	}

	return 0
})

goodSchema.options.id = false

goodSchema.set("toJSON", { virtuals: true })
goodSchema.set("toObject", { virtuals: true })

goodSchema.pre(["find", "findOne"], function (next) {
	if (this.options && this.options._recursed) {
		next()
		return
	}

	this.populate("category", "name")
	this.populate("feedbacks", "rate author description date")
	next()
})

goodSchema.index(
	{ name: "text", prevDescription: "text", description: "text" },
	{
		name: "GoodTextIndex",
		weights: { name: 10, prevDescription: 8, description: 6 },
		default_language: "english",
	}
)

export const Good = model("Good", goodSchema)
