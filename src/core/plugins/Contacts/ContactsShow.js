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
 * This component returns block with Contact details component
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ContactsShow = ({ classes, ...rest }) => (
    <ShowTemplate pageTitle="Contact" {...rest}>
        <TextField className={classes.labelBlock} source="name" label="Name" />
        <TextField className={classes.labelBlock} source="relationship" label="Relationship" />
        <TextField className={classes.labelBlock} source="relationshipType" label="Relationship Type" />
        <TextField className={classes.labelBlock} source="relationshipTerminology" label="Relationship Terminology" />
        <TextField className={classes.labelBlock} source="nextOfKin" label="Next of Kin" />
        <TextField className={classes.labelBlock} source="contactInformation" label="Contact Information" />
        <TextField className={classes.labelBlock} source="notes" />
        <TextField className={classes.labelBlock} source="author" />
    </ShowTemplate>
);

export default withStyles(styles)(ContactsShow);
