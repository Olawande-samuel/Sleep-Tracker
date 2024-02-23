const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Name is required"] },
	userId: { type: String, required: true, unique: true },
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email already exists"],
	},
	password: String,
	age: Number,
});

UserSchema.pre("validate", function (next) {
	console.log("validating");
	if (!this.userId) {
		console.log("got here");
		this.userId = uuid.v4();
	}
	next();
});

UserSchema.pre("save", async function (next) {
	console.log("called this");
	if (this.password) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

UserSchema.methods.createToken = function () {
	return jwt.sign({ name: this.name, id: this._id }, process.env.AUTH_SECRET, {
		expiresIn: "2d",
	});
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
