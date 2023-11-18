const { USER } = require("../models/");
const JWTStrategy = require("../modules/jwt");

module.exports = async (req, res, next) => {
	const { userId } = req.signedCookies;
	//read authorization from headers of request
	const { authorization } = req.headers;

	if (!userId) {
		res.status(401);
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });
	}
	try {
		if (!authorization) {
			throw new Error("AUTHENTICATION_NOT_AVAILABLE");
		}

	const user = await USER.get(userId);
		const decoded = JWTStrategy.verify(req.headers.authorization);

	if (!user) {
		res.status(401);
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });
	}
		const user = await USER.get(decoded.userId);

	res.locals.user = user;
	res.locals.userId = userId;
		if (!user) {
			throw new Error("USER_NOT_VALID");
		}

	next();
		res.locals.user = user;
		res.locals.userId = decoded.userId;

		next();
	} catch (e) {
		res.status(401);
		return res.json({
			success: false,
			message: e.message || "FAIL_AUTHENTICATION",
		});
	}
};