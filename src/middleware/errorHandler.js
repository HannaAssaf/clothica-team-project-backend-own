import { HttpError } from "http-errors"

export const errorHandler = (error, req, res, next) => {
	if (error instanceof HttpError) {
		return res.status(error.status).json({
			error: error.message || error.name,
		})
	}

	res.status(500).json({ error: error.message })
}
