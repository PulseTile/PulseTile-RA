import React from "react";
import {
    Edit,
    SimpleForm,
    SelectInput,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput
} from "react-admin";
import { relationshipArray, relationshipTypeArray } from "./selects";

const ContactsEdit = props => (
    <Edit title="Edit Contact" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Name" />
            <SelectInput source="relationship" label="Relationship" choices={relationshipArray} />
            <SelectInput source="relationshipType" label="Relationship Type" choices={relationshipTypeArray} />
            <TextInput source="notes" label="Comment" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default ContactsEdit;