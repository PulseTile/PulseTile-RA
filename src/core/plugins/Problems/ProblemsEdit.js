import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";

/**
 * This component returns block with edit form for Problems
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ProblemsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Problem / Diagnosis"  {...rest}>
        <TextInput className={classes.labelBlock} source="problem" label="Problem issue" />
        <LongTextInput className={classes.labelBlock} source="description" label="Description" />
        <DisabledInput className={classes.labelBlock} source="author" label="Author" />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
        <DisabledInput className={classes.labelBlock} source="dateOfOnset" label="Date" />
    </EditTemplate>
);

export default ProblemsEdit;