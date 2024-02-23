const express = require("express");
require("express-async-errors");
const connectDB = require("./db");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const isAuthenticated = require("./middleware/isAuthenticated");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const sleepRoutes = require("./routes/sleep");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", isAuthenticated, userRoutes);
app.use("/api/v1/sleep", isAuthenticated, sleepRoutes);

app.use(errorHandler);
app.all("*", (req, res) => {
	res.status(StatusCodes.NOT_FOUND).send({ message: "Not Found" });
});
const startApp = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(port, () => console.log("listening on port " + port));
	} catch (error) {
		console.log("server error: " + error);
	}
};

startApp();
