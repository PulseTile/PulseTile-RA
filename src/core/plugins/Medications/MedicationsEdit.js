import React from "react";
import { TextInput, SelectInput, DisabledInput, DateInput, LongTextInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import  { routesArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};


/**
 * This component returns block with edit form for Medication
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const MedicationsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Medication"  {...rest}>
        <TextInput className={classes.labelBlock} source="name" label="Name" />
        <SelectInput className={classes.labelBlock} source="route" label="Route" choices={routesArray} />
        <LongTextInput className={classes.labelBlock} source="doseAmount" label="Dose Amount" />
        <LongTextInput className={classes.labelBlock} source="doseDirections" label="Dose Description" />
        <LongTextInput className={classes.labelBlock} source="doseTiming" label="Dose Timing" />
        <TextInput className={classes.labelBlock} source="medicationCode" label="Medication Description" />
        <DateInput className={classes.labelBlock} source="startDate" label="Start date" />
        <DateInput className={classes.labelBlock} source="startTime" label="Start time" />
        <DisabledInput className={classes.labelBlock} source="author" label="Author" />
    </EditTemplate>
);

export default withStyles(styles)(MedicationsEdit);