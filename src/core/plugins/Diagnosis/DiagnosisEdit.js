import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput
} from "react-admin";

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";

/**
 * This component returns block with edit form for Diagnosis
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const DiagnosisEdit = ({ classes, ...rest }) => (
    <Edit className={classes.edit} title="Edit Problem / Diagnosis" {...rest}>
        <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
            <TextInput source="problem" label="Problem issue" />
            <LongTextInput source="description" label="Description" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="dateOfOnset" label="Date" />
        </SimpleForm>
    </Edit>
);

export default DiagnosisEdit;