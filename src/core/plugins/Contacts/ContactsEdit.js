import React from "react";
import { SelectInput, DisabledInput, TextInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import { relationshipArray, relationshipTypeArray } from "./selects";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};


/**
 * This component returns block with edit form for Contacts
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ContactsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Contact"  {...rest}>
        <TextInput className={classes.labelBlock} source="name" label="Name" />
        <SelectInput className={classes.labelBlock} source="relationship" label="Relationship" choices={relationshipArray} />
        <SelectInput className={classes.labelBlock} source="relationshipType" label="Relationship Type" choices={relationshipTypeArray} />
        <TextInput className={classes.labelBlock} source="notes" label="Comment" />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
        <DisabledInput className={classes.labelBlock} source="date" label="Date" />
    </EditTemplate>
);

export default withStyles(styles)(ContactsEdit);
