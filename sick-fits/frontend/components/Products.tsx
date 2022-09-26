import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Product, { ProductInterface } from "./Product";

interface AllProductData {
	allProducts: ProductInterface[];
}

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY {
		allProducts {
			id
			name
			price
			description
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const ProductsListStyled = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

export default function Products() {
	const queryResult = useQuery<AllProductData | undefined>(ALL_PRODUCTS_QUERY);
	if (queryResult.loading) {
		return <p>Loading...</p>;
	}
	if (queryResult.error) {
		return <p>{`Error: ${queryResult.error.message}`}</p>;
	}
	if (queryResult.data) {
		return (
			<div>
				<p>Products!</p>
				<ProductsListStyled>
					{queryResult.data.allProducts.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</ProductsListStyled>
			</div>
		);
	}
	return null;
}
