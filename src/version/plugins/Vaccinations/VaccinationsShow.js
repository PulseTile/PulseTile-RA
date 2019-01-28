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
 * This component returns block with Allergies details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const VaccinationsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Problem / Diagnosis" {...rest}>
        <TextField className={classes.labelBlock} source="vaccinationName" />
        <TextField className={classes.labelBlock} source="route" />
        <TextField className={classes.labelBlock} source="author" />
        <DateField className={classes.labelBlock} source="vaccinationDateTime" />
        <TextField className={classes.labelBlock} source="source" />
    </ShowTemplate>
);

export default VaccinationsShow;