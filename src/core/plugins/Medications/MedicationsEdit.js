import React from "react";
import {
    Edit,
    SimpleForm,
    SelectInput,
    TextInput,
    DateInput,
    LongTextInput,
    DisabledInput
} from "react-admin";
import  { routesArray } from "./selects";

const MedicationsEdit = props => (
    <Edit title="Edit Medication" {...props}>
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
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default MedicationsEdit;