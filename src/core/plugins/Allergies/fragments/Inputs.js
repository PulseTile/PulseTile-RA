import React from "react";
import { TextInput, DateInput, DisabledInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns inputs for Allergies creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const AllergiesInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="cause" label="Cause" fullWidth />
        <LongTextInput className={classes.labelBlock} source="reaction" label="Reaction / Description" />
        <TextInput className={classes.labelBlock} source="causeCode" label="Terminology" fullWidth />
        <TextInput className={classes.labelBlock} source="causeTerminology" label="Terminology Code" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(AllergiesInputs);
