const express = require("express");
const { changePassword } = require("../controllers/user.controller");

const ctrler = require("../controllers/user.controller");

const router = express.Router();

//{host}/api/user/
router.route("/").get(ctrler.getMe).put(ctrler.updateMe);

router.post("/change-password", changePassword);

module.exports = router;
