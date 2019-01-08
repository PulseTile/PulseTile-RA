import React from "react";
import { SelectInput, Create, SimpleForm, TextInput, DateInput, DisabledInput } from "react-admin";
import { relationshipArray, relationshipTypeArray } from "./selects";

const ContactsCreate = props => (
    <Create redirect="show" title="Add new Contact" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Name" />
            <SelectInput source="relationship" label="Relationship" choices={relationshipArray} />
            <SelectInput source="relationshipType" label="Relationship Type" choices={relationshipTypeArray} />
            <TextInput source="notes" label="Comment" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Create>
);

export default ContactsCreate;