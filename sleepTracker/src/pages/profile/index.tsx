/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import Input from "../../components/Input";
import useAuthEndpoints from "../../hooks/useAuthEndpoint";

function Profile() {
	const user = useLoaderData();
	const { updateUserProfile } = useAuthEndpoints();
	const [formState, setFormState] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		if (typeof user === "object" && user !== null) {
			const data = (user as { data: any }).data;
			setFormState(data);
		}
	}, [user]);

	async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const response = await updateUserProfile(formState);
			if (response.success) {
				toast.success(response.message);
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				return;
			}
			toast.error("something went wrong");

			console.log(error);
		}
	}
	return (
		<div>
			<h1 className="text-xl font-bold mb-4">Profile</h1>
			<form
				className="max-w-[30em] flex flex-col gap-4"
				onSubmit={updateProfile}
			>
				<Input
					label="Name"
					type="text"
					name="name"
					id="name"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setFormState({ ...formState, name: e.target.value });
					}}
					value={formState.name}
				/>
				<Input
					label="Email"
					type="email"
					id="email"
					name="email"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setFormState({ ...formState, email: e.target.value });
					}}
					value={formState.email}
				/>
				<div>
					<button
						className="bg-slate-700 rounded-md p-2 text-white px-4"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
export default Profile;
