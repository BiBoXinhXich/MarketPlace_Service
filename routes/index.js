const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
	res.json({ success: true, data: "MARKETPLACE SERVICE" });
});

module.exports = router;