import { PropsWithChildren, ReactElement } from "react";
import Header from "./Header";

type PageLayoutProps = PropsWithChildren;


export function PageLayout( { children }: PageLayoutProps ) {
	return (
		<>
			<Header></Header>
			<h2>this is from the pagelayout</h2>
			{ children }
		</>
	);
}
