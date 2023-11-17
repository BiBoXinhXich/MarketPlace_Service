const { USER } = require("../models");

module.exports = {
	signUpValidate: async (req, res, next) => {
		const { username, password, first_name, last_name, email, phone } =
			req.body;

		if (
			!username ||
			!password ||
			!first_name ||
			!last_name ||
			!email ||
			!phone
		)
			return res.json({ success: false, message: "INVALID_INFO" });

		const emailRegistedCheck = await USER.findOne({ email });
		const phoneRegistedCheck = await USER.findOne({ phone });
		const userRegistedCheck = await USER.findOne({ username });

		if (emailRegistedCheck)
			return res.json({ sucess: false, message: "EMAIL_REGISTED" });
		if (phoneRegistedCheck)
			return res.json({ sucess: false, message: "PHONE_REGISTED" });
		if (userRegistedCheck)
			return res.json({ sucess: false, message: "USER_REGISTED" });

		res.locals.user = {
			username,
			password,
			first_name,
			last_name,
			email,
			phone,
		};

		next();
	},
	forgotValidate: async (req, res, next) => {
		const { email } = req.body;

		let isExist = false;

		if (await USER.find({ email })) isExist = true;

		if (isExist) next();
		else return res.json({ sucess: false, message: "EMAIL_NOT_EXIST" });
	},
};