import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const AllergiesEdit = ({ classes, ...rest }) => (
    <Edit className={classes.edit} title="Edit Allergy" {...rest}>
        <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
            <TextInput source="cause" label="Cause" />
            <LongTextInput source="reaction" label="Reaction / Description" />
            <DisabledInput source="source" label="Source" />
            <DisabledInput source="author" label="Author" />
            <DisabledInput source="date" label="Date" />
        </SimpleForm>
    </Edit>
);

export default AllergiesEdit;
