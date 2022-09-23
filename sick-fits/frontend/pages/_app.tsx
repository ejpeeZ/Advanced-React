import type { AppProps, AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import withData from "../lib/withData";
import { PageLayout } from "../components/PageLayout";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface AppPropsWithApollo extends AppProps {
	apollo: ApolloClient<any>;
}

function MyApp({ Component, pageProps, apollo }: AppPropsWithApollo) {
	return (
		<ApolloProvider client={apollo}>
			<PageLayout>
				<Component {...pageProps} />
			</PageLayout>
		</ApolloProvider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return {
		pageProps: {
			...pageProps,
			query: ctx.query,
		},
	};
};

export default withData(MyApp);
