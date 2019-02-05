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
        <TextField className={classes.labelBlock} label="Route" source="route" />
        <TextField className={classes.labelBlock} label="Dose amount" source="doseAmount" />
        <TextField className={classes.labelBlock} label="Dose Directions" source="doseDirections" />
        <TextField className={classes.labelBlock} label="Dose Timing" source="doseTiming" />
        <TextField className={classes.labelBlock} label="Medication code" source="medicationCode" />
        <TextField className={classes.labelBlock} label="Author" source="author" />
        <DateField className={classes.labelBlock} label="Start date" source="startDate" />
        <DateField className={classes.labelBlock} label="Start time" source="startTime" />
    </ShowTemplate>
);

export default withStyles(styles)(ProblemsShow);
