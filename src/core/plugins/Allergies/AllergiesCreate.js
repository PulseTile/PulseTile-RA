import React from "react";
import { TextInput, DateInput, DisabledInput, LongTextInput } from "react-admin";
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns Allergies creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const AllergiesCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Allergy" {...rest}>
        <TextInput className={classes.labelBlock} source="cause" label="Cause" />
        <LongTextInput className={classes.labelBlock} source="reaction" label="Reaction / Description" />
        <TextInput className={classes.labelBlock} source="causeCode" label="Terminology" />
        <TextInput className={classes.labelBlock} source="causeTerminology" label="Terminology Code" />
        <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} />
    </CreateTemplate>
);

export default withStyles(styles)(AllergiesCreate);
