import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const AllergiesShow = props => {
    return (
        <Show title="Allergies Details" {...props}>
            <SimpleShowLayout>
                <TextField source="cause" />
                <TextField source="reaction" />
                <TextField source="author" />
                <DateField source="dateCreated" />
                <TextField source="source" />
            </SimpleShowLayout>
        </Show>
    );
};

export default AllergiesShow;