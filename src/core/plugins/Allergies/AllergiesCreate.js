import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    LongTextInput,
    ListButton
} from "react-admin";

const AllergiesCreate = ({ classes, ...rest }) => (
    <div className={classes.create}>
        <Create redirect="show" title="Create new Allergy" {...rest}>
            <SimpleForm>
                <TextInput source="cause" label="Cause" />
                <TextInput source="causeCode" label="Cause Code" />
                <TextInput source="causeTerminology" label="Cause Terminology" />
                <LongTextInput source="reaction" label="Reaction / Description" />
                <BooleanInput source="isImport" label="Is import" />
                <TextInput source="source" label="Source" />
                <TextInput source="author" label="Author" />
                <DateInput source="date" label="Date" />
                <ListButton />
            </SimpleForm>
        </Create>
    </div>
);

export default AllergiesCreate;
