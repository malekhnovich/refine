import React from "react";
import { AppProps } from "next/app";

import { GitHubBanner, Refine } from "@refinedev/core";
import { Layout, notificationProvider } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import "@refinedev/antd/dist/reset.css";

import "@styles/global.css";

import { authProvider } from "src/authProvider";
import { API_URL } from "src/constants";
import type { NextPage } from "next";

export type ExtendedNextPage = NextPage & {
    noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
    Component: ExtendedNextPage;
};

function MyApp({ Component, pageProps }: ExtendedAppProps): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        );
    };

    return (
        <>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                authProvider={authProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    { name: "users", list: "/users" },
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/edit/:id",
                        show: "/posts/show/:id",
                    },
                ]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
                notificationProvider={notificationProvider}
            >
                {renderComponent()}
                <UnsavedChangesNotifier />
            </Refine>
        </>
    );
}

export default MyApp;