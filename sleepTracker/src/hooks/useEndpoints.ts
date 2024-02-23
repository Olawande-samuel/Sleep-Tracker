import query from "../utils/axios";

interface data {
	name: string;
	email: string;
	password: string;
}
interface token {
	token: string;
}


function useEndpoints() {
	async function signup(payload: data | token, issuer: "google" | "local") {
		const response = await query.post("/auth/signup", { ...payload, issuer });
		console.log(response);
		return response.data;
	}
	async function login(data: { password: string; email: string }) {
		const response = await query.post("/auth/login", data);
		console.log(response);
	}
	return { signup, login };
}
export default useEndpoints;
