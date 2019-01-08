import React from "react";
import {
    Create,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput
} from "react-admin";

const DiagnosisCreate = props => (
    <Create title="Add new Problem / Diagnosis" redirect="show" {...props}>
        <SimpleForm>
            <TextInput source="problem" label="Problem issue" />
            <LongTextInput source="description" label="Description" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="dateOfOnset" label="Date" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export default DiagnosisCreate;
