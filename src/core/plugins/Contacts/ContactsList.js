import React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DateField,
    ShowButton
} from "react-admin";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ContactsBanner from "../../images/banners/contacts.jpg";

export const ContactsList = props => {
    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    height="160"
                    image={ContactsBanner}
                    title="Contacts"
                />
            </Card>
            <List title="Contacts" {...props}>
                <Datagrid>
                    <TextField source="name" />
                    <TextField source="relationship" />
                    <TextField source="nextOfKin" />
                    <TextField source="source" />
                    <ShowButton />
                    <EditButton />
                </Datagrid>
            </List>
        </div>
    );
};

export default ContactsList;
