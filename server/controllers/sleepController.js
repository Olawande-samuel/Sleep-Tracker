const User = require("../models/UserModel");
const Sleep = require("../models/SleepModel");
const CustomAPIError = require("../error/CustomAPIError");
const { StatusCodes } = require("http-status-codes");

const createSleepSession = async (req, res) => {
	const { id } = req.user;
	const { date, sleepTime, wakeTime, duration } = req.body;
	if (!date || !sleepTime || !wakeTime || !duration) {
		throw new CustomAPIError("Fields cannot be empty", StatusCodes.BAD_REQUEST);
	}
	const response = await Sleep.create({ ...req.body, userId: id });

	res
		.status(StatusCodes.CREATED)
		.send({ success: true, message: "Created Successfully" });
};

const updateSleepSession = async (req, res) => {
	const { id } = req.user;
	const { sleepId } = req.params;
	const data = await Sleep.findOneAndUpdate(
		{ _id: sleepId, userId: id },
		{ ...req.body },
		{ runValidators: true, new: true }
	);
	res.status(StatusCodes.OK).send({
		success: true,
		message: "Sleep session updated successfully",
		data,
	});
};

const fetchSessions = async (req, res) => {
	const { id } = req.user;

	const data = await Sleep.find({ userId: id });
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Sessions fetched successfully", data });
};
const fetchSession = async (req, res) => {
	const { id } = req.user;
	const { sleepId } = req.params;

	const data = await Sleep.findOne({ userId: id, _id: sleepId });
	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Session fetched successfully", data });
};

const deleteSession = async (req, res) => {
	const { id } = req.user;
	const { sleepId } = req.params;

	const response = await Sleep.findOneAndDelete({ _id: sleepId, userId: id });
	console.log(response);

	res
		.status(StatusCodes.OK)
		.send({ success: true, message: "Deleted successfully" });
};

module.exports = {
	createSleepSession,
	updateSleepSession,
	fetchSession,
	fetchSessions,
	deleteSession,
};
