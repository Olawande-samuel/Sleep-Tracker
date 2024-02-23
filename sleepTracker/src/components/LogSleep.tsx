import { useState } from "react";
import RecordModal from "./RecordModal";

function LogSleep() {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="flex justify-end">
			<button
				onClick={() => setOpenModal(true)}
				className="border border-slate-700 rounded-md p-2 text-sm hover:bg-slate-700 hover:text-white transition-all"
			>
				Log Sleep
			</button>
			{openModal && <RecordModal setOpenModal={setOpenModal} />}
		</div>
	);
}
export default LogSleep;
