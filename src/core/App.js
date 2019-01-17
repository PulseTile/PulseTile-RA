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
import CustomLayout from "./common/CustomLayout";

const dataProvider = customDataProvider("http://dev.ripple.foundation:8000");

const plugins = corePlugins.concat(nonCorePlugins);

export default class App extends Component {
    render() {
        return (
            <Admin
                authProvider={authProvider}
                customSagas={[customSagas]}
                customReducers={{custom: customReducers}}
                customRoutes={customRoutes}
                dataProvider={dataProvider}
                dashboard={Charts}
                appLayout={CustomLayout}
            >
                {
                    plugins.map(item => {
                        return (
                            <Resource
                                name={item.name}
                                options={{ label: item.label }}
                                list={item.list}
                                show={get(item, 'show', false) ? item.show : null}
                                edit={get(item, 'edit', false) ? item.edit : null}
                                create={get(item, 'create', false) ? item.create : null}
                            />
                        );
                    })
                }
            </Admin>
        );
    }
}
