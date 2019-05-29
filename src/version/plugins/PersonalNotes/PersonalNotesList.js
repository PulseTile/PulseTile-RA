import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import PersonalNotesCreate from "./PersonalNotesCreate";
import PersonalNotesEdit from "./PersonalNotesEdit";
import PersonalNotesShow from "./PersonalNotesShow";
import DatagridRow from "./fragments/DatagridRow";

/**
 * This component returns block with Personal Notes list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const PersonalNotesList = ({ classes, ...rest }) => (
    <ListTemplate
        create={PersonalNotesCreate}
        edit={PersonalNotesEdit}
        show={PersonalNotesShow}
        resourceUrl="personalnotes"
        title="Personal Notes"
        CustomRow={DatagridRow}
        isCustomDatagrid={true}
        {...rest}
    >
        <TextField label="Type" source="noteType" />
        <TextField label="Author" source="author" />
        <DateField label="Date Created" source="dateCreated" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default PersonalNotesList;
