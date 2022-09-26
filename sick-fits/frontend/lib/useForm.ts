import { useState } from "react";

type HandleChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

interface UseFormReturn<T> {
	inputs: T;
	handleChange: HandleChange;
	resetForm: () => void;
	clearForm: () => void;
}

export default function useForm<
	T extends Record<string, string | number | File>
>(initial: T): UseFormReturn<T> {
	const [inputs, setInputs] = useState(initial);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, type, value } = e.target;
		let parsedValue: string | number | File = value;

		if (type === "number") {
			parsedValue = parseInt(value, 10);
		} else if (type === "file" && "files" in e.target) {
			[parsedValue] = e.target.files ? e.target.files : [""];
		}

		setInputs({
			// Copy the existing state
			...inputs,
			[name]: parsedValue,
		});
	}

	function resetForm() {
		setInputs(initial);
	}

	function clearForm() {
		const clearInputs = Object.fromEntries(
			Object.entries(inputs).map((keyValue) => [keyValue[0], ""])
		);

		setInputs(<T>clearInputs);
	}

	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
	};
}
