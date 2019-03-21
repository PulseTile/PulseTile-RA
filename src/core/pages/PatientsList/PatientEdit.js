import React from "react";

import EditTemplate from "../../common/ResourseTemplates/EditTemplate";
import FormInputs from "./fragments/FormInputs";

/**
 * This component returns block with edit form for Patient
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const PatientEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Patient"  {...rest}>
        <FormInputs />
    </EditTemplate>
);

export default PatientEdit;