import { createBrowserRouter } from "react-router-dom";
import Home from "../App";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";
import DashboardLayout from "../components/DashboardLayout";
import { authorizedQuery } from "../utils/axios";
authorizedQuery.interceptors.request.use(
	(config) => {
		let userdata;
		const stringData = localStorage.getItem("userdata");
		if (stringData) {
			userdata = JSON.parse(stringData);
			config.headers.Authorization = "Bearer " + userdata?.token;
			return config;
		}
		throw new Error("token not found");
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "signup",
		element: <Signup />,
	},
	{
		element: <DashboardLayout />,
		children: [
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "dashboard/profile",
				element: <Profile />,
				loader: async () => {
					const res = await authorizedQuery.get("/user/profile");
					return res.data;
				},
			},
		],
	},
]);

export default router;
