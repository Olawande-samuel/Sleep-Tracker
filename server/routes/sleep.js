const router = require("express").Router();
const {
	createSleepSession,
	updateSleepSession,
	fetchSession,
	fetchSessions,
	deleteSession,
} = require("../controllers/sleepController");

router.route("/").get(fetchSessions).post(createSleepSession);
router
	.route("/:sleepId")
	.get(fetchSession)
	.patch(updateSleepSession)
	.delete(deleteSession);

module.exports = router;
