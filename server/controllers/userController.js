const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../error/CustomAPIError");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const fetchProfile = async (req, res) => {
	const { id } = req.user;
	const data = await User.findOne({ _id: id });
	if (!data) {
		throw new CustomAPIError("No such user", StatusCodes.NOT_FOUND);
	}
	res.status(StatusCodes.OK).send({
		success: true,
		message: "User profile fetched successfully",
		data,
	});
};

const updateProfile = async (req, res) => {
	const { id } = req.user;
	const { name } = req.body;
	const response = await User.findOneAndUpdate(
		{ _id: id },
		{ name },
		{ runValidators: true, new: true }
	);
	console.log(response);
	res.status(StatusCodes.OK).send({
		success: true,
		message: "User updated successfully",
		data: response,
	});
};

module.exports = { fetchProfile, updateProfile };
