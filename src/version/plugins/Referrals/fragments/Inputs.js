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
 * This component returns Referrals creation/editing form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ReferralsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="referralFrom" label="Referral From" fullWidth />
        <TextInput className={classes.labelBlock} source="referralTo" label="Referral To" fullWidth />
        <DateInput className={classes.labelBlock} source="dateOfReferral" label="Date of Referral" fullWidth />
        <LongTextInput className={classes.labelBlock} source="referralReason" label="Reason for Referral" fullWidth />
        <LongTextInput className={classes.labelBlock} source="referralSummary" label="Clinical Summary" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(ReferralsInputs);
