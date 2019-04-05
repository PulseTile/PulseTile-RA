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
 * This component returns block with Medication details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ProblemsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Medication" {...rest}>
        <TextField className={classes.labelBlock} label="Name" source="name" />
        <TextField className={classes.labelBlock} label="Dose Description" source="doseAmount" />
        <TextField className={classes.labelBlock} label="Author" source="author" />
        <DateField className={classes.labelBlock} label="Date" source="dateCreated" />
    </ShowTemplate>
);

export default withStyles(styles)(ProblemsShow);
