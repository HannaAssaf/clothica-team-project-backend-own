import cookie from "cookie"

export function myCookieParser(req, res, next) {
	if (req.myCookies) {
		next()
	}

	const cookies = req.body?.headers?.Cookie
	req.myCookies = Object.create(null)
	if (cookies) {
		req.myCookies = cookie.parse(cookies, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
	}

	next()
}
