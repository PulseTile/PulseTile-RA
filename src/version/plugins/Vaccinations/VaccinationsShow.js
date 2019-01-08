import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const VaccinationsShow = props => {
    return (
        <Show title="Vaccinations Details"  {...props}>
            <SimpleShowLayout>
                <TextField source="vaccinationName" />
                <TextField source="route" />
                <TextField source="author" />
                <DateField source="vaccinationDateTime" />
                <TextField source="source" />
            </SimpleShowLayout>
        </Show>
    );
};

export default VaccinationsShow;