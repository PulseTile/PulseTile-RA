import React from "react";

import CreateTemplate from "../../common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";


/**
 * This component returns Medications creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MedicationsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Medication" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default MedicationsCreate;
