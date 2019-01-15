import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput
} from "react-admin";

import EditToolbar from "../../common/EditToolbar";


const DiagnosisEdit = props => (
    <Edit title="Edit Problem / Diagnosis" {...props}>
        <SimpleForm toolbar={<EditToolbar />}>
            <TextInput source="problem" label="Problem issue" />
            <LongTextInput source="description" label="Description" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="dateOfOnset" label="Date" />
        </SimpleForm>
    </Edit>
);

export default DiagnosisEdit;