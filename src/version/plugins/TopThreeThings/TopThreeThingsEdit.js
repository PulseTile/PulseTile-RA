import React from "react";
import { DisabledInput, TextInput, DateInput } from "react-admin";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";

/**
 * This component returns block with edit form for Top Three Things
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TopThreeThingsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Top Three Things"  {...rest}>
        <TextInput source="name1" label="Issue #1" />
        <TextInput source="name2" label="Issue #2" />
        <TextInput source="name3" label="Issue #3" />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date created" disabled={true}  />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
    </EditTemplate>
);

export default TopThreeThingsEdit;