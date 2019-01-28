import React, { Component } from "react";
import { get } from "lodash";
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

const dataProvider = customDataProvider("http://dev.ripple.foundation:8000");

const plugins = corePlugins.concat(nonCorePlugins);

const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            customSagas={[customSagas]}
            customReducers={{custom: customReducers}}
            customRoutes={customRoutes}
            dataProvider={dataProvider}
            dashboard={Charts}
            appLayout={Layout}
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
