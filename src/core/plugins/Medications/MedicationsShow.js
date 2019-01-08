import React from "react";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

const MedicationsShow = props => {
    return (
        <Show title="Medications Details"  {...props}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="route" />
                <TextField source="doseAmount" />
                <TextField source="doseDirections" />
                <TextField source="doseTiming" />
                <TextField source="medicationCode" />
                <TextField source="author" />
                <DateField source="startDate" />
                <DateField source="startTime" />
                <TextField source="source" />
            </SimpleShowLayout>
        </Show>
    );
};

export default MedicationsShow;