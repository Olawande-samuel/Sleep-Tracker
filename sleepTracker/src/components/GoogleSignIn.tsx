import { GoogleLogin } from "@react-oauth/google";
import useEndpoints from "../hooks/useEndpoints";
import { googleToken } from "../interfaces";
import toast, { Toaster } from "react-hot-toast";

function GoogleSignIn() {
	const { signup } = useEndpoints();
	async function signupToSleepTracker(data: googleToken, issuer: "google") {
		try {
			const response = await signup(data, issuer);
			console.log(response);
			if (response.success) {
				toast.success(response.message);
				localStorage.setItem("userdata", JSON.stringify(response.data));
				return;
			}
			toast.error(response.message);
		} catch (error) {
			toast.error("Signup failed");
		}
	}
	return (
		<>
			<Toaster position="bottom-center" reverseOrder={false} />
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
					if (credentialResponse?.credential) {
						signupToSleepTracker(
							{ token: credentialResponse.credential },
							"google"
						);
					}
				}}
				onError={() => {
					console.log("login failed");
				}}
			/>
		</>
	);
}
export default GoogleSignIn;
