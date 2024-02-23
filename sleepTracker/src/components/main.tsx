import { Outlet } from "react-router-dom";

function Main() {
	return (
		<main className="border border-dark flex-1 p-3 md:p-8 overflow-y-auto">
			<Outlet />
		</main>
	);
}
export default Main;
