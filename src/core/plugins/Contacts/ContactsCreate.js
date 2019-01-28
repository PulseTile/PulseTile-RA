import React from "react";
import { SelectInput, TextInput, DisabledInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import { relationshipArray, relationshipTypeArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns Contacts creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ContactsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Contact" {...rest}>
        <TextInput source="name" label="Name" />
        <SelectInput source="relationship" label="Relationship" choices={relationshipArray} />
        <SelectInput source="relationshipType" label="Relationship Type" choices={relationshipTypeArray} />
        <TextInput source="notes" label="Comment" />
        <DisabledInput source="source" label="Source" />
        <DisabledInput source="author" label="Author" />
        <DisabledInput source="date" label="Date" />
    </CreateTemplate>
);

export default withStyles(styles)(ContactsCreate);
