import { Joi, Segments } from "celebrate"
import { objectIdValidator } from "./goodsValidation.js"

export const createUserOrderSchema = {
	[Segments.BODY]: Joi.object({
		products: Joi.array()
			.items(
				Joi.object({
					id: Joi.string().custom(objectIdValidator).required(),
					amount: Joi.number().min(1).max(99).required(),
					size: Joi.string()
						.valid("XXS", "XS", "S", "M", "L", "XL", "XXL")
						.required(),
					color: Joi.string()
						.valid("white", "black", "grey", "blue", "green", "red", "pastel")
						.required(),
				})
			)
			.min(1),
		comment: Joi.string().allow("").default(""),
		userData: Joi.object({
			firstName: Joi.string().min(2).max(32).required(),
			lastName: Joi.string().min(2).max(32).required(),
			phone: Joi.string()
				.regex(/^\+380\d{9,10}$/)
				.required(),
			city: Joi.string().required(),
			postalOffice: Joi.number().min(1).required(),
		}),
	}),
}

export const patchOrderSchema = {
	[Segments.PARAMS]: Joi.object({
		orderId: Joi.string().custom(objectIdValidator).required(),
	}),
	[Segments.BODY]: Joi.object({
		status: Joi.string()
			.valid("processing", "packing", "success", "declined")
			.required(),
	}),
}
