const CustomAPIError = require("../error/CustomAPIError");
const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const generateUserId = require("../utils/generateUserId");
const verify = require("../utils/Oauth");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
	// const { token, issuer } = req.body;
	// if (issuer === "google") {
	// 	const { name, email, userId } = await verify(token);
	// 	const existingUser = await User.findOne({ userId });
	// 	if (!existingUser) {
	// 		const user = await User.create({ name, email, userId });
	// 		const authToken = await user.createToken();
	// 		const newData = { ...user._doc };
	// 		newData.token = authToken;
	// 		res.status(StatusCodes.CREATED).send({
	// 			success: true,
	// 			message: "User created successfully",
	// 			data: newData,
	// 		});
	// 		return;
	// 	}
	// 	const authToken = await existingUser.createToken();
	// 	existingUser._doc.token = authToken;
	// 	res.status(StatusCodes.OK).send({
	// 		message: "User signed in successfully",
	// 		success: true,
	// 		data: existingUser._doc,
	// 	});
	// } else {
	const instance = new User({ ...req.body });
	const response = await instance.save();
	// const response = await User.create({ ...req.body });
	console.log(instance);
	const newlyCreatedUser = { ...response._doc };
	const authToken = await response.createToken();
	newlyCreatedUser.token = authToken;
	res.status(StatusCodes.CREATED).send({
		message: "Account created successfully",
		success: true,
		data: newlyCreatedUser,
	});
	// }
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		throw new CustomAPIError("Invalid user", StatusCodes.BAD_REQUEST);
	}
	if (!bcrypt.compare(password, user.password)) {
		throw new CustomAPIError("Invalid password", StatusCodes.BAD_REQUEST);
	}
	const token = await user.createToken();
	user._doc.token = token;
	res.status(StatusCodes.OK).send({
		message: "User logged in successfully",
		success: true,
		data: user._doc,
	});
};
module.exports = { signup, login };
