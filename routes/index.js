const { Router } = require("express");
const userRoute = require("./user.route");
const publicRoute = require("./public.route");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", (req, res) => {
	res.json({ success: true, data: "MARKETPLACE SERVICE" });
});
router.use("/", publicRoute);

// authentication middleware
router.use(authMiddleware);
router.use("/user", userRoute);

module.exports = router;