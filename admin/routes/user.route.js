const { Router } = require("express");
const router = Router();
const {
	decentralization,
} = require("../../middlewares/decentralization.middleware");
const { ROLE } = require("../../utils/role.enum");
const ctrler = require("../controllers/user.controller");

router.use(decentralization(ROLE.ADMIN));

router.get("/types", ctrler.getTypes);

router.get("/", ctrler.getUsers);

module.exports = router;