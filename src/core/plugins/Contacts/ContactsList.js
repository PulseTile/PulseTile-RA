import React from "react";
import { Route } from "react-router";
import { TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ContactsCreate from "./ContactsCreate";
import ContactsEdit from "./ContactsEdit";
import ContactsShow from "./ContactsShow";

/**
 * This component returns block with Contacts list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 */
const ContactsList = props => (
    <ListTemplate
      create={ContactsCreate}
      edit={ContactsEdit}
      show={ContactsShow}
      resourceUrl="contacts"
      title="Contacts"
      {...props}
    >
        <TextField source="name" />
        <TextField source="relationship" />
        <TextField source="nextOfKin" />
        <TextField source="source" />
    </ListTemplate>
);

export default ContactsList;
