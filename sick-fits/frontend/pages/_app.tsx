import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { PageLayout } from "../components/PageLayout";

// TODO: swap with our own
import "nprogress/nprogress.css";
import "../components/styles/nprogress.css"

Router.events.on( "routeChangeStart", () => NProgress.start() );
Router.events.on( "routeChangeComplete", () => NProgress.done() );
Router.events.on( "routeChangeError", () => NProgress.done() );

export default function MyApp( { Component, pageProps }: AppProps ) {
    return <PageLayout>
        <Component { ...pageProps } />
    </PageLayout>
}
