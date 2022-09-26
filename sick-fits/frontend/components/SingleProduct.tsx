import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";

type ProductQueryReturn = {
	Product: {
		name: string;
		price: number;
		description: string;
		id: string;
		photo: {
			altText: string;
			image: {
				publicUrlTransformed: string;
			};
		};
	};
};

const ProductStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	max-width: var(--maxWidth);
	align-items: top;
	gap: 2rem;
	img {
		width: 100%;
		object-fit: contain;
	}
`;

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		Product(where: { id: $id }) {
			name
			price
			description
			id
			photo {
				altText
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

export default function SingleProduct({ id }: { id: string }) {
	const { data, loading, error } = useQuery<ProductQueryReturn>(
		SINGLE_ITEM_QUERY,
		{
			variables: { id },
		}
	);
	console.log({ data, loading, error });
	if (loading) return <p>Loading...</p>;
	if (error) return <DisplayError error={error} />;
	if (data) {
		const { Product } = data;
		return (
			<ProductStyles>
				<Head key="single-product-head">
					<title>{`Sick Fits | ${Product.name}`}</title>
				</Head>
				<img
					src={Product.photo.image.publicUrlTransformed}
					alt={Product.photo.altText}
				/>
				<div className="details">
					<h2>{Product.name}</h2>
					<p>{Product.description}</p>
				</div>
			</ProductStyles>
		);
	}
	return null;
}
