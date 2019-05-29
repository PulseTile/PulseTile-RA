import React from "react";
import { DateField, TextField } from "react-admin";

import ListTemplate from "../../../core/common/ResourseTemplates/ListTemplate";
import ClinicalNotesCreate from "./ClinicalNotesCreate";
import ClinicalNotesEdit from "./ClinicalNotesEdit";
import ClinicalNotesShow from "./ClinicalNotesShow";
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
        create={ClinicalNotesCreate}
        edit={ClinicalNotesEdit}
        show={ClinicalNotesShow}
        resourceUrl="clinicalnotes"
        title="Clinical Notes"
        CustomRow={DatagridRow}
        isCustomDatagrid={true}
        {...rest}
    >
        <TextField label="Type" source="clinicalNotesType" />
        <TextField label="Author" source="author" />
        <DateField label="Date Created" source="dateCreated" />
        <TextField label="Source" source="source" />
    </ListTemplate>
);

export default PersonalNotesList;
