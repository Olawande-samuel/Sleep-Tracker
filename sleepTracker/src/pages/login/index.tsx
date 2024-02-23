import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AuthWrapper from "../../components/AuthWrapper";
import GoogleSignIn from "../../components/GoogleSignIn";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import useEndpoints from "../../hooks/useEndpoints";

interface LoginForm {
	email: string;
	password: string;
}

function Login() {
	const { login } = useEndpoints();
	const [loginData, setLoginData] = useState<LoginForm>({
		email: "",
		password: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	}

	async function loginToSleepTracker(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		try {
			const response = await login(loginData);
			console.log(response);
		} catch (error: unknown) {
			console.log(error);
			if (typeof error === "string") {
				toast.error("login failed");
			}
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	}
	return (
		<AuthWrapper header="Login">
			<Toaster position="bottom-center" reverseOrder={false} />
			<div className="">
				<GoogleSignIn />
				<span className="block text-center text-sm">Or</span>
				<section>
					<h2 className=" text-base uppercase font-bold mb-2">
						Log in with email
					</h2>
					<form className="flex flex-col gap-4">
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
								onClick={loginToSleepTracker}
							>
								Log in
							</button>
						</div>
					</form>
				</section>
			</div>
		</AuthWrapper>
	);
}
export default Login;
