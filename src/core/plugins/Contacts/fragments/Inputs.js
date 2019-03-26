import React from "react";
import { TextInput, SelectInput, BooleanInput, DateInput, DisabledInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import { relationshipArray, relationshipTypeArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns inputs for Contacts creation/editing forms
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ContactsInputs = ({ classes, ...rest }) => (
    <React.Fragment>
        <TextInput className={classes.labelBlock} source="name" label="Name" fullWidth />
        <SelectInput className={classes.labelBlock} source="relationship" label="Relationship" choices={relationshipArray} fullWidth />
        <SelectInput className={classes.labelBlock} source="relationshipCode" label="Relationship Type" choices={relationshipTypeArray} fullWidth />
        <TextInput className={classes.labelBlock} source="relationshipTerminology" label="Relationship Terminology" fullWidth />
        <BooleanInput className={classes.labelBlock} label="Next of Kin" source="nextOfKin" fullWidth />
        <LongTextInput className={classes.labelBlock} source="contactInformation" label="Contact Information" fullWidth />
        <LongTextInput className={classes.labelBlock} source="notes" label="Note" fullWidth />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
        <DateInput className={classes.labelBlock} source="dateSubmitted" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
    </React.Fragment>
);

export default withStyles(styles)(ContactsInputs);
