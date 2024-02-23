import { useState } from "react";
import toast from "react-hot-toast";
import useAuthEndpoints from "../hooks/useAuthEndpoint";

interface Props {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Form {
	wakeTime: string;
	date: string;
	sleepTime: string;
}

function RecordModal({ setOpenModal }: Props) {
	const { addNewSchedule } = useAuthEndpoints();
	const [loading, setLoading] = useState(false);
	const [formState, setFormState] = useState<Form>({
		wakeTime: "",
		date: "",
		sleepTime: "",
	});

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	}
	async function submit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		try {
			setLoading(true);
			if (!formState.wakeTime || !formState.date || !formState.wakeTime) {
				throw new Error("Please submit a valid form");
			}
			const response = await addNewSchedule(formState);
			console.log(response);
			if (response.success) {
				toast.success(response.message);
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error?.message);
				return;
			}
			toast.error("An error occurred");
		} finally {
			setLoading(false);
		}
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center modal-background">
			<section className="bg-white rounded-lg shadow-md p-5 min-w-[18em] max-w-[500px]">
				<div className="flex justify-end">
					<button
						className="text-xs text-slate-600"
						onClick={() => setOpenModal(false)}
					>
						Close
					</button>
				</div>
				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-slate-700 text-sm" htmlFor="date">
							Date
						</label>
						<input
							type="date"
							name="date"
							id="date"
							className="border border-black p-2 rounded-md"
							onChange={onChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-slate-700 text-sm" htmlFor="start">
							Start Time
						</label>
						<input
							type="datetime-local"
							name="sleepTime"
							id="sleepTime"
							className="border border-black p-2 rounded-md"
							onChange={onChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-slate-700 text-sm" htmlFor="start">
							Wake Time
						</label>
						<input
							type="datetime-local"
							name="wakeTime"
							id="wakeTime"
							className="border border-black p-2 rounded-md"
							onChange={onChange}
						/>
					</div>
					<div>
						<button
							className="border text-white bg-slate-700 p-2 rounded-md"
							onClick={submit}
							disabled={loading}
						>
							{loading ? "..." : "Submit"}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
export default RecordModal;
