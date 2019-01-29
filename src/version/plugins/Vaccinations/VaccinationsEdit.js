import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";

/**
 * This component returns block with edit form for Vaccinations
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const VaccinationsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Vaccination"  {...rest}>
        <TextInput source="vaccinationName" label="Name" />
        <DateInput source="vaccinationDateTime" label="Date and Time" />
        <TextInput source="series" label="Series" />
        <LongTextInput source="comment" label="Comment" />
        <DisabledInput source="author" label="Author" />
        <DisabledInput source="source" label="Source" />
        <DisabledInput source="date" label="Date" />
    </EditTemplate>
);

export default VaccinationsEdit;