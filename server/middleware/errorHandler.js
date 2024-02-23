const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/CustomAPIError");

const errorHandler = (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		res.status(err.statusCode).send({ success: false, message: err.message });
		return;
	}
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.send({ message: err.message ?? "Something went wrong", success: false });
};

module.exports = errorHandler;
