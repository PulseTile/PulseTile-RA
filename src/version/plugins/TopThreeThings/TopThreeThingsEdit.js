import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
} from "react-admin";

import EditToolbarWithoutDelete from "../../../core/common/EditToolbarWithoutDelete";

/**
 * This component returns block with edit form for TopThreeThings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TopThreeThingsEdit = ({ classes, ...rest }) => (
    <Edit className={classes.edit} title="Edit information about Top Three Things" {...rest}>
        <SimpleForm toolbar={<EditToolbarWithoutDelete />}>
            <TextInput source="name1" label="Issue #1" />
            <TextInput source="name2" label="Issue #2" />
            <TextInput source="name3" label="Issue #3" />
            <DisabledInput source="dateCreated" label="Date created" />
            <DisabledInput source="source" label="Source" />
        </SimpleForm>
    </Edit>
);

export default TopThreeThingsEdit;