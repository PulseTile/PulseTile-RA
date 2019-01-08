import React from "react";
import { Create, SelectInput, DateInput, LongTextInput, SimpleForm, TextInput, DisabledInput } from "react-admin";
import  { routesArray } from "./selects";

const MedicationsCreate = props => (
    <Create title="Add new Medications" redirect="show" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Name" />
            <SelectInput source="route" label="Route" choices={routesArray} />
            <LongTextInput source="doseAmount" label="Dose Amount" />
            <LongTextInput source="doseDirections" label="Dose Description" />
            <LongTextInput source="doseTiming" label="Dose Timing" />
            <TextInput source="medicationCode" label="Medication Description" />
            <DateInput source="startDate" label="Start date" />
            <DateInput source="startTime" label="Start time" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="date" label="Date" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);

export default MedicationsCreate;
