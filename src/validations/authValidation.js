import { Joi, Segments } from "celebrate"

export const registerUserSchema = {
	[Segments.BODY]: Joi.object({
		firstName: Joi.string().max(32).required().messages({
			"string.base": "Name must be a string",
			"any.max": "Name must be at last {#limit} characters",
			"any.required": "Name is required",
		}),
		phone: Joi.string()
			.regex(/^\+380\d{9,10}$/)
			.required()
			.messages({
				"string.pattern.base": "Phone number must be between 9 and 10 digits.",
				"any.required": "Email is required",
			}),
		password: Joi.string().min(8).max(64).required().messages({
			"string.base": "Password must be a string",
			"any.min": "Password must be at least {#limit} characters",
			"any.max": "Password must be at last {#limit} characters",
			"any.required": "Password is required",
		}),
	}),
}

export const loginUserSchema = {
	[Segments.BODY]: Joi.object({
		phone: Joi.string().required(),
		password: Joi.string().required(),
	}),
}
export const subscribeEmailSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().required(),
	}),
}
