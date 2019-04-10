import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for Personal Notes
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const PersonalNotesEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Personal Note"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default PersonalNotesEdit;