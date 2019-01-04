import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import customDataProvider from "./dataProvider";

import AllergiesList from "./pages/Allergies/AllergiesList";
import ContactsList from "./pages/Contacts/ContactsList";

import AllergiesIcon from "@material-ui/icons/Pets";
import ContactsIcon from "@material-ui/icons/Phone";

const dataProvider = customDataProvider("http://dev.ripple.foundation:8000");

export default class App extends Component {
  render() {
    return (
      <Admin title="PulseTile" dataProvider={dataProvider}>
        <Resource name="allergies" icon={AllergiesIcon} list={AllergiesList} />
        <Resource name="contacts" icon={ContactsIcon} list={ContactsList} />
      </Admin>
    );
  }
}
