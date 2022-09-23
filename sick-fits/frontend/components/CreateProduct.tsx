import useForm from "../lib/useForm";

interface CreateProductInputs extends Record<string, any> {
	name: string;
	price: number;
	description: string;
	file?: readonly string[];
};

export default function CreateProduct() {
	const name = "Nice stuff";
	const price = 1234;
	const description = "The stuff of nice origin.";
	const file = [""];

	const { inputs, handleChange } = useForm<CreateProductInputs>({
		name,
		price,
		description,
		file,
	});

	return (
		<form>
			<label htmlFor="name">
				Name
				<input
					type="text"
					id="name"
					name="name"
					placeholder="Name"
					value={inputs.name}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="price">
				Price
				<input
					type="number"
					id="price"
					name="price"
					placeholder="0"
					value={inputs.price}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="description">
				Description
				<input
					type="text"
					id="description"
					name="description"
					placeholder="0"
					value={inputs.description}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="description">
				File
				<input type="file" id="file" name="file" onChange={handleChange} />
			</label>
		</form>
	);
}
