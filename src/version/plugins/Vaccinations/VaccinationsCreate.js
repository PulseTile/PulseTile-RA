import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";

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
 * This component returns Problems creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const VaccinationsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Vaccination" {...rest}>
        <TextInput className={classes.labelBlock} source="vaccinationName" label="Name" />
        <DateInput className={classes.labelBlock} source="vaccinationDateTime" label="Date and Time" />
        <TextInput className={classes.labelBlock} source="series" label="Series" />
        <LongTextInput className={classes.labelBlock} source="comment" label="Comment" />
        <DisabledInput className={classes.labelBlock} source="author" label="Author" />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
        <DisabledInput className={classes.labelBlock} source="date" label="Date" />
    </CreateTemplate>
);

export default withStyles(styles)(VaccinationsCreate);
