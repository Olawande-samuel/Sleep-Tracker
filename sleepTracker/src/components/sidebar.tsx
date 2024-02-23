import { NavLink } from "react-router-dom";

const links = [
	{
		title: "Home",
		link: "/dashboard",
	},
	{
		title: "Profile",
		link: "/dashboard/profile",
	},
];

function Links({ link, title }: { title: string; link: string }) {
	return (
		<NavLink
			to={link}
			className={({ isActive }) => {
				return isActive
					? "text-slate-700 bg-white px-3 py-2"
					: "text-white bg-slate-700 px-3 py-2";
			}}
		>
			{title}
		</NavLink>
	);
}
function Sidebar() {
	return (
		<article className="fixed top-0 bottom-0 left-0 px-1 bg-slate-700 w-5/6 sm:w-1/6 md:relative ">
			<h1 className="text-3xl text-center text-white font-bold">
				Sleep Tracker
			</h1>
			<ul className="flex flex-col gap-4 mt-8">
				{links.map((link) => (
					<Links {...link} />
				))}
			</ul>
		</article>
	);
}
export default Sidebar;
