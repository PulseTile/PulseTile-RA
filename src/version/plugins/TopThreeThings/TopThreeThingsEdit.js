import React from "react";
import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
} from "react-admin";

import EditToolbar from "../../../core/common/EditToolbar";

/**
 * This component returns block with edit form for TopThreeThings
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} props
 * @constructor
 */
const TopThreeThingsEdit = props => {
    const { classes } = props;
    return (
        <Edit className={classes.edit} title="Edit information about Top Three Things" {...props}>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="name1" label="Issue #1" />
                <TextInput source="name2" label="Issue #2" />
                <TextInput source="name3" label="Issue #3" />
                <DisabledInput source="dateCreated" label="Date created" />
                <DisabledInput source="source" label="Source" />
            </SimpleForm>
        </Edit>
    );
};

export default TopThreeThingsEdit;