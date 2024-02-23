import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AuthWrapper from "../../components/AuthWrapper";
import GoogleSignIn from "../../components/GoogleSignIn";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import useEndpoints from "../../hooks/useEndpoints";
import { localData } from "../../interfaces";

interface SignUpForm {
	name: string;
	email: string;
	password: string;
}


function Signup() {
	const { signup } = useEndpoints();
	const [signUpData, setSignUpData] = useState<SignUpForm>({
		name: "",
		email: "",
		password: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
	}

	async function signupToSleepTracker(data: localData, issuer: "local") {
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
	function handleLocalSubmit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		signupToSleepTracker(signUpData, "local");
	}
	return (
		<AuthWrapper header="Welcome">
			<Toaster position="bottom-center" reverseOrder={false} />
			<div className="">
				<GoogleSignIn />
				<span className="block text-center text-sm">Or</span>
				<section>
					<h2 className=" text-base uppercase font-bold mb-2">
						Sign up with email
					</h2>
					<form className="flex flex-col gap-4">
						<Input
							type="text"
							id="name"
							name="name"
							label="Name"
							onChange={handleChange}
						/>
						<Input
							type="email"
							id="email"
							name="email"
							label="Email"
							onChange={handleChange}
						/>
						<PasswordInput
							id="loginPassword"
							label="Password"
							name="password"
							onChange={handleChange}
						/>
						<div>
							<button
								className="text-white bg-slate-700 rounded-md text-sm p-3 px-4"
								onClick={handleLocalSubmit}
							>
								Sign up
							</button>
						</div>
					</form>
				</section>
			</div>
		</AuthWrapper>
	);
}
export default Signup;
