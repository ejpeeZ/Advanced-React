import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloProvider } from "@apollo/client";

import withData from "../lib/withData";
import { PageLayout } from "../components/PageLayout";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }: AppProps) {
	return (
		<ApolloProvider client={apollo}>
			<PageLayout>
				<Component {...pageProps} />
			</PageLayout>
		</ApolloProvider>
	);
}

export default withData(MyApp);
