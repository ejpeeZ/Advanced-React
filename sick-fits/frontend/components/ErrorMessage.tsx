import styled from "styled-components";
import React from "react";

import { ApolloError as AppoloErrorType } from "@apollo/client";

const ErrorStyles = styled.div`
	padding: 2rem;
	background: white;
	margin: 2rem 0;
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-left: 5px solid red;
	p {
		margin: 0;
		font-weight: 100;
	}
	strong {
		margin-right: 1rem;
	}
`;

type DisplayErrorProps = {
	error: AppoloErrorType;
};

const ApolloError = ({ error }: DisplayErrorProps) => {
	if (
		error.networkError &&
		"result" in error.networkError &&
		"errors" in error.networkError.result
	) {
		const { errors } = error.networkError.result;
		if (Array.isArray(errors)) {
			return (
				<>
					{errors.map((errorPart: { message: string }, i: number) => (
						<ErrorStyles key={i}>
							<p data-test="graphql-error">
								<strong>Shoot!</strong>
								{errorPart.message.replace("GraphQL error: ", "")}
							</p>
						</ErrorStyles>
					))}
				</>
			);
		}
	}
	return (
		<ErrorStyles>
			<p data-test="graphql-error">
				<strong>Shoot!</strong>
				{error.message.replace("GraphQL error: ", "")}
			</p>
		</ErrorStyles>
	);
};

export default ApolloError;
