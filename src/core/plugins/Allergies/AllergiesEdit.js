import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

const AllergiesEdit = props => (
    <Edit title="Edit Allergy" redirect="show" {...props}>
        <SimpleForm>
            <TextInput source="cause" label="Cause" />
            <LongTextInput source="reaction" label="Reaction / Description" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default AllergiesEdit;