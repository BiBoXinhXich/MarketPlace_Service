const { PERMISSIONS, ROLE, MENU_BY_ROLE } = require("../utils/role.enum");
const JWTStrategy = require("../modules/jwt");

module.exports = {
	decentralization: (perms) => {
		return async (req, res, next) => {
			// if (req.method == "GET") return next();

			const { user } = res.locals;

			console.log(user);

			// default role is a CUSTOMER
			let userPerms = user.role || ROLE.CUSTOMER;

			if (PERMISSIONS[userPerms] < PERMISSIONS[perms || ROLE.CUSTOMER])
				return res.json({
					success: false,
					type: "role",
					message: "PERMISSION_DENIED",
				});

			res.locals.role = userPerms;

			next();
		};
	},
};