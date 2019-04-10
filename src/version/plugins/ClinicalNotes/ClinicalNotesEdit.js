import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for Clinical Notes
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const ClinicalNotesEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Clinical Note"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default ClinicalNotesEdit;