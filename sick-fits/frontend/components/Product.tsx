import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";

export interface PhotoInterface {
	id: string;
	image: {
		publicUrlTransformed: string;
	};
}

export interface ProductInterface {
	id: string;
	name: string;
	price: number;
	description?: string;
	photo: PhotoInterface;
}

export default function Product({ product }: { product: ProductInterface }) {
	return (
		<ItemStyles>
			<img
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product.name}
			/>
			<Title>
				<Link href={`/product/${product.id}`}>{product.name}</Link>
			</Title>
			<PriceTag>{formatMoney(product.price)}</PriceTag>
			<p>{product.description}</p>
			{/* todo add buttons etc */}
		</ItemStyles>
	);
}
