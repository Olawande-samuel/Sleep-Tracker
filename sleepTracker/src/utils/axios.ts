import axios from "axios";

const query = axios.create({
	baseURL: "http://localhost:4000/api/v1",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const authorizedQuery = axios.create({
	baseURL: "http://localhost:4000/api/v1",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
})
export default query;
