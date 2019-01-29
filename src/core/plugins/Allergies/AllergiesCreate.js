import React from "react";
import { TextInput, DateInput, DisabledInput, LongTextInput } from "react-admin";

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
        <DisabledInput className={classes.labelBlock} source="author" label="Author" />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date" disabled={true} />
    </CreateTemplate>
);

export default withStyles(styles)(AllergiesCreate);
