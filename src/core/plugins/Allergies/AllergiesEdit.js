import React from "react";
import { TextInput, DisabledInput, DateInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const AllergiesEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Allergy"  {...rest}>
        <TextInput className={classes.labelBlock} source="cause" label="Cause" />
        <LongTextInput className={classes.labelBlock} source="reaction" label="Reaction / Description" />
        <TextInput className={classes.labelBlock} source="causeCode" label="Terminology" />
        <TextInput className={classes.labelBlock} source="causeTerminology" label="Terminology Code" />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} />
    </EditTemplate>
);

export default withStyles(styles)(AllergiesEdit);
