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

import PatientSummary from "./pages/PatientSummary";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./pages/LogoutButton";

const dataProvider = customDataProvider("http://dev.ripple.foundation:8000");

const plugins = corePlugins.concat(nonCorePlugins);

export default class App extends Component {
  render() {
    return (
      <Admin
        // authProvider={authProvider}
        title="PulseTile"
        customSagas={[customSagas]}
        customReducers={{custom: customReducers}}
        customRoutes={customRoutes}
        dataProvider={dataProvider}
        dashboard={PatientSummary}
        // loginPage={LoginPage}
        // logoutButton={LogoutButton}
      >
          {
              plugins.map(item => {
                  return (
                      <Resource
                        name={item.name}
                        icon={item.icon}
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
