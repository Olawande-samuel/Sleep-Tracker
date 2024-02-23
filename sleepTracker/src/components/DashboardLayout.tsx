import { Toaster } from "react-hot-toast";
import Main from "./main";
import Sidebar from "./sidebar";

function DashboardLayout() {
	return (
		<section className="h-screen overflow-y-auto flex">
			<Toaster position="bottom-center" reverseOrder={false} />
			<Sidebar />
			<Main />
		</section>
	);
}
export default DashboardLayout;
