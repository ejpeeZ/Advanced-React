import type { AppProps } from "next/app";

import { PageLayout } from "../components/PageLayout";

export default function MyApp( { Component, pageProps }: AppProps ) {
    return <PageLayout>
        <h2>This is on all pages.</h2>
        <Component { ...pageProps } />
    </PageLayout>
}
