
const { Router } = require("express");
const router = Router();
const userAdminRoute = require("./user.route");

router.use("/users", userAdminRoute);

module.exports = router;