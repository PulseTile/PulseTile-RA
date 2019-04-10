import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns Clinical Notes creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const ClinicalNotesCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Clinical Note" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default ClinicalNotesCreate;
