import React from "react";
import { DateInput, SelectInput, LongTextInput, TextInput, DisabledInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import { routesArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns fields for Medications creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MedicationsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="name" label="Name" fullWidth />
        <SelectInput className={classes.labelBlock} source="route" label="Route" choices={routesArray} fullWidth />
        <LongTextInput className={classes.labelBlock} source="doseAmount" label="Dose Amount" />
        <LongTextInput className={classes.labelBlock} source="doseDirections" label="Dose Description" />
        <LongTextInput className={classes.labelBlock} source="doseTiming" label="Dose Timing" />
        <TextInput className={classes.labelBlock} source="medicationCode" label="Medication Description" fullWidth />
        <DateInput className={classes.labelBlock} source="startDate" label="Start date" fullWidth />
        <DateInput className={classes.labelBlock} source="startTime" label="Start time" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(MedicationsInputs);
