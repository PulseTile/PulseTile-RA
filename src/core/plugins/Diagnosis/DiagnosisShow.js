import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const DiagnosisShow = props => {
    return (
        <Show title="Problems Details" {...props}>
            <SimpleShowLayout>
                <TextField source="problem" />
                <TextField source="description" />
                <TextField source="author" />
                <DateField source="dateCreated" />
                <TextField source="source" />
            </SimpleShowLayout>
        </Show>
    );
};

export default DiagnosisShow;