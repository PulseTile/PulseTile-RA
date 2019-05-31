import React from "react";
import { Route } from "react-router";
import { TextField } from "react-admin";

import ListTemplate from "../../common/ResourseTemplates/ListTemplate";
import ContactsCreate from "./ContactsCreate";
import ContactsEdit from "./ContactsEdit";
import ContactsShow from "./ContactsShow";
import DatagridRow from "./fragments/DatagridRow";

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
      CustomRow={DatagridRow}
      isCustomDatagrid={true}
      {...props}
    >
        <TextField source="name" label="Name" />
        <TextField source="relationship" label="Relationship" />
        <TextField source="nextOfKin" label="Next Of Kin" />
        <TextField source="source" label="Source" />
    </ListTemplate>
);

export default ContactsList;
