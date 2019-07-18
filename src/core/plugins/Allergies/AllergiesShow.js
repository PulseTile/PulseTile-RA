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
 * This component returns block with Allergies details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const AllergiesShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Allergy" {...rest}>
        <TextField className={classes.labelBlock} label="Cause" source="cause" />
        <TextField className={classes.labelBlock} label="Reaction / Description" source="reaction" />
        <TextField className={classes.labelBlock} label="Terminology" source="causeCode" />
        <TextField className={classes.labelBlock} label="Terminology Code" source="causeTerminology" />
        <TextField className={classes.labelBlock} label="Author" source="author" />
    </ShowTemplate>
);

export default withStyles(styles)(AllergiesShow);
