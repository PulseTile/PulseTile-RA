import React from "react";
import { TextField, DateField } from "react-admin";
import { withStyles } from '@material-ui/core/styles';

import ShowTemplate from "../../common/ResourseTemplates/ShowTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginTop: "0px !important",
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with Patient details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const PatientShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Patient" {...rest}>
        <TextField className={classes.labelBlock} label="Name" source="name" />
        <DateField className={classes.labelBlock} label="Date of Birth" source="dateOfBirth" />
        <TextField className={classes.labelBlock} label="Gender" source="gender" />
        <TextField className={classes.labelBlock} label="Address" source="address" />
    </ShowTemplate>
);

export default withStyles(styles)(PatientShow);
