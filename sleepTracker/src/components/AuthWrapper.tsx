interface Props {
	children: React.ReactNode;
	header: string;
}
function AuthWrapper({ children, header }: Props) {
	return (
		<section className="bg-[#FDFDFD] min-h-screen flex flex-col items-center justify-center">
			<article className="max-w-[400px] w-full md:min-w-[280px] bg-white border-2 p-4 md:px-8 mb-8 text-gray-500 rounded-lg">
				<h1 className="text-center text-xl font-bold uppercase mb-8">
					{header} to Sleep Tracker
				</h1>
				{children}
			</article>
			<p className="text-xs text-center">
				By registration you agree to Terms of Use and Privacy Policy
			</p>
		</section>
	);
}
export default AuthWrapper;
