import React from "react";
import { DateInput, SelectInput, LongTextInput, TextInput, DisabledInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import  { routesArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns Medications creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MedicationsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Medication" {...rest}>
        <TextInput source="name" label="Name" />
        <SelectInput source="route" label="Route" choices={routesArray} />
        <LongTextInput source="doseAmount" label="Dose Amount" />
        <LongTextInput source="doseDirections" label="Dose Description" />
        <LongTextInput source="doseTiming" label="Dose Timing" />
        <TextInput source="medicationCode" label="Medication Description" />
        <DateInput source="startDate" label="Start date" />
        <DateInput source="startTime" label="Start time" />
        <DisabledInput source="author" label="Author" />
    </CreateTemplate>
);

export default withStyles(styles)(MedicationsCreate);
