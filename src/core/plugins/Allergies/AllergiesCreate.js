import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    LongTextInput
} from "react-admin";

const AllergiesCreate = props => (
    <Create redirect="show" title="Create new Allergy" {...props}>
        <SimpleForm>
            <TextInput source="cause" label="Cause" />
            <TextInput source="causeCode" label="Cause Code" />
            <TextInput source="causeTerminology" label="Cause Terminology" />
            <LongTextInput source="reaction" label="Reaction / Description" />
            <BooleanInput source="isImport" label="Is import" />
            <TextInput source="source" label="Source" />
            <TextInput source="author" label="Author" />
            <DateInput source="date" label="Date" />
        </SimpleForm>
    </Create>
);

export default AllergiesCreate;
