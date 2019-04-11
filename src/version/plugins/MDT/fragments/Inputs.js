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
 * This component returns MDT creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MdtInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="serviceTeam" label="Service / Team" fullWidth />
        <DateInput className={classes.labelBlock} source="dateOfRequest" label="Date of Request" fullWidth />
        <DateInput className={classes.labelBlock} source="dateOfMeeting" label="Date of Meeting" fullWidth />
        <TextInput className={classes.labelBlock} source="servicePageLink" label="Link to MDT Web Service Directory" fullWidth />
        <LongTextInput className={classes.labelBlock} source="question" label="Question For MDT" fullWidth />
        <LongTextInput className={classes.labelBlock} source="notes" label="Meeting Discussion" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(MdtInputs);