import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const ContactsShow = props => {
    return (
        <Show title="Contacts Details" {...props}>
            <SimpleShowLayout>
                <TextField source="name" label="Name" />
                <TextField source="relationship" label="Relationship" />
                <TextField source="relationshipType" label="Relationship Type" />
                <TextField source="notes" />
                <TextField source="author" />
                <DateField source="dateCreated" />
                <TextField source="source" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ContactsShow;