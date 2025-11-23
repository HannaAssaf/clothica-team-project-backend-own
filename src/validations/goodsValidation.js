import { Joi, Segments } from "celebrate"
import { isValidObjectId } from "mongoose"

export const objectIdValidator = (value, helpers) => {
	return !isValidObjectId(value) ? helpers.message("Invalid id format") : value
}

export const goodIdSchema = {
	[Segments.PARAMS]: Joi.object({
		goodId: Joi.string().custom(objectIdValidator).required(),
	}),
}

export const getAllGoodsSchema = {
	[Segments.QUERY]: Joi.object({
		category: Joi.string().custom(objectIdValidator),
		sizes: Joi.string().pattern(
			/^(XXS|XS|S|M|L|XL|XXL)((,(XXS|XS|S|M|L|XL|XXL))+)?$/
		),
		sort: Joi.string().valid("desc"),
		price: Joi.string().pattern(/\d+,\d+/),
		color: Joi.string().pattern(/white|black|grey|blue|green|red|pastel/),
		gender: Joi.string().pattern(/women|men|unisex/),
		page: Joi.number().integer().min(1).default(1),
		perPage: Joi.number().integer().min(5).max(20).default(8),
	}),
}

export const getCategoriesSchema = {
	[Segments.QUERY]: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		perPage: Joi.number().integer().min(4).max(20).default(4),
	}),
}

export const getCategorySchema = {
	[Segments.PARAMS]: Joi.object({
		categoryId: Joi.string().custom(objectIdValidator).required(),
	}),
}

export const getFeedbacksSchema = {
	[Segments.QUERY]: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		perPage: Joi.number().integer().min(6).max(20).default(6),
		goodId: Joi.string().custom(objectIdValidator),
	}),
}

export const createFeedbackSchema = {
	[Segments.BODY]: Joi.object({
		author: Joi.string().min(2).max(53).required(),
		description: Joi.string().max(500).required(),
		rate: Joi.number()
			.min(1)
			.max(5)
			.valid(1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5)
			.required(),
		goodId: Joi.string().custom(objectIdValidator).required(),
	}),
}
