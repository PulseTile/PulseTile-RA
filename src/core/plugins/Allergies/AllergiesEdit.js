import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import Button from '@material-ui/core/Button';

import EditToolbarWithoutDelete from "../../common/EditToolbarWithoutDelete";

/**
 * This component returns block with edit form for Allergies
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  changeViewType
 * @param {shape} rest
 * @constructor
 */
const AllergiesEdit = ({ classes, changeViewType, ...rest }) => (
    <div className={classes.show}>
        <Edit className={classes.edit} title="Edit Allergy" {...rest}>
            <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
                <TextInput source="cause" label="Cause" />
                <LongTextInput source="reaction" label="Reaction / Description" />
                <DisabledInput source="source" label="Source" />
                <DisabledInput source="author" label="Author" />
                <DisabledInput source="date" label="Date" />
            </SimpleForm>
        </Edit>
        <Button color="danger" onClick={() => changeViewType('show')}>Cancel</Button>
    </div>
);

export default AllergiesEdit;
