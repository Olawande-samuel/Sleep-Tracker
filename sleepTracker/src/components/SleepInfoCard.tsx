interface Props {
	date: string;
	sleepTime: string;
	wakeTime: string;
	duration: number;
}

function SleepInfoCard({ date, sleepTime, wakeTime, duration }: Props) {
	return (
		<div className="w-full border border-slate-700 bg-slate-700 text-white rounded-md p-4 min-h-[40vh] flex flex-col gap-6">
			<header>
				<h1 className="text-5xl">{date}</h1>
			</header>
			<div className="flex">
				<div className="text-4xl">
					{sleepTime} - {wakeTime}
				</div>
			</div>
			<div className="text-3xl">{duration} hours</div>
		</div>
	);
}
export default SleepInfoCard;
