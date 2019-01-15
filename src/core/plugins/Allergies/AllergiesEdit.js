import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import EditToolbar from "../../common/EditToolbar";

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const AllergiesEdit = props => {
    const { classes } = props;
    return (
        <Edit className={classes.edit} title="Edit Allergy" {...props}>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="cause" label="Cause" />
                <LongTextInput source="reaction" label="Reaction / Description" />
                <DisabledInput source="source" label="Source" />
                <DisabledInput source="author" label="Author" />
                <DisabledInput source="date" label="Date" />
            </SimpleForm>
        </Edit>
    );
}


export default AllergiesEdit;