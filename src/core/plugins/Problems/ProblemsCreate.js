import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";

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
 * This component returns Problems creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ProblemsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Problems / Issues" {...rest}>
        <TextInput className={classes.labelBlock} source="problem" label="Problem issue" />
        <LongTextInput className={classes.labelBlock} source="description" label="Description" />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
        <DisabledInput className={classes.labelBlock} source="author" label="Author" />
        <DisabledInput className={classes.labelBlock} source="dateOfOnset" label="Date" defaultValue={new Date()} />
    </CreateTemplate>
);

export default withStyles(styles)(ProblemsCreate);
