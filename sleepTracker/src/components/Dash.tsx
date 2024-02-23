import LogSleep from "./LogSleep";
import SleepInfo from "./SleepInfo";

function Dash() {
	return (
		<div>
			<header>
				<h1 className="text-xl">
					Welcome, <span className="font-bold">Olawande</span>
				</h1>
			</header>
			<LogSleep />
			<section className="min-h-[40vh] mt-4">
				<SleepInfo />
			</section>
		</div>
	);
}
export default Dash;
