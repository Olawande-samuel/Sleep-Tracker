const {
	fetchProfile,
	updateProfile,
} = require("../controllers/userController");
const router = require("express").Router();

router.route("/profile").get(fetchProfile).patch(updateProfile);

module.exports = router;
