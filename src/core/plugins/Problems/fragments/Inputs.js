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
 * This component returns inputs for Problems creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProblemsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="problem" label="Problem issue" fullWidth />
        <DateInput className={classes.labelBlock} source="dateOfOnset" label="Date of Onset" fullWidth />
        <LongTextInput className={classes.labelBlock} source="description" label="Description" fullWidth />
        <TextInput className={classes.labelBlock} source="code" label="Terminology Code" fullWidth />
        <TextInput className={classes.labelBlock} source="terminology" label="Terminology" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(ProblemsInputs);
