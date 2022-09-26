import type { NextPageContext } from "next";
import SingleProduct from "../../components/SingleProduct";

export default function SingleProductPage({ query }: NextPageContext) {
	if (typeof query.id === "string") return <SingleProduct id={query.id} />;
	return null;
}
