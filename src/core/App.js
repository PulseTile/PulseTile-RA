import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import customDataProvider from "./dataProvider";

import corePlugins from "./config/corePlugins";
import nonCorePlugins from "../version/config/nonCorePlugins";

import customSagas from "./sagas/index";
import customReducers from "./reducers";
import PatientSummary from "./PatientSummary";

const dataProvider = customDataProvider("http://dev.ripple.foundation:8000");

const plugins = corePlugins.concat(nonCorePlugins);

export default class App extends Component {
  render() {
    return (
      <Admin
            title="PulseTile"
            customSagas={[customSagas]}
            customReducers={{custom: customReducers}}
            dataProvider={dataProvider}
            dashboard={PatientSummary} >
          {
              plugins.map(item => {
                  return (
                      <Resource
                        name={item.name}
                        icon={item.icon}
                        list={item.list}
                        show={item.show}
                        edit={item.edit}
                        create={item.create}
                      />
                  );
              })
          }
      </Admin>
    );
  }
}
