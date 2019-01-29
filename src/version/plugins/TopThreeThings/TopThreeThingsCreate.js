import React from "react";
import { DisabledInput, TextInput, DateInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns TopThreeThings creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Problems / Issues" {...rest}>
        <TextInput className={classes.labelBlock}  source="name1" label="Issue #1" />
        <TextInput className={classes.labelBlock}  source="name2" label="Issue #2" />
        <TextInput className={classes.labelBlock}  source="name3" label="Issue #3" />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date created" disabled={true}  />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
    </CreateTemplate>
);

export default withStyles(styles)(TopThreeThingsCreate);
