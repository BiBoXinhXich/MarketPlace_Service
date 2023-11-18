const { USER } = require("../models");

const md5 = require("md5");
const { ROLE } = require("../utils/role.enum");

module.exports = {
	getMe: async (req, res, next) => {
		const { user } = res.locals;
		res.json({ success: true, data: user });
	},
	updateMe: async (req, res, next) => {
		try {
			const { id } = res.locals.user;
			const { password, ...user } = req.body;
			const updateUser = await USER.updateUser(id, user);
			res.json({ success: true, data: updateUser });
		} catch (e) {
			res.json({ success: false, message: e.message });
		}
	},
	changePassword: async (req, res, next) => {
		const { current_password, new_password } = req.body;
		const { user } = res.locals;
		const currentUser = await USER.findOne({ _id: user.id });
		if (currentUser.password != md5(current_password)) {
			return res.json({
				success: false,
				message: "CURRENT_PASSWORD_INCORRECT",
			});
		}
		await USER.updateUser(currentUser.id, {
			password: md5(new_password),
		});
		res.json({
			success: true,
			message: "CHANGE_PASSWORD_SUCCESS",
		});
	},
};