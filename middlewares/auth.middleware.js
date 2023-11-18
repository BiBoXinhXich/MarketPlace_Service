const { USER } = require("../models/");

module.exports = async (req, res, next) => {
	const { userId } = req.signedCookies;

	if (!userId) {
		res.status(401);
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });
	}

	const user = await USER.get(userId);

	if (!user) {
		res.status(401);
		return res.json({ success: false, message: "FAIL_AUTHENTICATION" });
	}

	res.locals.user = user;
	res.locals.userId = userId;

	next();
};