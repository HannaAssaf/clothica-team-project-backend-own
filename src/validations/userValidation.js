import { Joi, Segments } from "celebrate"

export const updateUserDataSchema = {
	[Segments.BODY]: Joi.object({
		firstName: Joi.string().min(2).max(32).required(),
		lastName: Joi.string().min(2).max(32).required(),
		phone: Joi.string()
			.regex(/^\+380\d{9,10}$/)
			.required(),
		city: Joi.string().required(),
		postalOffice: Joi.number().min(1).required(),
	}),
}
