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
    <EditTemplate blockTitle="Problem / Issue"  {...rest}>
        <TextInput source="problem" label="Problem issue" />
        <LongTextInput source="description" label="Description" />
        <DisabledInput source="author" label="Author" />
        <DisabledInput source="source" label="Source" />
        <DisabledInput source="dateOfOnset" label="Date" />
    </EditTemplate>
);

export default ProblemsEdit;