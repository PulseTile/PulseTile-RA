import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";


/**
 * This component returns Medications creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const MedicationsEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Medication" {...rest}>
        <Inputs />
    </EditTemplate>
);

export default MedicationsEdit;