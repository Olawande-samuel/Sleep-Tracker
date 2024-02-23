import moment from "moment";
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
function useAuthEndpoints() {
	async function getUserProfile() {
		const response = await authorizedQuery.get("/user/profile");
		return response.data;
	}
	async function updateUserProfile(data: { name: string }) {
		const payload = { name: data.name };
		const response = await authorizedQuery.patch("/user/profile", payload);
		return response.data;
	}
	async function addNewSchedule(data: {
		date: string;
		sleepTime: string;
		wakeTime: string;
	}) {
		const start = moment(data?.sleepTime);
		const end = moment(data?.wakeTime);
		const duration = end.diff(start, "hours");
		console.log(duration);
		const payload = {
			sleepTime: start.format("HH:mm:ss"),
			wakeTime: end.format("HH:mm:ss"),
			date: data.date,
			duration,
		};
		const response = await authorizedQuery.post("/sleep", payload);
		return response.data;
	}
	async function getSleepSchedule() {
		const response = await authorizedQuery.get("/sleep");
		return response.data;
	}
	return {
		getUserProfile,
		addNewSchedule,
		getSleepSchedule,
		updateUserProfile,
	};
}
export default useAuthEndpoints;
