const md5 = require("md5");
const { USER } = require("../models/");
const JWTStrategy = require("../modules/jwt");

module.exports = {
	loginHandle: async (req, res, next) => {
		const { user, pass } = req.body;
		let success = false;

		if (!user || !pass) {
			return res.json({
				success: false,
				message: "Invalid Fields Required",
			});
		}

		const userData = await USER.findOne(
			{
				$or: [{ username: user }, { email: user }, { phone: user }],
				password: md5(pass),
			},
			{ password: 0 }
		);

		if (!userData) success = false;
		else {
			success = true;
			res.cookie("userId", userData.id, { signed: true });
			const access_token = JWTStrategy.sign(userData);

			// res.cookie("userId", userData.id, { signed: true });

			return res.json({
				success: true,
				message: "SUCCESS_AUTHENTICATION",
				data: { user: userData, access_token },
			});
		}

		res.json({
			success,
			message: success
				? "SUCCESS_AUTHENTICATION"
				: "FAIL_AUTHENTICATION",
			data: success ? userData : null,
			success: false,
			message: "USER_PASS_NOT_CORRECT",
		});
	},

	forgotHandle: (req, res, next) => {
		const { email } = req.body;
		//! send mail
		res.json({ success: true, message: "SEND_MAIL_SUCCESS" });
	},
	signUpHandle: async (req, res, next) => {
		const { user } = res.locals;
		const { token } = req.body;
		user.password = md5(user.password);
		const userCreated = await USER.create(user);
		// await NotificationFactory.createNotify(
		// 	{
		// 		title: `Chúc mừng bạn đã tạo thành công!`,
		// 		body: `${user.username} đã được tạo thành công! đăng nhập app để thỏa sức đặt đồ ăn!`,
		// 	},
		// 	token,
		// 	userCreated.id,
		// 	`user/${userCreated.id}`
		// );
		res.json({
			success: true,
			message: "CREATE_ACCOUNT_SUCCESS",
		});
	},
	logoutHandle: (req, res, next) => {
		res.clearCookie("userId").json({
			success: true,
			message: "LOGOUT_SUCCESS",
		});
	},
};