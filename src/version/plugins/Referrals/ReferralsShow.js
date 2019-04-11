import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../../core/common/ResourseTemplates/ShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Referral details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ReferralsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Referral" {...rest}>
        <TextField className={classes.labelBlock} source="referralFrom" label="Referral From" />
        <TextField className={classes.labelBlock} source="referralTo" label="Referral To" />
        <DateField className={classes.labelBlock} source="dateOfReferral" label="Date of Referral" />
        <TextField className={classes.labelBlock} source="referralReason" label="Reason of Referral" />
        <TextField className={classes.labelBlock} source="referralSummary" label="Clinical Summary" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
    </ShowTemplate>
);

export default withStyles(styles)(ReferralsShow);