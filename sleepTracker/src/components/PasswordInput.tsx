interface Props {
	label?: string;
	name: string;
	id: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	labelClassName?: string;
	inputClassName?: string;
}
function PasswordInput({
	label,
	name,
	id,
	onChange,
	labelClassName,
	inputClassName,
}: Props) {
	return (
		<div className="flex flex-col">
			<label
				htmlFor={name}
				className={`text-slate-500 text-sm ${labelClassName}`}
			>
				{label}
			</label>
			<input
				type="password"
				name={name}
				id={id}
				className={`border border-slate-700 rounded-md p-2 ${inputClassName}`}
				onChange={onChange}
			/>
		</div>
	);
}
export default PasswordInput;
