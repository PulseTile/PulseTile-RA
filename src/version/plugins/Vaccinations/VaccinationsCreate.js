import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    LongTextInput,
    DisabledInput
} from "react-admin";

const VaccinationsCreate = props => (
    <Create title="Add new Vaccination" {...props}>
        <SimpleForm>
            <TextInput source="vaccinationName" label="Name" />
            <DateInput source="vaccinationDateTime" label="Date and Time" />
            <TextInput source="series" label="Series" />
            <LongTextInput source="comment" label="Comment" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Create>
);

export default VaccinationsCreate;