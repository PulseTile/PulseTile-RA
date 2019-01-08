import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
} from "react-admin";

const VaccinationsCreate = props => (
    <Edit title="Edit information about Vaccination" {...props}>
        <SimpleForm>
            <TextInput source="vaccinationName" label="Name" />
            <DateInput source="vaccinationDateTime" label="Date and Time" />
            <TextInput source="series" label="Series" />
            <LongTextInput source="comment" label="Comment" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default VaccinationsCreate;