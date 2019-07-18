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
    <ShowTemplate pageTitle="Vaccination" {...rest}>
        <TextField className={classes.labelBlock} source="vaccinationName" label="Vaccination name" />
        <DateField className={classes.labelBlock} source="vaccinationDateTime" label="Vaccination date" />
        <TextField className={classes.labelBlock} source="series" label="Series" />
        <TextField className={classes.labelBlock} source="comment" label="Comment" />
        <TextField className={classes.labelBlock} source="author" label="Author" />
    </ShowTemplate>
);

export default VaccinationsShow;