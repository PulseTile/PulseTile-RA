import React, { Component } from "react";
import get from "lodash/get";
import { Admin, Resource } from "react-admin";

import customDataProvider from "./dataProviders/dataProvider";
import authProvider from "./dataProviders/authProvider";

import corePlugins from "./config/corePlugins";
import nonCorePlugins from "../version/config/nonCorePlugins";

import customSagas from "./sagas";
import customReducers from "./reducers";
import customRoutes from "./routes";

import Charts from "./pages/Charts";
import Layout from "./common/CustomLayout";
import InitializePage from "./pages/InitializePage";
import { themeCommonElements } from "../version/config/theme.config";
import translations from "./translations";

const dataProvider = customDataProvider();
const plugins = corePlugins.concat(nonCorePlugins);
const Homepage = get(themeCommonElements, 'homePage', Charts);
const i18nProvider = locale => translations[locale];

const App = () => {
    return (
        <Admin
            customSagas={[customSagas]}
            customReducers={{custom: customReducers}}
            customRoutes={customRoutes}
            dataProvider={dataProvider}
            dashboard={Homepage}
            appLayout={Layout}
            locale="en"
            i18nProvider={i18nProvider}
        >
            {
                plugins.map(item => {
                    return (
                        <Resource
                            name={item.name}
                            options={{ label: item.label }}
                            list={item.list}
                        />
                    );
                })
            }
        </Admin>
    );
}

export default App;
