import { Outlet } from "react-router-dom";
import "./App.css";

function Home() {
	return (
		<div>
            <header><h1>This is global</h1></header>
			<Outlet />
		</div>
	);
}

export default Home;
