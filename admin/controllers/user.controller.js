const { USER } = require("../../models");
const { ROLE } = require("../../utils/role.enum");

module.exports = {
	getTypes: (req, res, next) => {
		res.json({ success: true, data: Object.values(ROLE) });
	},
	getUsers: async (req, res, next) => {
		const { page, size } = req.params;
		const data = await USER.getList(page || 1, size || 10);
		res.json({ success: true, data });
	},
};