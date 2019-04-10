import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";
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
 * This component returns Procedures creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProceduresInput = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="procedureName" label="Procedure Name" fullWidth />
        <DateInput className={classes.labelBlock} source="date" label="Date of Procedure" fullWidth />
        <TextInput className={classes.labelBlock} source="performer" label="Procedure Performed By" fullWidth />
        <LongTextInput className={classes.labelBlock} source="notes" label="Procedure Notes" fullWidth />
        <TextInput className={classes.labelBlock} source="procedureTerminology" label="Terminology" fullWidth />
        <TextInput className={classes.labelBlock} source="procedureCode" label="Code" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(ProceduresInput);
