import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { createUploadLink } from "apollo-upload-client";
import withApollo, { InitApolloOptions } from "next-with-apollo";

import { endpoint, prodEndpoint } from "../config";

function createClient({
	headers,
	initialState,
}: InitApolloOptions<NormalizedCacheObject>) {
	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }: ErrorResponse) => {
				if (graphQLErrors)
					graphQLErrors.forEach((graphQlError: GraphQLError) => {
						const stringMessage = graphQLErrors.toString();
						console.log(`[GraphQL error]: Message: ${graphQlError.message}`);
						console.log(stringMessage);
					});
				if (networkError)
					console.log(
						`[Network error]: ${networkError}. Backend is unreachable. Is it running?`
					);
			}),
			// this uses apollo-link-http under the hood, so all the options here come from that package
			createUploadLink({
				uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
				fetchOptions: {
					credentials: "include",
				},
				// pass the headers along from this request. This enables SSR with logged in state
				headers,
			}),
		]),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// TODO: We will add this together!
						// allProducts: paginationField(),
					},
				},
			},
		}).restore(initialState || {}),
	});
}

export default withApollo(createClient, { getDataFromTree });
