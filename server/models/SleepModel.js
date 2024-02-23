const mongoose = require("mongoose");

const SleepSchema = new mongoose.Schema(
	{
		date: { type: Date, required: [true, "Enter a date"], unique: true },
		sleepTime: { type: String, required: [true, "Enter sleep time"] },
		wakeTime: { type: String, required: [true, "Enter wake time"] },
		duration: { type: Number, required: [true, "Enter duration"] },
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			required: [true, "Enter a userId"],
			ref: "User",
		},
	},
	{ timestamps: true }
);

const SleepModel = mongoose.model("Sleep", SleepSchema);

module.exports = SleepModel;
