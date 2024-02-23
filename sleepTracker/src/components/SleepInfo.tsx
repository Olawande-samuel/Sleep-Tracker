import { useEffect, useState } from "react";
import useAuthEndpoints from "../hooks/useAuthEndpoint";
import SleepInfoCard from "./SleepInfoCard";
import toast from "react-hot-toast";
interface IData {
	_id: string;
	date: string;
	sleepTime: string;
	wakeTime: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	duration: number;
	__v: number;
}
function SleepInfo() {
	const { getSleepSchedule } = useAuthEndpoints();
	const [data, setData] = useState<IData[]>([]);
	async function getSchedule() {
		try {
			const res = await getSleepSchedule();
			if (res.success) {
				setData(res.data);
				return;
			}
			toast.error(res.message);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getSchedule();
	}, []);

	return (
		<section className="flex flex-col gap-6 max-w-[40em] mx-auto">
			{data?.map((item) => (
				<SleepInfoCard {...item} />
			))}
		</section>
	);
}
export default SleepInfo;
