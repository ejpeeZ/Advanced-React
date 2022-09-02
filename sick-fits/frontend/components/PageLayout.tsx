import { PropsWithChildren, ReactElement } from "react";

type PageLayoutProps = PropsWithChildren;


export function PageLayout( { children }: PageLayoutProps ) {
	return (
		<>
			<h2>Every layout has this</h2>
			{ children }
		</>
	);
}
