import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Personal Notes creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const PersonalNotesCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Personal Note" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default PersonalNotesCreate;
