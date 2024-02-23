interface Props {
	label?: string;
	name: string;
	id: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type: "email" | "text";
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
}
function Input({
	label,
	name,
	id,
	onChange,
	type,
	labelClassName,
	inputClassName,
	value,
}: Props) {
	return (
		<div className="flex flex-col">
			<label
				htmlFor="name"
				className={`text-slate-500 text-sm ${labelClassName}`}
			>
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={id}
				className={`border border-slate-700 rounded-md p-2 ${inputClassName}`}
				onChange={onChange}
				value={value}
			/>
		</div>
	);
}
export default Input;
