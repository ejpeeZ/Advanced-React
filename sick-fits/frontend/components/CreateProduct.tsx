import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Router from "next/router";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Form from "./styles/Form";

interface Product extends Record<string, any> {
	name: string;
	price: number;
	description: string;
	image: File | string;
	id?: string;
}

type CreateProductReturn = {
	id: string;
	price: string;
	description: string;
	name: string;
};

const CREATE_PRODUCT_MUTATION = gql`
	mutation CREATE_PRODUCT_MUTATION(
		$name: String!
		$description: String!
		$price: Int!
		$image: Upload
	) {
		createProduct(
			data: {
				name: $name
				description: $description
				price: $price
				photo: { create: { image: $image, altText: $description } }
			}
		) {
			id
			price
			description
			name
		}
	}
`;

export default function CreateProduct() {
	const name = "Nice stuff";
	const price = 1234;
	const description = "The stuff of nice origin.";
	const image = "";

	const { inputs, handleChange, clearForm } = useForm<Product>({
		name,
		price,
		description,
		image,
	});

	const [createProduct, { data, loading, error }] = useMutation<Product>(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
		}
	);

	return (
		<Form
			onSubmit={async (e) => {
				e.preventDefault();
				const response = await createProduct();
				clearForm();
				if (response.data?.createProduct) {
					console.log("Apollo createProduct response data: ", response.data);
					// This is how Apollo names the returned data: identical to the mutation function.
					const { id } = response.data.createProduct as CreateProductReturn;
					if (id) {
						Router.push({
							pathname: `/product/${id}`,
						});
					}
				}
			}}
		>
			{error && <DisplayError error={error} />}
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="image">
					Image
					<input
						required
						type="file"
						id="image"
						name="image"
						onChange={handleChange}
					/>
				</label>
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
					<textarea
						id="description"
						name="description"
						placeholder="0"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">+ Add Product</button>
			</fieldset>
		</Form>
	);
}
