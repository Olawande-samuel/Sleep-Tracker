const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/CustomAPIError");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
	const authToken = req.headers.authorization;

	if (!authToken || !authToken.startsWith("Bearer")) {
		throw new CustomAPIError("Unauthorized", StatusCodes.FORBIDDEN);
	}
	const token = authToken.split(" ")[1];
	jwt.verify(token, process.env.AUTH_SECRET, (err, result) => {
		if (err)
			throw new CustomAPIError("Invalid token", StatusCodes.UNAUTHORIZED);

		req.user = result;
		next();
	});
};

module.exports = isAuthenticated;
